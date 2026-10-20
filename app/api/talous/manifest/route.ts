import { NextResponse } from "next/server";
import { MANIFEST, HOME_DOCUMENT, FILMS_DOCUMENT } from "../../../../content/cms/manifest";

/**
 * Talous CMS reads this to learn what it may edit here, and on first setup to
 * import the pages as they ship. Nothing secret: it describes the site's own
 * public content.
 */
export function GET() {
  return NextResponse.json({
    manifest: MANIFEST,
    pages: [
      { slug: "home", title: "Home", template: "home", content: HOME_DOCUMENT, seo: {} },
      // Created in the CMS on its next sync, then edited there (content/cms/films.ts).
      { slug: "films", title: "Film library", template: "films", content: FILMS_DOCUMENT, seo: {} },
    ],
  });
}
