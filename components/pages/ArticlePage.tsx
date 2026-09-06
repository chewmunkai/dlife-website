import type { Metadata } from "next";
import Shell from "../v2/Shell";
import JsonLd from "../site/JsonLd";
import { Band, ClosingCard } from "../v2/blocks";
import { PREVIEW_ARTICLES, type Article } from "../../content/articles";
import { ROUTES } from "../../lib/routes";
import { asset, link } from "../../lib/asset";
import { WA, waHref } from "../../lib/contact";
import { SITE } from "../../lib/site";

/* ============================================================
   Article page.

   One template, every article. Body copy is a block list in
   content/articles.ts rather than markup here, so publishing is a content
   edit and the reading measure stays the same on every piece.

   ⚠️ A12 (client, 31 Aug 2026): placeholder copy must not reach a visitor.
   While content/articles.ts is empty this file is NOT a route — it lives here
   with the other kept-but-unrouted templates rather than under app/, so the
   static export writes no /articles/template.html at all. Next also refuses a
   dynamic segment whose generateStaticParams() comes back empty under
   `output: export`, which is the same problem said in the compiler's words.

   TO PUBLISH — after adding the first record to ARTICLES, restore the route by
   creating app/articles/[slug]/page.tsx containing exactly:

     export {
       default,
       generateStaticParams,
       generateMetadata,
       dynamicParams,
     } from "../../../components/pages/ArticlePage";

   Nothing in this file changes. The Articles band on /resources un-hides
   itself off the same ARTICLES array, so the grid and the route come back
   together.
   ============================================================ */

const bySlug = (slug: string) => PREVIEW_ARTICLES.find((a) => a.slug === slug);

/** No published article means no generated page. `dynamicParams = false` keeps
 *  the static export honest about that rather than leaving the segment open. */
export const dynamicParams = false;

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
    openGraph: { type: "article", title: a.title, description: a.blurb },
  };
}

/** The published date, written the way the site writes dates elsewhere. */
const shown = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

function Body({ blocks }: { blocks: Article["body"] }) {
  return (
    <div className="dl-prose art-body">
      {blocks.map((b, i) => {
        if ("h" in b) return <h2 key={i}>{b.h}</h2>;
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

export default function Page({ params }: { params: { slug: string } }) {
  const a = bySlug(params.slug);
  if (!a) return null;

  return (
    <Shell>
      <section className="band light art-head">
        <nav className="dl-crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <a href={link("/")}>Home</a>
              <em>/</em>
            </li>
            <li>
              <a href={link(ROUTES.resources.path)}>{ROUTES.resources.label}</a>
              <em>/</em>
            </li>
            <li>
              <span aria-current="page">{a.title}</span>
            </li>
          </ol>
        </nav>
        <p className="lbl">{a.template ? "Article template" : a.category}</p>
        <h1>{a.title}</h1>
        <p className="dl-lede">{a.blurb}</p>
        <p className="art-meta">
          <span>{shown(a.date)}</span>
          <em>·</em>
          <span>{a.read}</span>
          {!a.template && (
            <>
              <em>·</em>
              <span>{a.category}</span>
            </>
          )}
        </p>

        <div className="art-plate ph">
          {a.photo ? (
            <img src={asset(a.photo.src)} alt={a.photo.alt} />
          ) : (
            <div className="slot-empty">
              Lead image
              <em>{a.template ? "Template" : "To be supplied"}</em>
            </div>
          )}
        </div>
      </section>

      <Band>
        {a.template && (
          <div className="dl-notice" role="note">
            <strong>This is the article template.</strong>
            <p>
              The structure is real and the words are placeholder, so the layout can be signed off before anything is
              written. It is not indexed, and it disappears from the site as soon as a real article is published.
            </p>
          </div>
        )}
        <Body blocks={a.body} />
      </Band>

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
