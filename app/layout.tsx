import type { Metadata, Viewport } from "next";
import { SITE, isPreview } from "../lib/site";

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
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
};

/**
 * Entity graph for search and answer engines. Deliberately minimal: it carries
 * only facts the brief states outright. The "27 years" claim, any awards or
 * credentials (MDRT / GAMA / MDA) and the contact number are all open
 * questions in §14, and unverified claims must not go into structured data.
 */
const ORG_LD = {
  "@context": "https://schema.org",
  "@type": ["FinancialService", "InsuranceAgency"],
  "@id": `${SITE}/#organization`,
  name: "D’Life",
  legalName: "D’Life Revolution",
  url: SITE,
  slogan: "Real Support. Beyond the Policy.",
  description: DESCRIPTION,
  email: "hello@dlife.com.my",
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
  themeColor: "#0B211D",
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
