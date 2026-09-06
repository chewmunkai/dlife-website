"use client";

import { useEffect, useRef, useState } from "react";
import type { Benefit } from "../../content/growth";

/* ============================================================
   The four career benefits, as a disclosure ledger (A09, L05).

   One component for both pages. The homepage runs the previous design's
   `.dlife`-scoped chrome and Careers runs the new unscoped one, so this
   cannot borrow either page's classes — it brings its own `.grow`, and
   styles/growth.css is loaded by both shells. That sheet is deliberately
   unscoped and namespaced: nothing in it can reach anything else.

   Two modes, because the two pages are doing different jobs:

     · `compact` (homepage) — a closed row is the benefit's name and nothing
       else, so four closed rows read as a menu. Opening one gives the whole
       thing: the summary, the detail, and a link into that benefit's own
       section on Careers. L05 asked for exactly this, and for the link to
       land on the benefit rather than at the top of the page.
     · default (Careers) — the summary stays visible under the heading,
       because this is the page the homepage link arrives at and the reader is
       here to read rather than to choose.

   Behaviour, and why each part is there:

     · the whole row is one <button>, so the ordinal, the name and the summary
       are all the same target — a 4px-tall title is not a control
     · `aria-expanded` is on that button and the panel is `role="region"`
       labelled by it, so a screen reader is told the state and can find what
       opened
     · the panel's height animates from its own measurement rather than a
       max-height guess, and is re-measured on resize and once the webfonts
       land — the same lesson Ask.tsx learned, for the same reason
     · rows open independently. This is a ledger, not a radio group.
     · L05: arriving on /careers#leadership opens that row and scrolls to it.
       A deep link that lands next to a closed row has not really arrived.

   Nothing starts open otherwise: on the homepage these rows sit inside a
   section that is already making an argument, and four open panels would
   bury it.
   ============================================================ */

const Mark = () => (
  <span className="grow__mark" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  </span>
);

function Row({
  item,
  long,
  compact,
  idBase,
  href,
  openOnMount,
}: {
  item: Benefit;
  long: boolean;
  compact: boolean;
  idBase: string;
  /** Set on the homepage: where this benefit lives on Careers. */
  href?: string;
  openOnMount: boolean;
}) {
  const [open, setOpen] = useState(openOnMount);
  const panel = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  /* The hash is read after mount, so `openOnMount` arrives as a change rather
     than as an initial value — and useState ignores a changed initial value.
     Without this the deep link scrolled to a closed row, which is most of the
     way to not working at all. It fires on the transition only, so the reader
     can still close the row afterwards and it stays closed. */
  useEffect(() => {
    if (openOnMount) setOpen(true);
  }, [openOnMount]);

  useEffect(() => {
    const el = panel.current;
    const content = inner.current;
    if (!el || !content) return;
    const measure = () => {
      el.style.height = open ? `${content.offsetHeight}px` : "0px";
    };
    measure();
    if (!open) return;
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  const panelId = `${idBase}-${item.no}`;
  const btnId = `${panelId}-btn`;

  return (
    /* The slug is the anchor. It sits on the row rather than on the button so
       a deep link scrolls the whole thing into view, heading included. */
    <div id={item.slug} className={open ? "grow__row is-open" : "grow__row"}>
      <button
        id={btnId}
        className="grow__q"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <i>{item.no}</i>
        <span className="grow__txt">
          <b>{long ? item.full : item.title}</b>
          {/* L05: closed rows on the homepage are headings only. */}
          {!compact && <span className="grow__sum">{item.summary}</span>}
        </span>
        <Mark />
      </button>
      <div
        id={panelId}
        className="grow__panel"
        ref={panel}
        role="region"
        aria-labelledby={btnId}
        style={{ transition: "height .42s cubic-bezier(.22,.7,.24,1)" }}
      >
        <div ref={inner}>
          {compact && <p className="grow__lead">{item.summary}</p>}
          <p>{item.detail}</p>
          {href && (
            <p className="grow__go">
              <a href={href}>
                More on {item.title.toLowerCase()} <em aria-hidden="true">→</em>
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Growth({
  items,
  /** Careers uses its own longer headings; the homepage uses the short names. */
  long = false,
  /** Homepage: a closed row is the name alone, and each opens with a way in. */
  compact = false,
  /** Base of the Careers URL each row links to, e.g. "/careers". */
  linkBase,
  idBase = "grow",
}: {
  items: ReadonlyArray<Benefit>;
  long?: boolean;
  compact?: boolean;
  linkBase?: string;
  idBase?: string;
}) {
  /* L05: honour a deep link. Read once on mount rather than on every render —
     the reader may well close the row afterwards, and re-opening it under
     them would be the component arguing with them. */
  const [hash, setHash] = useState<string>("");
  useEffect(() => {
    const slug = window.location.hash.replace("#", "");
    if (!slug) return;
    setHash(slug);
    /* Scroll after the row has had a frame to open, so the browser measures
       the expanded height rather than the collapsed one. */
    const el = document.getElementById(slug);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start", behavior: "auto" }));
  }, []);

  return (
    <div className="grow">
      {items.map((item) => (
        <Row
          key={item.no}
          item={item}
          long={long}
          compact={compact}
          idBase={idBase}
          href={linkBase ? `${linkBase}#${item.slug}` : undefined}
          openOnMount={hash === item.slug}
        />
      ))}
    </div>
  );
}
