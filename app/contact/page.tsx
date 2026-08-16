import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import Ask from "../../components/v2/Ask";
import JsonLd from "../../components/site/JsonLd";
import { Hero, Band, Closing, Cards } from "../../components/v2/blocks";
import { ROUTES } from "../../lib/routes";
import { link } from "../../lib/asset";
import { CONTACT, WA, waHref } from "../../lib/contact";
import { pageMeta, breadcrumbLd, faqLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.contact);

/* ============================================================
   Contact.

   There is no form on this page, deliberately: every route opens WhatsApp or
   an email client with a first message already written. Direction guide §11
   asks that each CTA name itself in its own prefill so the team can read the
   first line of an incoming message and know which page and which intent
   produced it, with no analytics and no automation.

   Every prefill below comes from lib/contact.ts rather than being written
   here, so the routing table stays in one file and two CTAs cannot quietly
   drift into saying the same thing.

   ⚠️ The number, address and email are still placeholders pending client
   confirmation — see the TODOs in lib/contact.ts.
   ============================================================ */

const ROUTES_IN = [
  {
    title: "I’d like to speak with an advisor",
    copy: "Protection, planning, or just working out where to start. A first conversation is usually under an hour and involves no products.",
    href: waHref(WA.advisor),
    cta: "Start a conversation",
  },
  {
    title: "I have a policy I’d like explained",
    copy: "Wherever you bought it. We will read it before we speak, and there is no obligation to change anything.",
    href: waHref(WA.policyClarity),
    cta: "Ask about my coverage",
  },
  {
    title: "I’d like to explore a career",
    copy: "An honest conversation about what the work involves, what the first year looks like, and who it suits.",
    href: waHref(WA.career),
    cta: "Explore a career",
  },
  {
    title: "I’m enquiring on behalf of a company",
    copy: "Employee benefits, key person cover or business continuity. Headcount and what is already in place is enough to begin.",
    href: waHref(WA.corporate),
    cta: "Make a corporate enquiry",
  },
  {
    title: "I’d like to know about DVA",
    copy: "Membership of the leadership circle is by invitation, but questions about it are always welcome.",
    href: waHref(WA.dva),
    cta: "Ask about DVA",
  },
  {
    title: "I’m interested in the Youth Community",
    copy: "Events, workshops and resources for students, fresh graduates and young professionals.",
    href: waHref(WA.youth),
    cta: "Ask about Youth Community",
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
  { q: "Is there a cost to a first conversation?", a: "No." },
];

export default function Page() {
  const route = ROUTES.contact;

  return (
    <Shell>
      <Hero
        route={route}
        label="Contact"
        title="Talk to a person, not a form"
        lede="Pick whichever line below is closest to your situation. It opens WhatsApp with a first message already written, so the right person picks it up."
        photo={{ src: "/media/img/close-conversation.jpg", alt: "Two people talking across a table" }}
      />

      <Band label="Get in touch" title="What brings you here?">
        <Cards columns={2} items={ROUTES_IN} />
      </Band>

      <Band tone="sand" label="Other ways" title="Email, phone and office">
        <Cards
          columns={3}
          items={[
            {
              kicker: "Email",
              title: CONTACT.email,
              copy: "For anything that needs a longer answer, or a document attached.",
              href: `mailto:${CONTACT.email}`,
              cta: "Send an email",
            },
            {
              kicker: "WhatsApp",
              title: CONTACT.phone,
              copy: "Monday to Friday, 9am–6pm. Most messages get a reply the same day.",
              href: waHref(WA.question),
              cta: "Message us",
            },
            {
              kicker: "Office",
              title: CONTACT.city,
              copy: "Visits by appointment, so someone is there to meet you.",
              href: waHref(WA.visit),
              cta: "Arrange a time",
            },
          ]}
        />
      </Band>

      <Band read>
        <div className="dl-prose">
          <p>
            If you are not sure which of the above fits, send anything at all. Working out what someone actually needs
            is the beginning of the job, not a prerequisite for starting it.
          </p>
          <p>
            And if you are early in thinking about this and not ready to talk to anyone, the{" "}
            <a href={link(ROUTES.solutions.path)}>protection and planning pages</a> explain most of it without involving
            us.
          </p>
        </div>
      </Band>

      <section className="ask-host light">
        <div className="ask-head">
          <p className="lbl">Before you message</p>
          <h2>Reasonable things to wonder</h2>
        </div>
        <div>
          <Ask items={FAQS} />
          <div className="dl-actions" style={{ marginTop: "clamp(28px,4vh,44px)" }}>
            <a className="pill ghost" href={waHref(WA.question)}>
              <span>Ask us something else</span>
            </a>
          </div>
        </div>
      </section>

      <Closing
        photo={{ src: "/media/img/community-gathering.jpg", alt: "", position: "50% 30%" }}
        title="Still deciding where to start?"
        lede="Send anything at all. Working out what you actually need is the beginning of the job, not a prerequisite for starting it."
        actions={
          <>
            <a className="pill sand" href={waHref(WA.conversation)}>
              <span>Message us on WhatsApp</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.solutions.path)}>
              <span>Explore protection &amp; planning</span>
            </a>
          </>
        }
      />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS)} />
    </Shell>
  );
}
