// TODO(launch): confirm the production domain — canonical, OG URLs, the
// sitemap and the structured data all derive from it.
export const SITE = "https://dlife.com.my";

/** True for the GitHub Pages preview build, which must stay out of the index. */
export const isPreview = Boolean(process.env.PAGES_BASE_PATH);
