import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import Ask from "../../components/v2/Ask";
import Signup from "../../components/v2/Signup";
import JsonLd from "../../components/site/JsonLd";
import { Hero, Band, Open, SplitShot, Checks, Closing } from "../../components/v2/blocks";
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

const PILLARS = [
  {
    title: "Health",
    copy: "Build a healthy body and a resilient mind: physical wellness, mental resilience, stress management and some balance while you are young enough for it to become a habit.",
  },
  {
    title: "Wealth",
    copy: "Build financial confidence and career opportunity: financial literacy, wealth management, career exploration, industry exposure and entrepreneurial thinking.",
  },
  {
    title: "Leadership",
    copy: "Build character, influence and purpose: leadership development, communication and public speaking, personal branding, critical thinking and problem-solving.",
  },
];

const QUAD = [
  {
    title: "Health & well-being",
    copy: "Physical wellness and healthy lifestyle habits · mental resilience and emotional well-being · stress management and balance.",
  },
  {
    title: "Financial & career development",
    copy: "Financial literacy and wealth management · career exploration and industry exposure · entrepreneurial thinking and business opportunity.",
  },
  {
    title: "Leadership & personal growth",
    copy: "Leadership development · communication and public speaking · personal branding · critical thinking and problem-solving.",
  },
  {
    title: "Community & impact",
    copy: "Mentorship and coaching · volunteer and community service · university engagement · networking and collaborative projects.",
  },
];

const WHO = [
  "University students preparing for their future careers",
  "Fresh graduates exploring meaningful career opportunities",
  "Young professionals seeking personal and leadership growth",
  "Young entrepreneurs aspiring to build purpose-driven businesses",
  "Career explorers looking for clarity, direction and new opportunities",
  "Young adults who value holistic growth in health, wealth and leadership",
  "Anyone with a positive mindset and a willingness to learn",
];

const EVENTS = [
  {
    when: "Runs through the year",
    where: "Klang Valley",
    title: "Youth leadership programmes",
    copy: "Structured leadership development for students and young professionals, built around practice rather than theory.",
  },
  {
    when: "Regular",
    where: "Campus & community venues",
    title: "Financial literacy sessions",
    copy: "How money actually works: saving, protection, and the decisions worth making early. No products, no selling.",
  },
  {
    when: "Regular",
    where: "Klang Valley",
    title: "Career development sessions",
    copy: "Industry exposure, interview practice and honest conversations with people doing the jobs you are considering.",
  },
  {
    when: "Regular",
    where: "Klang Valley",
    title: "Personal growth workshops",
    copy: "Communication, public speaking, personal branding and the confidence to use them.",
  },
  {
    when: "Several a year",
    where: "Various",
    title: "Community & volunteer projects",
    copy: "Service projects that build compassion and responsibility, and give leadership somewhere real to practise.",
  },
  {
    when: "Several a year",
    where: "Various",
    title: "Outdoor & team activities",
    copy: "Adventure-based activities that build teamwork, resilience and friendships that outlast the session.",
  },
];

const TAKEAWAYS = [
  "Greater confidence and self-awareness",
  "Stronger leadership and communication skills",
  "Better physical and mental well-being",
  "Healthy lifestyle habits and resilience",
  "Financial literacy and wealth awareness",
  "Career clarity and future direction",
  "Professional networking opportunities",
  "Hands-on practical experience",
  "A habit of continuing to learn",
  "Meaningful friendships and a supportive community",
];

const FAQS = [
  { q: "Is there a cost to join?", a: "No. The Youth Community is open and free to take part in." },
  {
    q: "Do I have to be studying finance, or want a career in it?",
    a: "Not at all. Most members are not heading into financial services. The sessions are about confidence, communication, health, money and leadership, all of it useful whatever you end up doing.",
  },
  {
    q: "What age is this for?",
    a: "Broadly university students through to people in the first years of their career. There is no hard cut-off; if the sessions sound useful to you, you are welcome.",
  },
  {
    q: "Is this a recruitment pipeline for D’Life?",
    a: "No. It is a community initiative, and the great majority of members will never work with us. If someone does become interested in the profession we will have that conversation openly, but it is not what this is for.",
  },
  {
    q: "How do I hear about what’s coming up?",
    a: "Sign up above, or message us on WhatsApp. Updates are occasional and easy to stop.",
  },
];

export default function Page() {
  const route = ROUTES.youth;
  const join = waHref(WA.youth);

  return (
    <Shell>
      <Hero
        route={route}
        tone="sand"
        label="Empowering youth. Building tomorrow."
        title="Youth Community"
        lede="A platform to prepare the next generation for life, career, leadership and financial independence, because education on its own is no longer enough."
        photo={{ src: "/media/img/youth-workshop.jpg", alt: "Attendees seated at a workshop session" }}
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

      <section className="trip dark">
        <div className="head">
          <p className="lbl">The three pillars</p>
          <h2 style={{ fontSize: "clamp(28px,3.2vw,48px)", lineHeight: 1.04, maxWidth: "20ch", marginTop: 14 }}>
            Health · Wealth · Leadership
          </h2>
        </div>
        {PILLARS.map((p, i) => (
          <div key={p.title}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <h3>{p.title}</h3>
            <p>{p.copy}</p>
          </div>
        ))}
      </section>

      <section className="band light" id="resources">
        <p className="lbl">Development pillars</p>
        <h2>What the programme covers</h2>
        <p className="dl-lede">
          Practical learning experiences across four areas. Sessions move between them through the year rather than
          running as separate tracks.
        </p>
        <div className="quad">
          {QUAD.map((q, i) => (
            <div key={q.title}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <h3>{q.title}</h3>
              <p>{q.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <Band tone="sand" label="Who it’s for" title="Who can join">
        <p className="dl-lede">
          The Youth Community welcomes anyone young and genuinely willing to grow, personally and professionally.
        </p>
        <div className="count">
          <b>07</b>
          <span>kinds of member</span>
        </div>
        <Checks items={WHO} />
      </Band>

      <section className="band light" id="events">
        <p className="lbl">Events &amp; workshops</p>
        <h2>The kinds of sessions that run</h2>
        <p className="dl-lede">
          Sessions run through the year across the community and alongside D’Life’s wider programme. Dates and venues
          go out to members ahead of time. The quickest way to hear about the next one is to sign up below.
        </p>
        <div className="stagger">
          {EVENTS.map((e) => (
            <article className="dl-event" key={e.title}>
              <div className="dl-event__meta">
                <span className="dl-event__when">{e.when}</span>
                <span className="dl-event__where">{e.where}</span>
              </div>
              <h3>{e.title}</h3>
              <p>{e.copy}</p>
              {/* No calendar exists yet, so this asks a person rather than
                  linking to a schedule that is not there. */}
              <a className="tlink" href={waHref(WA.event)}>
                Ask about dates <em aria-hidden="true">→</em>
              </a>
            </article>
          ))}
        </div>
      </section>

      <SplitShot
        photo={{ src: "/media/img/community-gathering.jpg", alt: "People seated around a table at a community gathering" }}
        tone="dark"
        label="What members take away"
        title="What people leave with"
        id="stories"
        className="lift-host"
      >
        <p className="dl-lede">
          More than knowledge: practical skills, real relationships and a bit more confidence than they arrived with.
        </p>
        <Checks items={TAKEAWAYS} />
      </SplitShot>

      <section className="lift" id="loop">
        <p className="lbl">Stay in the loop</p>
        <h2 style={{ fontSize: "clamp(24px,2.6vw,38px)", lineHeight: 1.06, maxWidth: "22ch", marginTop: 12 }}>
          Hear about the next session
        </h2>
        <p className="dl-lede" style={{ maxWidth: "52ch" }}>
          Occasional updates on events, workshops and resources. Nothing is sold to you, and you can stop them at any
          time.
        </p>
        <Signup />
      </section>

      <section className="ask-host light">
        <div className="ask-head">
          <p className="lbl">Common questions</p>
          <h2>Before you join us</h2>
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
        photo={{ src: "/media/img/youth-workshop.jpg", alt: "Attendees seated at a workshop session", position: "50% 34%" }}
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
      />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS)} />
    </Shell>
  );
}
