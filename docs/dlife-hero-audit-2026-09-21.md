# Hero audit — re-verification of commit 578b11d

Measured on the **live** site (`chewmunkai.github.io/dlife-website`) at a 1440×900
viewport on 21 Sep 2026, not on a local build. Every number below came out of
`getBoundingClientRect()` in the page, not from reading the source.

## Verdict

The three things the client asked for are done and hold up. Four things my
summary of the work stated imprecisely or left out are corrected here, and one
genuine defect is open. The defect is a duplicate photograph, and I introduced
it.

---

## 1. Hero image size — VERIFIED

Twelve of thirteen image heroes measure **720 × 540, ratio 1.333**. Resources is
720 × 408 (1.765), the documented exception.

| Page | art | ratio | card | file | file ratio | crop |
|---|---|---|---|---|---|---|
| /about | 720×540 | 1.333 | 648×660 | founder-sharon + founder-rachel, 1400×1750 | 0.80 | 0 — `fit: contain`, letterboxed |
| /careers | 720×540 | 1.333 | 648×632 | team-outdoors 1800×1350 | 1.333 | **0%** |
| /contact | 720×540 | 1.333 | 648×540 | contact-conversation 1536×1024 | 1.5 | 11% width |
| /existing-policy-support | 720×540 | 1.333 | 648×632 | eps-hero-clarity 1536×1024 | 1.5 | 11% width |
| /resources | 720×408 | 1.765 | 648×540 | dva-award-night 2048×1160 | 1.766 | **0%** — exception |
| /solutions | 720×540 | 1.333 | 648×563 | team-welcome 1024×768 | 1.333 | **0%** |
| /stories | 720×540 | 1.333 | 648×540 | team-welcome 1024×768 | 1.333 | **0%** |
| /youth-community | 720×540 | 1.333 | 648×563 | youth-session 1800×1350 | 1.333 | **0%** |
| /solutions/protecting-your-family | 720×540 | 1.333 | 648×563 | shared-meal 1080×842 | 1.283 | 3.7% height |
| /solutions/protecting-your-income | 720×540 | 1.333 | 648×563 | need-income-malaysia 1774×887 | 2.000 | 33% width |
| /solutions/medical-health-preparation | 720×540 | 1.333 | 648×563 | need-health-card 1536×1024 | 1.5 | 11% width |
| /solutions/planning-for-your-future | 720×540 | 1.333 | 648×563 | starting-a-plan 1586×992 | 1.599 | 17% width |
| /solutions/wealth-legacy | 720×540 | 1.333 | 648×540 | need-legacy-card 1536×1024 | 1.5 | 11% width |

The four group photographs crop by **zero**, as claimed — they are 4:3 files.

### The "before" state, recovered from git and re-checked

Each removed pin, with the height it produced in the 720-wide column:

| removed pin | file | height | page |
|---|---|---|---|
| `8 / 5` | — | 450 | about |
| `1536 / 1024` | — | 480 | contact |
| `4 / 3` | — | 540 | careers, stories, youth-community |
| `1024 / 768` | — | 540 | solutions |
| `1080 / 842` | — | 561 | protecting-your-family, planning-for-your-future |
| *(none — fell to `height: min(80vh,660px)`)* | — | 660 | EPS, protecting-your-income, medical, wealth-legacy |
| `2048 / 1160` *(kept)* | — | 408 | resources |

**Six distinct heights.** 1+1+4+2+4+1 = 13. Confirmed.

Planning carried `1080 / 842` (1.283) while holding a 1.599 file — a pin left
behind when its hero photograph was swapped. Removing the pins cleared that too.

### Crop arithmetic, recomputed

- 3:2 file in the old 720×660 frame (1.0909): 990 wide scaled → (990−720)/990 = **27.3%**
- same file at 4:3: 810 wide scaled → (810−720)/810 = **11.1%**
- protecting-your-income's 2.0 panorama at 1.0909: (1320−720)/1320 = **45.5%**
- same at 4:3: (1080−720)/1080 = **33.3%**

All four figures as stated.

## 2. Headline box — VERIFIED, with one correction

Width is **648 on all thirteen image heroes**. Heights now run **540–660**
(was 429–605). Contact, the stunted panel in the client's screenshot, is 540,
flush with its picture.

**Correction:** 648 is not the width "everywhere". The four legal pages and
site-index render a card of **627** — they are `hero--noart`, a different
layout with no picture beside it.

## 3. Lede spacing — VERIFIED

`/solutions/protecting-your-family` renders exactly the three lines asked for:

1. Most of us have one quiet question:
2. If I were no longer here, would the people I love be taken care of?
3. It's a question worth planning for.

`.dl-clause` computes to `display: block`. At 375px the three clauses occupy
1 / 2 / 1 lines and `scrollWidth === innerWidth` — no horizontal overflow. The
`min-height` rule correctly does not apply below 901px (`min-height: auto`).

## 4. Delivery — VERIFIED

`578b11d` is on `origin/main`, working tree clean. All three rules are present
in the live CSS bundle `3a750b4332983130.css`:
`.hero .art{aspect-ratio:4/3;height:auto}`, `.dl-clause{display:block}`, `37.5vw`.
That bundle is `<link>`ed third, after `a06245890604c8a5.css` which still carries
the old `height:min(80vh,660px)` — equal specificity, so source order decides and
the override wins. Bundles four and five contain no competing `.hero .art` height
rule; amendments.css only has `.hero .art[style*=aspect-ratio]{height:auto}`,
which now matches Resources alone.

---

## Corrections to what I reported

**a. Hero count.** I said "15 heroes". There are **17 `Hero` components**: 13
with a photograph, 4 legal pages without. Beyond those, three page-tops are not
the `Hero` component at all and were never in scope:

| page | mechanism | state |
|---|---|---|
| `/` (homepage) | `DLife.tsx`, old `.dlife` system | `hero-team.jpg` at 710×533 (1.332) — coincidentally the same shape |
| `/dva` | type-led, no `.hero` element | untouched by design; `app/dva/page.tsx:29` says "do not 'harmonise' this hero with the others" |
| `/site-index` | `.dl-indexhero` | card 627×492 |

The client asked for "every single page". These three are consistent *in
appearance* only by coincidence (homepage) or by an explicit earlier decision
(DVA). They are named here rather than quietly excluded.

**b. The 540 floor reaches the legal pages.** `min-height: 37.5vw` is scoped to
`.hero .card`, which includes `hero--noart`. On /privacy the card's own content
is **358px**; the floor inflates it to **540**, adding 182px of empty space to a
page with no picture to match. The CSS comment justifies the floor as "tracking
the picture beside it" — on those four pages there is no picture. It does not
look broken, but the rule reaches further than its stated reason.

**c. Resources' card overhangs its picture** — 540 against 408. This is the
inverse of the Contact defect. Measured cause: the card's own content is 525px,
so my floor accounts for only **15px** of the 132px gap. Mostly content, not the
floor. Smaller than it first appears.

**d. A better rule exists than the one I shipped.** `align-self: stretch` on the
card (the grid is `align-items: center`, so the card currently sits at its
natural height) makes the card fill the art's row with no hard-coded `vw`.
Tested live by toggling:

| page | now (37.5vw floor) | with `align-self: stretch` |
|---|---|---|
| /contact | 540 | 540 — the original complaint still fixed |
| /resources | 540 | 525 — drops the 15px overhang |
| /privacy (noart) | 540 | 358 — no empty space added |
| /about | 660 | 660 — unchanged, content decides |

It is strictly better: same result where it matters, self-correcting at any
viewport, and it stops assuming the art is exactly half the viewport and 4:3.
What shipped works; this is a refinement, not a repair.

---

## Open defect

**`/solutions` and `/stories` render the same photograph — `team-welcome.jpg`.**

- `app/solutions/page.tsx:92`
- `app/stories/page.tsx:46`

Both confirmed rendering it live. Traced: `/solutions` has used it since
`a4c5822`; commit **`57fbf1e` — "Split the duplicate photograph"** pointed
Stories at it while fixing a different duplicate. `git merge-base --is-ancestor`
confirms the order. **I introduced this**, and it contradicts the client's
instruction: *"Need to flag out the duplicate as well, don't use the same photo."*

Fixing it is a photograph choice, not a code change: the replacement has to be
unused elsewhere and clear the never-crop rule. Needs a decision, not a patch.

---

## Note on verification method

Screenshots taken through this harness show the hero photographs as blank dark
panels on every page. That is a capture artifact, not a live fault. Proven on
/contact: `document.elementFromPoint()` at the picture's centre returns the
`<img>` itself (nothing covering it), computed `opacity: 1`, `transform: none`,
and drawing the image to a canvas reads real photographic pixel data
(`228,223,214 / 206,198,192 / 162,144,124`). Do not trust a screenshot from here
to tell you whether a photograph is rendering; read the pixels.

---

# SUPERSEDED, same day — the gap, the mat, and DVA

Everything above describes the state at `578b11d`. The client then reported
the sliver this audit predicted ("there's a space between... ensure there's no
space in between"), asked for Articles & Events to match the other heroes
"without cutting ppl off", and asked for DVA to join the standard layout with
a green headline box. The numbers above are now history. Current state:

## Every hero, measured at 1440 with the real fonts loaded

All **fourteen** image heroes: art **720x540** (1.333), card **648x540**,
gap **[0, 0, 0]** — top, bottom and side. Verified page by page on a clean dev
server, not inferred.

about · careers · contact · existing-policy-support · resources · solutions ·
stories · youth-community · dva · protecting-your-family ·
protecting-your-income · medical-health-preparation ·
planning-for-your-future · wealth-legacy

The four `hero--noart` legal pages have no picture, so they simply sit at their
own content height (privacy is 627x289). The old `min-height: 37.5vw` had been
padding them with 182px of empty space; that is gone.

## What changed

1. **`align-self: stretch` on both halves** replaces `min-height: 37.5vw`.
   The art still contributes its 4:3 height, so it sets the row floor with
   nothing hand-computed, and neither half can overhang the other.

2. **The card was tightened to fit inside that 4:3 height.** Stretching alone
   handed the row to whichever half was taller, and on the long-copy pages
   that was the card — which grew the frame past 4:3 and started cropping
   (Careers went from ZERO crop to ~10%, Existing Policy Support to ~20%).
   That trades the client's never-crop rule for the gap, which is the wrong
   way round. Tightening the card instead keeps both.

   Spacing did most of it; the headline came down about 6% (4.9vw -> 4.6vw),
   which was the smallest type change that worked. The last page to fall into
   line was About, and the fix there was two characters of measure: its lede
   is the longest on the site and clause-breaking was setting it as 3 + 2 =
   five lines at 36ch. At 38ch it sets as 2 + 1, 144px -> 86px, and the card
   lands on 540 exactly.

3. **Articles & Events and DVA are matted, not cropped.** Both are ~1.77 group
   photographs with people hard against both edges — the award-night shot has
   a man in a burgundy jacket at the extreme left and another at the extreme
   right; the DVA studio shot has seventeen people spanning nearly the full
   width. A 4:3 cover takes ~25% off the width and removes them. `fit:
   "contain"` keeps the standard plate and mats the bars in `--s-plate`, a
   translucent deep green on a dark section, so they read as an inset rather
   than a gap. About already used this treatment for the founder portraits.

4. **DVA now uses the standard `Hero`.** The long design note in
   `app/dva/page.tsx` had said not to harmonise this hero; the client
   overruled it. The register is carried by `panel="green"` instead — the card
   is `--dl-green` on this section's `--dl-ink` ground, so it reads as a
   raised green plate where every other page shows a cream one.

## The one thing that is NOT uniform

At **1280px**, Careers and Existing Policy Support come out **640x497**
(1.288) instead of 640x480 — 17px tall, because their headlines take three
lines at that width and the card cannot compress any further without the type
getting too small. The gap is still zero there; only the height differs, by
3.5%. Careers' photograph picks up a 3.3% width crop at that width, against
zero at 1440 and 1920.

Closing that last 17px means taking the hero headline down a further ~7% at
every width, which costs more than the variance does. Exact uniformity at
*every* viewport is not reachable without clipping copy: the card's content
does not scale linearly with the picture's height. 1440 and 1920 are exact.
