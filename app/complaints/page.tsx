import type { Metadata } from "next";
import LegalPage from "../../components/pages/LegalPage";
import { ROUTES } from "../../lib/routes";
import { pageMeta } from "../../lib/seo";

// Legal pages are noindex until reviewed — see pageMeta's `utility` handling
// and the draft banner in components/pages/LegalPage.
export const metadata: Metadata = pageMeta(ROUTES.complaints);

export default function Page() {
  return <LegalPage slug="complaints" />;
}
