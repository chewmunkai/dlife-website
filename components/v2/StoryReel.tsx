"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Video } from "../../content/videos";

/* ============================================================
   The story reel (L07).

   The homepage's pattern, rebuilt for the new design's chrome: one film in the
   centre at full size, its neighbours held either side as posters, and the
   controls underneath. The homepage version lives inside components/DLife.tsx
   against `.dlife`-scoped CSS and cannot be shared; this is the same
   behaviour in this layer's own classes.

   Built for a library rather than for three films. The client has three today
   and asked for 3–5 now and 10+ later, so:

     · nothing is hardcoded to a count — it renders whatever content/videos.ts
       holds, and the array is the only thing that changes
     · only a three-card window is ever in the DOM (previous, playing, next).
       Twelve posters side by side is not a reel, it is a contact sheet
     · the position readout switches from dots to "03 / 12" past six films,
       because eleven dots stop being a control and become a texture

   Simultaneous playback is structurally impossible: exactly one <video> is
   mounted at a time, the outgoing one is paused before it unmounts, and
   anything else playing on the page is paused when this one starts.

   Playback state is read off the element's own events rather than set where a
   button was clicked, so the controls stay honest when the browser refuses
   autoplay, pauses a hidden tab, or the OS takes the audio session.

   Under prefers-reduced-motion nothing starts on its own. A film that begins
   playing because a visitor scrolled past it is motion they did not ask for.
   ============================================================ */

const Ico = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PREV = "M15 5l-7 7 7 7";
const NEXT = "M9 5l7 7-7 7";

export default function StoryReel({ items }: { items: ReadonlyArray<Video> }) {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);
  /** False until the section has been seen; nothing plays before that. */
  const [armed, setArmed] = useState(false);
  const [reduced, setReduced] = useState(false);

  const section = useRef<HTMLElement>(null);
  const player = useRef<HTMLVideoElement>(null);

  const count = items.length;
  const at = (i: number) => (i + count) % count;

  useEffect(() => {
    const q = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!q) return;
    setReduced(q.matches);
    const on = () => setReduced(q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);

  /* Arm when the reel is genuinely on screen. IntersectionObserver rather than
     the homepage's rect check, because this section is shorter than a viewport
     and a threshold actually resolves here. */
  useEffect(() => {
    const el = section.current;
    if (!el || armed || reduced || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armed, reduced]);

  /* The element is the source of truth for both states. */
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
    if (!v || !armed || reduced) return;
    v.muted = muted;
    v.play().catch(() => setArmed(false));
    // `muted` deliberately absent: muting should not restart a paused film.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armed, active, reduced]);

  const go = useCallback(
    (i: number) => {
      /* Stop the outgoing film before React unmounts it, so no audio overlaps
         the incoming card even by a frame. */
      player.current?.pause();
      setActive(at(i));
      setPaused(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count],
  );

  const togglePlay = () => {
    const v = player.current;
    if (!v) return setArmed(true);
    if (v.paused) v.play().catch(() => undefined);
    else v.pause();
  };

  const toggleSound = () => {
    const v = player.current;
    if (v) v.muted = !v.muted;
    else setMuted((m) => !m);
  };

  /* Previous, playing, next. At two films the window is two; at one it is the
     film alone, and the controls below hide themselves. */
  const window_ =
    count <= 1 ? [0] : count === 2 ? [active, at(active + 1)] : [at(active - 1), active, at(active + 1)];

  const current = items[active];

  return (
    <section className="band light sreel" id="films" ref={section}>
      <p className="lbl">Watch</p>
      <h2>In their own words</h2>
      <p className="dl-lede">Each film plays here, with sound. You will not be sent anywhere else to finish one.</p>

      <div className="sreel__reel">
        {window_.map((i) => {
          const v = items[i];
          const on = i === active;
          return (
            <article className={on ? "sreel__card is-on" : "sreel__card"} key={v.src}>
              <div className="sreel__ph">
                {on && armed ? (
                  <>
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption -- subtitles are burned into the source */}
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
                    {/* The sound control sits in the film's top-left corner —
                        the one corner the native controls never use, so it
                        cannot land on the scrubber once sound is on. */}
                    <button
                      type="button"
                      className={muted ? "sreel__sound" : "sreel__sound is-quiet"}
                      aria-pressed={!muted}
                      aria-label={muted ? `Unmute: ${v.title}` : `Mute: ${v.title}`}
                      onClick={toggleSound}
                    >
                      {muted && <span className="sreel__dot" aria-hidden="true" />}
                      <span>{muted ? "Muted. Tap for sound" : "Sound on"}</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="sreel__pick"
                    aria-label={on ? `Play film: ${v.title}` : `Show film: ${v.title}`}
                    onClick={() => (on ? setArmed(true) : go(i))}
                  >
                    <img
                      src={v.poster}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: v.focus }}
                    />
                    <span className="sreel__play" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                        <path d="M8 5.5v13l11-6.5z" />
                      </svg>
                    </span>
                    <span className="sreel__run">{v.runtime}</span>
                  </button>
                )}
              </div>
              <h3>{v.title}</h3>
              <p>{v.blurb}</p>
            </article>
          );
        })}
      </div>

      {count > 1 && (
        <div className="sreel__ctl">
          <button type="button" className="sreel__btn" aria-label="Previous story" onClick={() => go(active - 1)}>
            <Ico d={PREV} />
          </button>
          <button
            type="button"
            className="sreel__btn"
            aria-label={paused || !armed ? `Play film: ${current.title}` : `Pause film: ${current.title}`}
            onClick={togglePlay}
          >
            {paused || !armed ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            )}
          </button>

          {/* Dots stop being a control past six and become a texture. */}
          {count <= 6 ? (
            <div className="sreel__dots">
              {items.map((v, i) => (
                <button
                  type="button"
                  key={v.src}
                  className={i === active ? "is-on" : undefined}
                  aria-label={`Show story ${i + 1} of ${count}: ${v.title}`}
                  aria-current={i === active}
                  onClick={() => go(i)}
                />
              ))}
            </div>
          ) : (
            <p className="sreel__count" aria-live="polite">
              <b>{String(active + 1).padStart(2, "0")}</b> / {String(count).padStart(2, "0")}
            </p>
          )}

          <button type="button" className="sreel__btn" aria-label="Next story" onClick={() => go(active + 1)}>
            <Ico d={NEXT} />
          </button>
        </div>
      )}
    </section>
  );
}
