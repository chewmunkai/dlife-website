import type { MetadataRoute } from "next";
import { ALL_ROUTES } from "../lib/routes";
import { abs } from "../lib/seo";
import { listPublished } from "../lib/talous";
import { ARTICLES } from "../content/articles";

/**
 * Generated from the route map, so a page added to lib/routes.ts is in the
 * sitemap the moment it exists. Utility routes — the four legal drafts — are
 * excluded: they are noindex until they have been through compliance review,
 * and listing a noindex page only wastes crawl budget.
 *
 * Fixed lastModified, not `new Date()`: a date that changes every deploy cries
 * wolf to crawlers. Bump it when pages change materially.
 */
const LASTMOD = "2026-09-15";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const coded = ALL_ROUTES.filter((r) => !r.utility && !r.hidden).map((r) => ({
    url: abs(r.path),
    lastModified: LASTMOD,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
  // Published guides (the noindex placeholder template never is one), dated by publication.
  const articles = ARTICLES.filter((a) => !a.template).map((a) => ({
    url: abs(`/articles/${a.slug}`),
    lastModified: a.date,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  // Pages built in Talous CMS, dated by their last publish (which is when they really changed).
  // Pages set to "hide from search engines" in the CMS stay out of it.
  const cms = (await listPublished()).filter((p) => !p.noindex).map((p) => ({
    url: abs(`/${p.slug}`),
    lastModified: p.publishedAt ? p.publishedAt.slice(0, 10) : LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  return [...coded, ...articles, ...cms];
}
