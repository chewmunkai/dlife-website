/* ============================================================
   Articles.

   The library is empty: D'Life has not published any articles yet, and the
   Articles & Events page says so rather than shipping invented posts. This
   file is the seam where real ones land.

   To publish, add records to ARTICLES below and the page switches from the
   marked template to the real grid automatically — no markup changes. The
   categories the direction guide suggests are: client guidance; protection
   and planning; founder and D'Life story; advisor stories; careers; DVA;
   Youth Community; events and resources.

   ⚠️ TEMPLATE_ARTICLE is placeholder copy shown only while ARTICLES is
   empty, and it is labelled as a template on the page. Do not promote it to
   a real record by editing it in place: write a real article, add it to
   ARTICLES, and the template disappears on its own.
   ============================================================ */

export type Article = {
  /** Sentence case, and specific. This becomes the page's H1 when built. */
  title: string;
  /** One line under the title in the grid. */
  blurb: string;
  /** Free-form, from the guide's suggested taxonomy. */
  category: string;
  /** ISO date, used for ordering and shown as the reading date. */
  date: string;
  /** Reading time, written as it should appear. */
  read: string;
  /** Where the article lives. Internal path or external URL. */
  href: string;
  /** Optional lead image from /public/media/img. Omitted renders a marked slot. */
  photo?: { src: string; alt: string };
};

export const ARTICLES: Article[] = [];

/** The shape a published article takes, shown while the library is empty. */
export const TEMPLATE_ARTICLE: Article = {
  title: "Article title sits here, at about this length",
  blurb:
    "One sentence under the title saying what the reader gets. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  category: "Client guidance",
  date: "2026-01-01",
  read: "4 min read",
  href: "#",
};
