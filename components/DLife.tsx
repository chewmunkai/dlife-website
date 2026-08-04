"use client";

import "../styles/dlife.css";
import React, { useEffect, useRef, useState, type ReactNode } from "react";

/* ============================================================
   D'Life — "Real Support. Beyond the Policy."
   Implementation of the Claude Design handoff
   (Website v3 publication → project/index.html).

   The prototype's <image-slot> elements are a design-tool affordance
   (drag-to-fill placeholders with a persistence sidecar); in production
   they become plain <img> against D'Life's own media.
   ============================================================ */

type Photo = {
  src: string;
  alt: string;
};

/**
 * Self-hosted media under /public. GitHub Pages serves the project from
 * /<repo>, and a bare <img src> does not pick up Next's basePath, so it is
 * applied here. Empty in local dev and on any root-served host.
 */
const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

/**
 * Every image is D'Life's own — the client photography plus stills lifted from
 * the advisor films. No stock, so no attribution chips are needed — the credit
 * element and its Unsplash plumbing are gone with them.
 *
 * NOTE(launch): the film stills are 1440px-wide video frames, not photographs.
 * They hold up at card scale but will not survive being enlarged, so the real
 * shoot the brief flags as a budget item still needs to happen.
 */
const PHOTOS = {
  // Self-hosted, not hotlinked. This was the page's one stock exception, a
  // 2400px Unsplash URL chosen because the film stills could not hold a 100vh
  // hero — but it made the largest image on the site depend on a third-party
  // host, and it was not rendering. D'Life's own frame is 1400x933, so it
  // upscales slightly past a laptop viewport and will be soft on a very large
  // display. A real photograph that loads beats a sharp one that does not; the
  // commissioned shoot is what finally fixes this.
  hero: {
    src: asset("/media/img/hero.jpg"),
    alt: "D’Life colleagues sharing a meal around a table",
  },
  p1: { src: asset("/media/img/path-family.jpg"), alt: "Three generations of a family gathered around a table" },
  p2: { src: asset("/media/img/path-review.jpg"), alt: "An advisor reviewing paperwork at his desk" },
  p3: { src: asset("/media/img/path-future.jpg"), alt: "Writing out a plan at a desk" },
  p4: { src: asset("/media/img/path-career.jpg"), alt: "Looking out over the trees, weighing what’s next" },
  p5: { src: asset("/media/img/community-gathering.jpg"), alt: "D’Life colleagues sharing a meal around a table" },
  n1: { src: asset("/media/img/need-family.jpg"), alt: "A family lunch in the garden" },
  n2: { src: asset("/media/img/need-income.jpg"), alt: "An advisor working at a desk" },
  n3: { src: asset("/media/img/need-health.jpg"), alt: "A pause for water at the office window" },
  n4: { src: asset("/media/img/need-planning.jpg"), alt: "Planning at a laptop at the kitchen table" },
  n5: { src: asset("/media/img/need-legacy.jpg"), alt: "A banquet hall gathering beneath a chandelier" },
  policy: { src: asset("/media/img/policy-review.jpg"), alt: "An advisor talking a client through their coverage" },
  close: { src: asset("/media/img/close-conversation.jpg"), alt: "An advisor mid-conversation across a café table" },
  dva: { src: asset("/media/img/dva-team.jpg"), alt: "The D’Life advisory team" },
  y1: { src: asset("/media/img/youth-workshop.jpg"), alt: "Attendees seated at a D’Life workshop session" },
  y2: { src: asset("/media/img/youth-stories.jpg"), alt: "D’Life community members at an evening gathering" },
  y3: { src: asset("/media/img/youth-resources.jpg"), alt: "Hands raised during a workshop session" },
} satisfies Record<string, Photo>;

/**
 * Contents of a `.ph` plate. `parallax` wraps the image in the over-scanned
 * `.prlx` layer the scroll engine drives.
 */
function Plate({ photo, parallax, eager }: { photo: Photo; parallax?: boolean; eager?: boolean }) {
  const img = (
    <img src={photo.src} alt={photo.alt} loading={eager ? "eager" : "lazy"} decoding="async" />
  );
  return parallax ? <div className="prlx">{img}</div> : img;
}

const WA_ADVISOR = "Hi D'Life, I'd like to speak with an advisor.";

/**
 * ⚠️ Placeholders. Brief §14 Q8 — the launch WhatsApp number is unconfirmed
 * (lib/dlife.ts still ships WA_NUMBER = "60123456789"), and no project
 * document states a street address. Confirm both before launch.
 */
const CONTACT = {
  phone: "+60 12-345 6789",
  email: "hello@dlife.com.my",
  city: "Kuala Lumpur, Malaysia",
};

/* Brief §13: every major CTA carries a distinct pre-filled message so the team
   sees intent and source before replying — so the footer cannot reuse the
   header's string. */
const WA_FOOTER = "Hi D'Life, I'd like to get in touch — I found your contact details on the website.";
const WA_VISIT = "Hi D'Life, I'd like to arrange a time to meet at your office.";

/**
 * Footer directory, grouped and ordered by the audience priority in brief §7:
 * potential clients (1) → existing policyholders and resources (2, 7) →
 * future advisors, stories, DVA, Youth (3–6). Corporate Solutions stays
 * discoverable inside group 1 rather than claiming a group of its own, per
 * §7's note that it "must not compete for a major homepage branch".
 * [group label, [link text, href][]]
 * NOTE(launch): hrefs resolve to the homepage sections that exist today; "#"
 * entries are pages not yet built.
 */
const FOOTER_NAV: Array<[string, Array<[string, string]>]> = [
  [
    "Protection & Planning",
    [
      ["Protecting Family", "#needs"],
      ["Protecting Income", "#needs"],
      ["Medical & Health", "#needs"],
      ["Planning for the Future", "#needs"],
      ["Wealth & Legacy", "#needs"],
      ["Corporate Solutions", "#"],
    ],
  ],
  [
    "Guidance & Support",
    [
      ["Existing Policy Support", "#policy"],
      ["Find Your Path", "#path"],
      ["Common Questions", "#faq"],
      ["Articles & Events", "#"],
    ],
  ],
  [
    "People & Community",
    [
      ["Our Founders", "#founder"],
      ["Advisor Stories", "#stories"],
      ["Careers at D’Life", "#careers"],
      ["Drive Value Associates (DVA)", "#dva"],
      ["Youth Community", "#youth"],
    ],
  ],
];

/**
 * The single swappable logo slot the correction brief asks for (G7): one
 * component, used by the loading screen, the header and the footer, so
 * replacing the artwork updates all three at once. The placeholder clover it
 * replaces was a stand-in drawn while the real brand files were outstanding.
 *
 * Two cuts, because the lockup is flat artwork rather than currentColor:
 * `logo.png` is the teal-and-gold original for ivory grounds, and
 * `logo-reversed.png` the ivory cut for the dark loader and footer.
 *
 * The lockup already carries the "D'LIFE" wordmark, so no text sits beside
 * it — the alt text is what names it, and the sizing below is by height with
 * width left to follow the artwork's own 5.04:1 ratio.
 */
const Logo = ({ reversed = false, alt = "D’Life" }: { reversed?: boolean; alt?: string }) => (
  <img
    className={reversed ? "lmark rev" : "lmark"}
    src={asset(`/media/img/${reversed ? "logo-reversed" : "logo"}.png`)}
    alt={alt}
    width={2890}
    height={573}
    decoding="async"
  />
);

/**
 * Slug for a life need. These come out identical to the link map's own route
 * names — "Medical & Health Preparation" → medical-health-preparation — so
 * when the Solutions pages land, `#${slug}` becomes `/solutions/${slug}/`
 * with no renaming.
 */
const slug = (s: string) =>
  s.toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const Caret = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/** Geometric outline icons, per the brief's icon direction. */
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

/**
 * Primary navigation, following link map E — which lists fourteen routes:
 * home, /solutions/ and its five children, /existing-policy-support/,
 * /about/, /careers/, /dva/, /youth-community/, /stories/ and /contact/.
 *
 * Home is the lockup, contact is the two advisor actions on the right, and
 * the rest sit in these five pillars. Targets are the homepage sections that
 * cover them today — /stories/ is the one inner page that exists — so nothing
 * in the bar is a dead link. The Solutions entries deep-link to their own
 * life-needs card, and their anchors are already the route slugs.
 * [label, href]
 */
const SOLUTIONS: Array<[string, string]> = [
  ["Protecting Your Family", "#protecting-your-family"],
  ["Protecting Your Income", "#protecting-your-income"],
  ["Medical & Health Preparation", "#medical-health-preparation"],
  ["Planning for Your Future", "#planning-for-your-future"],
  ["Wealth & Legacy", "#wealth-legacy"],
];

const COMMUNITY: Array<[string, string]> = [
  ["Youth Community", "#youth"],
  ["Drive Value Associates (DVA)", "#dva"],
  ["About D’Life & Founders", "#founder"],
];

/**
 * The compact path selector's five routes, in the brief's first-person voice.
 *
 * Targets are in-page anchors rather than the /solutions/… routes the link map
 * eventually calls for: this export ships a single page, so those URLs would
 * 404 today. They become real hrefs when the inner pages land.
 */
const PATHS: Array<[ReactNode, string, string]> = [
  [
    <path
      key="p"
      d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    />,
    "Protect my family",
    "#needs",
  ],
  [
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4M9 13h6M9 17h4" />
    </>,
    "Review my coverage",
    "#policy",
  ],
  [
    <>
      <path d="M16 7h6v6" />
      <path d="m22 7-8.5 8.5-5-5L2 17" />
    </>,
    "Plan for the future",
    "#needs",
  ],
  [
    <>
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect x="2" y="6" width="20" height="14" rx="2" />
    </>,
    "Explore a career",
    "#careers",
  ],
  [
    <>
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
    </>,
    "Join a community",
    "#youth",
  ],
];

/**
 * The five life needs, in the second person the correction report asks for —
 * "Protecting Your Family", not "Protecting Family". They render as a mosaic
 * of photographic cards: the reference gives this section more imagery and
 * emotional weight than the pathway strip above, and explicitly says not to
 * repeat the pathway's labels or scale.
 *
 * Cards are not links yet. Each is meant to open its own Solutions page, but
 * this export ships a single page, so they stay plain cards until those routes
 * exist rather than shipping five dead links.
 */
const NEEDS: Array<[Photo, string, string]> = [
  // Re-picked for finish rather than for literal subject match. These are the
  // best-lit, best-composed frames in the library — two people in real
  // conversation, a desk portrait with depth, open sky, a premium interior —
  // in place of the phone-camera group shots that were here.
  [PHOTOS.p5, "Protecting Your Family", "Coverage built around the people who depend on you."],
  [PHOTOS.p2, "Protecting Your Income", "Keep life steady even when the unexpected happens."],
  // NOTE(shoot): nothing in the library is medical or care-related, at any
  // level of finish. This is the nearest frame there is, and it is the clearest
  // case for the commissioned shoot the brief lists as a budget item.
  [PHOTOS.n3, "Medical & Health Preparation", "Practical support for health and recovery costs."],
  [PHOTOS.p4, "Planning for Your Future", "Retirement and legacy planning, with confidence."],
  [PHOTOS.n5, "Wealth & Legacy", "Growing and protecting what you’ve built."],
];

/**
 * Featured videos. The brief requires these to play inside the site with audio
 * rather than bouncing a visitor out to social, so they open in an in-page
 * dialog. Sources are vertical 9:16 with burned-in bilingual subtitles; the
 * poster is a 4:5 crop that matches the card and keeps the speaker's face.
 */
export type Video = {
  src: string;
  poster: string;
  /** Poster is decorative — the card's own heading names the story. */
  title: string;
  runtime: string;
};

export const VIDEOS: Video[] = [
  {
    src: asset("/media/video/advisor-alex.mp4"),
    poster: asset("/media/poster/advisor-alex.jpg"),
    title: "A Career Beyond Selling Policies",
    runtime: "1 min 36",
  },
  {
    src: asset("/media/video/advisor-mayyee.mp4"),
    poster: asset("/media/poster/advisor-mayyee.jpg"),
    title: "What Real Guidance Looks Like",
    runtime: "1 min 30",
  },
  {
    src: asset("/media/video/dva-workshop.mp4"),
    poster: asset("/media/poster/dva-workshop.jpg"),
    title: "Inside D’Life Leadership",
    runtime: "1 min 09",
  },
];

/** [photo, title, copy, link label] */
const YOUTH: Array<[Photo, string, string, string]> = [
  [PHOTOS.y1, "Events & Workshops", "Hands-on sessions on money, mindset and growth.", "See what’s on →"],
  [PHOTOS.y2, "Stories", "Real journeys from young leaders and mentors.", "Read stories →"],
  [PHOTOS.y3, "Educational Resources", "Practical guides on health, wealth and leadership.", "Start learning →"],
];

/** Trust strip: [figure, italic unit, label, copy] */
/**
 * The six approved trust themes, transcribed from the correction report's
 * structure-corrections slide, which prints them as the approved content
 * basis. The four-item band this replaces was the prototype's own invention.
 *
 * Nothing here may be paraphrased or shortened. Every figure, award wording
 * and permission is pending D'Life verification before publication, and the
 * claims amount stays the blank the report itself prints.
 * [icon, figure, label, copy]
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
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>,
    "AIA",
    "Trusted Principal",
    "Proudly partnering with AIA, one of Asia’s leading insurers, while receiving recognition for professional excellence and client service.",
  ],
  [
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </>,
    "Million Dollar Agency",
    "MDRT Builder",
    "Consistently achieving Million Dollar Agency recognition since 2002 and appointed as an MDRT Builder, developing high-performing financial professionals to international standards.",
  ],
  [
    <>
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
    </>,
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
 * Manifesto pillars: [index, heading, copy]. The manifesto previously repeated
 * the hero paragraph verbatim, which left the section both redundant and empty.
 * The statement now uses the brief's own public translation of Sharon's
 * philosophy, and these three beats give the section something to hold.
 */
const PILLARS: Array<[string, string, string]> = [
  ["01", "Protect", "Cover built around the people who actually depend on you."],
  ["02", "Plan", "Decisions you could explain, in your own words, to your own family."],
  ["03", "Stay", "An advisor still picking up the phone years after the signature."],
];

/** Careers ladder: [number, heading, copy] */
const CAREER_ROWS: Array<[string, string, string]> = [
  ["01", "Mentorship", "You learn the craft beside someone senior before you ever learn a pitch."],
  ["02", "Professionalism", "Licensing, product knowledge and disclosure done properly."],
  ["03", "Leadership", "A route from advisor to team leader, with training at each step."],
  ["04", "Culture", "People who measure a good year by the clients who stayed."],
];

const FAQS: Array<[string, string]> = [
  [
    "How do I know which protection I actually need?",
    "Start with a conversation, not a product. We’ll look at your situation, your responsibilities and what you already have, then explain your options in plain language.",
  ],
  [
    "Can I get clarity on a policy I already hold?",
    "Yes. Many people simply want to understand what they’re covered for. We’re happy to walk you through it, with no obligation to change anything.",
  ],
  [
    "Can I speak with someone before deciding anything?",
    "Always. Most conversations with us don’t end in a decision, and that’s completely fine.",
  ],
  [
    "What happens after I take up a policy?",
    "Your advisor stays with you. Life changes, and your coverage should be reviewed as it does.",
  ],
];

const PlayIcon = () => (
  <span className="play">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  </span>
);

export default function DLife() {
  const root = useRef<HTMLDivElement>(null);
  /* ---------- featured videos (correction report, video activation) ----------
     One centre card is active and larger than the side previews. When the
     section first enters view the active card starts playing muted, because
     muted is the only way a browser will autoplay at all — so the Muted state
     and the Unmute control are the section's most prominent controls, not an
     afterthought. Playback never leaves the card. */
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  /** False until the section has been seen; nothing plays before that. */
  const [armed, setArmed] = useState(false);
  /** Explicit pause, so the play control can hold against the autoplay effect. */
  const [paused, setPaused] = useState(false);
  const stories = useRef<HTMLElement>(null);
  const player = useRef<HTMLVideoElement>(null);

  /* A rect check rather than IntersectionObserver. The section is taller than
     most viewports, so a fractional threshold can sit unsatisfied even while
     the cards fill the screen — which is exactly what happened: the observer
     never fired and the card stayed a poster. This arms as soon as the section
     reaches three-quarters of the way up the viewport, and checks once on
     mount so a deep link or a short page does not have to wait for a scroll. */
  useEffect(() => {
    const el = stories.current;
    if (!el || armed) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.75 && r.bottom > 0) {
        setArmed(true);
        return true;
      }
      return false;
    };
    if (check()) return;
    const onScroll = () => check() && window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [armed]);

  /* Autoplay can still be refused. If it is, the poster and its play control
     stay put rather than the card sitting on a frozen first frame. */
  useEffect(() => {
    const v = player.current;
    if (!v || !armed || paused) return;
    v.muted = muted;
    v.play().catch(() => setArmed(false));
  }, [armed, active, muted, paused]);

  /* Rotation clears an explicit pause: the next card entering the centre is
     meant to start playing, per the report's rotation rules. */
  const go = (i: number) => {
    setActive((i + VIDEOS.length) % VIDEOS.length);
    setPaused(false);
  };
  const rotate = (step: number) => go(active + step);
  const togglePlay = () => {
    const v = player.current;
    if (!v) return setArmed(true);
    if (v.paused) {
      setPaused(false);
      v.play().catch(() => undefined);
    } else {
      v.pause();
      setPaused(true);
    }
  };

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
      {/* Read progress. Decorative — the scroll position is already conveyed by
          the scrollbar to anyone relying on assistive tech. */}
      <div id="prog" aria-hidden="true">
        <i />
      </div>
      <div id="loader" aria-hidden="true">
        <div>
          <div className="in">
            <span className="wm">
              <Logo reversed />
            </span>
          </div>
          <div className="sub">Real support, beyond the policy.</div>
        </div>
      </div>

      <header id="hd">
        {/* Both cuts ship; the ground decides which is visible. The link owns
            the accessible name so the pair stays decorative and "D’Life" is
            announced once, not twice. */}
        <a className="wm" href="#hero" aria-label="D’Life, back to top">
          <Logo reversed alt="" />
          <Logo alt="" />
        </a>
        {/* Hover and focus both open a panel, so the caret never lies to a
            keyboard user. These are plain links, not a menubar widget. */}
        <nav className="nav" aria-label="Primary">
          <div className="grp">
            <a className="top" href="#needs">
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
          <a className="top" href="#policy">
            Existing Policy Support
          </a>
          <a className="top" href="/stories">
            Stories
          </a>
          <a className="top" href="#careers">
            Careers
          </a>
          <div className="grp">
            <a className="top" href="#youth">
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
          <a className="pill" data-wa={WA_ADVISOR} href="#">
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
          <a href="#needs">
            Solutions<i>01</i>
          </a>
          <a href="#policy">
            Existing Policy Support<i>02</i>
          </a>
          <a href="#stories">
            Stories<i>03</i>
          </a>
          <a href="#careers">
            Careers<i>04</i>
          </a>
          <a href="#youth">
            Community<i>05</i>
          </a>
        </div>
        <div className="side">
          <p>
            Whether you are protecting a family, reviewing a policy or exploring a career, a conversation is the right
            place to start.
          </p>
          <div className="c">
            <a data-wa={WA_ADVISOR} href="#">
              Message an Advisor on WhatsApp
            </a>
            <a href="mailto:hello@dlife.com.my">Ask a Question</a>
          </div>
          <span className="lb">D’Life · Financial Advisory</span>
        </div>
      </nav>

      {/* .dark flips the section tokens to ivory-on-dark — the copy sits on
          the photograph's scrim, not on the page ground. */}
      <section id="hero" className="dark">
        <div className="fg">
          <span className="lb rv">D’Life · Financial Advisory</span>
          <h1>
            <span className="lw">
              <span>Real Support.</span>
            </span>
            <span className="lw">
              <span>
                <i>Beyond the Policy.</i>
              </span>
            </span>
          </h1>
          <p className="rv">
            Protection is only the beginning. D’Life brings real guidance, long-term relationships and support through
            life’s changes.
          </p>
          <div className="acts rv">
            <a className="pill" data-wa={WA_ADVISOR} href="#">
              <span>Speak with an Advisor</span>
            </a>
            <a className="pill ghost" href="#path">
              <span>Find your path</span>
            </a>
          </div>
        </div>
        <div className="bg ph">
          <Plate photo={PHOTOS.hero} parallax eager />
        </div>
      </section>

      {/* Approved sequence, per the visual system reference: hero → choose your
          path → trust proof. The selector is a light horizontal routing strip,
          deliberately lighter than the life-needs section below it, and sits
          above the trust band rather than after it. */}
      <section id="path">
        <span className="lb rv">Choose your path</span>
        <p className="q rv">
          <span>I’m looking to…</span>
        </p>
        <div className="opts rv">
          {PATHS.map(([icon, label, href]) => (
            <a className="opt" href={href} key={label}>
              <Ico>{icon}</Ico>
              {label}
              <em>→</em>
            </a>
          ))}
        </div>
        <span className="cue">Swipe for more</span>
      </section>

      <section id="trust" className="dark">
        {/* "27 years" pending client verification — open question #1 in the
            project brief: Sharon personally, or D'Life as an organisation? */}
        {TRUST.map(([icon, figure, label, copy]) => (
          <div className="c rv" key={figure}>
            <Ico>{icon}</Ico>
            <b>{figure}</b>
            <u>{label}</u>
            <p>{copy}</p>
          </div>
        ))}
      </section>

      <section id="needs">
        <div className="head">
          <div>
            <span className="lb rv">What brings you here</span>
            <h2 className="rv" style={{ marginTop: 26 }}>
              Support built around <i>real life needs</i>
            </h2>
          </div>
          <p className="rv">Everyone arrives with a different question. Start wherever you are.</p>
        </div>
        {/* Mosaic, not a rail: two cards across the top and three beneath, all
            five visible at one glance on desktop. The pinned horizontal track
            this replaces was the scroll-jacking the report rules out. */}
        <div className="grid">
          {NEEDS.map(([photo, title, copy]) => (
            <article className="ncard rv" id={slug(title)} key={title}>
              <div className="ph">
                <Plate photo={photo} />
              </div>
              <div className="cap">
                <h3>{title}</h3>
                <p>{copy}</p>
                {/* The direct CTA slide 10 requires. It opens WhatsApp with a
                    need-specific prefill rather than pointing at the Solutions
                    route, which does not exist yet — so the card converts today
                    instead of 404ing. */}
                <a className="ncta" href="#" data-wa={`Hi D'Life, I'd like to talk about ${title}.`}>
                  Talk about this
                  <em>→</em>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="policy" className="sand">
        <div className="tx">
          <span className="lb rv">
            Existing policyholders
          </span>
          <h2 className="rv" style={{ marginTop: 26 }}>
            Need clarity on your <i>current coverage?</i>
          </h2>
          <p className="rv">
            Understand the protection you already have. Speak with our team to review your coverage with greater
            confidence, and see what next step, if any, makes sense.
          </p>
          <div className="acts rv">
            <a className="pill" data-wa="Hi D'Life, I'd like guidance on my existing policy." href="#">
              <span>Get guidance on my policy</span>
            </a>
            <a className="tx-link" href="#faq">
              See how we can help
            </a>
          </div>
        </div>
        <div className="ph">
          <Plate photo={PHOTOS.policy} parallax />
        </div>
      </section>

      <section id="founder">
        {/* TODO(launch): founder portraits. Both slots stay marked rather than
            filled with a film still — the brief lists photography rights as a
            blocking question, and a founder's face is the last thing to fake. */}
        <div className="fpair rv">
          <div className="ph">
            <div className="slot-empty">
              Sharon Cheang
              <em>Founder</em>
            </div>
          </div>
          <div className="ph">
            <div className="slot-empty">
              Rachel Cheang
              <em>Co-Founder</em>
            </div>
          </div>
        </div>
        <div>
          <span className="lb rv">Our founders</span>
          <h2 className="rv">Founded by Sisters, Built with Purpose</h2>
          {/* Cut from two paragraphs to one. The report asks for a short intro
              that routes to the full story rather than telling it here. */}
          <p className="rv">
            <b>Sharon Cheang</b> built D’Life on one belief: people come before products, and support should continue
            long after a policy is signed. Her sister <b>Rachel Cheang</b> leads business development and the community
            side of the practice.
          </p>
          <a className="tlink rv" data-wa="Hi D'Life, I'd like to start a conversation." href="#">
            Discover our story
          </a>
        </div>
      </section>

      <section id="stories" className="dark" ref={stories}>
        <div className="head">
          <div>
            <span className="lb rv">Featured videos</span>
            <h2 className="rv" style={{ marginTop: 26 }}>
              Meet the people <i>behind D’Life</i>
            </h2>
          </div>
          <a className="pill ghost rv" href="/stories">
            <span>View all stories</span>
          </a>
        </div>
        {/* A compact row: the centre card is enlarged relative to its
            neighbours rather than to the section, so the row keeps its shape
            as the active card moves along it. */}
        <div className="reel">
          {VIDEOS.map((v, i) => {
            const on = i === active;
            return (
              <div className={on ? "story on" : "story"} key={v.title}>
                {/* The poster doubles as a blurred fill behind the player: the
                    source is 9:16 and the card is wider, so `contain` would
                    otherwise leave two dead black columns. */}
                <div className="ph" style={{ ["--poster" as string]: `url(${v.poster})` } as React.CSSProperties}>
                  {on && armed ? (
                    <>
                      <video
                        ref={player}
                        src={v.src}
                        poster={v.poster}
                        muted={muted}
                        playsInline
                        preload="metadata"
                        controls={!muted}
                        onEnded={() => go(active + 1)}
                      />
                      {/* The muted state is stated, not implied, and its
                          control is the loudest thing on the card. */}
                      {muted ? (
                        <button type="button" className="unmute" onClick={() => setMuted(false)}>
                          <span className="dot" aria-hidden="true" />
                          Muted. Tap to unmute
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="unmute quiet"
                          onClick={() => setMuted(true)}
                          aria-label="Mute video"
                        >
                          Mute
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      type="button"
                      className="pick"
                      aria-label={on ? `Play video: ${v.title}` : `Show video: ${v.title}`}
                      onClick={() => (on ? setArmed(true) : setActive(i))}
                    >
                      {/* Decorative — the heading below already names it. */}
                      <img src={v.poster} alt="" loading="lazy" decoding="async" />
                      <PlayIcon />
                    </button>
                  )}
                </div>
                <h3>{v.title}</h3>
                <span className="run">{v.runtime}</span>
              </div>
            );
          })}
        </div>
        {/* Play/Pause, Previous and Next, plus dots as the carousel cue. */}
        <div className="reelctl rv">
          <button type="button" onClick={() => rotate(-1)} aria-label="Previous story">
            ←
          </button>
          <button type="button" className="pp" onClick={togglePlay} aria-label={paused ? "Play video" : "Pause video"}>
            {paused || !armed ? "▶" : "❚❚"}
          </button>
          <div className="dots">
            {VIDEOS.map((v, i) => (
              <button
                type="button"
                key={v.title}
                className={i === active ? "on" : undefined}
                onClick={() => go(i)}
                aria-label={`Show story ${i + 1} of ${VIDEOS.length}`}
                aria-current={i === active}
              />
            ))}
          </div>
          <button type="button" onClick={() => rotate(1)} aria-label="Next story">
            →
          </button>
        </div>
      </section>

      {/* Cream, not dark: this sits between Stories and DVA, and the brand's
          section rhythm forbids two dark sections touching. */}
      <section id="careers">
        <div>
          <span className="lb rv">
            Grow with D’Life
          </span>
          <h2 className="rv">
            A career built on <i>real guidance,</i> not just sales.
          </h2>
          {/* The advisor quote the brief keeps alongside the four pillars, and
              which the reference shows sitting under the heading. */}
          <blockquote className="qt rv">
            <p>“D’Life gave me the mentorship I couldn’t find anywhere else.”</p>
            <span>D’Life Advisor</span>
          </blockquote>
          <a className="pill rv" data-wa="Hi D'Life, I'd like to explore a career conversation." href="#">
            <span>Explore a career conversation</span>
          </a>
        </div>
        <div className="rows">
          {CAREER_ROWS.map(([no, title, copy]) => (
            <a className="rv" href="#" key={no}>
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

      <section id="dva" className="dark">
        {/* Bounded panel, not a full-viewport band: the brief wants DVA
            "small, dark, contained" so it reads against Youth's openness. */}
        {/* Reference slide 8: a contained teaser on flat deep green, centred
            under a small emblem, closing on an outlined action — not a
            dominant open-recruitment band, and no photograph behind it. The
            name now leads at heading scale, with the proposition beneath it. */}
        <div className="panel rv">
          <div className="bg ph">
            <Plate photo={PHOTOS.dva} parallax />
          </div>
          <div className="fg">
            <span className="lb">By invitation</span>
            {/* The report calls "Association" wrong outright: it is Drive
                Value Associates, in the section and in the footer. */}
            <h2>Drive Value Associates (DVA)</h2>
            <p>Built for leaders, a selective circle shaped by shared values and experience.</p>
            <a className="pill sand" data-wa="Hi D'Life, I'd like to know more about DVA." href="#">
              <span>Discover DVA</span>
            </a>
          </div>
        </div>
      </section>

      <section id="youth" className="sand">
        <div className="head">
          <div>
            <span className="lb rv">
              Community
            </span>
            <h2 className="rv" style={{ marginTop: 24 }}>
              Youth Community
            </h2>
            <div className="sup rv">Empowering youth. Building tomorrow.</div>
          </div>
          <p className="intro rv">
            A platform for young people to explore health, wealth and leadership through real talks, mentors and
            experience.
          </p>
        </div>
        <div className="grid">
          {/* The comp makes the whole card one <a>. Kept as a div with the CTA
              link stretched over it instead, so the heading and copy stay
              outside the link's accessible name rather than being swallowed
              into one very long label. */}
          {YOUTH.map(([photo, title, copy, cta]) => (
            <div className="yc rv" key={title}>
              <div className="ph">
                <Plate photo={photo} />
              </div>
              <div className="tx">
                <h3>{title}</h3>
                <p>{copy}</p>
                <a className="cta" href="#youth">
                  <em>{cta}</em>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="loop rv">
          <div>
            <h3>Stay in the Loop</h3>
            <p>Event invites and Youth Community updates, by email or on WhatsApp, whichever you actually read.</p>
          </div>
          <div>
            <span className="k">By email</span>
            {/* Front end only: no endpoint is wired, so on submit the form is
                replaced by an inline acknowledgement rather than anything that
                implies the address has been stored. */}
            <form id="loopform">
              <input type="email" placeholder="Your email" required aria-label="Your email" />
              <button className="pill" type="submit">
                <span>Sign Up</span>
              </button>
            </form>
            {/* Consent wording is [PENDING D'LIFE CONFIRMATION] — data storage,
                list ownership and unsubscribe method are unresolved. */}
            <p className="consent">
              By signing up you agree to receive Youth Community updates. Unsubscribe anytime.
            </p>
            <div className="alt">
              <a className="tlink" data-wa="Hi D'Life, I'd like Youth Community updates." href="#">
                Get updates on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div>
          <span className="lb rv">Helpful answers</span>
          <h2 className="rv">
            A few common <i>questions</i>
          </h2>
          <a className="tlink rv" href="#faq">
            Explore Our FAQ
          </a>
        </div>
        <div className="items">
          {FAQS.map(([q, a]) => (
            <div className="item" key={q}>
              <button className="q" type="button" aria-expanded={false}>
                {q}
                <span className="x" />
              </button>
              <div className="a">
                <p>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The hero opens the page with a photograph behind the type; this closes
          it on the same gesture reflected — scrim heaviest at the top, holding
          a plateau under the copy, then releasing downward so the photograph
          resolves in the lower third. That release is what stops closing and
          footer reading as one undifferentiated dark mass, which is the risk
          the brief's one permitted adjacent dark pair carries.

          `parallax` is load-bearing, not decorative: .prlx both earns the
          scroll drift and excludes this plate from the generic `.ph img`
          settle pass, which would otherwise slam a full-bleed background from
          scale 1.16 to 1 on entry. */}
      {/* Flat deep green and compact. The full-bleed photograph, its scrim
          stack and the "D'Life" label are all gone: this is the page's last
          action, and it only needs to ask once. */}
      <section id="close" className="dark">
        <div className="fg">
          <h2 className="rv">
            A clearer future can begin with <i>one conversation.</i>
          </h2>
          <div className="sub rv">Let it begin with you.</div>
          <div className="acts rv">
            <a className="pill" data-wa="Hi D'Life, I'd like to start a conversation." href="#">
              <span>Speak with an Advisor</span>
            </a>
            <a className="pill ghost" href="#path">
              <span>Find your path</span>
            </a>
          </div>
        </div>
      </section>

      {/* The one permitted adjacent dark pair (brief §10): deep-green closing
          CTA into charcoal footer. #close owns the page's last primary action,
          so nothing here is a copper .pill — this band is utility, not
          conversion. */}
      <footer id="ft" className="dark charcoal">
        <div className="mast rv">
          <div>
            <div className="wm">
              <Logo reversed />
            </div>
            <p className="tag">Real support, beyond the policy.</p>
          </div>
          {/* "Since 1999" comes from the client's own logo lockup, and
              2026−1999 = 27 corroborates the trust strip. Still governed by
              brief §14 Q1 — Sharon personally, or the organisation. */}
          <span className="est">
            Est. 1999
            <br />
            Malaysia
          </span>
        </div>

        <div className="mid">
          <div className="reach rv">
            <h2 className="lede">
              Talk to a person, <i>not a form.</i>
            </h2>
            <ul className="chan">
              <li>
                <span className="k">WhatsApp</span>
                {/* aria-label contains the visible string, so WCAG 2.5.3
                    (label in name) holds while the name still says which
                    channel this opens. */}
                <a
                  className="go"
                  data-wa={WA_FOOTER}
                  href="#"
                  aria-label={`Message D’Life on WhatsApp at ${CONTACT.phone}`}
                >
                  <span>{CONTACT.phone}</span>
                  <em aria-hidden="true">→</em>
                </a>
                <p className="hint">
                  Monday to Friday, 9am–6pm. Most messages get a reply the same day, and no one will chase you
                  afterwards.
                </p>
              </li>
              <li>
                <span className="k">Email</span>
                <a className="go" href={`mailto:${CONTACT.email}`}>
                  <span>{CONTACT.email}</span>
                  <em aria-hidden="true">→</em>
                </a>
                <p className="hint">For anything that needs a longer answer, or a document attached.</p>
              </li>
              <li>
                <span className="k">Office</span>
                {/* ⚠️ Full street address pending — see CONTACT above. */}
                <address>{CONTACT.city}</address>
                <p className="hint">
                  Visits by appointment.{" "}
                  <a data-wa={WA_VISIT} href="#">
                    Message us to arrange a time
                  </a>
                  .
                </p>
              </li>
              <li>
                {/* Brief §8: social feeds the website, not the other way round.
                    The exits are grouped once, quietly, at the end of the
                    contact list rather than scattered as icons. */}
                <span className="k">Elsewhere</span>
                <div className="soc">
                  <a href="#">Instagram</a>
                  <a href="#">Facebook</a>
                  <a href="#">YouTube</a>
                </div>
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
          </nav>
        </div>

        {/* This is a financial advisory; trust is the product. Deliberately no
            .rv on this band or the one below — they are the last elements on
            the page, and a missed scroll trigger must never leave a legal
            notice stuck at opacity 0. */}
        <div className="fine">
          <p className="note">
            D’Life Revolution is a financial advisory and insurance agency operating in Malaysia. Anything you read
            here is general information, not personal advice. It does not take your circumstances into account. A
            recommendation only follows a conversation, a needs assessment and the relevant product disclosure
            documents.
          </p>
          <div>
            <span className="k">Licensing</span>
            {/* ⚠️ Brief §14 Q4 — is D'Life a licensed agency in its own right,
                or a team under a larger insurer? Until that is answered we show
                the slot rather than invent a regulator. Placeholder, not
                shippable copy. */}
            <p className="pend">
              Legal entity, company registration and licensing details to be confirmed before launch.
            </p>
          </div>
        </div>

        <div className="base">
          <span>© 2026 D’Life Revolution. All rights reserved.</span>
          <div className="lx">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Disclosures</a>
            <a href="#">Complaints &amp; Feedback</a>
          </div>
          <a className="top" href="#hero">
            Back to top <em aria-hidden="true">↑</em>
          </a>
        </div>
      </footer>

    </div>
  );
}
