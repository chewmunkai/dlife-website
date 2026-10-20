import { mediaOf } from "../define";
import type { ManifestBlock, ManifestTemplate } from "../manifest";
import { COMMON_BLOCKS } from "./common";
import { STORIES_PAGE } from "./stories";
import { RESOURCES_BLOCKS, RESOURCES_PAGE } from "./resources";
import { CONTACT_BLOCKS, CONTACT_PAGE } from "./contact";
import { POLICY_BLOCKS, POLICY_PAGE } from "./policy";

/*
 * The site's inner pages in Talous CMS (20 Oct 2026). Each entry is one page: its CMS slug (its
 * path without the leading slash), the document of its sections with today's copy, and which
 * sections it keeps. The CMS imports each on its next sync and publishes it unchanged; from then
 * on the page renders whatever is published there, over these defaults.
 */

type Doc = { root: { props: Record<string, never> }; content: { type: string; props: { id: string } & Record<string, unknown> }[] };
export type SitePage = { slug: string; title: string; template: string; document: Doc };

export const SITE_PAGES: SitePage[] = [
  { slug: "stories", title: "Stories", template: "stories", document: STORIES_PAGE },
  { slug: "resources", title: "Articles & events", template: "resources", document: RESOURCES_PAGE },
  { slug: "contact", title: "Contact", template: "contact", document: CONTACT_PAGE },
  { slug: "existing-policy-support", title: "Existing Policy Support", template: "policy", document: POLICY_PAGE },
];

/** Section types defined only for one page, merged into the manifest with the shared ones. */
export const PAGE_BLOCKS: Record<string, ManifestBlock> = {
  ...(COMMON_BLOCKS as unknown as Record<string, ManifestBlock>),
  ...RESOURCES_BLOCKS,
  ...CONTACT_BLOCKS,
  ...POLICY_BLOCKS,
};

/** One template per page: its own sections, each once, in any order (like the homepage). */
export const PAGE_TEMPLATES: Record<string, ManifestTemplate> = Object.fromEntries(
  SITE_PAGES.map((p) => [p.template, { label: `${p.title} page`, fixed: p.document.content.map((b) => b.type), anyOrder: true, design: "ds" as const }]),
);

/** Every photo and video the pages use, for the CMS's library. */
export const PAGE_MEDIA = mediaOf(SITE_PAGES.flatMap((p) => p.document.content.map((b) => b.props)));
