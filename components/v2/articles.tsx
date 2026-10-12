import type { Article, Block } from "../../content/articles";
import { asset, link } from "../../lib/asset";

/* ============================================================
   Article surfaces, shared by the Articles & Events listing and the article
   page's "More reading", so a card looks the same wherever it appears.

   12 Oct 2026, client: "fix the structure of the blog and article, it's a
   little messy", with equadtech.com's newsroom as the reference. The listing
   takes that site's shape: the newest piece set wide, then a three-up grid of
   picture, label, title and a "Read" link.
   ============================================================ */

/** The published date, written the way the site writes dates elsewhere. */
export const shownDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export const articleHref = (a: Article) => link(`/articles/${a.slug}`);

/** A heading's anchor, for the page's "In this guide" list. */
export const anchorOf = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** The section headings of an article body, in order. */
export const headingsOf = (body: Block[]) => body.flatMap((b) => ("h" in b ? [b.h] : []));

function Picture({ a }: { a: Article }) {
  return a.photo ? (
    <img src={asset(a.photo.src)} alt={a.photo.alt} loading="lazy" />
  ) : (
    <div className="slot-empty">
      Lead image
      <em>{a.template ? "Template" : "To be supplied"}</em>
    </div>
  );
}

function Meta({ a, date }: { a: Article; date?: boolean }) {
  return (
    <p className="meta">
      <span>{a.template ? "Template" : a.category}</span>
      {date && <em>{shownDate(a.date)}</em>}
      <em>{a.read}</em>
    </p>
  );
}

/** The newest article, set wide: the picture at its own 4:3, the words beside it. */
export function ArticleLead({ a }: { a: Article }) {
  return (
    <a className="art-lead" href={articleHref(a)}>
      <div className="ph">
        <Picture a={a} />
      </div>
      <div className="body">
        <Meta a={a} date />
        <h3>{a.title}</h3>
        <p className="blurb">{a.blurb}</p>
        <span className="more">
          Read the article <i aria-hidden="true">→</i>
        </span>
      </div>
    </a>
  );
}

/** Every other article: picture, label, title, link. */
export function ArticleCard({ a }: { a: Article }) {
  return (
    <a className="art-card" href={articleHref(a)}>
      <div className="ph">
        <Picture a={a} />
      </div>
      <div className="body">
        <Meta a={a} />
        <h3>{a.title}</h3>
        <span className="more">
          Read more <i aria-hidden="true">→</i>
        </span>
      </div>
    </a>
  );
}

export function ArticleGrid({ items }: { items: Article[] }) {
  return (
    <div className="art-grid">
      {items.map((a) => (
        <ArticleCard a={a} key={a.slug} />
      ))}
    </div>
  );
}
