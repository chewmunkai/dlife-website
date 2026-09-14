import type { ReactNode } from "react";
import SiteShell from "../site/SiteShell";
import JsonLd from "../site/JsonLd";
import { DefList } from "../blocks/Prose";
import RelatedContent from "../blocks/Related";
import {
  E2Hero,
  E2Bar,
  E2Band,
  E2Open,
  E2Duo,
  E2Split,
  E2Checks,
  E2Rail,
  E2Qa,
  E2Said,
  E2Closing,
} from "../blocks/E2";
import { SOLUTIONS } from "../../content/solutions";
import { SOLUTIONS_E2 } from "../../content/solutions-e2";
import { ROUTES, type RouteKey } from "../../lib/routes";
import { link } from "../../lib/asset";
import { breadcrumbLd, faqLd, serviceLd } from "../../lib/seo";

/* ============================================================
   One template, six pages — direction E2 ("layered depth").

   The four beats the direction guide requires of every client-facing path are
   unchanged; what changed is how they are carried. Recognise is now a
   half-page photograph beside a numbered ledger, Explain is a definition list
   under its own headline, How-it-works is a timeline on a copper line, and
   Prove is a quotation over a photograph rather than a boxed pull-quote.

   Copy lives in two files and none of it lives here: content/solutions.ts
   holds the beats, content/solutions-e2.ts holds what this design adds.
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

  const talk = (
    <a className="pill" data-wa={c.cta.wa} href="#">
      <span>{e.action}</span>
    </a>
  );

  return (
    <SiteShell path={route.path}>
      <E2Hero route={route} label={c.label} title={c.h1} lede={c.lede} photo={c.photo} actions={talk} />

      <E2Bar
        facts={e.bar.facts}
        statement={e.bar.statement}
        action={
          <a className="pill" data-wa={c.cta.wa} href="#">
            <span>Start a conversation</span>
          </a>
        }
      />

      <E2Band>
        <E2Open lead={e.open.lead}>
          {e.open.prose.map((p) => (
            <p key={p}>{withPolicyLink(p)}</p>
          ))}
        </E2Open>
        <E2Duo a={e.duo} />
      </E2Band>

      {/* RECOGNISE — the visitor's own question, in their words, before any
          explanation of ours. */}
      <E2Split photo={e.split.photo} flip={e.split.flip} tone="dark" label={e.split.label} title={e.split.title}>
        <E2Checks items={c.recognise.questions} columns={1} />
      </E2Split>

      {/* EXPLAIN — enough clarity, without becoming a product catalogue. */}
      <E2Band label={e.explain.label} title={e.explain.title} lede={e.explain.lede}>
        <DefList items={c.explain.terms} />
      </E2Band>

      <E2Band tone="sand" label={e.steps.label} title={e.steps.title} lede={e.steps.lede}>
        <E2Rail steps={c.steps.items} />
      </E2Band>

      {/* PROVE — a human note rather than a statistic. Every figure on this
          site is pending client verification, and an unverified number is
          worse proof than an honest sentence. */}
      <E2Said photo={e.said.photo} quote={<>“{c.prove.quote}”</>} cite={c.prove.cite} tone="dark" />

      <E2Band read label={e.qa.label} title={e.qa.title}>
        <E2Qa items={c.faqs.map((f) => ({ q: f.q, a: f.a }))} />
      </E2Band>

      {/* ACT — one specific, low-pressure next step, carrying this page's own
          WhatsApp prefill so the team can see which subject produced it. */}
      <E2Closing
        photo={e.closing.photo}
        title={e.closing.title}
        lede={e.closing.lede}
        actions={
          <>
            <a className="pill sand" data-wa={c.cta.wa} href="#">
              <span>{e.action}</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.solutions.path)}>
              <span>Explore protection &amp; planning</span>
            </a>
          </>
        }
      />

      <RelatedContent keys={c.related} tone="sand" />

      <JsonLd data={serviceLd(route)} />
      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(c.faqs)} />
    </SiteShell>
  );
}
