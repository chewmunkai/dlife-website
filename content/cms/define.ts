import type { ManifestBlock, ManifestField } from "./manifest";

/*
 * Every page except the homepage is brought into Talous CMS the same way (20 Oct 2026): each
 * section is a component whose words and photos are props, with today's copy as its defaults
 * (content/cms/pages/*). This builds the section's CMS fields from those defaults, so a field
 * exists for exactly what the section renders:
 *
 *   "/media/….jpg|png|webp"  → photo          "/media/….mp4" → video
 *   key ending in "Alt"      → photo description (text)
 *   boolean                  → on/off
 *   longer or multi-line text → paragraph; other text → one line
 *   list of objects          → list (add, remove, reorder), item fields by the same rules
 *
 * Every section also gets "Hide this section on the site". Labels come from `labels`, else from
 * the key ("ctaLabel" → "Cta label"), so the important ones are written out per section.
 */

type Defaults = Record<string, unknown>;
type Opts = {
  labels?: Record<string, string>;
  /** Keys that must stay one line even when long (button labels, titles). */
  short?: string[];
  /** Keys that are paragraphs even when short. */
  long?: string[];
  /** Keys with fixed choices. */
  select?: Record<string, readonly string[]>;
  /** Keys the section takes but nobody should edit here. */
  skip?: string[];
};

export const HIDE_FIELD = { type: "toggle", label: "Hide this section on the site" } as const;

const humanise = (k: string) =>
  k
    .replace(/([a-z])([A-Z0-9])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase());

function scalar(key: string, value: unknown, o: Opts): ManifestField | null {
  const label = o.labels?.[key] ?? humanise(key);
  if (o.select?.[key]) return { type: "select", label, options: o.select[key] };
  if (typeof value === "boolean") return { type: "toggle", label };
  if (typeof value !== "string") return null;
  if (/\.(jpe?g|png|webp)$/i.test(value) && value.startsWith("/")) return { type: "image", label };
  if (/\.mp4$/i.test(value) && value.startsWith("/")) return { type: "video", label };
  if (/Alt$/.test(key)) return { type: "text", label: o.labels?.[key] ?? `${humanise(key.replace(/Alt$/, ""))} description (alt text)` };
  if (o.short?.includes(key)) return { type: "text", label };
  if (o.long?.includes(key) || value.length > 90 || value.includes("\n")) return { type: "textarea", label };
  return { type: "text", label };
}

export function fieldsFrom(defaults: Defaults, o: Opts = {}): Record<string, ManifestField> {
  const fields: Record<string, ManifestField> = {};
  for (const [key, value] of Object.entries(defaults)) {
    if (key === "id" || key === "hidden" || o.skip?.includes(key)) continue;
    if (Array.isArray(value)) {
      const items = value.filter((v): v is Defaults => !!v && typeof v === "object");
      const item: Record<string, ManifestField> = {};
      for (const it of items)
        for (const [k, v] of Object.entries(it)) {
          if (k === "id" || item[k]) continue;
          const f = scalar(k, v, o);
          if (f) item[k] = f;
        }
      fields[key] = { type: "list", label: o.labels?.[key] ?? humanise(key), item };
      continue;
    }
    const f = scalar(key, value, o);
    if (f) fields[key] = f;
  }
  return fields;
}

/** A page section's CMS block: its fields from its defaults, plus the hide switch. */
export function sectionBlock(label: string, defaults: Defaults, o: Opts = {}): ManifestBlock {
  return { label, fields: { ...fieldsFrom(defaults, o), hidden: HIDE_FIELD } };
}

/** A page's CMS document: its sections in order, with today's copy. */
export function pageDocument(sections: [type: string, defaults: Defaults][]) {
  const seen: Record<string, number> = {};
  return {
    root: { props: {} },
    // Stable ids (type and occurrence), so the site can match a published section to its defaults.
    content: sections.map(([type, props]) => ({ type, props: { id: `${type.toLowerCase()}-${(seen[type] = (seen[type] ?? 0) + 1)}`, ...props } })),
  };
}

/** Every photo and video a page's defaults use, for the CMS library. */
export function mediaOf(defaults: Defaults[], alts: Record<string, string> = {}): { src: string; alt: string; kind?: "video" }[] {
  const out = new Map<string, { src: string; alt: string; kind?: "video" }>();
  const walk = (v: unknown, siblings?: Defaults, key?: string) => {
    if (typeof v === "string" && v.startsWith("/media/") && /\.(jpe?g|png|webp|mp4)$/i.test(v)) {
      const alt = (siblings && key && typeof siblings[`${key}Alt`] === "string" ? (siblings[`${key}Alt`] as string) : "") || alts[v] || "";
      if (!out.has(v)) out.set(v, { src: v, alt, ...(/\.mp4$/i.test(v) ? { kind: "video" as const } : {}) });
    } else if (Array.isArray(v)) v.forEach((x) => walk(x));
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, v as Defaults, k);
  };
  defaults.forEach((d) => walk(d));
  return [...out.values()];
}
