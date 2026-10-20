import React, { type ReactNode } from "react";
import { Band, Cards, Checks, Creed, Events, Gate, Holds, LoopCard, MissionVision, OpenStatement, Record, SplitShot, Trio, WhoGrid, YearMap, type Tone } from "../v2/blocks";
import type { IconKey } from "../v2/icons";
import Signup from "../v2/Signup";
import { Rich } from "../home/rich";
import { Markdown } from "../kit/md";
import { asset } from "../../lib/asset";
import { hrefOf } from "./common";

/*
 * More sections the inner pages share (DVA, About, Youth Community, the solution pages), as
 * Talous CMS edits them: flat props, lists of plain items (content/cms/pages/sections.ts).
 * The markup is the shared blocks' own (components/v2/blocks.tsx).
 */

type Item = { id?: string } & Record<string, string | boolean | undefined>;
const str = (v: unknown) => (typeof v === "string" ? v : "");
const iconsOf = (list: Item[]) => (list.some((i) => i.icon) ? (list.map((i) => str(i.icon) || "shield") as IconKey[]) : undefined);

/** **bold** (as <strong>), *italic* and line breaks: the About record's figures and framing line. */
function Inline({ text }: { text?: string }) {
  if (!text) return null;
  const lines = (s: string, k: string) => s.split("\n").map((l, i) => <React.Fragment key={`${k}${i}`}>{i > 0 && <br />}{l}</React.Fragment>);
  const out: ReactNode[] = [];
  const re = /\*\*([\s\S]+?)\*\*|\*([\s\S]+?)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(...lines(text.slice(last, m.index), `t${m.index}-`));
    out.push(m[1] !== undefined ? <strong key={m.index}>{lines(m[1], "s")}</strong> : <i key={m.index}>{lines(m[2], "i")}</i>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(...lines(text.slice(last), "e-"));
  return <>{out}</>;
}

/** A section's opening statement: a kick, the statement at display scale, prose beside it. */
export function PageStatement({ kick, lead, prose }: { kick?: string; lead?: string; prose?: string }) {
  return (
    <Band>
      <OpenStatement kick={kick ?? ""} lead={lead ?? ""}>
        <Markdown text={prose} />
      </OpenStatement>
    </Band>
  );
}

/** Numbered principles on the contained ink panel (About's commitments, DVA's purpose). */
export function PageCreed({ label, title, lede, items }: { label?: string; title?: string; lede?: string; items?: Item[] }) {
  const list = items ?? [];
  return <Creed label={label || undefined} title={<Rich text={title} />} lede={lede || undefined} items={list.map((i) => ({ term: str(i.term), copy: str(i.copy) }))} icons={iconsOf(list)} />;
}

/** A numbered list that reads down the page (DVA's "What members develop"). */
export function PageIndex({ label, title, items }: { label?: string; title?: string; items?: Item[] }) {
  return (
    <section className="band light">
      {label && <p className="lbl">{label}</p>}
      <h2>
        <Rich text={title} />
      </h2>
      <div className="index">
        {(items ?? []).map((item, i) => (
          <div key={item.id ?? i}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <div className="with">
              <h3>{str(item.title)}</h3>
              <p>{str(item.copy)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** A year in three tiers by how often each session comes round (DVA). The first is the spine. */
export function PageYearMap(p: Record<string, unknown>) {
  const tiers = [1, 2, 3]
    .map((n) => ({ when: str(p[`tier${n}When`]), note: str(p[`tier${n}Note`]), items: ((p[`tier${n}Sessions`] as Item[] | undefined) ?? []).map((s) => ({ name: str(s.name), copy: str(s.copy) })) }))
    .filter((t) => t.when || t.items.length);
  return <YearMap label={str(p.label) || undefined} title={<Rich text={str(p.title)} />} lede={str(p.lede) || undefined} tiers={tiers} />;
}

/** Stages that narrow (DVA's selection). */
export function PageGate({ label, title, aside, stages }: { label?: string; title?: string; aside?: string; stages?: Item[] }) {
  return <Gate label={label || undefined} title={<Rich text={title} />} aside={aside || undefined} stages={(stages ?? []).map((s) => ({ k: str(s.k), title: str(s.title), copy: str(s.copy) }))} />;
}

/** Numbered standards on ink (DVA's "What members hold each other to"). */
export function PageHolds({ label, title, items }: { label?: string; title?: string; items?: Item[] }) {
  return <Holds label={label || undefined} title={<Rich text={title} />} items={(items ?? []).map((i) => str(i.text))} />;
}

export function PageMissionVision({ label, title, items }: { label?: string; title?: string; items?: Item[] }) {
  return <MissionVision label={label || undefined} title={title ? <Rich text={title} /> : undefined} items={(items ?? []).map((i) => ({ kind: str(i.kind), claim: str(i.claim), copy: str(i.copy) }))} />;
}

/** A person: portrait beside their name, role and a few paragraphs (About's founders). */
export function PageProfile({
  name,
  role,
  photo,
  photoAlt,
  photoPosition,
  flip,
  tone,
  prose,
}: {
  name?: string;
  role?: string;
  photo?: string;
  photoAlt?: string;
  photoPosition?: string;
  flip?: boolean;
  tone?: string;
  prose?: string;
}) {
  return (
    <Band tone={(tone as Tone) || "light"}>
      <div className={`folk${flip ? " folk--flip" : ""}`}>
        <div className="plate ph">
          {photo ? (
            <img src={asset(photo)} alt={photoAlt ?? ""} style={photoPosition ? { objectPosition: photoPosition } : undefined} />
          ) : (
            <div className="slot-empty">
              {name}
              <em>{role}</em>
            </div>
          )}
        </div>
        <div>
          <p className="lbl">{role}</p>
          <h2 style={{ marginTop: 6 }}>{name}</h2>
          <div className="dl-prose" style={{ marginTop: 22 }}>
            <Markdown text={prose} />
          </div>
        </div>
      </div>
    </Band>
  );
}

/** A photograph beside a heading and a numbered list (About's recognition, Youth's takeaways). */
export function PageSplitList({
  photo,
  photoAlt,
  photoRatio,
  tone,
  label,
  title,
  lede,
  items,
  aligned,
  top,
  anchor,
}: {
  photo?: string;
  photoAlt?: string;
  photoRatio?: string;
  tone?: string;
  label?: string;
  title?: string;
  lede?: string;
  items?: Item[];
  aligned?: boolean;
  top?: boolean;
  anchor?: string;
}) {
  return (
    <SplitShot
      photo={{ src: photo ?? "", alt: photoAlt ?? "", ratio: photoRatio || undefined }}
      tone={(tone as Tone) || "light"}
      label={label || undefined}
      title={title ? <Rich text={title} /> : undefined}
      className={top ? "split-shot--top" : undefined}
      id={anchor || undefined}
    >
      {lede && <p className="dl-lede">{lede}</p>}
      <Checks items={(items ?? []).map((i) => str(i.text))} aligned={!!aligned} />
    </SplitShot>
  );
}

/** Figures beside a photograph and a framing line (About's "Advisors she has built"). */
export function PageRecord({
  label,
  title,
  lede,
  photo,
  photoAlt,
  photoRatio,
  say,
  figures,
}: {
  label?: string;
  title?: string;
  lede?: string;
  photo?: string;
  photoAlt?: string;
  photoRatio?: string;
  say?: string;
  figures?: Item[];
}) {
  return (
    <Record
      label={label || undefined}
      title={<Rich text={title} />}
      lede={lede || undefined}
      photo={photo ? { src: photo, alt: photoAlt ?? "", ratio: photoRatio || undefined } : undefined}
      say={say ? <Inline text={say} /> : undefined}
      figures={(figures ?? []).map((f) => ({ fig: <Inline text={str(f.fig)} />, copy: <Inline text={str(f.copy)} />, word: !!f.word }))}
    />
  );
}

/** Cards linking onward, with or without photos (About's careers and stories, the legal pages). */
export function PageLinkCards({ tone, label, title, columns, overlay, items }: { tone?: string; label?: string; title?: string; columns?: string; overlay?: boolean; items?: Item[] }) {
  return (
    <Band tone={(tone as Tone) || undefined} label={label || undefined} title={title ? <Rich text={title} /> : undefined}>
      <Cards
        columns={(Number(columns) || 2) as 2 | 3 | 4}
        overlay={!!overlay}
        items={(items ?? []).map((c) => {
          const href = str(c.href) || "/";
          return {
            title: str(c.title),
            copy: str(c.copy),
            // Cards applies the base path to site paths itself.
            href: href.startsWith("/") ? href : hrefOf(href),
            ...(c.cta ? { cta: str(c.cta) } : {}),
            photo: c.photo ? { src: str(c.photo), alt: str(c.photoAlt), ratio: str(c.photoRatio) || undefined } : undefined,
          };
        })}
      />
    </Band>
  );
}

/** Three pillars with a short list each (Youth Community). */
export function PageTrio({ anchor, label, title, items }: { anchor?: string; label?: string; title?: string; items?: Item[] }) {
  const list = items ?? [];
  return (
    <Trio
      id={anchor || undefined}
      label={label || undefined}
      title={<Rich text={title} />}
      items={list.map((p) => ({ title: str(p.title), claim: str(p.claim), items: str(p.points).split("\n").map((s) => s.trim()).filter(Boolean) }))}
      icons={iconsOf(list)}
    />
  );
}

/** Who something is for, numbered, with a count beside the heading (Youth Community). */
export function PageWhoGrid({ label, title, lede, countLabel, items }: { label?: string; title?: string; lede?: string; countLabel?: string; items?: Item[] }) {
  const list = items ?? [];
  return (
    <WhoGrid label={label || undefined} title={<Rich text={title} />} lede={lede || undefined} items={list.map((w) => ({ who: str(w.who), why: str(w.why) }))}>
      {countLabel ? (
        <div className="count">
          <b>{String(list.length).padStart(2, "0")}</b>
          <span>{countLabel}</span>
        </div>
      ) : null}
    </WhoGrid>
  );
}

type EventItem = { id?: string; when?: string; where?: string; title?: string; photo?: string; photoAlt?: string; copy?: string };

/** Event cards under a heading and intro, each with a button (Youth Community). */
export function PageEvents({ anchor, label, title, lede, events, cta, ctaHref }: { anchor?: string; label?: string; title?: string; lede?: string; events?: EventItem[]; cta?: string; ctaHref?: string }) {
  return (
    <section className="band light" id={anchor || undefined}>
      {label && <p className="lbl">{label}</p>}
      <h2>
        <Rich text={title} />
      </h2>
      {lede && <p className="dl-lede">{lede}</p>}
      <Events
        items={(events ?? []).map((e) => ({ when: e.when ?? "", where: e.where ?? "", title: e.title ?? "", copy: e.copy ?? "", photo: e.photo ? { src: e.photo, alt: e.photoAlt ?? "" } : undefined }))}
        href={hrefOf(ctaHref || "wa:event")}
        {...(cta ? { cta } : {})}
      />
    </section>
  );
}

/** The "stay in the loop" card with the sign-up form (Youth Community). */
export function PageSignup({ anchor, label, title, lede, consent }: { anchor?: string; label?: string; title?: string; lede?: string; consent?: string }) {
  return (
    <LoopCard id={anchor || undefined} label={label ?? ""} title={<Rich text={title} />} lede={lede || undefined}>
      <Signup consent={consent} />
    </LoopCard>
  );
}
