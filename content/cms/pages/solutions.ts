import { HIDE_FIELD, pageDocument } from "../define";
import { SOLUTIONS } from "../../solutions";
import { SOLUTIONS_E2 } from "../../solutions-e2";
import { servicePhotos } from "../../service-photos";
import type { Photo } from "../../../components/v2/blocks";
import { WA } from "../../../lib/contact";
import { ROUTES, SOLUTION_SLUGS, type RouteKey } from "../../../lib/routes";

/*
 * The six solution pages in Talous CMS. One template; each page's document is built from the
 * site's solution copy (content/solutions.ts, solutions-e2.ts, service-photos.ts), so those files
 * stay the defaults and nothing is copied twice. From the first sync on, each page renders what
 * is published in the CMS over these defaults.
 */

const POLICY_PHRASE = "Existing Policy Support";
const ids = <T extends object>(list: T[], p: string) => list.map((x, i) => ({ id: `${p}${i + 1}`, ...x }));
/** The WhatsApp topic whose message a solution's button sends. */
const waTopic = (message: string) => `wa:${Object.keys(WA).find((k) => WA[k as keyof typeof WA] === message) ?? "conversation"}`;
const photoProps = (p: Photo | undefined, prefix = "photo") =>
  p ? { [prefix]: p.src, [`${prefix}Alt`]: p.alt, ...(p.position ? { [`${prefix}Position`]: p.position } : {}), ...(p.fit ? { [`${prefix}Fit`]: p.fit } : {}), ...(p.ratio ? { [`${prefix}Ratio`]: p.ratio } : {}) } : {};

export function solutionDocument(slug: string) {
  const c = SOLUTIONS[slug];
  const e = SOLUTIONS_E2[slug];
  const photos = servicePhotos(slug, c.photo, e.moments);
  const wa = waTopic(c.cta.wa);
  // The closing's second button moves the reader on to the next area.
  const next = SOLUTION_SLUGS[(SOLUTION_SLUGS.indexOf(slug as (typeof SOLUTION_SLUGS)[number]) + 1) % SOLUTION_SLUGS.length] as RouteKey;
  return pageDocument([
    ["PageHero", { label: c.label, title: c.h1, lede: c.lede, ...photoProps(photos.hero), actions: [{ id: "a1", label: e.action, href: wa, style: "pill" }] }],
    ["PageBar", { facts: ids(e.bar.facts.map((text) => ({ text })), "i"), statement: e.bar.statement }],
    ["PageStatement", { kick: c.label, lead: e.open.lead, prose: e.open.prose.map((p) => p.replace(POLICY_PHRASE, `[${POLICY_PHRASE}](${ROUTES.policy.path})`)).join("\n\n") }],
    ["PageMoments", { title: e.split.title, items: ids(c.recognise.questions.map((text, i) => ({ text, ...photoProps(photos.moments[i]) })), "m") }],
    ["PageIdeas", { label: e.explain.label, title: e.explain.title, lede: e.explain.lede, items: ids(c.explain.terms.map((t, i) => ({ ...t, ...(e.ideaIcons[i] ? { icon: e.ideaIcons[i] } : {}) })), "c") }],
    ["PageStepsPanel", { label: e.steps.label, title: e.steps.title, ...(e.steps.lede ? { lede: e.steps.lede } : {}), steps: ids(c.steps.items, "s") }],
    ["PageSaid", { quote: c.prove.quote, cite: c.prove.cite, ...photoProps(e.said.photo) }],
    ["PageFaq", { label: e.qa.label, title: e.qa.title, faqs: ids(c.faqs.map((f) => ({ q: f.q, a: f.a })), "q"), actions: [{ id: "a1", label: "Ask us something else", href: ROUTES.contact.path, style: "pill ghost" }] }],
    [
      "PageClosing",
      {
        title: e.closing.title,
        lede: e.closing.lede,
        actions: [
          { id: "a1", label: e.action, href: wa, style: "pill" },
          { id: "a2", label: `Next: ${ROUTES[next].label}`, href: ROUTES[next].path, style: "pill ghost" },
        ],
      },
    ],
  ]);
}

export const SOLUTION_PAGES = SOLUTION_SLUGS.map((slug) => ({
  slug: ROUTES[slug as RouteKey].path.slice(1),
  title: ROUTES[slug as RouteKey].label,
  template: "solution",
  document: solutionDocument(slug),
}));

const LABEL = { type: "text", label: "Small label", max: 60 } as const;
const HEADING = { type: "text", label: "Heading (*words* in stars become italic)", max: 160 } as const;

export const SOLUTION_BLOCKS = {
  PageMoments: {
    label: "Situations (numbered, with photos)",
    fields: {
      title: HEADING,
      items: {
        type: "list",
        label: "Situations",
        max: 8,
        item: {
          text: { type: "textarea", label: "Situation", max: 300 },
          photo: { type: "image", label: "Photo" },
          photoAlt: { type: "text", label: "Photo description (alt text)", max: 300 },
          photoPosition: { type: "text", label: "Photo focus, e.g. 50% 30% (optional)", max: 20 },
          photoFit: { type: "select", label: "Photo fit", options: ["cover", "contain"] },
        },
      },
      hidden: HIDE_FIELD,
    },
  },
  PageStepsPanel: {
    label: "How it works (steps)",
    fields: {
      label: LABEL,
      title: HEADING,
      lede: { type: "textarea", label: "Intro", max: 400 },
      steps: { type: "list", label: "Steps", max: 6, item: { title: { type: "text", label: "Step", max: 100 }, copy: { type: "textarea", label: "Text", max: 400 } } },
      hidden: HIDE_FIELD,
    },
  },
  PageSaid: {
    label: "Quote",
    fields: {
      quote: { type: "textarea", label: "Quote (the quotation marks are added for you)", max: 400 },
      cite: { type: "text", label: "Who said it (empty sets it as a plain divider)", max: 80 },
      photo: { type: "image", label: "Photo (optional)" },
      photoAlt: { type: "text", label: "Photo description (alt text)", max: 300 },
      photoPosition: { type: "text", label: "Photo focus (optional)", max: 20 },
      photoRatio: { type: "text", label: "Photo shape, e.g. 4 / 3 (sets it beside the quote)", max: 20 },
      hidden: HIDE_FIELD,
    },
  },
} as const;
