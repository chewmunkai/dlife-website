import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import JsonLd from "../../components/site/JsonLd";
import PageHero from "../../components/blocks/PageHero";
import { Band, Prose, CheckList, Pullquote } from "../../components/blocks/Prose";
import { Steps, Contrast } from "../../components/blocks/Steps";
import Faq from "../../components/blocks/Faq";
import ContextualCTA from "../../components/blocks/CTA";
import RelatedContent from "../../components/blocks/Related";
import { ROUTES } from "../../lib/routes";
import { WA } from "../../lib/contact";
import { pageMeta, breadcrumbLd, faqLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.policy);

/* ============================================================
   ⚠️ GUARDRAILED PAGE. Read before editing.

   The direction guide draws a hard boundary around this journey. It is a
   service-led trust offering for people who already hold a policy — NOT a
   client-acquisition play built on dissatisfaction with another advisor.

   Nothing on this page may contain:
     ✗ an insurer or competing agency name
     ✗ "lost touch with your agent" or any variation
     ✗ advisor disappearance or abandonment language
     ✗ negative competitor comparison
     ✗ any agency-switching or client-poaching implication

   What it may contain: clarity, current coverage, guidance and review,
   confidence and questions, low-pressure human support.

   The approved wording directions are used verbatim where they fit —
   "Need clarity on your current coverage?", "Understand the protection you
   already have", "Review your coverage with greater confidence".

   This applies to the page copy, the FAQ, the CTA wording, the metadata and
   the WhatsApp prefills alike.
   ============================================================ */

const FAQS = [
  {
    q: "Do I have to move my policy to D’Life?",
    a: "No. This is a review, not a transfer. Most people who come to us for this keep everything exactly where it is, and that is a perfectly good outcome.",
  },
  {
    q: "What does it cost?",
    a: "Nothing. Understanding what you already hold is something we are happy to help with, whether or not anything follows from it.",
  },
  {
    q: "What should I bring?",
    a: "Your policy schedule or schedule of benefits if you can find it. If you cannot, the policy number is usually enough to get started, and we can work from what you remember.",
  },
  {
    q: "Will you tell me if my current coverage is already fine?",
    a: "Yes, and it often is. If your arrangements look reasonable for your circumstances, we will say so plainly and leave it there.",
  },
  {
    q: "What if I have questions later?",
    a: "Ask them. There is no expectation that a review leads anywhere, and no follow-up sequence waiting behind it.",
  },
];

export default function Page() {
  const route = ROUTES.policy;

  return (
    <SiteShell path={route.path}>
      <PageHero
        route={route}
        label="Existing policyholders"
        title={<>Need clarity on your current coverage?</>}
        lede="Understand the protection you already have, and review it with greater confidence. Wherever you bought it, and with no obligation to change anything."
        photo={{
          src: "/media/img/policy-review.jpg",
          alt: "An advisor talking a client through their coverage",
        }}
      />

      <Band width="read">
        <Prose>
          <p>
            A lot of people hold a policy they have not looked at since the day they signed it. That is completely
            normal. Policies are written in a language most of us do not use, filed somewhere sensible, and then left
            alone for a decade while life carries on changing around them.
          </p>
          <p>
            This is simply an offer to read it with you. What it covers, what it does not, and whether it still matches
            the circumstances you are in now rather than the ones you were in when you bought it.
          </p>
        </Prose>
      </Band>

      {/* Drawing the boundary explicitly is more reassuring than any amount of
          soft language around it. */}
      <Band tone="sand" label="To be clear" title={<>What this is, and what it is not</>} width="wide">
        <Contrast
          left={{
            heading: "What this is",
            items: [
              "A plain-language explanation of cover you already hold",
              "A check that your nominations and details are still current",
              "An honest view on whether it still fits your circumstances",
              "Answers to the questions you have been meaning to ask someone",
              "A conversation you can end at any point",
            ],
          }}
          right={{
            heading: "What this is not",
            items: [
              "A sales meeting with a review attached",
              "An assessment of whoever advised you before",
              "A comparison exercise designed to reach one conclusion",
              "Something that obliges you to change anything at all",
              "The start of a follow-up sequence",
            ],
          }}
        />
      </Band>

      <Band label="What we look at" title={<>The parts that usually matter</>} width="wide">
        <Prose>
          <p>
            Most of the useful information is in a document you already own. These are the points we work through, and
            in our experience they answer the great majority of questions people arrive with.
          </p>
        </Prose>
        <CheckList
          items={[
            "What the policy actually covers, in ordinary words",
            "The limits — annual, lifetime, and per condition where they apply",
            "What you would pay yourself before cover begins",
            "Any exclusions, and whether they still apply to you",
            "Whether the cover continues if you change jobs or retire",
            "Whether your nominated beneficiaries are still the right ones",
            "Whether the amount still matches your responsibilities today",
            "What would happen at the point of a claim, step by step",
          ]}
        />
      </Band>

      <Band tone="sand" label="How it works" title={<>A review, start to finish</>} width="wide">
        <Steps
          items={[
            {
              title: "Send us what you have",
              copy: "A photograph of the policy schedule is enough. If you cannot find it, the policy number will usually do, and we can help you request a copy.",
            },
            {
              title: "We read it properly",
              copy: "Before the conversation, not during it. That way the time is spent on your questions rather than on us finding our place in a document.",
            },
            {
              title: "We go through it together",
              copy: "In person, by call, or over WhatsApp if that is easier. Usually under an hour, and you are welcome to bring someone.",
            },
            {
              title: "You keep a plain summary",
              copy: "What you hold, in words you can read again in two years. Whether anything changes is entirely up to you.",
            },
          ]}
        />
      </Band>

      <Band tone="dark" width="read">
        <Pullquote cite="D’Life advisory team">
          “Most of the reviews we do end with the client keeping exactly what they had. They just finally know what it
          is.”
        </Pullquote>
      </Band>

      <Faq items={FAQS} label="Common questions" title={<>What people ask us first</>} />

      <ContextualCTA
        label="Next step"
        title="Get guidance on your existing policy"
        copy="Send the policy schedule, or just the number. We will read it before we speak, and see what next step, if any, makes sense."
        wa={WA.policyClarity}
        action="Get clarity on my coverage"
        secondary={{ label: "Explore protection & planning", href: ROUTES.solutions.path }}
      />

      <RelatedContent keys={["medical-health-preparation", "protecting-your-family", "contact"]} tone="sand" />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS)} />
    </SiteShell>
  );
}
