import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import JsonLd from "../../components/site/JsonLd";
import { Hero, Band, ClosingCard, Cards } from "../../components/v2/blocks";
import { ROUTES, SOLUTION_SLUGS } from "../../lib/routes";
import { link } from "../../lib/asset";
import { WA, waHref } from "../../lib/contact";
import { pageMeta, breadcrumbLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.resources);

/* ============================================================
   Articles & Events.

   ⚠️ No article library exists yet. This page is an index of the guidance
   that is already on the site plus the sessions that run, and it says so
   outright rather than shipping an empty blog. When articles are published
   they land in the guidance grid here, not in a separate /blog.

   Note the difference from the Youth page: that one carries a working
   (unwired) sign-up form, this one deliberately does not. The design replaces
   the form here with a notice explaining why, because on a page whose whole
   job is "hear when something is on", a form that discards the address would
   be the most misleading place on the site to put one.

   Event dates are vague because no calendar has been supplied. Every "ask
   about attending" opens WhatsApp with the events prefill.
   ============================================================ */

const NEEDS = SOLUTION_SLUGS.filter((s) => s !== "corporate");

const EVENTS = [
  {
    when: "Monthly",
    where: "Klang Valley",
    title: "Growth Circle",
    copy: "One of D’Life’s signature development platforms. A regular gathering where members reflect on progress, share experience, discuss what is not working and learn from each other.",
  },
  {
    when: "Through the year",
    where: "Klang Valley",
    title: "Leadership development workshops",
    copy: "Interactive sessions on strategic thinking, decision-making, emotional intelligence, coaching and applying leadership in practice.",
  },
  {
    when: "Regular",
    where: "Klang Valley",
    title: "Financial planning seminars",
    copy: "Open sessions on protection and planning fundamentals, run as education rather than as a sales presentation.",
  },
  {
    when: "Regular",
    where: "Klang Valley",
    title: "Learning forums",
    copy: "Knowledge sharing with industry experts and experienced professionals, covering advisory practice, business and personal development.",
  },
  {
    when: "Through the year",
    where: "Campus & community venues",
    title: "Youth leadership programmes",
    copy: "Sessions for students, fresh graduates and young professionals across health, wealth and leadership.",
  },
  {
    when: "Several a year",
    where: "Various",
    title: "Charity & community projects",
    copy: "Service initiatives that members contribute to across the year, run through DVA and the Youth Community.",
  },
];

export default function Page() {
  const route = ROUTES.resources;
  const events = waHref(WA.event);

  return (
    <Shell>
      <Hero
        route={route}
        label="Articles & events"
        title="Guidance, and what’s coming up"
        lede="Practical explanations of the things people most often ask us about, the films our advisors have recorded, and the sessions that run across the D’Life community."
        photo={{ src: "/media/img/dva-workshop.jpg", alt: "A workshop session in progress" }}
      />

      <Band
        label="Guidance"
        title="Explained in plain language"
        lede="Each of these walks through one area: what it covers, the terms worth understanding, and how a conversation about it actually goes. They are written to be useful whether or not you ever speak to us."
      >
        <Cards
          columns={3}
          items={[
            ...NEEDS.map((slug) => ({
              title: ROUTES[slug].label,
              copy: ROUTES[slug].teaser,
              href: ROUTES[slug].path,
              cta: "Read the guide",
            })),
            {
              title: ROUTES.policy.label,
              copy: "What a coverage review involves, and what it does not.",
              href: ROUTES.policy.path,
              cta: "Read the guide",
            },
          ]}
        />
      </Band>

      <Band tone="sand" label="Events" title="What runs across the year">
        <div className="dl-prose" style={{ marginTop: 20 }}>
          <p>
            D’Life and <a href={link(ROUTES.dva.path)}>DVA</a> run a programme of workshops, forums and community
            sessions through the year, alongside the <a href={link(ROUTES.youth.path)}>Youth Community</a>. Dates go out
            to members ahead of time. Ask us and we will let you know what is next.
          </p>
        </div>
        <div className="stagger">
          {EVENTS.map((e) => (
            <article className="dl-event" key={e.title}>
              <div className="dl-event__meta">
                <span className="dl-event__when">{e.when}</span>
                <span className="dl-event__where">{e.where}</span>
              </div>
              <h3>{e.title}</h3>
              <p>{e.copy}</p>
              <a className="tlink" href={events}>
                Ask about attending <em aria-hidden="true">→</em>
              </a>
            </article>
          ))}
        </div>
      </Band>

      <Band read label="Stay in the loop" title="Hear when something is on">
        <p className="dl-lede">
          Occasional updates on events, sessions and new guidance. No selling, and easy to stop.
        </p>
        {/* Deliberately a notice rather than a form. See the header note. */}
        <div className="dl-notice" style={{ marginTop: "clamp(22px,3vh,32px)" }}>
          <p>
            <strong>Sign-up not connected.</strong> No form endpoint, consent wording or data-handling decision exists
            yet, and a form that silently discarded an enquiry would be worse than none. Until compliance signs the
            consent wording off, WhatsApp and email are the routes that reach a person.
          </p>
        </div>
        <div className="dl-actions" style={{ marginTop: 26 }}>
          <a className="pill" href={events}>
            <span>Ask what’s coming up</span>
          </a>
        </div>
      </Band>

      <Band tone="sand" read label="Also on this site" title="Where the rest of the guidance lives">
        <div className="dl-prose" style={{ marginTop: 20 }}>
          <p>
            The films our advisors recorded are on <a href={link(ROUTES.stories.path)}>Advisor Stories</a>. What a
            career here involves is on <a href={link(ROUTES.careers.path)}>Grow With D’Life</a>. The two community
            programmes are <a href={link(ROUTES.youth.path)}>Youth Community</a> and{" "}
            <a href={link(ROUTES.dva.path)}>Drive Value Associates</a>.
          </p>
          <p>
            No article library has been published yet. When it is, it lands here alongside the guidance above rather
            than in a separate blog.
          </p>
        </div>
      </Band>

      <ClosingCard
        title="Would rather just ask someone?"
        lede="Reading is a fine place to start, but most questions are quicker to answer in a conversation."
        actions={
          <>
            <a className="pill sand" href={waHref(WA.question)}>
              <span>Ask a question</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.solutions.path)}>
              <span>Explore protection &amp; planning</span>
            </a>
          </>
        }
      />

      <JsonLd data={breadcrumbLd(route)} />
    </Shell>
  );
}
