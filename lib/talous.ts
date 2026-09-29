import { unstable_noStore as noStore } from "next/cache";
import type { HeroProps } from "../components/home/Hero";
import type { Qa } from "../components/blocks/Faq";
import { HERO_DEFAULTS, FAQ_DEFAULTS } from "../content/cms/manifest";

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

export function homeFromPublished(p: Published | null): { hero: HeroProps; faq: { label: string; items: Qa[] }; seo: Published["seo"] } {
  const blocks = p?.content.content ?? [];
  const hero = blocks.find((b) => b.type === "Hero")?.props;
  const faq = blocks.find((b) => b.type === "Faq")?.props;
  return {
    hero: hero ? ({ ...HERO_DEFAULTS, ...hero } as HeroProps) : HERO_DEFAULTS,
    faq: faq
      ? { label: String(faq.label ?? FAQ_DEFAULTS.label), items: ((faq.items as Qa[] | undefined) ?? FAQ_DEFAULTS.items).map(({ q, a }) => ({ q, a })) }
      : FAQ_DEFAULTS,
    seo: p?.seo ?? {},
  };
}
