import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import JsonLd from "../../components/site/JsonLd";
import { Sections } from "../../components/cms/Sections";
import { PAGE_SECTIONS } from "../../components/pages";
import { ABOUT_PAGE } from "../../content/cms/pages/about";
import { getPublished, sectionsFromPublished } from "../../lib/talous";
import { ROUTES } from "../../lib/routes";
import { pageMeta, breadcrumbLd, withCmsSeo } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsSeo(pageMeta(ROUTES.about), (await getPublished("about"))?.seo ?? {});
}

/* ============================================================
   About D'Life.

   ⚠️ VERIFY BEFORE PUBLISH. Every figure on this page came through the client
   brief unverified and is listed as such in the design bundle's own README:
   the 27 years, all eight recognition entries, the 3 agency managers, the 40+
   unit managers and the MDRT line. They are stated plainly rather than
   displayed as achievements, and the recognition band says on the page that
   it is pending verification. Do not promote any of them into a headline
   claim until the client confirms them.

   ⚠️ "Protect Lives. Build Wealth. Transform People. Create Impact." is
   presented here as the practice's four commitments, NOT as a quotation from
   Sharon. It arrived through the brief as D'Life's own four-part line, and
   whether Sharon ever said it as a sentence is unconfirmed. No attribution is
   printed. Confirm before adding one.

   A15 (client, 31 Aug 2026): the founder portraits are real now. Sharon and
   Rachel were supplied as SHARON.jpg and RACHEL.jpg in the client's own Drive
   folder, and each is mapped to its subject BY FILENAME — not by looking at
   the two photographs and deciding which woman is the older sister. If a
   third portrait ever arrives, map it the same way and confirm the name with
   the client rather than inferring it.

   The empty-slot path below is kept for exactly that case: a founder without
   a portrait still renders a marked slot. A stock photograph standing in for
   a real named person is the one substitution this design system refuses to
   make, and that has not changed.

   ⚠️ TODO(launch): both portraits are studio shots in AIA MDRT blazers, with
   the AIA wordmark and the MDRT roundel legible on the lapel. Nothing else on
   this site names an insurer — content/solutions.ts forbids it outright — so
   whether D'Life wants insurer branding on its founders' portraits is the
   client's call and a compliance question, not a design one. Raise it before
   launch. The alternative is a re-shoot, not a retouch.
   ============================================================ */

export default async function Page() {
  const route = ROUTES.about;
  // Sections and copy from Talous CMS; content/cms/pages/about.ts holds today's as defaults
  // (the founders' copy and the record moved there from this file).
  const blocks = sectionsFromPublished(await getPublished("about"), ABOUT_PAGE.content);
  return (
    <Shell>
      <Sections blocks={blocks} registry={PAGE_SECTIONS} context={{ route }} />
      <JsonLd data={breadcrumbLd(route)} />
    </Shell>
  );
}
