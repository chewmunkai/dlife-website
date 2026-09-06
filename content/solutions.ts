import type { Qa } from "../components/blocks/Faq";
import type { RouteKey } from "../lib/routes";
import { WA } from "../lib/contact";

/* ============================================================
   D'Life — Solutions page content.

   One record per page. The structure follows the four beats the direction
   guide requires of every client-facing path:

     Recognise — use plain language that reflects the visitor's real question
     Explain   — enough clarity without becoming a product catalogue
     Prove     — people, stories, credentials or helpful guidance
     Act       — a specific, low-pressure next step

   Voice rules held throughout, from the tone section of the guide:
   no fear-led framing ("what if you're not covered?"), no exaggerated claims,
   no insurer names, no jargon left unexplained, and nothing that could appear
   on any other Malaysian insurance website unchanged.

   ⚠️ Nothing here quotes a price, a payout, a percentage or a product name.
   Those are regulated statements, they change per insurer and per client, and
   the guide lists all prototype statistics as pending verification. Each page
   explains how a decision is approached, and leaves the numbers to the
   conversation and the product disclosure documents.
   ============================================================ */

export type SolutionContent = {
  /** Chapter label above the H1. */
  label: string;
  /** Visible H1. Shorter and warmer than the <title>. */
  h1: string;
  lede: string;
  photo: { src: string; alt: string };

  /** RECOGNISE — the questions people actually arrive with. */
  recognise: { title: string; intro: string; questions: string[] };

  /** EXPLAIN — what this area of protection actually covers, in plain terms. */
  explain: { title: string; intro: string; terms: Array<{ term: string; copy: string }> };

  /** How a conversation about this actually goes. */
  steps: { title: string; intro?: string; items: Array<{ title: string; copy: string }> };

  /** PROVE — a quiet, human note. Never a statistic we cannot stand behind. */
  prove: { quote: string; cite: string };

  faqs: Qa[];

  /** ACT — the contextual CTA. */
  cta: { title: string; copy: string; wa: string; action: string };

  /** Onward routes. Never fewer than two, never a dead end. */
  related: RouteKey[];
};

export const SOLUTIONS: Record<string, SolutionContent> = {
  "protecting-your-family": {
    label: "Protection & Planning",
    h1: "Protecting your family",
    lede:
      "Most of us have one quiet question: If I were no longer here, would the people I love be taken care of? It’s a question worth planning for.",
    photo: { src: "/media/img/need-family-malaysia.jpg", alt: "Three generations of a family sharing a meal" },
    recognise: {
      title: "What usually prompts this",
      intro:
        "Nobody wakes up wanting to buy insurance. Something changes, and a question that was easy to postpone stops being easy to postpone.",
      questions: [
        "A first child, or a second, and the household now depends on 1 or 2 incomes",
        "A mortgage signed, with 20 or 30 years still to run",
        "Ageing parents who may need support, at the same time as young children",
        "A friend or colleague’s family going through something difficult",
        "A policy bought years ago that nobody has looked at since",
      ],
    },
    explain: {
      title: "What family protection actually means",
      intro:
        "Four ideas cover most of it. None of them are complicated once the words are explained, and you do not need all four.",
      terms: [
        {
          term: "Life cover",
          copy: "A sum paid to the people you name if you die. It replaces what your household would lose, the income and the mortgage, for as long as they would have needed it.",
        },
        {
          term: "Disability cover",
          copy: "Pays out if illness or injury means you can no longer work at all. It often matters more than people expect: the household keeps its costs and loses its earner.",
        },
        {
          term: "Critical illness",
          copy: "A lump sum on diagnosis of a defined serious condition. Not the same as medical cover: this money is yours for anything, including the months you cannot work.",
        },
        {
          term: "Beneficiaries",
          copy: "Who receives the money, and how quickly. The part most often left incomplete, and the part that decides whether a payout helps in the first month or the first year.",
        },
      ],
    },
    steps: {
      title: "How the conversation goes",
      intro: "It is a conversation before it is anything else. Here is the whole shape of it.",
      items: [
        {
          title: "We start with your household, not a product",
          copy: "Who depends on you, what they depend on you for, and what would still need paying if your income stopped. That is the whole first conversation.",
        },
        {
          title: "We look at what you already hold",
          copy: "Including cover from an employer or a policy bought elsewhere. Often there is more in place than people remember, and the gap is smaller than they feared.",
        },
        {
          title: "We show you the options in plain language",
          copy: "What each one does, what it costs, and what it does not do. If 2 options are close, we will say so rather than steer you.",
        },
        {
          title: "You decide in your own time",
          copy: "Including deciding not to. If what you have is already reasonable, we would rather tell you that and stay in touch.",
        },
      ],
    },
    prove: {
      quote:
        "The families who are glad they did this are rarely the ones who bought the most. They are the ones who understood what they bought.",
      cite: "D’Life advisory team",
    },
    faqs: [
      {
        q: "How much cover is enough?",
        a: "There is no universal number. A common starting point is what your household would need to stay steady for the years your dependants still rely on you, covering outstanding loans, living costs and education, less what is already in place. We work it through with you rather than quoting a rule of thumb.",
      },
      {
        q: "I already have cover through my employer. Is that enough?",
        a: "It may be, and we will tell you if it is. Employer cover is worth understanding on 2 points: how much it actually pays, and whether it continues if you change jobs or stop working. Those 2 answers usually settle the question.",
      },
      {
        q: "Is it too late if I am older, or if I have a medical condition?",
        a: "Not necessarily, though it does change what is available and what it costs. It is better to ask than to assume, and if the honest answer is that a policy no longer makes sense for you, we will say so.",
      },
      {
        q: "What if I want to change things later?",
        a: "Most arrangements can be reviewed and adjusted as your life changes. That is the point of having an advisor rather than a policy document: someone reviews it with you when something changes.",
      },
    ],
    cta: {
      title: "Start with a conversation about your household",
      copy: "No forms, no products in the first meeting. Just what your family would need, and what you already have in place.",
      wa: WA.family,
      action: "Talk about protecting my family",
    },
    related: ["protecting-your-income", "medical-health-preparation", "policy"],
  },

  "protecting-your-income": {
    label: "Protection & Planning",
    h1: "Protecting your income",
    lede:
      "Your income is the thing everything else is built on. It is also the thing most households have thought about least.",
    photo: { src: "/media/img/need-income-malaysia.jpg", alt: "A couple working through figures at a laptop" },
    recognise: {
      title: "One question worth sitting with",
      intro:
        "If your income stopped for 6 months, what would change in your household, and in what order? Most people can answer that in about a minute, and the answer is usually clarifying.",
      questions: [
        "The loan repayments that continue regardless",
        "How long savings would realistically last",
        "Whether a partner’s income could carry the household alone",
        "What you would want to protect first, and what could wait",
        "Who you would have to ask for help, and how that would feel",
      ],
    },
    explain: {
      title: "What income protection covers",
      intro:
        "This area gets confused with medical cover more often than any other. They do different jobs, and most households need to understand both.",
      terms: [
        {
          term: "Income replacement",
          copy: "A regular payment while illness or injury stops you working. It covers a portion of what you earned, not all of it, and it ends when you return to work.",
        },
        {
          term: "Waiting period",
          copy: "How long before payments begin. A longer wait costs less, a shorter one matters more if savings are thin. Usually the most consequential choice on the policy.",
        },
        {
          term: "Benefit period",
          copy: "How long payments continue: a fixed number of years, or through to retirement. Where a policy either does its job for a long illness or quietly stops halfway.",
        },
        {
          term: "Occupation wording",
          copy: "Whether you are covered when you cannot do your own job, or only any job at all. This wording matters a great deal for skilled and specialised work.",
        },
      ],
    },
    steps: {
      title: "How we work it through",
      items: [
        {
          title: "We look at your fixed costs, not your salary",
          copy: "What has to be paid every month regardless of what happens. That number is what a policy has to stand behind.",
        },
        {
          title: "We check what you already have",
          copy: "Employer sick pay, existing policies, and savings you would genuinely be willing to spend. The gap is what is left after all of that.",
        },
        {
          title: "We look at the wording, not just the price",
          copy: "The waiting period, the benefit period and the definition of disability decide whether a policy works. 2 policies at the same price can behave completely differently.",
        },
        {
          title: "We review it when your income changes",
          copy: "A policy set against a salary from 5 years ago is protecting a household that no longer exists.",
        },
      ],
    },
    prove: {
      quote:
        "People insure the car and the house without thinking. The income that pays for both is the one that gets left to last.",
      cite: "D’Life advisory team",
    },
    faqs: [
      {
        q: "How is this different from medical insurance?",
        a: "Medical cover pays the hospital. Income protection pays you, so the household keeps running while you recover. A serious illness usually creates both costs at once, which is why the two are considered together.",
      },
      {
        q: "I am self-employed. Does this work differently for me?",
        a: "The principle is the same, but there is no employer sick pay behind you, so the waiting period matters more. Documentation of income also works differently, and we will walk you through what is needed before you apply.",
      },
      {
        q: "What if I never claim?",
        a: "Then you will have paid for cover you did not need, which is the outcome everyone should hope for. If that trade does not feel worth it to you at your stage of life, that is a legitimate conclusion and we will not push against it.",
      },
    ],
    cta: {
      title: "Work out what your income actually has to carry",
      copy: "Bring your fixed monthly costs. That one number does most of the work in this conversation.",
      wa: WA.income,
      action: "Talk about protecting my income",
    },
    related: ["medical-health-preparation", "protecting-your-family", "policy"],
  },

  "medical-health-preparation": {
    label: "Protection & Planning",
    h1: "Medical & health preparation",
    lede:
      "Treatment in Malaysia can be excellent and it can be expensive. Preparation is mostly about understanding which costs land on you, and when.",
    photo: { src: "/media/img/need-health-malaysia.jpg", alt: "Two family members in consultation with an advisor" },
    recognise: {
      title: "What people usually want to know",
      intro:
        "Medical cover is the product most Malaysians already hold and least often understand. These are the questions that come up in almost every conversation.",
      questions: [
        "What my annual and lifetime limits actually are",
        "How much I would pay myself before cover starts",
        "Whether my plan covers private hospitals, and which ones",
        "What happens to my cover when I retire or change jobs",
        "Whether a condition I already have is covered or excluded",
      ],
    },
    explain: {
      title: "The parts of a medical plan that decide everything",
      intro:
        "Five terms. Once these are clear, most medical plans become straightforward to compare.",
      terms: [
        {
          term: "Payment limits",
          copy: "The ceiling on what the plan pays in one year, and across the whole policy. A high annual limit with a low lifetime limit can run out during a long illness.",
        },
        {
          term: "Your share",
          copy: "The part of the medical bill you pay yourself. This may be a fixed deductible, or a percentage of each claim. A higher deductible can reduce your premium, but means you pay more when you receive treatment.",
        },
        {
          term: "Room and board rate",
          copy: "The daily ward rate your plan is set at. This one quietly governs the rest: exceed it and some plans reduce every other benefit proportionally.",
        },
        {
          term: "Pre-existing conditions",
          copy: "What is excluded because you already had it, and how long you wait before it is covered. Disclosure at application keeps a claim clean later.",
        },
        {
          term: "Portability",
          copy: "Whether cover follows you when you leave an employer. Company cover usually stops when the job does, which is worth knowing before you need it.",
        },
      ],
    },
    steps: {
      title: "How a medical review works",
      intro: "Most people who come to us on this subject already have cover. The work is usually understanding it, not replacing it.",
      items: [
        {
          title: "We read what you hold",
          copy: "Your schedule of benefits, in full. This is the document that answers almost every question, and it is the one almost nobody has read.",
        },
        {
          title: "We translate it",
          copy: "Limits, deductible, room rate, exclusions: in plain words, with the parts that matter for your circumstances flagged.",
        },
        {
          title: "We identify the real gaps",
          copy: "Not every gap needs filling. Some are reasonable trade-offs for the premium you are paying, and we will say which.",
        },
        {
          title: "You decide what, if anything, to change",
          copy: "Often the answer is a small adjustment, or nothing at all. Both are fine outcomes for this conversation.",
        },
      ],
    },
    prove: {
      quote:
        "Ninety per cent of the medical questions we are asked are answered by a document the client already owns. Reading it together is most of the job.",
      cite: "D’Life advisory team",
    },
    faqs: [
      {
        q: "I have medical cover through my employer. Do I need my own?",
        a: "It depends on 2 things: whether the limits suit the care you would want, and what happens when you leave that job. Employer cover is real cover. It just stops being yours when the employment does. Worth knowing which of those applies to you before you decide.",
      },
      {
        q: "Can I be covered if I already have a condition?",
        a: "Sometimes yes with an exclusion, sometimes yes at a higher premium, sometimes no. Disclosing it fully at application is what protects the claim later, and we will always tell you where you stand before anything is submitted.",
      },
      {
        q: "Will you tell me if my current plan is already fine?",
        a: "Yes. That is a common outcome of this conversation and a perfectly good one.",
      },
    ],
    cta: {
      title: "Have your medical cover explained to you",
      copy: "Bring your schedule of benefits, or just the policy number. We will walk through what it actually covers, with no obligation to change anything.",
      wa: WA.medical,
      action: "Talk about medical cover",
    },
    related: ["policy", "protecting-your-income", "protecting-your-family"],
  },

  "planning-for-your-future": {
    label: "Protection & Planning",
    h1: "Planning for your future",
    lede:
      "Retirement planning is less about a number than about a series of decisions you could explain, in your own words, to your own family.",
    photo: { src: "/media/img/need-family.jpg", alt: "People sitting together at an outdoor table" },
    recognise: {
      title: "Where people usually start",
      intro:
        "Almost nobody arrives with a plan. They arrive with a feeling that they should have one, and a few specific worries underneath it.",
      questions: [
        "Whether EPF alone will be enough, and what “enough” even means",
        "How to think about the years between stopping work and needing care",
        "What inflation does to a fixed sum over 20 years",
        "How to balance saving for retirement against children’s education",
        "Whether it is too late to start, or too early to bother",
      ],
    },
    explain: {
      title: "The pieces of a retirement picture",
      intro:
        "Four components, and most Malaysian households already have at least two of them.",
      terms: [
        {
          term: "EPF and pensions",
          copy: "The foundation for most people. Worth knowing what it is projected to provide monthly rather than as a total. The monthly figure is the one that tells you something.",
        },
        {
          term: "Savings and investment",
          copy: "What you set aside beyond EPF, and how it is invested. Time horizon matters more than product selection at almost every stage of this.",
        },
        {
          term: "Retirement income",
          copy: "Arrangements that pay out over time rather than as a lump sum. Their value is predictability, their cost is flexibility, and the trade depends on what else you hold.",
        },
        {
          term: "Cover that continues",
          copy: "Medical cover in later life, and cover that protects the plan if you cannot work to the end of it. A plan assuming uninterrupted earnings carries one large assumption.",
        },
      ],
    },
    steps: {
      title: "How we approach it",
      items: [
        {
          title: "We start from the life, not the figure",
          copy: "What you want the years after work to look like, in ordinary terms. The number follows from that, rather than the other way round.",
        },
        {
          title: "We map what is already working",
          copy: "EPF, savings, property, existing policies. Most people are further along than they think, and seeing it in one place is often the most useful part.",
        },
        {
          title: "We look at the gap honestly",
          copy: "Including when the honest answer is that the target needs adjusting rather than the contributions. Not every gap closes, and pretending otherwise helps nobody.",
        },
        {
          title: "We revisit it",
          copy: "A plan set once and never reviewed is a document, not a plan. Income changes, families change, and the plan should move with them.",
        },
      ],
    },
    prove: {
      quote:
        "The best plans we see are not the most sophisticated ones. They are the ones the client can still explain, 5 years later, without looking anything up.",
      cite: "D’Life advisory team",
    },
    faqs: [
      {
        q: "When should I start?",
        a: "Earlier helps, because time does more work than contribution size. But starting later with a realistic target beats not starting because the ideal moment has passed. Neither answer requires you to decide anything today.",
      },
      {
        q: "Is EPF enough on its own?",
        a: "For some households, close to it. For many, it covers the essentials and not much beyond them. The way to know is to look at your own projected monthly figure against the life you have in mind, which is a short conversation.",
      },
      {
        q: "Do I have to commit to something long-term?",
        a: "Not to have the conversation. And if a long commitment does not suit your circumstances, we would rather find that out with you than sell around it.",
      },
    ],
    cta: {
      title: "Put the whole picture in one place",
      copy: "EPF, savings, property, policies. Seeing it together is usually the point at which planning stops feeling abstract.",
      wa: WA.future,
      action: "Talk about planning ahead",
    },
    related: ["wealth-legacy", "protecting-your-income", "about"],
  },

  "wealth-legacy": {
    label: "Protection & Planning",
    h1: "Wealth & legacy",
    lede:
      "Growing what you have built is one job. Passing it on the way you intended is a different one, and it is the one more often left unfinished.",
    photo: { src: "/media/img/need-legacy-malaysia.jpg", alt: "A family looking through documents and photographs together" },
    recognise: {
      title: "The questions behind this one",
      intro:
        "Legacy conversations are rarely about money for long. They tend to arrive at something more particular.",
      questions: [
        "Whether what I leave would reach the people I intend, and how quickly",
        "How to be fair between children in different circumstances",
        "What happens to a business, or a property held with others",
        "How to provide for a dependant who will always need support",
        "Whether my family would know what to do, and where to find things",
      ],
    },
    explain: {
      title: "What this covers",
      intro:
        "Some of this is financial planning and some of it is administration. Both matter, and the administrative half is usually the neglected one.",
      terms: [
        {
          term: "Growing assets",
          copy: "How assets are grown and held long term, and how much risk is worth taking at your stage. Where most people start and, for many, where it should stay.",
        },
        {
          term: "Estate distribution",
          copy: "Who receives what, and through which instrument. In Malaysia this interacts with the law that applies to you, so it is worth specific advice rather than assuming.",
        },
        {
          term: "Cash when needed",
          copy: "Estates are often asset-rich and cash-poor exactly when a family needs cash. Life cover is often used to solve that specific problem rather than to build wealth.",
        },
        {
          term: "Nominations and papers",
          copy: "Nominations kept current, documents findable, and someone who knows where they are. Costs nothing and resolves more difficulty than anything else on this page.",
        },
      ],
    },
    steps: {
      title: "How we work with you on this",
      intro:
        "Estate matters touch law and tax as well as financial planning. We are clear about where our advice ends.",
      items: [
        {
          title: "We map what exists",
          copy: "Assets, policies, nominations, and any arrangements already made. Frequently this surfaces a nomination that has not been updated in a decade.",
        },
        {
          title: "We identify what would actually happen",
          copy: "Given the documents as they stand today, not as you intended them. The distance between the two is the whole conversation.",
        },
        {
          title: "We work with your other advisers",
          copy: "Where a will, a trust or a business agreement is needed, that is a lawyer’s work. We will say so plainly and coordinate rather than improvise.",
        },
        {
          title: "We keep it current",
          copy: "Nominations and intentions drift out of date quietly. A periodic review is most of what keeps this in order.",
        },
      ],
    },
    prove: {
      quote:
        "The families who have the easiest time are not the wealthiest. They are the ones where someone wrote things down and told somebody where they were.",
      cite: "D’Life advisory team",
    },
    faqs: [
      {
        q: "Do you write wills?",
        a: "No. Wills, trusts and estate administration are legal work, and we will point you to a qualified professional. What we do is make sure the financial arrangements and the nominations line up with what that document says.",
      },
      {
        q: "Is this only relevant if I have significant assets?",
        a: "No. A nomination that has not been updated causes the same difficulty for a modest estate as a large one, arguably more, because there is less margin for delay.",
      },
      {
        q: "Where should I start?",
        a: "With your existing nominations. It takes very little time to check them, and for a good number of people that check is the whole job.",
      },
    ],
    cta: {
      title: "Start with what is already written down",
      copy: "Your existing nominations and policies. For many people, reviewing those is most of what this needs.",
      wa: WA.legacy,
      action: "Talk about wealth and legacy",
    },
    related: ["planning-for-your-future", "policy", "about"],
  },

  corporate: {
    label: "Protection & Planning",
    h1: "Corporate solutions",
    lede:
      "Employee protection and business continuity cover, sized to the team you actually have rather than the one a template assumes.",
    photo: {
      src: "/media/img/community-gathering.jpg",
      alt: "Colleagues gathered around a table",
    },
    recognise: {
      title: "What businesses come to us with",
      intro:
        "Usually one of a small number of situations, and usually at a point where the company has grown past what it started with.",
      questions: [
        "A first employee benefits scheme, and no idea what is standard",
        "An existing scheme that has not been reviewed as headcount grew",
        "Retaining people in a market where benefits are part of the offer",
        "What happens to the business if a founder or key person cannot work",
        "A partnership with no agreement covering what happens if one partner exits",
      ],
    },
    explain: {
      title: "What we help with",
      intro: "Three areas. Most companies need the first, and should at least have considered the other two.",
      terms: [
        {
          term: "Employee benefits",
          copy: "Group medical, group life and related cover for your team. The questions are about levels and eligibility: who is covered, to what standard, and at what cost per head.",
        },
        {
          term: "Key person cover",
          copy: "Protection for the business against losing someone it genuinely depends on. Small companies often carry more of this risk in one or two people than they realise.",
        },
        {
          term: "Continuity and succession",
          copy: "What happens to ownership if a shareholder dies or becomes unable to work. This is where cover and a legal agreement have to be designed together.",
        },
      ],
    },
    steps: {
      title: "How an engagement works",
      items: [
        {
          title: "A scoping conversation",
          copy: "Headcount, structure, what is already in place and what prompted the question. Usually under an hour.",
        },
        {
          title: "A written proposal",
          copy: "Options and costs set out so your finance and HR people can compare them without needing us in the room.",
        },
        {
          title: "Implementation and onboarding",
          copy: "Including explaining the benefits to your team, which is the step that decides whether they are valued or ignored.",
        },
        {
          title: "Annual review",
          copy: "Headcount changes, and a scheme designed for fifteen people rarely still suits forty.",
        },
      ],
    },
    prove: {
      quote:
        "A benefits scheme nobody has explained to the staff is a cost, not a benefit. Half the value is in the briefing.",
      cite: "D’Life advisory team",
    },
    faqs: [
      {
        q: "How small is too small for a group scheme?",
        a: "Smaller than most people expect, though below a certain headcount individual cover can work out better. We will tell you which side of that line you are on before proposing anything.",
      },
      {
        q: "We already have a scheme. Is a review worth it?",
        a: "If it has not been looked at since it was set up and your headcount has changed materially, usually yes. If it was reviewed recently and it fits, we will say so.",
      },
      {
        q: "Who would we be dealing with?",
        a: "A named advisor, and the same one at renewal. Continuity is the part of this that most companies say has been missing.",
      },
    ],
    cta: {
      title: "Start with a scoping conversation",
      copy: "Headcount, what is already in place, and what prompted the question. That is enough for a first discussion.",
      wa: WA.corporate,
      action: "Enquire about corporate solutions",
    },
    related: ["policy", "careers", "about"],
  },
};
