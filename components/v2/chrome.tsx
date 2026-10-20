import Logo from "../site/Logo";
import { link } from "../../lib/asset";
import { ROUTES } from "../../lib/routes";
import { ADDRESS_LINE, CONTACT, HOURS, SEGAMAT_LINE, WA, WA_DISPLAY, telHref, waHref } from "../../lib/contact";
import { hrefOf } from "../pages/common";
import type { Menu } from "../../content/cms/menu";
import { Icon } from "./icons";

/*
 * The new design's header, full-screen menu and footer, drawn from the "Menu & footer" page in
 * Talous CMS (content/cms/menu.ts). No stylesheets here: ShellView loads them for the site, and
 * the editor shows these same pieces in its canvas, which has its own copy.
 */

const Caret = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export function V2Header({ menu, open = false, onToggle }: { menu: Menu; open?: boolean; onToggle?: () => void }) {
  return (
    <header className="dl-header dl-header--static">
      <a className="wm" href={link(ROUTES.home.path)} aria-label="D’Life, home">
        <Logo reversed alt="" />
        <Logo alt="" />
      </a>

      <nav className="nav" aria-label="Primary">
        {menu.nav.map((pillar) =>
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
        <a className="pill" href={hrefOf(menu.cta.href)}>
          <span>{menu.cta.label}</span>
        </a>
        <button
          className="burger"
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="dl-menu"
          onClick={onToggle}
        >
          <span>Menu</span>
          <span className="ln" />
        </button>
      </div>
    </header>
  );
}

export function V2Overlay({ menu, open = false, onClose }: { menu: Menu; open?: boolean; onClose?: () => void }) {
  return (
    <nav className="dl-menu" id="dl-menu" aria-hidden={!open} aria-label="Menu">
      <div className="big">
        {menu.nav.map((item, i) => (
          <a key={item.href} href={link(item.href)} onClick={onClose}>
            {item.label}
            <i>{String(i + 1).padStart(2, "0")}</i>
          </a>
        ))}
      </div>
      <div className="side">
        <p>{menu.menuNote}</p>
        <div className="c">
          {menu.menuLinks.map((l) => (
            <a key={l.href + l.label} href={hrefOf(l.href)} onClick={onClose}>
              {l.label}
            </a>
          ))}
        </div>
        <span className="lb">{menu.menuTag}</span>
      </div>
    </nav>
  );
}

export function V2Footer({ footer }: { footer: Menu["footer"] }) {
  return (
    <footer className="ft2 dark charcoal">
      <div className="ft2-top">
        <div className="ft2-head">
          {/* T01 (client, 14 Sep 2026): "remove this wording". The client
              boxed the line under the loader lockup, and the instruction
              carries no qualifier, so it comes off the footer too — this
              column now opens on the contact routes. The identity line
              already sits in the base row beside the copyright, so the
              agency is still named. `.ft2-cta`'s top margin went with the
              heading it was spacing away from. */}
          <div className="ft2-cta">
            {/* L02: this said "WhatsApp 03-9766 1205" — the office landline
                under a WhatsApp label, while the link went to the mobile.
                T09 (14 Sep): the landline is gone and WhatsApp now runs on
                the office-hours number itself, so the first two rows share
                their digits. They are labelled by channel and by window
                rather than both printing a bare number, which is what stops
                a reader counting them as two different lines. */}
            {/* 12 Oct 2026, client: the rule under each link is gone and
                each channel carries its own icon (components/v2/icons). */}
            <a href={waHref(WA.footer)}>
              <Icon name="whatsapp" size={20} />
              WhatsApp {WA_DISPLAY} <em aria-hidden="true">→</em>
            </a>
            <a href={telHref(CONTACT.phone)}>
              <Icon name="phone" size={20} />
              Office hours {CONTACT.phone} <em aria-hidden="true">→</em>
            </a>
            <a href={telHref(CONTACT.phoneAfterHours)}>
              <Icon name="moon" size={20} />
              After hours {CONTACT.phoneAfterHours} <em aria-hidden="true">→</em>
            </a>
            <a href={`mailto:${CONTACT.email}`}>
              <Icon name="mail" size={20} />
              {CONTACT.email} <em aria-hidden="true">→</em>
            </a>
            {/* Both offices, one to a line; "visits by appointment" went
                with the same note on the Contact page (12 Oct 2026). */}
            <span className="sub">
              {HOURS.days}, {HOURS.office}.
              <br />
              {ADDRESS_LINE}.
              <br />
              {SEGAMAT_LINE}.
            </span>
          </div>
        </div>

        <nav className="ft2-grid" aria-label="Site directory">
        {footer.dirs.map((group) => (
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

      {/* Round 9: this was a 92-character slab floating between the directory
          and the legal row with nothing attaching it to either. It is now its
          own labelled tier, on the same two-column rhythm as the row above, so
          it reads as the disclosure it is rather than as an orphan. */}
      <div className="ft2-note">
        <p className="k">{footer.noteLabel}</p>
        <p>{footer.note}</p>
      </div>

      <div className="ft2-base">
        <span>
          © {new Date().getFullYear()} {footer.company}
          <em>{footer.tagline}</em>
        </span>
        <div className="lx">
          {footer.legal.map((l) => (
            <a key={l.href} href={link(l.href)}>
              {l.label}
            </a>
          ))}
          {/* L12: three links to "#" were shipping as real navigation —
              a visitor clicking Instagram got a jump to the top of the page.
              Nothing in the repository, the brief or the client's materials
              gives D'Life's profile URLs, so the honest release candidate
              has no social links at all rather than three dead ones.

              TO RESTORE: put the URLs in SOCIALS in lib/contact.ts. Both
              footers read the same list and both come back at once. */}
        </div>
        <a className="top" href="#top">
          Back to top <em aria-hidden="true">↑</em>
        </a>
      </div>
    </footer>
  );
}
