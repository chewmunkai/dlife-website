import type { MetadataRoute } from "next";
import { SITE, isPreview, PRELAUNCH } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  // The GitHub Pages preview lives on a github.io URL. Letting crawlers in
  // there would index the preview against the wrong domain and pre-empt the
  // real site, so previews are closed outright.
  if (isPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };

  // Staging on the real domain (correction report G10). Crawling stays open
  // deliberately — `noindex` only works if a crawler can fetch the page and
  // read the meta tag, and a blanket disallow would hide it. The sitemap is
  // withheld instead, so nothing is actively offered up for indexing.
  if (PRELAUNCH) return { rules: [{ userAgent: "*", allow: "/" }], host: SITE };

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
