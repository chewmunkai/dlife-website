/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static — every route prerenders, so the site can be served from any
  // static host or CDN with no Node runtime.
  output: "export",
  // Static export has no image optimizer; the design's photography is served as-is.
  images: { unoptimized: true },
  // Flat /route.html files → clean no-slash URLs.
  trailingSlash: false,
};

export default nextConfig;
