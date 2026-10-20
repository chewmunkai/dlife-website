import type { ReactNode } from "react";
import { Band, Bar, ClosingCard, Hero, IdeaCards, Ideas, StoriesPreview, type CardLayout, type Tone } from "../v2/blocks";
import Ask from "../v2/Ask";
import type { IconKey } from "../v2/icons";
import StoryReel from "../v2/StoryReel";
import { Rich } from "../home/rich";
import { Markdown } from "../kit/md";
import { link } from "../../lib/asset";
import { WA, waHref } from "../../lib/contact";
import type { Route } from "../../lib/routes";
import type { Video } from "../../content/videos";

/*
 * Sections the inner pages share, as Talous CMS edits them (content/cms/define.ts): flat props,
 * every word and photo a prop. Each page passes its own copy as the defaults in its document,
 * so one "Page hero" serves every page. The markup is the shared blocks' own (components/v2).
 */

/** A button's address: a page ("/careers"), an anchor ("#films"), a WhatsApp topic ("wa:career"),
 *  a phone or email ("tel:", "mailto:") or a full https address. */
export function hrefOf(href = "#"): string {
  if (href.startsWith("wa:")) return waHref(WA[href.slice(3) as keyof typeof WA] ?? WA.conversation);
  if (href.startsWith("/")) return link(href);
  return href;
}

/** The WhatsApp topics and the button styles a CMS editor can pick from. */
export const WA_TOPICS = Object.keys(WA).map((k) => `wa:${k}`);
export const PILL_STYLES = ["pill", "pill sand", "pill ghost"] as const;

export type Action = { id?: string; label?: string; href?: string; style?: string };

export function Actions({ items }: { items?: Action[] }) {
  return (
    <>
      {(items ?? []).map((a, i) => (
        <a key={a.id ?? i} className={a.style || "pill"} href={hrefOf(a.href)}>
          <span>{a.label}</span>
        </a>
      ))}
    </>
  );
}

type Common = { route?: Route };

export function PageHero({
  route,
  label,
  title,
  lede,
  photo,
  photoAlt,
  photoPosition,
  photoRatio,
  photoFit,
  companion,
  companionAlt,
  companionPosition,
  companionFit,
  actions,
  tone,
  panel,
}: Common & {
  label?: string;
  title?: string;
  lede?: string;
  photo?: string;
  photoAlt?: string;
  photoPosition?: string;
  photoRatio?: string;
  /** "contain": the photo is matted inside the frame rather than cropped (Resources' group shot). */
  photoFit?: string;
  companion?: string;
  companionAlt?: string;
  companionPosition?: string;
  companionFit?: string;
  actions?: Action[];
  tone?: string;
  panel?: string;
}) {
  return (
    <Hero
      route={route!}
      label={label ?? ""}
      title={
        // A line break in the title is a real one: each line is its own span (DVA's two lines).
        title?.includes("\n") ? (
          <>
            {title.split("\n").map((l, i) => (
              <span key={i} className="dl-line">
                <Rich text={l} />
              </span>
            ))}
          </>
        ) : (
          <Rich text={title} />
        )
      }
      lede={lede || undefined}
      photo={photo ? { src: photo, alt: photoAlt ?? "", position: photoPosition || undefined, ratio: photoRatio || undefined, fit: photoFit === "contain" ? "contain" : undefined } : undefined}
      companionPhoto={companion ? { src: companion, alt: companionAlt ?? "", position: companionPosition || undefined, fit: companionFit === "contain" ? "contain" : undefined } : undefined}
      actions={actions?.length ? <Actions items={actions} /> : undefined}
      tone={(tone as Tone) || undefined}
      panel={(panel as "light" | "green") || undefined}
    />
  );
}

/** A heading band with an optional paragraph or two of prose (links as [text](/page)). */
export function PageBand({
  label,
  title,
  lede,
  prose,
  tone,
  read,
  anchor,
  children,
}: Common & {
  label?: string;
  title?: string;
  lede?: string;
  prose?: string;
  tone?: string;
  read?: boolean;
  anchor?: string;
  children?: ReactNode;
}) {
  return (
    <Band tone={(tone as Tone) || undefined} read={!!read} id={anchor || undefined} label={label || undefined} title={title ? <Rich text={title} /> : undefined} lede={lede || undefined}>
      {prose ? (
        <div className="dl-prose">
          <Markdown text={prose} />
        </div>
      ) : null}
      {children}
    </Band>
  );
}

export function PageClosing({
  label,
  title,
  lede,
  actions,
  note,
}: Common & { label?: string; title?: string; lede?: string; actions?: Action[]; note?: string }) {
  // Label and note fall back to the card's own defaults ("Next step", the reassurance line) only
  // when the page's copy doesn't set them; an empty note hides it, as on Stories.
  return (
    <ClosingCard
      {...(label !== undefined ? { label } : {})}
      title={<Rich text={title} />}
      lede={lede || undefined}
      actions={<Actions items={actions} />}
      {...(note !== undefined ? { note } : {})}
    />
  );
}

/** The film reel: every film in the CMS's film library (content/cms/films.ts). */
export function FilmReel({ films }: Common & { films?: Video[] }) {
  return <StoryReel items={films ?? []} />;
}

/** Three film posters linking to /stories: the first three of the Film library. */
export function FilmsPreview({ label, title, lede, cta, films }: Common & { label?: string; title?: string; lede?: string; cta?: string; films?: Video[] }) {
  return (
    <StoriesPreview
      label={label ?? ""}
      title={<Rich text={title} />}
      lede={lede || undefined}
      items={(films ?? []).slice(0, 3).map((v) => ({ poster: v.poster, focus: v.focus, title: v.title, runtime: v.runtime }))}
      href="/stories"
      {...(cta ? { cta } : {})}
    />
  );
}

/** The intent bar: three facts and a statement (Existing Policy Support, the solution pages). */
export function PageBar({ facts, statement }: Common & { facts?: { id?: string; text?: string }[]; statement?: string }) {
  return <Bar facts={(facts ?? []).map((f) => f.text ?? "")} statement={statement ?? ""} />;
}

export const ICON_KEYS: IconKey[] = ["shield", "clock", "pulse", "doc", "coins", "building", "growth", "people", "gauge", "swap", "whatsapp", "phone", "moon", "mail"];

/** Idea cards: a grid, or a rail that can rotate by itself. */
export function PageIdeas({
  label,
  title,
  lede,
  items,
  layout,
  autoRotate,
  railLabel,
}: Common & { label?: string; title?: string; lede?: string; items?: { id?: string; term?: string; copy?: string; icon?: string }[]; layout?: string; autoRotate?: boolean; railLabel?: string }) {
  const list = items ?? [];
  const icons = list.some((i) => i.icon) ? (list.map((i) => i.icon || "shield") as IconKey[]) : undefined;
  return (
    <Ideas
      label={label || undefined}
      title={<Rich text={title} />}
      lede={lede || undefined}
      items={list.map((i) => ({ term: i.term ?? "", copy: i.copy ?? "" }))}
      icons={icons}
      layout={(layout as CardLayout) || undefined}
      autoRotate={!!autoRotate}
      {...(railLabel ? { railLabel } : {})}
    />
  );
}

/** Questions and answers (opens one at a time), with optional buttons under them. The page puts
 *  the same questions in its structured data. */
export function PageFaq({ label, title, faqs, actions }: Common & { label?: string; title?: string; faqs?: { id?: string; q?: string; a?: string }[]; actions?: Action[] }) {
  return (
    <section className="ask-host light">
      <div className="ask-head">
        {label && <p className="lbl">{label}</p>}
        <h2>
          <Rich text={title} />
        </h2>
      </div>
      <div>
        <Ask items={(faqs ?? []).map((f) => ({ q: f.q ?? "", a: f.a ?? "" }))} />
        {actions?.length ? (
          <div className="dl-actions" style={{ marginTop: "clamp(28px,4vh,44px)" }}>
            <Actions items={actions} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** A page's visible questions, for its FAQ structured data (none if the section is hidden). */
export function faqsOf(blocks: { type: string; props: Record<string, unknown> }[]) {
  const b = blocks.find((x) => x.type === "PageFaq" && x.props.hidden !== true);
  return ((b?.props.faqs as { q?: string; a?: string }[] | undefined) ?? []).map((f) => ({ q: f.q ?? "", a: f.a ?? "" }));
}

/** A band of numbered cards (Careers' "What an advisor actually does"). */
export function PageCardsBand({
  tone,
  label,
  title,
  lede,
  cards,
  columns,
}: Common & { tone?: string; label?: string; title?: string; lede?: string; cards?: { id?: string; term?: string; copy?: string; icon?: string }[]; columns?: string }) {
  const list = cards ?? [];
  const icons = list.some((c) => c.icon) ? (list.map((c) => c.icon || "shield") as IconKey[]) : undefined;
  return (
    <Band tone={(tone as Tone) || undefined} label={label || undefined} title={title ? <Rich text={title} /> : undefined} lede={lede || undefined}>
      <IdeaCards columns={columns === "3" ? 3 : 4} items={list.map((c) => ({ term: c.term ?? "", copy: c.copy ?? "" }))} icons={icons} />
    </Band>
  );
}
