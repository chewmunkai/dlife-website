import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import JsonLd from "../../components/site/JsonLd";
import Breadcrumbs from "../../components/site/Breadcrumbs";
import { Band, Prose } from "../../components/blocks/Prose";
import SiteMap, { type SiteMapRow } from "../../components/blocks/SiteMap";
import { ROUTES, ALL_ROUTES, SOLUTION_SLUGS } from "../../lib/routes";
import { link } from "../../lib/asset";
import { pageMeta, breadcrumbLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.siteIndex);

/* ============================================================
   Site index.

   ⚠️ BUILD REFERENCE, NOT A PAGE OF THE PRACTICE. It describes the site
   rather than serving a visitor, so it is `utility` in the route map:
   noindex, out of the sitemap, and absent from the primary nav, the overlay
   menu and the footer directory. Reached by typing the address.

   ── Two departures from the design ─────────────────────────
   The design bundle this page comes from was an inner-pages build with the
   homepage deliberately excluded, and its `index.html` stood in as the root
   while that work went on. Its own README settles what happens next: "point
   `/` at the real homepage when the two are joined". Here they are joined —
   this repository has the approved homepage — so:

   • The index moves off `/` to its own address, and the homepage keeps the
     root. Taking `/` would have replaced a finished page with a listing of
     filenames.
   • The design's notice said the homepage was not in the build. That is no
     longer true, so repeating it would be a false statement rendered on the
     page. The notice below says what is actually the case instead, and the
     homepage is listed like every other route.

   The rows are `Route` records, not hand-written links: lib/routes.ts is the
   single source of truth, so a path renamed there is renamed here, and this
   page cannot drift into advertising addresses that no longer resolve.
   ============================================================ */

export default function Page() {
  const route = ROUTES.siteIndex;

  /* Every page this build ships, less this index — the figure quoted in the
     lede. Derived from the route map rather than typed, so it stays true when
     a route is added. */
  const pageCount = ALL_ROUTES.filter((r) => r.path !== route.path && !r.hidden).length;

  const solutions: SiteMapRow[] = [
    { route: ROUTES.solutions, title: "Protection & Planning — hub" },
    ...SOLUTION_SLUGS.map((slug) => ({ route: ROUTES[slug] })),
  ];

  const service: SiteMapRow[] = [
    { route: ROUTES.policy },
    { route: ROUTES.resources },
    { route: ROUTES.contact },
  ];

  const people: SiteMapRow[] = [
    { route: ROUTES.about },
    { route: ROUTES.stories, title: "Advisor Stories" },
    { route: ROUTES.careers, title: "Grow With D’Life — careers" },
    { route: ROUTES.dva },
    { route: ROUTES.youth },
  ];

  const legal: SiteMapRow[] = [
    { route: ROUTES.privacy },
    { route: ROUTES.terms },
    { route: ROUTES.disclosures },
    { route: ROUTES.complaints },
  ];

  return (
    <SiteShell path={route.path}>
      {/* The design's opening: a cream panel cut into a deep ground, with no
          photograph beside it. `light` re-declares the default mode so the
          panel keeps its teal headings inside the dark band. */}
      <section className="dl-indexhero dark">
        <div className="dl-indexhero__card light">
          <Breadcrumbs route={route} />
          <span className="lb rv">Site index</span>
          <h1 className="rv">Every page in this build</h1>
          <p className="dl-lede rv">
            {pageCount} routes, one route map underneath them, and the design system’s tokens and blocks under that.
            Header, overlay menu, footer directory and breadcrumbs are live across all of them.
          </p>
        </div>
      </section>

      <Band width="read">
        <div className="dl-notice rv">
          <strong>The homepage is the root, and it is in this build.</strong>
          <p>
            The design bundle this index came from left the homepage out — it was approved and frozen upstream while
            the inner pages were worked on, so nothing in that bundle recreated it. Here the two are joined: <code>/</code>{" "}
            is the homepage, and this page is a build reference rather than a public one. It is noindex and stays out of
            the sitemap.
          </p>
        </div>
        <SiteMap rows={[{ route: ROUTES.home, title: "Homepage" }]} />
      </Band>

      <Band
        tone="sand"
        label="Protection & planning"
        title={<>Solutions</>}
        lede="One hub and six pages. Each solution page follows the same four beats: what prompts it, what it covers, how the conversation goes, and what people ask first."
      >
        <SiteMap rows={solutions} />
      </Band>

      <Band
        label="Guidance & support"
        title={<>Service and contact</>}
        lede="The policy-review offer is the guardrailed one: no insurer names, no agency-switching implication, no suggestion that anyone was let down before."
      >
        <SiteMap rows={service} />
      </Band>

      <Band
        tone="sand"
        label="People & community"
        title={<>The agency, and the two programmes</>}
        lede="DVA is short, dark and contained — by invitation. Youth Community is the long, warm, open half of the pair."
      >
        <SiteMap rows={people} />
      </Band>

      <Band
        label="Legal"
        title={<>Four drafts, openly marked</>}
        lede="Structural drafts in the site’s own voice. Every value that cannot be invented — licence, regulator, retention periods, escalation route — is a visible marker rather than plausible-looking filler."
      >
        <SiteMap rows={legal} />
      </Band>

      <Band tone="sand" width="read" label="Before launch" title={<>What is still a placeholder</>}>
        <Prose>
          <ul>
            <li>The WhatsApp number, email address and office address are the prototype’s placeholders.</li>
            <li>Founder portraits ship as marked empty slots; no brand shoot has landed.</li>
            <li>
              Every award, figure and year on <a href={link(ROUTES.about.path)}>About</a> is verify-before-publish.
            </li>
            <li>No form endpoint anywhere — WhatsApp and email are the only routes that reach a person.</li>
            <li>
              Whether D’Life is licensed in its own right or operates under a larger insurer is unresolved, and it
              changes the wording on all four legal pages, starting with{" "}
              <a href={link(ROUTES.disclosures.path)}>Disclosures</a>.
            </li>
          </ul>
          <p>
            Thirteen open items in all, each one marked <code>TODO(launch)</code> or ⚠️ at its call site. The full
            table, with what each one blocks, is in <code>docs/elementor-handoff.md</code> §9.
          </p>
        </Prose>
      </Band>

      <JsonLd data={breadcrumbLd(route)} />
    </SiteShell>
  );
}
