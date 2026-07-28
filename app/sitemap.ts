import type { MetadataRoute } from "next";
import { SITE } from "../lib/site";

// Fixed, not new Date(): a lastModified that changes every deploy cries wolf
// to crawlers. Bump it when the page changes materially.
const LASTMOD = "2026-07-28";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE, lastModified: LASTMOD, changeFrequency: "monthly", priority: 1 }];
}
