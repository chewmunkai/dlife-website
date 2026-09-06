import type { Photo } from "../components/v2/blocks";

// Used only by the five service detail pages. Shared hub/homepage imagery
// stays in its original content records. Originals and rationale: services/SOURCES.md.
const drive = (name: string, alt: string): Photo => ({
  src: `/media/img/services/${name}.jpg`, alt, fit: "contain",
});
const meal = drive("shared-meal", "Nine people gathered around a dining table");
const generations = drive("generations", "A group of adults and a young child together at home");
const review = drive("review-at-table", "A woman seated at a table with a tablet and laptop");
const conversation = drive("conversation", "A woman talking and gesturing across a café table");
const generated = (name: string, alt: string): Photo => ({
  src: `/media/img/services/generated/${name}.png`, alt, fit: "contain",
});
const policyReview = generated("policy-review", "A woman and advisor comparing policy documents at a desk");

// Generated scenes fill subjects absent from the client Drive collection.
// They depict fictional people, not D’Life clients or team members.
const replacements: Record<string, { hero?: Photo; moments: Record<number, Photo> }> = {
  "protecting-your-family": {
    hero: { ...meal, ratio: "1080 / 842" },
    moments: { 3: generations, 4: conversation, 5: policyReview },
  },
  "protecting-your-income": {
    moments: {
      5: { src: "/media/img/close-conversation.jpg", alt: "A man speaking with two people across a table" },
    },
  },
  "medical-health-preparation": {
    moments: {
      1: policyReview,
      2: generated("medical-costs", "A man calculating medical expenses with a receipt and calculator"),
      3: generated("hospital-access", "A visitor speaking with a receptionist at a hospital"),
      4: generated("employment-cover", "A departing employee reviewing benefits paperwork with a colleague"),
      5: generated("medical-history", "A woman discussing her medical history with a doctor"),
    },
  },
  "planning-for-your-future": {
    hero: { ...meal, ratio: "1080 / 842" },
    moments: {
      3: { src: "/media/img/inc-savings.jpg", alt: "Coins saved in a glass jar" },
      5: review,
    },
  },
  "wealth-legacy": {
    moments: {
      3: generated("business-planning", "Business owners reviewing a property plan and documents with an advisor"),
      4: generated("dependent-support", "An adult wheelchair user and her parents planning together at home"),
      5: generated("family-records", "A daughter and her father organising family documents together"),
    },
  },
};

export function servicePhotos(slug: string, hero: Photo, moments: Photo[]) {
  const replacement = replacements[slug];
  return {
    hero: replacement?.hero ?? hero,
    moments: moments.map((photo, index) => replacement?.moments[index + 1] ?? photo),
  };
}
