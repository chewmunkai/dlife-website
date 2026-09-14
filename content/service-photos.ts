import type { Photo } from "../components/v2/blocks";

// Used only by the five service detail pages. Shared hub/homepage imagery
// stays in its original content records. Originals and rationale: services/SOURCES.md.
const drive = (name: string, alt: string): Photo => ({
  src: `/media/img/services/${name}.jpg`, alt, fit: "contain",
});
/* T03 (client, 14 Sep 2026). Both these heroes used to be one shared const —
   `shared-meal.jpg`, the dim-sum table — which is how a single rejection took
   out two pages at once: the client turned the same picture down on Contact.
   They are now one purpose-made photograph each. No `fit: "contain"` any more
   either: these are framed for the crop, so the plate fills instead of
   letterboxing. */
const shot = (name: string, alt: string): Photo => ({ src: `/media/img/${name}.jpg`, alt });
const generated = (name: string, alt: string): Photo => ({
  src: `/media/img/services/generated/${name}.png`, alt, position: "50% 0%",
});
const policyReview = generated("policy-review", "A woman and advisor comparing policy documents at a desk");

// Generated scenes fill subjects absent from the client Drive collection.
// They depict fictional people, not D’Life clients or team members.
const replacements: Record<string, { hero?: Photo; moments: Record<number, Photo> }> = {
  "protecting-your-family": {
    hero: { ...shot("family-hero", "A family of four around the dinner table at home"), ratio: "1080 / 842" },
    /* All five moments moved to content/solutions-e2.ts under T05 — the set is
       purpose-made now, so it no longer needs overriding here. */
    moments: {},
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
    hero: { ...shot("future-hero", "A couple in their fifties talking over tea at home"), ratio: "1080 / 842" },
    moments: {
      3: { src: "/media/img/inc-savings.jpg", alt: "Coins saved in a glass jar" },
      /* T04: card 05, "whether it is too late to start, or too early to
         bother". Replaces generated/starting-a-plan.png. */
      5: shot("future-05-start", "A young man and his mother starting a plan together at the kitchen table"),
    },
  },
  "wealth-legacy": {
    moments: {
      3: generated("legacy-business-v2", "A mother and son discussing their family business with an advisor"),
      4: generated("legacy-support-v2", "An adult wheelchair user planning long-term support with a parent and advisor"),
      5: generated("legacy-records-v2", "Parents showing their adult daughter where important family records are stored"),
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
