"use client";

import "../styles/dlife.css";
import { useEffect, useRef, type ReactNode } from "react";

/* ============================================================
   D'Life — "Real Support. Beyond the Policy."
   Implementation of the Claude Design handoff
   (Website v3 publication → project/index.html), correction build.

   Section order is fixed by the client correction report: header → hero →
   path selector → trust proof → life needs → existing policy → founders →
   videos → careers → DVA → youth → FAQ → closing → footer.

   The component holds no state. Every dynamic behaviour — the loader, the
   reveals, the video carousel, the accordion, the overlay menu — is owned by
   lib/dlife.ts and driven imperatively against this markup, exactly as the
   prototype's site.js drives its own. Because nothing here re-renders after
   mount, that engine's DOM writes are never clobbered.
   ============================================================ */

/**
 * Self-hosted media under /public. GitHub Pages serves the project from
 * /<repo>, and a bare <img src> does not pick up Next's basePath, so it is
 * applied here. Empty in local dev and on any root-served host.
 */
const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

/**
 * WhatsApp routing. Both numbers are the client's, confirmed in the
 * correction report: the first is staffed in office hours, the second takes
 * evenings and weekends.
 *
 * Every CTA carries its own pre-filled message so the team sees intent and
 * source before replying — the footer can't reuse the header's string.
 */
const WA_OFFICE = "60162362286";
const WA_AFTER_HOURS = "60166616083";
const wa = (message: string, number: string = WA_OFFICE) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

const SPEAK = "Hi D'Life, I'd like to speak with an advisor.";

/** Contact details as published in the footer. */
const CONTACT = {
  office: "016-236 2286",
  afterHours: "016-661 6083",
  // [PENDING D'LIFE VERIFICATION] hello@dlife.com.my as the published address.
  email: "hello@dlife.com.my",
  // [PENDING D'LIFE CONFIRMATION] only "Kuala Lumpur, Malaysia" is confirmed.
  city: "Kuala Lumpur, Malaysia",
};

/**
 * Geometric outline icons on a 24 grid, drawn in currentColor so each one
 * follows its section's accent token.
 */
const Ico = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const Shield = (
  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
);
const People = (
  <>
    <path d="M18 21a8 8 0 0 0-16 0" />
    <circle cx="10" cy="8" r="5" />
    <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
  </>
);

const Caret = (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const MutedIcon = (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M11 5 6 9H2v6h4l5 4z" />
    <path d="m23 9-6 6M17 9l6 6" />
  </svg>
);

/* ---------- content ---------- */

const SOLUTIONS: Array<[string, string]> = [
  ["Protecting Your Family", "/solutions/protecting-your-family/"],
  ["Protecting Your Income", "/solutions/protecting-your-income/"],
  ["Medical & Health Preparation", "/solutions/medical-health-preparation/"],
  ["Planning for Your Future", "/solutions/planning-for-your-future/"],
  ["Wealth & Legacy", "/solutions/wealth-legacy/"],
];

const COMMUNITY: Array<[string, string]> = [
  ["Youth Community", "/youth-community/"],
  ["DVA — Drive Value Associates", "/dva/"],
  ["About D’Life & Founders", "/about/"],
];

/** First-person routing chips: [icon, label, href, data-cta]. */
const PATHS: Array<[ReactNode, string, string, string]> = [
  [Shield, "Protect my family", "/solutions/protecting-your-family/", "path-protect-family"],
  [
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4M9 13h6M9 17h4" />
    </>,
    "Review my coverage",
    "/existing-policy-support/",
    "path-review-coverage",
  ],
  [
    <>
      <path d="M16 7h6v6" />
      <path d="m22 7-8.5 8.5-5-5L2 17" />
    </>,
    "Plan for the future",
    "/solutions/planning-for-your-future/",
    "path-plan-future",
  ],
  [
    <>
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect x="2" y="6" width="20" height="14" rx="2" />
    </>,
    "Explore a career",
    "/careers/",
    "path-explore-career",
  ],
  [People, "Join a community", "/youth-community/", "path-join-community"],
];

/**
 * The six approved trust themes. Copy is transcribed verbatim from the
 * EdgePoint correction report §05, which names these blocks "the approved
 * trust-section content basis" — it is the authority here, and it runs fuller
 * than the summary in DLife_Amendments_By_Section.md.
 *
 * Nothing in this block may be paraphrased, shortened or invented. Every
 * figure, award wording and permission is [PENDING D'LIFE VERIFICATION] before
 * publication — see the launch table in the README — and the claims amount
 * stays a blank until the client supplies it.
 */
const TRUST: Array<[ReactNode, string, string, string]> = [
  [
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>,
    // Is "27 years" Sharon personally, or D'Life as an organisation?
    "27 Years",
    "Experience",
    "Guiding families through changing markets, life stages and financial decisions with trusted advice for over 27 years.",
  ],
  [
    <>
      {Shield}
      <path d="m9 12 2 2 4-4" />
    </>,
    // AIA principal partnership and the recognition wording claimed with it.
    "AIA",
    "Trusted Principal",
    "Proudly partnering with AIA, one of Asia’s leading insurers, while receiving recognition for professional excellence and client service.",
  ],
  [
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </>,
    // Million Dollar Agency since 2002; MDRT Builder appointment.
    "Million Dollar Agency",
    "MDRT Builder",
    "Consistently achieving Million Dollar Agency recognition since 2002 and appointed as an MDRT Builder, developing high-performing financial professionals to international standards.",
  ],
  [
    People,
    // 4 Senior Managers (District Managers), 34+ Unit and Assistant Unit Managers.
    "Leadership",
    "People Development",
    "Built 4 top-tier Senior Managers (District Managers) and 34+ young, passionate leaders (Unit Managers and Assistant Unit Managers) through systematic training and a culture of continuous growth.",
  ],
  [
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
    "Clients",
    "People First",
    "People come before products. Every recommendation begins with meaningful conversations, understanding individual needs and giving advice only when it genuinely creates value.",
  ],
  [
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24m0-14.14-4.24 4.24m-5.66 5.66-4.24 4.24" />
    </>,
    "Claims",
    "Real Support",
    // The RM figure is left blank exactly as the report prints it — the amount
    // is a D'Life decision, not an omitted correction.
    "Successfully assisting clients with insurance claims exceeding RM __ million, with trusted guidance and dedicated support throughout the process.",
  ],
];

/**
 * Life needs, second person per the correction report. The first two cards
 * lead the grid at half width; the rest sit at a third.
 * [image, alt, title, copy, href, data-cta]
 */
const NEEDS: Array<[string, string, string, string, string, string]> = [
  [
    "need-family.jpg",
    "A family lunch in the garden",
    "Protecting Your Family",
    "Coverage built around the people who depend on you.",
    "/solutions/protecting-your-family/",
    "need-protect-family",
  ],
  [
    "need-income.jpg",
    "An advisor working at a desk",
    "Protecting Your Income",
    "Keep life steady even when the unexpected happens.",
    "/solutions/protecting-your-income/",
    "need-protect-income",
  ],
  [
    "need-health.jpg",
    "A pause for water at the office window",
    "Medical & Health Preparation",
    "Practical support for health and recovery costs.",
    "/solutions/medical-health-preparation/",
    "need-medical-health",
  ],
  [
    "need-planning.jpg",
    "Planning at a laptop at the kitchen table",
    "Planning for Your Future",
    "Retirement and legacy planning, with confidence.",
    "/solutions/planning-for-your-future/",
    "need-planning-future",
  ],
  [
    "need-legacy.jpg",
    "A banquet hall gathering beneath a chandelier",
    "Wealth & Legacy",
    "Growing and protecting what you’ve built.",
    "/solutions/wealth-legacy/",
    "need-wealth-legacy",
  ],
];

/**
 * Featured films. Playback happens inside the card — the correction report
 * rules out a lightbox — so these are plain <video> elements the carousel
 * enlarges and plays in place.
 */
const VIDEOS: Array<{ slug: string; title: string; runtime: string }> = [
  { slug: "advisor-alex", title: "A Career Beyond Selling Policies", runtime: "1 min 36" },
  { slug: "advisor-mayyee", title: "What Real Guidance Looks Like", runtime: "1 min 30" },
  { slug: "dva-workshop", title: "Inside D’Life Leadership", runtime: "1 min 09" },
];

/** Careers ladder: [number, heading, copy] — all four route to /careers/. */
const CAREER_ROWS: Array<[string, string, string]> = [
  ["01", "Mentorship", "You learn the craft beside someone senior before you ever learn a pitch."],
  ["02", "Professionalism", "Licensing, product knowledge and disclosure done properly."],
  ["03", "Leadership", "A route from advisor to team leader, with training at each step."],
  ["04", "Culture", "People who measure a good year by the clients who stayed."],
];

/** [image, alt, title, copy, link label, data-cta] */
const YOUTH: Array<[string, string, string, string, string, string]> = [
  [
    "youth-workshop.jpg",
    "Attendees seated at a D’Life workshop session",
    "Events & Workshops",
    "Hands-on sessions on money, mindset and growth.",
    "See what’s on →",
    "youth-events",
  ],
  [
    "youth-stories.jpg",
    "D’Life community members at an evening gathering",
    "Stories",
    "Real journeys from young leaders and mentors.",
    "Read stories →",
    "youth-stories",
  ],
  [
    "youth-resources.jpg",
    "Hands raised during a workshop session",
    "Educational Resources",
    "Practical guides on health, wealth and leadership.",
    "Start learning →",
    "youth-resources",
  ],
];

/** Each answer either resolves the question or routes to the page that does. */
const FAQS: Array<{ q: string; a: ReactNode[] }> = [
  {
    q: "How do I know which protection I actually need?",
    a: [
      "Start with a conversation, not a product. We’ll look at your situation, your responsibilities and what you already have, then explain your options in plain language.",
      <>
        <a href="/solutions/">See the areas we cover</a>.
      </>,
    ],
  },
  {
    q: "Can I get clarity on a policy I already hold?",
    a: [
      "Yes. Many people simply want to understand what they’re covered for. We’re happy to walk you through it, with no obligation to change anything.",
      <>
        <a href="/existing-policy-support/">Existing policy and claims support</a>.
      </>,
    ],
  },
  {
    q: "Can I speak with someone before deciding anything?",
    a: ["Always. Most conversations with us don’t end in a decision, and that’s completely fine."],
  },
  {
    q: "What does a first conversation cost?",
    a: [
      "Nothing, and it carries no obligation. If a recommendation follows, we take you through the product disclosure documents and how the arrangement works before anything is signed.",
    ],
  },
  {
    q: "Is there anything I should bring?",
    a: [
      "If you already hold policies, bring what you have — the schedules, or a photo of them, is enough. If you don’t, bring your questions.",
    ],
  },
  {
    q: "What happens after I take up a policy?",
    a: ["Your advisor stays with you. Life changes, and your coverage should be reviewed as it does."],
  },
  {
    q: "How do I make a claim, or help a family member make one?",
    a: [
      "Tell us as early as you can and we’ll walk you through what’s needed. Our team supports you through the process rather than handing you a form.",
      <>
        <a href="/existing-policy-support/">Start with claims support</a>.
      </>,
    ],
  },
  {
    q: "Can you help with protection for my business or employees?",
    a: [
      "Yes. Corporate and employee protection sits inside our Solutions area rather than on this page.",
      <>
        <a href="/solutions/">Go to Solutions</a>.
      </>,
    ],
  },
];

/** Footer directory: [group label, [link text, href][]] */
const FOOTER_NAV: Array<[string, Array<[string, string]>]> = [
  ["Protection & Planning", [...SOLUTIONS, ["All Solutions", "/solutions/"]]],
  [
    "Guidance & Support",
    [
      ["Existing Policy & Claims Support", "/existing-policy-support/"],
      ["Find Your Path", "#path"],
      ["Common Questions", "/existing-policy-support/"],
      ["Stories & Resources", "/stories/"],
    ],
  ],
  [
    "People & Community",
    [
      ["About D’Life & Founders", "/about/"],
      ["Grow With D’Life", "/careers/"],
      ["DVA — Drive Value Associates", "/dva/"],
      ["Youth Community", "/youth-community/"],
    ],
  ],
];

const LEGAL: Array<[string, string]> = [
  ["Privacy Policy", "/privacy-policy/"],
  ["Terms of Use", "/terms/"],
  ["Disclosures", "/disclosures/"],
  ["Complaints & Feedback", "/complaints/"],
];

/**
 * The D'Life lockup. Two crops rather than a tint, so the leaf reverses
 * cleanly on dark. In the header both ship and the stylesheet swaps them
 * (`.dk` / `.lt`) when the overlay menu opens; elsewhere only one is needed.
 */
const Wordmark = ({
  reversed = false,
  className,
  alt = "D’Life",
}: {
  reversed?: boolean;
  className?: string;
  alt?: string;
}) => (
  <img
    className={className}
    src={asset(`/media/img/${reversed ? "logo-reversed" : "logo"}.png`)}
    alt={alt}
    {...(alt === "" ? { "aria-hidden": true } : {})}
  />
);

export default function DLife() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import("../lib/dlife").then(({ initDLife }) => {
      if (cancelled) return;
      dispose = initDLife(el);
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div className="dlife" ref={root}>
      <div id="cur" aria-hidden="true" />
      {/* Read progress. Decorative — scroll position is already conveyed by
          the scrollbar to anyone relying on assistive tech. */}
      <div id="prog" aria-hidden="true">
        <i />
      </div>
      <div id="loader" aria-hidden="true">
        <div>
          <div className="in">
            <span className="wm">
              <Wordmark reversed />
            </span>
          </div>
          <div className="sub">Real support, beyond the policy.</div>
        </div>
      </div>

      {/* 01 · header and navigation */}
      <header id="hd">
        <a className="wm" href="/" data-cta="header-home">
          <Wordmark className="dk" />
          <Wordmark className="lt" reversed alt="" />
        </a>
        <nav className="nav" aria-label="Primary">
          <div className="grp">
            <a className="top" href="/solutions/" data-cta="nav-solutions">
              Solutions
              {Caret}
            </a>
            <div className="drop">
              {SOLUTIONS.map(([label, href]) => (
                <a href={href} key={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <a className="top" href="/existing-policy-support/" data-cta="nav-policy">
            Existing Policy Support
          </a>
          <a className="top" href="/stories/" data-cta="nav-stories">
            Stories
          </a>
          <a className="top" href="/careers/" data-cta="nav-careers">
            Careers
          </a>
          <div className="grp">
            <a className="top" href="/youth-community/" data-cta="nav-community">
              Community
              {Caret}
            </a>
            <div className="drop">
              {COMMUNITY.map(([label, href]) => (
                <a href={href} key={href}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </nav>
        <div className="rt">
          <a
            className="msg"
            href={wa("Hi D'Life, I'd like to message an advisor. (via website header)")}
            data-cta="header-message-advisor"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Message an Advisor
          </a>
          <a className="pill" href={wa(`${SPEAK} (via website header)`)} data-cta="header-speak-advisor">
            <span>Speak with an Advisor</span>
          </a>
          <button className="burger" id="burger" aria-label="Menu" aria-controls="menu" aria-expanded={false}>
            <span id="mlabel">Menu</span>
            <span className="ln" />
          </button>
        </div>
      </header>

      <nav id="menu" aria-hidden="true">
        <div className="big">
          <a href="/solutions/">
            Solutions<i>01</i>
          </a>
          <a href="/existing-policy-support/">
            Existing Policy Support<i>02</i>
          </a>
          <a href="/stories/">
            Stories<i>03</i>
          </a>
          <a href="/careers/">
            Careers<i>04</i>
          </a>
          <a href="/youth-community/">
            Community<i>05</i>
          </a>
        </div>
        <div className="side">
          <p>
            Whether you are protecting a family, reviewing a policy or exploring a career, a conversation is the right
            place to start.
          </p>
          <div className="c">
            <a href={wa(`${SPEAK} (via website menu)`)} data-cta="menu-speak-advisor">
              Message an Advisor on WhatsApp
            </a>
            <a href="/contact/" data-cta="menu-contact">
              Ask a Question
            </a>
          </div>
          <span className="lb">D’Life · Financial Advisory</span>
        </div>
      </nav>

      {/* 02 · hero */}
      <section id="hero">
        <div className="fg">
          <span className="lb rv">D’Life · Financial Advisory</span>
          <h1>
            <span className="lw">
              <span>Real Support.</span>
            </span>
            <span className="lw">
              <span>Beyond the Policy.</span>
            </span>
          </h1>
          <p className="rv">
            Protection is only the beginning. D’Life brings real guidance, long-term relationships and support through
            life’s changes.
          </p>
          <div className="acts rv">
            <a className="pill" href={wa(`${SPEAK} (via website homepage)`)} data-cta="hero-speak-advisor">
              <span>Speak with an Advisor</span>
            </a>
            <a className="pill ghost" href="#path" data-cta="hero-find-path">
              <span>Find your path</span>
            </a>
          </div>
        </div>
        {/* Provisional photography, subject to the client's approval. */}
        <div className="ph rv">
          <div className="prlx">
            <img
              src={asset("/media/img/hero.jpg")}
              alt="People sharing a meal around a table"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* 03 · choose your path */}
      <section id="path">
        <span className="lb rv">Choose your path</span>
        <p className="q rv">
          <span>I’m looking to…</span>
        </p>
        <div className="opts rv">
          {PATHS.map(([icon, label, href, cta]) => (
            <a className="opt" href={href} data-cta={cta} key={cta}>
              <Ico>{icon}</Ico>
              {label}
              <em>→</em>
            </a>
          ))}
        </div>
        <span className="cue">Swipe for more</span>
      </section>

      {/* 04 · trust proof — every figure below is [PENDING D'LIFE VERIFICATION] */}
      <section id="trust" className="dark">
        {TRUST.map(([icon, figure, label, copy]) => (
          <div className="c rv" key={figure}>
            <Ico>{icon}</Ico>
            <b>{figure}</b>
            <u>{label}</u>
            <p>{copy}</p>
          </div>
        ))}
      </section>

      {/* 05 · life needs */}
      <section id="needs">
        <div className="head">
          <div>
            <span className="lb rv">What brings you here</span>
            <h2 className="rv">Support built around real life needs</h2>
          </div>
          <p className="rv">Everyone arrives with a different question. Start wherever you are.</p>
        </div>
        <div className="grid">
          {NEEDS.map(([img, alt, title, copy, href, cta]) => (
            <article className="ncard rv" key={cta}>
              <div className="ph">
                <img src={asset(`/media/img/${img}`)} alt={alt} loading="lazy" decoding="async" />
              </div>
              <div className="tx">
                <h3>{title}</h3>
                <p>{copy}</p>
                <a className="cta" href={href} data-cta={cta}>
                  <em>Explore →</em>
                </a>
              </div>
            </article>
          ))}
        </div>
        <span className="cue">
          Swipe for more<em aria-hidden="true">→</em>
        </span>
      </section>

      {/* 06 · existing-policy guidance — insurer-neutral, no comparison language */}
      <section id="policy" className="sand">
        <div className="tx">
          <span className="lb rv">Existing policyholders</span>
          <h2 className="rv">Need clarity on your current coverage?</h2>
          <p className="rv">
            Understand the protection you already have. Speak with our team to review your coverage with greater
            confidence, and see what next step, if any, makes sense.
          </p>
          <div className="acts rv">
            <a
              className="pill"
              href={wa("Hi D'Life, I'd like guidance on my existing policy. (via website)")}
              data-cta="policy-get-guidance"
            >
              <span>Get guidance on my policy</span>
            </a>
          </div>
        </div>
        <div className="ph">
          <div className="prlx">
            <img
              src={asset("/media/img/policy-review.jpg")}
              alt="An advisor talking a client through their coverage"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* 07 · founders — portraits pending approved photography */}
      <section id="founder">
        <div className="fpair rv">
          <div className="ph">
            <div className="slot-empty">Sharon Cheang — portrait pending</div>
          </div>
          <div className="ph">
            <div className="slot-empty">Rachel Cheang — portrait pending</div>
          </div>
        </div>
        <div>
          <span className="lb rv">Our founders</span>
          <h2 className="rv">Founded by sisters. Built with purpose.</h2>
          <p className="rv">
            D’Life was built on one belief: people come before products, and support should continue long after a policy
            is signed. What began as a financial advisory practice has grown into a place where clients are guided and
            advisors are mentored.
          </p>
          <div className="names rv">
            <div>
              Sharon Cheang<span>Founder</span>
            </div>
            <div>
              Rachel Cheang<span>Co-Founder</span>
            </div>
          </div>
          <a className="tlink rv" href="/about/" data-cta="founder-our-story">
            Discover our story
          </a>
        </div>
      </section>

      {/* 08 · featured videos — inline playback, no lightbox */}
      <section id="stories" className="dark">
        <div className="head">
          <div>
            <span className="lb rv">Featured videos</span>
            <h2 className="rv">Meet the people behind D’Life</h2>
          </div>
          <a className="tlink rv" href="/stories/" data-cta="stories-view-all">
            View all stories
          </a>
        </div>
        <div className="rail">
          <div className="track" id="vtrack">
            {VIDEOS.map(({ slug, title, runtime }) => (
              <div className="vcard" key={slug}>
                <button type="button" className="fr" aria-label={`Play video: ${title}`}>
                  {/* The poster is a real <img> rather than the video's own
                      poster attribute, so the frame is painted before any
                      metadata request and survives a missing source. */}
                  <img
                    src={asset(`/media/poster/${slug}.jpg`)}
                    alt={`Still from the film “${title}”`}
                    loading="lazy"
                    decoding="async"
                  />
                  <video
                    src={asset(`/media/video/${slug}.mp4`)}
                    poster={asset(`/media/poster/${slug}.jpg`)}
                    muted
                    playsInline
                    preload="none"
                  />
                  <span className="badge">
                    {MutedIcon}
                    Muted
                  </span>
                  <span className="play">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
                <div className="meta">
                  <h3>{title}</h3>
                  <span className="run">{runtime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* The engine rewrites the play/pause glyph and fills .dots on mount. */}
        <div className="ctrls">
          <button type="button" className="prev" aria-label="Previous video">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button type="button" className="pp" aria-label="Play video">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <button type="button" className="next" aria-label="Next video">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <button type="button" className="sound" aria-pressed={true}>
            {MutedIcon}
            <span>Unmute</span>
          </button>
          <div className="dots" />
        </div>
      </section>

      {/* 09 · grow with D'Life */}
      <section id="careers" className="cream">
        <div>
          <span className="lb rv">Grow with D’Life</span>
          <h2 className="rv">A career built on real guidance, not just sales.</h2>
          <p className="lead rv">
            Advisors here are trained before they are targeted. You learn the craft beside someone senior, and you are
            expected to become better than you were.
          </p>
          {/* Attribution stays generic pending advisor consent. */}
          <blockquote className="qt rv">
            <p>“D’Life gave me the mentorship I couldn’t find anywhere else.”</p>
            <cite>D’Life Advisor</cite>
          </blockquote>
          <a
            className="pill rv"
            href={wa("Hi D'Life, I'd like to explore a career conversation. (via website)")}
            data-cta="careers-explore-conversation"
          >
            <span>Explore a career conversation</span>
          </a>
        </div>
        <div className="rows">
          {CAREER_ROWS.map(([no, title, copy]) => (
            <a className="rv" href="/careers/" data-cta={`careers-${title.toLowerCase()}`} key={no}>
              <i>{no}</i>
              <div>
                <b>{title}</b>
                <p>{copy}</p>
              </div>
              <em>→</em>
            </a>
          ))}
        </div>
      </section>

      {/* 10 · DVA — smaller and more contained than Careers and Youth by design */}
      <section id="dva" className="dark">
        <div className="panel rv">
          <div className="ph">
            <img
              src={asset("/media/img/dva-team.jpg")}
              alt="The D’Life advisory team"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="fg">
            <span className="lb">DVA — Drive Value Associates</span>
            <h2>By invitation. Built for leaders.</h2>
            <p>A selective circle shaped by shared values and experience.</p>
            {/* DVA WhatsApp routing is [PENDING D'LIFE CONFIRMATION] — no
                number is assigned, so this routes to the page. */}
            <a className="pill" href="/dva/" data-cta="dva-discover">
              <span>Discover DVA</span>
            </a>
          </div>
        </div>
      </section>

      {/* 11 · youth community */}
      <section id="youth" className="sand">
        <div className="head">
          <div>
            <span className="lb rv">Community</span>
            <h2 className="rv">Youth Community</h2>
            <div className="sup rv">Empowering youth. Building tomorrow.</div>
          </div>
          <p className="intro rv">
            A platform for young people to explore health, wealth and leadership through real talks, mentors and
            experience.
          </p>
        </div>
        <div className="grid">
          {YOUTH.map(([img, alt, title, copy, label, cta]) => (
            <div className="yc rv" key={cta}>
              <div className="ph">
                <img src={asset(`/media/img/${img}`)} alt={alt} loading="lazy" decoding="async" />
              </div>
              <div className="tx">
                <h3>{title}</h3>
                <p>{copy}</p>
                <a className="cta" href="/youth-community/" data-cta={cta}>
                  <em>{label}</em>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="loop rv">
          <div>
            <h3>Stay in the Loop</h3>
            <p>Event invites and Youth Community updates, by email or on WhatsApp — whichever you actually read.</p>
          </div>
          <div>
            <span className="k">By email</span>
            <form id="loopform">
              <input type="email" placeholder="Your email" required aria-label="Your email" />
              <button className="pill" type="submit" data-cta="youth-signup-email">
                <span>Sign Up</span>
              </button>
            </form>
            {/* Consent wording is [PENDING D'LIFE CONFIRMATION] — data storage,
                list ownership and unsubscribe method are unresolved. */}
            <p className="consent">
              By signing up you agree to receive Youth Community updates. Unsubscribe anytime.{" "}
              <em>[Wording pending confirmation]</em>
            </p>
            <div className="alt">
              <a
                className="tlink"
                href={wa("Hi D'Life, I'd like Youth Community updates. (via website)")}
                data-cta="youth-signup-whatsapp"
              >
                Get updates on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 12 · FAQ */}
      <section id="faq">
        <div>
          <span className="lb rv">Helpful answers</span>
          <h2 className="rv">A few common questions</h2>
          <a className="tlink rv" href="/existing-policy-support/" data-cta="faq-explore">
            Explore Our FAQ
          </a>
        </div>
        <div className="items">
          {FAQS.map(({ q, a }) => (
            <div className="item" key={q}>
              <button className="q" type="button" aria-expanded={false}>
                {q}
                <span className="x" />
              </button>
              {/* Index keys are safe here: the answers are a static list that
                  never reorders. */}
              <div className="a">
                {a.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13 · closing */}
      <section id="close" className="dark">
        <div className="fg">
          <span className="lb rv">D’Life</span>
          <h2 className="rv">A clearer future can begin with one conversation.</h2>
          <div className="sub rv">Let it begin with you.</div>
          <div className="acts rv">
            <a className="pill" href={wa(`${SPEAK} (via website homepage)`)} data-cta="close-speak-advisor">
              <span>Speak with an Advisor</span>
            </a>
            <a className="pill ghost" href="#path" data-cta="close-find-path">
              <span>Find your path</span>
            </a>
          </div>
        </div>
      </section>

      {/* 14 · footer. #close directly above owns the page's last primary
          action, so nothing here is a copper .pill — this band is utility. */}
      <footer id="ft" className="dark charcoal">
        <div className="mast rv">
          <div>
            <div className="wm">
              <Wordmark reversed />
            </div>
            <p className="tag">Real support, beyond the policy.</p>
          </div>
          <span className="est">
            Est. 1999 <em className="pendmark">[pending]</em>
            <br />
            Malaysia
          </span>
        </div>

        <div className="mid">
          <div className="reach rv">
            <h2 className="lede">Talk to a person, not a form.</h2>
            <ul className="chan">
              <li>
                <span className="k">WhatsApp · office hours</span>
                {/* aria-label contains the visible string, so WCAG 2.5.3
                    (label in name) holds while the name still says which
                    channel this opens. */}
                <a
                  className="go"
                  href={wa("Hi D'Life, I'd like to get in touch. (via website footer)")}
                  data-cta="footer-whatsapp-office"
                  aria-label={`Message D’Life on WhatsApp at ${CONTACT.office}`}
                >
                  <span>{CONTACT.office}</span>
                  <em aria-hidden="true">→</em>
                </a>
                <p className="hint">Monday–Friday, 9:00am–5:30pm.</p>
              </li>
              <li>
                <span className="k">WhatsApp · after hours</span>
                <a
                  className="go"
                  href={wa("Hi D'Life, I'd like to get in touch. (via website footer, after hours)", WA_AFTER_HOURS)}
                  data-cta="footer-whatsapp-afterhours"
                  aria-label={`Message D’Life on WhatsApp at ${CONTACT.afterHours}`}
                >
                  <span>{CONTACT.afterHours}</span>
                  <em aria-hidden="true">→</em>
                </a>
                <p className="hint">Evenings and weekends.</p>
              </li>
              <li>
                <span className="k">Email</span>
                <a className="go" href={`mailto:${CONTACT.email}`} data-cta="footer-email">
                  <span>{CONTACT.email}</span>
                  <em aria-hidden="true">→</em>
                </a>
                <p className="hint">For anything that needs a longer answer, or a document attached.</p>
              </li>
              <li>
                <span className="k">Office</span>
                <address>{CONTACT.city}</address>
                <p className="hint">
                  Visits by appointment.{" "}
                  <a href="/contact/" data-cta="footer-arrange-visit">
                    Arrange a time
                  </a>
                  .
                </p>
              </li>
            </ul>
          </div>

          <nav className="dirs rv" aria-label="Site directory">
            {FOOTER_NAV.map(([group, links]) => (
              <div key={group}>
                <h3 className="k">{group}</h3>
                <ul>
                  {links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="k">Contact</h3>
              <ul>
                <li>
                  <a href="/contact/">Contact D’Life</a>
                </li>
                <li>
                  <a href={wa(`${SPEAK} (via website footer)`)} data-cta="footer-directory-whatsapp">
                    Message an Advisor
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACT.email}`}>Email us</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* This is a financial advisory; trust is the product. Deliberately no
            .rv on this band or the one below — they are the last elements on
            the page, and a missed scroll trigger must never leave a legal
            notice stuck at opacity 0. */}
        <div className="fine">
          <p className="note">
            D’Life is a financial advisory and insurance agency operating in Malaysia. Anything you read here is general
            information, not personal advice — it does not take your circumstances into account. A recommendation only
            follows a conversation, a needs assessment and the relevant product disclosure documents.
          </p>
          <div>
            <span className="k">Licensing</span>
            {/* Legal entity, registration and licensing are [PENDING D'LIFE
                VERIFICATION]. The footer previously read "D'Life Revolution";
                contract documents say "D'Life Sdn Bhd". Until that is settled
                the slot is shown rather than a regulator invented. */}
            <p className="pend">Legal entity, company registration and licensing details to be confirmed before launch.</p>
          </div>
        </div>

        <div className="base">
          <span>© 2026 D’Life. All rights reserved.</span>
          <div className="lx">
            {LEGAL.map(([label, href]) => (
              <a href={href} key={href}>
                {label}
              </a>
            ))}
          </div>
          <a className="top" href="#hero" data-cta="footer-back-to-top">
            Back to top <em aria-hidden="true">↑</em>
          </a>
        </div>
      </footer>

      <a
        className="wafloat"
        href={wa(`${SPEAK} (via website)`)}
        data-cta="float-whatsapp"
        aria-label="Message D’Life on WhatsApp"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.21.88 2.38 1 2.55.12.16 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.18 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" />
        </svg>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
