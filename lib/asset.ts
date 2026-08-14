/**
 * Self-hosted media under /public.
 *
 * GitHub Pages serves the project from /<repo>, and a bare `<img src>` does
 * not pick up Next's basePath, so it is applied here. Empty in local dev and
 * on any root-served host — including the production domain.
 */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

/**
 * Site-relative links need the same treatment for the same reason: the export
 * writes plain `<a href>` rather than next/link, so the base path has to be
 * applied by hand. Anchors, absolute URLs and mailto: are left alone.
 */
export const link = (href: string) => {
  if (!href.startsWith("/")) return href;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${href}`;
};
