import { pageDocument, sectionBlock } from "../define";

/** /contact as a Talous CMS document: today's copy (contact details stay in lib/contact.ts). */
const REACH = {
  label: "Where to find us",
  heading: "D’Life Sdn Bhd",
  lede: "A Malaysian financial advisory and insurance agency, based in the Klang Valley and working with clients across the country.",
  kualaLumpur: "Kuala Lumpur",
  segamat: "Segamat",
  whatsapp: "WhatsApp",
  telephone: "Telephone",
  telephoneNote: "Takes a call or a WhatsApp message.",
  afterHours: "After hours",
  email: "Email",
  hours: "Hours",
  formLabel: "Send an enquiry",
  formHeading: "Or leave it here",
};

export const CONTACT_PAGE = pageDocument([
  [
    "PageHero",
    {
      label: "Contact",
      title: "Tell us what you need",
      lede: "A few lines is enough to start. We will read it, work out who should answer, and come back to you.",
      // 12 Oct 2026, client: two women talking it through at a table (4:3, the hero frame's shape).
      photo: "/media/img/contact-hero-conversation.jpg",
      photoAlt: "Two women talking over coffee at a wooden table, one explaining while the other listens",
    },
  ],
  ["ContactReach", REACH],
]);

export const CONTACT_BLOCKS = {
  ContactReach: {
    ...sectionBlock("Where to find us + enquiry form", REACH, {
      labels: {
        label: "Small label",
        heading: "Heading",
        lede: "Intro",
        kualaLumpur: "Label: Kuala Lumpur office",
        segamat: "Label: Segamat office",
        whatsapp: "Label: WhatsApp",
        telephone: "Label: telephone",
        telephoneNote: "Note under the telephone number",
        afterHours: "Label: after hours",
        email: "Label: email",
        hours: "Label: hours",
        formLabel: "Form: small label",
        formHeading: "Form: heading",
      },
      long: ["lede"],
    }),
    description: "The addresses, numbers, email and hours themselves are kept with the site's contact details (shared with the footer).",
  },
};
