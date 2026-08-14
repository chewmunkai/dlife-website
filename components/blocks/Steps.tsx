import type { ReactNode } from "react";
import { asset, link } from "../../lib/asset";

/**
 * BLOCK: numbered steps.
 *
 * Used for "what happens next" sequences — the four-beat structure the guide
 * asks every client-facing path to contain (recognise, explain, prove, act),
 * and the review process on the existing-policy page.
 *
 * Numbers are ordinals, not achievements: they set expectations about how long
 * something takes and what it involves, which is the opposite of urgency.
 */
export function Steps({ items }: { items: ReadonlyArray<{ title: string; copy: ReactNode }> }) {
  return (
    <ol className="dl-steps">
      {items.map((s, i) => (
        <li className="rv" key={s.title}>
          <span className="dl-steps__no">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>{s.title}</h3>
            <p>{s.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * BLOCK: story-led split.
 *
 * The layout mode the visual system names for founder, policy guidance and
 * career narratives: a photograph on one side, an argument on the other.
 * `flip` puts the picture on the right.
 */
export function SplitStory({
  label,
  title,
  children,
  photo,
  flip = false,
  tone = "light",
  id,
  actions,
}: {
  label?: string;
  title: ReactNode;
  children: ReactNode;
  photo: { src: string; alt: string };
  flip?: boolean;
  tone?: "light" | "sand" | "dark";
  id?: string;
  actions?: ReactNode;
}) {
  const mode = tone === "sand" ? " sand" : tone === "dark" ? " dark" : "";
  return (
    <section id={id} className={`dl-band dl-split${flip ? " dl-split--flip" : ""}${mode}`}>
      <div className="dl-split__ph ph rv">
        {/* Over-scanned wrapper so the scroll engine's plate parallax has room
            to travel without exposing an edge. */}
        <div className="prlx">
          <img src={asset(photo.src)} alt={photo.alt} loading="lazy" decoding="async" />
        </div>
      </div>
      <div className="dl-split__body">
        {label && <span className="lb rv">{label}</span>}
        <h2 className="rv">{title}</h2>
        <div className="dl-prose rv">{children}</div>
        {actions && <div className="dl-actions rv">{actions}</div>}
      </div>
    </section>
  );
}

/**
 * BLOCK: two-column contrast.
 *
 * A "what this is / what this is not" pair. The existing-policy page and the
 * careers page both need to draw a boundary explicitly, and setting the two
 * lists side by side does it without a paragraph of disclaimer.
 */
export function Contrast({
  left,
  right,
}: {
  left: { heading: string; items: ReadonlyArray<string> };
  right: { heading: string; items: ReadonlyArray<string> };
}) {
  return (
    <div className="dl-contrast rv">
      <div className="dl-contrast__col dl-contrast__col--yes">
        <h3>{left.heading}</h3>
        <ul>
          {left.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
      <div className="dl-contrast__col dl-contrast__col--no">
        <h3>{right.heading}</h3>
        <ul>
          {right.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * BLOCK: quiet inline link row.
 *
 * A row of onward routes set inside a band, for cross-links that belong mid-page
 * rather than in the closing "related content" block.
 */
export function LinkRow({ links }: { links: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <div className="dl-linkrow rv">
      {links.map((l) => (
        <a className="tlink" href={link(l.href)} key={l.href}>
          {l.label} <em aria-hidden="true">→</em>
        </a>
      ))}
    </div>
  );
}
