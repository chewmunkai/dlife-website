import { Moments, Said, StepsPanel, type Photo } from "../v2/blocks";
import { Rich } from "../home/rich";

/* The solution pages' own sections (content/cms/pages/solutions.ts). */

type Moment = { id?: string; text?: string; photo?: string; photoAlt?: string; photoPosition?: string; photoFit?: string };

const photoOf = (src?: string, alt?: string, position?: string, fit?: string, ratio?: string): Photo | undefined =>
  src ? { src, alt: alt ?? "", ...(position ? { position } : {}), ...(fit === "contain" ? { fit: "contain" as const } : {}), ...(ratio ? { ratio } : {}) } : undefined;

/** The situations people arrive with, numbered, each with a photograph. */
export function PageMoments({ title, items }: { title?: string; items?: Moment[] }) {
  const list = items ?? [];
  const photos = list.map((m) => photoOf(m.photo, m.photoAlt, m.photoPosition, m.photoFit));
  return <Moments title={<Rich text={title} />} items={list.map((m) => m.text ?? "")} photos={photos as Photo[]} />;
}

/** How a conversation goes, as numbered steps on a sand band. */
export function PageStepsPanel({ label, title, lede, steps }: { label?: string; title?: string; lede?: string; steps?: { id?: string; title?: string; copy?: string }[] }) {
  return <StepsPanel label={label || undefined} title={<Rich text={title} />} lede={lede || undefined} steps={(steps ?? []).map((s) => ({ title: s.title ?? "", copy: s.copy ?? "" }))} />;
}

/** A quote, with or without a photograph beside it. The quotation marks are added here. */
export function PageSaid({ quote, cite, photo, photoAlt, photoPosition, photoRatio }: { quote?: string; cite?: string; photo?: string; photoAlt?: string; photoPosition?: string; photoRatio?: string }) {
  return <Said photo={photoOf(photo, photoAlt, photoPosition, undefined, photoRatio)} quote={<>“{quote}”</>} cite={cite || undefined} />;
}
