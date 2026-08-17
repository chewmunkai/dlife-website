import type { ReactNode } from "react";
import { asset, link } from "../../lib/asset";
import { trail, type Route } from "../../lib/routes";
import { Icon, type IconKey } from "./icons";

/* ============================================================
   Block library for the new design.

   The same modules as components/blocks/E2.tsx, but emitting the design
   project's own unprefixed class names (.hero, .bar, .band, .split-shot,
   .rail, .said, .closing …) rather than the repo's `e2-` prefixed ones.

   That prefix is the whole difference between the two files. The `e2-` rules
   live in styles/pages.css nested under `.dlife`; these live in
   styles/ds/pages.css unscoped, straight from the design project. Keeping the
   two separate is what lets both designs render in one build — see
   components/v2/Shell.tsx.

   Nothing here holds copy. Everything is passed in.
   ============================================================ */

export type Tone = "light" | "sand" | "dark" | "ink";
export type Photo = { src: string; alt: string; position?: string };

/** `ink` is a second dark, so a dark page can modulate without a third colour. */
export const mode = (tone: Tone = "light") => (tone === "ink" ? "dark ink" : tone);

const Img = ({ photo }: { photo: Photo }) => (
  <img
    src={asset(photo.src)}
    alt={photo.alt}
    style={photo.position ? { objectPosition: photo.position } : undefined}
  />
);

/** Orientation, not navigation: quiet, and above the label rather than beside it. */
export function Crumbs({ route }: { route: Route }) {
  const path = trail(route);
  return (
    <nav className="dl-crumbs" aria-label="Breadcrumb">
      <ol>
        {path.map((r, i) =>
          i === path.length - 1 ? (
            <li key={r.path}>
              <span aria-current="page">{r.label}</span>
            </li>
          ) : (
            <li key={r.path}>
              <a href={link(r.path)}>{r.label}</a>
              <em>/</em>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

/**
 * Page hero: the photograph bleeds off the edge and the copy panel cuts into
 * it. Omit `photo` for the flat variant, which the legal pages use — their
 * subject is not something a photograph could carry honestly.
 */
export function Hero({
  route,
  label,
  title,
  lede,
  photo,
  actions,
  tone = "dark",
  panel = "light",
}: {
  route: Route;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  photo?: Photo;
  actions?: ReactNode;
  tone?: Tone;
  panel?: "light" | "green";
}) {
  return (
    <section className={`hero ${photo ? "" : "hero--noart "}${mode(tone)}`}>
      {photo && (
        <div className="art ph">
          <Img photo={photo} />
        </div>
      )}
      <div className={`card ${panel === "green" ? "card--green dark" : "light"}`}>
        <Crumbs route={route} />
        <p className="lbl">{label}</p>
        <h1>{title}</h1>
        {lede && <p className="dl-lede">{lede}</p>}
        {actions && <div className="dl-actions">{actions}</div>}
      </div>
    </section>
  );
}

/** Sticky intent bar: what a visitor wants settled before committing. */
export function Bar({ facts, statement, action }: { facts: string[]; statement: string; action?: ReactNode }) {
  return (
    <div className="bar">
      <div className="facts">
        {facts.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
      <strong>{statement}</strong>
      {action}
    </div>
  );
}

export function Band({
  tone = "light",
  label,
  title,
  lede,
  read = false,
  children,
}: {
  tone?: Tone;
  label?: string;
  title?: ReactNode;
  lede?: ReactNode;
  read?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={`band ${mode(tone)}${read ? " band--read" : ""}`}>
      {label && <p className="lbl">{label}</p>}
      {title && <h2>{title}</h2>}
      {lede && <p className="dl-lede">{lede}</p>}
      {children}
    </section>
  );
}

/** Editorial opening: one large Lora line, prose beside it. */
export function Open({ lead, children }: { lead: ReactNode; children: ReactNode }) {
  return (
    <div className="open">
      <p className="lead">{lead}</p>
      <div className="dl-prose">{children}</div>
    </div>
  );
}

/* ---- August 2026 amendment blocks. Styles in styles/amendments.css. ---- */

/**
 * The opening rebuilt as the page's typographic moment: first sentence at
 * display scale, the remainder as a Lora subline on a copper rule, prose
 * offset right. Splitting at the first full stop is what turns a written
 * lead into a composed one, and a one-sentence lead simply skips the subline.
 */
export function OpenStatement({ kick, lead, children }: { kick: string; lead: string; children: ReactNode }) {
  const cut = lead.indexOf(". ");
  const head = cut === -1 ? lead : lead.slice(0, cut + 1);
  const rest = cut === -1 ? null : lead.slice(cut + 2);
  return (
    <div className={`dl-open2${rest ? "" : " one"}`}>
      <div className="head">
        <span className="kick">{kick}</span>
        <h2 className="say">{head}</h2>
      </div>
      {/* The subline lives inside the right column, not beside it: as a third
          grid child it wrapped onto a second row and dragged the prose back
          under the statement. */}
      <div className="side dl-prose">
        {rest && <p className="say-rest">{rest}</p>}
        {children}
      </div>
    </div>
  );
}

/**
 * The prompting situations as image-topped cards, three to a row.
 *
 * The photograph gives the visitor something to picture beside a sentence
 * about their own life. It rests desaturated and comes to full colour on
 * hover, with the corner arrow turning — the same gesture as the reference
 * the client supplied, done in CSS so no motion library ships and
 * `prefers-reduced-motion` is honoured (styles/amendments.css §2).
 */
export function Moments({
  title,
  items,
  photos,
  tone = "light",
}: {
  title: ReactNode;
  items: ReadonlyArray<ReactNode>;
  photos?: ReadonlyArray<Photo>;
  tone?: Tone;
}) {
  return (
    <section className={`band moments ${mode(tone)}`}>
      <h2>{title}</h2>
      <div className="rows">
        {items.map((item, i) => {
          const photo = photos?.[i];
          return (
            <article className="mcard" key={i}>
              {photo && (
                <div className="shot">
                  <Img photo={photo} />
                </div>
              )}
              <div className="body">
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{item}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/**
 * The definitions as rounded tinted cards: ordinal, geometric icon, term,
 * one plain-language sentence. Structure follows the reference the client
 * supplied; the tints are brand washes rather than the reference's purple /
 * green / red, and the icons are the system's own outline set.
 */
export function Ideas({
  label,
  title,
  lede,
  items,
  icons,
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  items: ReadonlyArray<{ term: string; copy: ReactNode }>;
  icons?: ReadonlyArray<IconKey>;
}) {
  return (
    <section className="band light ideas">
      {label && <p className="lbl">{label}</p>}
      <h2>{title}</h2>
      {lede && <p className="dl-lede">{lede}</p>}
      <div className="pane">
        {items.map((d, i) => (
          <article className="icard" key={d.term}>
            <span className="no">{String(i + 1).padStart(2, "0")}</span>
            {icons?.[i] && <Icon name={icons[i]} />}
            <div className="foot">
              <h3>{d.term}</h3>
              <p>{d.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/** The steps carried on a contained ink panel — the band's dark room. */
export function StepsPanel({
  label,
  title,
  lede,
  steps,
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  steps: ReadonlyArray<{ title: string; copy: ReactNode }>;
}) {
  return (
    <section className="band sand">
      {label && <p className="lbl">{label}</p>}
      <h2>{title}</h2>
      {lede && <p className="dl-lede">{lede}</p>}
      <div className="steps-panel">
        {steps.map((s, i) => (
          <div key={s.title}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <h3>{s.title}</h3>
            <p>{s.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * The next step as a single premium object: the photograph is the card's own
 * ground, held under a layered scrim so the image reads at the right while
 * the type keeps its contrast at the left.
 */
export const CLOSING_PHOTO: Photo = {
  /* One photograph on every next-step card site-wide, at the client's
     direction: a family at a table, warm, no single subject to date it. The
     card is a repeated moment in the journey, so a repeated image makes it
     recognisable rather than repetitive. */
  src: "/media/img/hero.jpg",
  alt: "A family sharing a meal at home",
  position: "50% 42%",
};

export function ClosingCard({
  label = "Next step",
  title,
  lede,
  actions,
  photo = CLOSING_PHOTO,
  note = "Most conversations with us don’t end in a decision, and that’s completely fine.",
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  actions: ReactNode;
  photo?: Photo;
  note?: string;
}) {
  return (
    <section className="band light close-host">
      {/* `dark` flips the section tokens so the ghost pill's outline and the
          selection colours resolve against ink; the card's own background
          then wins over the mode's. */}
      <div className="close-card dark">
        {photo && <Img photo={photo} />}
        <p className="lbl">{label}</p>
        <h2>{title}</h2>
        {lede && <p className="dl-lede">{lede}</p>}
        <div className="dl-actions">{actions}</div>
        {note && <p className="note">{note}</p>}
      </div>
    </section>
  );
}

/** Offset photograph pair. One photo renders the wide `--one` variant. */
export function Duo({ a, b }: { a: Photo & { caption?: string }; b?: Photo & { caption?: string } }) {
  return (
    <div className={`duo${b ? "" : " duo--one"}`}>
      <figure>
        <div className="a ph">
          <Img photo={a} />
        </div>
        {a.caption && <figcaption>{a.caption}</figcaption>}
      </figure>
      {b && (
        <figure>
          <div className="b ph">
            <Img photo={b} />
          </div>
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      )}
    </div>
  );
}

/** Half-page photograph beside content. */
export function SplitShot({
  photo,
  label,
  title,
  flip = false,
  tone = "dark",
  className,
  id,
  children,
}: {
  photo: Photo;
  label?: string;
  title?: ReactNode;
  flip?: boolean;
  tone?: Tone;
  /** Extra classes, e.g. `lift-host` when a `.lift` panel overlaps this band
   *  from below and needs the extra bottom padding to land in. */
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`split-shot ${mode(tone)}${flip ? " split-shot--flip" : ""}${className ? ` ${className}` : ""}`}
    >
      <div className="shot ph">
        <Img photo={photo} />
      </div>
      <div className="body">
        {label && <p className="lbl">{label}</p>}
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  );
}

/**
 * Numbered, hairlined ledger rows.
 *
 * `.checks` is a two-column grid whose children are the `<ul>`s, not the
 * `<li>`s — so a two-column ledger has to be split into two lists or it
 * renders as one column beside an empty one. Numbering runs continuously
 * across the split, as the design does: 01–04 then 05–08.
 */
export function Checks({ items, columns = 2 }: { items: ReadonlyArray<ReactNode>; columns?: 1 | 2 }) {
  const lists =
    columns === 1 ? [items] : [items.slice(0, Math.ceil(items.length / 2)), items.slice(Math.ceil(items.length / 2))];

  let n = 0;
  return (
    <div className={`checks${columns === 1 ? " checks--1" : ""}`}>
      {lists.map((list, li) => (
        <ul key={li}>
          {list.map((item, i) => {
            n += 1;
            return (
              <li key={i}>
                <b>{String(n).padStart(2, "0")}</b>
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}

/** Steps as a timeline on a copper line. */
export function Rail({ steps }: { steps: ReadonlyArray<{ title: string; copy: ReactNode }> }) {
  return (
    <div className={`rail${steps.length === 3 ? " rail--3" : ""}`}>
      {steps.map((s, i) => (
        <div key={s.title}>
          <b>{String(i + 1).padStart(2, "0")}</b>
          <h3>{s.title}</h3>
          <p>{s.copy}</p>
        </div>
      ))}
    </div>
  );
}

/** Quotation carried on a photograph. Without one, the plain variant. */
export function Said({ photo, quote, cite }: { photo?: Photo; quote: ReactNode; cite: string }) {
  return (
    <section className={photo ? "said ph" : "said said--plain"}>
      {photo && <Img photo={photo} />}
      <figure>
        <div className="r" />
        <blockquote>{quote}</blockquote>
        <figcaption>{cite}</figcaption>
      </figure>
    </section>
  );
}

/** Closing CTA: a panel laid over a photograph. */
export function Closing({
  photo,
  label = "Next step",
  title,
  lede,
  actions,
  note = "Most conversations with us don’t end in a decision, and that’s completely fine.",
  ground,
}: {
  photo: Photo;
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  actions: ReactNode;
  note?: string;
  ground?: string;
}) {
  return (
    <section className="closing" style={ground ? { background: ground } : undefined}>
      <div className="shot ph">
        <Img photo={photo} />
      </div>
      <div className="panel dark">
        <p className="lbl">{label}</p>
        <h2>{title}</h2>
        {lede && <p className="dl-lede">{lede}</p>}
        <div className="dl-actions">{actions}</div>
        {note && <p className="note">{note}</p>}
      </div>
    </section>
  );
}

/** Definition rows. */
export function Defs({ items }: { items: ReadonlyArray<{ term: string; copy: ReactNode }> }) {
  return (
    <dl className="dl-defs">
      {items.map((d) => (
        <div key={d.term}>
          <dt>{d.term}</dt>
          <dd>{d.copy}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Editorial cards. pages.css overrides the design system's filled card into
 *  a hairline-ruled one, so no variant is needed here. */
export function Cards({
  items,
  columns = 3,
  media = false,
}: {
  items: ReadonlyArray<{
    title: string;
    copy: ReactNode;
    href: string;
    cta?: string;
    photo?: Photo;
    /** Small tracked label above the title. */
    kicker?: string;
  }>;
  columns?: 2 | 3 | 4;
  /** Cards that carry a plate. The plate is the frame, so these drop the
   *  hairline rule the text-only card uses. */
  media?: boolean;
}) {
  return (
    <div
      className={`dl-cards dl-cards--${columns}${media ? " dl-cards--media" : ""}`}
      style={{ marginTop: "clamp(28px,4vh,46px)" }}
    >
      {items.map((c) => (
        <article className="dl-card" key={c.href}>
          {c.photo && (
            <div className="dl-card__ph ph">
              <Img photo={c.photo} />
            </div>
          )}
          <div className="dl-card__body">
            {c.kicker && <span className="dl-card__no">{c.kicker}</span>}
            <h3>{c.title}</h3>
            <p>{c.copy}</p>
            <a className="dl-card__go tlink" href={link(c.href)}>
              {c.cta ?? "Read"} <em aria-hidden="true">→</em>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
