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
    bar: { facts: ["A conversation, not a pitch", "Costs you nothing", "About an hour of your time"], statement: "Start with your household, not a policy." },
    open: {
      lead: "Nobody wakes up wanting to buy insurance. Something changes, and a question that was easy to postpone stops being easy to postpone.",
      prose: [
        "This page is about the four ideas that cover most of family protection, what each one is for, and how the conversation goes. You do not need all four, and you may already hold more than you remember.",
        "If you would rather understand a policy you already have, Existing Policy Support is the better place to start.",
      ],
    },
    duo: { src: "/media/img/close-conversation.jpg", alt: "An advisor mid-conversation with two people" },
    split: { photo: { src: "/media/img/path-future.jpg", alt: "A desk with photographs and keepsakes" }, label: "What usually prompts this", title: "Five moments that start this conversation", flip: false },
    moments: [
      { src: "/media/img/need-family-malaysia.jpg", alt: "A family together at home" },
      { src: "/media/img/need-planning.jpg", alt: "Keys and paperwork on a table" },
      { src: "/media/img/path-family.jpg", alt: "Three generations of a family" },
      { src: "/media/img/close-conversation.jpg", alt: "Two people in a careful conversation" },
      { src: "/media/img/policy-review.jpg", alt: "A policy document being read together" },
    ],
    ideaIcons: ["shield", "people", "pulse", "doc"],
    explain: { label: "What it actually means", title: "The four ideas that do the work", lede: "Each one explained in a sentence you will not need translated. Most families use two or three of them, not all four." },
    steps: { label: "How the conversation goes", title: "It is a conversation before it is anything else" },
    said: { photo: { src: "/media/img/path-career.jpg", alt: "A woman looking out through a window at trees", position: "18% 50%" }, quote: "The families who are glad they did this are rarely the ones who bought the most. They are the ones who understood what they bought.", cite: "D’Life advisory team" },
    qa: { label: "Common questions", title: "What people ask us first" },
    closing: { photo: { src: "/media/img/need-legacy.jpg", alt: "An interior ceiling with a ring chandelier", position: "50% 42%" }, title: "Start with a conversation about your household", lede: "No forms, no products in the first meeting. Just what your family would need, and what you already have in place." },
    action: "Talk about protecting my family",
  },
  "protecting-your-income": {
    bar: { facts: ["Bring your fixed monthly costs", "Nothing to pay", "About an hour"], statement: "One number does most of the work in this conversation." },
    open: {
      lead: "If your income stopped for six months, what would change in your household, and in what order?",
      prose: [
        "Most people can answer that in about a minute, and the answer is usually clarifying. This page covers what income protection actually does, the four terms that decide whether a policy works, and how we approach it with you.",
        "If you would rather understand a policy you already have, Existing Policy Support is the better place to start.",
      ],
    },
    duo: { src: "/media/img/path-review.jpg", alt: "", caption: "Fixed costs first. The salary figure comes later." },
    split: { photo: { src: "/media/img/close-conversation.jpg", alt: "" }, label: "One question worth sitting with", title: "What would change, and in what order", flip: false },
    moments: [
      { src: "/media/img/need-planning.jpg", alt: "Household paperwork on a table" },
      { src: "/media/img/path-review.jpg", alt: "Figures being worked through" },
      { src: "/media/img/need-income-malaysia.jpg", alt: "A couple at home" },
      { src: "/media/img/close-conversation.jpg", alt: "Two people in a careful conversation" },
      { src: "/media/img/community-gathering.jpg", alt: "People seated around a table" },
    ],
    ideaIcons: ["coins", "clock", "gauge", "people"],
    explain: { label: "What it actually means", title: "What income protection covers", lede: "This area gets confused with medical cover more often than any other. They do different jobs, and most households need to understand both." },
    steps: { label: "How the conversation goes", title: "How we work it through" },
    said: { quote: "People insure the car and the house without thinking. The income that pays for both is the one that gets left to last.", cite: "D’Life advisory team" },
    qa: { label: "Common questions", title: "What people ask us first" },
    closing: { photo: { src: "/media/img/hero.jpg", alt: "", position: "50% 45%" }, title: "Work out what your income actually has to carry", lede: "Bring your fixed monthly costs. That one number does most of the work in this conversation." },
    action: "Talk about protecting my income",
  },
  "medical-health-preparation": {
    bar: { facts: ["Bring your schedule of benefits", "Costs you nothing", "Nothing has to change"], statement: "Most medical questions are answered by a document you already own." },
    open: {
      lead: "Medical cover is the product most Malaysians already hold and least often understand.",
      prose: [
        "These are the questions that come up in almost every conversation, and five terms that make most plans straightforward to compare once they are clear.",
        "If the plan you want explained was bought elsewhere, that is fine: Existing Policy Support covers exactly that, with no obligation to change anything.",
      ],
    },
    duo: { src: "/media/img/policy-review.jpg", alt: "" },
    split: { photo: { src: "/media/img/path-review.jpg", alt: "" }, label: "What people usually want to know", title: "The questions that come up every time", flip: false },
    moments: [
      { src: "/media/img/policy-review.jpg", alt: "A schedule of benefits being read" },
      { src: "/media/img/path-review.jpg", alt: "Figures being worked through" },
      { src: "/media/img/need-health-malaysia.jpg", alt: "A hospital corridor" },
      { src: "/media/img/path-career.jpg", alt: "A woman looking out through a window" },
      { src: "/media/img/close-conversation.jpg", alt: "Two people in a careful conversation" },
    ],
    ideaIcons: ["gauge", "coins", "building", "pulse", "swap"],
    explain: { label: "What it actually means", title: "The parts of a plan that decide everything", lede: "Five terms. Once these are clear, most medical plans become straightforward to compare." },
    steps: { label: "How the conversation goes", title: "How a medical review works", lede: "Most people who come to us on this subject already have cover. The work is usually understanding it, not replacing it." },
    said: { photo: { src: "/media/img/close-conversation.jpg", alt: "" }, quote: "Ninety per cent of the medical questions we are asked are answered by a document the client already owns. Reading it together is most of the job.", cite: "D’Life advisory team" },
    qa: { label: "Common questions", title: "What people ask us first" },
    closing: { photo: { src: "/media/img/need-family.jpg", alt: "", position: "50% 40%" }, title: "Have your medical cover explained to you", lede: "Bring your schedule of benefits, or just the policy number. We will walk through what it actually covers, with no obligation to change anything." },
    action: "Talk about medical cover",
  },
  "planning-for-your-future": {
    bar: { facts: ["A conversation, nothing more", "Costs you nothing", "About an hour"], statement: "Start from the life, not the figure." },
    open: {
      lead: "Almost nobody arrives with a plan. They arrive with a feeling that they should have one.",
      prose: [
        "Underneath that feeling there are usually a few specific worries. This page sets out the four components of a retirement picture, and how we work through them with you.",
        "Most Malaysian households already have at least two of the four in place.",
      ],
    },
    duo: { src: "/media/img/community-gathering.jpg", alt: "", caption: "The number follows from the life you have in mind." },
    split: { photo: { src: "/media/img/need-income.jpg", alt: "" }, label: "Where people usually start", title: "The worries underneath the feeling", flip: false },
    moments: [
      { src: "/media/img/need-planning.jpg", alt: "Retirement paperwork on a table" },
      { src: "/media/img/path-future.jpg", alt: "A desk with photographs and keepsakes" },
      { src: "/media/img/path-review.jpg", alt: "Figures being worked through" },
      { src: "/media/img/path-family.jpg", alt: "A family at home together" },
      { src: "/media/img/community-gathering.jpg", alt: "People seated around a table" },
    ],
    ideaIcons: ["coins", "growth", "clock", "shield"],
    explain: { label: "What it actually means", title: "The pieces of a retirement picture", lede: "Four components, and most Malaysian households already have at least two of them." },
    steps: { label: "How the conversation goes", title: "How we approach it" },
    said: { quote: "The best plans we see are not the most sophisticated ones. They are the ones the client can still explain, five years later, without looking anything up.", cite: "D’Life advisory team" },
    qa: { label: "Common questions", title: "What people ask us first" },
    closing: { photo: { src: "/media/img/need-legacy.jpg", alt: "", position: "50% 42%" }, title: "Put the whole picture in one place", lede: "EPF, savings, property, policies. Seeing it together is usually the point at which planning stops feeling abstract." },
    action: "Talk about planning ahead",
  },
  "wealth-legacy": {
    bar: { facts: ["Start with your existing nominations", "Costs you nothing", "We coordinate with your lawyer"], statement: "Passing it on the way you intended is a separate job." },
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
      { src: "/media/img/need-legacy-malaysia.jpg", alt: "An interior with warm evening light" },
      { src: "/media/img/path-family.jpg", alt: "A family at home together" },
      { src: "/media/img/dva-team.jpg", alt: "A business team together" },
      { src: "/media/img/close-conversation.jpg", alt: "Two people in a careful conversation" },
      { src: "/media/img/policy-review.jpg", alt: "Documents being read together" },
    ],
    ideaIcons: ["growth", "doc", "coins", "people"],
    explain: { label: "What it actually means", title: "What this covers", lede: "Some of this is financial planning and some of it is administration. Both matter, and the administrative half is usually the neglected one." },
    steps: { label: "How the conversation goes", title: "How we work with you on this", lede: "Estate matters touch law and tax as well as financial planning. We are clear about where our advice ends." },
    said: { photo: { src: "/media/img/community-gathering.jpg", alt: "" }, quote: "The families who have the easiest time are not the wealthiest. They are the ones where someone wrote things down and told somebody where they were.", cite: "D’Life advisory team" },
    qa: { label: "Common questions", title: "What people ask us first" },
    closing: { photo: { src: "/media/img/hero.jpg", alt: "", position: "50% 50%" }, title: "Start with what is already written down", lede: "Your existing nominations and policies. For many people, reviewing those is most of what this needs." },
    action: "Talk about wealth and legacy",
  },
  "corporate": {
    bar: { facts: ["Headcount is enough to begin", "A proposal in writing", "Reviewed every year"], statement: "Sized to the team you actually have." },
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
      { src: "/media/img/dva-team.jpg", alt: "A business team together" },
      { src: "/media/img/dva-workshop.jpg", alt: "A workshop session in progress" },
      { src: "/media/img/close-conversation.jpg", alt: "Two people in a careful conversation" },
      { src: "/media/img/policy-review.jpg", alt: "Scheme documents being reviewed" },
      { src: "/media/img/community-gathering.jpg", alt: "Colleagues seated around a table" },
    ],
    ideaIcons: ["people", "building", "shield", "doc"],
    explain: { label: "What it actually means", title: "What we help with", lede: "Three areas. Most companies need the first, and should at least have considered the other two." },
    steps: { label: "How the conversation goes", title: "How an engagement works" },
    said: { quote: "A benefits scheme nobody has explained to the staff is a cost, not a benefit. Half the value is in the briefing.", cite: "D’Life advisory team" },
    qa: { label: "Common questions", title: "What people ask us first" },
    closing: { photo: { src: "/media/img/close-conversation.jpg", alt: "", position: "50% 40%" }, title: "Start with a scoping conversation", lede: "Headcount, what is already in place, and what prompted the question. That is enough for a first discussion." },
    action: "Enquire about corporate solutions",
  },
};
