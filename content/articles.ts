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
  title: "How to read your own policy schedule",
  blurb:
    "A worked example of the article template: the shape a D’Life guide takes, with the editorial rules written into the copy itself.",
  category: "Client guidance",
  date: "2026-09-06",
  read: "4 min read",
  template: true,
  photo: { src: "/media/img/policy-review.jpg", alt: "Reading through a policy document at a desk" },
  body: [
    {
      p: "Every paragraph below says what belongs in its place, at about the length the real thing should run to — so the reading page can be judged on its typography rather than on a wall of filler. The notice above says the rest.",
    },
    {
      p: "The opening paragraph does the work of the whole article. It names the question the reader arrived with and says what they will be able to decide by the end — in about the length of this one. It does not introduce the topic in general terms, because a reader who is here already knows the topic.",
    },
    { h: "A subheading marks the turn in the argument" },
    {
      p: "Body paragraphs run to three or four sentences and use the site's voice: plain language, no jargon left unexplained, no fear-led framing, and no figure that D’Life cannot stand behind. The rules the rest of the site follows apply here without exception — no insurer is named, no premium or payout is quoted, and nothing is promised that a product disclosure sheet would have to contradict.",
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
        "A pull quote carries the one sentence a reader should leave with. It is not decoration, and it is never a sentence the article has not earned.",
      cite: "D’Life editorial note",
    },
    { h: "Close on what the reader does next" },
    {
      p: "The last paragraph hands the reader somewhere to go — a page on this site, or a conversation. It does not summarise what they have just read. Replace this whole record with a real article in content/articles.ts and the template stops being routed automatically.",
    },
  ],
};

/**
 * What the /articles route builds, and what the Articles & Events grid lists.
 *
 * A12 (31 Aug) took the template off the public build because its body was
 * lorem ipsum and it was being presented as a real, clickable article.
 *
 * Restored 6 Sep at the client's request — "add back the article and do a
 * template mock up article, design the template nicely" — on one condition:
 * the template now reads as a template. Its body is the editorial brief for a
 * D'Life guide rather than filler, every surface still labels it "Article
 * template", and it is still `noindex`. Nobody can mistake it for published
 * guidance, and the reading page can be signed off at the right length.
 *
 * Adding a real record to ARTICLES un-routes it automatically.
 */
export const ROUTABLE_ARTICLES: Article[] = ARTICLES.length ? ARTICLES : [TEMPLATE_ARTICLE];

/** Kept for the route's own import. Same set. */
export const PREVIEW_ARTICLES: Article[] = ROUTABLE_ARTICLES;
