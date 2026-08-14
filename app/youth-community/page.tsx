import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import JsonLd from "../../components/site/JsonLd";
import PageHero from "../../components/blocks/PageHero";
import { Band, Prose, CheckList } from "../../components/blocks/Prose";
import { CardGrid, EventCard } from "../../components/blocks/Cards";
import StayInLoop from "../../components/blocks/Signup";
import Faq from "../../components/blocks/Faq";
import ContextualCTA from "../../components/blocks/CTA";
import RelatedContent from "../../components/blocks/Related";
import { ROUTES } from "../../lib/routes";
import { WA } from "../../lib/contact";
import { pageMeta, breadcrumbLd, faqLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.youth);

/* ============================================================
   Youth Community.

   Source: the client's own "About the Founders" document, section 5.

   ── Design intent ──────────────────────────────────────────
   The open half of the contrast pair with /dva. DVA is short, dark and closed;
   this page is long, warm, content-rich and welcoming. Keep it that way.

   ⚠️ HIERARCHY, per the visual system: "Youth Community" is the primary
   heading and "Empowering youth. Building tomorrow." is supporting copy set
   visually subordinate to it. Do not promote the tagline into the H1.

   ⚠️ Not hidden recruitment. This is a public learning and engagement
   initiative. It routes to careers nowhere except in the related-content block
   at the very bottom, and it never frames participation as a route into the
   agency.

   ⚠️ The activity list below is the client's own programme description, not a
   dated calendar. No real event dates, venues or registration links exist yet,
   and inventing them would be worse than showing none — so the events section
   describes the kinds of sessions that run and routes to a human. When a real
   calendar exists, these become EventCard records with dates.
   ============================================================ */

const FAQS = [
  {
    q: "Is there a cost to join?",
    a: "No. The Youth Community is open and free to take part in.",
  },
  {
    q: "Do I have to be studying finance, or want a career in it?",
    a: "Not at all. Most members are not heading into financial services. The sessions are about confidence, communication, health, money and leadership — things that are useful whatever you end up doing.",
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
    a: "Sign up below, or message us on WhatsApp. Updates are occasional and easy to stop.",
  },
];

export default function Page() {
  const route = ROUTES.youth;

  return (
    <SiteShell path={route.path}>
      <PageHero
        route={route}
        tone="sand"
        label="Empowering youth. Building tomorrow."
        title={<>Youth Community</>}
        lede="A platform to prepare the next generation for life, career, leadership and financial independence — because education on its own is no longer enough."
        photo={{ src: "/media/img/youth-workshop.jpg", alt: "Attendees seated at a D’Life workshop session" }}
      />

      <Band width="read">
        <Prose>
          <p>
            Young people leaving university today need more than a qualification. They need confidence, the ability to
            communicate, some grasp of how money actually works, a bit of leadership practice and some real-world
            experience to put it all against.
          </p>
          <p>
            The Youth Community exists to provide those things in a setting that is practical and welcoming rather than
            academic. Its purpose is to help young people become confident, healthy, financially aware and
            purpose-driven — people who go on to have a positive effect on their careers, their communities and the
            generation after them.
          </p>
        </Prose>
      </Band>

      {/* The three-word spine of the whole programme. */}
      <Band tone="dark" width="wide" label="The three pillars" title={<>Health · Wealth · Leadership</>}>
        <CardGrid
          cards={[
            {
              index: "01",
              title: "Health",
              copy: "Build a healthy body and a resilient mind — physical wellness, mental resilience, stress management and some balance while you are young enough for it to become a habit.",
            },
            {
              index: "02",
              title: "Wealth",
              copy: "Build financial confidence and career opportunity — financial literacy, wealth management, career exploration, industry exposure and entrepreneurial thinking.",
            },
            {
              index: "03",
              title: "Leadership",
              copy: "Build character, influence and purpose — leadership development, communication and public speaking, personal branding, critical thinking and problem-solving.",
            },
          ]}
          columns={3}
        />
      </Band>

      <Band id="resources" width="wide" label="Development pillars" title={<>What the programme covers</>}>
        <Prose>
          <p>
            Practical learning experiences across four areas. Sessions move between them through the year rather than
            running as separate tracks.
          </p>
        </Prose>
        <div className="dl-cards dl-cards--2">
          <article className="dl-card rv">
            <div className="dl-card__body">
              <span className="dl-card__no">01</span>
              <h3>Health & well-being</h3>
              <p>
                Physical wellness and healthy lifestyle habits · mental resilience and emotional well-being · stress
                management and balance.
              </p>
            </div>
          </article>
          <article className="dl-card rv">
            <div className="dl-card__body">
              <span className="dl-card__no">02</span>
              <h3>Financial & career development</h3>
              <p>
                Financial literacy and wealth management · career exploration and industry exposure · entrepreneurial
                thinking and business opportunity.
              </p>
            </div>
          </article>
          <article className="dl-card rv">
            <div className="dl-card__body">
              <span className="dl-card__no">03</span>
              <h3>Leadership & personal growth</h3>
              <p>
                Leadership development · communication and public speaking · personal branding · critical thinking and
                problem-solving.
              </p>
            </div>
          </article>
          <article className="dl-card rv">
            <div className="dl-card__body">
              <span className="dl-card__no">04</span>
              <h3>Community & impact</h3>
              <p>
                Mentorship and coaching · volunteer and community service · university engagement · networking and
                collaborative projects.
              </p>
            </div>
          </article>
        </div>
      </Band>

      <Band tone="sand" width="wide" label="Who it’s for" title={<>Who can join</>}>
        <Prose>
          <p>
            The Youth Community welcomes anyone young and genuinely willing to grow — personally and professionally.
            That includes:
          </p>
        </Prose>
        <CheckList
          items={[
            "University students preparing for their future careers",
            "Fresh graduates exploring meaningful career opportunities",
            "Young professionals seeking personal and leadership growth",
            "Young entrepreneurs aspiring to build purpose-driven businesses",
            "Career explorers looking for clarity, direction and new opportunities",
            "Young adults who value holistic growth in health, wealth and leadership",
            "Anyone with a positive mindset and a willingness to learn",
          ]}
        />
      </Band>

      {/* ⚠️ Programme types, not a dated calendar — see the note at the top. */}
      <Band id="events" width="wide" label="Events & workshops" title={<>The kinds of sessions that run</>}>
        <Prose>
          <p>
            Sessions run through the year across the community and alongside D’Life’s wider programme. Dates and venues
            go out to members ahead of time — the quickest way to hear about the next one is to sign up below.
          </p>
        </Prose>
        <div className="dl-cards dl-cards--3">
          <EventCard
            title="Youth leadership programmes"
            copy="Structured leadership development for students and young professionals, built around practice rather than theory."
            when="Runs through the year"
            where="Klang Valley"
            cta={{ label: "Ask about the next one", wa: WA.event }}
          />
          <EventCard
            title="Financial literacy sessions"
            copy="How money actually works — saving, protection, and the decisions worth making early. No products, no selling."
            when="Regular"
            where="Campus & community venues"
            cta={{ label: "Ask about the next one", wa: WA.event }}
          />
          <EventCard
            title="Career development sessions"
            copy="Industry exposure, interview practice and honest conversations with people doing the jobs you are considering."
            when="Regular"
            where="Klang Valley"
            cta={{ label: "Ask about the next one", wa: WA.event }}
          />
          <EventCard
            title="Personal growth workshops"
            copy="Communication, public speaking, personal branding and the confidence to use them."
            when="Regular"
            where="Klang Valley"
            cta={{ label: "Ask about the next one", wa: WA.event }}
          />
          <EventCard
            title="Community & volunteer projects"
            copy="Service projects that build compassion and responsibility, and give leadership somewhere real to practise."
            when="Several a year"
            where="Various"
            cta={{ label: "Ask about the next one", wa: WA.event }}
          />
          <EventCard
            title="Outdoor & team activities"
            copy="Adventure-based activities that build teamwork, resilience and friendships that outlast the session."
            when="Several a year"
            where="Various"
            cta={{ label: "Ask about the next one", wa: WA.event }}
          />
        </div>
      </Band>

      <Band id="stories" tone="dark" width="wide" label="What members take away" title={<>What people leave with</>}>
        <Prose>
          <p>
            Members leave with more than knowledge — practical skills, real relationships and a bit more confidence than
            they arrived with.
          </p>
        </Prose>
        <CheckList
          items={[
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
          ]}
        />
      </Band>

      <StayInLoop
        tone="sand"
        label="Stay in the loop"
        title="Hear about the next session"
        copy="Occasional updates on events, workshops and resources. Nothing is sold to you, and you can stop them at any time."
        ack="Thanks — we’ll be in touch with the next Youth Community update."
      />

      <Faq items={FAQS} label="Common questions" title={<>Before you join us</>} more={{ label: "Ask us anything", href: ROUTES.contact.path }} />

      <ContextualCTA
        label="Get involved"
        title="Come to one and see"
        copy="The easiest way to find out whether this is for you is to turn up to a session. Message us and we will tell you what is next."
        wa={WA.youth}
        action="Ask about joining"
        secondary={{ label: "Read about D’Life", href: ROUTES.about.path }}
      />

      <RelatedContent keys={["about", "dva", "careers"]} tone="light" />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS)} />
    </SiteShell>
  );
}
