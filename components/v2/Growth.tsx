"use client";

import { useEffect, useRef, useState } from "react";
import type { Benefit } from "../../content/growth";

/* ============================================================
   The four career benefits, as a disclosure ledger (A09).

   One component for both pages. The homepage runs the previous design's
   `.dlife`-scoped chrome and Careers runs the new unscoped one, so this
   cannot borrow either page's classes — it brings its own `.grow`, and
   styles/growth.css is loaded by both shells. That sheet is deliberately
   unscoped and namespaced: nothing in it can reach anything else.

   Behaviour, and why each part is there:

     · the whole row is one <button>, so the ordinal, the name and the
       summary are all the same target — a 4px-tall title is not a control
     · `aria-expanded` is on that button and the panel is `role="region"`
       labelled by it, so a screen reader is told the state and can find what
       opened
     · the panel's height animates from its own measurement rather than a
       max-height guess, and is re-measured on resize and once the webfonts
       land — the same lesson Ask.tsx learned, for the same reason
     · rows open independently. This is a ledger, not a radio group.

   Nothing starts open: on the homepage these rows sit inside a section that
   is already making an argument, and four open panels would bury it.
   ============================================================ */

const Mark = () => (
  <span className="grow__mark" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  </span>
);

function Row({ item, long, idBase }: { item: Benefit; long: boolean; idBase: string }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

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
    <div className={open ? "grow__row is-open" : "grow__row"}>
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
          <span className="grow__sum">{item.summary}</span>
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
          <p>{item.detail}</p>
        </div>
      </div>
    </div>
  );
}

export default function Growth({
  items,
  /** Careers uses its own longer headings; the homepage uses the short names. */
  long = false,
  idBase = "grow",
}: {
  items: ReadonlyArray<Benefit>;
  long?: boolean;
  idBase?: string;
}) {
  return (
    <div className="grow">
      {items.map((item) => (
        <Row key={item.no} item={item} long={long} idBase={idBase} />
      ))}
    </div>
  );
}
