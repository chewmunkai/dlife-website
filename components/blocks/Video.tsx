"use client";

import { useState } from "react";
import { ROUTES } from "../../lib/routes";
import { link } from "../../lib/asset";
import type { Video } from "../../content/videos";

/**
 * BLOCK: video card.
 *
 * Playback happens inside the card — never in a lightbox, never on YouTube.
 * The guide's non-negotiable: "important videos are fully playable and audible
 * within the D'Life website experience" and "visitors do not need to leave for
 * social media to complete the main story."
 *
 * Controls are the browser's own once playing, so audio, scrubbing, captions
 * and fullscreen all work without a custom player to maintain.
 */
export function VideoCard({ video, playing, onPlay, onEnded }: {
  video: Video;
  playing: boolean;
  onPlay: () => void;
  onEnded: () => void;
}) {
  return (
    <article className="dl-video rv">
      {playing ? (
        <div className="dl-video__ph ph is-playing">
          <video
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            onEnded={onEnded}
          />
        </div>
      ) : (
        <button type="button" className="dl-video__ph ph" aria-label={`Play video: ${video.title}`} onClick={onPlay}>
          <img src={video.poster} alt="" loading="lazy" decoding="async" style={{ objectPosition: video.focus }} />
          <span className="play" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
          <span className="dl-video__run">{video.runtime}</span>
        </button>
      )}
      <span className="dl-video__cat">{video.category}</span>
      <h3>{video.title}</h3>
      <p>{video.blurb}</p>
      {/* The contextual next action the connected-content rule requires: a
          finished story hands the viewer somewhere, rather than ending. */}
      <a className="tlink" href={link(ROUTES[video.next].path)}>
        {ROUTES[video.next].label} <em aria-hidden="true">→</em>
      </a>
    </article>
  );
}

/**
 * BLOCK: selected videos.
 *
 * A grid of video cards that manages which one is playing, so starting a
 * second story stops the first rather than leaving two audio tracks running.
 */
export default function SelectedVideos({
  videos,
  label = "Featured videos",
  title = "Real people, in their own words",
  lede,
  tone = "dark",
  id = "videos",
}: {
  videos: ReadonlyArray<Video>;
  label?: string;
  title?: string;
  lede?: string;
  tone?: "light" | "sand" | "dark";
  id?: string;
}) {
  const [playing, setPlaying] = useState<string | null>(null);
  const mode = tone === "sand" ? " sand" : tone === "dark" ? " dark" : "";

  return (
    <section id={id} className={`dl-band dl-band--wide dl-videos${mode}`}>
      <header className="dl-band__head">
        <span className="lb rv">{label}</span>
        <h2 className="rv">{title}</h2>
        {lede && <p className="dl-lede rv">{lede}</p>}
      </header>
      <div className="dl-videos__grid">
        {videos.map((v) => (
          <VideoCard
            key={v.src}
            video={v}
            playing={playing === v.src}
            onPlay={() => setPlaying(v.src)}
            onEnded={() => setPlaying(null)}
          />
        ))}
      </div>
    </section>
  );
}
