import type { ReactNode } from "react";

/**
 * BLOCK: section wrapper.
 *
 * The generic band every inner-page block sits in. Owns the vertical rhythm
 * (`--dl-sec-y`), the section mode (`light` / `sand` / `dark`) and the
 * optional heading pair, so no page has to restate any of them.
 */
export function Band({
  id,
  tone = "light",
  label,
  title,
  lede,
  children,
  width = "wide",
  className = "",
}: {
  id?: string;
  tone?: "light" | "sand" | "dark";
  label?: string;
  title?: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  /** `read` clamps to a comfortable measure; `wide` fills the page margin. */
  width?: "read" | "wide";
  className?: string;
}) {
  const mode = tone === "sand" ? " sand" : tone === "dark" ? " dark" : "";
  return (
    <section id={id} className={`dl-band dl-band--${width}${mode} ${className}`.trim()}>
      {(label || title || lede) && (
        <header className="dl-band__head">
          {label && <span className="lb rv">{label}</span>}
          {title && <h2 className="rv">{title}</h2>}
          {lede && <p className="dl-lede rv">{lede}</p>}
        </header>
      )}
      {children}
    </section>
  );
}

/**
 * BLOCK: prose.
 *
 * Long-form copy at a controlled measure. The direction guide bans "long text
 * walls and random bolding", so this caps its own width and leaves emphasis to
 * structure rather than bold runs mid-paragraph.
 */
export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`dl-prose rv ${className}`.trim()}>{children}</div>;
}

/**
 * BLOCK: pull quote.
 *
 * Used for advisor and founder voices. `cite` is the attribution line.
 * ⚠️ Every attributed quotation on the site is pending consent — the client
 * guide lists testimonials and advisor quotations as verify-before-publish.
 */
export function Pullquote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className="dl-quote rv">
      <blockquote>{children}</blockquote>
      {cite && <figcaption>{cite}</figcaption>}
    </figure>
  );
}

/**
 * BLOCK: check list.
 *
 * The "what this covers" / "what members gain" list. Geometric outline tick,
 * per the icon direction — no filled badges, no colour-coded states.
 */
export function CheckList({ items, columns = 2 }: { items: ReadonlyArray<ReactNode>; columns?: 1 | 2 }) {
  return (
    <ul className={`dl-checks dl-checks--${columns} rv`}>
      {items.map((item, i) => (
        <li key={i}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
            <path d="m4 12.5 5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * BLOCK: definition rows.
 *
 * A term and its plain-language explanation, stacked. Used where a page has
 * to explain vocabulary without becoming a product catalogue.
 */
export function DefList({ items }: { items: ReadonlyArray<{ term: string; copy: ReactNode }> }) {
  return (
    <dl className="dl-defs rv">
      {items.map((d) => (
        <div key={d.term}>
          <dt>{d.term}</dt>
          <dd>{d.copy}</dd>
        </div>
      ))}
    </dl>
  );
}
