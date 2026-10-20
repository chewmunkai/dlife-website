import type { Qa } from "../../components/blocks/Faq";
import type { HeroProps } from "../../components/home/Hero";
import { HOME_FAQS } from "../home";
import { ICON_NAMES } from "../../components/home/icons";
import { ALL_ROUTES, ROUTES } from "../../lib/routes";
import { KIT_BLOCKS, LANDING_STARTER } from "./kit-manifest";
import { FILM_LIBRARY_BLOCK, FILM_MEDIA, FILMS_DOCUMENT } from "./films";
import {
  LINK_OPTIONS,
  PATH_DEFAULTS,
  TRUST_DEFAULTS,
  NEEDS_DEFAULTS,
  POLICY_DEFAULTS,
  FOUNDER_DEFAULTS,
  STORIES_DEFAULTS,
  CAREERS_DEFAULTS,
  DVA_DEFAULTS,
  YOUTH_DEFAULTS,
  CLOSE_DEFAULTS,
} from "./home-content";

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
  version: "dlife-2026-10-20.4",
  blocks: {
    // The site-wide film list (content/cms/films.ts): a library page, not a section of one.
    FilmLibrary: FILM_LIBRARY_BLOCK,
    // The general-purpose kit for pages built in the CMS (docs/08 in talous-cms).
    ...KIT_BLOCKS,
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
    // Every section's words and photos are editable. Limits are sized to the design: roughly the
    // current text plus a third, so a line can grow without breaking the layout at 375px.
    Path: {
      label: "Find your path",
      fields: {
        question: { type: "text", label: "Question", required: true, max: 40 },
        items: {
          type: "list",
          label: "Buttons",
          min: 3,
          max: 6,
          item: {
            icon: { type: "select", label: "Icon", required: true, options: ICON_NAMES },
            label: { type: "text", label: "Button text", required: true, max: 28 },
            href: { type: "select", label: "Opens page", required: true, options: LINK_OPTIONS },
          },
        },
        hidden: HIDDEN,
      },
    },
    Trust: {
      label: "Trust figures",
      fields: {
        items: {
          type: "list",
          label: "Cards (figures must be verified with the client before changing)",
          min: 6,
          max: 6,
          item: {
            icon: { type: "select", label: "Icon", required: true, options: ICON_NAMES },
            figure: { type: "text", label: "Figure", required: true, max: 28 },
            label: { type: "text", label: "Label", required: true, max: 28 },
            copy: { type: "textarea", label: "Text", required: true, max: 260 },
          },
        },
        hidden: HIDDEN,
      },
    },
    Needs: {
      label: "Life needs",
      fields: {
        eyebrow: { type: "text", label: "Eyebrow", required: true, max: 40 },
        heading: { type: "text", label: "Heading (*italic*)", required: true, max: 60 },
        sub: { type: "textarea", label: "Line beside the heading", required: true, max: 120 },
        ctaLabel: { type: "text", label: "Card link text", required: true, max: 20 },
        items: {
          type: "list",
          label: "Cards (the mosaic is designed for five)",
          min: 5,
          max: 5,
          item: {
            photo: { type: "image", label: "Photo", required: true },
            photoAlt: { type: "text", label: "Photo description", required: true, max: 160 },
            title: { type: "text", label: "Title", required: true, max: 36 },
            copy: { type: "textarea", label: "Text", required: true, max: 90 },
            href: { type: "select", label: "Opens page", required: true, options: LINK_OPTIONS },
          },
        },
        hidden: HIDDEN,
      },
    },
    Policy: {
      label: "Policy review",
      fields: {
        eyebrow: { type: "text", label: "Eyebrow", required: true, max: 40 },
        heading: { type: "text", label: "Heading (*italic*)", required: true, max: 60 },
        body: { type: "textarea", label: "Text", required: true, max: 260 },
        ctaLabel: { type: "text", label: "Button (opens WhatsApp)", required: true, max: 32 },
        photo: { type: "image", label: "Photo", required: true },
        photoAlt: { type: "text", label: "Photo description", required: true, max: 160 },
        photoSide: { type: "select", label: "Photo side (desktop)", options: ["right", "left"] },
        hidden: HIDDEN,
      },
    },
    Founder: {
      label: "Founders",
      fields: {
        eyebrow: { type: "text", label: "Eyebrow", required: true, max: 40 },
        heading: { type: "text", label: "Heading", required: true, max: 60 },
        body: { type: "textarea", label: "Text (**bold** for names)", required: true, max: 400 },
        linkLabel: { type: "text", label: "Link to About page", required: true, max: 30 },
        photo1: { type: "image", label: "Left portrait (4:5)", required: true },
        photo1Alt: { type: "text", label: "Left portrait description", required: true, max: 160 },
        photo2: { type: "image", label: "Right portrait (4:5)", required: true },
        photo2Alt: { type: "text", label: "Right portrait description", required: true, max: 160 },
        hidden: HIDDEN,
      },
    },
    Stories: {
      label: "Stories (films)",
      fields: {
        eyebrow: { type: "text", label: "Eyebrow", required: true, max: 40 },
        heading: { type: "text", label: "Heading (*italic*)", required: true, max: 60 },
        ctaLabel: { type: "text", label: "Button to all stories", required: true, max: 30 },
        hidden: HIDDEN,
      },
    },
    Careers: {
      label: "Careers",
      fields: {
        eyebrow: { type: "text", label: "Eyebrow", required: true, max: 40 },
        heading: { type: "text", label: "Heading (*italic*)", required: true, max: 70 },
        quote: { type: "textarea", label: "Advisor quote", required: true, max: 160 },
        quoteBy: { type: "text", label: "Quote by", required: true, max: 40 },
        ctaLabel: { type: "text", label: "Button (opens WhatsApp)", required: true, max: 36 },
        moreLabel: { type: "text", label: "Link to Careers page", required: true, max: 36 },
        hidden: HIDDEN,
      },
    },
    Dva: {
      label: "DVA",
      fields: {
        eyebrow: { type: "text", label: "Eyebrow", required: true, max: 30 },
        heading: { type: "text", label: "Heading", required: true, max: 50 },
        body: { type: "textarea", label: "Text", required: true, max: 140 },
        ctaLabel: { type: "text", label: "Button to DVA page", required: true, max: 30 },
        photo: { type: "image", label: "Background photo (wide, about 16:9)", required: true },
        photoAlt: { type: "text", label: "Photo description", required: true, max: 160 },
        hidden: HIDDEN,
      },
    },
    Youth: {
      label: "Youth Community",
      fields: {
        eyebrow: { type: "text", label: "Eyebrow", required: true, max: 30 },
        heading: { type: "text", label: "Heading", required: true, max: 40 },
        sup: { type: "text", label: "Tagline", required: true, max: 60 },
        intro: { type: "textarea", label: "Intro", required: true, max: 200 },
        cards: {
          type: "list",
          label: "Cards (the grid is designed for three)",
          min: 3,
          max: 3,
          item: {
            photo: { type: "image", label: "Photo (4:3)", required: true },
            photoAlt: { type: "text", label: "Photo description", required: true, max: 160 },
            title: { type: "text", label: "Title", required: true, max: 36 },
            copy: { type: "textarea", label: "Text", required: true, max: 90 },
            ctaLabel: { type: "text", label: "Link text", required: true, max: 24 },
            href: { type: "select", label: "Opens page", required: true, options: LINK_OPTIONS },
          },
        },
        loopTitle: { type: "text", label: "Newsletter heading", required: true, max: 40 },
        loopBody: { type: "textarea", label: "Newsletter text", required: true, max: 160 },
        consent: { type: "textarea", label: "Consent line (pending client confirmation)", required: true, max: 160 },
        hidden: HIDDEN,
      },
    },
    Close: {
      label: "Closing",
      fields: {
        eyebrow: { type: "text", label: "Eyebrow", required: true, max: 30 },
        heading: { type: "text", label: "Heading (*italic*)", required: true, max: 70 },
        sub: { type: "text", label: "Tagline (matches the logo lockup)", required: true, max: 40 },
        primaryCta: { type: "text", label: "Main button (opens WhatsApp)", required: true, max: 30 },
        secondaryCta: { type: "text", label: "Second button (scrolls to pathways)", required: true, max: 30 },
        photo: { type: "image", label: "Background photo", required: true },
        photoAlt: { type: "text", label: "Photo description", required: true, max: 160 },
        hidden: HIDDEN,
      },
    },
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
    // Each section exactly once; staff can reorder and hide them. The hero can't be hidden (it is the page's h1).
    home: { fixed: ["Hero", "Path", "Trust", "Needs", "Policy", "Founder", "Stories", "Careers", "Dva", "Youth", "Faq", "Close"], anyOrder: true },
    // Pages staff and clients create in the CMS: sections at the top, the kit inside them.
    landing: { label: "Landing page", creatable: true, allowed: ["Section"], starter: LANDING_STARTER },
    // Not a web page: the films every page that shows films reads from.
    films: { label: "Film library", fixed: ["FilmLibrary"], library: true },
  },
  // The photographs a field may use. Alt text is the default description; editors can override it.
  media: [
    { src: "/media/img/hero-team-ivory.jpg", alt: "The D’Life team together" },
    { src: "/media/img/dva-award-night-v2.jpg", alt: "D’Life advisors together at the DVA award night" },
    { src: "/media/img/youth-resources-v2.jpg", alt: "A presenter leading a workshop, participants seated around tables" },
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
    { src: "/media/img/path-career.jpg", alt: "Looking out over the trees, weighing what’s next" },
    { src: "/media/img/need-legacy-card.jpg", alt: "A family looking through old photographs and documents together" },
    { src: "/media/img/founder-sharon.jpg", alt: "Sharon Cheang, founder of D’Life" },
    { src: "/media/img/founder-rachel.jpg", alt: "Rachel Cheang, co-founder of D’Life" },
    { src: "/media/img/youth-session.jpg", alt: "Attendees seated at a D’Life Youth Community session" },
    { src: "/media/img/youth-resources.jpg", alt: "Hands raised during a workshop session" },
    { src: "/media/img/dva-forum.jpg", alt: "A DVA forum in session" },
    // The thirteen films and their posters (content/videos.ts).
    ...FILM_MEDIA,
    // 12 Oct 2026: the life-need cards and the Policy panel use the pages' own hero photographs.
    { src: "/media/img/solutions/protecting-family/family-meal.jpg", alt: "Three generations of a family sharing a meal at home" },
    { src: "/media/img/solutions/protecting-income/need-income-malaysia.jpg", alt: "An advisor going through the household’s figures with a couple" },
    { src: "/media/img/solutions/medical-health/family-doctor-consultation.jpg", alt: "Two family members in consultation with a doctor" },
    { src: "/media/img/solutions/planning-for-your-future/advisor-planning.jpg", alt: "An advisor and a young man starting a plan together at a table" },
    { src: "/media/img/solutions/wealth-legacy/family-photos.jpg", alt: "A family looking through photographs and albums together" },
    { src: "/media/img/eps-hero-advisor.jpg", alt: "An advisor talking a client through his policy schedule at a table" },
  ],
  seo: {
    titleMax: 70,
    descriptionMax: 170,
    // What the homepage shows when its CMS settings are empty (app/page.tsx), for the CMS's Google preview.
    defaults: { home: { title: "D’Life · Real Support. Beyond the Policy.", description: ROUTES.home.description } },
  },
  // New CMS pages can't take these addresses: they belong to pages built in code.
  reservedSlugs: [...new Set(ALL_ROUTES.map((r) => r.path.split("/")[1]).filter(Boolean)), "studio", "api", "media", "_next"],
} as const;

export type ManifestBlock = { label?: string; locked?: boolean; fields: Record<string, ManifestField> };
export type ManifestTemplate = { fixed?: readonly string[]; anyOrder?: boolean; allowed?: readonly string[]; label?: string; creatable?: boolean };

export type ManifestField =
  | { type: "text" | "textarea"; label?: string; required?: boolean; max?: number; pattern?: string; patternHint?: string }
  | { type: "slot"; label?: string; allow?: readonly string[]; max?: number }
  | { type: "select"; label?: string; required?: boolean; options: readonly string[] }
  | { type: "toggle"; label?: string }
  | { type: "image"; label?: string; required?: boolean }
  | { type: "video"; label?: string; required?: boolean }
  | { type: "list"; label?: string; min?: number; max?: number; item: Record<string, ManifestField> };

/* ---------- the homepage as it ships today, as a CMS document ---------- */

export const HERO_DEFAULTS: HeroProps = {
  label: "D’Life · Financial Advisory",
  headline: "Real Support.",
  headlineItalic: "Beyond the Policy.",
  lede: "Protection is only the beginning. D’Life brings real guidance, long-term relationships and support through life’s changes.",
  primaryCta: "Speak with an Advisor",
  secondaryCta: "Find your path",
  // 6 Oct 2026, client: the 27-strong team in ivory (same 4:3 as the plate).
  photo: "/media/img/hero-team-ivory.jpg",
  photoAlt: "The D’Life team together",
};

export const FAQ_DEFAULTS: { label: string; items: Qa[] } = { label: "Helpful answers", items: HOME_FAQS };

/** Stable ids: the CMS addresses sections, list items and questions by these. */
const withIds = <T extends Record<string, unknown>>(prefix: string, items: T[]) => items.map((it, i) => ({ id: `${prefix}-${i + 1}`, ...it }));
const block = (type: string, props: Record<string, unknown>) => ({ type, props: { id: `home-${type.toLowerCase()}`, ...props } });

/** The approved sequence, as it ships. lib/talous.ts uses it to put back any section the CMS is missing. */
export const HOME_DOCUMENT: { root: { props: Record<string, never> }; content: { type: string; props: { id: string } & Record<string, unknown> }[] } = {
  root: { props: {} },
  content: [
    block("Hero", HERO_DEFAULTS),
    block("Path", { ...PATH_DEFAULTS, items: withIds("path", PATH_DEFAULTS.items) }),
    block("Trust", { ...TRUST_DEFAULTS, items: withIds("trust", TRUST_DEFAULTS.items) }),
    block("Needs", { ...NEEDS_DEFAULTS, items: withIds("need", NEEDS_DEFAULTS.items) }),
    block("Policy", POLICY_DEFAULTS),
    block("Founder", FOUNDER_DEFAULTS),
    block("Stories", STORIES_DEFAULTS),
    block("Careers", CAREERS_DEFAULTS),
    block("Dva", DVA_DEFAULTS),
    block("Youth", { ...YOUTH_DEFAULTS, cards: withIds("youth", YOUTH_DEFAULTS.cards) }),
    { type: "Faq", props: { id: "home-faq", label: FAQ_DEFAULTS.label, items: HOME_FAQS.map((qa, i) => ({ id: `faq-${i + 1}`, ...qa })) } },
    block("Close", CLOSE_DEFAULTS),
  ],
};

/** The film library as it ships, for the CMS to import on its first sync. */
export { FILMS_DOCUMENT };
