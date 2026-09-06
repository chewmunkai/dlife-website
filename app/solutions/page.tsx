import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import Ask from "../../components/v2/Ask";
import JsonLd from "../../components/site/JsonLd";
import { Hero, Bar, Band, Rail, ClosingCard, Cards } from "../../components/v2/blocks";
import { SOLUTIONS } from "../../content/solutions";
import { ROUTES, SOLUTION_SLUGS } from "../../lib/routes";
import { link } from "../../lib/asset";
import { WA, waHref } from "../../lib/contact";
import { pageMeta, breadcrumbLd, faqLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.solutions);

/* ============================================================
   Solutions hub.

   The 5 life needs as a media card grid, then the shape every
   conversation has in common, then corporate as a statement rather than a
   sixth card — it is a smaller part of the practice and the design says so by
   giving it a different shape instead of equal billing.

   Card copy is ROUTES[].teaser and card photography is SOLUTIONS[].photo, so
   the hub cannot drift from the pages it links to. The design bundle
   hardcodes its own photographs here; those are the generic set this repo
   replaced with Malaysian photography in an earlier client round, which is
   why the content file wins.
   ============================================================ */

/** The five life needs. Corporate is no longer in SOLUTION_SLUGS at all, so
 *  this is now the whole list. */
const NEEDS = SOLUTION_SLUGS;

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
    a: "A first conversation is typically under an hour. Anything beyond that moves at whatever pace suits you. There is no sequence you are expected to move through.",
  },
];

const COMMON = [
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
    copy: "What each does, what it costs and what it does not do. Where 2 options are genuinely close, we will tell you that rather than steer you.",
  },
  {
    title: "You decide, in your own time",
    copy: "Including deciding that what you have is already reasonable. That is a normal outcome and we would rather reach it honestly.",
  },
];

export default function Page() {
  const route = ROUTES.solutions;
  const advisor = waHref(WA.advisor);

  return (
    <Shell>
      <Hero
        route={route}
        label="Protection & planning"
        title="Start wherever you are"
        lede="5 areas most households eventually need to think about. None of them require a decision today, and you will not be asked to make one."
        photo={{ src: "/media/img/path-family.jpg", alt: "A family at home together" }}
        actions={
          <a className="pill" href={advisor}>
            <span>Speak with an Advisor</span>
          </a>
        }
      />

      <Bar
        facts={["27 years of guidance", "People-first advice", "Support beyond the policy"]}
        statement="Most people arrive with a situation, not a category."
        action={
          <a className="pill" href={advisor}>
            <span>Start a conversation</span>
          </a>
        }
      />

      <Band
        label="The five life needs"
        title="Pick the one closest to your situation"
        lede="Each page explains what that area covers, the terms worth understanding, and how a conversation about it actually goes."
      >
        <Cards
          columns={3}
          media
          items={NEEDS.map((slug) => ({
            title: ROUTES[slug].label,
            copy: ROUTES[slug].teaser,
            href: ROUTES[slug].path,
            cta: "Read more",
            photo: { src: SOLUTIONS[slug].photo.src, alt: "" },
          }))}
        />
      </Band>

      <Band tone="sand" label="How we work" title="What every conversation has in common">
        <div className="dl-prose" style={{ marginTop: 20 }}>
          <p>
            Whichever of these brought you here, the shape of the conversation is the same. It begins with your
            circumstances rather than a product, and it ends with you knowing more than when it started, whether or not
            anything changes as a result.
          </p>
        </div>
        <Rail steps={COMMON} />
      </Band>

      {/* The "Corporate solutions" statement band was removed with the page it
          linked to (2026-08, client): a section headed "Corporate solutions" on
          the hub is the opposite of hiding it. The copy is recoverable from git
          along with the route, see the note on SOLUTION_SLUGS. */}

      <section className="ask-host sand">
        <div className="ask-head">
          <p className="lbl">Before you get in touch</p>
          <h2>What to expect</h2>
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
        title="Not sure which of these applies to you?"
        lede="That is the most common way people arrive. Tell us the situation and we will work out the category together."
        actions={
          <>
            <a className="pill sand" href={advisor}>
              <span>Speak with an Advisor</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.policy.path)}>
              <span>Review an existing policy</span>
            </a>
          </>
        }
      />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS)} />
    </Shell>
  );
}
