import { unstable_noStore as noStore } from "next/cache";
import type { Qa } from "../components/blocks/Faq";
import { HERO_DEFAULTS, FAQ_DEFAULTS, HOME_DOCUMENT } from "../content/cms/manifest";
import { filmsFromContent } from "../content/cms/films";
import { VIDEOS, type Video } from "../content/videos";
import { ALL_ROUTES } from "./routes";

// The site's own pages (coded routes, now edited in the CMS too), by CMS slug: "about",
// "solutions/protecting-your-family"… They have their routes; they aren't CMS-built pages.
const SITE_PAGE_SLUGS = new Set(ALL_ROUTES.map((r) => r.path.replace(/^\//, "")).filter(Boolean));

/*
 * Reads published content from Talous CMS. The site never depends on the CMS
 * being up: if it isn't configured, unreachable, or has nothing published,
 * the page renders the content that ships in the repo.
 */

type Block = { type: string; props: Record<string, unknown> & { id: string } };
type Published = {
  versionId: string;
  n: number;
  title?: string;
  content: { root?: { props?: Record<string, unknown> }; content: Block[] };
  // Page settings: search title/description, link-preview overrides, "hide from search engines".
  seo: { title?: string; description?: string; ogTitle?: string; ogDescription?: string; ogImage?: string; noindex?: string };
};
export type PublishedPage = Published;

const CMS = process.env.TALOUS_CMS_URL;
const PROJECT = process.env.TALOUS_PROJECT_ID;
// A plain-files build (cPanel, GitHub Pages) bakes in whatever the CMS returns at build time.
const STATIC = Boolean(process.env.PAGES_BASE_PATH || process.env.STATIC_EXPORT);
// Set for the live cPanel build: a CMS failure fails the build, so the site keeps its last
// upload instead of being replaced with the repo's built-in text.
const REQUIRED = process.env.TALOUS_REQUIRE === "1";

export async function getPublished(slug: string): Promise<Published | null> {
  if (!CMS || !PROJECT) return null;
  try {
    const url = new URL("/api/public/pages", CMS);
    url.searchParams.set("project", PROJECT);
    url.searchParams.set("slug", slug);
    // Cached until the CMS calls /api/talous/revalidate on publish.
    const res = await fetch(url, { next: { tags: [`talous:${slug}`] }, signal: AbortSignal.timeout(5000) });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`CMS answered ${res.status}`);
    return (await res.json()) as Published;
  } catch (e) {
    if (REQUIRED) throw new Error(`Talous CMS didn't return "${slug}": ${(e as Error).message}`);
    console.warn(`[talous] using built-in content for "${slug}":`, (e as Error).message);
    // The CMS is configured but unreachable: on a server, render per request rather than caching
    // the fallback, so the page picks up published content as soon as the CMS is back.
    if (!STATIC) noStore();
    return null;
  }
}

/**
 * The homepage's sections, in published order. Any section the CMS doesn't
 * have (an older version, or the CMS unreachable) goes back in at its
 * approved position, so the live page can never lose a section.
 */
export function homeFromPublished(p: Published | null): { blocks: Block[]; faq: { label: string; items: Qa[] } | null; seo: Published["seo"] } {
  const defaults = HOME_DOCUMENT.content as Block[];
  const blocks: Block[] = (p?.content.content ?? []).filter((b) => defaults.some((d) => d.type === b.type));
  defaults.forEach((d, i) => {
    if (blocks.some((b) => b.type === d.type)) return;
    // Insert after the nearest earlier section that is present.
    let at = 0;
    for (const prev of defaults.slice(0, i).reverse()) {
      const j = blocks.findIndex((b) => b.type === prev.type);
      if (j >= 0) {
        at = j + 1;
        break;
      }
    }
    blocks.splice(at, 0, d);
  });
  const withDefaults = blocks.map((b) => (b.type === "Hero" ? { ...b, props: { ...HERO_DEFAULTS, ...b.props } } : b));
  const faqProps = withDefaults.find((b) => b.type === "Faq")?.props;
  // A hidden FAQ isn't on the page, so it mustn't be in the structured data either.
  const faq = faqProps?.hidden === true
    ? null
    : faqProps
    ? { label: String(faqProps.label ?? FAQ_DEFAULTS.label), items: ((faqProps.items as Qa[] | undefined) ?? FAQ_DEFAULTS.items).map(({ q, a }) => ({ q, a })) }
    : FAQ_DEFAULTS;
  return { blocks: withDefaults, faq, seo: p?.seo ?? {} };
}

/**
 * A page's sections, in published order (content/cms/define.ts): any section the CMS doesn't have
 * goes back in at its approved position, sections the page no longer has are dropped, and each
 * keeps its own defaults underneath (the section components merge them).
 */
export function sectionsFromPublished(p: Published | null, defaults: Block[]): Block[] {
  // Each published section over its own defaults (same id, else the first of its type), so a
  // field added to the site later shows its built-in copy until someone edits it.
  const blocks: Block[] = (p?.content.content ?? [])
    .map((b) => {
      const d = defaults.find((x) => x.props.id === b.props.id) ?? defaults.find((x) => x.type === b.type);
      return d ? { ...b, props: { ...d.props, ...b.props } } : null;
    })
    .filter((b): b is Block => !!b);
  const onlyOne = (type: string) => defaults.filter((x) => x.type === type).length === 1;
  defaults.forEach((d, i) => {
    if (blocks.some((b) => b.props.id === d.props.id || (onlyOne(d.type) && b.type === d.type))) return;
    let at = 0;
    for (const prev of defaults.slice(0, i).reverse()) {
      const j = blocks.findIndex((b) => b.type === prev.type);
      if (j >= 0) {
        at = j + 1;
        break;
      }
    }
    blocks.splice(at, 0, d);
  });
  return blocks;
}

/** Pages built in the CMS (everything except the homepage), for the sitemap and static builds. */
export async function listPublished(): Promise<{ slug: string; title: string; publishedAt: string | null; noindex?: boolean }[]> {
  if (!CMS || !PROJECT) return [];
  try {
    const url = new URL("/api/public/pages", CMS);
    url.searchParams.set("project", PROJECT);
    const res = await fetch(url, { next: { tags: ["talous:pages"] }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`CMS answered ${res.status}`);
    const rows = (await res.json()) as { slug: string; title: string; publishedAt: string | null; noindex?: boolean }[];
    // The site's own pages are in the CMS too now; only pages built in the CMS are listed here.
    return rows.filter((r) => r.slug !== "home" && !SITE_PAGE_SLUGS.has(r.slug));
  } catch (e) {
    if (REQUIRED) throw new Error(`Talous CMS didn't list its pages: ${(e as Error).message}`);
    return [];
  }
}

/**
 * The film library from the CMS (content/cms/films.ts), in its order: all of it for the Stories
 * page, the first three wherever films are featured. The built-in list when the CMS doesn't have
 * one yet or can't be reached (and the build doesn't require it).
 */
export async function getFilms(): Promise<Video[]> {
  return filmsFromContent((await getPublished("films"))?.content) ?? VIDEOS;
}
