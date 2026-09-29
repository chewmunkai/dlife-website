import { unstable_noStore as noStore } from "next/cache";
import type { Qa } from "../components/blocks/Faq";
import { HERO_DEFAULTS, FAQ_DEFAULTS, HOME_DOCUMENT } from "../content/cms/manifest";

/*
 * Reads published content from Talous CMS. The site never depends on the CMS
 * being up: if it isn't configured, unreachable, or has nothing published,
 * the page renders the content that ships in the repo.
 */

type Block = { type: string; props: Record<string, unknown> & { id: string } };
type Published = { versionId: string; n: number; content: { content: Block[] }; seo: { title?: string; description?: string } };

const CMS = process.env.TALOUS_CMS_URL;
const PROJECT = process.env.TALOUS_PROJECT_ID;

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
    console.warn(`[talous] using built-in content for "${slug}":`, (e as Error).message);
    // The CMS is configured but unreachable: render per request rather than caching the fallback,
    // so the page picks up published content as soon as the CMS is back.
    noStore();
    return null;
  }
}

/**
 * The homepage's sections, in published order. Any section the CMS doesn't
 * have (an older version, or the CMS unreachable) goes back in at its
 * approved position, so the live page can never lose a section.
 */
export function homeFromPublished(p: Published | null): { blocks: Block[]; faq: { label: string; items: Qa[] }; seo: Published["seo"] } {
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
  const faq = faqProps
    ? { label: String(faqProps.label ?? FAQ_DEFAULTS.label), items: ((faqProps.items as Qa[] | undefined) ?? FAQ_DEFAULTS.items).map(({ q, a }) => ({ q, a })) }
    : FAQ_DEFAULTS;
  return { blocks: withDefaults, faq, seo: p?.seo ?? {} };
}
