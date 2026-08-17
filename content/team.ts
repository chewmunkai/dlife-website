import type { Photo } from "../components/v2/blocks";

/* ============================================================
   The advisory team.

   The seam for the team roster on About D'Life. TEAM is empty because D'Life
   has not supplied names or portraits yet, so the page renders ROLES instead:
   the real shape of the advisory team, with every name and portrait marked as
   pending on the page itself.

   To publish: add records to TEAM. The section switches to the real roster,
   the "names still to come" notice disappears, and no markup changes.

   The founders are deliberately not in here. Sharon and Rachel each have a
   full section of their own further up the page, and repeating them as cards
   would pad the roster rather than fill it.

   ⚠️ Portraits only. No stock photography stands in for a named colleague —
   a member without a `photo` renders a marked slot instead.
   ============================================================ */

export type Member = {
  /** Omitted renders a marked field rather than an invented name. */
  name?: string;
  /** Real, and the reason these cards can ship before the names do. */
  role: string;
  /** One line on what the role actually carries. */
  copy?: string;
  photo?: Photo;
};

export const TEAM: Member[] = [];

/**
 * The roles that make up the advisory team, in the order the practice
 * develops them: advisor, then a first leadership step, then a unit, then an
 * agency. Descriptions are what each role is accountable for, which is the
 * part the client does not need to supply.
 */
export const ROLES: Member[] = [
  {
    role: "Agency Manager",
    copy: "Leads a team of advisors, and is answerable for their clients as well as their own.",
  },
  {
    role: "Unit Manager",
    copy: "Runs a unit inside the agency, and coaches the advisors working in it.",
  },
  {
    role: "Assistant Unit Manager",
    copy: "A first leadership step: still advising clients, and now developing other advisors alongside that.",
  },
  {
    role: "Senior Financial Advisor",
    copy: "Long-standing client relationships, and the reviews that keep them current as circumstances change.",
  },
  {
    role: "Financial Advisor",
    copy: "Protection and planning advice for families, professionals and people early in a career.",
  },
  {
    role: "Financial Advisor, corporate",
    copy: "Employee benefits and key-person cover for business owners and their teams.",
  },
];

/** What the About page renders. Placeholders only while TEAM is empty, so an
 *  unfilled roster cannot outlive the real one arriving. */
export const ROSTER: Member[] = TEAM.length ? TEAM : ROLES;

/** True while the page is showing roles rather than people. */
export const ROSTER_PENDING = TEAM.length === 0;
