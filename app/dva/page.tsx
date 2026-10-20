import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import JsonLd from "../../components/site/JsonLd";
import { Sections } from "../../components/cms/Sections";
import { PAGE_SECTIONS } from "../../components/pages";
import { faqsOf } from "../../components/pages/common";
import { DVA_PAGE } from "../../content/cms/pages/dva";
import { getPublished, sectionsFromPublished } from "../../lib/talous";
import { ROUTES } from "../../lib/routes";
import { pageMeta, breadcrumbLd, faqLd, withCmsSeo } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsSeo(pageMeta(ROUTES.dva), (await getPublished("dva"))?.seo ?? {});
}

/* ============================================================
   Drive Value Associates (DVA).

   Source: the client's own "About the Founders" document, section 4, as
   rebuilt in the Claude Design project (direction E2, "layered depth").

   ── Design intent ──────────────────────────────────────────
   DVA and the Youth Community are a deliberate contrast pair. DVA's power is
   exclusivity; Youth's is openness. Placed together they explain each other
   without a paragraph of copy — so this page is short, dark, contained and
   restrained, and the Youth page is long, warm and content-rich. If a future
   edit makes this page bigger or brighter, the pair stops working.

   This is the only page in the site that opens on `.crest`: type first, with
   the photograph held back until under the fold. Every other page leads with
   a picture and a copy panel cut into it. That difference is the whole
   register change between something you can buy and something you are asked
   to join — do not "harmonise" this hero with the others.

   ⚠️ AUDIENCE — previously an open question, now resolved by the source.
   The client's document opens by describing DVA as "professionals from
   different backgrounds", then states its purpose as building "a community of
   exceptional financial advisors" and says plainly that it is "built for
   financial advisors". Read together, the consistent reading is: financial
   advisors, who arrive from a range of professional backgrounds. That is how
   this page is written. Worth confirming with Sharon at sign-off.

   ⚠️ Not open recruitment. Membership is by invitation and every member is
   personally interviewed by the founder. The page must never read as an
   application funnel — the CTA asks a question, it does not invite a signup.
   ============================================================ */

export default async function Page() {
  const route = ROUTES.dva;
  // Sections and copy from Talous CMS; content/cms/pages/dva.ts holds today's as defaults
  // (the circle's lists moved there from this file).
  const blocks = sectionsFromPublished(await getPublished("dva"), DVA_PAGE.content);
  const faqs = faqsOf(blocks);
  return (
    <Shell>
      <Sections blocks={blocks} registry={PAGE_SECTIONS} context={{ route }} />
      <JsonLd data={breadcrumbLd(route)} />
      {faqs.length > 0 && <JsonLd data={faqLd(faqs)} />}
    </Shell>
  );
}
