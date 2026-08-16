import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import JsonLd from "../../components/site/JsonLd";
import { Prose } from "../../components/blocks/Prose";
import { CardGrid } from "../../components/blocks/Cards";
import RelatedContent from "../../components/blocks/Related";
import { E2Hero, E2Bar, E2Band, E2Rail, E2Qa, E2Stmt, E2Closing } from "../../components/blocks/E2";
import { ROUTES, LIFE_NEEDS } from "../../lib/routes";
import { SOLUTIONS } from "../../content/solutions";
import { WA } from "../../lib/contact";
import { link } from "../../lib/asset";
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
      <E2Hero
        route={route}
        label="Protection & planning"
        title={<>Start wherever you are</>}
        lede="Five areas most households eventually need to think about. None of them require a decision today, and you will not be asked to make one."
        photo={{ src: "/media/img/path-family.jpg", alt: "A family at home together" }}
        actions={
          <a className="pill" data-wa={WA.advisor} href="#">
            <span>Speak with an Advisor</span>
          </a>
        }
      />

      <E2Bar
        facts={["No products in the first meeting", "No cost", "Under an hour"]}
        statement="Most people arrive with a situation, not a category."
        action={
          <a className="pill" data-wa={WA.advisor} href="#">
            <span>Start a conversation</span>
          </a>
        }
      />

      <E2Band
        label="The five life needs"
        title={<>Pick the one closest to your situation</>}
        lede="Each page explains what that area covers, the terms worth understanding, and how a conversation about it actually goes."
      >
        <CardGrid cards={needCards} columns={3} media />
      </E2Band>

      <E2Band tone="sand" label="How we work" title={<>What every conversation has in common</>}>
        <Prose>
          <p>
            Whichever of these brought you here, the shape of the conversation is the same. It begins with your
            circumstances rather than a product, and it ends with you knowing more than when it started — whether or not
            anything changes as a result.
          </p>
        </Prose>
        <E2Rail
          steps={[
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
      </E2Band>

      {/* Corporate stays discoverable here rather than claiming a branch of its
          own — the guide is explicit that it is a smaller segment and should
          not compete for a major homepage branch. */}
      <E2Stmt label="For businesses" title={<>Corporate solutions</>}>
        <p>
          Employee benefits, key person cover and business continuity arrangements for Malaysian companies. A smaller
          part of what we do, handled by the same advisors and with the same approach.
        </p>
        <p>
          <a href={link(ROUTES.corporate.path)}>See corporate solutions →</a>
        </p>
      </E2Stmt>

      <E2Band tone="sand" read label="Before you get in touch" title={<>What to expect</>}>
        <E2Qa items={FAQS} />
      </E2Band>

      <E2Closing
        photo={{ src: "/media/img/close-conversation.jpg", alt: "", position: "50% 40%" }}
        title="Not sure which of these applies to you?"
        lede="That is the most common way people arrive. Tell us the situation and we will work out the category together."
        actions={
          <>
            <a className="pill sand" data-wa={WA.advisor} href="#">
              <span>Speak with an Advisor</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.policy.path)}>
              <span>Review an existing policy</span>
            </a>
          </>
        }
      />

      <RelatedContent keys={["policy", "about", "stories"]} tone="sand" />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS)} />
    </SiteShell>
  );
}
