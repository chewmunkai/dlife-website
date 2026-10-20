import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import JsonLd from "../../components/site/JsonLd";
import { Sections } from "../../components/cms/Sections";
import { PAGE_SECTIONS } from "../../components/pages";
import { faqsOf } from "../../components/pages/common";
import { YOUTH_PAGE } from "../../content/cms/pages/youth";
import { getPublished, sectionsFromPublished } from "../../lib/talous";
import { ROUTES } from "../../lib/routes";
import { pageMeta, breadcrumbLd, faqLd, withCmsSeo } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsSeo(pageMeta(ROUTES.youth), (await getPublished("youth-community"))?.seo ?? {});
}

/* ============================================================
   Youth Community.

   The open half of the contrast pair with DVA: where that page is short,
   dark and by invitation, this one is long, warm and content-rich. The pair
   explains itself without a paragraph of copy. If a future edit makes this
   page shorter or more exclusive, the pair stops working.

   ⚠️ Not a recruitment pipeline. The FAQ says so outright, and the guardrail
   matters: the great majority of members will never work with D'Life. Do not
   add a careers CTA to this page.

   Event dates and venues are deliberately vague ("Runs through the year",
   "Klang Valley") because no calendar has been supplied. The "Ask about
   dates" links go to WhatsApp rather than to a schedule that does not exist.
   ============================================================ */

export default async function Page() {
  const route = ROUTES.youth;
  // Sections and copy from Talous CMS; content/cms/pages/youth.ts holds today's as defaults
  // (the pillars, events and questions moved there from this file).
  const blocks = sectionsFromPublished(await getPublished("youth-community"), YOUTH_PAGE.content);
  const faqs = faqsOf(blocks);
  return (
    <Shell>
      <Sections blocks={blocks} registry={PAGE_SECTIONS} context={{ route }} />
      <JsonLd data={breadcrumbLd(route)} />
      {faqs.length > 0 && <JsonLd data={faqLd(faqs)} />}
    </Shell>
  );
}
