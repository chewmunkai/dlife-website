"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   .ask — the question ledger.

   A port of the behaviour in the design's menu.js. The row is the control:
   no plate, no chevron in a circle. Two things the CSS cannot do alone, and
   which are the whole reason this is a client component:

     · the answer's height is animated from its own scrollHeight, so no
       max-height guess can clip a long answer
     · the open row is re-measured after the webfonts land and on resize —
       without that, the first row keeps a height measured against the
       fallback face and clips by a line

   The first row opens on mount, so the pattern explains itself without a
   click. Rows stay independently open: this is a ledger, not a radio group.
   ============================================================ */

export type Question = { q: string; a: string };

const Row = ({ item, index, initiallyOpen }: { item: Question; index: number; initiallyOpen: boolean }) => {
  const [open, setOpen] = useState(initiallyOpen);
  const panel = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  /* Height is owned here rather than by a CSS class, because the target value
     is the content's own measurement. Re-run on open, on resize, and once the
     fonts have settled. */
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
    // `fonts` is absent in older Safari; the initial measure still stands.
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  const ordinal = String(index + 1).padStart(2, "0");

  return (
    <div className={open ? "ask__row is-open" : "ask__row"}>
      <button className="ask__q" type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <i>{ordinal}</i>
        <span>{item.q}</span>
        <em aria-hidden="true" />
      </button>
      <div className="ask__a" ref={panel} style={{ transition: "height .45s cubic-bezier(.22,.7,.24,1)" }}>
        <div ref={inner}>
          {/* Client answers now arrive as more than one paragraph (C07–C10,
              31 Aug 2026). A blank line in `a` is a paragraph break; a
              single-paragraph answer renders exactly as it did before. */}
          {item.a.split(/\n{2,}/).map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Ask({ items }: { items: Question[] }) {
  return (
    <div className="ask">
      {items.map((item, i) => (
        <Row key={item.q} item={item} index={i} initiallyOpen={i === 0} />
      ))}
    </div>
  );
}
