/* ============================================================
   D'Life — route map.

   One source of truth. The primary nav, the overlay menu, the footer
   directory, breadcrumbs, the sitemap and every "related content" block
   read from here, so a route can be renamed, moved or added in one place
   without leaving a dead link somewhere else on the site.

   The slugs are the ones the homepage already anticipated: its life-needs
   cards derive `#protecting-your-family` from the card title, and this file
   turns the same string into `/solutions/protecting-your-family`. Nothing
   had to be renamed to make the inner pages exist.

   `trailingSlash: false` in next.config.mjs, so paths carry no trailing
   slash and the export writes flat `/route.html` files.
   ============================================================ */

export type Route = {
  /** Absolute path, no trailing slash. */
  path: string;
  /** Nav and breadcrumb label — short. */
  label: string;
  /** <title> without the brand suffix; the layout template appends it. */
  title: string;
  /** Meta description. Kept under ~155 characters. */
  description: string;
  /**
   * One line of plain copy used when this route is offered as a card in a
   * "related content" block. Written as an invitation, not a summary.
   */
  teaser: string;
  /** Parent path, for breadcrumbs. Undefined on top-level routes. */
  parent?: string;
  /** Sitemap priority. Home is 1. */
  priority: number;
  /** Excluded from the sitemap and from nav — legal pages and utilities. */
  utility?: boolean;
};

/* ---------- the five life needs ----------
   Second person, per the correction report: "Protecting Your Family", not
   "Protecting Family". The homepage's life-needs cards use the same strings,
   and the noun-based wording keeps them distinct from the pathway selector's
   first-person routing labels ("Protect my family") — the non-duplication
   rule in the direction guide §03. */
export const SOLUTION_SLUGS = [
  "protecting-your-family",
  "protecting-your-income",
  "medical-health-preparation",
  "planning-for-your-future",
  "wealth-legacy",
  "corporate",
] as const;

export type SolutionSlug = (typeof SOLUTION_SLUGS)[number];

export const ROUTES = {
  home: {
    path: "/",
    label: "Home",
    title: "Real Support. Beyond the Policy.",
    description:
      "D’Life is a Malaysian financial advisory and insurance agency. Protection is only the beginning — we stay with you after the paperwork is done.",
    teaser: "Start at the beginning: who D’Life is, and which path is yours.",
    priority: 1,
  },

  solutions: {
    path: "/solutions",
    label: "Solutions",
    title: "Protection & Planning",
    description:
      "Family, income, medical, retirement and legacy — explained in plain language, with no obligation to decide anything today.",
    teaser: "Five areas of protection and planning, explained without jargon.",
    priority: 0.9,
  },
  "protecting-your-family": {
    path: "/solutions/protecting-your-family",
    label: "Protecting Your Family",
    title: "Protecting Your Family",
    description:
      "Coverage built around the people who depend on you — what it covers, how much is enough, and how to think about it clearly.",
    teaser: "Coverage built around the people who depend on you.",
    parent: "/solutions",
    priority: 0.8,
  },
  "protecting-your-income": {
    path: "/solutions/protecting-your-income",
    label: "Protecting Your Income",
    title: "Protecting Your Income",
    description:
      "If your income stopped for six months, what would change? Income protection explained in plain Malaysian terms.",
    teaser: "Keeping life steady when the unexpected interrupts your earnings.",
    parent: "/solutions",
    priority: 0.8,
  },
  "medical-health-preparation": {
    path: "/solutions/medical-health-preparation",
    label: "Medical & Health Preparation",
    title: "Medical & Health Preparation",
    description:
      "Practical preparation for treatment and recovery costs — how medical cover works in Malaysia, and what to check in what you hold.",
    teaser: "Practical preparation for treatment and recovery costs.",
    parent: "/solutions",
    priority: 0.8,
  },
  "planning-for-your-future": {
    path: "/solutions/planning-for-your-future",
    label: "Planning for Your Future",
    title: "Planning for Your Future",
    description:
      "Retirement and long-term planning, approached as a series of decisions you could explain to your own family.",
    teaser: "Retirement and long-term planning, at a pace that suits you.",
    parent: "/solutions",
    priority: 0.8,
  },
  "wealth-legacy": {
    path: "/solutions/wealth-legacy",
    label: "Wealth & Legacy",
    title: "Wealth & Legacy",
    description:
      "Growing what you have built and passing it on deliberately — the questions worth answering before the paperwork.",
    teaser: "Growing what you’ve built, and passing it on deliberately.",
    parent: "/solutions",
    priority: 0.8,
  },
  corporate: {
    path: "/solutions/corporate",
    label: "Corporate Solutions",
    title: "Corporate Solutions",
    description:
      "Employee protection and business continuity support for Malaysian companies, sized to the team you actually have.",
    teaser: "Employee protection and continuity cover for Malaysian businesses.",
    parent: "/solutions",
    priority: 0.6,
  },

  policy: {
    path: "/existing-policy-support",
    label: "Existing Policy Support",
    title: "Existing Policy Support",
    description:
      "Already hold a policy and want to understand it? We will walk you through what you are covered for, with no obligation to change anything.",
    teaser: "Understand the protection you already have. No obligation to change it.",
    priority: 0.9,
  },
  about: {
    path: "/about",
    label: "About D’Life",
    title: "About D’Life & Our Founders",
    description:
      "D’Life was founded by two sisters, Sharon and Rachel Cheang, on a simple belief: success is not about making money, it is about creating a meaningful life.",
    teaser: "Two sisters, and the belief the agency was built on.",
    priority: 0.8,
  },
  careers: {
    path: "/careers",
    label: "Careers",
    title: "Grow With D’Life",
    description:
      "A career built on real guidance, not just sales. Mentorship, professional standards and a route from advisor to leader.",
    teaser: "A career built on real guidance, not just sales.",
    priority: 0.8,
  },
  dva: {
    path: "/dva",
    label: "Drive Value Associates",
    title: "Drive Value Associates (DVA)",
    description:
      "By invitation. Built for leaders. A selective circle of financial advisors shaped by shared values, professionalism and experience.",
    teaser: "By invitation. Built for leaders.",
    priority: 0.7,
  },
  youth: {
    path: "/youth-community",
    label: "Youth Community",
    title: "Youth Community",
    description:
      "Empowering youth. Building tomorrow. Events, workshops, stories and resources built around health, wealth and leadership.",
    teaser: "Health, wealth and leadership — for the generation coming next.",
    priority: 0.8,
  },
  stories: {
    path: "/stories",
    label: "Stories",
    title: "Advisor Stories",
    description:
      "Real advisors in their own words — what the work actually looks like, who it is for, and what keeps them here.",
    teaser: "Real advisors, in their own words.",
    priority: 0.7,
  },
  resources: {
    path: "/resources",
    label: "Articles & Events",
    title: "Articles & Events",
    description:
      "Practical guidance on protection and planning, plus what is coming up across the D’Life community.",
    teaser: "Practical guidance, and what’s coming up.",
    priority: 0.7,
  },
  contact: {
    path: "/contact",
    label: "Contact",
    title: "Contact D’Life",
    description:
      "Start a conversation with a D’Life advisor. Most conversations with us don’t end in a decision, and that’s completely fine.",
    teaser: "Start a conversation. There is no obligation attached to it.",
    priority: 0.9,
  },

  /* Legal. Out of the sitemap's promotional set but linked from every footer. */
  privacy: {
    path: "/privacy",
    label: "Privacy Policy",
    title: "Privacy Policy",
    description: "How D’Life collects, uses and protects the personal information you share with us.",
    teaser: "How we handle the information you share with us.",
    priority: 0.2,
    utility: true,
  },
  terms: {
    path: "/terms",
    label: "Terms of Use",
    title: "Terms of Use",
    description: "The terms on which this website is made available.",
    teaser: "The terms on which this website is made available.",
    priority: 0.2,
    utility: true,
  },
  disclosures: {
    path: "/disclosures",
    label: "Disclosures",
    title: "Disclosures",
    description: "Regulatory and advisory disclosures relating to D’Life and the advice we provide.",
    teaser: "Regulatory and advisory disclosures.",
    priority: 0.2,
    utility: true,
  },
  complaints: {
    path: "/complaints",
    label: "Complaints & Feedback",
    title: "Complaints & Feedback",
    description: "How to raise a concern with D’Life, what happens next, and where to escalate if we cannot resolve it.",
    teaser: "How to raise a concern, and what happens next.",
    priority: 0.3,
    utility: true,
  },

  /* Build reference, not a page of the practice. It describes the site rather
     than serving a visitor, so it is `utility`: noindex, out of the sitemap,
     and reachable only from a direct link. It is deliberately absent from the
     primary nav, the overlay menu and the footer directory for the same
     reason — nothing about D'Life is explained here. */
  siteIndex: {
    path: "/site-index",
    label: "Site index",
    title: "Site index",
    description: "Every page in this build, grouped the way the site is structured.",
    teaser: "Every page in this build, with the address each one lives at.",
    priority: 0.1,
    utility: true,
  },
} satisfies Record<string, Route>;

export type RouteKey = keyof typeof ROUTES;

/** Every route, as a flat list. */
export const ALL_ROUTES: Route[] = Object.values(ROUTES);

/** Path → route, for breadcrumb resolution. */
const BY_PATH = new Map(ALL_ROUTES.map((r) => [r.path, r]));

export const routeAt = (path: string): Route | undefined => BY_PATH.get(path);

/** The five life needs, in page order. Corporate is deliberately excluded —
 *  the direction guide keeps it discoverable but out of the main branch. */
export const LIFE_NEEDS = SOLUTION_SLUGS.filter((s) => s !== "corporate").map(
  (s) => ROUTES[s as Exclude<SolutionSlug, "corporate">],
);

/**
 * Breadcrumb trail for a route, root first, the page itself last.
 * Home is always the first crumb even though it is not anyone's `parent`.
 */
export function trail(route: Route): Route[] {
  const crumbs: Route[] = [route];
  let cursor = route;
  while (cursor.parent) {
    const parent = BY_PATH.get(cursor.parent);
    if (!parent) break;
    crumbs.unshift(parent);
    cursor = parent;
  }
  if (crumbs[0].path !== "/") crumbs.unshift(ROUTES.home);
  return crumbs;
}

/* ---------- navigation ----------
   Five pillars, per the direction guide's "fewer clicks, cleaner path"
   principle: every major visitor reaches a useful route in one or two clicks.
   Solutions and Community carry panels; the rest are direct. */
export type NavItem = { label: string; href: string; children?: Array<{ label: string; href: string }> };

export const PRIMARY_NAV: NavItem[] = [
  {
    label: "Solutions",
    href: ROUTES.solutions.path,
    children: [
      ...LIFE_NEEDS.map((r) => ({ label: r.label, href: r.path })),
      { label: ROUTES.corporate.label, href: ROUTES.corporate.path },
    ],
  },
  { label: "Existing Policy Support", href: ROUTES.policy.path },
  { label: "Stories", href: ROUTES.stories.path },
  { label: "Careers", href: ROUTES.careers.path },
  {
    label: "Community",
    href: ROUTES.youth.path,
    children: [
      { label: ROUTES.youth.label, href: ROUTES.youth.path },
      { label: "Drive Value Associates (DVA)", href: ROUTES.dva.path },
      { label: ROUTES.about.label, href: ROUTES.about.path },
    ],
  },
];

/**
 * Footer directory, grouped and ordered by the audience priority in the
 * direction guide §02: clients (1) → existing-policy guidance and resources
 * (2, 7) → future advisors, stories, DVA, Youth (3–6). Corporate Solutions
 * sits inside group one rather than claiming a group of its own.
 */
export const FOOTER_NAV: Array<{ heading: string; links: Array<{ label: string; href: string }> }> = [
  {
    heading: "Protection & Planning",
    links: [
      ...LIFE_NEEDS.map((r) => ({ label: r.label, href: r.path })),
      { label: ROUTES.corporate.label, href: ROUTES.corporate.path },
    ],
  },
  {
    heading: "Guidance & Support",
    links: [
      { label: ROUTES.policy.label, href: ROUTES.policy.path },
      { label: "Find Your Path", href: "/#path" },
      { label: "Common Questions", href: "/#faq" },
      { label: ROUTES.resources.label, href: ROUTES.resources.path },
      { label: ROUTES.contact.label, href: ROUTES.contact.path },
    ],
  },
  {
    heading: "People & Community",
    links: [
      { label: "Our Founders", href: ROUTES.about.path },
      { label: "Advisor Stories", href: ROUTES.stories.path },
      { label: "Careers at D’Life", href: ROUTES.careers.path },
      { label: "Drive Value Associates (DVA)", href: ROUTES.dva.path },
      { label: ROUTES.youth.label, href: ROUTES.youth.path },
    ],
  },
];

export const LEGAL_NAV = [ROUTES.privacy, ROUTES.terms, ROUTES.disclosures, ROUTES.complaints].map((r) => ({
  label: r.label,
  href: r.path,
}));
