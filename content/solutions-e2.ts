import type { Photo } from "../components/blocks/E2";
import type { IconKey } from "../components/v2/icons";

/* ============================================================
   D'Life — Solutions pages, direction E2 layer.

   The copy the "layered depth" design adds on top of content/solutions.ts:
   the intent bar, the editorial opening, the section headlines (distinct from
   the labels above them), and the photographs each page now carries.

   Transcribed from the Claude Design handoff bundle's own solution pages, one
   record per slug, so this file and content/solutions.ts together hold every
   word on the page and the template holds none of it.

   The hero photograph is deliberately NOT here — it stays on the `photo` field
   in content/solutions.ts. The bundle ships one generic hero across all six
   pages; this repository replaced those with Malaysian photography in an
   earlier client round, and matching the bundle would undo a decision the
   client asked for.
   ============================================================ */

export type SolutionE2 = {
  /** Sticky intent bar: what a visitor wants settled before committing. */
  bar: { facts: string[]; statement: string };
  /** Editorial opening — one large line, prose beside it. */
  open: { lead: string; prose: string[] };
  /** The single wide plate under the opening. No caption where the line would
   *  duplicate copy elsewhere on the same page — three pages had exactly that. */
  duo: Photo & { caption?: string };
  /** Half-page photograph beside the "what prompts this" ledger. */
  split: { photo: Photo; label: string; title: string; flip: boolean };
  /**
   * One photograph per prompting moment, in the same order as
   * `recognise.questions` in content/solutions.ts. These are atmospheric
   * rather than literal — they give the visitor something to picture beside
   * a sentence about their own life. Drawn from the repo's Malaysian
   * photography; several are reused across pages where the subject genuinely
   * overlaps.
   */
  moments: Photo[];
  /** One icon per `explain.terms` entry, same order. Keys: components/v2/icons. */
  ideaIcons: IconKey[];
  explain: { label: string; title: string; lede: string };
  steps: { label: string; title: string; lede?: string };
  /** `photo` omitted renders the plain variant — the same quote, no photograph. */
  said: { photo?: Photo; quote: string; cite: string };
  qa: { label: string; title: string };
  closing: { photo: Photo; title: string; lede: string };
  /** Primary action label, repeated in the hero and the closing panel. */
  action: string;
};

export const SOLUTIONS_E2: Record<string, SolutionE2> = {
  "protecting-your-family": {
    bar: { facts: ["27 years of guidance", "People-first advice", "We stay after the paperwork"], statement: "Start with your household, not a policy." },
    open: {
      lead: "Nobody wakes up wanting to buy insurance. Something changes, and a question that was easy to postpone stops being easy to postpone.",
      prose: [
        "This page is about the 4 ideas that cover most of family protection, what each one is for, and how the conversation goes. You do not need all four, and you may already hold more than you remember.",
        "If you would rather understand a policy you already have, Existing Policy Support is the better place to start.",
      ],
    },
    duo: { src: "/media/img/close-conversation.jpg", alt: "An advisor mid-conversation with two people" },
    split: { photo: { src: "/media/img/path-future.jpg", alt: "A desk with photographs and keepsakes" }, label: "What usually prompts this", title: "5 moments that start this conversation", flip: false },
    moments: [
      { src: "/media/img/hero.jpg", alt: "A family sharing a meal at home" },
      { src: "/media/img/fam-newhome.jpg", alt: "A couple carrying boxes into a new home" },
      { src: "/media/img/need-legacy-malaysia.jpg", alt: "A family looking through documents and photographs together" },
      { src: "/media/img/policy-review.jpg", alt: "One person explaining something to another" },
      { src: "/media/img/path-review.jpg", alt: "A man reading through paperwork at a desk" },
    ],
    ideaIcons: ["shield", "people", "pulse", "doc"],
    explain: { label: "What it actually means", title: "The 4 ideas that do the work", lede: "Each one explained in a sentence you will not need translated. Most families use 2 or 3 of them, not all 4." },
    steps: { label: "How the conversation goes", title: "It is a conversation before it is anything else" },
    said: { photo: { src: "/media/img/dva-team.jpg", alt: "The D’Life advisory team" }, quote: "The families who are glad they did this are rarely the ones who bought the most. They are the ones who understood what they bought.", cite: "D’Life advisory team" },
    qa: { label: "Common questions", title: "What people ask us first" },
    closing: { photo: { src: "/media/img/hero.jpg", alt: "An interior ceiling with a ring chandelier", position: "50% 42%" }, title: "Start with a conversation about your household", lede: "No forms, no products in the first meeting. Just what your family would need, and what you already have in place." },
    action: "Talk about protecting my family",
  },
  "protecting-your-income": {
    bar: { facts: ["27 years of guidance", "People-first advice", "We stay after the paperwork"], statement: "One number does most of the work in this conversation." },
    open: {
      lead: "If your income stopped for six months, what would change in your household, and in what order?",
      prose: [
        "Most people can answer that in about a minute, and the answer is usually clarifying. This page covers what income protection actually does, the 4 terms that decide whether a policy works, and how we approach it with you.",
        "If you would rather understand a policy you already have, Existing Policy Support is the better place to start.",
      ],
    },
    duo: { src: "/media/img/path-review.jpg", alt: "", caption: "Fixed costs first. The salary figure comes later." },
    split: { photo: { src: "/media/img/close-conversation.jpg", alt: "" }, label: "One question worth sitting with", title: "What would change, and in what order", flip: false },
    moments: [
      { src: "/media/img/inc-bills.jpg", alt: "A man reading a letter at his kitchen table" },
      { src: "/media/img/inc-savings.jpg", alt: "Coins in a glass jar" },
      { src: "/media/img/inc-askhelp.jpg", alt: "A family talking over a meal at home" },
      { src: "/media/img/inc-priorities.jpg", alt: "A hand writing a list in a notebook" },
      { src: "/media/img/need-income.jpg", alt: "Someone working through figures alone at a laptop" },
    ],
    ideaIcons: ["coins", "clock", "gauge", "people"],
    explain: { label: "What it actually means", title: "What income protection covers", lede: "This area gets confused with medical cover more often than any other. They do different jobs, and most households need to understand both." },
    steps: { label: "How the conversation goes", title: "How we work it through" },
    said: { photo: { src: "/media/img/advisor-mayyee.jpg", alt: "A D’Life advisor" }, quote: "People insure the car and the house without thinking. The income that pays for both is the one that gets left to last.", cite: "D’Life advisory team" },
    qa: { label: "Common questions", title: "What people ask us first" },
    closing: { photo: { src: "/media/img/hero.jpg", alt: "", position: "50% 45%" }, title: "Work out what your income actually has to carry", lede: "Bring your fixed monthly costs. That one number does most of the work in this conversation." },
    action: "Talk about protecting my income",
  },
  "medical-health-preparation": {
    bar: { facts: ["27 years of guidance", "People-first advice", "We stay after the paperwork"], statement: "Most medical questions are answered by a document you already own." },
    open: {
      lead: "Medical cover is the product most Malaysians already hold and least often understand.",
      prose: [
        "These are the questions that come up in almost every conversation, and 5 terms that make most plans straightforward to compare once they are clear.",
        "If the plan you want explained was bought elsewhere, that is fine: Existing Policy Support covers exactly that, with no obligation to change anything.",
      ],
    },
    duo: { src: "/media/img/policy-review.jpg", alt: "" },
    split: { photo: { src: "/media/img/path-review.jpg", alt: "" }, label: "What people usually want to know", title: "The questions that come up every time", flip: false },
    moments: [
      { src: "/media/img/path-future.jpg", alt: "Someone writing in a notebook at a desk" },
      { src: "/media/img/need-income.jpg", alt: "Someone working through figures alone at a laptop" },
      { src: "/media/img/need-legacy.jpg", alt: "The reception area of a building" },
      { src: "/media/img/path-career.jpg", alt: "A woman outdoors, thinking something over" },
      { src: "/media/img/need-health.jpg", alt: "A man drinking water after exercise" },
    ],
    ideaIcons: ["gauge", "coins", "building", "pulse", "swap"],
    explain: { label: "What it actually means", title: "The parts of a plan that decide everything", lede: "5 terms. Once these are clear, most medical plans become straightforward to compare." },
    steps: { label: "How the conversation goes", title: "How a medical review works", lede: "Most people who come to us on this subject already have cover. The work is usually understanding it, not replacing it." },
    said: { photo: { src: "/media/img/advisor-alex.jpg", alt: "A D’Life advisor" }, quote: "Ninety per cent of the medical questions we are asked are answered by a document the client already owns. Reading it together is most of the job.", cite: "D’Life advisory team" },
    qa: { label: "Common questions", title: "What people ask us first" },
    closing: { photo: { src: "/media/img/hero.jpg", alt: "", position: "50% 40%" }, title: "Have your medical cover explained to you", lede: "Bring your schedule of benefits, or just the policy number. We will walk through what it actually covers, with no obligation to change anything." },
    action: "Talk about medical cover",
  },
  "planning-for-your-future": {
    bar: { facts: ["27 years of guidance", "People-first advice", "We stay after the paperwork"], statement: "Start from the life, not the figure." },
    open: {
      lead: "Almost nobody arrives with a plan. They arrive with a feeling that they should have one.",
      prose: [
        "Underneath that feeling there are usually a few specific worries. This page sets out the 4 components of a retirement picture, and how we work through them with you.",
        "Most Malaysian households already have at least two of the four in place.",
      ],
    },
    duo: { src: "/media/img/community-gathering.jpg", alt: "", caption: "The number follows from the life you have in mind." },
    split: { photo: { src: "/media/img/need-income.jpg", alt: "" }, label: "Where people usually start", title: "The worries underneath the feeling", flip: false },
    moments: [
      { src: "/media/img/fut-epf.jpg", alt: "A woman working through documents at a desk" },
      { src: "/media/img/need-family-malaysia.jpg", alt: "Three generations of a family sharing a meal" },
      { src: "/media/img/need-planning.jpg", alt: "A woman in the kitchen of a home" },
      { src: "/media/img/fut-education.jpg", alt: "A student studying in a library" },
      { src: "/media/img/path-career.jpg", alt: "A woman outdoors, thinking something over" },
    ],
    ideaIcons: ["coins", "growth", "clock", "shield"],
    explain: { label: "What it actually means", title: "The pieces of a retirement picture", lede: "4 components, and most Malaysian households already have at least two of them." },
    steps: { label: "How the conversation goes", title: "How we approach it" },
    said: { photo: { src: "/media/img/dva-workshop.jpg", alt: "A D’Life advisory session" }, quote: "The best plans we see are not the most sophisticated ones. They are the ones the client can still explain, five years later, without looking anything up.", cite: "D’Life advisory team" },
    qa: { label: "Common questions", title: "What people ask us first" },
    closing: { photo: { src: "/media/img/hero.jpg", alt: "", position: "50% 42%" }, title: "Put the whole picture in one place", lede: "EPF, savings, property, policies. Seeing it together is usually the point at which planning stops feeling abstract." },
    action: "Talk about planning ahead",
  },
  "wealth-legacy": {
    bar: { facts: ["27 years of guidance", "People-first advice", "We stay after the paperwork"], statement: "Passing it on the way you intended is a separate job." },
    open: {
      lead: "Legacy conversations are rarely about money for long. They tend to arrive at something more particular.",
      prose: [
        "Some of this is financial planning and some of it is administration. Both matter, and the administrative half is usually the neglected one.",
        "Where a will, a trust or a business agreement is needed, that is legal work. We will say so plainly and coordinate rather than improvise.",
      ],
    },
    duo: { src: "/media/img/path-family.jpg", alt: "", caption: "Nominations kept current resolve more difficulty than anything else on this page." },
    split: { photo: { src: "/media/img/policy-review.jpg", alt: "" }, label: "The questions behind this one", title: "What people are actually asking", flip: false },
    moments: [
      { src: "/media/img/need-health-malaysia.jpg", alt: "Two family members in consultation with an advisor" },
      { src: "/media/img/hero.jpg", alt: "A family sharing a meal at home" },
      { src: "/media/img/need-legacy.jpg", alt: "The reception area of a building" },
      { src: "/media/img/need-planning.jpg", alt: "A woman in the kitchen of a home" },
      { src: "/media/img/path-review.jpg", alt: "A man reading through paperwork at a desk" },
    ],
    ideaIcons: ["growth", "doc", "coins", "people"],
    explain: { label: "What it actually means", title: "What this covers", lede: "Some of this is financial planning and some of it is administration. Both matter, and the administrative half is usually the neglected one." },
    steps: { label: "How the conversation goes", title: "How we work with you on this", lede: "Estate matters touch law and tax as well as financial planning. We are clear about where our advice ends." },
    said: { photo: { src: "/media/img/close-conversation.jpg", alt: "A D’Life advisor in conversation" }, quote: "The families who have the easiest time are not the wealthiest. They are the ones where someone wrote things down and told somebody where they were.", cite: "D’Life advisory team" },
    qa: { label: "Common questions", title: "What people ask us first" },
    closing: { photo: { src: "/media/img/hero.jpg", alt: "", position: "50% 50%" }, title: "Start with what is already written down", lede: "Your existing nominations and policies. For many people, reviewing those is most of what this needs." },
    action: "Talk about wealth and legacy",
  },
  "corporate": {
    bar: { facts: ["27 years of guidance", "People-first advice", "We stay after the paperwork"], statement: "Sized to the team you actually have." },
    open: {
      lead: "Businesses come to us with one of a small number of situations, usually at the point the company has grown past what it started with.",
      prose: [
        "Three areas cover most of it. Most companies need the first, and should at least have considered the other two.",
        "You would be dealing with a named advisor, and the same one at renewal. Continuity is the part of this that most companies say has been missing.",
      ],
    },
    duo: { src: "/media/img/dva-workshop.jpg", alt: "" },
    split: { photo: { src: "/media/img/dva-team.jpg", alt: "" }, label: "What businesses come to us with", title: "The point at which the question arrives", flip: false },
    moments: [
      { src: "/media/img/dva-team.jpg", alt: "A company team together" },
      { src: "/media/img/dva-workshop.jpg", alt: "A staff briefing in progress" },
      { src: "/media/img/close-conversation.jpg", alt: "Two colleagues talking" },
      { src: "/media/img/policy-review.jpg", alt: "Scheme documents being reviewed" },
      { src: "/media/img/path-review.jpg", alt: "Costs per head being worked through" },
    ],
    ideaIcons: ["people", "building", "shield", "doc"],
    explain: { label: "What it actually means", title: "What we help with", lede: "Three areas. Most companies need the first, and should at least have considered the other two." },
    steps: { label: "How the conversation goes", title: "How an engagement works" },
    said: { photo: { src: "/media/img/advisor-alex.jpg", alt: "An advisor speaking to camera" }, quote: "A benefits scheme nobody has explained to the staff is a cost, not a benefit. Half the value is in the briefing.", cite: "D’Life advisory team" },
    qa: { label: "Common questions", title: "What people ask us first" },
    closing: { photo: { src: "/media/img/hero.jpg", alt: "", position: "50% 40%" }, title: "Start with a scoping conversation", lede: "Headcount, what is already in place, and what prompted the question. That is enough for a first discussion." },
    action: "Enquire about corporate solutions",
  },
};
