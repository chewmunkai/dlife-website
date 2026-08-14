import type { Metadata } from "next";
import DLife from "../components/DLife";
import SiteShell from "../components/site/SiteShell";
import JsonLd from "../components/site/JsonLd";
import { ROUTES } from "../lib/routes";
import { pageMeta, faqLd } from "../lib/seo";
import { HOME_FAQS } from "../content/home";

export const metadata: Metadata = pageMeta(ROUTES.home, {
  // The homepage carries the brand line rather than the "%s · D’Life"
  // template, which would read "Real Support. Beyond the Policy. · D’Life".
  title: { absolute: "D’Life · Real Support. Beyond the Policy." },
});

export default function Page() {
  return (
    <SiteShell path={ROUTES.home.path} loader>
      <DLife />
      {/* Built from the same array the accordion renders, so the answers a
          search engine reads cannot drift from the ones on screen. */}
      <JsonLd data={faqLd(HOME_FAQS)} />
    </SiteShell>
  );
}
