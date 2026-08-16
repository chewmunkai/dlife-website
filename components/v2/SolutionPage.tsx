import type { ReactNode } from "react";
import Shell from "./Shell";
import Ask from "./Ask";
import JsonLd from "../site/JsonLd";
import { Hero, Bar, Band, Open, Duo, SplitShot, Checks, Rail, Said, Closing, Defs } from "./blocks";
import { SOLUTIONS } from "../../content/solutions";
import { SOLUTIONS_E2 } from "../../content/solutions-e2";
import { ROUTES, type RouteKey } from "../../lib/routes";
import { link } from "../../lib/asset";
import { waHref } from "../../lib/contact";
import { breadcrumbLd, faqLd, serviceLd } from "../../lib/seo";

/* ============================================================
   One template, six pages — the new design.

   The same six beats as components/pages/SolutionPage.tsx, rebuilt on the
   unprefixed block library and the new shell. Copy still lives in two files
   and none of it lives here: content/solutions.ts holds the beats,
   content/solutions-e2.ts holds what this design adds.

   Two deliberate differences from the previous template:

   · The WhatsApp CTAs resolve server-side through waHref() rather than
     shipping `data-wa` with `href="#"`. That attribute was hydrated by
     lib/dlife.ts, which belongs to the old motion engine and is not loaded by
     this shell — the links would be dead.
   · No RelatedContent block. The design ends these pages on the closing
     panel, which carries two onward actions of its own, so the page does not
     dead-end. The legal pages do get a related block, because the design puts
     one there.
   ============================================================ */

/** The design links this exact phrase to the policy-support page in the
 *  opening prose of three of the six pages. Linkifying by phrase keeps the
 *  copy files plain strings rather than markup. */
const POLICY_PHRASE = "Existing Policy Support";

function withPolicyLink(text: string): ReactNode {
  const i = text.indexOf(POLICY_PHRASE);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <a href={link(ROUTES.policy.path)}>{POLICY_PHRASE}</a>
      {text.slice(i + POLICY_PHRASE.length)}
    </>
  );
}

export default function SolutionPage({ slug }: { slug: keyof typeof SOLUTIONS }) {
  const c = SOLUTIONS[slug];
  const e = SOLUTIONS_E2[slug];
  const route = ROUTES[slug as RouteKey];
  const wa = waHref(c.cta.wa);

  return (
    <Shell>
      {/* The hero photograph comes from content/solutions.ts, not from the E2
          layer. The design bundle ships one generic hero across all six pages;
          this repo replaced those with Malaysian photography in an earlier
          client round, and matching the bundle would undo that decision. */}
      <Hero
        route={route}
        label={c.label}
        title={c.h1}
        lede={c.lede}
        photo={c.photo}
        actions={
          <a className="pill" href={wa}>
            <span>{e.action}</span>
          </a>
        }
      />

      <Bar
        facts={e.bar.facts}
        statement={e.bar.statement}
        action={
          <a className="pill" href={wa}>
            <span>Start a conversation</span>
          </a>
        }
      />

      <Band>
        <Open lead={e.open.lead}>
          {e.open.prose.map((p) => (
            <p key={p}>{withPolicyLink(p)}</p>
          ))}
        </Open>
        <Duo a={e.duo} />
      </Band>

      {/* RECOGNISE — the visitor's own question, in their words, before any
          explanation of ours. */}
      <SplitShot photo={e.split.photo} flip={e.split.flip} tone="dark" label={e.split.label} title={e.split.title}>
        <Checks items={c.recognise.questions} columns={1} />
      </SplitShot>

      {/* EXPLAIN — enough clarity, without becoming a product catalogue. */}
      <Band label={e.explain.label} title={e.explain.title} lede={e.explain.lede}>
        <Defs items={c.explain.terms} />
      </Band>

      <Band tone="sand" label={e.steps.label} title={e.steps.title} lede={e.steps.lede}>
        <Rail steps={c.steps.items} />
      </Band>

      {/* PROVE — a human note rather than a statistic. Every figure on this
          site is pending client verification, and an unverified number is
          worse proof than an honest sentence. */}
      <Said photo={e.said.photo} quote={<>“{c.prove.quote}”</>} cite={c.prove.cite} />

      <section className="ask-host light">
        <div className="ask-head">
          <p className="lbl">{e.qa.label}</p>
          <h2>{e.qa.title}</h2>
        </div>
        <div>
          <Ask items={c.faqs.map((f) => ({ q: f.q, a: f.a }))} />
          <div className="dl-actions" style={{ marginTop: "clamp(28px,4vh,44px)" }}>
            <a className="pill ghost" href={link(ROUTES.contact.path)}>
              <span>Ask us something else</span>
            </a>
          </div>
        </div>
      </section>

      {/* ACT — one specific, low-pressure next step, carrying this page's own
          WhatsApp prefill so the team can see which subject produced it. */}
      <Closing
        photo={e.closing.photo}
        title={e.closing.title}
        lede={e.closing.lede}
        actions={
          <>
            <a className="pill sand" href={wa}>
              <span>{e.action}</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.solutions.path)}>
              <span>Explore protection &amp; planning</span>
            </a>
          </>
        }
      />

      <JsonLd data={serviceLd(route)} />
      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(c.faqs)} />
    </Shell>
  );
}
