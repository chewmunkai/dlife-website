import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import JsonLd from "../../components/site/JsonLd";
import { Sections } from "../../components/cms/Sections";
import { PAGE_SECTIONS } from "../../components/pages";
import { faqsOf } from "../../components/pages/common";
import { POLICY_PAGE } from "../../content/cms/pages/policy";
import { getPublished, sectionsFromPublished } from "../../lib/talous";
import { ROUTES } from "../../lib/routes";
import { pageMeta, breadcrumbLd, faqLd, withCmsSeo } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsSeo(pageMeta(ROUTES.policy), (await getPublished("existing-policy-support"))?.seo ?? {});
}

/* ============================================================
   Existing Policy Support.

   ⚠️ STANDING GUARDRAIL, from the design bundle and the direction guide.
   This page must never:
     · name an insurer or a competitor
     · imply that whoever advised the visitor before did a poor job
     · suggest switching agency, or read as acquisition dressed as service

   It is a service offer. The page says outright that most reviews end with
   the client keeping exactly what they had, and the `.fnote` states what the
   review is not. Removing either of those turns a service page into a
   prospecting page, which is the failure mode this copy was written against.
   ============================================================ */

export default async function Page() {
  const route = ROUTES.policy;
  // Sections and copy from Talous CMS; content/cms/pages/policy.ts holds today's as defaults
  // (the cards, points, steps and questions moved there from this file).
  const blocks = sectionsFromPublished(await getPublished("existing-policy-support"), POLICY_PAGE.content);
  const faqs = faqsOf(blocks);
  return (
    <Shell>
      <Sections blocks={blocks} registry={PAGE_SECTIONS} context={{ route }} />
      <JsonLd data={breadcrumbLd(route)} />
      {faqs.length > 0 && <JsonLd data={faqLd(faqs)} />}
    </Shell>
  );
}
