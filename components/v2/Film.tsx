"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   Inline film player.

   The direction guide requires films to play inside the site, with audio,
   rather than bouncing a visitor out to social. So the poster is a button
   that swaps itself for a real <video> on click; nothing is embedded until
   someone asks for it, which keeps 12MB of MP4 off the initial load.

   The design bundle could not carry the MP4s, so its markup shows a poster
   and a note saying where the film lands. This build has the files, so the
   note is gone and the control actually plays.

   A11 (client, 31 Aug 2026): two films could talk over each other. Every card
   mounts its own player on click, so starting a second one left the first
   audible — and once the films sit in a scrolling rail, the one still talking
   can be a card nobody can see. Two rules now hold, both on the element's own
   events rather than on React state, so they are true even when the browser
   pauses a video by itself:

     · one at a time — starting a film pauses every other on the page
     · nothing plays out of sight — a film that scrolls away pauses itself,
       and does not resume on its own when it comes back
   ============================================================ */

const Play = ({ size = 20 }: { size?: number }) => (
  <span className="play" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  </span>
);

export function Film({
  src,
  poster,
  focus,
  title,
  runtime,
  className = "art ph film",
  id,
  playSize = 26,
  runtimeLabel,
}: {
  src: string;
  poster: string;
  focus?: string;
  title: string;
  runtime: string;
  className?: string;
  id?: string;
  playSize?: number;
  /** `Film · 3:48` in the hero, a bare runtime on a card. */
  runtimeLabel?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  /* Pause anything else that is talking. Scoped to real <video> elements on
     the page rather than to a registry, so it also catches the homepage reel
     and anything added later without either side knowing about the other. */
  const soloise = () => {
    const mine = video.current;
    document.querySelectorAll("video").forEach((other) => {
      if (other !== mine && !other.paused) other.pause();
    });
  };

  /* Out of sight, out of earshot. 25% is deliberately low: a card half out of
     a rail is still being watched, a card at the very edge is not. */
  useEffect(() => {
    const el = video.current;
    if (!el || !playing || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !el.paused) el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [playing]);

  return (
    <button
      type="button"
      id={id}
      className={playing ? `${className} is-playing` : className}
      aria-label={playing ? title : `Play film: ${title}`}
      onClick={() => setPlaying(true)}
    >
      {playing ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption -- subtitles are burned into the source
        <video
          ref={video}
          src={src}
          controls
          autoPlay
          playsInline
          onPlay={soloise}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <>
          <img src={poster} alt="" style={focus ? { objectPosition: focus } : undefined} />
          <Play size={playSize} />
          <span className={className.includes("dl-video__ph") ? "dl-video__run" : "run"}>
            {runtimeLabel ?? runtime}
          </span>
        </>
      )}
    </button>
  );
}

export default Film;
