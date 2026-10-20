import { HIDE_FIELD } from "../define";
import { ICON_KEYS } from "../../../components/pages/common";
import { HREF, TONES } from "./common";

/*
 * Talous CMS fields for the sections in components/pages/sections.tsx (DVA, About, Youth
 * Community, the solution pages). Written out, like COMMON_BLOCKS, so a section edits the same
 * way on every page that has it.
 */

const LABEL = { type: "text", label: "Small label", max: 60 } as const;
const HEADING = { type: "text", label: "Heading (*words* in stars become italic)", max: 160 } as const;
const INTRO = { type: "textarea", label: "Intro", max: 600 } as const;
const ANCHOR = { type: "text", label: "Section id for links like #this (optional)", max: 40, pattern: "[a-z0-9-]*", patternHint: "lowercase letters, numbers and hyphens" } as const;
const ICON = { type: "select", label: "Icon", options: ICON_KEYS } as const;
const sessions = (n: number) => ({
  type: "list",
  label: `Tier ${n}: sessions`,
  max: 8,
  item: { name: { type: "text", label: "Session", max: 80 }, copy: { type: "textarea", label: "Description", max: 300 } },
}) as const;

export const SECTION_BLOCKS = {
  PageStatement: {
    label: "Opening statement",
    fields: {
      kick: { type: "text", label: "Small label beside it", max: 60 },
      lead: { type: "textarea", label: "Statement (its first sentence is set large, the rest beside it)", max: 400 },
      prose: { type: "textarea", label: "Paragraphs (a blank line between paragraphs; [words](/page) makes a link)", max: 3000 },
      hidden: HIDE_FIELD,
    },
  },
  PageCreed: {
    label: "Principles panel",
    fields: {
      label: LABEL,
      title: HEADING,
      lede: INTRO,
      items: { type: "list", label: "Principles", max: 6, item: { term: { type: "text", label: "Principle", max: 60 }, copy: { type: "textarea", label: "Text", max: 300 }, icon: ICON } },
      hidden: HIDE_FIELD,
    },
  },
  PageIndex: {
    label: "Numbered list",
    fields: {
      label: LABEL,
      title: HEADING,
      items: { type: "list", label: "Items", max: 12, item: { title: { type: "text", label: "Item", max: 80 }, copy: { type: "textarea", label: "Text", max: 400 } } },
      hidden: HIDE_FIELD,
    },
  },
  PageYearMap: {
    label: "The year, by how often",
    description: "Three tiers; the first is set dark as the one everything else hangs on. Leave a tier empty to drop it.",
    fields: {
      label: LABEL,
      title: HEADING,
      lede: INTRO,
      tier1When: { type: "text", label: "Tier 1: how often", max: 40 },
      tier1Note: { type: "text", label: "Tier 1: note", max: 60 },
      tier1Sessions: sessions(1),
      tier2When: { type: "text", label: "Tier 2: how often", max: 40 },
      tier2Note: { type: "text", label: "Tier 2: note", max: 60 },
      tier2Sessions: sessions(2),
      tier3When: { type: "text", label: "Tier 3: how often", max: 40 },
      tier3Note: { type: "text", label: "Tier 3: note", max: 60 },
      tier3Sessions: sessions(3),
      hidden: HIDE_FIELD,
    },
  },
  PageGate: {
    label: "Stages",
    fields: {
      label: LABEL,
      title: HEADING,
      aside: { type: "textarea", label: "Note under the heading", max: 400 },
      stages: { type: "list", label: "Stages", max: 6, item: { k: { type: "text", label: "Stage label", max: 30 }, title: { type: "text", label: "Stage", max: 100 }, copy: { type: "textarea", label: "Text", max: 400 } } },
      hidden: HIDE_FIELD,
    },
  },
  PageHolds: {
    label: "Standards (dark)",
    fields: {
      label: LABEL,
      title: HEADING,
      items: { type: "list", label: "Standards", max: 8, item: { text: { type: "text", label: "Standard", max: 120 } } },
      hidden: HIDE_FIELD,
    },
  },
  PageMissionVision: {
    label: "Mission and vision",
    fields: {
      label: LABEL,
      title: HEADING,
      items: { type: "list", label: "Statements", max: 3, item: { kind: { type: "text", label: "Kind (e.g. Mission)", max: 30 }, claim: { type: "text", label: "Headline", max: 120 }, copy: { type: "textarea", label: "Text", max: 600 } } },
      hidden: HIDE_FIELD,
    },
  },
  PageProfile: {
    label: "Person",
    fields: {
      name: { type: "text", label: "Name", max: 80 },
      role: { type: "text", label: "Role", max: 60 },
      photo: { type: "image", label: "Portrait" },
      photoAlt: { type: "text", label: "Portrait description (alt text)", max: 300 },
      photoPosition: { type: "text", label: "Portrait focus, e.g. 50% 22% (optional)", max: 20 },
      prose: { type: "textarea", label: "About them (a blank line between paragraphs; [words](/page) makes a link)", max: 4000 },
      flip: { type: "toggle", label: "Portrait on the right" },
      tone: { type: "select", label: "Colour", options: ["light", "sand"] },
      hidden: HIDE_FIELD,
    },
  },
  PageSplitList: {
    label: "Photo with a list",
    fields: {
      photo: { type: "image", label: "Photo" },
      photoAlt: { type: "text", label: "Photo description (alt text)", max: 300 },
      photoRatio: { type: "text", label: "Photo shape, e.g. 4 / 3 (optional)", max: 20 },
      label: LABEL,
      title: HEADING,
      lede: INTRO,
      items: { type: "list", label: "List", max: 10, item: { text: { type: "textarea", label: "Item", max: 300 } } },
      aligned: { type: "toggle", label: "Two columns read across as rows" },
      top: { type: "toggle", label: "Photo starts level with the label" },
      tone: { type: "select", label: "Colour", options: TONES },
      anchor: ANCHOR,
      hidden: HIDE_FIELD,
    },
  },
  PageRecord: {
    label: "Record (figures)",
    fields: {
      label: LABEL,
      title: HEADING,
      lede: INTRO,
      photo: { type: "image", label: "Photo" },
      photoAlt: { type: "text", label: "Photo description (alt text)", max: 300 },
      photoRatio: { type: "text", label: "Photo shape, e.g. 4 / 3 (optional)", max: 20 },
      say: { type: "textarea", label: "Line under the photo (**bold**; a new line starts a new line)", max: 300 },
      figures: {
        type: "list",
        label: "Figures",
        max: 8,
        item: {
          fig: { type: "textarea", label: "Figure (a new line starts a new line)", max: 30 },
          word: { type: "toggle", label: "The figure is words, not a number" },
          copy: { type: "textarea", label: "What it means (**bold** for emphasis)", max: 300 },
        },
      },
      hidden: HIDE_FIELD,
    },
  },
  PageLinkCards: {
    label: "Link cards",
    fields: {
      label: LABEL,
      title: HEADING,
      items: {
        type: "list",
        label: "Cards",
        max: 4,
        item: {
          title: { type: "text", label: "Card title", max: 80 },
          copy: { type: "textarea", label: "Card text", max: 300 },
          href: HREF,
          cta: { type: "text", label: "Link text (default “Read”)", max: 40 },
          photo: { type: "image", label: "Photo (optional)" },
          photoAlt: { type: "text", label: "Photo description (alt text)", max: 300 },
          photoRatio: { type: "text", label: "Photo shape, e.g. 4 / 3 (optional)", max: 20 },
        },
      },
      columns: { type: "select", label: "Cards per row", options: ["2", "3", "4"] },
      overlay: { type: "toggle", label: "Text over the photo" },
      tone: { type: "select", label: "Colour", options: TONES },
      hidden: HIDE_FIELD,
    },
  },
  PageTrio: {
    label: "Pillars",
    fields: {
      label: LABEL,
      title: HEADING,
      items: {
        type: "list",
        label: "Pillars",
        max: 4,
        item: { title: { type: "text", label: "Pillar", max: 40 }, claim: { type: "text", label: "One line", max: 120 }, points: { type: "textarea", label: "Points (one per line)", max: 600 }, icon: ICON },
      },
      anchor: ANCHOR,
      hidden: HIDE_FIELD,
    },
  },
  PageWhoGrid: {
    label: "Who it’s for",
    fields: {
      label: LABEL,
      title: HEADING,
      lede: INTRO,
      countLabel: { type: "text", label: "Words beside the count (empty hides the count)", max: 40 },
      items: { type: "list", label: "People", max: 12, item: { who: { type: "text", label: "Who", max: 60 }, why: { type: "textarea", label: "Why", max: 200 } } },
      hidden: HIDE_FIELD,
    },
  },
  PageEvents: {
    label: "Events",
    fields: {
      label: LABEL,
      title: HEADING,
      lede: INTRO,
      events: {
        type: "list",
        label: "Events",
        max: 12,
        item: {
          when: { type: "text", label: "When", max: 40 },
          where: { type: "text", label: "Where", max: 60 },
          title: { type: "text", label: "Event", max: 80 },
          photo: { type: "image", label: "Photo" },
          photoAlt: { type: "text", label: "Photo description (alt text)", max: 300 },
          copy: { type: "textarea", label: "Description", max: 400 },
        },
      },
      cta: { type: "text", label: "Card button text (default “Ask about dates”)", max: 40 },
      ctaHref: { ...HREF, label: "Card button goes to (default wa:event)" },
      anchor: ANCHOR,
      hidden: HIDE_FIELD,
    },
  },
  PageSignup: {
    label: "Sign-up card",
    description: "The form itself isn't connected to a mailing list yet: on submit it says so and points to WhatsApp and email.",
    fields: { label: LABEL, title: HEADING, lede: INTRO, anchor: ANCHOR, hidden: HIDE_FIELD },
  },
} as const;
