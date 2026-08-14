import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import JsonLd from "../../components/site/JsonLd";
import PageHero from "../../components/blocks/PageHero";
import { Band, Prose, Pullquote, CheckList, DefList } from "../../components/blocks/Prose";
import ContextualCTA from "../../components/blocks/CTA";
import RelatedContent from "../../components/blocks/Related";
import Faq from "../../components/blocks/Faq";
import { ROUTES } from "../../lib/routes";
import { WA } from "../../lib/contact";
import { pageMeta, breadcrumbLd, faqLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.dva);

/* ============================================================
   Drive Value Associates (DVA).

   Source: the client's own "About the Founders" document, section 4.

   ── Design intent ──────────────────────────────────────────
   DVA and the Youth Community are a deliberate contrast pair. DVA's power is
   exclusivity; Youth's is openness. Placed together they explain each other
   without a paragraph of copy — so this page is short, dark, contained and
   restrained, and the Youth page is long, warm and content-rich. If a future
   edit makes this page bigger or brighter, the pair stops working.

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

const FAQS = [
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

export default function Page() {
  const route = ROUTES.dva;

  return (
    <SiteShell path={route.path}>
      <PageHero
        route={route}
        tone="dark"
        label="Drive Value Associates"
        title={<>By invitation. Built for leaders.</>}
        lede="A selective circle of financial advisors, shaped by shared values and experience. Founded by Sharon Cheang."
      />

      <Band tone="dark" width="read">
        <Prose>
          <p>
            Drive Value Associates is a leadership and collaboration community for financial advisors who arrive from a
            range of professional backgrounds and share one aim: to grow through learning, leadership and the creation
            of real value for the people they advise.
          </p>
          <p>
            It is not a networking group. Networking groups meet to exchange referrals; DVA meets for long-term personal
            development, meaningful working relationships and collaborative success. The difference shows up in what
            members are asked to give rather than what they are offered.
          </p>
        </Prose>
      </Band>

      <Band width="read" label="Purpose" title={<>What the circle is for</>}>
        <Prose>
          <p>
            To build a community of exceptional financial advisors who lead with integrity, grow with purpose, and
            inspire one another to create lasting value for clients — elevating the profession and making a meaningful
            impact on society.
          </p>
        </Prose>
        <Pullquote cite="Founding principle">
          “Sustainable success is achieved through integrity, continuous growth, meaningful collaboration, and creating
          lasting value for clients.”
        </Pullquote>
      </Band>

      {/* The selectivity is stated plainly. Softening it would misrepresent how
          membership actually works. */}
      <Band tone="sand" width="read" label="Membership" title={<>DVA is not for everyone</>}>
        <Prose>
          <p>
            It is built for financial advisors who believe in doing the right things, for the right reasons. Every
            member is personally interviewed and selected by Sharon, to make sure there is genuine alignment in values,
            ethics, professionalism and long-term vision.
          </p>
          <p>
            That process is slow on purpose. A circle like this only works while everyone in it holds the same line, and
            the only way to keep that true is to be careful about who joins.
          </p>
        </Prose>
      </Band>

      <Band width="wide" label="What members develop" title={<>The work of the circle</>}>
        <DefList
          items={[
            {
              term: "Leadership",
              copy: "The mindset, confidence and practical skill to influence teams, guide others and lead with purpose in business and outside it.",
            },
            {
              term: "Communication",
              copy: "Interpersonal communication, client engagement, negotiation, presentation and relationship building.",
            },
            {
              term: "Personal branding",
              copy: "A credible, authentic professional identity that reflects your values, expertise and long-term aspirations.",
            },
            {
              term: "Financial literacy",
              copy: "Deeper understanding of financial planning, wealth management, industry movement and responsible advisory practice.",
            },
            {
              term: "Mentorship",
              copy: "Ongoing coaching and knowledge sharing from experienced leaders, drawn from real business experience rather than theory.",
            },
            {
              term: "Public speaking",
              copy: "Structured opportunities to present, facilitate discussion and communicate ideas with confidence.",
            },
          ]}
        />
      </Band>

      <Band tone="sand" width="wide" label="Across the year" title={<>How members spend their time</>}>
        <CheckList
          items={[
            "Leadership workshops — strategic thinking, decision-making, coaching",
            "Monthly Growth Circle — progress, challenges and shared experience",
            "Networking sessions with members and invited guests",
            "Learning forums with industry experts and thought leaders",
            "Team building, indoors and outdoors",
            "Charity projects and volunteer work",
            "Personal development programmes",
            "Cross-agency collaboration and joint initiatives",
          ]}
        />
      </Band>

      <Faq items={FAQS} label="Questions" title={<>About membership</>} more={{ label: "Ask about DVA", href: ROUTES.contact.path }} />

      {/* The CTA asks a question rather than inviting an application. */}
      <ContextualCTA
        label="Discover DVA"
        title="If this sounds like the room you have been looking for"
        copy="Membership is by invitation, but a conversation is not. Tell us a little about your practice and we will take it from there."
        wa={WA.dva}
        action="Ask about DVA"
        secondary={{ label: "Read about D’Life", href: ROUTES.about.path }}
      />

      <RelatedContent keys={["careers", "about", "youth"]} tone="light" />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS)} />
    </SiteShell>
  );
}
