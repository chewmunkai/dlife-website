import SiteShell from "../site/SiteShell";
import JsonLd from "../site/JsonLd";
import PageHero from "../blocks/PageHero";
import { Band, Prose, Pullquote, CheckList, DefList } from "../blocks/Prose";
import { Steps } from "../blocks/Steps";
import Faq from "../blocks/Faq";
import ContextualCTA from "../blocks/CTA";
import RelatedContent from "../blocks/Related";
import { SOLUTIONS } from "../../content/solutions";
import { ROUTES, type RouteKey } from "../../lib/routes";
import { breadcrumbLd, faqLd, serviceLd } from "../../lib/seo";

/**
 * One template, six pages.
 *
 * The direction guide asks every client-facing path to contain the same four
 * beats — recognise, explain, prove, act — so the structure is the template
 * and only the content varies. That also means the WordPress rebuild needs one
 * Elementor template with a repeater behind it, not six hand-built pages.
 */
export default function SolutionPage({ slug }: { slug: keyof typeof SOLUTIONS }) {
  const c = SOLUTIONS[slug];
  const route = ROUTES[slug as RouteKey];

  return (
    <SiteShell path={route.path}>
      <PageHero route={route} label={c.label} title={c.h1} lede={c.lede} photo={c.photo} />

      {/* RECOGNISE — the visitor's own question, in their words, before any
          explanation of ours. */}
      <Band label="Recognise" title={c.recognise.title} width="wide">
        <Prose>
          <p>{c.recognise.intro}</p>
        </Prose>
        <CheckList items={c.recognise.questions} />
      </Band>

      {/* EXPLAIN — enough clarity, without becoming a product catalogue. */}
      <Band tone="sand" label="Explain" title={c.explain.title} width="wide">
        <Prose>
          <p>{c.explain.intro}</p>
        </Prose>
        <DefList items={c.explain.terms} />
      </Band>

      <Band label="How it works" title={c.steps.title} width="wide">
        {c.steps.intro && (
          <Prose>
            <p>{c.steps.intro}</p>
          </Prose>
        )}
        <Steps items={c.steps.items} />
      </Band>

      {/* PROVE — a human note rather than a statistic. Every figure on this
          site is pending client verification, and an unverified number is
          worse proof than an honest sentence. */}
      <Band tone="dark" width="read">
        <Pullquote cite={c.prove.cite}>“{c.prove.quote}”</Pullquote>
      </Band>

      <Faq items={c.faqs} label="Common questions" title={<>Questions we are actually asked</>} />

      {/* ACT — one specific, low-pressure next step, carrying this page's own
          WhatsApp prefill so the team can see which subject produced it. */}
      <ContextualCTA
        label="Next step"
        title={c.cta.title}
        copy={c.cta.copy}
        wa={c.cta.wa}
        action={c.cta.action}
        secondary={{ label: "See all solutions", href: ROUTES.solutions.path }}
      />

      <RelatedContent keys={c.related} tone="sand" />

      <JsonLd data={serviceLd(route)} />
      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(c.faqs)} />
    </SiteShell>
  );
}
