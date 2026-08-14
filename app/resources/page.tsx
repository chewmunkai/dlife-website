import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import JsonLd from "../../components/site/JsonLd";
import PageHero from "../../components/blocks/PageHero";
import { Band, Prose } from "../../components/blocks/Prose";
import { CardGrid, EventCard } from "../../components/blocks/Cards";
import SelectedVideos from "../../components/blocks/Video";
import StayInLoop from "../../components/blocks/Signup";
import ContextualCTA from "../../components/blocks/CTA";
import RelatedContent from "../../components/blocks/Related";
import { ROUTES, LIFE_NEEDS } from "../../lib/routes";
import { WA } from "../../lib/contact";
import { VIDEOS } from "../../content/videos";
import { pageMeta, breadcrumbLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.resources);

/* ============================================================
   Articles & Events.

   ⚠️ HONEST SCOPE. No articles have been written yet, and no dated event
   calendar exists. Rather than filling this page with invented posts and fake
   dates, it collects the guidance that genuinely exists on the site today —
   the explainer pages, the films, and the standing programme — and gives the
   article library a place to land later.

   That is a deliberate choice, and it is reversible in one direction only:
   publishing three fabricated blog posts to make a page look busy is not
   something a later edit can undo from a client's search results.

   ── When real content arrives ──────────────────────────────
   The direction guide asks how the WordPress structure can accommodate new
   content categories. The answer built in here:

   • Articles become a `content/articles.ts` array of the same shape as
     `content/videos.ts` (title, blurb, category, next), rendered through the
     existing CardGrid. No new component is needed.
   • Events become EventCard records with real dates and registration links,
     replacing the standing programme descriptions below.
   • The suggested categories from the guide — client guidance, protection and
     planning, founder and D'Life story, advisor stories, careers, DVA, Youth
     Community, events and resources — are the taxonomy to build against.
   ============================================================ */

export default function Page() {
  const route = ROUTES.resources;

  /* The genuinely useful guidance on this site today is the explainer content
     on the Solutions pages. Surfacing it here is honest, and it is also the
     internal linking this page exists to do. */
  const guides = [
    ...LIFE_NEEDS.map((r) => ({
      title: r.label,
      copy: r.teaser,
      href: r.path,
      cta: "Read the guide",
    })),
    {
      title: ROUTES.policy.label,
      copy: "What a coverage review involves, and what it does not.",
      href: ROUTES.policy.path,
      cta: "Read the guide",
    },
  ];

  return (
    <SiteShell path={route.path}>
      <PageHero
        route={route}
        label="Articles & events"
        title={<>Guidance, and what’s coming up</>}
        lede="Practical explanations of the things people most often ask us about, the films our advisors have recorded, and the sessions that run across the D’Life community."
      />

      <Band width="wide" label="Guidance" title={<>Explained in plain language</>}>
        <Prose>
          <p>
            Each of these walks through one area — what it covers, the terms worth understanding, and how a conversation
            about it actually goes. They are written to be useful whether or not you ever speak to us.
          </p>
        </Prose>
        <CardGrid cards={guides} columns={3} />
      </Band>

      <SelectedVideos
        videos={VIDEOS}
        tone="dark"
        label="Watch"
        title="Films from the practice"
        lede="Advisors and leaders in their own words. Each plays here, with sound."
        id="films"
      />

      {/* ⚠️ Standing programme, not a dated calendar. See the note above. */}
      <Band id="events" tone="sand" width="wide" label="Events" title={<>What runs across the year</>}>
        <Prose>
          <p>
            D’Life and <a href={ROUTES.dva.path}>DVA</a> run a programme of workshops, forums and community sessions
            through the year, alongside the <a href={ROUTES.youth.path}>Youth Community</a>. Dates go out to members
            ahead of time — sign up below and we will let you know what is next.
          </p>
        </Prose>
        <div className="dl-cards dl-cards--3">
          <EventCard
            title="Growth Circle"
            copy="One of D’Life’s signature development platforms. A regular gathering where members reflect on progress, share experience, discuss what is not working and learn from each other."
            when="Monthly"
            where="Klang Valley"
            cta={{ label: "Ask about attending", wa: WA.event }}
          />
          <EventCard
            title="Leadership development workshops"
            copy="Interactive sessions on strategic thinking, decision-making, emotional intelligence, coaching and applying leadership in practice."
            when="Through the year"
            where="Klang Valley"
            cta={{ label: "Ask about attending", wa: WA.event }}
          />
          <EventCard
            title="Financial planning seminars"
            copy="Open sessions on protection and planning fundamentals, run as education rather than as a sales presentation."
            when="Regular"
            where="Klang Valley"
            cta={{ label: "Ask about attending", wa: WA.event }}
          />
          <EventCard
            title="Learning forums"
            copy="Knowledge sharing with industry experts and experienced professionals, covering advisory practice, business and personal development."
            when="Regular"
            where="Klang Valley"
            cta={{ label: "Ask about attending", wa: WA.event }}
          />
          <EventCard
            title="Youth leadership programmes"
            copy="Sessions for students, fresh graduates and young professionals across health, wealth and leadership."
            when="Through the year"
            where="Campus & community venues"
            cta={{ label: "Ask about attending", wa: WA.event }}
          />
          <EventCard
            title="Charity & community projects"
            copy="Service initiatives that members contribute to across the year, run through DVA and the Youth Community."
            when="Several a year"
            where="Various"
            cta={{ label: "Ask about attending", wa: WA.event }}
          />
        </div>
      </Band>

      <StayInLoop
        tone="light"
        label="Stay in the loop"
        title="Hear when something is on"
        copy="Occasional updates on events, sessions and new guidance. No selling, and easy to stop."
        ack="Thanks — we’ll let you know what’s coming up next."
      />

      <ContextualCTA
        label="Next step"
        title="Would rather just ask someone?"
        copy="Reading is a fine place to start, but most questions are quicker to answer in a conversation."
        wa={WA.question}
        action="Ask a question"
        secondary={{ label: "Explore protection & planning", href: ROUTES.solutions.path }}
      />

      <RelatedContent keys={["solutions", "youth", "dva"]} tone="sand" />

      <JsonLd data={breadcrumbLd(route)} />
    </SiteShell>
  );
}
