import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import { E2Band, E2Closing, E2Hero, E2Qa } from "../../components/blocks/E2";
import JsonLd from "../../components/site/JsonLd";
import { Prose } from "../../components/blocks/Prose";
import RelatedContent from "../../components/blocks/Related";
import { ROUTES } from "../../lib/routes";
import { CONTACT, WA } from "../../lib/contact";
import { link } from "../../lib/asset";
import { pageMeta, breadcrumbLd, faqLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.contact);

/**
 * Contact.
 *
 * The direction guide's WhatsApp requirement lands here most visibly: one
 * number at launch, but every route into it carries a distinct pre-filled
 * message so the team can see the visitor's intent and source before replying.
 * That is why this page is a list of intents rather than a single button — the
 * routing happens in the choice, not in an automation.
 *
 * ⚠️ No web form. Nothing on this site stores a submission: there is no
 * endpoint, no consent wording approved and no data-handling decision made.
 * Offering a form that silently discarded an enquiry would be worse than
 * offering none. WhatsApp and email both reach a person.
 */
const ROUTES_IN: Array<{ title: string; copy: string; wa: string; action: string }> = [
  {
    title: "I’d like to speak with an advisor",
    copy: "Protection, planning, or just working out where to start. A first conversation is usually under an hour and involves no products.",
    wa: WA.advisor,
    action: "Start a conversation",
  },
  {
    title: "I have a policy I’d like explained",
    copy: "Wherever you bought it. We will read it before we speak, and there is no obligation to change anything.",
    wa: WA.policyClarity,
    action: "Ask about my coverage",
  },
  {
    title: "I’d like to explore a career",
    copy: "An honest conversation about what the work involves, what the first year looks like, and who it suits.",
    wa: WA.career,
    action: "Explore a career",
  },
  {
    title: "I’m enquiring on behalf of a company",
    copy: "Employee benefits, key person cover or business continuity. Headcount and what is already in place is enough to begin.",
    wa: WA.corporate,
    action: "Make a corporate enquiry",
  },
  {
    title: "I’d like to know about DVA",
    copy: "Membership of the leadership circle is by invitation, but questions about it are always welcome.",
    wa: WA.dva,
    action: "Ask about DVA",
  },
  {
    title: "I’m interested in the Youth Community",
    copy: "Events, workshops and resources for students, fresh graduates and young professionals.",
    wa: WA.youth,
    action: "Ask about Youth Community",
  },
];

const FAQS = [
  {
    q: "How quickly will someone reply?",
    a: "Most messages sent on a working day get a reply the same day. Monday to Friday, 9am–6pm.",
  },
  {
    q: "Will I be added to a mailing list?",
    a: "No. Getting in touch does not sign you up to anything, and nobody will chase you afterwards.",
  },
  {
    q: "Can I ask a question without arranging a meeting?",
    a: "Of course. Plenty of the messages we get are one question with a one-message answer, and that is a perfectly good use of this.",
  },
  {
    q: "Is there a cost to a first conversation?",
    a: "No.",
  },
];

export default function Page() {
  const route = ROUTES.contact;

  return (
    <SiteShell path={route.path}>
      <E2Hero
        route={route}
        label="Contact"
        title={<>Talk to a person, not a form</>}
        lede="Pick whichever line below is closest to your situation. It opens WhatsApp with a first message already written, so the right person picks it up."
        photo={{ src: "/media/img/close-conversation.jpg", alt: "Two people talking across a table" }}
      />

      <E2Band label="Get in touch" title={<>What brings you here?</>}>
        <div className="dl-cards dl-cards--2">
          {ROUTES_IN.map((r) => (
            <article className="dl-card rv" key={r.title}>
              <div className="dl-card__body">
                <h3>{r.title}</h3>
                <p>{r.copy}</p>
                <a className="dl-card__go tlink" data-wa={r.wa} href="#">
                  {r.action} <em aria-hidden="true">→</em>
                </a>
              </div>
            </article>
          ))}
        </div>
      </E2Band>

      <E2Band tone="sand" label="Other ways" title={<>Email, phone and office</>}>
        <div className="dl-cards dl-cards--3">
          <article className="dl-card rv">
            <div className="dl-card__body">
              <span className="dl-card__no">Email</span>
              <h3>{CONTACT.email}</h3>
              <p>For anything that needs a longer answer, or a document attached.</p>
              <a className="dl-card__go tlink" href={`mailto:${CONTACT.email}`}>
                Send an email <em aria-hidden="true">→</em>
              </a>
            </div>
          </article>
          <article className="dl-card rv">
            <div className="dl-card__body">
              <span className="dl-card__no">WhatsApp</span>
              {/* ⚠️ Placeholder number — see lib/contact.ts. */}
              <h3>{CONTACT.phone}</h3>
              <p>Monday to Friday, 9am–6pm. Most messages get a reply the same day.</p>
              <a className="dl-card__go tlink" data-wa={WA.question} href="#">
                Message us <em aria-hidden="true">→</em>
              </a>
            </div>
          </article>
          <article className="dl-card rv">
            <div className="dl-card__body">
              <span className="dl-card__no">Office</span>
              {/* ⚠️ Full street address pending — see lib/contact.ts. */}
              <h3>{CONTACT.city}</h3>
              <p>Visits by appointment, so someone is there to meet you.</p>
              <a className="dl-card__go tlink" data-wa={WA.visit} href="#">
                Arrange a time <em aria-hidden="true">→</em>
              </a>
            </div>
          </article>
        </div>
      </E2Band>

      <E2Band read>
        <Prose>
          <p>
            If you are not sure which of the above fits, send anything at all. Working out what someone actually needs
            is the beginning of the job, not a prerequisite for starting it.
          </p>
          <p>
            And if you are early in thinking about this and not ready to talk to anyone, the{" "}
            <a href={ROUTES.solutions.path}>protection and planning pages</a> explain most of it without involving us.
          </p>
        </Prose>
      </E2Band>

      <E2Band read label="Before you message" title={<>Reasonable things to wonder</>}>
        <E2Qa items={FAQS} />
        <p className="dl-prose rv" style={{ marginTop: "clamp(22px, 3vh, 34px)" }}>
          <a href={link(ROUTES.about.path)}>Read about how we work →</a>
        </p>
      </E2Band>

      <RelatedContent keys={["solutions", "policy", "careers"]} tone="sand" />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS)} />
    </SiteShell>
  );
}
