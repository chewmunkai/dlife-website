import { HIDE_FIELD } from "../define";
import { ICON_KEYS, PILL_STYLES } from "../../../components/pages/common";

/*
 * Talous CMS fields for the sections every inner page shares (components/pages/common.tsx).
 * Written out rather than inferred, so the same section edits the same way on every page.
 */

const TONES = ["light", "sand", "dark", "ink"] as const;

// Where a button can go. Plain words in the hint, because this is typed by hand.
const HREF = {
  type: "text",
  label: "Goes to",
  pattern: "(\\/[\\w\\-\\/#?=&.]*|#[\\w-]+|wa:\\w+|tel:\\+?[\\d ]+|mailto:\\S+|https:\\/\\/\\S+)",
  patternHint: "a page like /careers, a section like #films, a WhatsApp topic like wa:career, tel:+60…, mailto:… or https://…",
} as const;

export const ACTIONS_FIELD = {
  type: "list",
  label: "Buttons",
  max: 3,
  item: {
    label: { type: "text", label: "Button text", max: 60 },
    href: HREF,
    style: { type: "select", label: "Style", options: PILL_STYLES },
  },
} as const;

export const COMMON_BLOCKS = {
  PageHero: {
    label: "Page hero",
    fields: {
      label: { type: "text", label: "Small label above the title", max: 60 },
      title: { type: "text", label: "Title (*words* in stars become italic)", max: 120 },
      lede: { type: "textarea", label: "Intro", max: 400 },
      photo: { type: "image", label: "Photo" },
      photoAlt: { type: "text", label: "Photo description (alt text)", max: 300 },
      photoPosition: { type: "text", label: "Photo focus, e.g. 50% 30% (optional)", max: 20 },
      photoRatio: { type: "text", label: "Photo shape, e.g. 4 / 3 (optional)", max: 20 },
      photoFit: { type: "select", label: "Photo fit (contain shows the whole photo inside the frame)", options: ["cover", "contain"] },
      companion: { type: "image", label: "Second photo beside it (optional)" },
      companionAlt: { type: "text", label: "Second photo description (alt text)", max: 300 },
      companionPosition: { type: "text", label: "Second photo focus (optional)", max: 20 },
      actions: ACTIONS_FIELD,
      tone: { type: "select", label: "Colour", options: TONES },
      panel: { type: "select", label: "Text panel", options: ["light", "green"] },
    },
  },
  PageBand: {
    label: "Text band",
    fields: {
      label: { type: "text", label: "Small label", max: 60 },
      title: { type: "text", label: "Heading (*words* in stars become italic)", max: 200 },
      lede: { type: "textarea", label: "Intro", max: 600 },
      prose: { type: "textarea", label: "Paragraphs (a blank line between paragraphs; [words](/page) makes a link)", max: 3000 },
      tone: { type: "select", label: "Colour", options: TONES },
      read: { type: "toggle", label: "Two columns (heading left, text right)" },
      anchor: { type: "text", label: "Section id for links like #this (optional)", max: 40, pattern: "[a-z0-9-]*", patternHint: "lowercase letters, numbers and hyphens" },
      hidden: HIDE_FIELD,
    },
  },
  PageClosing: {
    label: "Closing card",
    fields: {
      label: { type: "text", label: "Small label", max: 60 },
      title: { type: "text", label: "Heading", max: 160 },
      lede: { type: "textarea", label: "Text", max: 400 },
      actions: ACTIONS_FIELD,
      note: { type: "text", label: "Small note under the buttons (empty hides it)", max: 200 },
      hidden: HIDE_FIELD,
    },
  },
  PageBar: {
    label: "Facts bar",
    fields: {
      facts: { type: "list", label: "Facts (three read best)", max: 4, item: { text: { type: "text", label: "Fact", max: 60 } } },
      statement: { type: "text", label: "Statement", max: 120 },
      hidden: HIDE_FIELD,
    },
  },
  PageIdeas: {
    label: "Idea cards",
    fields: {
      label: { type: "text", label: "Small label", max: 60 },
      title: { type: "text", label: "Heading", max: 160 },
      lede: { type: "textarea", label: "Intro", max: 400 },
      items: {
        type: "list",
        label: "Cards",
        max: 10,
        item: { term: { type: "text", label: "Card title", max: 80 }, copy: { type: "textarea", label: "Card text", max: 400 }, icon: { type: "select", label: "Icon", options: ICON_KEYS } },
      },
      layout: { type: "select", label: "Layout", options: ["grid", "fill", "rail"] },
      autoRotate: { type: "toggle", label: "Rail turns by itself" },
      railLabel: { type: "text", label: "What the cards are, for screen readers (rail only)", max: 40 },
      hidden: HIDE_FIELD,
    },
  },
  PageFaq: {
    label: "Questions and answers",
    description: "Google also reads these questions and answers from the page.",
    fields: {
      label: { type: "text", label: "Small label", max: 60 },
      title: { type: "text", label: "Heading", max: 120 },
      faqs: { type: "list", label: "Questions", max: 20, item: { q: { type: "text", label: "Question", max: 200 }, a: { type: "textarea", label: "Answer", max: 1200 } } },
      actions: ACTIONS_FIELD,
      hidden: HIDE_FIELD,
    },
  },
  FilmsPreview: {
    label: "Films preview (first three of the Film library)",
    fields: {
      label: { type: "text", label: "Small label", max: 60 },
      title: { type: "text", label: "Heading", max: 160 },
      lede: { type: "textarea", label: "Text", max: 400 },
      cta: { type: "text", label: "Button text", max: 60 },
      hidden: HIDE_FIELD,
    },
  },
  FilmReel: {
    label: "Film reel (from the Film library)",
    description: "Shows every film in the Film library. Edit the films there.",
    fields: { hidden: HIDE_FIELD },
  },
} as const;
