"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/* ============================================================
   The carousel.

   A02/A11: card sets that do not fill their grid were leaving a row of empty
   slots under a single stranded card — Medical's 5 terms in a 4-up row,
   Wealth & Legacy's 7, Existing Policy Support's 5 — and the story sets were
   the same shape. One rail serves all of them.

   What it is, deliberately:

     · a scroll-snap track, so a drag, a trackpad swipe and the arrows all
       land on a card edge rather than mid-card
     · keyboard-operable twice over: the arrows are real buttons, and the
       track itself is focusable, which is what lets a keyboard user scroll a
       region that has its own overflow
     · honest about its state — an arrow at the end of the track is
       `disabled`, not a control that silently does nothing
     · silent when it is not needed. If every card already fits, the arrows
       are not rendered at all and this is a plain row.

   Reduced motion is respected in the one place it actually applies: the
   arrows jump instead of gliding. The track never moves on its own — nothing
   here auto-advances, so there is no motion to pause.
   ============================================================ */

const Arrow = ({ back = false }: { back?: boolean }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d={back ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Carousel({
  label,
  className = "",
  children,
}: {
  /** Names the region and both arrows, so a screen reader says which rail. */
  label: string;
  /** Sits on the track, e.g. `icards` — the grid class keeps its card sizing. */
  className?: string;
  children: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  /** Null until measured. Nothing renders in the control row before then, so
   *  a rail that turns out to fit never flashes a pair of dead arrows. */
  const [overflows, setOverflows] = useState<boolean | null>(null);
  const [at, setAt] = useState<{ start: boolean; end: boolean }>({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    /* 2px of slack: sub-pixel track widths otherwise report a permanent 1px
       of overflow and leave both arrows on a rail that has nothing to scroll. */
    const over = el.scrollWidth - el.clientWidth > 2;
    setOverflows(over);
    setAt({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2,
    });
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    /* Card heights and widths settle once the display face lands; measuring
       before that reports the fallback's metrics. */
    document.fonts?.ready.then(measure).catch(() => {});
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [measure]);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    /* One card plus its gap, taken from the DOM rather than from a constant,
       so the step stays right through every breakpoint. Falls back to most of
       a viewport-width when the track is somehow empty. */
    const first = el.firstElementChild as HTMLElement | null;
    const second = el.children[1] as HTMLElement | undefined;
    const step =
      first && second
        ? second.offsetLeft - first.offsetLeft
        : first
          ? first.offsetWidth
          : el.clientWidth * 0.8;
    const reduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className={`crsl${overflows ? " is-scrollable" : ""}`}>
      <div
        ref={track}
        className={`crsl__track ${className}`.trim()}
        /* Focusable only when there is something to scroll — a focus stop that
           cannot move is a keyboard tab spent on nothing. */
        tabIndex={overflows ? 0 : -1}
        role={overflows ? "group" : undefined}
        aria-label={overflows ? `${label} — scrollable` : undefined}
      >
        {children}
      </div>

      {overflows && (
        <div className="crsl__nav">
          <button
            type="button"
            className="crsl__btn"
            aria-label={`Previous ${label.toLowerCase()}`}
            disabled={at.start}
            onClick={() => page(-1)}
          >
            <Arrow back />
          </button>
          <button
            type="button"
            className="crsl__btn"
            aria-label={`Next ${label.toLowerCase()}`}
            disabled={at.end}
            onClick={() => page(1)}
          >
            <Arrow />
          </button>
        </div>
      )}
    </div>
  );
}
