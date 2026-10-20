import { pageDocument, sectionBlock } from "../define";

/** /careers as a Talous CMS document: today's copy (the lists moved here from the page). The
 *  growth rows stay in content/growth.ts, shared with the homepage. */

const QUALITIES = {
  label: "Who thrives at D’Life?",
  title: "Could this be you?",
  lede: "There is no single formula for success. But the people who thrive here tend to share these qualities.",
  photo: "/media/img/team-office.jpg",
  photoAlt: "D’Life advisors and managers together at the agency office",
  qualities: [
      {
        id: "q1",
        name: "Connect",
        copy: "Confident in building genuine connections with people from different backgrounds."
      },
      {
        id: "q2",
        name: "Understand",
        copy: "Genuinely interested in understanding people, their goals, and what matters to them."
      },
      {
        id: "q3",
        name: "Grow",
        copy: "Open to learning, taking initiative, and continuously developing through experience."
      },
      {
        id: "q4",
        name: "Act with integrity",
        copy: "Committed to doing what is right for the client, even when it does not lead to an immediate sale."
      },
      {
        id: "q5",
        name: "Take ownership",
        copy: "Reliable, self-driven, and committed to following through on what they start."
      },
      {
        id: "q6",
        name: "Build with purpose",
        copy: "Ambitious about building a meaningful career, creating impact, and growing into their full potential."
      }
    ],
};

const GROWTH_BAND = {
  tone: "sand",
  label: "How you would grow",
  title: "What we actually provide",
  note: "**Two things it is not.** It does not work as a side project, and nobody here earns from signing other people up. Advisor earnings are commission-based, supported through a structured 18-month career programme that includes a basic bonus allowance. We would rather talk the detail through with you properly than publish a figure that belongs to somebody else.",
};

export const CAREERS_PAGE = pageDocument([
  [
    "PageHero",
    {
      label: "Grow with D’Life",
      title: "A career built on guidance rather than sales",
      lede: "Advising people on their protection and planning is a profession. It takes licensing, training, judgement and a long attention span.",
      photo: "/media/img/team-outdoors.jpg",
      photoAlt: "The D’Life team together at an agency away day",
      actions: [{ id: "a1", label: "Explore a career conversation", href: "wa:career", style: "pill" }],
    },
  ],
  [
    "PageBar",
    {
      facts: [
        { id: "i1", text: "A conversation, not an interview" },
        { id: "i2", text: "Honest about the hard parts" },
        { id: "i3", text: "No dream-lifestyle pitch" },
      ],
      statement: "An honest conversation about what the work involves.",
    },
  ],
  [
    "PageBand",
    {
      read: true,
      label: "How we recruit",
      title: "You have probably seen how this industry usually recruits. We are not going to do that.",
      lede: "What we can tell you is what the work actually involves, how you would be trained, and who tends to do well at it. If that reads as less exciting than the alternative, we would rather you decided on the accurate version.",
    },
  ],
  [
    "PageCardsBand",
    {
      label: "The work itself",
      title: "What an advisor actually does",
      lede: "6 things that make up the job, before anyone mentions a product or a target.",
      columns: "3",
      cards: [
      {
        id: "c1",
        term: "Licensed advice",
        copy: "A regulated profession with real examinations behind it, and disclosure obligations that matter.",
        icon: "doc"
      },
      {
        id: "c2",
        term: "Long conversations",
        copy: "Most of the week is spent talking with people about money, risk and what they are responsible for.",
        icon: "people"
      },
      {
        id: "c3",
        term: "A client base built slowly",
        copy: "Relationships meant to last years, rather than a pipeline that resets every quarter.",
        icon: "growth"
      },
      {
        id: "c4",
        term: "Being the person who picks up",
        copy: "At the point of a claim you are the one the family calls. That is the part of the job that decides your reputation.",
        icon: "shield"
      },
      {
        id: "c5",
        term: "Continuous learning",
        copy: "Products, rules and tax treatment keep moving. Staying current is in the job description.",
        icon: "swap"
      },
      {
        id: "c6",
        term: "Judgement",
        copy: "Knowing when the right recommendation is to recommend nothing, and saying so.",
        icon: "gauge"
      }
    ],
    },
  ],
  ["CareersGrowth", GROWTH_BAND],
  [
    "FilmsPreview",
    {
      label: "Advisor stories",
      title: "Hear it from our Team",
      lede: "Three of them talking about the work: what an ordinary week contains, and what made them stay.",
    },
  ],
  ["CareersQualities", QUALITIES],
  [
    "PageFaq",
    {
      title: "Common questions",
      faqs: [
      {
        id: "f1",
        q: "Do I need a financial services background?",
        a: "No. A good number of our advisors came from corporate roles in other industries. What matters more is whether you are comfortable having careful conversations with people about things that matter to them."
      },
      {
        id: "f2",
        q: "What qualifications do I need?",
        a: "You will need to be licensed to advise, and we will take you through what that involves and support you through it. It is a real examination process, not a formality."
      },
      {
        id: "f3",
        q: "What does the first year actually look like?",
        a: "Your first year is about learning, growth and building a strong foundation. We begin with a personalised business plan based on your strengths, personality, network and goals.\n\nAlong the way, you’ll develop product knowledge, people skills, communication, mindset and self-awareness, building the confidence and capabilities to grow your career."
      },
      {
        id: "f4",
        q: "How is the income structured?",
        a: "We offer a structured 18-month career programme, which includes a basic bonus allowance alongside commission-based earnings.\n\nBeyond income, the programme is designed to help you build your business, develop your capabilities and accelerate your journey towards leadership."
      },
      {
        id: "f5",
        q: "Is this a full-time commitment?",
        a: "For it to work properly, yes. Advising people on their protection and planning is not something we think is well done around the edges of another job."
      },
      {
        id: "f6",
        q: "What happens if it turns out not to suit me?",
        a: "Then it is better for everybody that you find that out early, and we will say so if we think it. Not every conversation about a career here ends with someone joining, and that is the point of having the conversation."
      }
    ],
      actions: [{ id: "a1", label: "Ask us something else", href: "/contact", style: "pill ghost" }],
    },
  ],
  [
    "PageClosing",
    {
      title: "Explore a career conversation",
      lede: "An honest discussion about what the work involves and whether it fits. It is not an interview, and it does not commit you to anything.",
      actions: [
        { id: "a1", label: "Explore a career conversation", href: "wa:career", style: "pill sand" },
        { id: "a2", label: "Watch advisor stories", href: "/stories", style: "pill ghost" },
      ],
      note: "",
    },
  ],
]);

export const CAREERS_BLOCKS = {
  CareersGrowth: {
    ...sectionBlock("How you would grow (growth rows + note)", GROWTH_BAND, { labels: { label: "Small label", title: "Heading", note: "Note under the rows (**bold** for the lead-in)" }, select: { tone: ["light", "sand", "dark", "ink"] }, long: ["note"] }),
    description: "The four growth rows themselves are shared with the homepage's Careers section and kept with the site.",
  },
  CareersQualities: sectionBlock("Who thrives here (qualities + photo)", { ...QUALITIES, qualities: [{ name: "", copy: "" }] }, { labels: { label: "Small label", title: "Heading", lede: "Intro", qualities: "Qualities", name: "Quality", copy: "Description" }, long: ["lede", "copy"] }),
};
