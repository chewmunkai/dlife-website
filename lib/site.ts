// TODO(launch): confirm the production domain — canonical, OG URLs, the
// sitemap and the structured data all derive from it.
export const SITE = "https://dlife.com.my";

/**
 * Staging. The correction report's G10 keeps the site out of search indexes
 * until D'Life signs it off, so the page ships `noindex, nofollow` on every
 * host — not just the preview.
 *
 * Flip to `false` at launch. That one edit re-opens the meta robots tag and
 * puts the sitemap back into robots.txt; nothing else needs touching.
 */
export const PRELAUNCH = true;

/** True for the GitHub Pages preview build, which must stay out of the index. */
export const isPreview = Boolean(process.env.PAGES_BASE_PATH);

/** Whether crawlers should be allowed to index this build at all. */
export const noIndex = PRELAUNCH || isPreview;
