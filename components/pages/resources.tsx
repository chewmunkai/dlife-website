import { Band, Events } from "../v2/blocks";
import { ArticleGrid, ArticleLead } from "../v2/articles";
import { ROUTABLE_ARTICLES, type Article } from "../../content/articles";
import { Rich } from "../home/rich";
import { Markdown } from "../kit/md";
import { hrefOf } from "./common";

/* /resources sections (content/cms/pages/resources.ts). */

/** The article listing: driven by content/articles.ts, newest set wide, older ones in a grid. */
export function ResourcesArticles({ label, title, articles }: { label?: string; title?: string; articles?: Article[] }) {
  // The page passes the articles as published in the CMS; the editor shows the file's.
  const list = articles ?? ROUTABLE_ARTICLES;
  if (list.length === 0) return null;
  return (
    <Band label={label || undefined} title={title ? <Rich text={title} /> : undefined}>
      <div className="arts">
        <ArticleLead a={list[0]} />
        {list.length > 1 && <ArticleGrid items={list.slice(1)} />}
      </div>
    </Band>
  );
}

type Event = { id?: string; when?: string; where?: string; title?: string; photo?: string; photoAlt?: string; copy?: string };

export function ResourcesEvents({ label, title, prose, events, cta, ctaHref }: { label?: string; title?: string; prose?: string; events?: Event[]; cta?: string; ctaHref?: string }) {
  return (
    <Band label={label || undefined} title={title ? <Rich text={title} /> : undefined}>
      {prose && (
        <div className="dl-prose" style={{ marginTop: 20 }}>
          <Markdown text={prose} />
        </div>
      )}
      <Events
        items={(events ?? []).map((e) => ({ when: e.when ?? "", where: e.where ?? "", title: e.title ?? "", copy: e.copy ?? "", photo: e.photo ? { src: e.photo, alt: e.photoAlt ?? "" } : undefined }))}
        href={hrefOf(ctaHref || "wa:event")}
        {...(cta ? { cta } : {})}
      />
    </Band>
  );
}
