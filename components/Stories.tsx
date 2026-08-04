"use client";

import "../styles/dlife.css";
import { useState } from "react";
import { VIDEOS } from "./DLife";

/**
 * The "View all stories" destination. The featured strip on the homepage caps
 * at the three to five the correction report allows; this is where the rest
 * live once more are published.
 *
 * Playback follows the same rule as the homepage — inside the card, never in a
 * lightbox — so a visitor finishes a story without leaving D'Life.
 */
export default function Stories() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="dlife">
      <main id="allstories">
        <div className="head">
          <span className="lb">Advisor stories</span>
          <h1>Meet the people behind D’Life</h1>
          <p>
            Real advisors, in their own words. What the work actually looks like, and who it is for.
          </p>
          <a className="tlink" href="/">
            Back to the homepage
          </a>
        </div>

        <div className="grid">
          {VIDEOS.map((v) => (
            <div className="story" key={v.title}>
              {playing === v.src ? (
                <div className="ph playing">
                  <video
                    src={v.src}
                    poster={v.poster}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    onEnded={() => setPlaying(null)}
                  />
                </div>
              ) : (
                <button
                  type="button"
                  className="ph"
                  aria-label={`Play video: ${v.title}`}
                  onClick={() => setPlaying(v.src)}
                >
                  <img src={v.poster} alt="" loading="lazy" decoding="async" />
                  <span className="play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5.5v13l11-6.5z" />
                    </svg>
                  </span>
                </button>
              )}
              <h3>{v.title}</h3>
              <span className="run">{v.runtime}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
