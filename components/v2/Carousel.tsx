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

   Reduced motion is respected twice over: the arrows jump instead of gliding,
   and a rail set to auto-rotate does not rotate at all. See the note on
   `autoRotate` for the three ways a visitor can stop one that does.
   ============================================================ */

const Arrow = ({ back = false }: { back?: boolean }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d={back ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Carousel({
  label,
  className = "",
  autoRotate = false,
  children,
}: {
  /** Names the region and both arrows, so a screen reader says which rail. */
  label: string;
  /** Sits on the track, e.g. `icards` — the grid class keeps its card sizing. */
  className?: string;
  /**
   * Advance on its own, one card every 6 seconds.
   *
   * WCAG 2.2.2 wants a way to stop anything that moves by itself for longer
   * than five seconds, so this comes with three of them: an explicit
   * pause/play control, a pause while the pointer is over the rail or focus
   * is inside it, and a permanent stop the moment anyone touches an arrow or
   * scrolls the track by hand. It never starts at all under
   * prefers-reduced-motion, and it stops when the tab is hidden so a rail
   * nobody can see is not quietly running to its end.
   */
  autoRotate?: boolean;
  children: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  /** Null until measured. Nothing renders in the control row before then, so
   *  a rail that turns out to fit never flashes a pair of dead arrows. */
  const [overflows, setOverflows] = useState<boolean | null>(null);
  const [at, setAt] = useState<{ start: boolean; end: boolean }>({ start: true, end: false });
  /** Paused by the visitor, and it stays paused. */
  const [paused, setPaused] = useState(false);
  /** Paused by hovering, focusing or hiding the tab. Transient. */
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);

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

  useEffect(() => {
    const q = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!q) return;
    setReduced(q.matches);
    const on = () => setReduced(q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);

  /* A hidden tab should not be running a rail to its end unwatched. */
  useEffect(() => {
    const on = () => setHeld(document.hidden);
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);

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

  /* Advance, and wrap back to the start when there is nowhere further to go —
     a rail that stops on its own after one pass looks broken rather than
     finished. */
  useEffect(() => {
    if (!autoRotate || !overflows || paused || held || reduced) return;
    const id = window.setInterval(() => {
      const el = track.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        page(1);
      }
    }, 6000);
    return () => window.clearInterval(id);
    // `page` is stable enough for this: it only reads refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRotate, overflows, paused, held, reduced]);

  const rotating = autoRotate && overflows && !reduced;

  return (
    <div
      className={`crsl${overflows ? " is-scrollable" : ""}`}
      onMouseEnter={rotating ? () => setHeld(true) : undefined}
      onMouseLeave={rotating ? () => setHeld(false) : undefined}
      onFocusCapture={rotating ? () => setHeld(true) : undefined}
      onBlurCapture={rotating ? () => setHeld(false) : undefined}
    >
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
            onClick={() => {
              setPaused(true);
              page(-1);
            }}
          >
            <Arrow back />
          </button>

          {/* The explicit stop. Only rendered when something is actually
              moving, because a pause button on a static rail is a lie. */}
          {rotating && (
            <button
              type="button"
              className="crsl__btn crsl__btn--play"
              aria-pressed={paused}
              aria-label={paused ? `Resume ${label.toLowerCase()}` : `Pause ${label.toLowerCase()}`}
              onClick={() => setPaused((v) => !v)}
            >
              {paused ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
                </svg>
              )}
            </button>
          )}
          <button
            type="button"
            className="crsl__btn"
            aria-label={`Next ${label.toLowerCase()}`}
            disabled={at.end}
            onClick={() => {
              setPaused(true);
              page(1);
            }}
          >
            <Arrow />
          </button>
        </div>
      )}
    </div>
  );
}
