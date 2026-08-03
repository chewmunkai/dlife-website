import type { Metadata, Viewport } from "next";
import { SITE, noIndex } from "../lib/site";

const TITLE = "D’Life · Real Support. Beyond the Policy.";
const DESCRIPTION =
  "Protection is only the beginning. D’Life brings real guidance, long-term relationships and support through life’s changes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s · D’Life" },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "D’Life",
    locale: "en_MY",
    url: SITE,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
};

/**
 * Entity graph for search and answer engines. Deliberately minimal: it carries
 * only facts the client has confirmed. The "27 years" claim and the awards and
 * credentials in the trust band (AIA principal, Million Dollar Agency, MDRT
 * Builder, the leadership and claims figures) are all still pending
 * verification, and unverified claims must not go into structured data.
 *
 * `legalName` is deliberately absent: the footer previously read "D’Life
 * Revolution" while contract documents say "D’Life Sdn Bhd", and that is an
 * open question. Structured data is the last place to guess at it.
 */
const ORG_LD = {
  "@context": "https://schema.org",
  "@type": ["FinancialService", "InsuranceAgency"],
  "@id": `${SITE}/#organization`,
  name: "D’Life",
  url: SITE,
  slogan: "Real Support. Beyond the Policy.",
  description: DESCRIPTION,
  email: "hello@dlife.com.my",
  // Office-hours WhatsApp, confirmed in the client correction report.
  telephone: "+60162362286",
  areaServed: { "@type": "Country", name: "Malaysia" },
  knowsLanguage: ["en", "ms"],
  founder: [
    { "@type": "Person", name: "Sharon Cheang", jobTitle: "Founder" },
    { "@type": "Person", name: "Rachel Cheang", jobTitle: "Co-founder" },
  ],
  knowsAbout: [
    "Financial planning",
    "Insurance advisory",
    "Income protection",
    "Medical and health protection",
    "Retirement planning",
    "Legacy planning",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Dark teal, one of the ten approved hexes. The comp's #0B211D was off-palette.
  themeColor: "#0F332C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Runs before paint: the stylesheet only pre-hides the loader/reveal
            content when JS is actually there to reveal it again. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }} />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
      </body>
    </html>
  );
}
