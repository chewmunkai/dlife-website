import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import JsonLd from "../../components/site/JsonLd";
import { Sections } from "../../components/cms/Sections";
import { PAGE_SECTIONS } from "../../components/pages";
import { legalDocument } from "../../content/cms/pages/legal";
import { getPublished, sectionsFromPublished } from "../../lib/talous";
import { ROUTES } from "../../lib/routes";
import { pageMeta, breadcrumbLd, withCmsSeo } from "../../lib/seo";

// Legal pages are noindex until reviewed (pageMeta's `utility` handling), and carry the draft
// notice until it's switched off in the CMS (content/cms/pages/legal.ts).
export async function generateMetadata(): Promise<Metadata> {
  return withCmsSeo(pageMeta(ROUTES.complaints), (await getPublished("complaints"))?.seo ?? {});
}

export default async function Page() {
  const route = ROUTES.complaints;
  const blocks = sectionsFromPublished(await getPublished("complaints"), legalDocument("complaints").content);
  return (
    <Shell>
      <Sections blocks={blocks} registry={PAGE_SECTIONS} context={{ route }} />
      <JsonLd data={breadcrumbLd(route)} />
    </Shell>
  );
}
