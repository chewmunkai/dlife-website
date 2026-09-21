import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import Ask, { type Question } from "../../components/v2/Ask";
import JsonLd from "../../components/site/JsonLd";
import { Band, ClosingCard, Creed, Gate, Hero, Holds, OpenStatement, YearMap } from "../../components/v2/blocks";
import { ROUTES } from "../../lib/routes";
import { link } from "../../lib/asset";
import { pageMeta, breadcrumbLd, faqLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.dva);

/* ============================================================
   Drive Value Associates (DVA).

   Source: the client's own "About the Founders" document, section 4, as
   rebuilt in the Claude Design project (direction E2, "layered depth").

   ── Design intent ──────────────────────────────────────────
   DVA and the Youth Community are a deliberate contrast pair. DVA's power is
   exclusivity; Youth's is openness. Placed together they explain each other
   without a paragraph of copy — so this page is short, dark, contained and
   restrained, and the Youth page is long, warm and content-rich. If a future
   edit makes this page bigger or brighter, the pair stops working.

   This is the only page in the site that opens on `.crest`: type first, with
   the photograph held back until under the fold. Every other page leads with
   a picture and a copy panel cut into it. That difference is the whole
   register change between something you can buy and something you are asked
   to join — do not "harmonise" this hero with the others.

   ⚠️ AUDIENCE — previously an open question, now resolved by the source.
   The client's document opens by describing DVA as "professionals from
   different backgrounds", then states its purpose as building "a community of
   exceptional financial advisors" and says plainly that it is "built for
   financial advisors". Read together, the consistent reading is: financial
   advisors, who arrive from a range of professional backgrounds. That is how
   this page is written. Worth confirming with Sharon at sign-off.

   ⚠️ Not open recruitment. Membership is by invitation and every member is
   personally interviewed by the founder. The page must never read as an
   application funnel — the CTA asks a question, it does not invite a signup.
   ============================================================ */

const FAQS: Question[] = [
  {
    q: "Can I apply to join?",
    a: "Not in the usual sense. Membership is by invitation, and every member is personally interviewed by Sharon before joining. You are welcome to ask about it, and that conversation is where it would start.",
  },
  {
    q: "Is DVA a recruitment channel for D’Life?",
    a: "No. Members remain in their own practices. DVA exists to raise the standard of the profession, not to move people between agencies.",
  },
  {
    q: "What is the commitment?",
    a: "A monthly Growth Circle, plus workshops, forums and community projects across the year. It is a real commitment of time, which is part of why the circle stays small.",
  },
];

/* What members develop. Set as `.index` rather than as cards: these are
   provisions, and the list should read down the page. */
const DEVELOPS = [
  {
    title: "Leadership",
    copy: "The mindset, confidence and practical skill to influence teams, guide others and lead with purpose in business and outside it.",
  },
  {
    title: "Communication",
    copy: "Interpersonal communication, client engagement, negotiation, presentation and relationship building.",
  },
  {
    title: "Personal branding",
    copy: "A credible, authentic professional identity that reflects your values, expertise and long-term aspirations.",
  },
  {
    title: "Financial literacy",
    copy: "Deeper understanding of financial planning, wealth management, industry movement and responsible advisory practice.",
  },
  {
    title: "Mentorship",
    copy: "Ongoing coaching and knowledge sharing from experienced leaders, drawn from real business experience rather than theory.",
  },
  {
    title: "Public speaking",
    copy: "Structured opportunities to present, facilitate discussion and communicate ideas with confidence.",
  },
];

/* Grouped by how often each session comes round. Eight equal bullets said
   nothing about the shape of a year; the frequency is the information a
   prospective member actually wants.

   `perYear` draws the twelve-month meter beside each tier (redesigned 6 Sep
   2026): every tier shows the same year, and how much of it is filled is how
   often you would be in the room. Monthly fills it; the annual tier lights
   one month. That is the section's argument, stated before a word is read. */
const CADENCE = [
  {
    when: "Every month",
    perYear: 12,
    note: "The spine of it",
    items: [
      {
        name: "Growth Circle",
        copy: "Progress, obstacles and shared experience, in a room where everyone is held to the same line.",
      },
    ],
  },
  {
    when: "Through the quarter",
    perYear: 4,
    note: "Development",
    items: [
      { name: "Leadership workshops", copy: "Strategic thinking, decision-making and coaching." },
      { name: "Learning forums", copy: "Industry experts and experienced practitioners, on the record." },
      { name: "Personal development programmes", copy: "Structured, and chosen by the member." },
    ],
  },
  {
    when: "Across the year",
    perYear: 1,
    note: "The circle in practice",
    items: [
      { name: "Networking sessions", copy: "Members and invited guests." },
      { name: "Team building", copy: "Indoors and outdoors." },
      { name: "Charity and volunteer projects", copy: "Work members contribute to together." },
      { name: "Cross-agency collaboration", copy: "Joint initiatives beyond D’Life." },
    ],
  },
];

/* The four principles the circle is organised around, previously `.pillars`. */
const ORGANISED = [
  { term: "Learning", copy: "Progress is discussed openly, including the parts that are not working." },
  { term: "Leadership", copy: "Advisors developed into people others choose to follow." },
  { term: "Real value", copy: "Advice measured by what it does for the client, not by what it produces." },
  { term: "Impact", copy: "A profession left in better standing than the circle found it." },
];

/* Selection, lifted out of the markup so the stage words can be the design
   element rather than a label buried in JSX. */
const SELECTION = [
  {
    k: "First",
    title: "A conversation",
    copy: "Usually because a member has suggested it, or because you asked. Nothing is decided at this stage.",
  },
  {
    k: "Then",
    title: "A personal interview with Sharon",
    copy: "Every member is interviewed and selected by Sharon herself, to make sure the alignment is genuine rather than assumed.",
  },
  {
    k: "Only then",
    title: "An invitation",
    copy: "Extended when the standard is clearly shared. Some conversations end here, and that is a reasonable outcome for both sides.",
  },
];

const TRAITS = [
  "Values that hold up when nobody is checking",
  "Ethics before opportunity, in every recommendation",
  "Professionalism: licensing, disclosure and continued learning",
  "A long-term view of a client relationship, and of a career",
];

export default function Page() {
  const route = ROUTES.dva;

  return (
    <Shell>
      {/* 21 Sep 2026, client: "make the dva page same sizes as all the pages
          (referring to the headline box and image), just change the headline
          box to green to highlight the section — premium feel."

          This page used to open on `.crest`: type first, no card, the
          photograph held back and carried off the right edge. The design note
          at the top of this file argued that difference WAS the register
          change between something you can buy and something you are asked to
          join, and said not to harmonise it. The client has overruled that, so
          DVA now takes the same Hero as every other page — the same 4:3 plate
          and the same 648px headline box.

          What carries the register instead is the panel. `panel="green"` puts
          the card on --dl-green against this section's --dl-ink ground, so it
          reads as a raised green plate where every other page shows a cream
          one. Tone on tone: the page stays dark and contained, and the box is
          the thing that lifts.

          The photograph is matted, not cropped. dva-team.jpg is 1.78 with
          seventeen people spanning nearly the full width — a woman at the
          extreme left, another at the extreme right — so the 25% a 4:3 cover
          takes off the width would remove them both. `fit: "contain"` keeps
          everyone and still fills the standard plate. */}
      <Hero
        route={route}
        tone="ink"
        panel="green"
        label="Drive Value Associates"
        /* L10: the comma was doing a line break's job. The break is real —
           two spans, two lines — so the punctuation was decorative and read
           as a mistake. Removed. Grammatical commas in prose stay: the lede
           directly below keeps its own, because it needs it.

           The spans are why `.hero h1 .dl-line` exists in ds/overrides.css:
           inline spans would set this as one run and lose the authored break. */
        title={
          <>
            <span className="dl-line">Built for leaders</span>
            <span className="dl-line">by invitation.</span>
          </>
        }
        lede="A selective circle of financial advisors, shaped by shared values and experience. Founded by Sharon Cheang."
        photo={{
          src: "/media/img/dva-team.jpg",
          alt: "The D’Life advisory team",
          fit: "contain",
        }}
        actions={
          <a className="pill sand" href={link(ROUTES.contact.path)}>
            <span>Ask about DVA</span>
          </a>
        }
      />

      {/* Round 7: was a lone display-scale line, "It is not a networking
          group." The client asked the section to answer "What is DVA" instead
          of opening on what it is not, and to follow the solution pages' own
          opening — so it is the same `OpenStatement`: kick, statement at
          display scale, the rest of the thought on a copper rule beside it.
          The networking distinction survives as the second beat, which is
          where a contrast belongs once the thing itself has been named. */}
      <Band>
        {/* The statement is kept to about forty characters, the same length as
            the solution pages' openings, so it sets on two lines like they do.
            At eighty-five it ran to four and swamped the section. */}
        <OpenStatement
          kick="What is DVA"
          lead="A selective circle of financial advisors. They meet for long-term development rather than to trade referrals, and they stay in their own practices."
        >
          <p>
            Networking groups meet to exchange referrals. This one meets for long-term development, working
            relationships and collaborative success, and the difference shows up in what members are asked to give
            rather than in what they are offered.
          </p>
          <p>
            What members share is the aim, not an employer. It is also why the circle stays small, and why a place in it
            is offered rather than applied for.
          </p>
        </OpenStatement>
      </Band>

      {/* The four organising principles, on the same contained ink panel the
          About page uses for the practice's commitments. They were `.pillars`,
          the hairlined text grid the client called cheap on the sections
          below; leaving the one copy of it here while its neighbours were
          rebuilt would have made it the odd section out. */}
      {/* The client's purpose statement is 100 characters, so it cannot be a
          one-line heading and should not be cut — it is their own wording. It
          moves to the lede, where a sentence wrapping is normal, and the
          section takes a real title. */}
      <Creed
        label="Purpose"
        title="Why the circle exists"
        lede="To build a community of exceptional financial advisors who lead with integrity and grow with purpose. These are the 4 things it is organised around."
        items={ORGANISED}
        icons={["growth", "people", "gauge", "building"]}
      />


      <section className="band light">
        <p className="lbl">What members develop</p>
        <h2>The work of the circle</h2>
        <div className="index">
          {DEVELOPS.map((item, i) => (
            <div key={item.title}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <div className="with">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* One tier per row, each row's column count set by its own item count,
          so the layout states what the copy claims: the monthly session is the
          spine and gets a row to itself. As three equal columns the tiers held
          one, three and four items, and the first ran a 300px hole under a
          single entry. */}
      <YearMap
        label="Across the year"
        title="The shape of a year in the circle"
        lede="8 kinds of session. What tells you most about the commitment is how often each one comes round."
        tiers={CADENCE}
      />

      {/* Selection narrows, so the design narrows. */}
      <Gate
        label="Selection"
        title="Slow, on purpose"
        aside="There is no application form, and there is no cohort. A place opens when the fit is right and not before."
        stages={SELECTION}
      />

      <Holds label="The standard" title="What members hold each other to" items={TRAITS} />

      <section className="ask-host light">
        <div className="ask-head">
          <p className="lbl">Questions</p>
          <h2>About membership</h2>
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

      {/* The CTA asks a question rather than inviting an application. Now the
          standardised next-step card, as on every other page. */}
      <ClosingCard
        label="Discover DVA"
        title="If this sounds like the room you have been looking for"
        lede="Membership is by invitation, but a conversation is not. Tell us a little about your practice and we will take it from there."
        note=""
        actions={
          <>
            <a className="pill" href={link(ROUTES.contact.path)}>
              <span>Ask about DVA</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.about.path)}>
              <span>Read about D’Life</span>
            </a>
          </>
        }
      />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS.map(({ q, a }) => ({ q, a })))} />
    </Shell>
  );
}
