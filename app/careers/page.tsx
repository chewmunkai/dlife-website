import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import Growth from "../../components/v2/Growth";
import Ask from "../../components/v2/Ask";
import JsonLd from "../../components/site/JsonLd";
import { Hero, Bar, Band, IdeaCards, StoriesPreview, ClosingCard } from "../../components/v2/blocks";
import type { IconKey } from "../../components/v2/icons";
import { ROUTES } from "../../lib/routes";
import { asset, link } from "../../lib/asset";
import { WA, waHref } from "../../lib/contact";
import { VIDEOS } from "../../content/videos";
import { GROWTH } from "../../content/growth";
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

   ⚠️ A10 (31 Aug 2026): the client supplied the income answer themselves —
   "a structured 18-month career programme, which includes a basic bonus
   allowance alongside commission-based earnings". That copy is now the FAQ
   answer and the footnote above the FAQs was aligned to it. The standing rule
   is unchanged in substance: still no range, no average, no top-earner number.
   Settled by the client on 6 Sep 2026: the page states the 18 months and
   nothing else. Everything further — what the allowance is, how it steps, any
   qualifying conditions — is deliberately revealed in the conversation, not
   on the page. Do not add it here later without asking them again.
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

/* One icon per item, in WORK's order. Chosen for what the item is about:
   a licence is a document, the claim call is the protection promise, and
   judgement is a measurement rather than a rule. */
const WORK_ICONS: IconKey[] = ["doc", "people", "growth", "shield", "swap", "gauge"];

/* A10 (client copy C05, 31 Aug 2026). Supplied as six named qualities with a
   line each, replacing the six unnamed pointers this section used to carry.
   The names arrive in the client's message in full caps; they are set here in
   the site's own display face, so the words are the client's and the casing is
   the type system's — the same treatment "Who thrives at D'Life?" gets from
   `.lbl`. Nothing here is a requirement or an eligibility rule. */
const QUALITIES = [
  {
    name: "Connect",
    copy: "Confident in building genuine connections with people from different backgrounds.",
  },
  {
    name: "Understand",
    copy: "Genuinely interested in understanding people, their goals, and what matters to them.",
  },
  {
    name: "Grow",
    copy: "Open to learning, taking initiative, and continuously developing through experience.",
  },
  {
    name: "Act with integrity",
    copy: "Committed to doing what is right for the client, even when it does not lead to an immediate sale.",
  },
  {
    name: "Take ownership",
    copy: "Reliable, self-driven, and committed to following through on what they start.",
  },
  {
    name: "Build with purpose",
    copy: "Ambitious about building a meaningful career, creating impact, and growing into their full potential.",
  },
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
    a: "Your first year is about learning, growth and building a strong foundation. We begin with a personalised business plan based on your strengths, personality, network and goals.\n\nAlong the way, you’ll develop product knowledge, people skills, communication, mindset and self-awareness, building the confidence and capabilities to grow your career.",
  },
  {
    q: "How is the income structured?",
    a: "We offer a structured 18-month career programme, which includes a basic bonus allowance alongside commission-based earnings.\n\nBeyond income, the programme is designed to help you build your business, develop your capabilities and accelerate your journey towards leadership.",
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
        title="A career built on guidance rather than sales"
        lede="Advising people on their protection and planning is a profession. It takes licensing, training, judgement and a long attention span."
        photo={{
          /* A15: a stock window shot opened a page about joining this
             agency. The agency itself does the job better. */
          src: "/media/img/team-outdoors.jpg",
          alt: "The D’Life team together at an agency away day",
          /* 4:3 is the file's own shape. The hero plate was 0.97 and took 27%
             off the width — the people at both ends of the group. */
          ratio: "4 / 3",
        }}
        actions={
          <a className="pill" href={career}>
            <span>Explore a career conversation</span>
          </a>
        }
      />

      {/* A03: "Start there" went to the same prefill as the hero's own
          "Explore a career conversation" a few hundred pixels above it. */}
      <Bar
        facts={["A conversation, not an interview", "Honest about the hard parts", "No dream-lifestyle pitch"]}
        statement="An honest conversation about what the work involves."
      />

      {/* ⚠️ THE OPENING SECTION FOLLOWS THE SAME PATTERN ON ALL FIVE PAGES.
          Round 19, client: "every page's beginning section is changed to be
          like this (headline on top and description on bottom), I don't like
          this design — replace all page first sections that are like this to
          [the Advisor development section]."

          What was wrong was not the stacking; that section stacks too. It was
          that these openings had only two parts to stack. A sentence-long
          heading sitting straight on a block of body prose reads as the top of
          an article, not as the start of a section — there is no label to say
          what the section IS, and the description carries the same ink weight
          as the heading, so nothing steps down.

          They take the page's own section grammar now, the one "Advisor
          development" uses: a copper label, the heading, then the description
          as a lede rather than as body copy. Three registers instead of two.
          Any further paragraphs stay as prose underneath. */}
      <Band
        read
        label="How we recruit"
        title="You have probably seen how this industry usually recruits. We are not going to do that."
        lede="What we can tell you is what the work actually involves, how you would be trained, and who tends to do well at it. If that reads as less exciting than the alternative, we would rather you decided on the accurate version."
      />

      <Band label="The work itself">
        <h2>What an advisor actually does</h2>
        <p className="dl-lede">6 things that make up the job, before anyone mentions a product or a target.</p>
        {/* Round 7: was `.stated`, a hairlined text grid. Now the same card the
            solution pages use for their four ideas, three to a row — the
            pattern the client has already signed off, rather than a second
            card design that means the same thing. */}
        <IdeaCards
          columns={3}
          items={WORK.map((w) => ({ term: w.title, copy: w.copy }))}
          icons={WORK_ICONS}
        />
        {/* The one honest exclusion, as a sentence rather than a column of
            crosses. Note: no figure, by design. */}
      </Band>

      {/* Client, 6 Sep 2026: "make it less weird — title and the rest be
          description. Now there's title, pretitle and content."

          Exactly right: a closed row carried the long heading AND a summary
          line, and opening it added a third layer underneath. Three registers
          for one idea. `compact` gives it the shape the homepage already has —
          the heading alone when closed, and everything else as the
          description when open. */}
      <Band tone="sand" label="How you would grow" title="What we actually provide">
        {/* ⚠️ No `panelled` here any more. Round 17 gave these rows their own cream
            surfaces because the client asked for the section to be designed
            better; round 19 asked for it to "follow completely from homepage"
            instead, and the homepage runs the plain hairline ledger. The
            variant stays in styles/growth.css — it is one prop away if they
            change their mind again. */}
        <Growth items={GROWTH} long compact idBase="careers-grow" />

        {/* Round 17, client: the caveat was "placed at a weird spot and taking
            the spotlight… it needs to be subtle and spaced correctly".

            Both halves of that are fair. It had a whole band to itself between
            this section and the advisor films, which gave a footnote the same
            structural weight as the sections either side of it — and it was
            set as a cream panel with a copper bar, the site's reassurance
            object, which is a lot of design for a disclaimer.

            It belongs here: it qualifies the 18-month programme these four
            rows describe, so it reads as the small print under the promise
            rather than as a statement of its own. `assure--note` is the quiet
            cut — a hairline above it and nothing else. Existing Policy
            Support keeps the panel treatment; the client did not ask for that
            one to change.

            A10 note stands: no amount, no range, no guarantee, and the "it
            starts slowly" honesty is kept. */}
        <p className="assure assure--note">
          <b>Two things it is not.</b> It does not work as a side project, and nobody here earns from signing other
          people up. Advisor earnings are commission-based, supported through a structured 18-month career programme
          that includes a basic bonus allowance. We would rather talk the detail through with you properly than
          publish a figure that belongs to somebody else.
        </p>
      </Band>

      {/* The guide runs the career journey through the advisor films, so this
          is a preview of them rather than an unattributed pull-quote. */}
      <StoriesPreview
        label="Advisor stories"
        title="Hear it from our Team"
        lede="Three of them talking about the work: what an ordinary week contains, and what made them stay."
        items={VIDEOS.map((v) => ({
          poster: v.poster,
          focus: v.focus,
          title: v.title,
          runtime: v.runtime,
        }))}
        href={ROUTES.stories.path}
      />

      {/* Round 17, client: "the image on the right is too small now. Balance
          it out."

          Fair, and this is the bill for an earlier fix. The plate used to be
          4:5 and this photograph is 4:3, which cost it 40% of its width — the
          worst crop on the site — so the plate took the picture's shape. That
          is right, and it also cost the image 266px of height, which is what
          made it look small.

          It could not be won back inside the old shape. The six qualities ran
          down the text column, making it 996px tall against a 398px plate: a
          597px gap, with the image floating in the middle of it. No column
          ratio fixes that, and the picture cannot get taller without being
          cropped again.

          So the section splits in two. The heading pair sits beside the
          photograph, which is now the wider column and the object that sets
          the row's height; the six qualities run underneath as a full-width
          grid, which is a better home for them anyway — six rows of one were
          a list pretending to be a section. `two--flip` is gone with it: the
          plate is simply the second child now, because a third child that
          spans both columns cannot be ordered around a flip. */}
      <section className="two sand two--pair">
        <div>
          <p className="lbl">Who thrives at D’Life?</p>
          <h2>Could this be you?</h2>
          <p className="dl-lede" style={{ maxWidth: "40ch" }}>
            There is no single formula for success. But the people who thrive here tend to share these qualities.
          </p>
        </div>
        <div className="plate ph" style={{ aspectRatio: "4 / 3" }}>
          <img src={asset("/media/img/team-office.jpg")} alt="D’Life advisors and managers together at the agency office" />
        </div>
        <div className="traits traits--grid">
          {QUALITIES.map((q, i) => (
            <div key={q.name}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <span>
                {q.name}
                <em>{q.copy}</em>
              </span>
            </div>
          ))}
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
