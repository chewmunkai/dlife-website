"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { TRAP_INPUT, TRAP_STYLE } from "../../lib/forms";
import { asset, link } from "../../lib/asset";
import { ROUTES } from "../../lib/routes";
import Growth from "../v2/Growth";
import { GROWTH } from "../../content/growth";
import { WA } from "../../lib/contact";
import { FEATURED_VIDEOS, type Video } from "../../content/videos";
import Faq, { type Qa } from "../blocks/Faq";
import Hero, { type HeroProps } from "./Hero";
import { Icon } from "./icons";
import { Rich } from "./rich";
import {
  PATH_DEFAULTS,
  TRUST_DEFAULTS,
  NEEDS_DEFAULTS,
  POLICY_DEFAULTS,
  FOUNDER_DEFAULTS,
  STORIES_DEFAULTS,
  CAREERS_DEFAULTS,
  DVA_DEFAULTS,
  YOUTH_DEFAULTS,
  CLOSE_DEFAULTS,
  MEDIA_SIZES,
} from "../../content/cms/home-content";

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

export type Photo = {
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
export const PHOTOS = {
  // The original composition's 2400px kitchen-table photograph, self-hosted so
  // the hero no longer depends on an external image endpoint. A commissioned
  // D'Life shoot can replace this stock exception at launch without changing
  // the component or its responsive crop.
  /* L09: the alt text described the people in the picture by ethnicity. Alt
     text says what a photograph shows, not who it decides the people in it
     are — and on an agency page it read as a statement about who the service
     is for. The scene is the point; the description is the scene.

     L09, decided 6 Sep 2026: the hero is D'Life's own people now, not stock.
     `hero.jpg` was a licensed photograph of a family at a kitchen table and
     stays below as the record of what it replaced — the pathway cards and the
     life-needs plates still carry that register, so the page has not lost the
     client-facing note, it has stopped opening on it.

     Nothing about the copy's contrast depends on the choice: the band grades
     the picture into the ivory page (styles/dlife.css, #hero .bg::after)
     rather than putting type over it, and the headline sits beside the frame
     rather than on it. Both crops were checked at 712x751 desktop and
     375x463 mobile — every face survives at 50% 42%, which is why that is the
     object-position set in styles/pages.css. */
  /* 6 Oct 2026, client: the hero is the 27-strong team in ivory, replacing
     the nineteen-person hero-team.jpg. Same 4:3 shape (1448x1086), so the
     plate's aspect-ratio in styles/dlife.css still fits it exactly. */
  teamHero: {
    src: asset("/media/img/hero-team-ivory.jpg"),
    alt: "The D’Life team together",
  },
  p1: { src: asset("/media/img/path-family.jpg"), alt: "Three generations of a family gathered around a table" },
  p2: { src: asset("/media/img/path-review.jpg"), alt: "An advisor reviewing paperwork at his desk" },
  p3: { src: asset("/media/img/path-future.jpg"), alt: "Writing out a plan at a desk" },
  p4: { src: asset("/media/img/path-career.jpg"), alt: "Looking out over the trees, weighing what’s next" },
  p5: { src: asset("/media/img/community-gathering.jpg"), alt: "D’Life colleagues sharing a meal around a table" },
  /* 12 Oct 2026, client: each life-need card shows the hero of the page it
     opens, so the card and the page agree. The frames were re-cut for these
     3:2 photographs in styles/dlife.css (#needs); see the note there. */
  n1: {
    src: asset("/media/img/solutions/protecting-family/family-meal.jpg"),
    alt: "Three generations of a family sharing a meal at home",
  },
  n2: {
    src: asset("/media/img/solutions/protecting-income/need-income-malaysia.jpg"),
    alt: "An advisor going through the household’s figures with a couple",
  },
  n3: {
    src: asset("/media/img/solutions/medical-health/family-doctor-consultation.jpg"),
    alt: "Two family members in consultation with a doctor",
  },
  n4: {
    src: asset("/media/img/solutions/planning-for-your-future/advisor-planning.jpg"),
    alt: "An advisor and a young man starting a plan together at a table",
  },
  n5: {
    src: asset("/media/img/solutions/wealth-legacy/family-photos.jpg"),
    alt: "A family looking through photographs and albums together",
  },
  /* 12 Oct 2026, client: the Existing Policy Support hero, so the section
     and the page it leads to show the same scene. 4:3 against a 1.32–1.42
     plate: at most 6% of the height goes, and nobody with it. */
  policy: { src: asset("/media/img/eps-hero-advisor.jpg"), alt: "An advisor talking a client through his policy schedule at a table" },
  close: { src: asset("/media/img/close-conversation.jpg"), alt: "An advisor mid-conversation across a café table" },
  /* Reverted at the client's request (6 Sep 2026), and the measurements say
     why it was the right picture: the panel is 878x504 (1.74) and this file is
     1.78, so it fills the frame with almost nothing cropped. team-award.jpg is
     1.33 and lost a slice of the room at both ends. */
  /* 6 Oct 2026, client: the award-night group replaces the studio portrait
     here. Same 1.78 shape as dva-team.jpg (1672x940), so the panel's crop is
     unchanged. This is the client's corrected edit — the screen reads "DVA
     AWARD NIGHT"; dva-award-night.jpg on Resources is the same shot reading
     "DVL". dva-team.jpg stays on the DVA page and the business solution. */
  /* 12 Oct 2026, client: the team in ivory, the homepage hero photograph,
     replaces the award night here. It is 4:3 (1448x1086), so the panel takes
     that shape in styles/dlife.css and the copy moves to the bottom of the
     frame, below the lowest row of faces. */
  dva: { src: asset("/media/img/hero-team-ivory.jpg"), alt: "The D’Life team together, all in ivory, around a low table" },
  y1: { src: asset("/media/img/youth-session.jpg"), alt: "Attendees seated at a D’Life Youth Community session" },
  /* The Youth cards are 4:3 frames. This was youth-group.jpg, a 0.75 portrait,
     so the frame took a band out of the middle and cut the people standing at
     the top and bottom of the staircase — the "stories image being cut out"
     the client flagged. Replaced with a 1.33 photograph, which is the card's
     exact ratio: nothing is cropped at all. */
  y2: { src: asset("/media/img/community-group.jpg"), alt: "D’Life community members together at a gathering" },
  /* 6 Oct 2026, client: a workshop in progress replaces youth-resources.jpg on
     this card only (Youth Community and Resources keep it). Supplied as a
     1500x2000 portrait; the card is a fixed 4:3, so the file is cut to the
     4:3 band y 640-1765 — ceiling above, chair legs below, every person and
     the presenter's screen inside. See docs/dlife-asset-map.md. */
  y3: { src: asset("/media/img/youth-resources-v2.jpg"), alt: "A presenter leading a workshop, participants seated around tables" },
} satisfies Record<string, Photo>;

/* L09: the homepage hero photograph is chosen in content/cms/manifest.ts
   (HERO_DEFAULTS), and from there by Talous CMS. `teamHero` above stays as
   the record of the decision and its crop check. */

/**
 * Contents of a `.ph` plate. `parallax` wraps the image in the over-scanned
 * `.prlx` layer the scroll engine drives.
 */
export function Plate({ photo, parallax, eager }: { photo: Photo; parallax?: boolean; eager?: boolean }) {
  const img = (
    <img src={photo.src} alt={photo.alt} loading={eager ? "eager" : "lazy"} decoding="async" />
  );
  return parallax ? <div className="prlx">{img}</div> : img;
}

/* The path selector, life needs, trust figures and youth cards are data now:
   content/cms/home-content.ts holds their approved values (and the notes on
   which figures are pending verification), components/home/icons.tsx the
   icons, and Talous CMS edits copies of them. */

export const PlayIcon = () => (
  <span className="play">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  </span>
);

/* ------------------------------------------------------------------
   The homepage, one component per section. Talous CMS stores the page as an
   ordered list of these (content/cms/manifest.ts) and DLife.tsx renders them
   in that order. The markup of each section is unchanged from the approved
   single-file page; it was only cut at the section boundaries.
   ------------------------------------------------------------------ */

export function HeroSection(hero: HeroProps) {
  return (
    <>
      {/* The hero is its own component now, so Talous CMS can edit its copy
          and photograph (components/home/Hero.tsx). */}
      <Hero {...hero} />
    </>
  );
}

export function PathSection(props: Partial<typeof PATH_DEFAULTS>) {
  const p = { ...PATH_DEFAULTS, ...props };
  return (
    <>
      {/* Approved sequence, per the visual system reference: hero → choose your
          path → trust proof. The selector is a light horizontal routing strip,
          deliberately lighter than the life-needs section below it, and sits
          above the trust band rather than after it. One line of question, in
          the visitor's own voice, at the client's request. */}
      <section id="path">
        <p className="q rv">
          <span>{p.question}</span>
        </p>
        <div className="opts rv">
          {/* A17: every link runs through link(), which applies the deployment base path. */}
          {p.items.map((item, i) => (
            <a className="opt" href={link(item.href)} key={(item as { id?: string }).id ?? i}>
              <Icon name={item.icon} />
              {item.label}
              <em>→</em>
            </a>
          ))}
        </div>
        <span className="cue">Swipe for more</span>
      </section>
    </>
  );
}

export function TrustSection(props: Partial<typeof TRUST_DEFAULTS>) {
  const p = { ...TRUST_DEFAULTS, ...props };
  return (
    <>
      <section id="trust" className="dark">
        {/* "27 years" pending client verification — open question #1 in the
            project brief, and see the notes on the figures in
            content/cms/home-content.ts and docs/dlife-figures.md. */}
        {p.items.map((item, i) => (
          <div className="c rv" key={(item as { id?: string }).id ?? i}>
            <Icon name={item.icon} />
            <b>{item.figure}</b>
            <u>{item.label}</u>
            <p>{item.copy}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export function NeedsSection(props: Partial<typeof NEEDS_DEFAULTS>) {
  const p = { ...NEEDS_DEFAULTS, ...props };
  return (
    <>
      <section id="needs">
        <div className="head">
          <div>
            <span className="lb rv">{p.eyebrow}</span>
            <h2 className="rv" style={{ marginTop: 26 }}>
              <Rich text={p.heading} />
            </h2>
          </div>
          <p className="needs-sub">{p.sub}</p>
        </div>
        {/* Mosaic, not a rail: two cards across the top and three beneath, all
            five visible at one glance on desktop. */}
        <div className="grid">
          {p.items.map((item, i) => (
            <article className="ncard rv" key={(item as { id?: string }).id ?? i}>
              <div className="ph">
                <Plate photo={{ src: asset(item.photo), alt: item.photoAlt }} />
              </div>
              <div className="cap">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                {/* Opens the card's own Solutions page: life-needs → solution page → advisor. */}
                <a className="ncta" href={link(item.href)}>
                  {p.ctaLabel}
                  <em>→</em>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function PolicySection(props: Partial<typeof POLICY_DEFAULTS> & { photoSide?: string }) {
  const p = { ...POLICY_DEFAULTS, ...props };
  return (
    <>
      <section id="policy" className="sand" data-photo={p.photoSide === "left" ? "left" : undefined}>
        <div className="tx">
          <span className="lb rv">{p.eyebrow}</span>
          <h2 className="rv" style={{ marginTop: 16 }}>
            <Rich text={p.heading} />
          </h2>
          <p className="rv">{p.body}</p>
          {/* One action only, per the client's 2026-08 amendments. */}
          <div className="acts rv">
            <a className="pill" data-wa={WA.policy} href="#">
              <span>{p.ctaLabel}</span>
            </a>
          </div>
        </div>
        <div className="ph">
          <Plate photo={{ src: asset(p.photo), alt: p.photoAlt }} parallax />
        </div>
      </section>
    </>
  );
}

export function FounderSection(props: Partial<typeof FOUNDER_DEFAULTS>) {
  const p = { ...FOUNDER_DEFAULTS, ...props };
  const portrait = (src: string, alt: string) => (
    <div className="ph">
      {/* The frames are 4:5 to fit the portraits, so neither founder loses a
          shoulder to a crop. width/height are the browser's intrinsic-size
          hint and must track the file, so they're only set when known. */}
      <img src={asset(src)} alt={alt} {...(MEDIA_SIZES[src] ?? {})} loading="lazy" decoding="async" />
    </div>
  );
  return (
    <>
      <section id="founder">
        <div className="fpair rv">
          {portrait(p.photo1, p.photo1Alt)}
          {portrait(p.photo2, p.photo2Alt)}
        </div>
        <div>
          <span className="lb rv">{p.eyebrow}</span>
          <h2 className="rv">
            <Rich text={p.heading} />
          </h2>
          {/* One paragraph: a short intro that routes to the full story. */}
          <p className="rv">
            <Rich text={p.body} />
          </p>
          <a className="tlink rv" href={link(ROUTES.about.path)}>
            {p.linkLabel}
          </a>
        </div>
      </section>
    </>
  );
}

export function StoriesSection(props: Partial<typeof STORIES_DEFAULTS> & { films?: Video[] }) {
  const p = { ...STORIES_DEFAULTS, ...props };
  // The first three films of the CMS's film library (app/page.tsx), or the built-in three.
  const VIDEOS = props.films ?? FEATURED_VIDEOS;
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


  // Every film removed from the library: no reel rather than an empty one.
  if (!VIDEOS.length) return null;
  return (
    <>

      <section id="stories" className="dark" ref={stories}>
        {/* Centred at the client's request. The label and the heading now sit
            on the same centre line the reel and its controls already use, so
            the section reads as one column rather than a left-aligned heading
            with an action floating opposite it. "View all stories" moves with
            that change — see the foot of the section. */}
        <div className="head">
          <span className="lb rv">{p.eyebrow}</span>
          <h2 className="rv" style={{ marginTop: 16 }}>
            <Rich text={p.heading} />
          </h2>
        </div>
        {/* Centre stage: the playing film sits in the middle of the row at the
            larger size, with the other two held either side as previews.

            The rotation is presentational — CSS `order` — rather than a
            reordering of this list, so the row turns around the active card
            without React relocating three cards' worth of media on every
            step. Reading order therefore stays 1, 2, 3, which is also what
            the carousel dots below announce. */}
        {/* `--reel-n` lets the row divide its width between however many films
            there are — see the note on `#stories .reel .story` in
            styles/dlife.css. Adding a film needs no CSS change. */}
        <div className="reel" style={{ ["--reel-n" as string]: VIDEOS.length } as React.CSSProperties}>
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
            <span>{p.ctaLabel}</span>
          </a>
        </div>
      </section>
    </>
  );
}

export function CareersSection(props: Partial<typeof CAREERS_DEFAULTS>) {
  const p = { ...CAREERS_DEFAULTS, ...props };
  return (
    <>
      {/* Cream, not dark: this sits between Stories and DVA, and the brand's
          section rhythm forbids two dark sections touching. */}
      <section id="careers">
        <div>
          <span className="lb rv">{p.eyebrow}</span>
          <h2 className="rv">
            <Rich text={p.heading} />
          </h2>
          <blockquote className="qt rv">
            <p>{p.quote}</p>
            <span>{p.quoteBy}</span>
          </blockquote>
          <a className="pill rv" data-wa={WA.career} href="#">
            <span>{p.ctaLabel}</span>
          </a>
        </div>
        <div className="rv">
          {/* The four growth rows are shared with the Careers page (content/growth.ts),
              so they're edited there, not per section. */}
          <Growth items={GROWTH} compact linkBase={link(ROUTES.careers.path)} idBase="home-grow" />
          <p className="grow__more">
            <a href={link(ROUTES.careers.path)}>
              {p.moreLabel} <em aria-hidden="true">→</em>
            </a>
          </p>
        </div>
      </section>
    </>
  );
}

export function DvaSection(props: Partial<typeof DVA_DEFAULTS>) {
  const p = { ...DVA_DEFAULTS, ...props };
  return (
    <>
      <section id="dva">
        {/* Bounded panel with the photograph covering it and the copy centred
            over a graded wash (deep enough behind the type for AA). The report
            calls "Association" wrong: it is Drive Value Associates. */}
        <div className="panel dark rv">
          <div className="bg ph">
            <Plate photo={{ src: asset(p.photo), alt: p.photoAlt }} parallax />
          </div>
          <div className="fg">
            <span className="lb">{p.eyebrow}</span>
            <h2>
              <Rich text={p.heading} />
            </h2>
            <p>{p.body}</p>
            <a className="pill" href={link(ROUTES.dva.path)}>
              <span>{p.ctaLabel}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function YouthSection(props: Partial<typeof YOUTH_DEFAULTS>) {
  const p = { ...YOUTH_DEFAULTS, ...props };
  return (
    <>
      <section id="youth" className="sand">
        <div className="head">
          <div>
            <span className="lb rv">{p.eyebrow}</span>
            <h2 className="rv" style={{ marginTop: 24 }}>
              <Rich text={p.heading} />
            </h2>
            <div className="sup rv">{p.sup}</div>
          </div>
          <p className="intro rv">{p.intro}</p>
        </div>
        <div className="grid">
          {/* Each card keeps its heading and copy outside the link's accessible
              name; the CTA link is stretched over the card instead. */}
          {p.cards.map((card, i) => (
            <div className="yc rv" key={(card as { id?: string }).id ?? i}>
              <div className="ph">
                <Plate photo={{ src: asset(card.photo), alt: card.photoAlt }} />
              </div>
              <div className="tx">
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <a className="cta" href={link(card.href)}>
                  <em>{card.ctaLabel}</em>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="loop rv">
          <div>
            <h3>{p.loopTitle}</h3>
            <p>{p.loopBody}</p>
          </div>
          <div>
            <span className="k">By email</span>
            {/* Posts to D'Life's Sheet (lib/forms.ts); lib/dlife.ts handles the submit. */}
            <form data-dl-signup="Thanks — we’ll be in touch with the next Youth Community update.">
              <div style={TRAP_STYLE} aria-hidden="true">
                <input type="text" name={TRAP_INPUT} tabIndex={-1} autoComplete="off" />
              </div>
              <input type="email" placeholder="Your email" required aria-label="Your email" />
              <button className="pill" type="submit">
                <span>Sign Up</span>
              </button>
            </form>
            {/* Consent wording is [PENDING D'LIFE CONFIRMATION]. */}
            <p className="consent">{p.consent}</p>
            <div className="alt">
              <a className="tlink" data-wa={WA.youth} href="#">
                Get updates on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function FaqSection(faq: { label: string; items: Qa[] }) {
  return (
    <>

      {/* Centred column at the client's request, replacing the two-column
          split that put the heading on the left and the questions on the
          right. The "Explore Our FAQ" link is out with it — it pointed back at
          this same section.

          Now the shared <Faq> block —
          the same component serves every page on the site, so a change to the
          accordion is made once. Markup and styling are the approved ones. */}
      {/* No route-out link, per the client's 2026-08 amendments: the FAQ ends
          on its last answer and the page moves to the closing frame. */}
      <Faq items={faq.items} label={faq.label} more={null} />
    </>
  );
}

export function CloseSection(props: Partial<typeof CLOSE_DEFAULTS>) {
  const p = { ...CLOSE_DEFAULTS, ...props };
  return (
    <>
      {/* The page closes on a photograph behind the type: scrim heaviest at the
          top, releasing downward so closing and footer don't read as one dark
          mass. `parallax` is load-bearing: .prlx keeps this plate out of the
          generic `.ph img` settle pass. The tagline matches the brand lockup
          ("It begins with you."), per L11 / V3-05. */}
      <section id="close" className="dark">
        <div className="bg ph">
          <Plate photo={{ src: asset(p.photo), alt: p.photoAlt }} parallax />
        </div>
        <div className="fg">
          <span className="lb rv">{p.eyebrow}</span>
          <h2 className="rv">
            <Rich text={p.heading} />
          </h2>
          <div className="sub rv">{p.sub}</div>
          <div className="acts rv">
            <a className="pill" data-wa={WA.conversation} href="#">
              <span>{p.primaryCta}</span>
            </a>
            <a className="pill ghost" href="#path">
              <span>{p.secondaryCta}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/** Block type → component. The keys are the block types in the manifest. */
export const HOME_SECTIONS = {
  Hero: HeroSection,
  Path: PathSection,
  Trust: TrustSection,
  Needs: NeedsSection,
  Policy: PolicySection,
  Founder: FounderSection,
  Stories: StoriesSection,
  Careers: CareersSection,
  Dva: DvaSection,
  Youth: YouthSection,
  Faq: FaqSection,
  Close: CloseSection,
} as const;

export const HOME_ORDER = ["Hero", "Path", "Trust", "Needs", "Policy", "Founder", "Stories", "Careers", "Dva", "Youth", "Faq", "Close"] as const;
