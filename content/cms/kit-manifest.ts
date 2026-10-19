import { ICON_NAMES } from "../../components/home/icons";
import { KIT_IN_COLUMN, KIT_IN_SECTION } from "../../components/kit/blocks";
import { LINK_OPTIONS } from "./home-content";

/*
 * Field definitions for the kit blocks (components/kit/blocks.tsx). Every
 * style control is a fixed list of the design's own options.
 */

const SHOW = { type: "select", label: "Show on", options: ["all", "desktop", "mobile"] } as const;
const ALIGN = { type: "select", label: "Alignment", options: ["inherit", "left", "center", "right"] } as const;

export const KIT_BLOCKS = {
  Section: {
    label: "Section",
    fields: {
      tone: { type: "select", label: "Background", options: ["light", "sand", "dark"] },
      width: { type: "select", label: "Content width", options: ["narrow", "normal", "wide", "full"] },
      spacing: { type: "select", label: "Space above & below", options: ["compact", "normal", "spacious"] },
      align: { type: "select", label: "Text alignment", options: ["left", "center"] },
      anchor: { type: "text", label: "Anchor name (for #links, optional)", max: 40, pattern: "[a-z0-9]+(-[a-z0-9]+)*", patternHint: "use lowercase letters, numbers and hyphens" },
      content: { type: "slot", label: "Content", allow: KIT_IN_SECTION, max: 24 },
      show: SHOW,
    },
  },
  Columns: {
    label: "Columns",
    fields: {
      layout: { type: "select", label: "Layout", options: ["1-1", "1-2", "2-1", "1-1-1", "1-1-1-1"] },
      gap: { type: "select", label: "Gap", options: ["small", "normal", "large"] },
      valign: { type: "select", label: "Vertical alignment", options: ["top", "center", "bottom"] },
      mobile: { type: "select", label: "On phones", options: ["stack", "reverse"] },
      col1: { type: "slot", label: "Column 1", allow: KIT_IN_COLUMN, max: 12 },
      col2: { type: "slot", label: "Column 2", allow: KIT_IN_COLUMN, max: 12 },
      col3: { type: "slot", label: "Column 3 (3- and 4-column layouts)", allow: KIT_IN_COLUMN, max: 12 },
      col4: { type: "slot", label: "Column 4 (4-column layout)", allow: KIT_IN_COLUMN, max: 12 },
      show: SHOW,
    },
  },
  Heading: {
    label: "Heading",
    fields: {
      eyebrow: { type: "text", label: "Eyebrow (optional)", max: 50 },
      text: { type: "text", label: "Heading (*italic*)", required: true, max: 120 },
      level: { type: "select", label: "Level (h2 for sections, h3 inside)", options: ["h2", "h3"] },
      size: { type: "select", label: "Size", options: ["s", "m", "l", "xl"] },
      align: ALIGN,
      show: SHOW,
    },
  },
  Text: {
    label: "Text",
    fields: {
      body: { type: "textarea", label: "Text (**bold**, *italic*, [link](/page), - bullets)", required: true, max: 4000 },
      size: { type: "select", label: "Size", options: ["normal", "large"] },
      align: ALIGN,
      show: SHOW,
    },
  },
  Image: {
    label: "Image",
    fields: {
      photo: { type: "image", label: "Photo", required: true },
      photoAlt: { type: "text", label: "Photo description", required: true, max: 160 },
      ratio: { type: "select", label: "Shape (cropping)", options: ["original", "4:3", "16:9", "1:1", "4:5", "3:4"] },
      caption: { type: "text", label: "Caption (optional)", max: 160 },
      show: SHOW,
    },
  },
  Button: {
    label: "Button",
    fields: {
      label: { type: "text", label: "Text", required: true, max: 36 },
      action: { type: "select", label: "Opens", options: ["page", "whatsapp", "link"] },
      page: { type: "select", label: "Page (when it opens a page)", options: LINK_OPTIONS },
      url: { type: "text", label: "Web address (when it opens a link)", max: 300, pattern: "https://\\S+", patternHint: "must start with https://" },
      style: { type: "select", label: "Style", options: ["primary", "ghost"] },
      align: ALIGN,
      show: SHOW,
    },
  },
  Spacer: { label: "Spacer", fields: { size: { type: "select", label: "Size", options: ["s", "m", "l", "xl"] }, show: SHOW } },
  Divider: { label: "Divider", fields: { width: { type: "select", label: "Width", options: ["full", "short"] }, show: SHOW } },
  IconList: {
    label: "Icon list",
    fields: {
      items: {
        type: "list",
        label: "Items",
        min: 1,
        max: 12,
        item: {
          icon: { type: "select", label: "Icon", required: true, options: ICON_NAMES },
          text: { type: "text", label: "Text", required: true, max: 140 },
        },
      },
      layout: { type: "select", label: "Layout", options: ["list", "inline"] },
      show: SHOW,
    },
  },
  Video: {
    label: "Video",
    fields: {
      url: {
        type: "text",
        label: "YouTube or Vimeo link",
        required: true,
        max: 300,
        pattern: "https://(www\\.)?(youtube\\.com/(watch\\?v=|shorts/)|youtu\\.be/|vimeo\\.com/)\\S+",
        patternHint: "must be a YouTube or Vimeo link",
      },
      title: { type: "text", label: "Title (for screen readers)", required: true, max: 100 },
      caption: { type: "text", label: "Caption (optional)", max: 160 },
      show: SHOW,
    },
  },
  Accordion: {
    label: "Accordion",
    fields: {
      items: {
        type: "list",
        label: "Items",
        min: 1,
        max: 20,
        item: {
          q: { type: "text", label: "Title", required: true, max: 160 },
          a: { type: "textarea", label: "Content", required: true, max: 1500 },
        },
      },
      show: SHOW,
    },
  },
  Quote: {
    label: "Quote",
    fields: {
      quote: { type: "textarea", label: "Quote", required: true, max: 400 },
      name: { type: "text", label: "Name", max: 60 },
      role: { type: "text", label: "Role", max: 80 },
      photo: { type: "image", label: "Photo (optional)" },
      photoAlt: { type: "text", label: "Photo description", max: 160 },
      show: SHOW,
    },
  },
  Stats: {
    label: "Stats",
    fields: {
      items: {
        type: "list",
        label: "Figures (verify with the client)",
        min: 1,
        max: 4,
        item: {
          figure: { type: "text", label: "Figure", required: true, max: 20 },
          label: { type: "text", label: "Label", required: true, max: 60 },
        },
      },
      show: SHOW,
    },
  },
} as const;

/** A new landing page starts with one section, so it's never a blank screen. */
export const LANDING_STARTER = {
  root: { props: {} },
  content: [
    {
      type: "Section",
      props: {
        id: "section-1",
        tone: "light",
        width: "normal",
        spacing: "spacious",
        align: "left",
        content: [
          { type: "Heading", props: { id: "heading-1", eyebrow: "D’Life", text: "A new page *title*", level: "h2", size: "xl", align: "inherit" } },
          { type: "Text", props: { id: "text-1", body: "Write the introduction here. Use **bold** and *italic*, or add a [link](/contact).", size: "large", align: "inherit" } },
        ],
      },
    },
  ],
};
