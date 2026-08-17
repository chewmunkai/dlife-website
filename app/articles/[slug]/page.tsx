import type { Metadata } from "next";
import Shell from "../../../components/v2/Shell";
import JsonLd from "../../../components/site/JsonLd";
import { Band, ClosingCard } from "../../../components/v2/blocks";
import { ROUTABLE_ARTICLES, type Article } from "../../../content/articles";
import { ROUTES } from "../../../lib/routes";
import { asset, link } from "../../../lib/asset";
import { WA, waHref } from "../../../lib/contact";
import { SITE } from "../../../lib/site";

/* ============================================================
   Article page.

   One template, every article. Body copy is a block list in
   content/articles.ts rather than markup here, so publishing is a content
   edit and the reading measure stays the same on every piece.

   ⚠️ While no article is published, the only route this generates is the
   template, and every surface that renders it says "template" — the notice
   below, the label above the title, and its noindex. Adding a real record to
   ARTICLES removes this page from the build entirely.
   ============================================================ */

const bySlug = (slug: string) => ROUTABLE_ARTICLES.find((a) => a.slug === slug);

export function generateStaticParams() {
  return ROUTABLE_ARTICLES.map((a) => ({ slug: a.slug }));
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
          author: { "@type": "Organization", name: "D’Life Revolution" },
        }}
      />
    </Shell>
  );
}
