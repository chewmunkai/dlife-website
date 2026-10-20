import { NextResponse } from "next/server";
import { MANIFEST, HOME_DOCUMENT, FILMS_DOCUMENT } from "../../../../content/cms/manifest";
import { SITE_PAGES } from "../../../../content/cms/pages";
import { MENU_DOCUMENT } from "../../../../content/cms/menu";

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
      { slug: "menu", title: "Menu & footer", template: "menu", content: MENU_DOCUMENT, seo: {} },
      // The inner pages (content/cms/pages), imported on the next sync.
      ...SITE_PAGES.map((p) => ({ slug: p.slug, title: p.title, template: p.template, content: p.document, seo: {} })),
    ],
  });
}
