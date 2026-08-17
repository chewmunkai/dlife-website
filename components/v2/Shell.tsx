"use client";

/* Order matters: fonts → tokens → base → atoms → blocks → chrome → pages.
   This mirrors the design system's own styles.css entry point. These sheets
   are unscoped, unlike the previous design's .dlife-nested styles, so they
   are only ever loaded by a route that renders this shell. */
import "../../styles/ds/tokens/fonts.css";
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

import { useEffect, useState, type ReactNode } from "react";
import Logo from "../site/Logo";
import { link } from "../../lib/asset";
import { ROUTES } from "../../lib/routes";
import { CONTACT, WA, waHref } from "../../lib/contact";
import { NAV, OVERLAY_NAV, FOOTER_DIRS, LEGAL_LINKS } from "./nav";

const Caret = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/**
 * The page shell for the new design.
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
export default function Shell({ children }: { children: ReactNode }) {
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

      <header className="dl-header dl-header--static">
        <a className="wm" href={link(ROUTES.home.path)} aria-label="D’Life, home">
          <Logo reversed alt="" />
          <Logo alt="" />
        </a>

        <nav className="nav" aria-label="Primary">
          {NAV.map((pillar) =>
            pillar.children ? (
              <div className="grp" key={pillar.label}>
                <a className="top" href={link(pillar.href)}>
                  {pillar.label}
                  <Caret />
                </a>
                <div className="drop">
                  {pillar.children.map((child) => (
                    <a key={child.href} href={link(child.href)}>
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a className="top" href={link(pillar.href)} key={pillar.label}>
                {pillar.label}
              </a>
            ),
          )}
        </nav>

        <div className="rt">
          <a className="pill" href={waHref(WA.advisor)}>
            <span>Speak with an Advisor</span>
          </a>
          <button
            className="burger"
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="dl-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span>Menu</span>
            <span className="ln" />
          </button>
        </div>
      </header>

      <nav className="dl-menu" id="dl-menu" aria-hidden={!open} aria-label="Menu">
        <div className="big">
          {OVERLAY_NAV.map((item, i) => (
            <a key={item.href} href={link(item.href)} onClick={() => setOpen(false)}>
              {item.label}
              <i>{String(i + 1).padStart(2, "0")}</i>
            </a>
          ))}
        </div>
        <div className="side">
          <p>
            Every protection and planning page is listed on Solutions, and both community programmes sit under
            Community.
          </p>
          <div className="c">
            <a href={link(ROUTES.contact.path)} onClick={() => setOpen(false)}>
              Contact
            </a>
            <a href={link(ROUTES.dva.path)} onClick={() => setOpen(false)}>
              Drive Value Associates
            </a>
          </div>
          <span className="lb">D’Life · Financial Advisory</span>
        </div>
      </nav>

      <main id="main">{children}</main>

      {/* August 2026 amendment (styles/amendments.css §6): one row carrying
          the statement and the directory side by side, then the required fine
          print and legal line. The `dark charcoal` classes keep it on the
          approved footer ground and give every child the dark section
          tokens. */}
      <footer className="ft2 dark charcoal">
        <div className="ft2-top">
          <div className="ft2-head">
            <p className="lb">D’Life · Financial advisory · Est. 1999, Malaysia</p>
            <h2>Real support, beyond the policy.</h2>
            <div className="ft2-cta">
              <a href={waHref(WA.footer)}>
                WhatsApp {CONTACT.phone} <em aria-hidden="true">→</em>
              </a>
              <a href={`mailto:${CONTACT.email}`}>
                {CONTACT.email} <em aria-hidden="true">→</em>
              </a>
              <span className="sub">
                Monday to Friday, 9am–6pm. {CONTACT.city}, visits by appointment.
              </span>
            </div>
          </div>

          <nav className="ft2-grid" aria-label="Site directory">
          {FOOTER_DIRS.map((group) => (
            <div key={group.heading}>
              <h3 className="k">{group.heading}</h3>
              <ul>
                {group.links.map((l) => (
                  <li key={l.href}>
                    <a href={link(l.href)}>{l.label}</a>
                  </li>
                ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="ft2-fine">
          D’Life Revolution is a financial advisory and insurance agency operating in Malaysia. Anything you read here
          is general information, not personal advice. It does not take your circumstances into account. A
          recommendation only follows a conversation, a needs assessment and the relevant product disclosure documents.
        </p>

        <div className="ft2-base">
          <span>© {new Date().getFullYear()} D’Life Revolution</span>
          <div className="lx">
            {LEGAL_LINKS.map((l) => (
              <a key={l.href} href={link(l.href)}>
                {l.label}
              </a>
            ))}
            {/* TODO(launch): no project document lists D’Life's social
                profiles. These stay inert rather than guessing a handle. */}
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">YouTube</a>
          </div>
          <a className="top" href="#top">
            Back to top <em aria-hidden="true">↑</em>
          </a>
        </div>
      </footer>

      <a className="dl-wafloat" href={waHref(WA.float)} aria-label="Message D’Life on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z" />
        </svg>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
