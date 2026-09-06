/* ============================================================
   What a career here provides — the four benefits.

   A09 (client, 31 Aug 2026): Mentorship, Professionalism, Leadership and
   Culture should open where they stand rather than send a visitor somewhere
   else to read them. They appeared twice on the site, differently, and
   neither version could do that:

     · the homepage ran them as four whole-row links to /careers, so the only
       way to learn more about mentorship was to leave the page
     · Careers ran the same four as static rows, title and paragraph, with
       nothing to open

   Both copies are here now, and neither was rewritten. `summary` is the
   homepage's one-line version of the benefit. `detail` is what the Careers
   page said in addition to it — the overlapping opening sentence is dropped
   rather than repeated under itself. `title` is the client's own name for the
   benefit, which is what the homepage already used; `full` is the longer
   heading Careers carried, kept so that page's voice is unchanged.

   ⚠️ TODO(launch): "More than 40 young managers" in the Leadership detail is
   one of three different figures the site gives for the same thing — the
   homepage's trust band says 34+ leaders and About says 40+. Do not resolve
   it by picking one. See docs/dlife-amendment-status.md.
   ============================================================ */

export type Benefit = {
  /** Ordinal, as displayed. */
  no: string;
  /** The client's name for the benefit. */
  title: string;
  /** Careers' longer heading for the same benefit. */
  full: string;
  /** One line, visible without opening the row. */
  summary: string;
  /** What opening the row reveals. Never a restatement of the summary. */
  detail: string;
};

export const GROWTH: Benefit[] = [
  {
    no: "01",
    title: "Mentorship",
    full: "Mentorship before independence",
    summary: "You learn the craft beside someone senior before you ever learn a pitch.",
    detail: "You sit in on real client conversations, and are observed in your own.",
  },
  {
    no: "02",
    title: "Professionalism",
    full: "Licensing and professional standards",
    summary: "Licensing, product knowledge and disclosure done properly.",
    detail: "Doing this correctly is not the boring part of the job. It is the job.",
  },
  {
    no: "03",
    title: "Leadership",
    full: "A route into leadership",
    summary: "A route from advisor to team leader, with training at each step.",
    detail: "For those who want it. More than 40 young managers have come through it here.",
  },
  {
    no: "04",
    title: "Culture",
    full: "A culture that measures the right thing",
    summary: "People who measure a good year by the clients who stayed.",
    detail: "And by the families who were properly looked after when something happened.",
  },
];
