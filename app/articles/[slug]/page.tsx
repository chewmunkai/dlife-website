import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OG_IMAGE, withCmsSeo } from "../../../lib/seo";
import Shell from "../../../components/v2/Shell";
import JsonLd from "../../../components/site/JsonLd";
import { Sections } from "../../../components/cms/Sections";
import { PAGE_SECTIONS } from "../../../components/pages";
import { PREVIEW_ARTICLES } from "../../../content/articles";
import { articleDocument, articleFrom } from "../../../content/cms/pages/articles";
import { getArticles } from "../../../lib/articles";
import { getPublished, sectionsFromPublished } from "../../../lib/talous";
import { ROUTES } from "../../../lib/routes";
import { SITE } from "../../../lib/site";

/* ============================================================
   Article page.

   One template, every article. Body copy is published from Talous
   CMS (content/cms/pages/articles.ts; content/articles.ts holds the defaults)
   rather than markup here, so publishing is a content
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
const published = (slug: string) => (bySlug(slug)?.template ? Promise.resolve(null) : getPublished(`articles/${slug}`));

/* ⚠️ No `dynamicParams = false` here, deliberately. With it set, `next dev`
   refuses this route — "missing exported function generateStaticParams()",
   even though the function is declared directly below and the production
   build generates the page correctly. It costs nothing: the export is
   static, so only the slugs returned below are ever written. */
export function generateStaticParams() {
  return PREVIEW_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const file = bySlug(params.slug);
  if (!file) return {};
  const p = await published(params.slug);
  const a = articleFrom(file, p?.content.content.find((b) => b.type === "ArticleMain")?.props);
  return withCmsSeo(
    {
      title: a.title,
      description: a.blurb,
      alternates: { canonical: `${SITE}${ROUTES.resources.path}/../articles/${a.slug}`.replace("/../", "/") },
      robots: a.template ? { index: false, follow: false } : undefined,
      openGraph: { type: "article", title: a.title, description: a.blurb, images: [OG_IMAGE] },
      twitter: { card: "summary_large_image", title: a.title, description: a.blurb, images: [OG_IMAGE.url] },
    },
    p?.seo ?? {},
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const file = bySlug(params.slug);
  /* No such article: a 404, not an empty page. Since 12 Oct 2026 that includes /articles/template:
     the template has a real article in its place. */
  if (!file) notFound();
  const p = await published(params.slug);
  const blocks = sectionsFromPublished(p, articleDocument(file).content);
  const a = articleFrom(file, blocks.find((b) => b.type === "ArticleMain")?.props);
  const articles = await getArticles();
  return (
    <Shell>
      <Sections blocks={blocks} registry={PAGE_SECTIONS} context={{ slug: a.slug, template: !!a.template, articles }} />
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
