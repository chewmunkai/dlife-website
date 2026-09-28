import type { Metadata } from "next";
import DLife from "../components/DLife";
import SiteShell from "../components/site/SiteShell";
import JsonLd from "../components/site/JsonLd";
import { ROUTES } from "../lib/routes";
import { pageMeta, faqLd } from "../lib/seo";
import { getPublished, homeFromPublished } from "../lib/talous";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = homeFromPublished(await getPublished("home"));
  return pageMeta(ROUTES.home, {
    // The homepage carries the brand line rather than the "%s · D’Life"
    // template, which would read "Real Support. Beyond the Policy. · D’Life".
    title: { absolute: seo.title || "D’Life · Real Support. Beyond the Policy." },
    ...(seo.description ? { description: seo.description } : {}),
  });
}

export default async function Page() {
  // Published content from Talous CMS, or the repo's own content when the CMS is not configured or unreachable.
  const { hero, faq } = homeFromPublished(await getPublished("home"));
  return (
    <SiteShell path={ROUTES.home.path} loader>
      <DLife hero={hero} faq={faq} />
      {/* Built from the same array the accordion renders, so the answers a
          search engine reads cannot drift from the ones on screen. */}
      <JsonLd data={faqLd(faq.items)} />
    </SiteShell>
  );
}
