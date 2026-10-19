import type { Qa } from "../../components/blocks/Faq";
import type { HeroProps } from "../../components/home/Hero";
import { HOME_FAQS } from "../home";

/**
 * What Talous CMS may edit on this site, and the limits it edits within.
 * Served at /api/talous/manifest; the CMS validates every save against it, and
 * /studio builds its fields from it. Bump `version` whenever a block's fields
 * change, then "Sync section definitions" in the CMS.
 *
 * Limits are the design's, not arbitrary: the hero headline lines are two
 * short display lines at 1280px and 375px; past ~40 characters they wrap to
 * three and push the buttons below the photograph on mobile.
 */
const HIDDEN = { type: "toggle", label: "Hide this section on the site" } as const;

export const MANIFEST = {
  version: "dlife-2026-10-19.1",
  blocks: {
    Hero: {
      label: "Home hero",
      fields: {
        label: { type: "text", label: "Eyebrow", required: true, max: 60 },
        headline: { type: "text", label: "Headline", required: true, max: 40 },
        headlineItalic: { type: "text", label: "Headline, italic line", max: 40 },
        lede: { type: "textarea", label: "Intro", required: true, max: 280 },
        primaryCta: { type: "text", label: "Main button (opens WhatsApp)", required: true, max: 30 },
        secondaryCta: { type: "text", label: "Second button (scrolls to pathways)", required: true, max: 30 },
        photo: { type: "image", label: "Photo", required: true },
        photoAlt: { type: "text", label: "Photo description (alt text)", required: true, max: 160 },
        photoSide: { type: "select", label: "Photo side (desktop)", options: ["right", "left"] },
      },
    },
    // Shown in the editor so staff see the whole page. Their words and pictures aren't editable
    // yet, but they can be moved, hidden, and (where the design allows) laid out differently.
    Path: { label: "Find your path", locked: true, fields: { hidden: HIDDEN } },
    Trust: { label: "Trust figures", locked: true, fields: { hidden: HIDDEN } },
    Needs: { label: "Life needs", locked: true, fields: { hidden: HIDDEN } },
    Policy: { label: "Policy review", locked: true, fields: { photoSide: { type: "select", label: "Photo side (desktop)", options: ["right", "left"] }, hidden: HIDDEN } },
    Founder: { label: "Founders", locked: true, fields: { hidden: HIDDEN } },
    Stories: { label: "Stories (films)", locked: true, fields: { hidden: HIDDEN } },
    Careers: { label: "Careers", locked: true, fields: { hidden: HIDDEN } },
    Dva: { label: "DVA", locked: true, fields: { hidden: HIDDEN } },
    Youth: { label: "Youth Community", locked: true, fields: { hidden: HIDDEN } },
    Close: { label: "Closing", locked: true, fields: { hidden: HIDDEN } },
    Faq: {
      label: "FAQ",
      fields: {
        label: { type: "text", label: "Eyebrow", required: true, max: 40 },
        hidden: HIDDEN,
        items: {
          type: "list",
          label: "Questions",
          min: 1,
          max: 12,
          item: {
            q: { type: "text", label: "Question", required: true, max: 160 },
            a: { type: "textarea", label: "Answer", required: true, max: 600 },
          },
        },
      },
    },
  },
  templates: {
    // The homepage is a fixed composition: its sections can be edited, not rearranged.
    // Each section exactly once; staff can reorder and hide them. The hero can't be hidden (it is the page's h1).
    home: { fixed: ["Hero", "Path", "Trust", "Needs", "Policy", "Founder", "Stories", "Careers", "Dva", "Youth", "Faq", "Close"], anyOrder: true },
  },
  // The photographs a field may use. Alt text is the default description; editors can override it.
  media: [
    { src: "/media/img/hero-team.jpg", alt: "The D’Life team together" },
    { src: "/media/img/dva-team.jpg", alt: "The D’Life advisory team" },
    { src: "/media/img/community-gathering.jpg", alt: "D’Life colleagues sharing a meal around a table" },
    { src: "/media/img/community-group.jpg", alt: "D’Life community members together at a gathering" },
    { src: "/media/img/path-family.jpg", alt: "Three generations of a family gathered around a table" },
    { src: "/media/img/path-review.jpg", alt: "An advisor reviewing paperwork at his desk" },
    { src: "/media/img/path-future.jpg", alt: "Writing out a plan at a desk" },
    { src: "/media/img/need-family-card.jpg", alt: "Three generations of a family talking around the table after a meal" },
    { src: "/media/img/need-income-malaysia.jpg", alt: "A Malaysian couple planning together in their home office" },
    { src: "/media/img/need-health-card.jpg", alt: "Two family members in consultation with a doctor at a clinic" },
    { src: "/media/img/need-planning.jpg", alt: "Planning at a laptop at the kitchen table" },
    { src: "/media/img/policy-homepage-review.jpg", alt: "A couple going through a policy they have owned for years with an advisor" },
    { src: "/media/img/close-conversation.jpg", alt: "An advisor mid-conversation across a café table" },
    { src: "/media/img/contact-conversation.jpg", alt: "An advisor in conversation with a client" },
  ],
  seo: { titleMax: 70, descriptionMax: 170 },
} as const;

export type ManifestBlock = { label?: string; locked?: boolean; fields: Record<string, ManifestField> };
export type ManifestTemplate = { fixed?: readonly string[]; anyOrder?: boolean; allowed?: readonly string[] };

export type ManifestField =
  | { type: "text" | "textarea"; label?: string; required?: boolean; max?: number }
  | { type: "select"; label?: string; required?: boolean; options: readonly string[] }
  | { type: "toggle"; label?: string }
  | { type: "image"; label?: string; required?: boolean }
  | { type: "list"; label?: string; min?: number; max?: number; item: Record<string, ManifestField> };

/* ---------- the homepage as it ships today, as a CMS document ---------- */

export const HERO_DEFAULTS: HeroProps = {
  label: "D’Life · Financial Advisory",
  headline: "Real Support.",
  headlineItalic: "Beyond the Policy.",
  lede: "Protection is only the beginning. D’Life brings real guidance, long-term relationships and support through life’s changes.",
  primaryCta: "Speak with an Advisor",
  secondaryCta: "Find your path",
  photo: "/media/img/hero-team.jpg",
  photoAlt: "The D’Life team together",
};

export const FAQ_DEFAULTS: { label: string; items: Qa[] } = { label: "Helpful answers", items: HOME_FAQS };

/** Stable ids: the CMS addresses sections and questions by these. */
const faqBlock = { type: "Faq", props: { id: "home-faq", label: FAQ_DEFAULTS.label, items: HOME_FAQS.map((qa, i) => ({ id: `faq-${i + 1}`, ...qa })) } };
const locked = (type: string) => ({ type, props: { id: `home-${type.toLowerCase()}` } });

/** The approved sequence. lib/talous.ts uses it to put back any section the CMS is missing. */
export const HOME_DOCUMENT: { root: { props: Record<string, never> }; content: { type: string; props: { id: string } & Record<string, unknown> }[] } = {
  root: { props: {} },
  content: [
    { type: "Hero", props: { id: "home-hero", ...HERO_DEFAULTS } },
    locked("Path"),
    locked("Trust"),
    locked("Needs"),
    locked("Policy"),
    locked("Founder"),
    locked("Stories"),
    locked("Careers"),
    locked("Dva"),
    locked("Youth"),
    faqBlock,
    locked("Close"),
  ],
};
