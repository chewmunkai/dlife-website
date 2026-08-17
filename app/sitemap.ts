import type { MetadataRoute } from "next";
import { ALL_ROUTES } from "../lib/routes";
import { abs } from "../lib/seo";

/**
 * Generated from the route map, so a page added to lib/routes.ts is in the
 * sitemap the moment it exists. Utility routes — the four legal drafts — are
 * excluded: they are noindex until they have been through compliance review,
 * and listing a noindex page only wastes crawl budget.
 *
 * Fixed lastModified, not `new Date()`: a date that changes every deploy cries
 * wolf to crawlers. Bump it when pages change materially.
 */
const LASTMOD = "2026-08-14";

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_ROUTES.filter((r) => !r.utility && !r.hidden).map((r) => ({
    url: abs(r.path),
    lastModified: LASTMOD,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
