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
const policyReview = generated("policy-review", "A client and an advisor going through a benefits schedule together");

// Generated scenes fill subjects absent from the client Drive collection.
// They depict fictional people, not D’Life clients or team members.
const replacements: Record<string, { hero?: Photo; moments: Record<number, Photo> }> = {
  "protecting-your-family": {
    hero: { ...meal, ratio: "1080 / 842" },
    moments: {
      3: generated("family-03-sandwich", "A woman passing her father a cup while her daughter shows her a drawing"),
      4: generated("family-04-bereaved-friend", "A man bringing food to a friend in a stacked tiffin carrier"),
      5: policyReview,
    },
  },
  "protecting-your-income": {
    moments: {
      3: generated("income-03-one-income", "A couple working out whether one salary could hold the household up"),
      4: generated("income-04-what-comes-first", "A couple sorting household paperwork into what comes first and what can wait"),
      5: generated("income-05-asking", "A man asking his mother for help, and finding it hard to say"),
    },
  },
  "medical-health-preparation": {
    moments: {
      1: policyReview,
      2: generated("medical-02-excess", "A man working out a hospital bill with a calculator at his dining table"),
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
      1: generated("future-01-is-epf-enough", "A couple in their fifties reading a retirement statement together"),
      /* Was inc-savings.jpg, the same glass jar already used on Protecting-your-
         income card 02 — the client spotted the repeat (21 Sep 2026). Replaced
         with a scene rather than a second still life. */
      3: generated("future-03-inflation", "An older woman counting her purse at a market stall"),
      /* Card 05's own photograph became this page's hero, so the slot got a
         picture of its own rather than a second copy. Deliberately a single
         subject, to sit against the hero's two-people-at-a-table. */
      5: { src: "/media/img/future-05-start.jpg", alt: "A woman at a window at home, thinking something over" },
    },
  },
  "wealth-legacy": {
    moments: {
      3: generated("legacy-03-business", "A mother and son discussing their furniture workshop with an advisor"),
      4: generated("legacy-04-dependant", "An adult wheelchair user planning long-term support with her parent and an advisor"),
      5: generated("legacy-05-records", "A daughter taking a document folder from the shelf as her father shows her where it is kept"),
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
