"use client";

import "../../styles/dlife.css";
import "../../styles/blocks.css";
import { useEffect, useRef, type ReactNode } from "react";
import { SiteHeader, SiteMenu } from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { WA } from "../../lib/contact";
import Logo from "./Logo";

/**
 * The page shell every route renders inside: the `.dlife` root, the fixed
 * chrome, the header and overlay menu, the footer, and the motion engine.
 *
 * `path` is the route's own path, passed down so the navigation can mark the
 * current page. `loader` is true on the homepage only — the curtain is a
 * first-arrival gesture, and replaying it on every internal navigation would
 * turn a two-click journey into a five-second one.
 */
export default function SiteShell({
  path,
  children,
  loader = false,
}: {
  path: string;
  children: ReactNode;
  loader?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import("../../lib/dlife").then(({ initDLife }) => {
      if (cancelled) return;
      dispose = initDLife(el);
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div className="dlife" ref={root}>
      {/* Scroll target for the footer's "back to top". A fixed header cannot
          serve as one — its rect top is always 0, so scrolling to it resolves
          to wherever the page already is. */}
      <span id="top" aria-hidden="true" />
      <div id="cur" aria-hidden="true" />
      {/* Read progress. Decorative — the scroll position is already conveyed
          by the scrollbar to anyone relying on assistive tech. */}
      <div id="prog" aria-hidden="true">
        <i />
      </div>

      {loader && (
        <div id="loader" aria-hidden="true">
          <div>
            <div className="in">
              <span className="wm">
                <Logo reversed />
              </span>
            </div>
            <div className="sub">Real support, beyond the policy.</div>
          </div>
        </div>
      )}

      <SiteHeader path={path} />
      <SiteMenu path={path} />

      {children}

      {/* The one restrained floating contact point the visual system asks for.
          Small, single, and it sits out of the thumb's way on phones rather
          than covering the content it is meant to support. It carries its own
          prefill so a message opened from here is distinguishable from one
          opened by a section's own CTA. */}
      <a className="dl-wafloat" data-wa={WA.float} href="#" aria-label="Message D’Life on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.19 3.7.58.26 1.04.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z" />
        </svg>
        <span>WhatsApp</span>
      </a>

      <SiteFooter />
    </div>
  );
}
