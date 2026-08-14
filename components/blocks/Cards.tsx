import type { ReactNode } from "react";
import { asset, link } from "../../lib/asset";

/**
 * BLOCK: feature card grid.
 *
 * The general-purpose card surface: warm neutral, restrained border, modest
 * rounding, short copy. Cards with an `href` become one target via a stretched
 * link rather than an anchor wrapping the whole card, which keeps any nested
 * link (a credit, a secondary action) separately clickable and the HTML valid.
 */
export type Card = {
  title: string;
  copy: ReactNode;
  href?: string;
  /** Link text. Only rendered when `href` is set. */
  cta?: string;
  photo?: { src: string; alt: string };
  /** Small ordinal shown above the title — "01", "02"… */
  index?: string;
};

export function CardGrid({
  cards,
  columns = 3,
  media = false,
}: {
  cards: ReadonlyArray<Card>;
  columns?: 2 | 3 | 4;
  /** True when the cards carry photography and should size for it. */
  media?: boolean;
}) {
  return (
    <div className={`dl-cards dl-cards--${columns}${media ? " dl-cards--media" : ""}`}>
      {cards.map((c) => (
        <article className="dl-card rv" key={c.title}>
          {c.photo && (
            <div className="dl-card__ph ph">
              <img src={asset(c.photo.src)} alt={c.photo.alt} loading="lazy" decoding="async" />
            </div>
          )}
          <div className="dl-card__body">
            {c.index && <span className="dl-card__no">{c.index}</span>}
            <h3>{c.title}</h3>
            <p>{c.copy}</p>
            {c.href && (
              <a className="dl-card__go tlink" href={link(c.href)}>
                {c.cta ?? "Read more"} <em aria-hidden="true">→</em>
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

/**
 * BLOCK: story card.
 *
 * An advisor or community story. Distinct from the video card: a story card
 * leads to a page, a video card plays in place.
 */
export function StoryCard({
  title,
  copy,
  href,
  photo,
  kicker,
}: {
  title: string;
  copy: ReactNode;
  href: string;
  photo: { src: string; alt: string };
  kicker?: string;
}) {
  return (
    <article className="dl-storycard rv">
      <div className="dl-storycard__ph ph">
        <img src={asset(photo.src)} alt={photo.alt} loading="lazy" decoding="async" />
      </div>
      {kicker && <span className="dl-storycard__kicker">{kicker}</span>}
      <h3>{title}</h3>
      <p>{copy}</p>
      <a className="dl-storycard__go tlink" href={link(href)}>
        Read the story <em aria-hidden="true">→</em>
      </a>
    </article>
  );
}

/**
 * BLOCK: event card.
 *
 * Community and Youth events. `when` and `where` are plain strings rather than
 * dates, because the source material is a programme list rather than a
 * calendar — see the ⚠️ note on the Youth Community page.
 */
export function EventCard({
  title,
  copy,
  when,
  where,
  cta,
}: {
  title: string;
  copy: ReactNode;
  when: string;
  where: string;
  cta?: { label: string; wa: string };
}) {
  return (
    <article className="dl-event rv">
      <div className="dl-event__meta">
        <span className="dl-event__when">{when}</span>
        <span className="dl-event__where">{where}</span>
      </div>
      <h3>{title}</h3>
      <p>{copy}</p>
      {cta && (
        <a className="tlink" data-wa={cta.wa} href="#">
          {cta.label} <em aria-hidden="true">→</em>
        </a>
      )}
    </article>
  );
}

/**
 * BLOCK: portrait slot.
 *
 * A clearly marked empty frame, for the photography the brief lists as a
 * blocking question. "Warm-toned placeholder blocks, clearly marked" until the
 * shoot lands — a founder's face is the last thing to fill with a stock image
 * or a video still.
 *
 * Pass `photo` once the real portrait exists and the slot renders it instead;
 * no call site has to change.
 */
export function Portrait({
  name,
  role,
  photo,
}: {
  name: string;
  role: string;
  photo?: { src: string; alt: string };
}) {
  return (
    <div className="dl-portrait ph rv">
      {photo ? (
        <img src={asset(photo.src)} alt={photo.alt} loading="lazy" decoding="async" />
      ) : (
        <div className="slot-empty">
          {name}
          <em>{role}</em>
        </div>
      )}
    </div>
  );
}

/**
 * BLOCK: stat band.
 *
 * Quiet proof. Understatement reads as confidence, so figures are set at the
 * same weight as the label beside them rather than blown up.
 *
 * ⚠️ Every figure passed in here is pending client verification.
 */
export function StatBand({ items }: { items: ReadonlyArray<{ figure: string; label: string }> }) {
  return (
    <div className="dl-stats rv">
      {items.map((s) => (
        <div key={s.label}>
          <b>{s.figure}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
