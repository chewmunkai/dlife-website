import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import Ask from "../../components/v2/Ask";
import JsonLd from "../../components/site/JsonLd";
import { Hero, Bar, Band, Open, Said, Closing } from "../../components/v2/blocks";
import { ROUTES } from "../../lib/routes";
import { asset, link } from "../../lib/asset";
import { WA, waHref } from "../../lib/contact";
import { pageMeta, breadcrumbLd, faqLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.careers);

/* ============================================================
   Grow With D'Life — careers.

   ⚠️ NO INCOME FIGURES ON THIS PAGE. That is a standing guardrail from the
   design bundle, and it is also the page's argument: the FAQ says plainly
   that any figure published here would be someone else's and not the
   reader's. Do not add a range, an average or a top-earner number, and do not
   soften the "it starts slowly" line.

   The page is deliberately unexciting next to how the industry usually
   recruits. `.stated` replaced a tick-and-cross pair, because an agency
   describing its own work should state what the work is rather than argue
   with an imagined objection; the one honest exclusion sits underneath as a
   sentence (`.fnote`) instead of a column of crosses.

   The pull-quote attribution is pending advisor consent. Do not attach a name
   to it until that is in writing.
   ============================================================ */

const WORK = [
  {
    title: "Licensed advice",
    copy: "A regulated profession with real examinations behind it, and disclosure obligations that matter.",
  },
  {
    title: "Long conversations",
    copy: "Most of the week is spent talking with people about money, risk and what they are responsible for.",
  },
  {
    title: "A client base built slowly",
    copy: "Relationships meant to last years, rather than a pipeline that resets every quarter.",
  },
  {
    title: "Being the person who picks up",
    copy: "At the point of a claim you are the one the family calls. That is the part of the job that decides your reputation.",
  },
  {
    title: "Continuous learning",
    copy: "Products, rules and tax treatment keep moving. Staying current is in the job description.",
  },
  {
    title: "Judgement",
    copy: "Knowing when the right recommendation is to recommend nothing, and saying so.",
  },
];

const GROWTH = [
  {
    title: "Mentorship before independence",
    copy: "You learn the craft beside someone senior before you ever learn a pitch. You sit in on real client conversations, and are observed in your own.",
  },
  {
    title: "Licensing and professional standards",
    copy: "Licensing, product knowledge and proper disclosure. Doing this correctly is not the boring part of the job. It is the job.",
  },
  {
    title: "A route into leadership",
    copy: "For those who want it, a path from advisor to team leader with training at each step. More than 40 young managers have come through it here.",
  },
  {
    title: "A culture that measures the right thing",
    copy: "People here judge a good year by the clients who stayed, and the families who were properly looked after when something happened.",
  },
];

const SUITS = [
  "Comfortable starting a conversation with someone they do not know",
  "Genuinely interested in other people’s circumstances",
  "Able to sit with a slow first year without panicking",
  "Willing to tell a client they do not need something",
  "Organised enough to follow up years later, unprompted",
  "From a professional background, in any field",
];

const FAQS = [
  {
    q: "Do I need a financial services background?",
    a: "No. A good number of our advisors came from corporate roles in other industries. What matters more is whether you are comfortable having careful conversations with people about things that matter to them.",
  },
  {
    q: "What qualifications do I need?",
    a: "You will need to be licensed to advise, and we will take you through what that involves and support you through it. It is a real examination process, not a formality.",
  },
  {
    q: "What does the first year actually look like?",
    a: "Learning, mostly. Licensing, product knowledge, and sitting in on conversations before you lead them. Building a client base takes time and the early months are the hardest part of the job. We would rather say that now than have you discover it.",
  },
  {
    q: "How is the income structured?",
    a: "Commission-based, which means it varies and starts slowly. We will talk through what a realistic first two years looks like, honestly, rather than publish a figure that would be someone else’s.",
  },
  {
    q: "Is this a full-time commitment?",
    a: "For it to work properly, yes. Advising people on their protection and planning is not something we think is well done around the edges of another job.",
  },
  {
    q: "What happens if it turns out not to suit me?",
    a: "Then it is better for everybody that you find that out early, and we will say so if we think it. Not every conversation about a career here ends with someone joining, and that is the point of having the conversation.",
  },
];

export default function Page() {
  const route = ROUTES.careers;
  const career = waHref(WA.career);

  return (
    <Shell>
      <Hero
        route={route}
        label="Grow with D’Life"
        title="A career built on real guidance, not just sales"
        lede="Advising people on their protection and planning is a profession. It takes licensing, training, judgement and a long attention span."
        photo={{
          src: "/media/img/path-career.jpg",
          alt: "A woman looking out through a window at trees",
          position: "30% 50%",
        }}
        actions={
          <a className="pill" href={career}>
            <span>Explore a career conversation</span>
          </a>
        }
      />

      <Bar
        facts={["A conversation, not an interview", "Honest about the hard parts", "No dream-lifestyle pitch"]}
        statement="An honest conversation about what the work involves."
        action={
          <a className="pill" href={career}>
            <span>Start there</span>
          </a>
        }
      />

      <Band>
        <Open lead="You have probably seen how this industry usually recruits. We are not going to do that.">
          <p>
            What we can tell you is what the work actually involves, how you would be trained, and who tends to do well
            at it. If that reads as less exciting than the alternative, we would rather you decided on the accurate
            version.
          </p>
        </Open>
      </Band>

      <Band label="The work itself">
        <h2 style={{ maxWidth: "24ch" }}>What an advisor actually does</h2>
        <p className="dl-lede">Six things that make up the job, before anyone mentions a product or a target.</p>
        <div className="stated">
          {WORK.map((w) => (
            <div key={w.title}>
              <b>{w.title}</b>
              <p>{w.copy}</p>
            </div>
          ))}
        </div>
        {/* The one honest exclusion, as a sentence rather than a column of
            crosses. Note: no figure, by design. */}
        <p className="fnote">
          <b>Two things it is not.</b> It does not work as a side project, and nobody here earns from signing other
          people up. Advisor income is commission-based, which means it varies and starts slowly. We would rather talk
          that through with you properly than publish a figure that belongs to somebody else.
        </p>
      </Band>

      <Band tone="sand" label="How you would grow" title="What we actually provide">
        <div className="index">
          {GROWTH.map((g, i) => (
            <div key={g.title}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <div className="with">
                <h3>{g.title}</h3>
                <p>{g.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </Band>

      <Said
        photo={{
          src: "/media/img/dva-workshop.jpg",
          alt: "A presenter leading a workshop session",
          position: "30% 40%",
        }}
        quote={<>“D’Life gave me the mentorship I couldn’t find anywhere else.”</>}
        cite="D’Life advisor · attribution pending consent"
      />

      <section className="two two--flip sand">
        <div className="plate ph">
          <img
            src={asset("/media/img/dva-team.jpg")}
            alt="The D’Life advisory team"
            style={{ objectPosition: "60% 50%" }}
          />
        </div>
        <div>
          <p className="lbl">Who tends to do well</p>
          <h2>The people this suits</h2>
          <p className="dl-lede" style={{ maxWidth: "38ch" }}>
            No single background. This is what they had in common on day one.
          </p>
          <div className="traits">
            {SUITS.map((s, i) => (
              <div key={s}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ask-host light">
        <div className="ask-head">
          <p className="lbl">Common questions</p>
          <h2>The questions worth asking us</h2>
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

      <Closing
        photo={{
          src: "/media/img/youth-workshop.jpg",
          alt: "Attendees seated at a workshop session",
          position: "50% 30%",
        }}
        title="Explore a career conversation"
        lede="An honest discussion about what the work involves and whether it fits. It is not an interview, and it does not commit you to anything."
        actions={
          <>
            <a className="pill sand" href={career}>
              <span>Explore a career conversation</span>
            </a>
            {/* The guide routes the career journey through advisor stories —
                the films are the evidence this page argues from. */}
            <a className="pill ghost" href={link(ROUTES.stories.path)}>
              <span>Watch advisor stories</span>
            </a>
          </>
        }
        note=""
      />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS)} />
    </Shell>
  );
}
