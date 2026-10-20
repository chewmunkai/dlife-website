"use client";

// no-external: the default puck.css @imports Inter from rsms.me, and if that host is blocked or down
// the whole editor fails to load. The system font is fine for editor chrome.
import "@puckeditor/core/no-external.css";
import "../../styles/dlife.css";
import "../../styles/blocks.css";
import "../../styles/pages.css";
// The Careers rows (and the Careers page) bring their own sheet; without it the four answers
// render open and on top of each other.
import "../../styles/growth.css";
import "../../styles/kit.css";
import "./studio.css";
// The editor chrome uses Poppins, like Talous CMS around it; the page itself keeps the site's fonts.
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import { Puck, createUsePuck, useGetPuck, type Config, type Data, type Field } from "@puckeditor/core";
import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { HOME_SECTIONS } from "../../components/home/sections";
import { KIT } from "../../components/kit/blocks";
import type { HeroProps } from "../../components/home/Hero";
import type { Qa } from "../../components/blocks/Faq";
import type { ManifestBlock, ManifestField, ManifestTemplate } from "../../content/cms/manifest";
import { MediaPicker, UploadContext, posterOf, type MediaItem, type Uploader } from "./MediaPicker";
import { FilmLibraryPreview, LibrariesContext, useLibraryFilms } from "./FilmLibraryPreview";
import { V2Footer, V2Header } from "../../components/v2/chrome";
import { menuFrom } from "../../content/cms/menu";
import { PAGE_SECTIONS } from "../../components/pages";
import { ALL_ROUTES, type Route } from "../../lib/routes";
import { createContext, useContext } from "react";

/** The page being edited's route (breadcrumbs, links), for the inner pages' sections. */
const PageRouteContext = createContext<Route | undefined>(undefined);

/** An inner-page section with what the live page passes every section: its route and the films. */
function withPageContext(C: ComponentType<Record<string, unknown>>) {
  return function InPage(p: Record<string, unknown>) {
    const route = useContext(PageRouteContext);
    const films = useLibraryFilms();
    return <C {...p} route={route} films={films} />;
  };
}

/*
 * The visual editor Talous CMS frames. It renders this site's real components,
 * loads the page's draft from the CMS and saves back to it, authorised by the
 * short-lived ticket in the URL fragment. It holds no secrets: the CMS checks
 * the ticket and validates every save.
 *
 * The CMS draws the editor's chrome (top bar, icon rail) and drives this frame by
 * postMessage: which side panel is open (Add = "blocks", Layers = "outline"), undo/redo,
 * the preview width and preview mode. This frame reports back whether it can undo/redo
 * and its save state. Changes save themselves a moment after the last edit.
 */

const usePuck = createUsePuck();
const AUTOSAVE_MS = 1500;

type Manifest = {
  version: string;
  blocks: Record<string, ManifestBlock>;
  templates: Record<string, ManifestTemplate>;
  // The site's own photos plus anything uploaded in Talous CMS (with a thumbnail).
  media: MediaItem[];
};
type Loaded = {
  page: { id: string; slug: string; title: string; template: string | null };
  draft: { id: string; n: number; content: Data } | null;
  manifest: Manifest | null;
  libraries?: Record<string, unknown>;
};

function StoriesWithLibrary(p: Record<string, unknown>) {
  const films = useLibraryFilms();
  const Stories = HOME_SECTIONS.Stories as unknown as ComponentType<Record<string, unknown>>;
  return <Stories {...p} films={films ? films.slice(0, 3) : undefined} />;
}
type Status = { tone: "info" | "ok" | "err"; text: string; errors?: string[] } | null;

/* How each block type renders. A block in the manifest without a renderer here shows a placeholder. */
const RENDERERS: Record<string, ComponentType<Record<string, unknown>>> = {
  ...(KIT as unknown as Record<string, ComponentType<Record<string, unknown>>>),
  ...Object.fromEntries(Object.entries(PAGE_SECTIONS).map(([type, C]) => [type, withPageContext(C)])),
  ...(HOME_SECTIONS as unknown as Record<string, ComponentType<Record<string, unknown>>>),
  Hero: (p) => <HOME_SECTIONS.Hero {...(p as unknown as HeroProps)} />,
  FilmLibrary: (p) => <FilmLibraryPreview films={p.films as never} />,
  // The menu as the bar draws it (dropdowns open on hover), and what the full-screen menu adds.
  SiteMenu: (p) => {
    const menu = menuFrom([{ type: "SiteMenu", props: p }]);
    return (
      <>
        <V2Header menu={menu} />
        <div className="studio-note">
          <b>Full-screen menu (phones):</b> the items above in order, then “{menu.menuNote}” {menu.menuLinks.map((l) => `· ${l.label} `)}
        </div>
      </>
    );
  },
  SiteFooter: (p) => <V2Footer footer={menuFrom([{ type: "SiteFooter", props: p }]).footer} />,
  // The reel previews the film library as it is now, not the built-in three.
  Stories: (p) => <StoriesWithLibrary {...p} />,
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
      // Thumbnails and a picture grid, not a list of file names.
      return {
        type: "custom",
        label,
        render: ({ value, onChange }: { value: string | undefined; onChange: (v: string) => void }) => (
          <MediaPicker value={value} onChange={onChange} media={media} label={label} />
        ),
      } as Field;
    case "video":
      return {
        type: "custom",
        label,
        render: ({ value, onChange }: { value: string | undefined; onChange: (v: string) => void }) => (
          <MediaPicker value={value} onChange={onChange} media={media} label={label} kind="video" />
        ),
      } as Field;
    case "select":
      return { type: "select", label, options: f.options.map((o) => ({ label: o[0].toUpperCase() + o.slice(1), value: o })) };
    case "toggle":
      // "Hide this section" reads as shown/hidden; every other switch is a plain yes or no.
      return key === "hidden"
        ? { type: "radio", label, options: [{ label: "Shown", value: false }, { label: "Hidden", value: true }] }
        : { type: "radio", label, options: [{ label: "Yes", value: true }, { label: "No", value: false }] };
    case "slot":
      return { type: "slot", label, ...(f.allow ? { allow: [...f.allow] } : {}) };
    case "list":
      return {
        type: "array",
        label,
        arrayFields: Object.fromEntries(Object.entries(f.item).map(([k, sub]) => [k, toPuckField(sub, k, media)])),
        // A new item starts empty; an on/off field starts off (the CMS refuses "" for one).
        defaultItemProps: Object.fromEntries(Object.entries(f.item).map(([k, sub]) => [k, sub.type === "toggle" ? false : ""])),
        // Each item is named by its first text field in the manifest's order (a title, a question…),
        // never by its id: stored items come back with their keys in another order.
        getItemSummary: (item: Record<string, unknown>, i?: number) => {
          const key = Object.entries(f.item).find(([k, sub]) => (sub.type === "text" || sub.type === "textarea") && typeof item[k] === "string" && item[k])?.[0];
          return String(key ? item[key] : `Item ${(i ?? 0) + 1}`).slice(0, 60);
        },
      } as Field;
  }
}

function buildConfig(manifest: Manifest, templateName: string | null): Config {
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
  // The Blocks drawer, grouped like Elementor's panel. Homepage sections only appear on the homepage.
  const has = (names: string[]) => names.filter((n) => n in components);
  const categories = {
    layout: { title: "Layout", components: has(["Section", "Columns", "Spacer", "Divider"]) },
    basic: { title: "Basic", components: has(["Heading", "Text", "Button", "IconList"]) },
    media: { title: "Media", components: has(["Image", "Video"]) },
    content: { title: "Content", components: has(["Accordion", "Quote", "Stats"]) },
    homepage: { title: "Homepage sections", components: has(Object.keys(HOME_SECTIONS)), visible: templateName === "home", defaultExpanded: false },
  };
  return {
    components,
    categories,
    // No page-level fields: SEO is edited in the CMS, not here.
    // Each page in the wrapper its own shell gives it: the homepage's .dlife root, or the inner
    // pages' .wrap/main (their stylesheets go into the canvas only: DsStyles below).
    root: {
      fields: {},
      render: ({ children }: { children: React.ReactNode }) =>
        manifest.templates[templateName ?? ""]?.design === "ds" ? (
          <div className="wrap" data-studio data-ds>
            <main id="main">{children}</main>
          </div>
        ) : (
          <div className="dlife" data-studio>
            {children}
          </div>
        ),
    },
  };
}

// Read once per page load, at module level: a render React throws away (while a stylesheet or
// chunk loads) would otherwise have already removed the ticket from the address bar, and the
// retry would find none: "Open this editor from Talous CMS" (seen live, 20 Oct 2026).
let launchOnce: ReturnType<typeof readLaunch> | null = null;
const launchParams = () => (launchOnce ??= readLaunch());

function readLaunch() {
  const q = new URLSearchParams(window.location.search);
  const ticket = new URLSearchParams(window.location.hash.slice(1)).get("ticket");
  // Drop the ticket from the address bar so it doesn't linger in history or get copied.
  if (ticket) history.replaceState(null, "", window.location.pathname + window.location.search);
  return { cms: q.get("cms"), pageId: q.get("page"), ticket };
}

/** Toggle fields that were never set read as "off" (e.g. shown), so the editor shows a choice. */
function withToggleDefaults(content: Data, manifest: Manifest): Data {
  return {
    ...content,
    content: content.content.map((b) => {
      const fields = manifest.blocks[b.type]?.fields ?? {};
      const props = { ...b.props };
      for (const [k, f] of Object.entries(fields)) if (f.type === "toggle" && props[k] === undefined) props[k] = false;
      return { ...b, props };
    }),
  };
}

export default function Studio() {
  const { cms, pageId, ticket: launchTicket } = launchParams();
  // The CMS refreshes the ticket while the page is open, so long sessions keep saving.
  const ticket = useRef(launchTicket);
  const cmsOrigin = cms ? new URL(cms).origin : null;
  const tell = useCallback((msg: Record<string, unknown>) => cmsOrigin && window.parent.postMessage(msg, cmsOrigin), [cmsOrigin]);

  const [loaded, setLoaded] = useState<Loaded | null>(null);
  // Remounts the editor only when the CMS changed the draft (AI edit, restore), never after our own save.
  const [mount, setMount] = useState(0);
  // A ref, not state: an autosave that starts right after another must see the new base.
  const baseId = useRef<string | null>(null);
  const [status, setStatus] = useState<Status>(null);
  const [dirty, setDirtyState] = useState(false);
  const [pendingReload, setPendingReload] = useState(false);
  const [saving, setSaving] = useState(false);
  const ignoreChange = useRef(false);

  const setDirty = useCallback(
    (d: boolean) => {
      setDirtyState(d);
      tell({ type: "talous:dirty", dirty: d });
    },
    [tell],
  );

  const api = cms && pageId ? `${cms}/api/studio/pages/${pageId}` : null;

  const load = useCallback(async () => {
    if (!api || !ticket.current) return setStatus({ tone: "err", text: "Open this editor from Talous CMS." });
    try {
      const res = await fetch(api, { headers: { authorization: `Bearer ${ticket.current}` } });
      const body = await res.json();
      if (!res.ok) return setStatus({ tone: "err", text: body.error ?? `The CMS answered ${res.status}.` });
      const next = body as Loaded;
      if (next.draft && next.manifest) next.draft.content = withToggleDefaults(next.draft.content, next.manifest);
      setLoaded(next);
      setMount((m) => m + 1);
      baseId.current = next.draft?.id ?? null;
      lastSaved.current = null;
      setDirty(false);
      setPendingReload(false);
      setStatus(null);
    } catch {
      setStatus({ tone: "err", text: "Couldn't reach Talous CMS." });
    }
  }, [api, setDirty]);

  useEffect(() => {
    load();
  }, [load]);

  // The CMS asks for a reload after an AI edit, a discard or a restore, and sends fresh tickets.
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;
  useEffect(() => {
    if (!cmsOrigin) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== cmsOrigin) return;
      if (e.data?.type === "talous:ticket" && typeof e.data.ticket === "string") ticket.current = e.data.ticket;
      // Uploaded in the CMS's Photos panel: offer them in every picker straight away.
      if (e.data?.type === "talous:media" && Array.isArray(e.data.items)) setUploaded((u) => [...(e.data.items as MediaItem[]), ...u]);
      if (e.data?.type === "talous:reload") {
        if (dirtyRef.current) setPendingReload(true);
        else load();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [cmsOrigin, load]);

  // Every edit bumps `seq`; a save only marks the page clean if nothing changed while it ran.
  const seq = useRef(0);
  const savingRef = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const getPuckRef = useRef<ReturnType<typeof useGetPuck> | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  // The page as last saved (or loaded), so a "change" that ends where it started saves nothing.
  const lastSaved = useRef<string | null>(null);

  const save = useCallback(async () => {
    const getPuck = getPuckRef.current;
    if (!api || !ticket.current || !getPuck) return;
    if (savingRef.current) return void (timer.current = setTimeout(() => save(), AUTOSAVE_MS));
    const { appState, dispatch } = getPuck();
    const startedAt = seq.current;
    const json = JSON.stringify(appState.data);
    if (lastSaved.current === null) lastSaved.current = json;
    if (json === lastSaved.current) {
      setDirty(false);
      return;
    }
    savingRef.current = true;
    setSaving(true);
    try {
      const res = await fetch(api, {
        method: "PUT",
        headers: { authorization: `Bearer ${ticket.current}`, "content-type": "application/json" },
        body: JSON.stringify({ baseVersionId: baseId.current, content: appState.data }),
      });
      const body = await res.json();
      if (!res.ok) {
        setSaveError(body.error ?? `Save failed (${res.status}).`);
        return setStatus({ tone: "err", text: body.error ?? `Save failed (${res.status}).`, errors: body.errors });
      }
      baseId.current = body.id;
      lastSaved.current = json;
      setSaveError(null);
      setStatus(null);
      if (seq.current === startedAt) {
        // Take the saved copy (it has the ids the CMS gave new list items) without remounting, so
        // the selection and scroll position survive. Skipped if there were edits during the save.
        if (body.content && loaded?.manifest) {
          ignoreChange.current = true;
          (dispatch as (a: { type: "setData"; data: Data }) => void)({ type: "setData", data: withToggleDefaults(body.content, loaded.manifest) });
        }
        setDirty(false);
      } else timer.current = setTimeout(() => save(), AUTOSAVE_MS);
      tell({ type: "talous:saved", versionId: body.id });
    } catch {
      setSaveError("Couldn't reach Talous CMS.");
      setStatus({ tone: "err", text: "Couldn't reach Talous CMS. Your edits are still here; it will try again on the next change." });
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }, [api, loaded?.manifest, setDirty, tell]);

  const changed = useCallback(() => {
    if (ignoreChange.current) {
      ignoreChange.current = false;
      return;
    }
    seq.current++;
    if (!dirtyRef.current) setDirty(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => save(), AUTOSAVE_MS);
  }, [save, setDirty]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const tpl = loaded?.page.template ? loaded.manifest?.templates[loaded.page.template] : undefined;

  // Uploads from the photo picker go straight to the CMS's library, then join every picker.
  const [uploaded, setUploaded] = useState<MediaItem[]>([]);
  const uploader = useMemo<Uploader | null>(
    () =>
      cms && pageId
        ? {
            extra: uploaded,
            upload: async (files, kind) => {
              const done: MediaItem[] = [];
              const errors: string[] = [];
              for (const file of files) {
                const form = new FormData();
                form.append("file", file);
                if (kind === "video") {
                  const poster = await posterOf(file);
                  if (poster) form.append("poster", poster);
                }
                try {
                  const res = await fetch(`${cms}/api/studio/media/${pageId}`, { method: "POST", headers: { authorization: `Bearer ${ticket.current}` }, body: form });
                  const body = await res.json().catch(() => ({}));
                  done.push(...((body.uploaded ?? []) as MediaItem[]));
                  errors.push(...((body.errors ?? (res.ok ? [] : [body.error ?? `Upload failed (${res.status}).`])) as string[]));
                } catch {
                  errors.push(`${file.name}: couldn't reach Talous CMS.`);
                }
              }
              if (done.length) setUploaded((u) => [...done, ...u]);
              return { uploaded: done, errors };
            },
          }
        : null,
    [cms, pageId, uploaded],
  );

  // What the CMS's top bar shows: undo/redo availability (from inside Puck) and the save state.
  const [historyFlags, setHistoryFlags] = useState({ canUndo: false, canRedo: false });
  useEffect(() => {
    tell({ type: "talous:state", ...historyFlags, saving, dirty, error: saveError });
  }, [tell, historyFlags, saving, dirty, saveError]);

  // Stable, so Puck keeps one Bridge mounted rather than a new one on every render.
  const overrides = useMemo(
    () => ({
      // The CMS's top bar replaces Puck's header; the Bridge keeps the two in step instead.
      header: () => (
        <Bridge
          cmsOrigin={cmsOrigin}
          getPuckRef={getPuckRef}
          onData={changed}
          onHistory={setHistoryFlags}
          onReady={(json) => (lastSaved.current = json)}
        />
      ),
      fields: ({ children, itemSelector }: { children: React.ReactNode; itemSelector?: unknown }) =>
        itemSelector ? (
          <>{children}</>
        ) : (
          <div className="studio-empty">
            <b>Click anything on the page to edit it.</b>
            <span>Its words, photos and options appear here.</span>
          </div>
        ),
      // A fixed page (the homepage) takes no new blocks, so the drawer says what it can do instead
      // of offering blocks that won't drop.
      ...(tpl?.fixed ? { drawer: () => <FixedPageNote anyOrder={!!tpl.anyOrder} /> } : {}),
      ...(tpl?.design === "ds" ? { iframe: ({ children, document }: { children: React.ReactNode; document?: Document }) => <DsStyles doc={document}>{children}</DsStyles> } : {}),
    }),
    [cmsOrigin, changed, tpl],
  );

  const config = useMemo(
    () => (loaded?.manifest ? buildConfig(loaded.manifest, loaded.page.template) : null),
    [loaded?.manifest, loaded?.page.template],
  );

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
      <PageRouteContext.Provider value={ALL_ROUTES.find((r) => r.path === `/${loaded.page.slug}`) ?? ALL_ROUTES[0]}>
      <LibrariesContext.Provider value={loaded.libraries ?? {}}>
      <UploadContext.Provider value={uploader}>
      <Puck
        key={mount}
        config={config}
        data={loaded.draft.content}
        headerTitle={loaded.page.title}
        // Side panels open from the CMS's icon rail; the canvas starts full width.
        ui={{ leftSideBarVisible: false }}
        // Fixed pages: sections can't be added, removed or duplicated; any-order pages can be dragged.
        permissions={tpl?.fixed ? { drag: !!tpl.anyOrder, duplicate: false, delete: false, insert: false } : undefined}
        overrides={overrides}
      />
      </UploadContext.Provider>
      </LibrariesContext.Provider>
      </PageRouteContext.Provider>
    </div>
  );
}

/** Loads the inner pages' stylesheets into the canvas iframe only (app/studio/ds.css). */
function DsStyles({ doc, children }: { doc?: Document; children: React.ReactNode }) {
  useEffect(() => {
    if (!doc || doc.getElementById("talous-ds-css")) return;
    const link = doc.createElement("link");
    link.id = "talous-ds-css";
    link.rel = "stylesheet";
    link.href = "/studio/ds.css";
    doc.head.appendChild(link);
  }, [doc]);
  return <>{children}</>;
}

function FixedPageNote({ anyOrder }: { anyOrder: boolean }) {
  return (
    <div className="studio-note">
      <p>
        <b>This page keeps its approved sections.</b>
      </p>
      <p>Click any section on the page to change its words and photos in the panel on the right.</p>
      {anyOrder && <p>To move a section up or down, drag it in <b>Layers</b> (on the left) or by its handle on the page. To take one off the page without losing it, select it and switch on “Hide this section on the site”.</p>}
      <p>To build with new blocks (headings, text, photos, buttons…), add a page: <b>Pages → Add a page</b>.</p>
    </div>
  );
}

/**
 * Lives inside Puck (as its header, which the CMS's top bar replaces) so it can reach the editor:
 * applies the CMS's commands and reports undo/redo and save state back.
 */
function Bridge({
  cmsOrigin,
  getPuckRef,
  onData,
  onHistory,
  onReady,
}: {
  cmsOrigin: string | null;
  getPuckRef: { current: ReturnType<typeof useGetPuck> | null };
  onData: () => void;
  onHistory: (flags: { canUndo: boolean; canRedo: boolean }) => void;
  onReady: (json: string) => void;
}) {
  const getPuck = useGetPuck();
  getPuckRef.current = getPuck;
  // Every change to the page counts as an edit, including undo and redo (Puck's onChange
  // doesn't fire for those), so the draft always matches what's on screen.
  const data = usePuck((s) => s.appState.data);
  const firstData = useRef(true);
  useEffect(() => {
    if (firstData.current) {
      firstData.current = false;
      onReady(JSON.stringify(data));
      return;
    }
    onData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const canUndo = usePuck((s) => s.history.hasPast);
  const canRedo = usePuck((s) => s.history.hasFuture);
  useEffect(() => onHistory({ canUndo: !!canUndo, canRedo: !!canRedo }), [onHistory, canUndo, canRedo]);

  useEffect(() => {
    if (!cmsOrigin) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== cmsOrigin) return;
      const d = e.data ?? {};
      const { appState, dispatch, history } = getPuck();
      const setUi = (ui: Record<string, unknown>) => (dispatch as (a: { type: "setUi"; ui: Record<string, unknown> }) => void)({ type: "setUi", ui });
      if (d.type === "talous:panel") setUi({ leftSideBarVisible: !!d.panel, ...(d.panel ? { plugin: { current: d.panel } } : {}) });
      if (d.type === "talous:history") (d.dir === "back" ? history.back : history.forward)();
      if (d.type === "talous:viewport") setUi({ viewports: { ...appState.ui.viewports, current: { width: d.width === "100%" ? "100%" : Number(d.width), height: "auto" } } });
      if (d.type === "talous:preview") setUi({ previewMode: d.on ? "interactive" : "edit", rightSideBarVisible: !d.on, ...(d.on ? { leftSideBarVisible: false, itemSelector: null } : {}) });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [cmsOrigin, getPuck]);
  return null;
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
