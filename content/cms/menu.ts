import { pageDocument } from "./define";
import { HREF } from "./pages/common";
import { FOOTER_DIRS, LEGAL_LINKS, NAV, type NavLink, type NavPillar } from "../../components/v2/nav";

/*
 * The menu and the footer in Talous CMS: one library page ("Menu & footer"), like the Film
 * library, that every page's header and footer read (both shells: the homepage's and the
 * inner pages'). The menu is a WordPress-style list: items in order, a sub-item goes into the
 * dropdown of the item above it. Today's menu and footer are the defaults, from
 * components/v2/nav.ts.
 *
 * Phone numbers, email and addresses aren't here: they're shared with the Contact page and the
 * WhatsApp buttons (lib/contact.ts), so they're edited in one place, not per footer.
 */

export type Menu = {
  nav: NavPillar[];
  cta: NavLink;
  /** The full-screen menu (phones, and the Menu button). */
  menuNote: string;
  menuLinks: NavLink[];
  menuTag: string;
  footer: { dirs: { heading: string; links: NavLink[] }[]; noteLabel: string; note: string; company: string; tagline: string; legal: NavLink[] };
};

const linksOf = (list: NavLink[], p = "l") => list.map((l, i) => ({ id: `${p}${i + 1}`, label: l.label, href: l.href }));

export const MENU_DOCUMENT = pageDocument([
  [
    "SiteMenu",
    {
      items: NAV.flatMap((p) => [{ label: p.label, href: p.href, sub: false }, ...(p.children ?? []).map((c) => ({ label: c.label, href: c.href, sub: true }))]).map((x, i) => ({ id: `m${i + 1}`, ...x })),
      cta: "Speak with an Advisor",
      ctaHref: "wa:advisor",
      menuNote: "Whether you are protecting a family, reviewing a policy or exploring a career, a conversation is the right place to start.",
      menuLinks: linksOf([
        { label: "Message an Advisor on WhatsApp", href: "wa:advisor" },
        { label: "Ask a Question", href: "/contact" },
      ]),
      menuTag: "D’Life · Financial Advisory",
    },
  ],
  [
    "SiteFooter",
    {
      ...Object.fromEntries(FOOTER_DIRS.flatMap((d, i) => [[`col${i + 1}Heading`, d.heading], [`col${i + 1}Links`, linksOf(d.links, `c${i + 1}l`)]])),
      noteLabel: "General information",
      note: "D’Life Sdn Bhd is a financial advisory and insurance agency operating in Malaysia. Anything you read here is general information, not personal advice. It does not take your circumstances into account. A recommendation only follows a conversation, a needs assessment and the relevant product disclosure documents.",
      company: "D’Life Sdn Bhd",
      tagline: "Financial advisory · Est. 1999, Malaysia",
      legal: linksOf(LEGAL_LINKS, "g"),
    },
  ],
]);

type Props = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" ? v : "");
const links = (v: unknown): NavLink[] => ((v as Props[] | undefined) ?? []).filter((l) => str(l.label)).map((l) => ({ label: str(l.label), href: str(l.href) || "/" }));

/** The menu and footer from the "Menu & footer" page's two sections. */
export function menuFrom(blocks: { type: string; props: Props }[]): Menu {
  const m: Props = blocks.find((b) => b.type === "SiteMenu")?.props ?? MENU_DOCUMENT.content[0].props;
  const f: Props = blocks.find((b) => b.type === "SiteFooter")?.props ?? MENU_DOCUMENT.content[1].props;
  const nav: NavPillar[] = [];
  for (const item of (m.items as Props[] | undefined) ?? []) {
    if (!str(item.label)) continue;
    const l = { label: str(item.label), href: str(item.href) || "/" };
    // A sub-item joins the dropdown of the item above it; the first item can't be one.
    const parent = nav[nav.length - 1];
    if (item.sub === true && parent) (parent.children ??= []).push(l);
    else nav.push(l);
  }
  return {
    nav,
    cta: { label: str(m.cta), href: str(m.ctaHref) || "wa:advisor" },
    menuNote: str(m.menuNote),
    menuLinks: links(m.menuLinks),
    menuTag: str(m.menuTag),
    footer: {
      dirs: [1, 2, 3].map((n) => ({ heading: str(f[`col${n}Heading`]), links: links(f[`col${n}Links`]) })).filter((d) => d.heading || d.links.length),
      noteLabel: str(f.noteLabel),
      note: str(f.note),
      company: str(f.company),
      tagline: str(f.tagline),
      legal: links(f.legal),
    },
  };
}

const LINK_ITEM = { label: { type: "text", label: "Text", max: 60 }, href: HREF } as const;
const column = (n: number) => ({
  [`col${n}Heading`]: { type: "text", label: `Column ${n}: heading`, max: 40 },
  [`col${n}Links`]: { type: "list", label: `Column ${n}: links`, max: 12, item: LINK_ITEM },
});

export const MENU_BLOCKS = {
  SiteMenu: {
    label: "Menu (top of every page)",
    description: "Items in order, left to right. Switch on “Sub-item” to put an item in the dropdown of the item above it.",
    fields: {
      items: {
        type: "list",
        label: "Menu items",
        max: 30,
        item: { label: { type: "text", label: "Text", max: 40 }, href: HREF, sub: { type: "toggle", label: "Sub-item (in the dropdown of the item above)" } },
      },
      cta: { type: "text", label: "Header button text", max: 40 },
      ctaHref: { ...HREF, label: "Header button goes to" },
      menuNote: { type: "textarea", label: "Full-screen menu (phones): text", max: 300 },
      menuLinks: { type: "list", label: "Full-screen menu: links under the text", max: 3, item: LINK_ITEM },
      menuTag: { type: "text", label: "Full-screen menu: small line at the bottom", max: 60 },
    },
  },
  SiteFooter: {
    label: "Footer (bottom of every page)",
    description: "Phone numbers, email and addresses come from the site's business details, shared with the Contact page.",
    fields: {
      ...column(1),
      ...column(2),
      ...column(3),
      noteLabel: { type: "text", label: "Fine print: label", max: 40 },
      note: { type: "textarea", label: "Fine print", max: 800 },
      company: { type: "text", label: "Company name (after ©)", max: 60 },
      tagline: { type: "text", label: "Line beside the company name", max: 80 },
      legal: { type: "list", label: "Legal links", max: 6, item: LINK_ITEM },
    },
  },
} as const;
