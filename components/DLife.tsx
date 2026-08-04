"use client";

import "../styles/dlife.css";
import { useCallback, useEffect, useRef, useState } from "react";

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
  // The one deliberate stock exception, at the client's direction: the film
  // stills are 1440px frames and cannot hold a 100vh full-bleed hero. This is
  // the original comp's kitchen-table photograph, standing in until the real
  // shoot (brief §12) delivers a frame wide enough to replace it.
  hero: {
    src: "https://images.unsplash.com/photo-1576089073624-b5751a8f4de9?auto=format&fit=crop&w=2400&q=72",
    alt: "A family sharing a meal at their kitchen table",
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
      ["DVA — By Invitation", "#dva"],
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

const NEEDS: Array<[Photo, string, string]> = [
  [PHOTOS.n1, "Protecting Family", "Coverage built around the people who depend on you."],
  [PHOTOS.n2, "Protecting Income", "Keep life steady even when the unexpected happens."],
  [PHOTOS.n3, "Medical & Health Preparation", "Practical support for health and recovery costs."],
  [PHOTOS.n4, "Planning for the Future", "Retirement and legacy planning, with confidence."],
  [PHOTOS.n5, "Wealth & Legacy", "Growing and protecting what you’ve built."],
];

/**
 * Featured videos. The brief requires these to play inside the site with audio
 * rather than bouncing a visitor out to social, so they open in an in-page
 * dialog. Sources are vertical 9:16 with burned-in bilingual subtitles; the
 * poster is a 4:5 crop that matches the card and keeps the speaker's face.
 */
type Video = {
  src: string;
  poster: string;
  /** Poster is decorative — the card's own heading names the story. */
  title: string;
  runtime: string;
};

const VIDEOS: Video[] = [
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
const TRUST: Array<[string, string | null, string, string]> = [
  ["27", "years", "Experience", "Of guidance across changing markets and life stages."],
  ["People", "first", "Approach", "Advisory before products, every conversation."],
  ["Clarity", null, "Promise", "Protection you can explain to your own family."],
  ["Support", null, "After the sign", "A human to call when it matters most."],
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
  const [playing, setPlaying] = useState<Video | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  /** The card that opened the dialog, so focus can be handed back on close. */
  const opener = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setPlaying(null), []);

  /* Dialog behaviour: Escape closes it, the page behind is frozen so a scroll
     gesture doesn't drive the pinned ScrollTrigger sections underneath, and
     focus moves to the close button then returns to the card that opened it. */
  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener.current?.focus();
    };
  }, [playing, close]);

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
        <a className="wm" href="#hero" aria-label="D’Life — back to top">
          <Logo reversed alt="" />
          <Logo alt="" />
        </a>
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

      <section id="trust" className="dark">
        {/* "27 years" pending client verification — open question #1 in the
            project brief: Sharon personally, or D'Life as an organisation? */}
        {TRUST.map(([figure, unit, label, copy]) => (
          <div className="c rv" key={label}>
            <b>
              {figure}
              {unit && <em>{unit}</em>}
            </b>
            <u>{label}</u>
            <p>{copy}</p>
          </div>
        ))}
      </section>

      <section id="man">
        <span className="lb rv">What we actually do</span>
        <p className="man">
          We help you <i>protect what matters,</i> plan for what’s ahead, and we stay with you{" "}
          <i>after the paperwork is done.</i>
        </p>
        <div className="pillars">
          {PILLARS.map(([no, title, copy]) => (
            <div className="pillar rv" key={no}>
              <i>{no}</i>
              <b>{title}</b>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="path">
        <div className="list">
          <span className="lb rv">Find your path</span>
          <div className="q rv">I’m looking to…</div>
          <a className="opt" href="#needs" data-im="0">
            <span>Protect my family</span>
            <span className="no">01</span>
          </a>
          <a className="opt" href="#policy" data-im="1">
            <span>Review my coverage</span>
            <span className="no">02</span>
          </a>
          <a className="opt" href="#needs" data-im="2">
            <span>Plan for the future</span>
            <span className="no">03</span>
          </a>
          <a className="opt" href="#careers" data-im="3">
            <span>Explore a career</span>
            <span className="no">04</span>
          </a>
          <a className="opt" href="#youth" data-im="4">
            <span>Join a community</span>
            <span className="no">05</span>
          </a>
        </div>
        <div className="vis">
          <div className="ph">
            <div className="im on">
              <Plate photo={PHOTOS.p1} />
            </div>
            <div className="im">
              <Plate photo={PHOTOS.p2} />
            </div>
            <div className="im">
              <Plate photo={PHOTOS.p3} />
            </div>
            <div className="im">
              <Plate photo={PHOTOS.p4} />
            </div>
            <div className="im">
              <Plate photo={PHOTOS.p5} />
            </div>
            <div className="cap" id="pathcap">
              Start wherever you are.
            </div>
          </div>
        </div>
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
        <div className="rail">
          <div className="track" id="ntrack">
            {NEEDS.map(([photo, title, copy]) => (
              <div className="ncard" key={title}>
                <div className="ph">
                  <Plate photo={photo} />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
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
            <div className="slot-empty">Sharon Cheang</div>
          </div>
          <div className="ph">
            <div className="slot-empty">Rachel Cheang</div>
          </div>
        </div>
        <div>
          <span className="lb rv">Our founders</span>
          <h2 className="rv">
            Started by two sisters, <i>carried forward through real people.</i>
          </h2>
          {/* "almost three decades" pending client verification */}
          <p className="rv">
            <b>Sharon Cheang</b> built D’Life on one belief: people come before products, and support should continue
            long after a policy is signed. Her sister <b>Rachel Cheang</b> leads business development and the community
            side of the practice.
          </p>
          <p className="rv">
            What began as a financial advisory practice has grown into a place where clients are guided, advisors are
            mentored, and both are expected to become better than they were.
          </p>
          <a className="tlink rv" data-wa="Hi D'Life, I'd like to start a conversation." href="#">
            Discover our story
          </a>
        </div>
      </section>

      <section id="stories" className="dark">
        <div className="head">
          <div>
            <span className="lb rv">Featured videos</span>
            <h2 className="rv" style={{ marginTop: 26 }}>
              Meet the people <i>behind D’Life</i>
            </h2>
          </div>
          <a className="tlink rv" href="#stories">
            View all stories
          </a>
        </div>
        <div className="grid">
          {VIDEOS.map((v) => (
            <div className="story rv" key={v.title}>
              {/* A real control, not a decorated div: the play affordance has to
                  be reachable by keyboard and announced as a button. */}
              <button
                type="button"
                className="ph"
                aria-label={`Play video: ${v.title}`}
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setPlaying(v);
                }}
              >
                {/* Decorative — the heading below already names the story. */}
                <img src={v.poster} alt="" loading="lazy" decoding="async" />
                <PlayIcon />
              </button>
              <h3>{v.title}</h3>
              <span className="run">{v.runtime}</span>
            </div>
          ))}
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
        <div className="panel rv">
          <div className="bg ph">
            <Plate photo={PHOTOS.dva} parallax />
          </div>
          <div className="fg">
            {/* NOTE(copy): the client says "Drive Value Association"; the
                master brief §4 says "Drive Value Associate". Using the
                client's wording — needs confirming before launch. */}
            <span className="lb">Drive Value Association (DVA) · By invitation</span>
            <h2>
              Built for leaders. A selective circle shaped by <i>shared values and experience.</i>
            </h2>
            <a className="pill" data-wa="Hi D'Life, I'd like to know more about DVA." href="#">
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
      <section id="close" className="dark">
        <div className="bg ph">
          <Plate photo={PHOTOS.close} parallax />
        </div>
        <div className="fg">
          <span className="lb rv">D’Life</span>
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
            here is general information, not personal advice — it does not take your circumstances into account. A
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

      {/* Videos play here rather than on a social platform, so a visitor never
          has to leave the site to finish a story. The source is 9:16 and is
          letterboxed rather than cropped — the subtitles are burned into the
          bottom of the frame and a cover-fit would cut them off. */}
      {playing ? (
        <div
          className="vmodal"
          role="dialog"
          aria-modal="true"
          aria-label={playing.title}
          onClick={close}
        >
          <button
            ref={closeBtn}
            type="button"
            className="vclose"
            onClick={close}
            aria-label="Close video"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="vbox" onClick={(e) => e.stopPropagation()}>
            <video
              key={playing.src}
              src={playing.src}
              poster={playing.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
