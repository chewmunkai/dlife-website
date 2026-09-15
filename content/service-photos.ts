import type { Photo } from "../components/v2/blocks";

// Used only by the five service detail pages. Shared hub/homepage imagery
// stays in its original content records. Originals and rationale: services/SOURCES.md.
const drive = (name: string, alt: string): Photo => ({
  src: `/media/img/services/${name}.jpg`, alt, fit: "contain",
});
const meal = drive("shared-meal", "Nine people gathered around a dining table");
/* JPEG since the September 2026 audit. The scenes were generated as PNG at
   ~2 MB each, and a service page carried five of them: the medical page asked
   a phone for 10 MB of pictures before it could paint a card. Re-encoded at
   quality 82 they are ~200 KB apiece with no visible change at card size.
   Same pixels, same crops, same names — only the extension moved. */
const generated = (name: string, alt: string): Photo => ({
  src: `/media/img/services/generated/${name}.jpg`, alt, position: "50% 0%",
});
const policyReview = generated("policy-review", "A woman and advisor comparing policy documents at a desk");

// Generated scenes fill subjects absent from the client Drive collection.
// They depict fictional people, not D’Life clients or team members.
const replacements: Record<string, { hero?: Photo; moments: Record<number, Photo> }> = {
  "protecting-your-family": {
    hero: { ...meal, ratio: "1080 / 842" },
    moments: {
      3: generated("family-generations", "Grandparents, parents and children spending time together at home"),
      4: generated("family-support", "A friend offering reassurance during a quiet conversation at home"),
      5: policyReview,
    },
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
    /* Client, 15 Sep 2026: "replace the hero image with Section 05". Card 05
       carried `starting-a-plan` — two people of different generations at the
       same table, doing the same thing — and the client wants that at the top
       of the page instead of the shared-meal group shot, which is also the
       photograph they turned down on Contact.

       Built here rather than spread from `generated()` so the hero does not
       inherit its `position: "50% 0%"`: this frame crops on the WIDTH
       (1.283 against the file's 1.5), so a top-pinned Y does nothing and a
       centred crop keeps both subjects whole. */
    hero: {
      src: "/media/img/services/generated/starting-a-plan.jpg",
      alt: "A young man and an older woman starting a plan together at a kitchen table",
      ratio: "1080 / 842",
    },
    moments: {
      3: { src: "/media/img/inc-savings.jpg", alt: "Coins saved in a glass jar" },
      /* Card 05's own photograph became this page's hero, so the slot got a
         picture of its own rather than a second copy. Deliberately a single
         subject, to sit against the hero's two-people-at-a-table. */
      5: { src: "/media/img/future-05-start.jpg", alt: "A woman at a window at home, thinking something over" },
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
