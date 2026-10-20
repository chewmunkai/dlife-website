import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import JsonLd from "../../components/site/JsonLd";
import { Sections } from "../../components/cms/Sections";
import { PAGE_SECTIONS } from "../../components/pages";
import { faqsOf } from "../../components/pages/common";
import { CAREERS_PAGE } from "../../content/cms/pages/careers";
import { getFilms, getPublished, sectionsFromPublished } from "../../lib/talous";
import { ROUTES } from "../../lib/routes";
import { pageMeta, breadcrumbLd, faqLd, withCmsSeo } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsSeo(pageMeta(ROUTES.careers), (await getPublished("careers"))?.seo ?? {});
}

/* ============================================================
   Grow With D'Life — careers.

   ⚠️ NO INCOME FIGURES ON THIS PAGE. That is a standing guardrail from the
   design bundle, and it is also the page's argument: the FAQ says plainly
   that any figure published here would be someone else's and not the
   reader's. Do not add a range, an average or a top-earner number, and do not
   soften the "it starts slowly" line.

   The page is deliberately unexciting next to how the industry usually
   recruits. `.stated` replaced a tick-and-cross pair, because an agency
   describing its own work should state what the work is rather than argue
   with an imagined objection; the one honest exclusion sits underneath as a
   sentence (`.fnote`) instead of a column of crosses.

   The pull-quote attribution is pending advisor consent. Do not attach a name
   to it until that is in writing.

   ⚠️ A10 (31 Aug 2026): the client supplied the income answer themselves —
   "a structured 18-month career programme, which includes a basic bonus
   allowance alongside commission-based earnings". That copy is now the FAQ
   answer and the footnote above the FAQs was aligned to it. The standing rule
   is unchanged in substance: still no range, no average, no top-earner number.
   Settled by the client on 6 Sep 2026: the page states the 18 months and
   nothing else. Everything further — what the allowance is, how it steps, any
   qualifying conditions — is deliberately revealed in the conversation, not
   on the page. Do not add it here later without asking them again.
   ============================================================ */

export default async function Page() {
  const route = ROUTES.careers;
  // Sections and copy from Talous CMS; content/cms/pages/careers.ts holds today's as defaults
  // (the work cards, qualities and questions moved there from this file).
  const [published, films] = await Promise.all([getPublished("careers"), getFilms()]);
  const blocks = sectionsFromPublished(published, CAREERS_PAGE.content);
  const faqs = faqsOf(blocks);
  return (
    <Shell>
      <Sections blocks={blocks} registry={PAGE_SECTIONS} context={{ route, films }} />
      <JsonLd data={breadcrumbLd(route)} />
      {faqs.length > 0 && <JsonLd data={faqLd(faqs)} />}
    </Shell>
  );
}
