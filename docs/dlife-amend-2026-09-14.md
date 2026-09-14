# "Things to amend" (client PDF, 14 Sep 2026) — traced to code

Source: `Things to amend.pdf`, 8 annotated screenshots of the deployed site
(`chewmunkai.github.io/dlife-website`). Nothing below is implemented yet. IDs
are T01–T09 and are mine, not the client's — the PDF has no numbering.

Every line was traced to the file that actually renders it. Where a placement
is shared with other pages, that is called out: four of the nine items reach
further than the screenshot the client marked.

| ID | PDF page | Ask | Primary file(s) | Reaches beyond the screenshot? |
|---|---|---|---|---|
| T01 | 1 | Remove "Real support, beyond the policy." under the lockup | `components/site/SiteShell.tsx:75` | Same sentence also heads both footers — **left alone unless told** |
| T02 | 2 | Replace the Contact hero photo | `app/contact/page.tsx:55` | No |
| T03 | 3 | Replace the Planning hero photo | `content/service-photos.ts` (`meal`) | **Yes** — same record is Protecting-your-family's hero |
| T04 | 3 | Replace Planning card 05 | `content/service-photos.ts` (`starting-a-plan`) | No |
| T05 | 4 | Replace the "5 signs" card photos | `content/solutions-e2.ts:117-118`, `content/service-photos.ts` | `hero.jpg` (card 01) is used in 6 other places |
| T06 | 5 | Replace the next-step band photo | `components/v2/blocks.tsx:931` (`CLOSING_PHOTO`) | **Yes** — one photo on all 10 next-step cards site-wide |
| T07 | 6 | Resize + crop Rachel to match Sharon | `app/about/page.tsx:155,265`, `public/media/img/founder-rachel.jpg` | Two placements on `/about` |
| T08 | 8 | Replace Existing-Policy photos; use Sharon Lau's | `app/existing-policy-support/page.tsx:117`, `content/articles.ts:62` | `policy-review.jpg` also sits on Medical + Wealth cards |
| T09 | 7 | New hours and two new phone numbers | `lib/contact.ts` + 8 consumers | **Yes** — contact details fan out to 9 files incl. the legal pages |

---

## T01 — the tagline under the lockup

The circled line is the **loading curtain**, not the hero: `#loader .sub` in
`components/site/SiteShell.tsx:75`, homepage only. Removing it is one line,
plus a check that `#loader .in` stays optically centred once the second line
goes (the curtain currently balances a 76px mark against a 14px sub).

The identical sentence appears twice more and is **out of scope as read**:

- `components/v2/Shell.tsx:171` — the `<h2>` that heads the new footer
- `components/site/SiteFooter.tsx:22` — the `.tag` under the old footer logo

Both are visible in the client's own page-7 screenshot without being marked,
which is the evidence for leaving them. Confirm.

## T02–T05, T08 — the photo swaps

Five separate placements, ten to fourteen individual images depending on how
"all these photos" is read.

**T02 · Contact hero** — `team-table.jpg`. This hero is on its **fourth**
photograph: a stock still of one man, then `team-office.jpg`, then
`team-gathering.jpg` were each turned down (comment at `app/contact/page.tsx:44`).
None of those three is a candidate again.

**T03 · Planning hero** — `services/shared-meal.jpg`, via the `meal` const in
`content/service-photos.ts`. The same const is **also** Protecting-your-family's
hero, so one edit changes two pages. The client marked only Planning but the
Contact hero they also rejected (T02) is the same dim-sum table from the same
shoot, so the intent plainly covers both.

**T04 · Planning card 05** — `services/generated/starting-a-plan.png`, one of
the eight AI-generated fill scenes. Replacing a generated scene with another
generated scene is cheap; replacing it with a real photo needs a source.

**T05 · Protecting-your-family "5 signs"** — the arrow lands on card 01, the
caption says "all these photos". Three are visible in the screenshot:

| Card | Current | Defined in |
|---|---|---|
| 01 | `/media/img/hero.jpg` | `content/solutions-e2.ts:117` |
| 02 | `/media/img/fam-newhome.jpg` | `content/solutions-e2.ts:118` |
| 03 | `generated/family-generations.png` | `content/service-photos.ts` |
| 04 | `generated/family-support.png` | `content/service-photos.ts` |
| 05 | `generated/policy-review.png` | `content/service-photos.ts` |

`hero.jpg` is not local to this card: it is card 01 here, card 02 on Wealth,
and the ground of `CLOSING_PHOTO` (T06). The client has now marked it twice in
one PDF, which reads as a verdict on the image rather than on the slot.

**T08 · Existing Policy Support** — `policy-review.jpg` twice on one page: the
hero (`app/existing-policy-support/page.tsx:117`) and the `template` article
card (`content/articles.ts:62`). Its sibling `policy-review-wide.jpg` — same
woman, same shoot — is Protecting-your-family card 04, and
`generated/policy-review.png` is a different image with a confusingly similar
name.

> **Blocker.** "Sharon Lau's photos from Google Drive": no folder of that name
> is shared with this account. The Drive connector can read the two known
> client folders' *metadata* but still cannot list files inside a shared
> folder (re-tested 14 Sep — `parentId =` returns empty, same as September).
> The browser workaround used in round 22 needs the folder URL. **Need the
> link.**

## T06 — the next-step band photo

`SolutionPage.tsx` does not pass a photo, so the band falls through to
`CLOSING_PHOTO` in `components/v2/blocks.tsx:931` — `hero.jpg` at `50% 42%`.
That default is the ground of **every** `<ClosingCard>`: Solutions hub, all six
solution pages, Existing Policy, About, Careers, DVA, Stories, Resources,
Articles. Ten pages.

The comment above it records this as a client direction ("one photograph on
every next-step card site-wide, at the client's direction"), so changing it is
reversing an earlier instruction, not fixing a defect. Worth confirming rather
than assuming.

Housekeeping found on the way: `content/solutions-e2.ts` still carries a
`closing.photo` per slug that nothing reads — `SolutionPage.tsx` stopped
passing it. Six dead records. Delete them in the same pass.

## T07 — Rachel's portrait

Both exports are already the same pixel size (`founder-sharon.jpg` 1400×1750,
`founder-rachel.jpg` 1400×1749) and both plates are `aspect-ratio: 4/5` in a
`minmax(0,4fr)` column (`styles/ds/pages.css:130-133`). Nothing in the CSS
makes Rachel's plate a different size, so **the first step is to measure, not
to edit** — at 1280 and 375, both `/about` placements:

- the hero pair (`app/about/page.tsx:149-159`), where Rachel is
  `companionPhoto` and both are `fit: "contain"`
- the `<Founder>` plates (`:234` and `:265`), Rachel's with `flip`

If the plates measure equal, the client is describing the **subject scale**,
not the box: Sharon's supplied frame is already waist-up, Rachel's is
full-length standing, so at the same plate size Rachel is a small figure in a
field of backdrop. `object-position: 50% 25%` shifts that framing but cannot
enlarge her. The fix is a real crop of the source.

Which needs the original: the repo holds only the 1400×1749 derivative, and
cropping *that* to half height leaves 1400×875 to fill a 4:5 plate — an upscale.
`RACHEL.jpg` (3719×5578) is in the client's "Website (Sharon & Rachel)" Drive
folder, `16FxFmaFaJfz…`. **Same Drive blocker as T08.**

Per the standing rule, a tighter crop of a single-subject portrait loses
backdrop, not a person — this is inside the rule, not an exception to it.

Still open from A15 and unaffected by this: both portraits carry a legible AIA
wordmark and MDRT roundel, and no other page on the site names an insurer.

## T09 — hours and phone numbers

The client's replacement block:

```
Monday – Friday
Office Hours: 9:00 AM – 5:30 PM
016-236 2286

After Office Hours: 5:30 PM & Weekends
016-661 6083
```

Two arrows: one at the new footer's contact column, one at the Contact page's
"Where to find us" list. Both render from `lib/contact.ts`, which nine files
import:

| File | What it takes |
|---|---|
| `lib/contact.ts` | `WA_NUMBER`, `CONTACT.phone`, `CONTACT.email`, address |
| `components/v2/Shell.tsx:173-186` | new footer: WhatsApp, telephone, email, hours + address line |
| `components/site/SiteFooter.tsx:29-60` | old footer (homepage): same four, own hours string |
| `app/contact/page.tsx:87-113` | the marked list; `:140` JSON-LD `openingHours: "Mo-Fr 09:00-18:00"` |
| `lib/seo.ts` | organisation JSON-LD |
| `content/legal.ts` | `CONTACT.email` **four times** — PDPA access/correction requests, complaints |
| `components/v2/LegalPage.tsx`, `Signup.tsx`, `Lead.tsx` | incidental |

Three things the PDF does not settle, and they change the work:

1. **Do the two mobiles replace the landline, or join it?** The list currently
   shows WhatsApp `+60 18-231 7815`, Telephone `03-9766 1205` and
   `hello@dlife.com.my`. "All information change to below" can be read as
   either.
2. **Which number does WhatsApp use?** Every `data-wa` CTA on the site — the
   float button, both footers, every hero and every next-step pill — builds its
   `wa.me` link from the single `WA_NUMBER`, currently Corrine's own mobile as
   a stand-in. If `016-236 2286` is the agency's WhatsApp, that is the one-line
   change the file was written for. If the new numbers are voice-only, it is
   not.
3. **The email cannot simply be dropped.** `hello@dlife.com.my` is the address
   the privacy page gives for PDPA access and correction requests and the
   complaints page gives as the route past your own advisor. Removing it from
   the contact panel while the legal pages still name it leaves the site
   pointing at an address it no longer publishes. (It is also still flagged
   unconfirmed from 6 Sep.)

A static export cannot switch the displayed number by time of day without
client-side JS that would differ from the crawled HTML; printing both lines as
the client wrote them is the honest form.

---

## Order of work

1. **T09 + T01** — no external dependency, one decision each. Contact details
   first: they are the site's primary conversion path.
2. **T07 measure** — establishes whether this is a crop job or a layout bug
   before any asset is touched.
3. **T02–T06, T08** — blocked on the photo source. Nothing here can start
   until the Drive link and the sourcing decision land.
4. **Re-audit** — `scripts/audit-layout.mjs` at 1280 and 375 on every touched
   route, plus the crop mask pass on every replaced image (ratio alone
   under-reports; see `docs/dlife-asset-map.md`).
5. Update `docs/dlife-asset-map.md` and `public/media/img/services/SOURCES.md`
   with provenance for every new file. Update this document's status column.

Build trap: stop `next dev` and `rm -rf .next` before `npm run build`, or the
running dev server's chunks are corrupted.

---

## Decisions taken, 14 Sep 2026

Recorded here so the reasoning is not re-litigated next round.

| # | Decision | Consequence |
|---|---|---|
| D1 | **T09 contact block** — the two mobiles replace the `03-9766 1205` landline; hours become Mon–Fri 9:00am–5:30pm with the after-hours line labelled as such. Office address and `hello@dlife.com.my` stay. | `content/legal.ts`'s four PDPA/complaints references keep a published address behind them. The email's "unconfirmed" flag from 6 Sep still stands and is still a launch blocker. |
| D2 | **T09 WhatsApp** — `WA_NUMBER` moves to `016-236 2286`. | One line in `lib/contact.ts` retargets every `data-wa` link site-wide: float button, both footers, every hero and next-step pill. Retires Corrine's stand-in mobile, which is what that file was written to allow. `WA_DISPLAY` re-derives itself. The after-hours number is display-only. |
| D3 | **Photo sourcing** — client Drive first, generated scenes only for subjects Drive does not have. | Same split as the September pass. Needs browser access to the folders; the connector still cannot list inside them. |
| D4 | **T06 closing band** — replace `CLOSING_PHOTO` site-wide, keeping one photo across all ten next-step cards. | Reverses the *image*, not the client's one-image-everywhere direction. `hero.jpg` was marked twice in this PDF, which reads as a verdict on the photograph. |
| D5 | **T01 scope** — the loader line only. Both footer headings keep the sentence. | Assumption, not an instruction: the client's own page-7 screenshot shows the footer heading unmarked. Reversible in one line if wrong. |

## Still blocked

1. **Sharon Lau's Drive folder (T08).** No folder of that name is shared with
   this account and the connector cannot search inside shared folders. Need the
   link.
2. **`RACHEL.jpg` original (T07).** "Website (Sharon & Rachel)",
   folder id recorded only as the truncated `16FxFmaFaJfz…`; the full id was
   never written down and the connector cannot find the folder by title.
   Recoverable from Drive's "Shared with me" in the signed-in browser — try
   that before asking.
3. **"Website (Group Photo)"** is `1pj3yQxKUfIT1L29XvXQ9bJr0xvOxsn-B` — full
   id confirmed 14 Sep, browser-readable.


---

## Final state — 14 Sep 2026

The round was implemented in full, deployed, and then **largely reverted at the
client's direction**. Four items ship; five are back on their pre-round state.

### Kept

| ID | What | Where |
|---|---|---|
| T01 | The "Real support, beyond the policy." line removed from every place it rendered as body copy — the loader curtain, the new footer's heading, the homepage mast | `SiteShell.tsx`, `Shell.tsx`, `SiteFooter.tsx`, `styles/dlife.css`, `lib/dlife.ts`, `styles/amendments.css` |
| T07 | Rachel's portrait re-cut so the founder pair reads at one subject scale | `founder-rachel.jpg`, `app/about/page.tsx`, `components/DLife.tsx` |
| T06 | The next-step band's photograph, on all ten `<ClosingCard>` pages | `components/v2/blocks.tsx`, `closing-next-step.jpg` |
| T09 | The new hours and both new numbers; WhatsApp moved onto D'Life's own line | `lib/contact.ts` + 5 consumers |

### Reverted

T02, T03, T04, T05 and T08. Every other photograph is back to what it was
before this round, and eleven of the twelve image files added are deleted —
`closing-next-step.jpg` is the one that stays.
`content/solutions-e2.ts`, `content/service-photos.ts`, `content/articles.ts`,
`components/pages/SolutionPage.tsx` and `app/existing-policy-support/page.tsx`
are byte-identical to the pre-round baseline `1df2b3b`. `components/v2/blocks.tsx`
differs only by `CLOSING_PHOTO`.

Note the consequence: `hero.jpg` is back as the first "5 signs" card while the
next-step band no longer uses it, so the one picture the client marked twice is
half-retired.

Reverted with them, because they only existed to serve that work:

- The deletion of six `closing.photo` records in `content/solutions-e2.ts` that
  no route rendered. **They are back.** Still dead, still worth removing on a
  day when nothing else is in flight — their only reader is
  `components/pages/SolutionPage.tsx`, the orphaned E2 base nothing imports.
- The Sharon Lau portrait on the Existing Policy hero, and the `ratio` that
  pinned its frame.

### Findings worth keeping, independent of the revert

1. **The client's Drive folder cannot supply lifestyle imagery.** "Website
   (Group Photo)" holds 22 files as of 14 Sep — all group or event photography
   of the agency's own people. It held 44 when this repo's asset map was
   written; the client changed it on 31 Aug. Anything needing a family at home,
   a couple moving house or an advisor with a document is not in there.
2. **The closing band's frame cannot be satisfied by one photograph.** Its
   picture is a full-bleed ground whose frame is the card, and the card's
   height is its own stacked copy — measured 3.14 at 1440 and **0.54, portrait,
   at 375**. Whatever picture sits there, people fall out of the phone crop;
   the long-standing `hero.jpg` loses 56.5% of its width at that breakpoint.
   The fix is structural and affects all ten next-step cards.
3. **`object-position` is inert on both founder portraits** and always was —
   both files are 4:5 and every frame holding them is 4:5, so `cover` has
   nothing to pan. Framing there has to be fixed by cutting the file.
4. **Two href bugs fixed under T09 and still in place:** `app/contact/page.tsx`
   hard-coded a `+603` prefix that would have emitted `tel:+6032362286` for an
   `016` mobile, and three files each typeset their own opening-hours string,
   all three still reading "9am to 6pm".

### Still open, needs the client

- The tagline remains the document `<title>` (`app/layout.tsx`,
  `app/page.tsx`, `lib/routes.ts`) and "Support beyond the policy" remains a
  trust-strip fact on the solution pages. Different surface from the body copy
  that was boxed — browser tab, search results, social cards.
- `hello@dlife.com.my` is still unconfirmed, and three legal pages tell people
  to write to it.
- The founders' portraits still carry a legible AIA wordmark and MDRT roundel,
  while nothing else on the site names an insurer.
