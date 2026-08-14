import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import JsonLd from "../../components/site/JsonLd";
import PageHero from "../../components/blocks/PageHero";
import { Band, Prose } from "../../components/blocks/Prose";
import { CardGrid } from "../../components/blocks/Cards";
import { Steps } from "../../components/blocks/Steps";
import Faq from "../../components/blocks/Faq";
import ContextualCTA from "../../components/blocks/CTA";
import RelatedContent from "../../components/blocks/Related";
import { ROUTES, LIFE_NEEDS } from "../../lib/routes";
import { SOLUTIONS } from "../../content/solutions";
import { WA } from "../../lib/contact";
import { pageMeta, breadcrumbLd, faqLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.solutions);

const FAQS = [
  {
    q: "Do I need to know which of these I need before I get in touch?",
    a: "No. Most people arrive with a situation rather than a category, and working out which of these it belongs to is part of the first conversation.",
  },
  {
    q: "Will the first meeting involve a product recommendation?",
    a: "Not usually. The first conversation is about your circumstances and what you already hold. A recommendation only follows a proper needs assessment, and it comes with the relevant disclosure documents.",
  },
  {
    q: "What if I already have cover elsewhere?",
    a: "Then the useful conversation is about understanding it, not replacing it. That is what our existing policy support is for, and it carries no obligation to change anything.",
  },
  {
    q: "How long does this usually take?",
    a: "A first conversation is typically under an hour. Anything beyond that moves at whatever pace suits you — there is no sequence you are expected to move through.",
  },
];

export default function Page() {
  const route = ROUTES.solutions;

  /* Cards are generated from the route map and the page content, so a card's
     title, URL and description all come from the same records the destination
     page uses for its own metadata. */
  const needCards = LIFE_NEEDS.map((r) => {
    const c = SOLUTIONS[r.path.split("/").pop() as keyof typeof SOLUTIONS];
    return { title: r.label, copy: r.teaser, href: r.path, cta: "Read more", photo: c.photo };
  });

  return (
    <SiteShell path={route.path}>
      <PageHero
        route={route}
        label="Protection & planning"
        title={<>Start wherever you are</>}
        lede="Five areas most households eventually need to think about. None of them require a decision today, and you will not be asked to make one."
      />

      <Band width="wide">
        <CardGrid cards={needCards} columns={3} media />
      </Band>

      <Band
        tone="sand"
        label="How we work"
        title={<>What every conversation has in common</>}
        width="wide"
      >
        <Prose>
          <p>
            Whichever of these brought you here, the shape of the conversation is the same. It begins with your
            circumstances rather than a product, and it ends with you knowing more than when it started — whether or not
            anything changes as a result.
          </p>
        </Prose>
        <Steps
          items={[
            {
              title: "We start with your situation",
              copy: "Who depends on you, what you are responsible for, and what you are already carrying. No product is mentioned in this part.",
            },
            {
              title: "We look at what you already have",
              copy: "Including cover from an employer or bought elsewhere. Often there is more in place than people remember.",
            },
            {
              title: "We explain the options in plain language",
              copy: "What each does, what it costs and what it does not do. Where two options are genuinely close, we will tell you that rather than steer you.",
            },
            {
              title: "You decide, in your own time",
              copy: "Including deciding that what you have is already reasonable. That is a normal outcome and we would rather reach it honestly.",
            },
          ]}
        />
      </Band>

      {/* Corporate stays discoverable here rather than claiming a branch of its
          own — the guide is explicit that it is a smaller segment and should
          not compete for a major homepage branch. */}
      <Band label="For businesses" title={<>Corporate solutions</>} width="wide">
        <Prose>
          <p>
            Employee benefits, key person cover and business continuity arrangements for Malaysian companies. A smaller
            part of what we do, handled by the same advisors and with the same approach.
          </p>
        </Prose>
        <CardGrid
          cards={[
            {
              title: ROUTES.corporate.label,
              copy: ROUTES.corporate.teaser,
              href: ROUTES.corporate.path,
              cta: "See corporate solutions",
            },
          ]}
          columns={2}
        />
      </Band>

      <Faq items={FAQS} label="Before you get in touch" title={<>What to expect</>} />

      <ContextualCTA
        label="Next step"
        title="Not sure which of these applies to you?"
        copy="That is the most common way people arrive. Tell us the situation and we will work out the category together."
        wa={WA.advisor}
        secondary={{ label: "Review an existing policy", href: ROUTES.policy.path }}
      />

      <RelatedContent keys={["policy", "about", "stories"]} tone="sand" />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS)} />
    </SiteShell>
  );
}
