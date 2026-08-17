import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import Lead from "../../components/v2/Lead";
import JsonLd from "../../components/site/JsonLd";
import { Hero } from "../../components/v2/blocks";
import { ROUTES } from "../../lib/routes";
import { CONTACT, WA, WA_NUMBER, waHref } from "../../lib/contact";
import { pageMeta, breadcrumbLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.contact);

/* ============================================================
   Contact.

   Round 8 (2026-08, client): rebuilt as one simple page. It was six intent
   cards, three contact cards, a paragraph and a four-question FAQ, all of
   which asked the visitor to choose a lane before they had said anything. Now
   there are two things on it — where D'Life is, and a form — and the page ends
   there. No FAQ, and no next-step card either: a "get in touch" card at the
   foot of the get-in-touch page is circular.

   ⚠️ The form is not wired to anything. See components/v2/Lead.tsx: a static
   export has no endpoint to post to, so it acknowledges honestly rather than
   pretending. Connecting it is a client decision (form service + PDPA consent
   wording).

   ⚠️ Every detail below is a placeholder pending client confirmation — the
   number, the email and the address. See the TODOs in lib/contact.ts. The
   street address is marked on the page rather than invented, and there is no
   map because there is no address to centre one on.
   ============================================================ */

export default function Page() {
  const route = ROUTES.contact;

  return (
    <Shell>
      <Hero
        route={route}
        label="Contact"
        title="Tell us what you need"
        lede="A few lines is enough to start. We will read it, work out who should answer, and come back to you."
        photo={{ src: "/media/img/close-conversation.jpg", alt: "Two people talking across a table" }}
      />

      <section className="band light">
        <div className="reach">
          <div className="reach__info">
            <p className="lbl">Where to find us</p>
            <h2>D’Life Revolution</h2>
            <p className="dl-lede">
              A Malaysian financial advisory and insurance agency, based in the Klang Valley and working with clients
              across the country.
            </p>

            <dl className="reach__list">
              <div>
                <dt>Office</dt>
                <dd>
                  <span className="tbc">Street address to be confirmed</span>
                  <br />
                  {CONTACT.city}
                </dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  <a href={waHref(WA.conversation)}>{CONTACT.phone}</a>
                  <em>The quickest route. Opens with a first message written.</em>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>
                  Monday to Friday, 9am to 6pm
                  <em>Messages sent on a working day usually get a reply the same day.</em>
                </dd>
              </div>
            </dl>
          </div>

          <div className="reach__form">
            <p className="lbl">Send an enquiry</p>
            <h2>Or leave it here</h2>
            <Lead />
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbLd(route)} />
      {/* Marked as a placeholder in the same way the page is: no street
          address, so no PostalAddress beyond the locality. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: "D’Life Revolution",
          email: CONTACT.email,
          telephone: `+${WA_NUMBER}`,
          address: { "@type": "PostalAddress", addressLocality: "Kuala Lumpur", addressCountry: "MY" },
          openingHours: "Mo-Fr 09:00-18:00",
        }}
      />
    </Shell>
  );
}
