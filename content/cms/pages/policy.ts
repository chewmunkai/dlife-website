import { pageDocument, sectionBlock } from "../define";

/** /existing-policy-support as a Talous CMS document: today's copy (moved here from the page). */

const items = (list: string[]) => list.map((text, i) => ({ id: `i${i + 1}`, text }));

const POINTS = {
  label: "What we look at",
  title: "The 8 points that answer most of it",
  points: items([
    "What the policy actually covers, in ordinary words",
    "The limits: annual, lifetime, and per condition where they apply",
    "What you would pay yourself before cover begins",
    "Any exclusions, and whether they still apply to you",
    "Whether the cover continues if you change jobs or retire",
    "Whether your nominated beneficiaries are still the right ones",
    "Whether the amount still matches your responsibilities today",
    "What would happen at the point of a claim, step by step",
  ]),
};

const STEPS = {
  label: "How it works",
  title: "A review, start to finish",
  aside: "Usually under an hour. Bring someone if you would rather not do it alone, and stop at any point.",
  steps: [
    { id: "s1", k: "Step one", title: "Send us what you have", copy: "A photograph of the policy schedule is enough. If you cannot find it, the policy number will usually do." },
    { id: "s2", k: "Step two", title: "We read it properly", copy: "Before the conversation, not during it." },
    { id: "s3", k: "Step three", title: "We go through it together", copy: "In person, by call, or over WhatsApp if that is easier." },
    { id: "s4", k: "Step four", title: "You keep a plain summary", copy: "What you hold, in words you can read again in 2 years. Whether anything changes is entirely up to you." },
  ],
};

export const POLICY_PAGE = pageDocument([
  [
    "PageHero",
    {
      label: "Existing policyholders",
      title: "Need clarity on your current coverage?",
      lede: "Understand the protection you already have, and review it with greater confidence. Wherever you bought it, and with no obligation to change anything.",
      photo: "/media/img/eps-hero-advisor.jpg",
      photoAlt: "An advisor talking a client through his policy schedule at a table",
      photoFit: "contain",
      actions: [{ id: "a1", label: "Get clarity on my coverage", href: "wa:policyClarity", style: "pill" }],
    },
  ],
  ["PageBar", { facts: items(["Costs you nothing", "Nothing has to change", "Any policy, wherever you bought it"]), statement: "A review, not a transfer." }],
  [
    "PageBand",
    {
      read: true,
      label: "Your existing cover",
      title: "Most people have not read their policy since the day they signed it.",
      lede: "That is normal. These documents are written in language most of us do not use, and then left alone while life carries on changing around them.",
      prose:
        "This is an offer to read yours with you: what it covers, what it does not, and whether it still fits the circumstances you are in now rather than the ones you were in when you bought it.",
    },
  ],
  [
    "PageIdeas",
    {
      layout: "rail",
      autoRotate: true,
      railLabel: "review cards",
      title: "What happens in a review",
      items: [
        { id: "c1", term: "Your cover, in plain language", copy: "What you actually hold, without the policy wording. You keep a written summary you can read again in 2 years.", icon: "doc" },
        { id: "c2", term: "A check on the details", copy: "Nominations, contact details and sums insured, against the circumstances you are in now rather than the ones on file.", icon: "gauge" },
        { id: "c3", term: "An honest view of the fit", copy: "Including when the honest view is that your arrangements are already reasonable. That is a common outcome.", icon: "shield" },
        { id: "c4", term: "The questions you have been meaning to ask", copy: "The ones people put off, because they assumed they should already know the answer.", icon: "clock" },
        { id: "c5", term: "A conversation you can end", copy: "At any point, with no follow-up sequence waiting behind it.", icon: "people" },
      ],
    },
  ],
  ["PolicyPoints", POINTS],
  ["PolicySteps", STEPS],
  [
    "PageFaq",
    {
      title: "Common questions",
      faqs: [
        { id: "q1", q: "Do I have to move my policy to D’Life?", a: "No. This is a review, not a transfer. Most people who come to us for this keep everything exactly where it is, and that is a perfectly good outcome." },
        { id: "q2", q: "What does it cost?", a: "Nothing. Understanding what you already hold is something we are happy to help with, whether or not anything follows from it." },
        { id: "q3", q: "What should I bring?", a: "Your policy schedule or schedule of benefits if you can find it. If you cannot, the policy number is usually enough to get started, and we can work from what you remember." },
        { id: "q4", q: "Will you tell me if my current coverage is already fine?", a: "Yes, and it often is. If your arrangements look reasonable for your circumstances, we will say so plainly and leave it there." },
        { id: "q5", q: "What if I have questions later?", a: "Ask them. There is no expectation that a review leads anywhere, and no follow-up sequence waiting behind it." },
      ],
      actions: [{ id: "a1", label: "Ask us something else", href: "/contact", style: "pill ghost" }],
    },
  ],
  [
    "PageClosing",
    {
      title: "Get guidance on your existing policy",
      lede: "Send the policy schedule, or just the number. We will read it before we speak, and see what next step, if any, makes sense.",
      actions: [
        { id: "a1", label: "Get clarity on my coverage", href: "wa:policyClarity", style: "pill sand" },
        { id: "a2", label: "Explore protection & planning", href: "/#needs", style: "pill ghost" },
      ],
    },
  ],
]);

export const POLICY_BLOCKS = {
  PolicyPoints: sectionBlock("Points we look at", { ...POINTS, points: [{ text: "" }] }, { labels: { label: "Small label", title: "Heading", points: "Points (numbered in order)", text: "Point" } }),
  PolicySteps: sectionBlock("How it works (steps)", { ...STEPS, steps: [{ k: "", title: "", copy: "" }] }, { labels: { label: "Small label", title: "Heading", aside: "Note beside the steps", steps: "Steps", k: "Step label", copy: "Step text" }, long: ["aside", "copy"] }),
};
