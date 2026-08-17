/* ============================================================
   Articles.

   The library is empty: D'Life has not published anything yet. This file is
   the seam where real articles land, and TEMPLATE_ARTICLE is the working
   example that renders while it is empty, so the layout can be approved
   before anything is written.

   To publish: add a record to ARTICLES. The Articles & Events grid switches
   to the real set and the template stops being routed, so no placeholder page
   survives on a live site. No markup changes either way.

   The categories the direction guide suggests: client guidance; protection
   and planning; founder and D'Life story; advisor stories; careers; DVA;
   Youth Community; events and resources.
   ============================================================ */

/** One block of an article body. Exactly one key is set per block. */
export type Block =
  | { h: string }
  | { p: string }
  | { list: string[] }
  | { quote: string; cite: string };

export type Article = {
  /** URL segment, kebab-case. The page lives at /articles/<slug>. */
  slug: string;
  /** Sentence case, and specific. */
  title: string;
  /** One line under the title in the grid and under the H1 on the page. */
  blurb: string;
  /** Free-form, from the guide's suggested taxonomy. */
  category: string;
  /** ISO date. Shown as the published date. */
  date: string;
  /** Reading time, written as it should appear. */
  read: string;
  /** Lead image from /public/media/img. Omitted renders a marked slot. */
  photo?: { src: string; alt: string };
  body: Block[];
  /** Marks placeholder copy so the page can label itself honestly. */
  template?: true;
};

export const ARTICLES: Article[] = [];

/**
 * The template. Structure is real; the words are placeholder, and the
 * `template` flag makes every surface that renders it say so. Do not edit
 * this into a real article: write a new record in ARTICLES instead, which
 * also un-routes this page.
 */
export const TEMPLATE_ARTICLE: Article = {
  slug: "template",
  title: "Article title sits here, at about this length",
  blurb:
    "One sentence under the title saying what the reader gets out of this. Two lines at most.",
  category: "Client guidance",
  date: "2026-01-01",
  read: "4 min read",
  template: true,
  body: [
    {
      p: "The opening paragraph does the work of the whole article. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Say what the reader will be able to decide by the end of it.",
    },
    {
      p: "A second paragraph gives the context the first one assumed. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat, and keep the sentences the length a person would actually say aloud.",
    },
    { h: "A subheading marks the turn in the argument" },
    {
      p: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      list: [
        "A list earns its place when the items are genuinely parallel",
        "Three to six items, each one a complete thought",
        "No item so long that it should have been a paragraph",
      ],
    },
    {
      quote:
        "A pull quote is for the one sentence a reader should remember, not for decoration.",
      cite: "D’Life advisory team",
    },
    { h: "Close on what to do next" },
    {
      p: "The last paragraph hands the reader somewhere to go: a page on this site, or a conversation. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    },
  ],
};

/** What the /articles route builds. The template is routed only while no real
 *  article exists, so placeholder copy cannot outlive the library going live. */
export const ROUTABLE_ARTICLES: Article[] = ARTICLES.length ? ARTICLES : [TEMPLATE_ARTICLE];
