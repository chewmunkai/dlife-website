/* The homepage shares the ported pages' navigation model so the bar carries
   the same seven pillars in the same order everywhere. lib/routes' PRIMARY_NAV
   held the older five-pillar architecture, with About buried under Community
   and no Articles & Events. Only the data is shared: the markup and styling
   here are the approved homepage chrome. */
import type { Menu } from "../../content/cms/menu";
import { hrefOf } from "../pages/common";
import { WA } from "../../lib/contact";
import { link } from "../../lib/asset";
import Logo from "./Logo";

const Caret = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/**
 * True when `href` is the page at `path`, or an ancestor of it — so
 * /solutions stays marked while a visitor is on /solutions/wealth-legacy.
 */
const isCurrent = (href: string, path: string) =>
  href === path || (href !== "/" && path.startsWith(`${href}/`));

/**
 * Fixed header, on every page.
 *
 * Hover and focus both open a dropdown panel, so the caret never lies to a
 * keyboard user. These are plain links, not a menubar widget: the direction
 * guide asks for "fewer clicks, cleaner path", and a roving-tabindex menubar
 * would add a keyboard model where a list of links needs none.
 */
/** A WhatsApp topic ("wa:career") is wired by the motion engine from `data-wa`, like every
 *  WhatsApp link on this shell; anything else is a plain link. */
const go = (href: string) =>
  href.startsWith("wa:") ? { "data-wa": WA[href.slice(3) as keyof typeof WA] ?? WA.conversation, href: "#" } : { href: hrefOf(href) };

export function SiteHeader({ path, menu }: { path: string; menu: Menu }) {
  return (
    <header id="hd">
      {/* Both cuts ship; the ground decides which is visible. The link owns
          the accessible name so the pair stays decorative and "D’Life" is
          announced once, not twice. */}
      <a className="wm" href={link("/")} aria-label="D’Life, home">
        <Logo reversed alt="" />
        <Logo alt="" />
      </a>
      <nav className="nav" aria-label="Primary">
        {menu.nav.map((item) =>
          item.children ? (
            <div className="grp" key={item.label}>
              <a
                className="top"
                href={link(item.href)}
                aria-current={
                  isCurrent(item.href, path) || item.children.some((c) => c.href === path) ? "page" : undefined
                }
              >
                {item.label}
                {Caret}
              </a>
              <div className="drop">
                {item.children.map((child) => (
                  <a
                    href={link(child.href)}
                    key={child.href}
                    aria-current={child.href === path ? "page" : undefined}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a
              className="top"
              href={link(item.href)}
              key={item.href}
              aria-current={isCurrent(item.href, path) ? "page" : undefined}
            >
              {item.label}
            </a>
          ),
        )}
      </nav>
      <div className="rt">
        <a className="pill" {...go(menu.cta.href)}>
          <span>{menu.cta.label}</span>
        </a>
        <button className="burger" id="burger" aria-label="Menu" aria-controls="menu" aria-expanded={false}>
          <span id="mlabel">Menu</span>
          <span className="ln" />
        </button>
      </div>
    </header>
  );
}

/**
 * Full-screen overlay menu, opened by the burger. Carries the same seven
 * pillars as the bar — below the nav's breakpoint it is the only navigation,
 * so it cannot be a reduced set.
 */
export function SiteMenu({ path, menu }: { path: string; menu: Menu }) {
  return (
    <nav id="menu" aria-hidden="true">
      <div className="big">
        {menu.nav.map((item, i) => (
          <a
            href={link(item.href)}
            key={item.href}
            aria-current={isCurrent(item.href, path) ? "page" : undefined}
          >
            {item.label}
            <i>{String(i + 1).padStart(2, "0")}</i>
          </a>
        ))}
      </div>
      <div className="side">
        <p>{menu.menuNote}</p>
        <div className="c">
          {menu.menuLinks.map((l) => (
            <a key={l.href + l.label} {...go(l.href)}>
              {l.label}
            </a>
          ))}
        </div>
        <span className="lb">{menu.menuTag}</span>
      </div>
    </nav>
  );
}
