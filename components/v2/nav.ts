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

const SOLUTION_LINKS: NavLink[] = [
  ...LIFE_NEEDS.map((r) => ({ label: r.label, href: r.path })),
  { label: ROUTES.corporate.label, href: ROUTES.corporate.path },
];

export const NAV: NavPillar[] = [
  { label: "Solutions", href: ROUTES.solutions.path, children: SOLUTION_LINKS },
  { label: "Existing Policy Support", href: ROUTES.policy.path },
  { label: "About D’Life", href: ROUTES.about.path },
  { label: "Stories", href: ROUTES.stories.path },
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
