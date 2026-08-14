import type { Metadata } from "next";
import SolutionPage from "../../../components/pages/SolutionPage";
import { SOLUTIONS } from "../../../content/solutions";
import { ROUTES, SOLUTION_SLUGS, type RouteKey } from "../../../lib/routes";
import { pageMeta } from "../../../lib/seo";

/** Every solution route prerenders; the export writes flat HTML for each. */
export function generateStaticParams() {
  return SOLUTION_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return pageMeta(ROUTES[params.slug as RouteKey]);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <SolutionPage slug={params.slug as keyof typeof SOLUTIONS} />;
}
