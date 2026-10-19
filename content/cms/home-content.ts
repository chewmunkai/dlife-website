import { ROUTES, ALL_ROUTES } from "../../lib/routes";

/*
 * The homepage's sections as they ship, as data. Talous CMS edits copies of
 * these; the site renders the published copy and falls back to these values
 * for any field the CMS doesn't have. Photo values are site-relative paths
 * ("/media/img/…") or, for uploads, absolute URLs; components/… applies the
 * base path.
 *
 * ⚠️ The wording here is the client's approved copy, carried over verbatim
 * from the approved page. The notes in components/home/sections.tsx (and
 * docs/dlife-figures.md) explain which figures are pending verification and
 * which lines must not be trimmed — they still apply when this text is edited
 * in the CMS.
 *
 * `*italic*` and `**bold**` are inline markup (components/home/rich.tsx).
 */

/** Pages a link field may point at: the site's real routes, plus the Youth page's sections. */
export const LINK_OPTIONS: string[] = [
  ...ALL_ROUTES.filter((r) => !r.utility && !r.hidden).map((r) => r.path),
  `${ROUTES.youth.path}#events`,
  `${ROUTES.youth.path}#stories`,
  `${ROUTES.youth.path}#resources`,
];

export const PATH_DEFAULTS = {
  question: "I’m looking to…",
  items: [
    { icon: "shield", label: "Protect my family", href: ROUTES["protecting-your-family"].path },
    { icon: "document", label: "Review my coverage", href: ROUTES.policy.path },
    { icon: "trend", label: "Plan for the future", href: ROUTES["planning-for-your-future"].path },
    { icon: "briefcase", label: "Explore a career", href: ROUTES.careers.path },
    { icon: "people", label: "Join a community", href: ROUTES.youth.path },
  ],
};

/*
 * The six approved trust themes, transcribed from the correction report's
 * structure-corrections slide. Nothing here may be paraphrased or shortened
 * without the client: every figure, award wording and permission is pending
 * D'Life verification (docs/dlife-figures.md).
 * - "27 Years": the client's performance summary measures service with the
 *   principal insurer (25y 4m at 14 Aug 2026), which may not be the same span;
 *   left as the client wrote it, and raised.
 * - "Recognised": the site does not name the insurer (client, 6 Sep 2026).
 * - "Leadership": rewritten in the client's words on 6 Oct 2026; it carries no
 *   headcount, so the earlier impossible "38 leaders in a 29-advisor practice"
 *   arithmetic can't return.
 * - "Claims": ⚠️ DO NOT TRIM. The client's own wording (C01, 31 Aug 2026),
 *   approved three times and restored verbatim on 7 Sep; deliberately longer
 *   than its neighbours. RM22M is the total claim amount in their summary.
 */
export const TRUST_DEFAULTS = {
  items: [
    {
      icon: "clock",
      figure: "27 Years",
      label: "Experience",
      copy: "Guiding families through changing markets and every stage of life for over 27 years providing trusted advice, lasting relationships and financial solutions that evolve with their needs.",
    },
    {
      icon: "shieldCheck",
      figure: "Recognised",
      label: "Professional Standing",
      copy: "Recognised for professional excellence and client service, to a principal insurer’s standards.",
    },
    {
      icon: "award",
      figure: "Million Dollar Agency",
      label: "MDRT Builder",
      copy: "Million Dollar Agency since 2002, and an MDRT Builder developing advisors to international standards.",
    },
    {
      icon: "people",
      figure: "Leadership",
      label: "People Development",
      copy: "A proven legacy of developing advisors into Agency Managers, Unit Managers and Assistant Unit Managers building generations of leaders through mentorship, structured development and a culture of excellence.",
    },
    {
      icon: "heart",
      figure: "Clients",
      label: "People First",
      copy: "People come before products. Every recommendation starts with your circumstances, not a catalogue.",
    },
    {
      icon: "target",
      figure: "Claims",
      label: "Real Support",
      copy: "Supporting our clients through insurance claims exceeding RM22 million with trusted guidance, dedicated assistance, and a team that stands by them every step of the way.",
    },
  ],
};

/* 12 Oct 2026, client: each life-need card shows the hero of the page it opens, so the card
   and the page agree (frames re-cut for these 3:2 photographs in styles/dlife.css, #needs).
   The Policy and DVA panels changed the same day; see PHOTOS in components/home/sections.tsx. */
export const NEEDS_DEFAULTS = {
  eyebrow: "What brings you here",
  heading: "Support built around *real life needs*",
  sub: "Everyone arrives with a different question. Start wherever you are.",
  ctaLabel: "Read more",
  items: [
    {
      photo: "/media/img/solutions/protecting-family/family-meal.jpg",
      photoAlt: "Three generations of a family sharing a meal at home",
      title: "Protecting Your Family",
      copy: "Coverage built around the people who depend on you.",
      href: ROUTES["protecting-your-family"].path,
    },
    {
      photo: "/media/img/solutions/protecting-income/need-income-malaysia.jpg",
      photoAlt: "An advisor going through the household’s figures with a couple",
      title: "Protecting Your Income",
      copy: "Keep life steady even when the unexpected happens.",
      href: ROUTES["protecting-your-income"].path,
    },
    {
      photo: "/media/img/solutions/medical-health/family-doctor-consultation.jpg",
      photoAlt: "Two family members in consultation with a doctor",
      title: "Medical & Health Preparation",
      copy: "Practical support for health and recovery costs.",
      href: ROUTES["medical-health-preparation"].path,
    },
    {
      photo: "/media/img/solutions/planning-for-your-future/advisor-planning.jpg",
      photoAlt: "An advisor and a young man starting a plan together at a table",
      title: "Planning for Your Future",
      copy: "Retirement and legacy planning, with confidence.",
      href: ROUTES["planning-for-your-future"].path,
    },
    {
      photo: "/media/img/solutions/wealth-legacy/family-photos.jpg",
      photoAlt: "A family looking through photographs and albums together",
      title: "Wealth & Legacy",
      copy: "Growing and protecting what you’ve built.",
      href: ROUTES["wealth-legacy"].path,
    },
  ],
};

export const POLICY_DEFAULTS = {
  eyebrow: "Existing policyholders",
  heading: "Need clarity on your *current coverage?*",
  body: "Understand the protection you already have. Speak with our team to review your coverage with greater confidence, and see what next step, if any, makes sense.",
  ctaLabel: "Get guidance on my policy",
  photo: "/media/img/eps-hero-advisor.jpg",
  photoAlt: "An advisor talking a client through his policy schedule at a table",
};

export const FOUNDER_DEFAULTS = {
  eyebrow: "Our founders",
  heading: "Founded by Sisters, Built with Purpose",
  body: "**Sharon Cheang** built D’Life on one belief: people come before products, and support should continue long after a policy is signed. Her sister **Rachel Cheang** leads business development and the community side of the practice.",
  linkLabel: "Discover our story",
  photo1: "/media/img/founder-sharon.jpg",
  photo1Alt: "Sharon Cheang, founder of D’Life",
  photo2: "/media/img/founder-rachel.jpg",
  photo2Alt: "Rachel Cheang, co-founder of D’Life",
};

export const STORIES_DEFAULTS = {
  eyebrow: "Featured videos",
  heading: "Meet the people *behind D’Life*",
  ctaLabel: "View all stories",
};

export const CAREERS_DEFAULTS = {
  eyebrow: "Grow with D’Life",
  heading: "A career built on *real guidance,* not just sales.",
  quote: "“D’Life gave me the mentorship I couldn’t find anywhere else.”",
  quoteBy: "D’Life Advisor",
  ctaLabel: "Explore a career conversation",
  moreLabel: "See the full career page",
};

export const DVA_DEFAULTS = {
  eyebrow: "By invitation",
  heading: "Drive Value Associates (DVA)",
  body: "Built for leaders, a selective circle shaped by shared values and experience.",
  ctaLabel: "Discover DVA",
  photo: "/media/img/hero-team-ivory.jpg",
  photoAlt: "The D’Life team together, all in ivory, around a low table",
};

export const YOUTH_DEFAULTS = {
  eyebrow: "Community",
  heading: "Youth Community",
  sup: "Empowering youth. Building tomorrow.",
  intro: "A platform for young people to explore health, wealth and leadership through real talks, mentors and experience.",
  cards: [
    {
      photo: "/media/img/youth-session.jpg",
      photoAlt: "Attendees seated at a D’Life Youth Community session",
      title: "Events & Workshops",
      copy: "Hands-on sessions on money, mindset and growth.",
      ctaLabel: "See what’s on →",
      href: `${ROUTES.youth.path}#events`,
    },
    {
      photo: "/media/img/community-group.jpg",
      photoAlt: "D’Life community members together at a gathering",
      title: "Stories",
      copy: "Real journeys from young leaders and mentors.",
      ctaLabel: "Read stories →",
      href: `${ROUTES.youth.path}#stories`,
    },
    {
      photo: "/media/img/youth-resources-v2.jpg",
      photoAlt: "A presenter leading a workshop, participants seated around tables",
      title: "Educational Resources",
      copy: "Practical guides on health, wealth and leadership.",
      ctaLabel: "Start learning →",
      href: `${ROUTES.youth.path}#resources`,
    },
  ],
  loopTitle: "Stay in the Loop",
  loopBody: "Event invites and Youth Community updates, by email or on WhatsApp, whichever you actually read.",
  consent: "By signing up you agree to receive Youth Community updates. Unsubscribe anytime.",
};

export const CLOSE_DEFAULTS = {
  eyebrow: "D’Life",
  heading: "A clearer future can begin with *one conversation.*",
  sub: "It begins with you.",
  primaryCta: "Speak with an Advisor",
  secondaryCta: "Find your path",
  photo: "/media/img/close-conversation.jpg",
  photoAlt: "An advisor mid-conversation across a café table",
};

/** Intrinsic sizes for the photographs that need them (the founders' 4:5 portraits). */
export const MEDIA_SIZES: Record<string, { width: number; height: number }> = {
  "/media/img/founder-sharon.jpg": { width: 1400, height: 1750 },
  "/media/img/founder-rachel.jpg": { width: 1048, height: 1310 },
};
