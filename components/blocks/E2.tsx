import type { ReactNode } from "react";
import type { Route } from "../../lib/routes";
import Breadcrumbs from "../site/Breadcrumbs";
import { asset } from "../../lib/asset";

/* ============================================================
   Inner-page blocks — direction E2 ("layered depth").

   The React half of styles/pages.css. Each component owns one of the
   patterns the direction introduces, and each is scoped to a single
   `.e2-*` root with no dependence on its siblings, so a section can be
   lifted into an Elementor template on its own — the same contract the
   rest of the block library keeps.

   Tone is a section mode, never a colour: a block reads `--s-*` and
   recolours itself on ivory, sand or deep green with no override.
   ============================================================ */

export type Tone = "light" | "sand" | "dark" | "ink";

/** Section mode as a class suffix. `ink` is the second dark, for a dark page
 *  that has to modulate against another dark band. */
export const mode = (tone: Tone = "light") =>
  tone === "sand" ? " sand" : tone === "dark" ? " dark" : tone === "ink" ? " dark ink" : "";

export type Photo = { src: string; alt: string; position?: string };

const Plate = ({ photo, className, eager }: { photo: Photo; className: string; eager?: boolean }) => (
  <div className={`${className} ph`}>
    <img
      src={asset(photo.src)}
      alt={photo.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={photo.position ? { objectPosition: photo.position } : undefined}
    />
  </div>
);

/* ---------- hero ----------
   The photograph bleeds off the right edge and the copy panel cuts into it.
   `photo` omitted gives the flat variant, for pages whose subject is not
   something a photograph can carry. */
export function E2Hero({
  route,
  label,
  title,
  lede,
  photo,
  actions,
  tone = "dark",
  panel = "cream",
}: {
  route: Route;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  photo?: Photo;
  actions?: ReactNode;
  tone?: Tone;
  /** The copy panel's own ground. `green` is the DVA treatment. */
  panel?: "cream" | "green";
}) {
  return (
    <section className={`e2-hero${photo ? "" : " e2-hero--noart"}${mode(tone)}`} id="page-hero">
      {photo && <Plate photo={photo} className="art" eager />}
      <div className={`card${panel === "green" ? " card--green dark" : " light"}`}>
        <Breadcrumbs route={route} />
        <p className="lbl rv">{label}</p>
        <h1 className="rv">{title}</h1>
        {lede && <p className="dl-lede rv">{lede}</p>}
        {actions && <div className="dl-actions rv">{actions}</div>}
      </div>
    </section>
  );
}

/* ---------- intent bar ----------
   Sticky under the fixed header. Carries the three things a visitor most
   wants to know before committing to a conversation. */
export function E2Bar({ facts, statement, action }: { facts: string[]; statement: string; action?: ReactNode }) {
  return (
    <div className="e2-bar">
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

/* ---------- band ---------- */
export function E2Band({
  id,
  tone = "light",
  read = false,
  label,
  title,
  lede,
  children,
  className = "",
}: {
  id?: string;
  tone?: Tone;
  /** Clamps prose and question rows to a comfortable measure. */
  read?: boolean;
  label?: string;
  title?: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`e2-band${read ? " e2-band--read" : ""}${mode(tone)} ${className}`.trim()}>
      {label && <p className="lbl rv">{label}</p>}
      {title && <h2 className="rv">{title}</h2>}
      {lede && <p className="dl-lede rv">{lede}</p>}
      {children}
    </section>
  );
}

/* ---------- opening: editorial lead beside the prose ---------- */
export function E2Open({ lead, children }: { lead: ReactNode; children: ReactNode }) {
  return (
    <div className="e2-open">
      <p className="lead rv">{lead}</p>
      <div className="dl-prose rv">{children}</div>
    </div>
  );
}

/* ---------- offset photograph pair ----------
   `b` omitted gives the single wide plate the solution pages use. */
export function E2Duo({ a, b }: { a: Photo & { caption?: string }; b?: Photo & { caption?: string } }) {
  return (
    <div className={`e2-duo${b ? "" : " e2-duo--one"} rv`}>
      <figure>
        <Plate photo={a} className="a" />
        {a.caption && <figcaption>{a.caption}</figcaption>}
      </figure>
      {b && (
        <figure>
          <Plate photo={b} className="b" />
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      )}
    </div>
  );
}

/* ---------- half-page photograph beside content ---------- */
export function E2Split({
  photo,
  flip = false,
  tone = "dark",
  label,
  title,
  children,
  id,
}: {
  photo: Photo;
  flip?: boolean;
  tone?: Tone;
  label?: string;
  title?: ReactNode;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={`e2-split${flip ? " e2-split--flip" : ""}${mode(tone)}`}>
      <Plate photo={photo} className="shot" />
      <div className="body">
        {label && <p className="lbl rv">{label}</p>}
        {title && <h2 className="rv">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

/* ---------- count marker ---------- */
export function E2Count({ value, label }: { value: string; label: string }) {
  return (
    <div className="e2-count rv">
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}

/* ---------- ledger rows ----------
   Numbered and hairlined. The design's own numbering is 01, 02, 03 — derived
   here rather than typed, so an inserted item cannot leave a gap. */
export function E2Checks({ items, columns = 2 }: { items: ReadonlyArray<ReactNode>; columns?: 1 | 2 }) {
  return (
    <div className={`e2-checks${columns === 1 ? " e2-checks--1" : ""} rv`}>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- steps as a timeline on a copper line ---------- */
export function E2Rail({ steps }: { steps: ReadonlyArray<{ title: string; copy: ReactNode }> }) {
  return (
    <div className={`e2-rail${steps.length === 3 ? " e2-rail--3" : ""} rv`}>
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

/* ---------- boundary pair as a full-bleed diptych ----------
   What this is, beside what it is not. The pair is the point: either half on
   its own reads as a claim, and together they read as a boundary. */
export function E2Dip({
  intro,
  yes,
  no,
}: {
  intro?: ReactNode;
  yes: { heading: string; items: ReadonlyArray<ReactNode>; tone?: Tone };
  no: { heading: string; items: ReadonlyArray<ReactNode>; tone?: Tone };
}) {
  const col = (c: typeof yes, isNo: boolean) => (
    <div className={`${isNo ? "no" : ""}${mode(c.tone)}`.trim()}>
      <h3>{c.heading}</h3>
      <ul>
        {c.items.map((item, i) => (
          <li key={i}>
            <em aria-hidden="true">{isNo ? "—" : "✓"}</em>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <section className="e2-dip">
      {intro && <div className="intro">{intro}</div>}
      {col(yes, false)}
      {col(no, true)}
    </section>
  );
}

/* ---------- questions as open rows ----------
   No accordion: on a page this short, hiding four answers behind a click
   costs more than the height it saves. */
export function E2Qa({ items }: { items: ReadonlyArray<{ q: string; a: ReactNode }> }) {
  return (
    <div className="e2-qa rv">
      {items.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- quote carried on a photograph ----------
   ⚠️ Every attributed quotation on this site is pending consent. Attributions
   here stay at team level until the client confirms otherwise. */
export function E2Said({
  photo,
  quote,
  cite,
  tone = "light",
}: {
  /** Omitted gives the plain variant — the same quote with no photograph. */
  photo?: Photo;
  quote: ReactNode;
  cite: string;
  tone?: Tone;
}) {
  return (
    <section className={`e2-said${photo ? " ph" : " e2-said--plain"}${photo ? "" : mode(tone)}`}>
      {photo && (
        <img
          src={asset(photo.src)}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          style={photo.position ? { objectPosition: photo.position } : undefined}
        />
      )}
      <figure>
        <div className="r" />
        <blockquote>{quote}</blockquote>
        <figcaption>{cite}</figcaption>
      </figure>
    </section>
  );
}

/* ---------- closing: panel over a photograph ---------- */
export function E2Closing({
  photo,
  label = "Next step",
  title,
  lede,
  actions,
  note = "Most conversations with us don’t end in a decision, and that’s completely fine.",
}: {
  photo: Photo;
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  note?: ReactNode | false;
}) {
  return (
    <section className="e2-closing">
      <Plate photo={photo} className="shot" />
      <div className="panel dark">
        <p className="lbl rv">{label}</p>
        <h2 className="rv">{title}</h2>
        {lede && <p className="dl-lede rv">{lede}</p>}
        {actions && <div className="dl-actions rv">{actions}</div>}
        {note && <p className="note">{note}</p>}
      </div>
    </section>
  );
}

/* ---------- portrait split (founders) ---------- */
export function E2Folk({
  photo,
  slot,
  flip = false,
  children,
}: {
  photo?: Photo;
  /** Marked empty slot, for a portrait that has not been shot yet. Never a
   *  stock photograph standing in for a real person. */
  slot?: { name: string; note: string };
  flip?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`e2-folk${flip ? " e2-folk--flip" : ""} rv`}>
      <div className="plate ph">
        {photo ? (
          <img src={asset(photo.src)} alt={photo.alt} loading="lazy" decoding="async" />
        ) : (
          slot && (
            <span className="slot-empty">
              {slot.name}
              <em>{slot.note}</em>
            </span>
          )
        )}
      </div>
      <div className="dl-prose">{children}</div>
    </div>
  );
}

/* ---------- statement: one large line against supporting prose ---------- */
export function E2Stmt({
  label,
  title,
  children,
  tone = "light",
}: {
  label?: string;
  title: ReactNode;
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <section className={`e2-stmt${mode(tone)}`}>
      <div className="rv">
        {label && <p className="lbl">{label}</p>}
        <h2>{title}</h2>
      </div>
      <div className="dl-prose rv">{children}</div>
    </section>
  );
}

/* ---------- triptych: three panels, hairline seams, no boxes ---------- */
export function E2Trip({
  head,
  items,
  tone = "light",
  numbered = true,
}: {
  head?: { label?: string; title: ReactNode; lede?: ReactNode };
  items: ReadonlyArray<{ title: string; copy: ReactNode }>;
  tone?: Tone;
  numbered?: boolean;
}) {
  return (
    <section className={`e2-trip${mode(tone)}`}>
      {head && (
        <div className="head">
          {head.label && <p className="lbl rv">{head.label}</p>}
          <h2 className="rv">{head.title}</h2>
          {head.lede && <p className="dl-lede rv">{head.lede}</p>}
        </div>
      )}
      {items.map((it, i) => (
        <div key={it.title}>
          {numbered && <b>{String(i + 1).padStart(2, "0")}</b>}
          <h3>{it.title}</h3>
          <p>{it.copy}</p>
        </div>
      ))}
    </section>
  );
}

/* ---------- quadrant: 2x2 with internal hairlines only ---------- */
export function E2Quad({ items }: { items: ReadonlyArray<{ kicker: string; title: string; copy: ReactNode }> }) {
  return (
    <div className="e2-quad rv">
      {items.map((it) => (
        <div key={it.title}>
          <b>{it.kicker}</b>
          <h3>{it.title}</h3>
          <p>{it.copy}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- staggered card row ---------- */
export function E2Stagger({ children }: { children: ReactNode }) {
  return <div className="e2-stagger rv">{children}</div>;
}

/* ---------- panel that overlaps the band above it ---------- */
export function E2Lift({ children }: { children: ReactNode }) {
  return <div className="e2-lift rv">{children}</div>;
}
