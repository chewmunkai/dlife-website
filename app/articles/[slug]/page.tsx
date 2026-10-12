import type { Metadata } from "next";
import { OG_IMAGE } from "../../../lib/seo";
import Shell from "../../../components/v2/Shell";
import JsonLd from "../../../components/site/JsonLd";
import { Band, ClosingCard } from "../../../components/v2/blocks";
import { PREVIEW_ARTICLES, type Article } from "../../../content/articles";
import { anchorOf, ArticleGrid, headingsOf, shownDate } from "../../../components/v2/articles";
import { ROUTES } from "../../../lib/routes";
import { asset, link } from "../../../lib/asset";
import { WA, waHref } from "../../../lib/contact";
import { SITE } from "../../../lib/site";
import { notFound } from "next/navigation";

/* ============================================================
   Article page.

   One template, every article. Body copy is a block list in
   content/articles.ts rather than markup here, so publishing is a content
   edit and the reading measure stays the same on every piece.

   Restored as a route on 6 Sep 2026 at the client's request: "add back the
   article and do a template mock up article, design the template nicely."

   It lived in components/pages/ while it was unrouted. It is back here
   because the indirection did not survive `next dev`: a route that
   re-exports `generateStaticParams` from another module builds fine and then
   404s in development, reporting the function as missing. The page belongs in
   the route that serves it.

   While content/articles.ts holds no real article this renders TEMPLATE_
   ARTICLE, whose body is the editorial brief for a D'Life guide rather than
   filler. Every surface says "Article template" and it stays `noindex`.
   Adding a real record to ARTICLES replaces it automatically.
   ============================================================ */

const bySlug = (slug: string) => PREVIEW_ARTICLES.find((a) => a.slug === slug);

/* ⚠️ No `dynamicParams = false` here, deliberately. With it set, `next dev`
   refuses this route — "missing exported function generateStaticParams()",
   even though the function is declared directly below and the production
   build generates the page correctly. It costs nothing: the export is
   static, so only the slugs returned below are ever written. */
export function generateStaticParams() {
  return PREVIEW_ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = bySlug(params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.blurb,
    alternates: { canonical: `${SITE}${ROUTES.resources.path}/../articles/${a.slug}`.replace("/../", "/") },
    /* A placeholder must never be indexed. */
    robots: a.template ? { index: false, follow: false } : undefined,
    openGraph: { type: "article", title: a.title, description: a.blurb, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: a.title, description: a.blurb, images: [OG_IMAGE.url] },
  };
}

function Body({ blocks }: { blocks: Article["body"] }) {
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

export default function Page({ params }: { params: { slug: string } }) {
  const a = bySlug(params.slug);
  /* A slug that is not an article is a 404, not an empty page. Matters now
     the template has a real article in its place: /articles/template is gone. */
  if (!a) notFound();
  const heads = headingsOf(a.body);
  /* A contents list earns its place from three sections up. */
  const toc = heads.length >= 3;
  const more = PREVIEW_ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <Shell>
      {/* 12 Oct 2026, client: "fix the structure … it's a little messy", with
          equadtech.com's newsroom as the reference. Its article opens on one
          dark banner, picture and title together, and reads in a single
          centred column; this does the same. The picture bleeds in from the
          right and the title sits on the ink to its left, so no face is ever
          under the type (the client's standing rule). */}
      <section className="art-hero dark">
        <div className="art-hero__ph">
          {a.photo ? (
            <img
              src={asset(a.photo.src)}
              alt={a.photo.alt}
              style={a.photo.position ? { objectPosition: a.photo.position } : undefined}
            />
          ) : (
            <div className="slot-empty">
              Lead image
              <em>{a.template ? "Template" : "To be supplied"}</em>
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
          <p className="lbl">{a.template ? "Article template" : a.category}</p>
          <h1>{a.title}</h1>
          <p className="art-hero__blurb">{a.blurb}</p>
          <p className="art-meta">
            <span>{shownDate(a.date)}</span>
            <em>·</em>
            <span>{a.read}</span>
          </p>
        </div>
      </section>

      <section className="band light art-main">
        {a.template && (
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
            <Body blocks={a.body} />
            <footer className="art-end">
              <span>
                Published {shownDate(a.date)}
                {!a.template && <> · {a.category}</>}
              </span>
              <a href={link(ROUTES.resources.path)}>
                <i aria-hidden="true">←</i> All articles
              </a>
            </footer>
          </article>
        </div>
      </section>

      {more.length > 0 && (
        <Band label="Keep reading" title="More from D’Life">
          <ArticleGrid items={more} />
        </Band>
      )}

      <ClosingCard
        title="Would rather just ask someone?"
        lede="Reading is a fine place to start, but most questions are quicker to answer in a conversation."
        actions={
          <>
            <a className="pill" href={waHref(WA.question)}>
              <span>Ask a question</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.resources.path)}>
              <span>Back to Articles &amp; Events</span>
            </a>
          </>
        }
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.blurb,
          datePublished: a.date,
          author: { "@type": "Organization", name: "D’Life Sdn Bhd" },
        }}
      />
    </Shell>
  );
}
