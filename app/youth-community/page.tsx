import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import Ask from "../../components/v2/Ask";
import Signup from "../../components/v2/Signup";
import JsonLd from "../../components/site/JsonLd";
import { Hero, Band, Open, SplitShot, Checks, ClosingCard, Trio, WhoGrid, LoopCard, Events } from "../../components/v2/blocks";
import { ROUTES } from "../../lib/routes";
import { link } from "../../lib/asset";
import { WA, waHref } from "../../lib/contact";
import { pageMeta, breadcrumbLd, faqLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.youth);

/* ============================================================
   Youth Community.

   The open half of the contrast pair with DVA: where that page is short,
   dark and by invitation, this one is long, warm and content-rich. The pair
   explains itself without a paragraph of copy. If a future edit makes this
   page shorter or more exclusive, the pair stops working.

   ⚠️ Not a recruitment pipeline. The FAQ says so outright, and the guardrail
   matters: the great majority of members will never work with D'Life. Do not
   add a careers CTA to this page.

   Event dates and venues are deliberately vague ("Runs through the year",
   "Klang Valley") because no calendar has been supplied. The "Ask about
   dates" links go to WhatsApp rather than to a schedule that does not exist.
   ============================================================ */

/* Round 7: each pillar's copy arrived as a claim followed by four or five
   comma-separated specifics inside a single sentence. The list was already
   there; splitting it out is a content fix as much as a design one. Nothing
   is added and nothing is dropped. */
const PILLARS = [
  {
    title: "Health",
    claim: "Build a healthy body and a resilient mind.",
    items: [
      "Physical wellness",
      "Mental resilience",
      "Stress management",
      "Balance, while it is still easy to make it a habit",
    ],
  },
  {
    title: "Wealth",
    claim: "Build financial confidence and career opportunity.",
    items: [
      "Financial literacy",
      "Wealth management",
      "Career exploration and industry exposure",
      "Entrepreneurial thinking",
    ],
  },
  {
    title: "Leadership",
    claim: "Build character, influence and purpose.",
    items: [
      "Leadership development",
      "Communication and public speaking",
      "Personal branding",
      "Critical thinking and problem-solving",
    ],
  },
];

/* The doc's "four development pillars" section is deliberately NOT a band of
   its own: three of its four pillars repeat the trip's gloss text nearly
   verbatim, so the two sections read as the same content twice. The fourth
   (community & impact) lives as a line in the events intro. Client flag Y1. */

/* The client's six categories, each split into the category and the reason it
   is on the list. They arrived as six sentences that each did both jobs at
   once, which is why they could not be scanned. Client flag Y2 covers the
   seventh, "anyone with a positive mindset and a willingness to learn", which
   restated the band's own lede. */
const WHO = [
  { who: "University students", why: "Preparing for a career that has not started yet." },
  { who: "Fresh graduates", why: "Exploring work that will actually mean something." },
  { who: "Young professionals", why: "After personal and leadership growth, not just the next title." },
  { who: "Young entrepreneurs", why: "Building something with a purpose behind it." },
  { who: "Career explorers", why: "Wanting clarity, direction and options worth considering." },
  { who: "Young adults", why: "Who take health, money and leadership seriously, and together." },
];

const EVENTS = [
  {
    when: "Runs through the year",
    where: "Klang Valley",
    title: "Youth leadership programmes",
    photo: { src: "/media/img/youth-session.jpg", alt: "A youth leadership session in progress" },
    copy: "Structured leadership development for students and young professionals, built around practice rather than theory.",
  },
  {
    when: "Regular",
    where: "Campus & community venues",
    title: "Financial literacy sessions",
    photo: { src: "/media/img/youth-resources.jpg", alt: "A financial literacy session" },
    copy: "How money actually works: saving, protection, and the decisions worth making early. No products, no selling.",
  },
  {
    when: "Regular",
    where: "Klang Valley",
    title: "Career development sessions",
    photo: { src: "/media/img/dva-workshop.jpg", alt: "A career development session" },
    copy: "Industry exposure, interview practice and honest conversations with people doing the jobs you are considering.",
  },
  {
    when: "Regular",
    where: "Klang Valley",
    title: "Personal growth workshops",
    photo: { src: "/media/img/path-future.jpg", alt: "A member working through a personal development exercise" },
    copy: "Communication, public speaking, personal branding and the confidence to use them.",
  },
  {
    when: "Several a year",
    where: "Various",
    title: "Community & volunteer projects",
    photo: { src: "/media/img/community-gathering.jpg", alt: "Members on a community project" },
    copy: "Service projects that build compassion and responsibility, and give leadership somewhere real to practise.",
  },
  {
    when: "Several a year",
    where: "Various",
    title: "Outdoor & team activities",
    /* The event cards are a 4:3 grid, so a 0.75 portrait lost 44% of itself
       here — the picture cannot change shape without losing the people at the
       top and bottom of the staircase, so the picture changes instead. */
    photo: { src: "/media/img/team-outdoors.jpg", alt: "Members at an outdoor team activity" },
    copy: "Adventure-based activities that build teamwork, resilience and friendships that outlast the session.",
  },
];

/* The doc's ten takeaways, merged to six without losing a noun — ten
   one-liners read as a transcribed list rather than a written one. Client
   flag Y3. */
const TAKEAWAYS = [
  "Confidence and self-awareness",
  "Leadership and communication, practised rather than taught",
  "Physical and mental well-being, and the habits that keep them",
  "Financial literacy and wealth awareness",
  "Career clarity, direction and a working network",
  "Friendships and a community that outlast the sessions",
];

const FAQS = [
  {
    q: "Is there a cost to join?",
    /* Client copy C09 (31 Aug 2026). This answer used to say the community was
       free outright, which the client has now corrected. "Typically below
       RM50" is theirs and is a typical figure, not a cap — do not rewrite it
       into a guarantee ("never more than", "capped at"). */
    a: "Most Youth Community activities are free or kept at a minimal cost. Some workshops and classes are complimentary, while selected sessions may involve a small fee, typically below RM50, to cover refreshments or activity expenses.",
  },
  {
    q: "Do I have to be studying finance, or want a career in it?",
    a: "Not at all. Most members are not heading into financial services. The sessions are about confidence, communication, health, money and leadership, all of it useful whatever you end up doing.",
  },
  {
    q: "What age is this for?",
    /* Client copy C10 (31 Aug 2026). */
    a: "The Youth Community is open to young adults who are stepping into the working world and beyond. If you are looking to grow, connect, and develop yourself personally and professionally, you are welcome to be part of the community.",
  },
  {
    q: "Is this a recruitment pipeline for D’Life?",
    a: "No. It is a community initiative, and the great majority of members will never work with us. If someone does become interested in the profession we will have that conversation openly, but it is not what this is for.",
  },
  // "How do I hear about what's coming up?" is answered by the sign-up band
  // sitting directly above this ledger, so it is not asked again here.
];

export default function Page() {
  const route = ROUTES.youth;
  /* A13/A16: joining, asking and events are three different messages, so the
     team reads the first line of a WhatsApp and knows which one arrived. None
     of these sends anything — wa.me opens the app with the message written. */
  const join = waHref(WA.youthJoin);

  return (
    <Shell>
      <Hero
        route={route}
        tone="sand"
        label="Empowering youth. Building tomorrow."
        title="Youth Community"
        lede="A platform to prepare the next generation for life, career, leadership and financial independence, because education on its own is no longer enough."
        /* A15: a real Youth Community session, from the client's library. */
        photo={{ src: "/media/img/youth-session.jpg", alt: "Members of the D’Life Youth Community at a session", ratio: "4 / 3" }}
        actions={
          <a className="pill" href={join}>
            <span>Ask about joining</span>
          </a>
        }
      />

      <Band>
        <Open lead="Young people leaving university today need more than a qualification.">
          <p>
            They need confidence, the ability to communicate, some grasp of how money actually works, a bit of
            leadership practice and some real-world experience to put it all against.
          </p>
          <p>
            The Youth Community exists to provide those things in a setting that is practical and welcoming rather than
            academic. Its purpose is to help young people become confident, healthy, financially aware and
            purpose-driven: people who go on to have a positive effect on their careers, their communities and the
            generation after them.
          </p>
        </Open>
      </Band>

      {/* id="resources": the homepage's "Educational Resources" card lands
          here — the three pillars are the guides it promises. The anchor
          used to sit on the cut development-pillars band. */}
      <Trio
        id="resources"
        label="The 3 pillars"
        title="Health · Wealth · Leadership"
        items={PILLARS}
        icons={["pulse", "coins", "people"]}
      />

      <WhoGrid
        label="Who it’s for"
        title="Who should join"
        lede="The Youth Community welcomes anyone young and genuinely willing to grow, personally and professionally."
        items={WHO}
      >
        <div className="count">
          <b>06</b>
          <span>kinds of member</span>
        </div>
      </WhoGrid>

      <section className="band light" id="events">
        <p className="lbl">Events &amp; workshops</p>
        <h2>The kinds of sessions that run</h2>
        <p className="dl-lede">
          Sessions run through the year across the community and alongside D’Life’s wider programme. Alongside them,
          members mentor, volunteer and work with universities together. Dates and venues go out to members ahead of
          time, and the quickest way to hear about the next one is to sign up below.
        </p>
        <Events items={EVENTS} href={waHref(WA.youthEvent)} />
      </section>

      <SplitShot
        photo={{ src: "/media/img/youth-group.jpg", alt: "Youth Community members together after a session", position: "50% 38%" }}
        tone="light"
        label="What members take away"
        title="What people leave with"
        id="stories"
      >
        <p className="dl-lede">
          More than knowledge: practical skills, real relationships and a bit more confidence than they arrived with.
        </p>
        <Checks items={TAKEAWAYS} />
      </SplitShot>

      {/* At the client's direction this is now a card with no background: a
          keyline holding open space, rather than the filled `.lift` panel that
          used to be pulled up over the section above it. */}
      <LoopCard
        id="loop"
        label="Stay in the loop"
        title="Hear about the next session"
        lede="Occasional updates on events, workshops and resources. Nothing is sold to you, and you can stop them at any time."
      >
        <Signup />
      </LoopCard>

      <section className="ask-host light">
        <div className="ask-head">
          <p className="lbl">Common questions</p>
          <h2>Before you join us</h2>
        </div>
        <div>
          <Ask items={FAQS} />
          <div className="dl-actions" style={{ marginTop: "clamp(28px,4vh,44px)" }}>
            {/* Ordinary navigation, deliberately: a question that does not
                fit the FAQ belongs on the contact page with its own form,
                not in a WhatsApp thread. */}
            <a className="pill ghost" href={link(ROUTES.contact.path)}>
              <span>Ask us something else</span>
            </a>
          </div>
        </div>
      </section>

      <ClosingCard
        label="Get involved"
        title="Come to one and see"
        lede="The easiest way to find out whether this is for you is to turn up to a session. Message us and we will tell you what is next."
        actions={
          <>
            <a className="pill sand" href={join}>
              <span>Ask about joining</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.about.path)}>
              <span>Read about D’Life</span>
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
