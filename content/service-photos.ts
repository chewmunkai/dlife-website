import type { Photo } from "../components/v2/blocks";

// Used only by the five service detail pages. Shared hub/homepage imagery
// stays in its original content records. Originals and rationale: services/SOURCES.md.
/* Generated scenes, 2026. Only hospital-access is still on a page: the
   client's final set (11 Oct 2026, below) has no picture for Medical card 03,
   so it keeps this one. JPEG since the September 2026 audit (~200 KB each). */
const generated = (name: string, alt: string): Photo => ({
  src: `/media/img/services/generated/${name}.jpg`, alt, position: "50% 0%",
});

/* ============================================================
   THE CLIENT'S FINAL SET (11 Oct 2026)
   "dlife-solution-images-final-claude-code.zip": 28 images in one folder per
   page, final-only. The supplied filenames are kept as the names; PNGs were
   re-encoded to JPEG (2 MB → ~250 KB) and nothing wider than 1600px is kept.

   The package maps folders to pages, not files to slots, so each file is
   placed by what it shows against the card's own question. Two pages came
   with five pictures for six places, and the slot without a match keeps its
   current photograph: Protecting your family card 02 (the mortgage) and
   Medical card 03 (private hospitals).

   Per the package README, 12 of these were reworked from the client's real
   advisor photographs, so the advisor in a scene is a real D'Life advisor;
   the clients and families are generated. That is at the client's own
   request (confirmed 11 Oct 2026) — the real advisor's face is the point,
   not an accident of the rework, so do not swap it for a generated one.
   ============================================================ */
const sol = (file: string, alt: string, extra?: Partial<Photo>): Photo => ({
  src: `/media/img/solutions/${file}.jpg`, alt, ...extra,
});

const replacements: Record<string, { hero?: Photo; moments: Record<number, Photo> }> = {
  "protecting-your-family": {
    /* Matted, as the hero it replaces was: a 1.54 table with a man against the
       right edge, which a 4:3 cover would cut. */
    hero: sol("protecting-family/family-meal", "Three generations of a family sharing a meal at home", { fit: "contain" }),
    moments: {
      1: sol("protecting-family/newborn-at-home", "A couple at home with their newborn"),
      3: sol("protecting-family/grandfather-family", "A woman passing her father a cup while her daughter shows her a drawing"),
      4: sol("protecting-family/advisor-tiffin", "An advisor bringing food in a tiffin carrier to a family friend"),
      5: sol("protecting-family/policy-consultation", "An advisor going through an old policy with a client"),
    },
  },
  "protecting-your-income": {
    hero: sol("protecting-income/need-income-malaysia", "An advisor working through figures with a couple at their dining table"),
    moments: {
      1: sol("protecting-income/income-01-repayments", "An advisor talking a man through his loan repayments"),
      2: sol("protecting-income/inc-savings", "A couple and an advisor with a jar of savings on the table"),
      3: sol("protecting-income/income-03-one-income", "A couple working out with an advisor whether one income could carry the household"),
      4: sol("protecting-income/income-04-what-comes-first", "A couple and an advisor sorting out what to protect first"),
      5: sol("protecting-income/income-05-asking", "A family talking through who they could turn to for help"),
    },
  },
  "medical-health-preparation": {
    hero: sol("medical-health/family-doctor-consultation", "Two family members in consultation with a doctor"),
    moments: {
      1: sol("medical-health/older-woman-advisor", "An advisor going through a policy’s limits with a client"),
      2: sol("medical-health/medical-bill", "A man working out a medical bill with an advisor"),
      3: generated("hospital-access", "A visitor speaking with a receptionist at a hospital"),
      4: sol("medical-health/benefits-review", "A man changing jobs, reviewing his benefits with an advisor"),
      5: sol("medical-health/advisor-doctor", "An advisor going over medical records with a doctor"),
    },
  },
  "planning-for-your-future": {
    /* 1.34 against the 4:3 plate, so the frame and the file agree. */
    hero: sol("planning-for-your-future/advisor-planning", "An advisor and a young man starting a plan together at a table"),
    moments: {
      1: sol("planning-for-your-future/advisor-couple", "An advisor reading through a retirement statement with a client"),
      2: sol("planning-for-your-future/family-dining", "Grandparents at dinner with their family"),
      3: sol("planning-for-your-future/market-scene", "An older woman counting her purse at a market stall"),
      4: sol("planning-for-your-future/library-study", "A student studying in a library"),
      5: sol("planning-for-your-future/window-reflection", "A woman at a window at home, thinking something over"),
    },
  },
  "wealth-legacy": {
    hero: sol("wealth-legacy/family-photos", "A family looking through photographs and albums together"),
    moments: {
      1: sol("wealth-legacy/family-legacy-planning", "An advisor with a family going through photographs and papers"),
      2: sol("wealth-legacy/family-consultation", "A mother and her adult son talking over a meal with an advisor"),
      3: sol("wealth-legacy/workshop-advisor", "A mother and son discussing their furniture workshop with an advisor"),
      4: sol("wealth-legacy/wheelchair-support", "An adult wheelchair user planning long-term support with her parent and an advisor"),
      /* 30% rather than centred: the father's hair meets the top of a centred
         16:10 frame, and the extra trim below is floor. */
      5: sol("wealth-legacy/family-records", "A daughter taking a folder from the shelf as her father shows her where it is kept", { position: "50% 30%" }),
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
