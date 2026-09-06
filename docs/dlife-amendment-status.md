# Client amendments — implementation status

Source: `CLAUDE-CODE-DLIFE-BRIEF.md` (6 Sep 2026), built from the client's
WhatsApp copy register (31 Aug 2026) and the meeting notes. Amendment IDs are
the brief's; copy IDs (C01–C10) are its client copy register.

Baseline: `b49fcad` (17 Aug 2026), which was also `origin/main` — GitHub had
nothing newer, no open PRs and no open issues. **None of A01–A17 had been
implemented before this pass.**

Status vocabulary: **To do · In progress · Implemented · Verified · Waiting for
input · Already satisfied**. "Verified" means a check was run and its result
recorded below, not that it was eyeballed.

| ID | Amendment | Status | Where |
|---|---|---|---|
| A01 | Header rebalance; no clipping at intermediate widths | Verified | `styles/amendments.css` §28, `styles/pages.css`, `styles/ds/overrides.css` |
| A02 | Carousel for uneven card sets; balanced final rows | Verified | `components/v2/Carousel.tsx`, `blocks.tsx`, `amendments.css` §27 |
| A03 | Redundant CTA out of the hero trust strip | Verified | `SolutionPage.tsx` + 3 pages |
| A04 | Quote-style section dividers | **Not applicable — see below** | — |
| A05 | Homepage claims paragraph → C01 | Implemented · **client input needed** | `components/DLife.tsx` |
| A06 | Family hero → C02; trust strip → C03 | Implemented | `content/solutions.ts`, `content/solutions-e2.ts`, `app/solutions/page.tsx` |
| A07 | Medical term 02 "Your share" → C04 | Implemented | `content/solutions.ts` |
| A08 | About: six-card "The Team" directory removed | Verified | `app/about/page.tsx` |
| A09 | Four benefits expand inline, homepage + Careers | Verified | `components/v2/Growth.tsx`, `content/growth.ts`, `styles/growth.css` |
| A10 | Careers qualities → C05; FAQ 03/04 → C07/C08 | Implemented · **client input needed** | `app/careers/page.tsx`, `components/v2/Ask.tsx` |
| A11 | One story grouping; story rail; video controls | Verified | `Carousel.tsx`, `Film.tsx`, `DLife.tsx`, `content/videos.ts` |
| A12 | "Reading and what's coming up"; template unrouted | Verified | `app/resources/page.tsx`, `content/articles.ts`, `components/pages/ArticlePage.tsx` |
| A13 | Youth "Who should join"; FAQs → C09/C10; WhatsApp intents | Implemented | `app/youth-community/page.tsx`, `lib/contact.ts` |
| A14 | DVA grouping preserved; responsive; image framing | Verified | `app/dva/page.tsx` (grouping unchanged) |
| A15 | Founder portraits; group photography; asset map | Implemented · **client input needed** | `docs/dlife-asset-map.md` |
| A16 | Contact "Other" + conditional "Please specify" | Implemented · **client input needed** | `components/v2/Lead.tsx` |
| A17 | Base path, deep links, one contact record | Verified | `components/DLife.tsx`, `lib/{seo,dlife}.ts`, `content/legal.ts` |

## A04 — why nothing changed, and it is not an oversight

The brief asks for quote-style dividers "where the discussed plain separators
are identifiable". They are not, and the reason matters.

Commit `a53bee1` (17 Aug, "Round 5: quotes removed off the solution pages")
**deliberately removed** quote bands from Existing Policy Support, DVA and
Careers at a client request three weeks before this brief, keeping pull-quotes
only on the solution pages "where the quotation is the Prove beat". Those
solution-page quotes are still there, still rendered by the existing `Said`
component, still driven by approved copy in `content/solutions.ts`.

So: the quote-style dividers the brief asks for already exist where the client
last agreed they should, and the only plain rules left in the markup are the
hairlines inside the DVA crest and inside `Said` itself — functional borders
the brief says to preserve. Adding quote bands back to the three pages Round 5
cleared would reverse a decision the client made, and the brief forbids
inventing attributed quotes to fill them.

**Left unchanged and reported, per the brief's own instruction.** If the client
meant a specific separator, ask them to point at it on the live page.

## Checks run, and what they showed

- `npx tsc --noEmit` — clean.
- `npm run build` — 21 pages, clean.
- `PAGES_BASE_PATH=/dlife-website npm run build` — **every** internal `href`
  and `src` in the built HTML carries the prefix; zero stragglers. The
  homepage's five path cards were the ones that did not, and now do.
- `npm run lint` — **not configured in this repo.** `next lint` opens an
  interactive ESLint setup rather than running. Not set up here: adding a lint
  config is a separate decision, and `tsc` plus the build are the checks that
  exist.
- Layout measured at 1440 / 1280 / 1200 / 1181 / 1024 / 768 / 620 / 375 on the
  homepage and every changed page: no page overflow, no element past the
  viewport edge outside a deliberate scroll container, no broken image, no
  image upscaled past 1.4×.
- Header, measured after the fix: 1181 −40px, 1200 −37, 1280 −40, 1301 −40,
  1440 −44, 1024 −34, 768 −30, 375 −34. Before it: **+20px on an inner page and
  +178px on the homepage at 1280**, hidden by `overflow-x: clip`.
- Contact form: both validation paths exercised. Empty "Please specify" →
  `aria-invalid="true"`, `aria-describedby` resolving to the visible message.
  Whitespace-only → same, plus focus moved to the field. Valid → the honest
  "nothing has been sent" state, because no endpoint is configured.
- Rendered-text sweep of the built HTML for `lorem`, `RM __`, `to follow`,
  `Name to follow`, `Portrait to follow`, `Template`, `placeholder`: **no
  hits** outside the deliberate `[TO BE CONFIRMED: …]` markers on the four
  legal drafts and the Contact page's marked street address.

### What could not be verified here

Animation and video playback. Both available browsers throttle
`requestAnimationFrame` in a background tab, so GSAP's ticker never advanced:
the homepage loader curtain sat on screen and no `<video>` would start. This is
the harness, not the site — `lib/dlife.ts`'s loader timeline is untouched by
this pass (the only change to that file is an import), and every non-animated
part of the same components measured correctly.

**Still to check by eye, with `npm run dev` and a foreground window:** the
homepage reel playing and unmuting, the sound control in the film's top-left
corner, and the carousel arrows gliding rather than jumping.

## Launch blockers — client input required

1. **"Exceeding" RM22 million.** The supporting screenshot shows agency claims
   *of* RM22M, not an amount above it. Confirm the wording. (A05)
2. **Three different figures for the same thing.** Homepage: 4 senior managers
   and 34+ leaders. About: 3 agency managers and 40+. Careers: "more than 40
   young managers". One of them is right; nothing here guesses which. (Phase 4)
3. **AIA branding on the founders' portraits.** Both are studio shots in AIA
   MDRT blazers with the wordmark legible. Nothing else on this site names an
   insurer. Compliance question, not a design one. (A15)
4. **Career programme terms.** The 18 months, the basic bonus allowance and any
   eligibility conditions are published as the client wrote them and are
   otherwise unverified. (A10)
5. **Contact details.** `+60 12-345 6789`, `hello@dlife.com.my` and the missing
   street address are all still the prototype's. They now live in exactly one
   file, `lib/contact.ts`. (A16/A17)
6. **Form endpoint and PDPA consent wording.** The form is built and validated
   and posts to `NEXT_PUBLIC_FORM_ENDPOINT` when one is set. Until then it says
   nothing was sent. No provider was chosen or paid for. (A16)
7. **The four legal drafts** still carry `[TO BE CONFIRMED: …]` markers and must
   not go live as written. The central open question — whether D'Life is
   licensed in its own right — changes the wording on all four.
8. **The article library is empty**, so Articles & Events lists no articles.
   Accurate, not broken.
9. **Automated visitor acknowledgements** remain undecided; none was built.
10. **The "Clarity" feedback tool** is unidentified; nothing was installed and
    no tracking was added.

## Deliberately not done

- No deploy, no push, no messages sent, no cloud sharing changed, no paid
  service provisioned. Every commit is local to
  `claude/dlife-project-handoff-a06d5d`.
- The slogan stays "Let it begin with you".
- Corporate Solutions stays withheld.
- No testimonials, articles, event dates, credentials or business facts were
  invented.
