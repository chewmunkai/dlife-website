import { Band } from "../v2/blocks";
import { anchorOf, ArticleGrid, headingsOf, shownDate } from "../v2/articles";
import { blocksOf } from "../../content/cms/pages/articles";
import { PREVIEW_ARTICLES, type Article, type Block } from "../../content/articles";
import { ROUTES } from "../../lib/routes";
import { asset, link } from "../../lib/asset";

/* An article page's sections (content/cms/pages/articles.ts). */

function Body({ blocks }: { blocks: Block[] }) {
  return (
    <div className="dl-prose art-copy">
      {blocks.map((b, i) => {
        if ("h" in b)
          return (
            <h2 key={i} id={anchorOf(b.h)}>
              {b.h}
            </h2>
          );
        if ("list" in b)
          return (
            <ul key={i}>
              {b.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          );
        if ("quote" in b)
          return (
            <blockquote key={i}>
              <p>{b.quote}</p>
              <cite>{b.cite}</cite>
            </blockquote>
          );
        return <p key={i}>{b.p}</p>;
      })}
    </div>
  );
}

/** "In this article": the section headings, as anchors. */
function Contents({ heads }: { heads: string[] }) {
  return (
    <ol>
      {heads.map((h) => (
        <li key={h}>
          <a href={`#${anchorOf(h)}`}>{h}</a>
        </li>
      ))}
    </ol>
  );
}

/** The article: its dark banner (picture and title), then the text, with contents beside it
 *  once it has three headings or more. `template` comes from the page, not the CMS. */
export function ArticleMain({
  title,
  blurb,
  category,
  date,
  read,
  photo,
  photoAlt,
  photoPosition,
  body,
  template,
}: {
  title?: string;
  blurb?: string;
  category?: string;
  date?: string;
  read?: string;
  photo?: string;
  photoAlt?: string;
  photoPosition?: string;
  body?: string;
  template?: boolean;
}) {
  const blocks = blocksOf(body);
  const heads = headingsOf(blocks);
  const toc = heads.length >= 3;
  return (
    <>
      {/* 12 Oct 2026, client: "fix the structure … it's a little messy", with
          equadtech.com's newsroom as the reference. Its article opens on one
          dark banner, picture and title together, and reads in a single
          centred column; this does the same. The picture bleeds in from the
          right and the title sits on the ink to its left, so no face is ever
          under the type (the client's standing rule). */}
      <section className="art-hero dark">
        <div className="art-hero__ph">
          {photo ? (
            <img
              src={asset(photo)}
              alt={photoAlt ?? ""}
              style={photoPosition ? { objectPosition: photoPosition } : undefined}
            />
          ) : (
            <div className="slot-empty">
              Lead image
              <em>{template ? "Template" : "To be supplied"}</em>
            </div>
          )}
        </div>
        <div className="art-hero__in">
          <nav className="dl-crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <a href={link("/")}>Home</a>
                <em>/</em>
              </li>
              <li>
                <a href={link(ROUTES.resources.path)}>{ROUTES.resources.label}</a>
              </li>
            </ol>
          </nav>
          <p className="lbl">{template ? "Article template" : category}</p>
          <h1>{title}</h1>
          <p className="art-hero__blurb">{blurb}</p>
          <p className="art-meta">
            <span>{shownDate(date ?? "")}</span>
            <em>·</em>
            <span>{read}</span>
          </p>
        </div>
      </section>

      <section className="band light art-main">
        {template && (
          <div className="dl-notice" role="note">
            <strong>This is the article template.</strong>
            <p>
              The structure is real and the words are placeholder, so the layout can be signed off before anything is
              written. It is not indexed, and it disappears from the site as soon as a real article is published.
            </p>
          </div>
        )}
        <div className={toc ? "art-layout" : "art-layout art-layout--solo"}>
          {toc && (
            <aside className="art-toc" aria-label="In this article">
              <p className="lbl">In this article</p>
              <Contents heads={heads} />
            </aside>
          )}
          <article className="art-body">
            {toc && (
              <details className="art-toc-m">
                <summary>
                  In this article <em>{heads.length} sections</em>
                </summary>
                <Contents heads={heads} />
              </details>
            )}
            <Body blocks={blocks} />
            <footer className="art-end">
              <span>
                Published {shownDate(date ?? "")}
                {!template && <> · {category}</>}
              </span>
              <a href={link(ROUTES.resources.path)}>
                <i aria-hidden="true">←</i> All articles
              </a>
            </footer>
          </article>
        </div>
      </section>

    </>
  );
}

/** Up to three other articles. The page passes the published list; the editor uses the file's. */
export function ArticleMore({ label, title, slug, articles }: { label?: string; title?: string; slug?: string; articles?: Article[] }) {
  const more = (articles ?? PREVIEW_ARTICLES).filter((x) => x.slug !== slug).slice(0, 3);
  if (!more.length) return null;
  return (
    <Band label={label || undefined} title={title || undefined}>
      <ArticleGrid items={more} />
    </Band>
  );
}
