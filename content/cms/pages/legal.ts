import { HIDE_FIELD, pageDocument } from "../define";
import { LEGAL } from "../../legal";
import { ROUTES } from "../../../lib/routes";

/*
 * The four legal pages in Talous CMS. One template; each page's document is built from
 * content/legal.ts, which stays the default (and keeps its warning: these are structural drafts,
 * and every [TO BE CONFIRMED …] marker stays until the real value is known).
 */

/** When the drafts were written. A legal page states its own date, not the deploy's. */
const DRAFTED = "2026-08-16";

export function legalDocument(key: string) {
  const c = LEGAL[key];
  return pageDocument([
    ["PageHero", { label: c.label, title: c.h1, lede: c.lede }],
    ["LegalBody", { notice: true, sections: c.sections.map((s, i) => ({ id: `s${i + 1}`, heading: s.heading, text: s.paras.join("\n\n") })), updated: `draft, ${DRAFTED}` }],
    [
      "PageLinkCards",
      {
        tone: "sand",
        label: "Also in this section",
        title: "Related legal pages",
        columns: "3",
        items: c.related.map((k, i) => ({ id: `k${i + 1}`, title: ROUTES[k].label, copy: ROUTES[k].teaser, href: ROUTES[k].path })),
      },
    ],
  ]);
}

export const LEGAL_PAGES = Object.values(LEGAL).map((c) => ({ slug: ROUTES[c.key].path.slice(1), title: ROUTES[c.key].label, template: "legal", document: legalDocument(c.key) }));

export const LEGAL_BLOCKS = {
  LegalBody: {
    label: "Legal text",
    description: "Write [TO BE CONFIRMED: what] where a fact is still missing; it shows as a marked gap.",
    fields: {
      notice: { type: "toggle", label: "Show the “structural draft” notice (switch off once it’s been reviewed)" },
      sections: {
        type: "list",
        label: "Sections",
        max: 20,
        item: { heading: { type: "text", label: "Heading", max: 120 }, text: { type: "textarea", label: "Paragraphs (a blank line between paragraphs)", max: 6000 } },
      },
      updated: { type: "text", label: "“Last updated” line, e.g. 16 August 2026", max: 60 },
      hidden: HIDE_FIELD,
    },
  },
} as const;
