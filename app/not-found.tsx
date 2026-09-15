import type { Metadata } from "next";
import Shell from "../components/v2/Shell";
import { Hero } from "../components/v2/blocks";
import { ROUTES } from "../lib/routes";
import { link } from "../lib/asset";

/* ============================================================
   404.

   Until this file existed the site shipped Next's built-in not-found page:
   "404 / This page could not be found." in the browser's default font, with
   no header, no footer and not a single link — a dead end on a site whose
   whole premise is that someone will pick up. GitHub Pages serves this file
   for any URL it has no page for, so it is the one route a mistyped or stale
   link always lands on.

   It reuses the page shell and the hero block so it looks like the rest of
   the site, and offers the three places a lost visitor most plausibly meant
   to go. noindex: a 404 has no business in a search result.
   ============================================================ */

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Shell>
      <Hero
        route={ROUTES.home}
        label="Page not found"
        title="That page isn’t here"
        lede="The link may be out of date, or the address may have a typo in it. Nothing is lost — everything on the site is a step away."
        actions={
          <>
            <a className="pill" href={link(ROUTES.home.path)}>
              <span>Go to the homepage</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.solutions.path)}>
              <span>See what we help with</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.contact.path)}>
              <span>Contact us</span>
            </a>
          </>
        }
      />
    </Shell>
  );
}
