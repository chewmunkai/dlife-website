"use client";

import { useState } from "react";

/* ============================================================
   Inline film player.

   The direction guide requires films to play inside the site, with audio,
   rather than bouncing a visitor out to social. So the poster is a button
   that swaps itself for a real <video> on click; nothing is embedded until
   someone asks for it, which keeps 12MB of MP4 off the initial load.

   The design bundle could not carry the MP4s, so its markup shows a poster
   and a note saying where the film lands. This build has the files, so the
   note is gone and the control actually plays.
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
        <video src={src} controls autoPlay playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
