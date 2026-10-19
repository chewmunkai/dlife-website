import React, { type ComponentType, type ReactNode } from "react";
import { asset, link } from "../../lib/asset";
import { WA } from "../../lib/contact";
import { Icon } from "../home/icons";
import { Rich } from "../home/rich";
import { Markdown } from "./md";

/*
 * Talous CMS's general-purpose blocks (docs/08-elementor-feature-map.md in
 * talous-cms): the Elementor-style kit for pages built in the CMS. Every
 * control is a choice from the site's design tokens — tones are the site's
 * own light/sand/dark schemes, sizes step through its type scale, spacing
 * uses its section rhythm — so any combination stays on-brand and holds at
 * 375px. Styles: styles/kit.css.
 *
 * Containers (Section, Columns) receive their slots as components: Puck
 * passes `content`, `col1`… as renderable zones, both in the editor and in
 * <Render> on the live site.
 */

type Slot = ComponentType<{ className?: string }>;
type Common = { show?: string };

/** Device visibility, on every block. */
const showClass = (show?: string) => (show === "desktop" ? " tk-desktop-only" : show === "mobile" ? " tk-mobile-only" : "");

export function Section({ tone, width, spacing, align, anchor, show, content: Content }: Common & {
  tone?: string;
  width?: string;
  spacing?: string;
  align?: string;
  anchor?: string;
  content?: Slot;
}) {
  const scheme = tone === "dark" ? " dark" : tone === "sand" ? " sand" : "";
  return (
    <section
      id={anchor || undefined}
      className={`tk-section${scheme} tk-w-${width || "normal"} tk-sp-${spacing || "normal"} tk-al-${align || "left"}${showClass(show)}`}
    >
      <div className="tk-inner">{Content ? <Content className="tk-flow" /> : null}</div>
    </section>
  );
}

const LAYOUTS: Record<string, number> = { "1-1": 2, "1-2": 2, "2-1": 2, "1-1-1": 3, "1-1-1-1": 4 };

export function Columns({ layout, gap, valign, mobile, show, col1: C1, col2: C2, col3: C3, col4: C4 }: Common & {
  layout?: string;
  gap?: string;
  valign?: string;
  mobile?: string;
  col1?: Slot;
  col2?: Slot;
  col3?: Slot;
  col4?: Slot;
}) {
  const l = layout && LAYOUTS[layout] ? layout : "1-1";
  const cols = [C1, C2, C3, C4].slice(0, LAYOUTS[l]);
  return (
    <div className={`tk-cols tk-l-${l} tk-gap-${gap || "normal"} tk-va-${valign || "top"}${mobile === "reverse" ? " tk-m-reverse" : ""}${showClass(show)}`}>
      {cols.map((Col, i) => (
        <div className="tk-col" key={i}>
          {Col ? <Col className="tk-flow" /> : null}
        </div>
      ))}
    </div>
  );
}

export function Heading({ eyebrow, text, level, size, align, show }: Common & {
  eyebrow?: string;
  text?: string;
  level?: string;
  size?: string;
  align?: string;
}) {
  const Tag = (level === "h3" ? "h3" : "h2") as "h2" | "h3";
  return (
    <div className={`tk-heading tk-size-${size || "l"}${align && align !== "inherit" ? ` tk-al-${align}` : ""}${showClass(show)}`}>
      {eyebrow && <span className="lb">{eyebrow}</span>}
      <Tag>
        <Rich text={text} />
      </Tag>
    </div>
  );
}

export function Text({ body, size, align, show }: Common & { body?: string; size?: string; align?: string }) {
  return (
    <div className={`tk-text${size === "large" ? " tk-text-l" : ""}${align && align !== "inherit" ? ` tk-al-${align}` : ""}${showClass(show)}`}>
      <Markdown text={body} />
    </div>
  );
}

const RATIOS: Record<string, string | undefined> = { original: undefined, "4:3": "4 / 3", "16:9": "16 / 9", "1:1": "1 / 1", "4:5": "4 / 5", "3:4": "3 / 4" };

export function Image({ photo, photoAlt, ratio, caption, show }: Common & { photo?: string; photoAlt?: string; ratio?: string; caption?: string }) {
  if (!photo) return <div className={`tk-image tk-empty${showClass(show)}`}>Choose a photo</div>;
  const aspect = RATIOS[ratio || "original"];
  return (
    <figure className={`tk-image${showClass(show)}`}>
      <div className="tk-frame" style={aspect ? { aspectRatio: aspect } : undefined}>
        <img src={asset(photo)} alt={photoAlt || ""} loading="lazy" decoding="async" className={aspect ? "tk-cover" : undefined} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function Button({ label, action, page, url, style, align, show }: Common & {
  label?: string;
  action?: string;
  page?: string;
  url?: string;
  style?: string;
  align?: string;
}) {
  const cls = `pill${style === "ghost" ? " ghost" : ""}`;
  const inner = <span>{label || "Button"}</span>;
  let el: ReactNode;
  // WhatsApp buttons use the site's contact routing (data-wa), like every other WhatsApp action on the site.
  if (action === "whatsapp") el = <a className={cls} data-wa={WA.advisor} href="#">{inner}</a>;
  else if (action === "link" && url && /^https:\/\//.test(url)) el = <a className={cls} href={url} target="_blank" rel="noopener noreferrer">{inner}</a>;
  else el = <a className={cls} href={link(page || "/")}>{inner}</a>;
  return <div className={`tk-button tk-al-${align || "inherit"}${showClass(show)}`}>{el}</div>;
}

export function Spacer({ size, show }: Common & { size?: string }) {
  return <div className={`tk-spacer tk-sp-${size || "m"}${showClass(show)}`} aria-hidden="true" />;
}

export function Divider({ width, show }: Common & { width?: string }) {
  return <hr className={`tk-divider tk-dw-${width || "full"}${showClass(show)}`} />;
}

export function IconList({ items, layout, show }: Common & { items?: { id?: string; icon?: string; text?: string }[]; layout?: string }) {
  return (
    <ul className={`tk-iconlist${layout === "inline" ? " tk-inline" : ""}${showClass(show)}`}>
      {(items ?? []).map((it, i) => (
        <li key={it.id ?? i}>
          <Icon name={it.icon} />
          <span>{it.text}</span>
        </li>
      ))}
    </ul>
  );
}

/** YouTube and Vimeo only (the CMS enforces the pattern too), embedded without tracking cookies where possible. */
function embedUrl(url?: string): string | null {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?dnt=1`;
  return null;
}

export function Video({ url, title, caption, show }: Common & { url?: string; title?: string; caption?: string }) {
  const src = embedUrl(url);
  return (
    <figure className={`tk-video${showClass(show)}`}>
      <div className="tk-frame" style={{ aspectRatio: "16 / 9" }}>
        {src ? (
          <iframe src={src} title={title || "Video"} loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
        ) : (
          <div className="tk-empty">Paste a YouTube or Vimeo link</div>
        )}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** <details>, so it opens and closes with no script and is accessible by default. */
export function Accordion({ items, show }: Common & { items?: { id?: string; q?: string; a?: string }[] }) {
  return (
    <div className={`tk-accordion${showClass(show)}`}>
      {(items ?? []).map((it, i) => (
        <details key={it.id ?? i}>
          <summary>{it.q}</summary>
          <div className="tk-a">
            <Markdown text={it.a} />
          </div>
        </details>
      ))}
    </div>
  );
}

export function Quote({ quote, name, role, photo, photoAlt, show }: Common & { quote?: string; name?: string; role?: string; photo?: string; photoAlt?: string }) {
  return (
    <figure className={`tk-quote${showClass(show)}`}>
      <blockquote>
        <p>{quote}</p>
      </blockquote>
      {(name || role || photo) && (
        <figcaption>
          {photo && <img src={asset(photo)} alt={photoAlt || ""} loading="lazy" decoding="async" />}
          <span>
            {name && <b>{name}</b>}
            {role && <em>{role}</em>}
          </span>
        </figcaption>
      )}
    </figure>
  );
}

export function Stats({ items, show }: Common & { items?: { id?: string; figure?: string; label?: string }[] }) {
  return (
    <div className={`tk-stats${showClass(show)}`}>
      {(items ?? []).map((it, i) => (
        <div key={it.id ?? i}>
          <b>{it.figure}</b>
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Block type → component, for the studio and for the live site's <Render>. */
export const KIT = { Section, Columns, Heading, Text, Image, Button, Spacer, Divider, IconList, Video, Accordion, Quote, Stats } as const;
export const KIT_TYPES = Object.keys(KIT) as (keyof typeof KIT)[];
/** What goes inside a Section, and inside a column (no containers in columns: keeps pages to three levels). */
export const KIT_IN_SECTION = ["Columns", "Heading", "Text", "Image", "Button", "Spacer", "Divider", "IconList", "Video", "Accordion", "Quote", "Stats"];
export const KIT_IN_COLUMN = ["Heading", "Text", "Image", "Button", "Spacer", "Divider", "IconList", "Video", "Accordion", "Quote", "Stats"];
