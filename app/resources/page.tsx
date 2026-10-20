import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import JsonLd from "../../components/site/JsonLd";
import { Sections } from "../../components/cms/Sections";
import { PAGE_SECTIONS } from "../../components/pages";
import { RESOURCES_PAGE } from "../../content/cms/pages/resources";
import { getFilms, getPublished, sectionsFromPublished } from "../../lib/talous";
import { ROUTES } from "../../lib/routes";
import { pageMeta, breadcrumbLd, withCmsSeo } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsSeo(pageMeta(ROUTES.resources), (await getPublished("resources"))?.seo ?? {});
}

/* ============================================================
   Articles & Events.

   Simplified at the client's direction: two sections, articles then events.
   The old "Guidance" card grid duplicated the Solutions hub, the sign-up band
   duplicated the Youth page's, and "Also on this site" was a list of links
   the footer already carries.

   ⚠️ No article library exists yet, and this page must not pretend otherwise.
   While content/articles.ts is empty the section shows a labelled template
   with placeholder copy so the layout can be approved before anything is
   written. Publishing a record removes the template automatically.

   Event dates stay vague because no calendar has been supplied; every "ask
   about attending" opens WhatsApp rather than linking to a schedule that is
   not there.
   ============================================================ */

export default async function Page() {
  const route = ROUTES.resources;
  // Sections and copy from Talous CMS; content/cms/pages/resources.ts holds today's as defaults
  // (the events moved there from this file). The films preview shows the Film library's first three.
  const blocks = sectionsFromPublished(await getPublished("resources"), RESOURCES_PAGE.content);
  const films = await getFilms();
  return (
    <Shell>
      <Sections blocks={blocks} registry={PAGE_SECTIONS} context={{ route, films }} />
      <JsonLd data={breadcrumbLd(route)} />
    </Shell>
  );
}
