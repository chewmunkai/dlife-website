import type { Metadata } from "next";
import DLife from "../components/DLife";
import SiteShell from "../components/site/SiteShell";
import JsonLd from "../components/site/JsonLd";
import { ROUTES } from "../lib/routes";
import { pageMeta, faqLd, withCmsSeo } from "../lib/seo";
import { getPublished, homeFromPublished } from "../lib/talous";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = homeFromPublished(await getPublished("home"));
  const base = pageMeta(ROUTES.home, {
    // The homepage carries the brand line rather than the "%s · D’Life"
    // template, which would read "Real Support. Beyond the Policy. · D’Life".
    title: { absolute: seo.title || "D’Life · Real Support. Beyond the Policy." },
  });
  // Page settings set in Talous CMS reach search results and link previews alike.
  return withCmsSeo(base, seo);
}

export default async function Page() {
  // Published content from Talous CMS, or the repo's own content when the CMS is not configured or unreachable.
  const { blocks, faq } = homeFromPublished(await getPublished("home"));
  return (
    <SiteShell path={ROUTES.home.path} loader>
      <DLife blocks={blocks} />
      {/* Built from the same array the accordion renders, so the answers a
          search engine reads cannot drift from the ones on screen. */}
      {faq && <JsonLd data={faqLd(faq.items)} />}
    </SiteShell>
  );
}
