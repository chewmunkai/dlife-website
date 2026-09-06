import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import Lead from "../../components/v2/Lead";
import JsonLd from "../../components/site/JsonLd";
import { Hero } from "../../components/v2/blocks";
import { ROUTES } from "../../lib/routes";
import { CONTACT, WA, WA_DISPLAY, WA_NUMBER, waHref } from "../../lib/contact";
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

   The office address and the landline were confirmed by the client on
   6 Sep 2026 and are real. Two things on this page are still not:

   ⚠️ The WhatsApp number is Corrine's own mobile, standing in until D'Life's
   WhatsApp Business number is issued. It reaches a person, which the old
   012-345 6789 did not, but it is not the agency's.

   ⚠️ hello@dlife.com.my is unconfirmed, and it is the address the privacy,
   disclosures and complaints pages tell people to write to.
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
        /* Round 22, and the fourth photograph this page has carried: a stock still
           of one man, then team-office.jpg, then team-gathering.jpg, all turned
           down. This one is new — sourced from the client's public Drive folder in
           the browser, since the Drive connector cannot read inside a shared
           folder. A small group around a table, which is what asking someone for
           advice actually looks like, rather than a lineup of the whole practice. */
        photo={{
          src: "/media/img/team-table.jpg",
          alt: "D’Life advisors talking around a table",
          ratio: "1080 / 842",
        }}
      />

      <section className="band light">
        <div className="reach">
          <div className="reach__info">
            <p className="lbl">Where to find us</p>
            <h2>D’Life Sdn Bhd</h2>
            <p className="dl-lede">
              A Malaysian financial advisory and insurance agency, based in the Klang Valley and working with clients
              across the country.
            </p>

            <dl className="reach__list">
              <div>
                <dt>Office</dt>
                <dd>
                  <address>
                    {CONTACT.street}
                    <br />
                    {CONTACT.street2}
                    <br />
                    {CONTACT.postcode} {CONTACT.city}
                  </address>
                  <em>Visits by appointment.</em>
                </dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd>
                  <a href={waHref(WA.conversation)}>{WA_DISPLAY}</a>
                  <em>The quickest route. Opens with a first message already written.</em>
                </dd>
              </div>
              <div>
                <dt>Telephone</dt>
                <dd>
                  <a href={`tel:+603${CONTACT.phone.replace(/\D/g, "").slice(2)}`}>{CONTACT.phone}</a>
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
      {/* A real PostalAddress now: the client confirmed the office on
          6 Sep 2026, so the structured data carries the whole thing. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: "D’Life Sdn Bhd",
          email: CONTACT.email,
          telephone: `+60${CONTACT.phone.replace(/\D/g, "").slice(1)}`,
          address: {
            "@type": "PostalAddress",
            streetAddress: `${CONTACT.street}, ${CONTACT.street2}`,
            postalCode: CONTACT.postcode,
            addressLocality: CONTACT.city,
            addressRegion: CONTACT.region,
            addressCountry: CONTACT.country,
          },
          openingHours: "Mo-Fr 09:00-18:00",
        }}
      />
    </Shell>
  );
}
