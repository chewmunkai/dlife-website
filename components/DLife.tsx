"use client";

import type { ComponentType } from "react";
import { HOME_SECTIONS } from "./home/sections";

/* ============================================================
   D'Life — homepage.

   The client-approved long-scroll page. Each section is its own component in
   components/home/sections.tsx; this renders them in the order Talous CMS
   has published (lib/talous.ts fills in any section the CMS doesn't have, at
   its approved position, so the page is never missing one).
   ============================================================ */

export type HomeBlock = { type: string; props: { id: string } & Record<string, unknown> };

const SECTIONS = HOME_SECTIONS as unknown as Record<string, ComponentType<Record<string, unknown>>>;

export default function DLife({ blocks }: { blocks: HomeBlock[] }) {
  return (
    <>
      {blocks.map((b) => {
        const Section = SECTIONS[b.type];
        return Section ? <Section key={b.props.id} {...b.props} /> : null;
      })}
    </>
  );
}
