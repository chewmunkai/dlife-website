import type { Metadata } from "next";
import LegalPage from "../../components/v2/LegalPage";
import { ROUTES } from "../../lib/routes";
import { pageMeta } from "../../lib/seo";

// Legal pages are noindex until reviewed — see pageMeta's `utility` handling
// and the draft banner in components/v2/LegalPage.
export const metadata: Metadata = pageMeta(ROUTES.terms);

export default function Page() {
  return <LegalPage slug="terms" />;
}
