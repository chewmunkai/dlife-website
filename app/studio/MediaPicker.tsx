"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { asset } from "../../lib/asset";

/*
 * The photo field in the studio: the chosen photo as a thumbnail, and "Change photo" opens the
 * site's library as a grid of pictures (like WordPress's media library) instead of a list of
 * filenames. Uploaded photos arrive in the same list from Talous CMS, so they appear here too.
 */

export type MediaItem = { src: string; alt: string; thumb?: string; kind?: "image" | "video"; deleted?: boolean; name?: string };

/**
 * Uploading from inside the editor: the studio provides this (it holds the CMS address and the
 * ticket), and photos uploaded here join every picker's library at once.
 */
export type Uploader = { upload: (files: File[], kind: "image" | "video") => Promise<{ uploaded: MediaItem[]; errors: string[] }>; extra: MediaItem[] };
export const UploadContext = createContext<Uploader | null>(null);

/** A video's poster: the frame one second in (or the first, for very short clips), cut in the browser. */
export async function posterOf(file: File): Promise<File | null> {
  const url = URL.createObjectURL(file);
  try {
    const v = document.createElement("video");
    v.muted = true;
    v.playsInline = true;
    v.preload = "auto";
    v.src = url;
    await new Promise((ok, fail) => ((v.onloadeddata = ok), (v.onerror = fail)));
    v.currentTime = Math.min(1, (v.duration || 2) / 2);
    await new Promise((ok) => (v.onseeked = ok));
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d")!.drawImage(v, 0, 0);
    const blob = await new Promise<Blob | null>((ok) => c.toBlob(ok, "image/jpeg", 0.85));
    return blob ? new File([blob], "poster.jpg", { type: "image/jpeg" }) : null;
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}

const nameOf = (src: string) => src.split("/").pop() ?? src;

export function MediaPicker({
  value,
  onChange,
  media,
  label,
  kind = "image",
}: {
  value: string | undefined;
  onChange: (src: string) => void;
  media: MediaItem[];
  label: string;
  kind?: "image" | "video";
}) {
  const [open, setOpen] = useState(false);
  const uploader = useContext(UploadContext);
  // Newly uploaded files first, then the library; deleted uploads only if this field still uses one.
  const all = useMemo(() => {
    const seen = new Set<string>();
    return [...(uploader?.extra ?? []), ...media].filter((m) => !seen.has(m.src) && (seen.add(m.src), !m.deleted || m.src === value));
  }, [uploader?.extra, media, value]);
  const current = all.find((m) => m.src === value);
  return (
    <div className="mp">
      <span className="mp-label">{label}</span>
      <button type="button" className="mp-current" onClick={() => setOpen(true)} title={current?.alt ?? (value ? nameOf(value) : "Choose")}>
        {value ? (
          kind === "video" ? (
            <video src={asset(value)} muted preload="metadata" />
          ) : (
            <img src={asset(current?.thumb ?? value)} alt="" loading="lazy" />
          )
        ) : (
          <span className="mp-empty">No {kind === "video" ? "video" : "photo"} chosen</span>
        )}
      </button>
      <div className="mp-meta">
        <span className="mp-alt">{current?.alt || current?.name || (value ? nameOf(value) : "")}</span>
        <button type="button" className="mp-change" onClick={() => setOpen(true)}>
          {value ? `Change ${kind === "video" ? "video" : "photo"}` : `Choose a ${kind === "video" ? "video" : "photo"}`}
        </button>
      </div>
      {open && (
        <Library
          title={label}
          media={all.filter((m) => (m.kind ?? "image") === kind)}
          kind={kind}
          selected={value}
          onClose={() => setOpen(false)}
          onPick={(src) => {
            onChange(src);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

function Library({
  title,
  media,
  kind,
  selected,
  onPick,
  onClose,
}: {
  title: string;
  media: MediaItem[];
  kind: "image" | "video";
  selected?: string;
  onPick: (src: string) => void;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const uploader = useContext(UploadContext);
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [problems, setProblems] = useState<string[]>([]);
  const send = async (files: File[]) => {
    if (!uploader || !files.length) return;
    setBusy(true);
    setProblems([]);
    try {
      const r = await uploader.upload(files, kind);
      setProblems(r.errors);
      // One file: use it straight away, as WordPress does when you upload from a field.
      if (r.uploaded.length === 1 && !r.errors.length) onPick(r.uploaded[0].src);
    } finally {
      setBusy(false);
    }
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return needle ? media.filter((m) => `${m.alt} ${nameOf(m.src)}`.toLowerCase().includes(needle)) : media;
  }, [media, q]);

  return (
    <div className="mp-modal" role="dialog" aria-modal="true" aria-label={`Choose ${kind === "video" ? "a video" : "a photo"}: ${title}`} onClick={onClose}>
      <div className="mp-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="mp-head">
          <div>
            <b>Choose {kind === "video" ? "a video" : "a photo"}</b>
            <span>{title}</span>
          </div>
          <input type="search" placeholder="Search by description or file name" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
          {uploader && (
            <>
              <button type="button" className="mp-upload" disabled={busy} onClick={() => input.current?.click()}>
                {busy ? "Uploading…" : kind === "video" ? "Upload video" : "Upload photos"}
              </button>
              <input
                ref={input}
                type="file"
                hidden
                multiple={kind === "image"}
                accept={kind === "video" ? "video/mp4" : "image/jpeg,image/png,image/webp"}
                onChange={(e) => {
                  send([...(e.target.files ?? [])]);
                  e.target.value = "";
                }}
              />
            </>
          )}
          <button type="button" className="mp-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        {problems.length > 0 && (
          <div className="mp-problems" role="alert">
            {problems.map((p) => (
              <div key={p}>{p}</div>
            ))}
          </div>
        )}
        <div
          className="mp-grid"
          onDragOver={(e) => uploader && e.preventDefault()}
          onDrop={(e) => {
            if (!uploader) return;
            e.preventDefault();
            send([...e.dataTransfer.files].filter((f) => (kind === "video" ? f.type === "video/mp4" : f.type.startsWith("image/"))));
          }}
        >
          {shown.map((m) => (
            <button key={m.src} type="button" className={`mp-tile${m.src === selected ? " on" : ""}`} onClick={() => onPick(m.src)} title={m.alt}>
              {kind === "video" ? <video src={asset(m.src)} muted preload="metadata" /> : <img src={asset(m.thumb ?? m.src)} alt={m.alt} loading="lazy" />}
              <span>{m.alt || m.name || nameOf(m.src)}</span>
            </button>
          ))}
          {shown.length === 0 && <p className="mp-none">Nothing matches “{q}”.</p>}
        </div>
      </div>
    </div>
  );
}
