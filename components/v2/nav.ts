import { ROUTES, LIFE_NEEDS } from "../../lib/routes";

/* ============================================================
   Navigation model for the new design (direction E2).

   Deliberately separate from lib/routes.ts' PRIMARY_NAV / FOOTER_NAV, which
   the pages still on the previous design continue to use. The two differ in
   information architecture, not just in styling:

     · seven pillars in the bar rather than five — "About D'Life" and
       "Articles & Events" are promoted out of the Community panel
     · Community drops to two children (Youth, DVA), because About left it
     · the footer's Guidance group carries real routes only; the homepage
       anchors ("Find Your Path", "Common Questions") are gone

   Paths and labels still resolve through ROUTES, so there is one map of the
   site and this file only decides ordering and grouping. When the remaining
   pages are ported, this replaces PRIMARY_NAV rather than living beside it.
   ============================================================ */

export type NavLink = { label: string; href: string };
export type NavPillar = NavLink & { children?: NavLink[] };

/* Corporate Solutions is withheld (2026-08) and so is absent here. See the
   note on SOLUTION_SLUGS in lib/routes.ts. */
const SOLUTION_LINKS: NavLink[] = LIFE_NEEDS.map((r) => ({ label: r.label, href: r.path }));

/* Round 8 (2026-08, client): Contact joins the bar, and Stories moves under
   About D'Life as a child rather than holding a pillar of its own. Stories is
   about the people, so it belongs with them, and it frees the seventh slot for
   the one route a visitor looks for by name. Still seven pillars. */
export const NAV: NavPillar[] = [
  { label: "Solutions", href: ROUTES.solutions.path, children: SOLUTION_LINKS },
  { label: "Existing Policy Support", href: ROUTES.policy.path },
  {
    label: "About D’Life",
    href: ROUTES.about.path,
    children: [
      { label: "Our Founders", href: ROUTES.about.path },
      { label: ROUTES.stories.label, href: ROUTES.stories.path },
    ],
  },
  { label: "Careers", href: ROUTES.careers.path },
  { label: "Articles & Events", href: ROUTES.resources.path },
  {
    label: "Community",
    href: ROUTES.youth.path,
    children: [
      { label: ROUTES.youth.label, href: ROUTES.youth.path },
      { label: "Drive Value Associates (DVA)", href: ROUTES.dva.path },
    ],
  },
  { label: "Contact Us", href: ROUTES.contact.path },
];

/** The overlay carries the same seven pillars, numbered. */
export const OVERLAY_NAV: NavLink[] = NAV.map(({ label, href }) => ({ label, href }));

export const FOOTER_DIRS: Array<{ heading: string; links: NavLink[] }> = [
  { heading: "Protection & Planning", links: SOLUTION_LINKS },
  {
    heading: "Guidance & Support",
    links: [
      { label: ROUTES.policy.label, href: ROUTES.policy.path },
      { label: "Articles & Events", href: ROUTES.resources.path },
      { label: ROUTES.contact.label, href: ROUTES.contact.path },
    ],
  },
  {
    heading: "People & Community",
    links: [
      { label: "Our Founders", href: ROUTES.about.path },
      { label: "Advisor Stories", href: ROUTES.stories.path },
      { label: "Careers at D’Life", href: ROUTES.careers.path },
      { label: "Drive Value Associates", href: ROUTES.dva.path },
      { label: ROUTES.youth.label, href: ROUTES.youth.path },
    ],
  },
];

export const LEGAL_LINKS: NavLink[] = [
  ROUTES.privacy,
  ROUTES.terms,
  ROUTES.disclosures,
  ROUTES.complaints,
].map((r) => ({ label: r.label, href: r.path }));
