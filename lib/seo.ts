/* ============================================================
   D'Life — SEO layer.

   The direction guide §11 asks for the foundation now, so later growth work
   does not require a rebuild: editable titles and descriptions, descriptive
   URLs, clean heading structure, alt text, a sitemap, indexing readiness and
   trackable CTAs. Titles and descriptions live in lib/routes.ts beside the
   route they describe; this file turns them into Next metadata and the
   structured data that goes with them.

   Everything here derives from ROUTES, so adding a page to the map gives it
   a canonical URL, an OG record, a breadcrumb trail and a sitemap entry
   without another edit.
   ============================================================ */
import type { Metadata } from "next";
import { SITE, isPreview } from "./site";
import { CONTACT } from "./contact";
import { ROUTES, trail, type Route } from "./routes";

/** Absolute URL for a site-relative path. */
export const abs = (path: string) => (path === "/" ? SITE : `${SITE}${path}`);

/**
 * Page metadata from a route. Canonical is always self-referential and
 * absolute; the preview build on GitHub Pages stays out of the index
 * entirely so it can never outrank the real domain.
 */
export function pageMeta(route: Route, extra?: Partial<Metadata>): Metadata {
  const url = abs(route.path);
  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "D’Life",
      locale: "en_MY",
      url,
      title: route.title,
      description: route.description,
    },
    twitter: { card: "summary_large_image", title: route.title, description: route.description },
    robots: isPreview || route.utility ? { index: false, follow: true } : { index: true, follow: true },
    ...extra,
  };
}

/* ---------- structured data ----------
   Nothing unverified goes in here. The direction guide §13 lists years of
   experience, awards, MDRT evidence, testimonials, photography, contact
   details and "all prototype statistics" as pending client verification, and
   an unverified claim in structured data is a claim made to search engines
   in D'Life's name. So the graph carries relationships and identity, not
   numbers. */

export const ORG_ID = `${SITE}/#organization`;
const SITE_ID = `${SITE}/#website`;

/** Emitted once, in the root layout. */
export const ORGANISATION_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["FinancialService", "InsuranceAgency"],
      "@id": ORG_ID,
      name: "D’Life",
      legalName: "D’Life Sdn Bhd",
      url: SITE,
      slogan: "Real Support. Beyond the Policy.",
      description: ROUTES.home.description,
      /* A16/A17: from the one contact record, placeholder and all. */
      email: CONTACT.email,
      areaServed: { "@type": "Country", name: "Malaysia" },
      knowsLanguage: ["en", "ms"],
      founder: [
        {
          "@type": "Person",
          "@id": `${SITE}/about#sharon`,
          name: "Sharon Cheang",
          jobTitle: "Founder & Transformation Leadership Mentor",
        },
        {
          "@type": "Person",
          "@id": `${SITE}/about#rachel`,
          name: "Rachel Cheang",
          jobTitle: "Co-Founder, Business Development & Community Growth",
        },
      ],
      knowsAbout: [
        "Financial planning",
        "Insurance advisory",
        "Income protection",
        "Medical and health protection",
        "Retirement planning",
        "Legacy planning",
      ],
      subOrganization: [
        { "@type": "Organization", "@id": `${SITE}/dva#dva`, name: "Drive Value Associates", url: abs("/dva") },
        {
          "@type": "Organization",
          "@id": `${SITE}/youth-community#youth`,
          name: "D’Life Youth Community",
          url: abs("/youth-community"),
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: SITE,
      name: "D’Life",
      publisher: { "@id": ORG_ID },
      inLanguage: "en-MY",
    },
  ],
};

/** BreadcrumbList for a route. Home is always the first crumb. */
export function breadcrumbLd(route: Route) {
  const crumbs = trail(route);
  if (crumbs.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: abs(c.path),
    })),
  };
}

/** FAQPage for a set of question/answer pairs already visible on the page. */
export function faqLd(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** Service, for a solutions page. `provider` points at the org node. */
export function serviceLd(route: Route) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(route.path)}#service`,
    name: route.title,
    description: route.description,
    serviceType: route.label,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Malaysia" },
    url: abs(route.path),
  };
}
