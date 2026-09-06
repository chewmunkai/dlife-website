/* ============================================================
   D'Life — contact points and WhatsApp routing.

   The direction guide §11: "One main number may be used at launch if
   operationally necessary, but major CTAs should use distinct pre-filled
   messages so the team can understand the visitor's intent and source."

   So every call to action on the site names itself in its own prefill. The
   team reads the first line of an incoming WhatsApp and knows which page
   and which button produced it, with no analytics and no automation. The
   strings below are the whole routing table — keep them distinct.
   ============================================================ */

/**
 * ⚠️ TEMPORARY (6 Sep 2026, client): Corrine's own mobile, 018-231 7815,
 * standing in until D'Life's WhatsApp Business number is issued. It is a real
 * number that reaches a real person, which is why it is here rather than the
 * old 012-345 6789 placeholder — but it is not the agency's, and swapping it
 * is a one-line change because every `data-wa` link on the site builds its
 * wa.me deep link from this one value.
 */
export const WA_NUMBER = "60182317815";

/**
 * Confirmed by the client, 6 Sep 2026: the office address and its landline.
 *
 * ⚠️ The email is still the prototype's. hello@dlife.com.my has not been
 * confirmed as a mailbox anyone reads, and it is the address the privacy,
 * disclosures and complaints pages tell people to write to. Confirm it or
 * replace it before launch.
 */
export const CONTACT = {
  /** The office landline. WhatsApp is WA_NUMBER above, and is a mobile. */
  phone: "03-9766 1205",
  /** ⚠️ TODO(launch): unconfirmed. */
  email: "hello@dlife.com.my",
  street: "P-5-2, Level 2, Pusat Bandar",
  street2: "Jalan Jalil Utama 2, Bukit Jalil",
  postcode: "57000",
  city: "Kuala Lumpur",
  region: "Federal Territory of Kuala Lumpur",
  country: "MY",
} as const;

/** The address as one line, for a footer or a sentence. */
export const ADDRESS_LINE = [
  CONTACT.street,
  CONTACT.street2,
  `${CONTACT.postcode} ${CONTACT.city}`,
].join(", ");

/**
 * Pre-filled WhatsApp messages, one per intent. Grouped by the journey that
 * produces them so it stays obvious when two CTAs have drifted into saying
 * the same thing.
 */
export const WA = {
  /* General */
  advisor: "Hi D’Life, I’d like to speak with an advisor.",
  /* Note for whoever reads an incoming thread: wa.me only ever OPENS WhatsApp
     with the message written into the box. Nothing on this site sends one. */
  conversation: "Hi D’Life, I’d like to start a conversation.",
  question: "Hi D’Life, I have a question I’d like to ask.",
  footer: "Hi D’Life, I’d like to get in touch — I found your contact details on the website.",
  visit: "Hi D’Life, I’d like to arrange a time to meet at your office.",
  float: "Hi D’Life, I’m on your website and I’d like to ask something.",

  /* Existing policy — insurer-neutral, never framed as switching */
  policy: "Hi D’Life, I’d like guidance on my existing policy.",
  policyClarity: "Hi D’Life, I’d like to get clarity on my current coverage.",

  /* Solutions, one per life need */
  family: "Hi D’Life, I’d like to talk about protecting my family.",
  income: "Hi D’Life, I’d like to talk about protecting my income.",
  medical: "Hi D’Life, I’d like to talk about medical and health preparation.",
  future: "Hi D’Life, I’d like to talk about planning for my future.",
  legacy: "Hi D’Life, I’d like to talk about wealth and legacy planning.",
  corporate: "Hi D’Life, I’d like to talk about protection for my company’s employees.",

  /* People and community */
  career: "Hi D’Life, I’d like to explore a career conversation.",
  dva: "Hi D’Life, I’d like to know more about DVA.",
  youth: "Hi D’Life, I’d like Youth Community updates.",
  event: "Hi D’Life, I’d like to know about upcoming events.",

  /* A13/A16: the Youth Community's own three intents. "Ask about joining"
     used to open on the updates prefill, which told the team the opposite of
     what the visitor had just clicked, and its events used the site-wide
     events line. Each says which section and which button produced it, which
     is the whole point of this table. */
  youthJoin: "Hi D’Life, I’d like to join the Youth Community. How do I get started?",
  youthAsk: "Hi D’Life, I have a question about the Youth Community.",
  youthEvent: "Hi D’Life, I’d like to know about the next Youth Community session.",
} as const;

export type WaKey = keyof typeof WA;

/** A wa.me deep link. Used server-side; the client hydrates `[data-wa]` too. */
export const waHref = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
