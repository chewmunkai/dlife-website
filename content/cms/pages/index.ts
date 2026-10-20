import { mediaOf } from "../define";
import type { ManifestBlock, ManifestTemplate } from "../manifest";
import { COMMON_BLOCKS } from "./common";
import { STORIES_PAGE } from "./stories";
import { RESOURCES_BLOCKS, RESOURCES_PAGE } from "./resources";
import { CONTACT_BLOCKS, CONTACT_PAGE } from "./contact";
import { POLICY_BLOCKS, POLICY_PAGE } from "./policy";
import { CAREERS_BLOCKS, CAREERS_PAGE } from "./careers";
import { SECTION_BLOCKS } from "./sections";
import { DVA_PAGE } from "./dva";
import { ABOUT_PAGE } from "./about";
import { YOUTH_PAGE } from "./youth";
import { SOLUTION_BLOCKS, SOLUTION_PAGES } from "./solutions";
import { LEGAL_BLOCKS, LEGAL_PAGES } from "./legal";
import { ARTICLE_BLOCKS, ARTICLE_PAGES } from "./articles";

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
  { slug: "careers", title: "Careers", template: "careers", document: CAREERS_PAGE },
  { slug: "dva", title: "Drive Value Associates", template: "dva", document: DVA_PAGE },
  { slug: "about", title: "About", template: "about", document: ABOUT_PAGE },
  { slug: "youth-community", title: "Youth Community", template: "youth", document: YOUTH_PAGE },
  ...SOLUTION_PAGES,
  ...LEGAL_PAGES,
  ...ARTICLE_PAGES,
];

/** Section types defined only for one page, merged into the manifest with the shared ones. */
export const PAGE_BLOCKS: Record<string, ManifestBlock> = {
  ...(COMMON_BLOCKS as unknown as Record<string, ManifestBlock>),
  ...(SECTION_BLOCKS as unknown as Record<string, ManifestBlock>),
  ...RESOURCES_BLOCKS,
  ...CONTACT_BLOCKS,
  ...POLICY_BLOCKS,
  ...CAREERS_BLOCKS,
  ...(SOLUTION_BLOCKS as unknown as Record<string, ManifestBlock>),
  ...(LEGAL_BLOCKS as unknown as Record<string, ManifestBlock>),
  ...(ARTICLE_BLOCKS as unknown as Record<string, ManifestBlock>),
};

/** Templates shared by several pages, named for what they are rather than for one page. */
const SHARED_TEMPLATE_LABELS: Record<string, string> = { solution: "Solution page", legal: "Legal page", article: "Article" };

/** One template per page (the six solution pages share one): its own sections, each once, in any
 *  order (like the homepage). */
export const PAGE_TEMPLATES: Record<string, ManifestTemplate> = Object.fromEntries(
  SITE_PAGES.map((p) => [
    p.template,
    { label: SHARED_TEMPLATE_LABELS[p.template] ?? `${p.title} page`, fixed: p.document.content.map((b) => b.type), anyOrder: true, design: "ds" as const },
  ]),
);

/** Every photo and video the pages use, for the CMS's library. */
export const PAGE_MEDIA = mediaOf(SITE_PAGES.flatMap((p) => p.document.content.map((b) => b.props)));
