import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import JsonLd from "../../components/site/JsonLd";
import { Sections } from "../../components/cms/Sections";
import { PAGE_SECTIONS } from "../../components/pages";
import { CONTACT_PAGE } from "../../content/cms/pages/contact";
import { getPublished, sectionsFromPublished } from "../../lib/talous";
import { ROUTES } from "../../lib/routes";
import { CONTACT, HOURS, telE164 } from "../../lib/contact";
import { pageMeta, breadcrumbLd, withCmsSeo } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsSeo(pageMeta(ROUTES.contact), (await getPublished("contact"))?.seo ?? {});
}

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

export default async function Page() {
  const route = ROUTES.contact;
  // Sections and copy from Talous CMS; content/cms/pages/contact.ts holds today's as defaults.
  const blocks = sectionsFromPublished(await getPublished("contact"), CONTACT_PAGE.content);

  return (
    <Shell>
      <Sections blocks={blocks} registry={PAGE_SECTIONS} context={{ route }} />

      <JsonLd data={breadcrumbLd(route)} />
      {/* A real PostalAddress now: the client confirmed the office on
          6 Sep 2026, so the structured data carries the whole thing. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: "D’Life Sdn Bhd",
          email: CONTACT.email,
          telephone: telE164(CONTACT.phone),
          address: {
            "@type": "PostalAddress",
            streetAddress: `${CONTACT.street}, ${CONTACT.street2}`,
            postalCode: CONTACT.postcode,
            addressLocality: CONTACT.city,
            addressRegion: CONTACT.region,
            addressCountry: CONTACT.country,
          },
          openingHours: HOURS.schema,
        }}
      />
    </Shell>
  );
}
