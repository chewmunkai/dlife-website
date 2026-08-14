import type { Qa } from "../components/blocks/Faq";

/**
 * Homepage FAQ.
 *
 * Lives here rather than inside components/DLife.tsx because that file is a
 * client module: a plain value exported from a `"use client"` file and
 * imported by a server component arrives as a client reference proxy, not the
 * array itself, so building the FAQPage structured data from it fails at
 * prerender. Content belongs in `content/` regardless — this is the reason it
 * cannot live anywhere else.
 *
 * The accordion and the structured data both read this array, so an answer
 * cannot be edited on screen and left stale in the markup search engines read.
 */
export const HOME_FAQS: Qa[] = [
  {
    q: "How do I know which protection I actually need?",
    a: "Start with a conversation, not a product. We’ll look at your situation, your responsibilities and what you already have, then explain your options in plain language.",
  },
  {
    q: "Can I get clarity on a policy I already hold?",
    a: "Yes. Many people simply want to understand what they’re covered for. We’re happy to walk you through it, with no obligation to change anything.",
  },
  {
    q: "Can I speak with someone before deciding anything?",
    a: "Always. Most conversations with us don’t end in a decision, and that’s completely fine.",
  },
  {
    q: "What happens after I take up a policy?",
    a: "Your advisor stays with you. Life changes, and your coverage should be reviewed as it does.",
  },
];
