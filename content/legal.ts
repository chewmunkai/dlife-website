import type { RouteKey } from "../lib/routes";
/* A16/A17: the address is the one in lib/contact.ts — still a placeholder,
   and it should change in exactly one place when the real one arrives. */
import { CONTACT } from "../lib/contact";

/* ============================================================
   Legal pages.

   ⚠️⚠️ NOT LEGAL ADVICE, AND NOT READY TO PUBLISH AS WRITTEN. ⚠️⚠️

   These are structural drafts. They cover the ground each page has to cover
   and say it in the site's own voice, so D'Life's compliance owner and legal
   adviser are reviewing a document rather than a blank page. They are not a
   substitute for that review, and they must not go live without it.

   What is deliberately NOT invented anywhere below:
     • licence or registration numbers
     • the name of any regulator D'Life is registered with
     • company registration number and registered address
     • the identity of the principal insurer, beyond what is already public
     • retention periods, and the identity of any data processor
     • the PDPA notice wording, which has statutory content requirements
     • the external complaints escalation route

   Every one of those appears as a visible [TO BE CONFIRMED] marker in the
   rendered copy, so an unreviewed page reads as obviously unfinished rather
   than plausibly complete. Do not delete a marker without the real value.

   This also connects to a still-open question in the master brief: whether
   D'Life is a licensed agency in its own right or a team operating under a
   larger insurer. That answer changes the wording on all four of these pages,
   and it is why they are drafts.
   ============================================================ */

/** Renders an unmissable gap in the copy. Deliberately loud. */
const tbc = (what: string) => `[TO BE CONFIRMED: ${what}]`;

export type LegalSection = { heading: string; paras: string[] };

export type LegalContent = {
  key: RouteKey;
  label: string;
  h1: string;
  lede: string;
  sections: LegalSection[];
  related: RouteKey[];
};

export const LEGAL: Record<string, LegalContent> = {
  privacy: {
    key: "privacy",
    label: "Legal",
    h1: "Privacy Policy",
    lede: "How D’Life collects, uses and protects the personal information you share with us.",
    sections: [
      {
        heading: "Who we are",
        paras: [
          `D’Life Sdn Bhd ${tbc("company registration number and registered address")} is a financial advisory and insurance agency operating in Malaysia. This policy explains what we do with personal information you give us through this website or in the course of an advisory relationship.`,
          `If you have a question about anything in this policy, or you want to exercise any of the rights described below, contact us at ${CONTACT.email}.`,
        ],
      },
      {
        heading: "What we collect",
        paras: [
          "From this website, we collect only what you choose to send us. There is no contact form here: the enquiry routes open WhatsApp or your email client, so whatever you send arrives directly with us and is held in those systems.",
          "If you sign up for updates, we collect the email address you provide. If you become a client, we collect the information necessary to advise you and arrange cover, which is more extensive and is set out separately in the documentation you receive at that point.",
          `We also collect standard analytics about how this website is used. ${tbc("the analytics provider, whether IP anonymisation is enabled, and the cookie notice this requires")}`,
        ],
      },
      {
        heading: "How we use it",
        paras: [
          "To reply to you, to provide advice and arrange cover where you ask us to, to maintain the records we are required to keep, and to send you updates if you have asked for them.",
          "We do not sell personal information, and we do not share it for anyone else’s marketing.",
        ],
      },
      {
        heading: "Who we share it with",
        paras: [
          `Where you ask us to arrange cover, the information you provide is shared with the relevant insurer in order to do that. ${tbc("the principal insurer relationship, and any other processor (CRM, email delivery, hosting) that handles personal data on our behalf")}`,
          "We may also disclose information where we are required to by law or by a regulator.",
        ],
      },
      {
        heading: "How long we keep it",
        paras: [
          tbc(
            "retention periods. Advisory records are subject to statutory and regulatory minimums that need confirming with your compliance owner before this section is published",
          ),
        ],
      },
      {
        heading: "Your rights",
        paras: [
          `Under Malaysia’s Personal Data Protection Act you have rights of access and correction in relation to your personal data, and you may limit how we process it for direct marketing. To make a request, email ${CONTACT.email}.`,
          tbc(
            "the full PDPA notice. The Act sets out specific content and bilingual notice requirements that this summary does not satisfy on its own",
          ),
        ],
      },
      {
        heading: "Changes to this policy",
        paras: ["If we change this policy we will update this page and change the date shown at the top of it."],
      },
    ],
    related: ["terms", "disclosures", "complaints"],
  },

  terms: {
    key: "terms",
    label: "Legal",
    h1: "Terms of Use",
    lede: "The terms on which this website is made available.",
    sections: [
      {
        heading: "About these terms",
        paras: [
          `This website is operated by D’Life Sdn Bhd ${tbc("company registration number")}. By using it, you accept these terms.`,
        ],
      },
      {
        heading: "The information here is general",
        paras: [
          "Everything on this website is general information. It is not personal advice, and it does not take your circumstances, objectives or financial situation into account.",
          "A recommendation from us only ever follows a conversation, a proper needs assessment, and the relevant product disclosure documents. Nothing on this site should be acted on as though it were that.",
        ],
      },
      {
        heading: "Accuracy",
        paras: [
          "We take reasonable care to keep this site accurate and current, but products, rules and rates change. Where something here conflicts with a policy document or an insurer’s own literature, that document governs, not this site.",
        ],
      },
      {
        heading: "Links to other sites",
        paras: [
          "Where we link to another organisation’s website, we do so because we think it is useful. We do not control those sites and we are not responsible for their content.",
        ],
      },
      {
        heading: "Intellectual property",
        paras: [
          "The content, design, photography and video on this site belong to D’Life or are used with permission. Please do not reproduce them without asking.",
        ],
      },
      {
        heading: "Liability",
        paras: [
          tbc(
            "limitation of liability wording. This clause needs drafting by a lawyer against Malaysian law; a generic exclusion copied from another site may be unenforceable and is not worth the risk",
          ),
        ],
      },
      {
        heading: "Governing law",
        paras: ["These terms are governed by the laws of Malaysia."],
      },
    ],
    related: ["privacy", "disclosures", "complaints"],
  },

  disclosures: {
    key: "disclosures",
    label: "Legal",
    h1: "Disclosures",
    lede: "Regulatory and advisory disclosures relating to D’Life and the advice we provide.",
    sections: [
      {
        heading: "Who we are and what we are licensed to do",
        paras: [
          tbc(
            "the central open question. D’Life’s status, whether a licensed agency in its own right or a team operating under the licence of a larger insurer, determines the wording of this entire page, including the correct use of ‘we’, the regulator named here, and the licence details published. It must be answered before this page goes live",
          ),
          tbc("regulator, licence or registration number, and the principal insurer relationship"),
        ],
      },
      {
        heading: "How we are paid",
        paras: [
          "Our advisors are remunerated by commission paid by the insurer when a policy is arranged, rather than by a fee charged to you. There is no charge for a first conversation, for a review of cover you already hold, or for advice that does not result in a policy.",
          tbc(
            "whether any fee-based services exist, and confirmation of the commission disclosure wording your regulator requires",
          ),
        ],
      },
      {
        heading: "The advice we give",
        paras: [
          "Advice is given after a needs assessment, and it comes with the product disclosure documents relevant to what is recommended. You are entitled to ask why something has been recommended, what alternatives were considered, and what it will cost you over its life. Those are reasonable questions and you should expect a clear answer to all three.",
          "Where a recommendation would not be in your interest, our advisors are expected to say so, including where that means recommending nothing at all.",
        ],
      },
      {
        heading: "Conflicts of interest",
        paras: [
          tbc(
            "the conflicts of interest statement. This should describe how conflicts are identified and managed in practice, not merely assert that none exist",
          ),
        ],
      },
      {
        heading: "Cooling-off",
        paras: [
          `Policies arranged in Malaysia generally carry a free-look period during which you may cancel and receive a refund, subject to the terms of the policy. ${tbc("the period and conditions applicable to the products D’Life arranges")}`,
        ],
      },
    ],
    related: ["complaints", "privacy", "terms"],
  },

  complaints: {
    key: "complaints",
    label: "Legal",
    h1: "Complaints & Feedback",
    lede: "How to raise a concern with us, what happens next, and where to take it if we cannot put it right.",
    sections: [
      {
        heading: "If something has gone wrong",
        paras: [
          "Tell us. We would far rather hear about it directly and have the chance to put it right than have you leave without saying anything.",
          `You can raise a concern with your advisor, or if you would rather not, email ${CONTACT.email} and it will reach someone else.`,
        ],
      },
      {
        heading: "What we will do",
        paras: [
          tbc(
            "your complaints procedure: acknowledgement timeframe, who investigates, the target for a substantive response, and how the outcome is communicated. Regulators generally expect specific timeframes published here rather than a general undertaking",
          ),
          "We will tell you what we have found and what, if anything, we intend to do about it. If we think we got it right, we will explain why rather than simply disagreeing with you.",
        ],
      },
      {
        heading: "If you are not satisfied with our response",
        paras: [
          tbc(
            "the correct external escalation route for D’Life’s licensing arrangement: the relevant insurer’s own complaints unit, the Ombudsman for Financial Services, and Bank Negara Malaysia’s consumer channel, in the order and with the contact details that actually apply. Publishing the wrong route is worse than publishing none",
          ),
        ],
      },
      {
        heading: "Feedback that is not a complaint",
        paras: [
          "If something worked well, or you have a suggestion, that is worth hearing too. The same email address reaches us.",
        ],
      },
    ],
    related: ["disclosures", "privacy", "terms"],
  },
};
