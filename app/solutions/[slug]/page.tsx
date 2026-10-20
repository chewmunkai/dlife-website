import type { Metadata } from "next";
import Shell from "../../../components/v2/Shell";
import JsonLd from "../../../components/site/JsonLd";
import { Sections } from "../../../components/cms/Sections";
import { PAGE_SECTIONS } from "../../../components/pages";
import { faqsOf } from "../../../components/pages/common";
import { solutionDocument } from "../../../content/cms/pages/solutions";
import { getPublished, sectionsFromPublished } from "../../../lib/talous";
import { ROUTES, SOLUTION_SLUGS, type RouteKey } from "../../../lib/routes";
import { pageMeta, breadcrumbLd, faqLd, serviceLd, withCmsSeo } from "../../../lib/seo";

/** Every solution route prerenders; the export writes flat HTML for each. */
export function generateStaticParams() {
  return SOLUTION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return withCmsSeo(pageMeta(ROUTES[params.slug as RouteKey]), (await getPublished(`solutions/${params.slug}`))?.seo ?? {});
}

/* ============================================================
   One template, six pages — August 2026 amendments round.

   The four beats are unchanged; four sections were rebuilt at the client's
   direction (see styles/amendments.css for each design's rationale):

   · The opening is now a typographic statement (OpenStatement), not a
     side-by-side block.
   · RECOGNISE lost its photograph and its label: the five situations ARE the
     content, as numbered statement rows (Moments).
   · EXPLAIN is a hairline windowpane (Ideas).
   · The steps ride a contained ink panel (StepsPanel) for contrast.
   · The closing is a premium rounded card with the brand's ring motif and no
     background photograph (ClosingCard).
   · The intent bar no longer sticks.

   Copy is published from Talous CMS; content/solutions.ts + solutions-e2.ts
   are its defaults (content/cms/pages/solutions.ts builds each page's
   document from them), and none of it lives here.
   ============================================================ */

export default async function Page({ params }: { params: { slug: string } }) {
  const route = ROUTES[params.slug as RouteKey];
  const blocks = sectionsFromPublished(await getPublished(`solutions/${params.slug}`), solutionDocument(params.slug).content);
  const faqs = faqsOf(blocks);
  return (
    <Shell>
      <Sections blocks={blocks} registry={PAGE_SECTIONS} context={{ route }} />
      <JsonLd data={serviceLd(route)} />
      <JsonLd data={breadcrumbLd(route)} />
      {faqs.length > 0 && <JsonLd data={faqLd(faqs)} />}
    </Shell>
  );
}
