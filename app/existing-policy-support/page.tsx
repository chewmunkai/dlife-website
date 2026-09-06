import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import Ask from "../../components/v2/Ask";
import JsonLd from "../../components/site/JsonLd";
import { Hero, Bar, Band, Open, Ideas, Said, ClosingCard } from "../../components/v2/blocks";
import { ROUTES } from "../../lib/routes";
import { link } from "../../lib/asset";
import { WA, waHref } from "../../lib/contact";
import { pageMeta, breadcrumbLd, faqLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.policy);

/* ============================================================
   Existing Policy Support.

   ⚠️ STANDING GUARDRAIL, from the design bundle and the direction guide.
   This page must never:
     · name an insurer or a competitor
     · imply that whoever advised the visitor before did a poor job
     · suggest switching agency, or read as acquisition dressed as service

   It is a service offer. The page says outright that most reviews end with
   the client keeping exactly what they had, and the `.fnote` states what the
   review is not. Removing either of those turns a service page into a
   prospecting page, which is the failure mode this copy was written against.
   ============================================================ */

/* Keyed `term` to match the Ideas card contract. */
const IS = [
  {
    term: "Your cover, in plain language",
    copy: "What you actually hold, without the policy wording. You keep a written summary you can read again in 2 years.",
  },
  {
    term: "A check on the details",
    copy: "Nominations, contact details and sums insured, against the circumstances you are in now rather than the ones on file.",
  },
  {
    term: "An honest view of the fit",
    copy: "Including when the honest view is that your arrangements are already reasonable. That is a common outcome.",
  },
  {
    term: "The questions you have been meaning to ask",
    copy: "The ones people put off, because they assumed they should already know the answer.",
  },
  {
    term: "A conversation you can end",
    copy: "At any point, with no follow-up sequence waiting behind it.",
  },
];

const POINTS = [
  "What the policy actually covers, in ordinary words",
  "The limits: annual, lifetime, and per condition where they apply",
  "What you would pay yourself before cover begins",
  "Any exclusions, and whether they still apply to you",
  "Whether the cover continues if you change jobs or retire",
  "Whether your nominated beneficiaries are still the right ones",
  "Whether the amount still matches your responsibilities today",
  "What would happen at the point of a claim, step by step",
];

const STEPS = [
  {
    k: "Step one",
    title: "Send us what you have",
    copy: "A photograph of the policy schedule is enough. If you cannot find it, the policy number will usually do.",
  },
  { k: "Step two", title: "We read it properly", copy: "Before the conversation, not during it." },
  {
    k: "Step three",
    title: "We go through it together",
    copy: "In person, by call, or over WhatsApp if that is easier.",
  },
  {
    k: "Step four",
    title: "You keep a plain summary",
    copy: "What you hold, in words you can read again in 2 years. Whether anything changes is entirely up to you.",
  },
];

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
  const clarity = waHref(WA.policyClarity);

  return (
    <Shell>
      <Hero
        route={route}
        label="Existing policyholders"
        title="Need clarity on your current coverage?"
        lede="Understand the protection you already have, and review it with greater confidence. Wherever you bought it, and with no obligation to change anything."
        photo={{
          src: "/media/img/policy-review.jpg",
          alt: "An advisor talking a client through their coverage",
          position: "55% 40%",
        }}
        actions={
          <a className="pill" href={clarity}>
            <span>Get clarity on my coverage</span>
          </a>
        }
      />

      {/* A03: the hero above already offers the review on the same prefill. */}
      <Bar
        facts={["Costs you nothing", "Nothing has to change", "Any policy, wherever you bought it"]}
        statement="A review, not a transfer."
      />

      <Band>
        <Open lead="Most people have not read their policy since the day they signed it.">
          <p>
            That is normal. These documents are written in language most of us do not use, and then left alone while
            life carries on changing around them.
          </p>
          <p>
            This is an offer to read yours with you: what it covers, what it does not, and whether it still fits the
            circumstances you are in now rather than the ones you were in when you bought it.
          </p>
        </Open>
      </Band>

      {/* Same treatment as a solution page's "What it actually means": the
          review's components as icon cards. */}
      {/* L06 (client review, 6 Sep 2026): these five run as a rail — four in
          view on a desktop, the fifth an arrow away — rather than the 3+2
          balanced grid the five-term and five-question sections keep. The
          arrows disable at the ends, the track is focusable so a keyboard can
          scroll it, and every card stays reachable on a phone by drag. */}
      {/* Auto-rotating at the client's request (6 Sep 2026). It stops the
          moment anyone hovers, focuses, touches an arrow or presses the pause
          control, and never starts under prefers-reduced-motion — see the note
          on Carousel's `autoRotate`. */}
      <Ideas
        layout="rail"
        autoRotate
        railLabel="review cards"
        title="What happens in a review"
        items={IS}
        icons={["doc", "gauge", "shield", "clock", "people"]}
      />

      {/* A04 (client, 6 Sep 2026): this is the separator the client pointed
          at — the plain footnote that sat between the review cards and the
          eight points. It carries the page's guardrail, which is the single
          most important sentence on it, and it was set as small print.

          It is a quote-style divider now, using the existing `Said` component
          in its cite-less variant. The words are unchanged and unattributed:
          they are the page's own statement, not a quotation from anybody, and
          inventing an attribution to justify the form is exactly what the
          brief rules out. Do not soften this into a benefit. */}
      {/* Client, 6 Sep 2026: "a bit weirdly placed and big — adjust the tone
          and language, make it smooth, redesign this."

          Two problems, and they were related. It was set as a full-width
          pull-quote, which is the largest register the page has, for a
          sentence that is a reassurance rather than a statement of belief. And
          the language was three refusals in a row — not a sales meeting, not
          an assessment, nothing obliges you — which reads as defensive even
          though every word of it is true and load-bearing.

          It says the same three things now, starting with what a review IS.
          The guardrail is intact: no sale, no obligation to move, no judgement
          of whoever advised you before. Do not soften it further into a
          benefit — that is the failure mode this whole page is written
          against. Contained panel, lede scale, not a quotation. */}
      <section className="band light assure-host">
        <p className="assure">
          A review is a conversation about cover you already hold. There is nothing to buy at the end of it, nothing
          you have to move, and no verdict on whoever advised you before.
        </p>
      </section>

      <section className="band light">
        <p className="lbl">What we look at</p>
        <h2>The 8 points that answer most of it</h2>
        {/* 2 x 4 numbered timeline, adapted from the client's reference. */}
        <div className="points">
          {POINTS.map((p, i) => (
            <div className="pt" key={p}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="spread sand">
        <div className="spread__rail">
          <p className="lbl">How it works</p>
          <h2>A review, start to finish</h2>
          <p className="aside">
            Usually under an hour. Bring someone if you would rather not do it alone, and stop at any point.
          </p>
        </div>
        <div className="spread__body">
          <div className="seq">
            {STEPS.map((s) => (
              <div key={s.title}>
                <span className="k">{s.k}</span>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="ask-host light">
        <div className="ask-head">
          <h2>Common questions</h2>
        </div>
        <div>
          <Ask items={FAQS} />
          <div className="dl-actions" style={{ marginTop: "clamp(28px,4vh,44px)" }}>
            <a className="pill ghost" href={link(ROUTES.contact.path)}>
              <span>Ask us something else</span>
            </a>
          </div>
        </div>
      </section>

      <ClosingCard
        title="Get guidance on your existing policy"
        lede="Send the policy schedule, or just the number. We will read it before we speak, and see what next step, if any, makes sense."
        actions={
          <>
            <a className="pill sand" href={clarity}>
              <span>Get clarity on my coverage</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.solutions.path)}>
              <span>Explore protection &amp; planning</span>
            </a>
          </>
        }
      />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS)} />
    </Shell>
  );
}
