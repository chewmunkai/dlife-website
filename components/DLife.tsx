"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { asset, link } from "../lib/asset";
import { ROUTES } from "../lib/routes";
import Growth from "./v2/Growth";
import { GROWTH } from "../content/growth";
import { WA } from "../lib/contact";
import { VIDEOS } from "../content/videos";
import Faq from "./blocks/Faq";
import { HOME_FAQS } from "../content/home";

/* ============================================================
   D'Life — homepage.

   The client-approved long-scroll page, in the confirmed fourteen-section
   sequence. Everything outside the sections themselves — the header, the
   overlay menu, the footer, the loader and the floating contact point — now
   lives in components/site/SiteShell, which wraps every route on the site.

   The prototype's <image-slot> elements were a design-tool affordance
   (drag-to-fill placeholders with a persistence sidecar); in production they
   are plain <img> against D'Life's own media.
   ============================================================ */

type Photo = {
  src: string;
  alt: string;
};

/**
 * Most images are D'Life's own — the client photography plus stills lifted
 * from the advisor films. The hero is the original composition's stock-photo
 * exception, now self-hosted, and the four `need-*‑malaysia.jpg` plates are
 * original AI-generated lifestyle images commissioned for this build.
 *
 * NOTE(launch): the film stills are 1440px-wide video frames, not photographs.
 * They hold up at card scale but will not survive being enlarged, so the real
 * shoot the brief flags as a budget item still needs to happen.
 */
const PHOTOS = {
  // The original composition's 2400px kitchen-table photograph, self-hosted so
  // the hero no longer depends on an external image endpoint. A commissioned
  // D'Life shoot can replace this stock exception at launch without changing
  // the component or its responsive crop.
  hero: {
    src: asset("/media/img/hero.jpg"),
    alt: "An Asian family sharing a meal around their kitchen table",
  },
  p1: { src: asset("/media/img/path-family.jpg"), alt: "Three generations of a family gathered around a table" },
  p2: { src: asset("/media/img/path-review.jpg"), alt: "An advisor reviewing paperwork at his desk" },
  p3: { src: asset("/media/img/path-future.jpg"), alt: "Writing out a plan at a desk" },
  p4: { src: asset("/media/img/path-career.jpg"), alt: "Looking out over the trees, weighing what’s next" },
  p5: { src: asset("/media/img/community-gathering.jpg"), alt: "D’Life colleagues sharing a meal around a table" },
  n1: {
    src: asset("/media/img/need-family-malaysia.jpg"),
    alt: "A multigenerational Malaysian family sharing a meal at home",
  },
  n2: {
    src: asset("/media/img/need-income-malaysia.jpg"),
    alt: "A Malaysian couple planning together in their home office",
  },
  n3: {
    src: asset("/media/img/need-health-malaysia.jpg"),
    alt: "A Malaysian family discussing preventive health with a doctor",
  },
  n4: { src: asset("/media/img/need-planning.jpg"), alt: "Planning at a laptop at the kitchen table" },
  n5: {
    src: asset("/media/img/need-legacy-malaysia.jpg"),
    alt: "A Malaysian family sharing memories in a heritage home",
  },
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
 * The compact path selector's five routes, in the brief's first-person voice.
 *
 * These are now the real routes rather than in-page anchors. The guide's
 * journey map runs "homepage → pathway selector → relevant solution page", so
 * a visitor who already knows what they want leaves the homepage on the first
 * click instead of being scrolled to a section that only teases it.
 *
 * The first-person wording here is deliberately not the life-needs section's
 * noun wording ("Protect my family" vs "Protecting Your Family") — the
 * non-duplication rule.
 */
const PATHS: Array<[ReactNode, string, string]> = [
  [
    <path
      key="p"
      d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    />,
    "Protect my family",
    ROUTES["protecting-your-family"].path,
  ],
  [
    <>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4M9 13h6M9 17h4" />
    </>,
    "Review my coverage",
    ROUTES.policy.path,
  ],
  [
    <>
      <path d="M16 7h6v6" />
      <path d="m22 7-8.5 8.5-5-5L2 17" />
    </>,
    "Plan for the future",
    ROUTES["planning-for-your-future"].path,
  ],
  [
    <>
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect x="2" y="6" width="20" height="14" rx="2" />
    </>,
    "Explore a career",
    ROUTES.careers.path,
  ],
  [
    <>
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
    </>,
    "Join a community",
    ROUTES.youth.path,
  ],
];

/**
 * The five life needs, in the second person the correction report asks for —
 * "Protecting Your Family", not "Protecting Family". They render as a mosaic
 * of photographic cards: the reference gives this section more imagery and
 * emotional weight than the pathway strip above, and explicitly says not to
 * repeat the pathway's labels or scale.
 *
 * Each card now opens its own Solutions page. The slug the card derived from
 * its own title was always the route name, so nothing had to be renamed for
 * these to become real links.
 * [photo, title, copy, route]
 */
const NEEDS: Array<[Photo, string, string, string]> = [
  // Four original Malaysian lifestyle plates replace the generic library
  // frames. Planning deliberately retains the existing D'Life photograph.
  [PHOTOS.n1, "Protecting Your Family", "Coverage built around the people who depend on you.", ROUTES["protecting-your-family"].path],
  [PHOTOS.n2, "Protecting Your Income", "Keep life steady even when the unexpected happens.", ROUTES["protecting-your-income"].path],
  [PHOTOS.n3, "Medical & Health Preparation", "Practical support for health and recovery costs.", ROUTES["medical-health-preparation"].path],
  [PHOTOS.p4, "Planning for Your Future", "Retirement and legacy planning, with confidence.", ROUTES["planning-for-your-future"].path],
  [PHOTOS.n5, "Wealth & Legacy", "Growing and protecting what you’ve built.", ROUTES["wealth-legacy"].path],
];

/** [photo, title, copy, link label, route] */
const YOUTH: Array<[Photo, string, string, string, string]> = [
  [PHOTOS.y1, "Events & Workshops", "Hands-on sessions on money, mindset and growth.", "See what’s on →", `${ROUTES.youth.path}#events`],
  [PHOTOS.y2, "Stories", "Real journeys from young leaders and mentors.", "Read stories →", `${ROUTES.youth.path}#stories`],
  [PHOTOS.y3, "Educational Resources", "Practical guides on health, wealth and leadership.", "Start learning →", `${ROUTES.youth.path}#resources`],
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
    // Client copy C01 (WhatsApp, 31 Aug 2026), with "RM 22million" respaced to
    // "RM22 million". ⚠️ TODO(launch): the supporting screenshot shows agency
    // claims OF RM22M, not an independently verified amount above it — confirm
    // "exceeding" versus a flat "RM22 million" before release.
    "Supporting our clients through insurance claims exceeding RM22 million with trusted guidance, dedicated assistance, and a team that stands by them every step of the way.",
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



const PlayIcon = () => (
  <span className="play">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  </span>
);

export default function DLife() {
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

  /* A11: film that starts on its own is motion, and a visitor who has asked
     their system for less of it did not ask for this either. Under the query
     the card stays a poster with its play control, and the visitor decides.
     Read once on mount and then on change, because a setting can be flipped
     while the page is open. */
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!q) return;
    setReduced(q.matches);
    const on = () => setReduced(q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);

  /* A rect check rather than IntersectionObserver. The section is taller than
     most viewports, so a fractional threshold can sit unsatisfied even while
     the cards fill the screen — which is exactly what happened: the observer
     never fired and the card stayed a poster. This arms as soon as the section
     reaches three-quarters of the way up the viewport, and checks once on
     mount so a deep link or a short page does not have to wait for a scroll. */
  useEffect(() => {
    const el = stories.current;
    if (!el || armed || reduced) return;
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
  }, [armed, reduced]);

  /* A11: the controls follow the player, not the other way round. `paused`
     and `muted` used to be set only where a button was clicked, so anything
     the browser did on its own — refusing autoplay, pausing on a hidden tab,
     the OS taking the audio session — left the button showing the opposite of
     what was true. These listen to the element's own events, which is the one
     source that cannot be wrong. Also pauses anything else on the page when
     this starts, so the reel and a film on another card never talk over each
     other. */
  useEffect(() => {
    const v = player.current;
    if (!v) return;
    const onPlay = () => {
      setPaused(false);
      document.querySelectorAll("video").forEach((other) => {
        if (other !== v && !other.paused) other.pause();
      });
    };
    const onPause = () => setPaused(true);
    const onVolume = () => setMuted(v.muted);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("volumechange", onVolume);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("volumechange", onVolume);
    };
  }, [active, armed]);

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
    /* Stop the outgoing film before it is unmounted. React would remove the
       element anyway, but pausing first means the audio never overlaps the
       incoming card even by a frame. */
    player.current?.pause();
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

  return (
    <>
      {/* Split hero, per the client's reference: the copy on the beige page
          ground at the left, the photograph held at the very right edge. The
          section keeps the page's light mode — nothing sits on the picture
          any more, so there is no scrim and no reason to invert. */}
      <section id="hero">
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
            <a className="pill" data-wa={WA.advisor} href="#">
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
          <p className="needs-sub">Everyone arrives with a different question. Start wherever you are.</p>
        </div>
        {/* Mosaic, not a rail: two cards across the top and three beneath, all
            five visible at one glance on desktop. The pinned horizontal track
            this replaces was the scroll-jacking the report rules out. */}
        <div className="grid">
          {NEEDS.map(([photo, title, copy, href]) => (
            <article className="ncard rv" key={title}>
              <div className="ph">
                <Plate photo={photo} />
              </div>
              <div className="cap">
                <h3>{title}</h3>
                <p>{copy}</p>
                {/* The direct CTA slide 10 requires. It now opens the card's
                    own Solutions page rather than WhatsApp: the guide's journey
                    map runs life-needs → relevant solution page → speak with an
                    advisor, and jumping straight to a message skips the
                    explanation the visitor came for. The need-specific prefill
                    lives on that page's own CTA. */}
                <a className="ncta" href={link(href)}>
                  Read more
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
          <h2 className="rv" style={{ marginTop: 16 }}>
            Need clarity on your <i>current coverage?</i>
          </h2>
          <p className="rv">
            Understand the protection you already have. Speak with our team to review your coverage with greater
            confidence, and see what next step, if any, makes sense.
          </p>
          {/* One action only, per the client's 2026-08 amendments: the
              "How a review works" text link is gone, so this section routes
              to exactly one place. */}
          <div className="acts rv">
            <a className="pill" data-wa={WA.policy} href="#">
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
          <a className="tlink rv" href={link(ROUTES.about.path)}>
            Discover our story
          </a>
        </div>
      </section>

      <section id="stories" className="dark" ref={stories}>
        {/* Centred at the client's request. The label and the heading now sit
            on the same centre line the reel and its controls already use, so
            the section reads as one column rather than a left-aligned heading
            with an action floating opposite it. "View all stories" moves with
            that change — see the foot of the section. */}
        <div className="head">
          <span className="lb rv">Featured videos</span>
          <h2 className="rv" style={{ marginTop: 16 }}>
            Meet the people <i>behind D’Life</i>
          </h2>
        </div>
        {/* Centre stage: the playing film sits in the middle of the row at the
            larger size, with the other two held either side as previews.

            The rotation is presentational — CSS `order` — rather than a
            reordering of this list, so the row turns around the active card
            without React relocating three cards' worth of media on every
            step. Reading order therefore stays 1, 2, 3, which is also what
            the carousel dots below announce. */}
        <div className="reel">
          {VIDEOS.map((v, i) => {
            const on = i === active;
            /* Distance forward from the active card: 0 is the centre, the
               near half runs off to the right and the far half wraps to the
               left, so the row reads prev · playing · next at any index. */
            const ahead = (i - active + VIDEOS.length) % VIDEOS.length;
            const order = ahead <= VIDEOS.length / 2 ? ahead : ahead - VIDEOS.length;
            return (
              <div className={on ? "story on" : "story"} key={v.title} style={{ order }}>
                {/* The frame is cut to the film's own 9:16, so the picture
                    fills it exactly — no letterbox columns to disguise. */}
                <div className="ph" style={{ ["--poster-position" as string]: v.focus } as React.CSSProperties}>
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
                      {/* A11: the sound control sits in the film's top corner
                          now, away from the play/pause control under the reel
                          — the two were the only controls on the card and
                          they read as one cluster. The muted state is still
                          stated rather than implied, because autoplay is only
                          ever permitted silent and a visitor arrives at a
                          silent film by definition. */}
                      <button
                        type="button"
                        className={muted ? "sound" : "sound quiet"}
                        aria-pressed={!muted}
                        aria-label={muted ? `Unmute: ${v.title}` : `Mute: ${v.title}`}
                        onClick={() => {
                          const el = player.current;
                          /* Set it on the element and let `volumechange` tell
                             React. One direction of truth. */
                          if (el) el.muted = !muted;
                          else setMuted((m) => !m);
                        }}
                      >
                        {muted && <span className="dot" aria-hidden="true" />}
                        <span>{muted ? "Muted. Tap for sound" : "Sound on"}</span>
                      </button>
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
          {/* A11: the glyph already accounted for a reel that had not started;
              the label did not, so before the first film armed the control
              showed ▶ and announced itself as "Pause video". One expression
              now drives both. */}
          <button
            type="button"
            className="pp"
            onClick={togglePlay}
            aria-label={paused || !armed ? "Play video" : "Pause video"}
          >
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
        {/* The relocated action. At the head it sat opposite the title and
            competed with it for the same glance; here it is what a visitor
            reaches after the three films have been seen, on the section's own
            centre line and reading as the way onward rather than as a second
            heading. */}
        <div className="more rv">
          <a className="pill ghost" href={link(ROUTES.stories.path)}>
            <span>View all stories</span>
          </a>
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
          <a className="pill rv" data-wa={WA.career} href="#">
            <span>Explore a career conversation</span>
          </a>
        </div>
        {/* A09: these were four whole-row links to /careers, so the only way
            to read one more sentence about mentorship was to leave the page.
            They open where they stand now. The route out is still here —
            below, as one link, which is where a navigation choice belongs
            rather than hidden inside four content rows. */}
        <div className="rv">
          <Growth items={GROWTH} idBase="home-grow" />
          <p className="grow__more">
            <a href={link(ROUTES.careers.path)}>
              See the full career page <em aria-hidden="true">→</em>
            </a>
          </p>
        </div>
      </section>

      <section id="dva">
        {/* Bounded panel, not a full-viewport band: the brief wants DVA
            "contained" so it reads against Youth's openness below.

            The photograph covers the whole panel again, at the client's
            request, with the copy centred over it rather than beside it in a
            split card. The dark now belongs to the panel and not to the
            section: the page ground stays the same ivory as "Grow with D'Life"
            above it, so the card lifts off the page as its own frame — which
            is what makes the section stand out without a full dark band
            interrupting the run.

            Soft, not heavy: the flat 72% block this used to carry is a graded
            wash now, deep enough behind the type to hold ivory at AA and light
            enough at the edges that the team still reads as a photograph. */}
        <div className="panel dark rv">
          <div className="bg ph">
            <Plate photo={PHOTOS.dva} parallax />
          </div>
          <div className="fg">
            <span className="lb">By invitation</span>
            {/* The report calls "Association" wrong outright: it is Drive
                Value Associates, in the section and in the footer. */}
            <h2>Drive Value Associates (DVA)</h2>
            <p>Built for leaders, a selective circle shaped by shared values and experience.</p>
            <a className="pill" href={link(ROUTES.dva.path)}>
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
          {YOUTH.map(([photo, title, copy, cta, href]) => (
            <div className="yc rv" key={title}>
              <div className="ph">
                <Plate photo={photo} />
              </div>
              <div className="tx">
                <h3>{title}</h3>
                <p>{copy}</p>
                <a className="cta" href={link(href)}>
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
            <form data-dl-signup="Thanks — we’ll be in touch with the next Youth Community update.">
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
              <a className="tlink" data-wa={WA.youth} href="#">
                Get updates on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Centred column at the client's request, replacing the two-column
          split that put the heading on the left and the questions on the
          right. The "Explore Our FAQ" link is out with it — it pointed back at
          this same section.

          Now the shared <Faq> block —
          the same component serves every page on the site, so a change to the
          accordion is made once. Markup and styling are the approved ones. */}
      {/* No route-out link, per the client's 2026-08 amendments: the FAQ ends
          on its last answer and the page moves to the closing frame. */}
      <Faq items={HOME_FAQS} label="Helpful answers" more={null} />

      {/* Restored at the client's request: the photograph, its scrim stack and
          the "D'Life" label are back, so the page closes on a picture rather
          than on a flat green band. The hero opens on one at the right of the
          band; this is the only place a photograph still runs behind the type,
          which is what makes it read as the closing frame.

          Scrim heaviest at the top, holding a plateau under the copy, then
          releasing downward so the photograph resolves in the lower third.
          That release is what stops closing and footer reading as one
          undifferentiated dark mass, which is the risk the brief's one
          permitted adjacent dark pair carries.

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
            <a className="pill" data-wa={WA.conversation} href="#">
              <span>Speak with an Advisor</span>
            </a>
            <a className="pill ghost" href="#path">
              <span>Find your path</span>
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
