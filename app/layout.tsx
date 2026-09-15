import type { Metadata, Viewport } from "next";
import { Lora, Work_Sans } from "next/font/google";
import { SITE, isPreview } from "../lib/site";
import { ORGANISATION_LD, OG_IMAGE } from "../lib/seo";

/* Both typefaces used to arrive through CSS `@import url(fonts.googleapis…)`
   — twice, once per design system — which is the slowest way a font can load:
   the stylesheet has to download and parse before the browser even learns the
   font exists, then two more round trips to a third party, then the swap.
   next/font downloads them at build time, serves them from /_next/static with
   the page, preloads them, and sizes the fallback face so the swap does not
   move the text. The weights are the union of what the two @imports asked for. */
const lora = Lora({ subsets: ["latin"], style: ["normal", "italic"], display: "swap", variable: "--font-lora" });
const workSans = Work_Sans({ subsets: ["latin"], display: "swap", variable: "--font-work-sans" });

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
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE.url] },
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B211D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // suppressHydrationWarning: the inline script below adds class="js" to
  // <html> before React hydrates, so the client tree carries an attribute the
  // server never rendered. That is the point of the script, not a mismatch to
  // fix — but React 18 logs it on every page in development. The flag
  // silences that one element and nothing below it.
  return (
    <html lang="en" className={`${lora.variable} ${workSans.variable}`} suppressHydrationWarning>
      <body>
        {/* Runs before paint: the stylesheet only pre-hides the loader/reveal
            content when JS is actually there to reveal it again. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }} />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANISATION_LD) }} />
      </body>
    </html>
  );
}
