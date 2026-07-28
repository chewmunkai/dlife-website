import type { Metadata, Viewport } from "next";

// TODO(launch): confirm the production domain before go-live — canonical, OG
// URLs and the sitemap all derive from it.
const SITE = "https://dlife.com.my";
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
  robots: { index: true, follow: true },
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
      </body>
    </html>
  );
}
