/** @type {import('next').NextConfig} */

// GitHub Pages serves a project site from /<repo>, so the export needs a base
// path there. Set PAGES_BASE_PATH in that build only — local dev, and any host
// serving from a domain root, stay at "/".
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  // Fully static — every route prerenders, so the site can be served from any
  // static host or CDN with no Node runtime.
  output: "export",
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
};

export default nextConfig;
