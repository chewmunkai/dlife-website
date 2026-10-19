import type { MetadataRoute } from "next";
import { ALL_ROUTES } from "../lib/routes";
import { abs } from "../lib/seo";
import { listPublished } from "../lib/talous";

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
  // Pages built in Talous CMS, dated by their last publish (which is when they really changed).
  const cms = (await listPublished()).map((p) => ({
    url: abs(`/${p.slug}`),
    lastModified: p.publishedAt ? p.publishedAt.slice(0, 10) : LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  return [...coded, ...cms];
}
