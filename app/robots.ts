import type { MetadataRoute } from "next";
import { SITE, isPreview } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  // The GitHub Pages preview lives on a github.io URL. Letting crawlers in
  // there would index the preview against the wrong domain and pre-empt the
  // real site, so previews are closed and only the production build opens up.
  if (isPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
