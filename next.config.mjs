/** @type {import('next').NextConfig} */

// GitHub Pages serves a project site from /<repo>, so the export needs a base
// path there. Set PAGES_BASE_PATH in that build only — local dev, and any host
// serving from a domain root, stay at "/".
const basePath = process.env.PAGES_BASE_PATH || "";

// Talous CMS: the site runs as a Node server so the CMS can refresh a page on
// publish (/api/talous/revalidate). The fully static export is still available
// for the GitHub Pages preview (PAGES_BASE_PATH) or on demand (STATIC_EXPORT=1),
// in which case pages bake in whatever the CMS had published at build time.
const staticExport = Boolean(basePath || process.env.STATIC_EXPORT);
// The browser-facing CMS address, which frames /studio. On a server the site may reach the CMS
// over a private address (TALOUS_CMS_URL), so the public one is set separately there.
const cmsPublic = process.env.TALOUS_CMS_PUBLIC_URL || process.env.TALOUS_CMS_URL;
const cmsOrigin = cmsPublic ? new URL(cmsPublic).origin : null;
// Staging copies must stay out of search results.
const noindex = process.env.SITE_NOINDEX === "1";

const nextConfig = {
  reactStrictMode: true,
  ...(staticExport ? { output: "export" } : {}),
  // Static export has no image optimizer; the design's photography is served as-is.
  images: { unoptimized: true },
  // Flat /route.html files → clean no-slash URLs.
  trailingSlash: false,
  basePath,
  assetPrefix: basePath || undefined,
  // basePath rewrites routes and next/image, but not a plain <img src="/...">.
  // The design uses bare <img> tags, so the prefix has to reach the client
  // bundle for self-hosted media to resolve under /<repo> on Pages.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Only the CMS may frame the studio.
  ...(staticExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/studio",
              headers: [{ key: "Content-Security-Policy", value: `frame-ancestors ${cmsOrigin ?? "'none'"}` }],
            },
            ...(noindex ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : []),
          ];
        },
      }),
};

export default nextConfig;
