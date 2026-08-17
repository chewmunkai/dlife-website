import type { ReactNode } from "react";

/* ============================================================
   Geometric outline icons.

   The visual system asks for "geometric outline icons" as the everyday
   direction, so these are hand-authored on a 24-grid with a single stroke
   weight rather than pulled from an icon library: nine shapes is a few
   hundred bytes inline, against ~40KB for a package, and the stroke matches
   the hairlines the rest of the system draws with.

   They carry no meaning on their own — every one sits beside its own
   heading — so each is aria-hidden and the set is keyed by subject.
   ============================================================ */

export type IconKey =
  | "shield"
  | "clock"
  | "pulse"
  | "doc"
  | "coins"
  | "building"
  | "growth"
  | "people"
  | "gauge"
  | "swap";

const P = ({ d }: { d: string }) => <path d={d} />;

const SHAPES: Record<IconKey, ReactNode> = {
  /* Cover, protection, life cover. */
  shield: <P d="M12 3.2 19.4 6v5.6c0 4.2-3 7.4-7.4 9.2-4.4-1.8-7.4-5-7.4-9.2V6z" />,
  /* Waiting periods, benefit periods, anything measured in time. */
  clock: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <P d="M12 7.3V12l3.4 2.1" />
    </>
  ),
  /* Critical illness, health, medical preparation. */
  pulse: <P d="M3.2 12.4h3.4l2.1-4.6 3 9.2 2.4-6 1.6 3.1h4.9" />,
  /* Nominations, documentation, disclosure, the paperwork half. */
  doc: (
    <>
      <P d="M6.4 3.4h7.8l4.4 4.4v12.8H6.4z" />
      <P d="M14 3.6v4.4h4.4M9.2 13.6l1.9 1.9 4-4" />
    </>
  ),
  /* Income replacement, savings, premiums, anything monetary. */
  coins: (
    <>
      <ellipse cx="12" cy="7" rx="6.6" ry="2.8" />
      <P d="M5.4 7v5c0 1.5 3 2.8 6.6 2.8s6.6-1.3 6.6-2.8V7" />
      <P d="M5.4 12v5c0 1.5 3 2.8 6.6 2.8s6.6-1.3 6.6-2.8v-5" />
    </>
  ),
  /* Hospitals, room and board, corporate premises. */
  building: (
    <>
      <P d="M5 20.6V5.4h9.6v15.2M14.6 10.2H19v10.4M3.4 20.6h17.2" />
      <P d="M8.2 9h3.2M8.2 13h3.2" />
    </>
  ),
  /* Accumulation, investment, long-term growth. */
  growth: (
    <>
      <P d="M3.6 19.2 9.4 13l3.4 3.2 7.2-7.6" />
      <P d="M15.4 8.4h4.8v4.8" />
    </>
  ),
  /* Beneficiaries, dependants, employees, the people side. */
  people: (
    <>
      <circle cx="9.2" cy="8.6" r="3.2" />
      <P d="M3.4 20c0-3.2 2.6-5.4 5.8-5.4s5.8 2.2 5.8 5.4" />
      <P d="M16 6.2a3.2 3.2 0 0 1 0 6M17.4 14.9c2 .7 3.2 2.5 3.2 5.1" />
    </>
  ),
  /* Limits, ceilings, deductibles — anything with a measured threshold. */
  gauge: (
    <>
      <P d="M4 17.4a8.6 8.6 0 1 1 16 0" />
      <P d="M12 17.4l4.2-5.4" />
    </>
  ),
  /* Portability, moving between employers or insurers, continuation. */
  swap: (
    <>
      <P d="M4.2 9.2h13.2M14.2 6l3.2 3.2-3.2 3.2" />
      <P d="M19.8 15.4H6.6M9.8 12.2 6.6 15.4l3.2 3.2" />
    </>
  ),
};

export function Icon({ name, size = 30 }: { name: IconKey; size?: number }) {
  return (
    <svg
      className="dl-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {SHAPES[name]}
    </svg>
  );
}
