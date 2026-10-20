import type { ComponentType } from "react";

/*
 * Renders a page's sections from Talous CMS, in their published order, skipping hidden ones.
 * Each section component merges its props over its own defaults, so a field the CMS doesn't
 * have yet (an older version) shows today's copy instead of a gap.
 */

export type SectionBlock = { type: string; props: { id: string } & Record<string, unknown> };

export function Sections({
  blocks,
  registry,
  context,
}: {
  blocks: SectionBlock[];
  registry: Record<string, ComponentType<Record<string, unknown>>>;
  /** Things every section of the page may need that aren't copy: its route, the film library. */
  context?: Record<string, unknown>;
}) {
  return (
    <>
      {blocks
        .filter((b) => b.props.hidden !== true)
        .map((b) => {
          const C = registry[b.type];
          return C ? <C key={b.props.id} {...b.props} {...context} /> : null;
        })}
    </>
  );
}
