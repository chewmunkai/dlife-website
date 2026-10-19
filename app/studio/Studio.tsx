"use client";

// no-external: the default puck.css @imports Inter from rsms.me, and if that host is blocked or down
// the whole editor fails to load. The system font is fine for editor chrome.
import "@puckeditor/core/no-external.css";
import "../../styles/dlife.css";
import "../../styles/blocks.css";
import "../../styles/pages.css";
import "./studio.css";
import { Puck, useGetPuck, type Config, type Data, type Field } from "@puckeditor/core";
import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { HOME_SECTIONS } from "../../components/home/sections";
import type { HeroProps } from "../../components/home/Hero";
import type { Qa } from "../../components/blocks/Faq";
import type { ManifestBlock, ManifestField, ManifestTemplate } from "../../content/cms/manifest";

/*
 * The visual editor Talous CMS frames. It renders this site's real components,
 * loads the page's draft from the CMS and saves back to it, authorised by the
 * short-lived ticket in the URL fragment. It holds no secrets: the CMS checks
 * the ticket and validates every save.
 */

type Manifest = {
  version: string;
  blocks: Record<string, ManifestBlock>;
  templates: Record<string, ManifestTemplate>;
  media: { src: string; alt: string }[];
};
type Loaded = { page: { id: string; title: string; template: string | null }; draft: { id: string; n: number; content: Data } | null; manifest: Manifest | null };
type Status = { tone: "info" | "ok" | "err"; text: string; errors?: string[] } | null;

/* How each block type renders. A block in the manifest without a renderer here shows a placeholder. */
const RENDERERS: Record<string, ComponentType<Record<string, unknown>>> = {
  ...(HOME_SECTIONS as unknown as Record<string, ComponentType<Record<string, unknown>>>),
  Hero: (p) => <HOME_SECTIONS.Hero {...(p as unknown as HeroProps)} />,
  // Half-typed new questions are skipped in the preview rather than rendered empty.
  Faq: (p) => <HOME_SECTIONS.Faq items={((p.items as Qa[] | undefined) ?? []).filter((i) => i && (i.q || i.a))} label={String(p.label ?? "")} />,
};

function toPuckField(f: ManifestField, key: string, media: Manifest["media"]): Field {
  const label = f.label ?? key;
  switch (f.type) {
    case "text":
      return { type: "text", label };
    case "textarea":
      return { type: "textarea", label };
    case "image":
      return { type: "select", label, options: media.map((m) => ({ label: m.src.split("/").pop() ?? m.src, value: m.src })) };
    case "select":
      return { type: "select", label, options: f.options.map((o) => ({ label: o[0].toUpperCase() + o.slice(1), value: o })) };
    case "toggle":
      return { type: "radio", label, options: [{ label: "Shown", value: false }, { label: "Hidden", value: true }] };
    case "list":
      return {
        type: "array",
        label,
        arrayFields: Object.fromEntries(Object.entries(f.item).map(([k, sub]) => [k, toPuckField(sub, k, media)])),
        defaultItemProps: Object.fromEntries(Object.keys(f.item).map((k) => [k, ""])),
        getItemSummary: (item: Record<string, unknown>, i?: number) => String(Object.values(item).find((v) => typeof v === "string" && v) ?? `Item ${(i ?? 0) + 1}`),
      } as Field;
  }
}

function buildConfig(manifest: Manifest): Config {
  const components: Config["components"] = {};
  for (const [type, def] of Object.entries(manifest.blocks)) {
    const Render = RENDERERS[type];
    components[type] = {
      label: def.locked ? `${def.label ?? type} · layout only` : def.label ?? type,
      fields: Object.fromEntries(Object.entries(def.fields).map(([k, f]) => [k, toPuckField(f, k, manifest.media)])),
      render: Render
        ? (props) => {
            // Hidden sections stay in the editor, faded and tagged, so they can be shown again.
            const hidden = (props as Record<string, unknown>).hidden === true;
            const cls = [def.locked && "studio-locked", hidden && "studio-hidden"].filter(Boolean).join(" ");
            return cls ? (
              <div className={cls}>
                <Render {...props} />
              </div>
            ) : (
              <Render {...props} />
            );
          }
        : () => <div className="studio-missing">No preview for “{type}”.</div>,
    };
  }
  return {
    components,
    // No page-level fields: SEO is edited in the CMS, not here.
    root: { fields: {}, render: ({ children }: { children: React.ReactNode }) => <div className="dlife" data-studio>{children}</div> },
  };
}

function readLaunch() {
  const q = new URLSearchParams(window.location.search);
  const ticket = new URLSearchParams(window.location.hash.slice(1)).get("ticket");
  // Drop the ticket from the address bar so it doesn't linger in history or get copied.
  if (ticket) history.replaceState(null, "", window.location.pathname + window.location.search);
  return { cms: q.get("cms"), pageId: q.get("page"), ticket };
}

export default function Studio() {
  const launch = useRef<ReturnType<typeof readLaunch>>();
  launch.current ??= readLaunch();
  const { cms, pageId, ticket } = launch.current;

  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [baseId, setBaseId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>(null);
  const [dirty, setDirty] = useState(false);
  const [pendingReload, setPendingReload] = useState(false);
  const [saving, setSaving] = useState(false);

  const api = cms && pageId ? `${cms}/api/studio/pages/${pageId}` : null;

  const load = useCallback(async () => {
    if (!api || !ticket) return setStatus({ tone: "err", text: "Open this editor from Talous CMS." });
    try {
      const res = await fetch(api, { headers: { authorization: `Bearer ${ticket}` } });
      const body = await res.json();
      if (!res.ok) return setStatus({ tone: "err", text: body.error ?? `The CMS answered ${res.status}.` });
      setLoaded(body as Loaded);
      setBaseId(body.draft?.id ?? null);
      setDirty(false);
      setPendingReload(false);
      setStatus(null);
    } catch {
      setStatus({ tone: "err", text: "Couldn't reach Talous CMS." });
    }
  }, [api, ticket]);

  useEffect(() => {
    load();
  }, [load]);

  // The CMS asks for a reload after an AI edit, a discard or a restore.
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;
  useEffect(() => {
    if (!cms) return;
    const origin = new URL(cms).origin;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== origin || e.data?.type !== "talous:reload") return;
      if (dirtyRef.current) setPendingReload(true);
      else load();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [cms, load]);

  const save = useCallback(
    async (data: Data) => {
      if (!api || !ticket) return;
      setSaving(true);
      setStatus({ tone: "info", text: "Saving…" });
      try {
        const res = await fetch(api, {
          method: "PUT",
          headers: { authorization: `Bearer ${ticket}`, "content-type": "application/json" },
          body: JSON.stringify({ baseVersionId: baseId, content: data }),
        });
        const body = await res.json();
        if (!res.ok) return setStatus({ tone: "err", text: body.error ?? `Save failed (${res.status}).`, errors: body.errors });
        setBaseId(body.id);
        setDirty(false);
        setStatus({ tone: "ok", text: `Saved as draft v${body.n}. Publish it from the panel on the right.` });
        if (cms) window.parent.postMessage({ type: "talous:saved", versionId: body.id }, new URL(cms).origin);
        // Reload so ids the CMS assigned to new list items are in the editor's copy.
        await load();
      } catch {
        setStatus({ tone: "err", text: "Couldn't reach Talous CMS. Nothing was saved." });
      } finally {
        setSaving(false);
      }
    },
    [api, ticket, baseId, cms, load],
  );

  const config = useMemo(() => (loaded?.manifest ? buildConfig(loaded.manifest) : null), [loaded?.manifest]);
  const tpl = loaded?.page.template ? loaded.manifest?.templates[loaded.page.template] : undefined;

  if (!loaded || !config) return <StatusBar status={status ?? { tone: "info", text: "Loading…" }} />;
  if (!loaded.draft) return <StatusBar status={{ tone: "err", text: "This page has no content in the CMS yet." }} />;

  return (
    <div className="studio">
      {pendingReload && (
        <div className="studio-bar warn">
          The draft changed in Talous CMS. <button onClick={load}>Load it</button> (your unsaved edits here will be lost)
        </div>
      )}
      <StatusBar status={status} />
      <Puck
        key={loaded.draft.id}
        config={config}
        data={loaded.draft.content}
        onChange={() => setDirty(true)}
        onPublish={save}
        headerTitle={loaded.page.title}
        // Fixed pages: sections can't be added, removed or duplicated; any-order pages can be dragged.
        permissions={tpl?.fixed ? { drag: !!tpl.anyOrder, duplicate: false, delete: false, insert: false } : undefined}
        overrides={{ headerActions: () => <SaveButton onSave={save} saving={saving} dirty={dirty} /> }}
      />
    </div>
  );
}

function SaveButton({ onSave, saving, dirty }: { onSave: (d: Data) => void; saving: boolean; dirty: boolean }) {
  const getPuck = useGetPuck();
  return (
    <button className="studio-save" disabled={saving || !dirty} onClick={() => onSave(getPuck().appState.data)}>
      {saving ? "Saving…" : dirty ? "Save draft" : "Saved"}
    </button>
  );
}

function StatusBar({ status }: { status: Status }) {
  if (!status) return null;
  return (
    <div className={`studio-bar ${status.tone}`} role="status">
      {status.text}
      {status.errors && (
        <ul>
          {status.errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
