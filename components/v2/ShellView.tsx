"use client";

/* Order matters: fonts → tokens → base → atoms → blocks → chrome → pages.
   This mirrors the design system's own styles.css entry point. These sheets
   are unscoped, unlike the previous design's .dlife-nested styles, so they
   are only ever loaded by a route that renders this shell. */
/* tokens/fonts.css is not imported: its only rule was the Google Fonts
   @import, and the faces come from next/font in app/layout.tsx now. */
import "../../styles/ds/tokens/colors.css";
import "../../styles/ds/tokens/typography.css";
import "../../styles/ds/tokens/spacing.css";
import "../../styles/ds/tokens/shape.css";
import "../../styles/ds/tokens/motion.css";
import "../../styles/ds/css/base.css";
import "../../styles/ds/css/actions.css";
import "../../styles/ds/css/blocks.css";
import "../../styles/ds/css/chrome.css";
import "../../styles/ds/pages.css";
/* Local fixes to the vendored sheets above. */
import "../../styles/ds/overrides.css";
/* Design evolution on top of the export — August 2026 client round. Last. */
import "../../styles/amendments.css";
/* A09. Unscoped on purpose and namespaced under `.grow`; the homepage shell
   loads the same file so one ledger serves both design layers. */
import "../../styles/growth.css";

import { useEffect, useState, type ReactNode } from "react";
import { WA, waHref } from "../../lib/contact";
import type { Menu } from "../../content/cms/menu";
import { V2Footer, V2Header, V2Overlay } from "./chrome";

/**
 * The page shell for the new design, in the browser: the menu's open state. Its menu and footer
 * come from Talous CMS through ./Shell.
 *
 * Kept entirely separate from components/site/SiteShell.tsx: that one owns the
 * `.dlife` root, its own chrome and the GSAP motion engine for the pages still
 * on the previous design. Nothing is shared but Logo and the lib/ helpers, so
 * the two can coexist until every route has been ported.
 *
 * The header renders in its static variant, exactly as the design export does.
 * The fixed variant is what the stylesheet leads with, but `.crest` carries no
 * top padding to clear a 103px fixed bar, so switching it is a design decision
 * about the hero rather than a flag to flip here.
 */
export default function ShellView({ children, menu }: { children: ReactNode; menu: Menu }) {
  const [open, setOpen] = useState(false);

  /* The overlay's open state is a class on the page root, because the header
     inverts and the WhatsApp point hides while it is open — both of them are
     outside the overlay's own subtree. */
  useEffect(() => {
    document.body.classList.toggle("dl-menu-open", open);
    return () => document.body.classList.remove("dl-menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="wrap">
      {/* Scroll target for the footer's "back to top". The header cannot serve
          as one even in its fixed variant — its rect top is always 0, so
          scrolling to it resolves to wherever the page already is. */}
      <span id="top" aria-hidden="true" />
      <a className="skip" href="#main">
        Skip to content
      </a>

      <V2Header menu={menu} open={open} onToggle={() => setOpen((v) => !v)} />

      <V2Overlay menu={menu} open={open} onClose={() => setOpen(false)} />

      <main id="main">{children}</main>

      {/* August 2026 amendment (styles/amendments.css §6): one row carrying
          the statement and the directory side by side, then the required fine
          print and legal line. The `dark charcoal` classes keep it on the
          approved footer ground and give every child the dark section
          tokens. */}
      <V2Footer footer={menu.footer} />

      <a className="dl-wafloat" href={waHref(WA.float)} aria-label="Message D’Life on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z" />
        </svg>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
