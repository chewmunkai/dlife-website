import type { ReactNode } from "react";
import Shell from "./Shell";
import { servicePhotos } from "../../content/service-photos";
import Ask from "./Ask";
import JsonLd from "../site/JsonLd";
import { Hero, Bar, Band, Said, OpenStatement, Moments, Ideas, StepsPanel, ClosingCard } from "./blocks";
import { SOLUTIONS } from "../../content/solutions";
import { SOLUTIONS_E2 } from "../../content/solutions-e2";
import { ROUTES, SOLUTION_SLUGS, type RouteKey } from "../../lib/routes";
import { link } from "../../lib/asset";
import { waHref } from "../../lib/contact";
import { breadcrumbLd, faqLd, serviceLd } from "../../lib/seo";

/* ============================================================
   One template, six pages — August 2026 amendments round.

   The four beats are unchanged; four sections were rebuilt at the client's
   direction (see styles/amendments.css for each design's rationale):

   · The opening is now a typographic statement (OpenStatement), not a
     side-by-side block.
   · RECOGNISE lost its photograph and its label: the five situations ARE the
     content, as numbered statement rows (Moments).
   · EXPLAIN is a hairline windowpane (Ideas).
   · The steps ride a contained ink panel (StepsPanel) for contrast.
   · The closing is a premium rounded card with the brand's ring motif and no
     background photograph (ClosingCard).
   · The intent bar no longer sticks.

   Copy still lives in content/solutions.ts + content/solutions-e2.ts and
   none of it lives here.
   ============================================================ */

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
  const photos = servicePhotos(slug, c.photo, e.moments);
  const route = ROUTES[slug as RouteKey];
  const wa = waHref(c.cta.wa);
  /* The six areas read as a sequence, wrapping at the end, so the closing
     card always has somewhere new to send the reader. */
  const order = SOLUTION_SLUGS;
  const next = order[(order.indexOf(slug as (typeof order)[number]) + 1) % order.length] as RouteKey;

  return (
    <Shell>
      <Hero
        route={route}
        label={c.label}
        title={c.h1}
        lede={c.lede}
        photo={photos.hero}
        actions={
          <a className="pill" href={wa}>
            <span>{e.action}</span>
          </a>
        }
      />

      {/* A03: this carried a second "Start a conversation" pill going to the
          same WhatsApp prefill as the hero button directly above it. The hero
          keeps the action; the strip goes back to being three credentials and
          a statement. The closing panel still offers the same step at the
          bottom of the page, where it is the next thing rather than a repeat. */}
      <Bar facts={e.bar.facts} statement={e.bar.statement} />

      {/* The opening carries no photograph: the letterboxed plate sat between
          the statement and the section below it at an awkward crop, and the
          page already opens on the hero image and closes on another. Type
          alone here reads more confidently. */}
      <Band>
        <OpenStatement kick={c.label} lead={e.open.lead}>
          {e.open.prose.map((p) => (
            <p key={p}>{withPolicyLink(p)}</p>
          ))}
        </OpenStatement>
      </Band>

      {/* RECOGNISE — the visitor's own situations, each with a photograph. */}
      <Moments title={e.split.title} items={c.recognise.questions} photos={photos.moments} />

      {/* EXPLAIN — tinted icon cards. */}
      <Ideas
        label={e.explain.label}
        title={e.explain.title}
        lede={e.explain.lede}
        items={c.explain.terms}
        icons={e.ideaIcons}
      />

      {/* The steps, on their dark room. */}
      <StepsPanel label={e.steps.label} title={e.steps.title} lede={e.steps.lede} steps={c.steps.items} />

      {/* PROVE — a human note rather than a statistic. */}
      <Said photo={e.said.photo} quote={<>“{c.prove.quote}”</>} cite={c.prove.cite} />

      <section className="ask-host light">
        <div className="ask-head">
          {/* The pre-headline is optional: on the client's direction the FAQ
              heading is now just "Common questions", which the label used to
              say, so a label above it would repeat the heading. */}
          {e.qa.label && <p className="lbl">{e.qa.label}</p>}
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

      {/* ACT — the primary action is this page's own conversation; the
          secondary now advances the reader to the next area rather than
          repeating the hero's CTA or dropping them back on the hub. */}
      <ClosingCard
        title={e.closing.title}
        lede={e.closing.lede}
        actions={
          <>
            <a className="pill" href={wa}>
              <span>{e.action}</span>
            </a>
            <a className="pill ghost" href={link(ROUTES[next].path)}>
              <span>Next: {ROUTES[next].label}</span>
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
