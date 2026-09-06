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
| A02 | Card sets 3-up with a centred remainder; story rail | Verified | `blocks.tsx`, `amendments.css` §27e, `Carousel.tsx` (Stories only) |
| A03 | Redundant CTA out of the hero trust strip | Verified | `SolutionPage.tsx` + 3 pages |
| A04 | Quote-style section divider | Verified | `app/existing-policy-support/page.tsx`, `blocks.tsx` |
| A05 | Homepage claims paragraph → C01 | Verified · client confirmed | `components/DLife.tsx` |
| A06 | Family hero → C02; trust strip → C03 | Implemented | `content/solutions.ts`, `content/solutions-e2.ts`, `app/solutions/page.tsx` |
| A07 | Medical term 02 "Your share" → C04 | Implemented | `content/solutions.ts` |
| A08 | About: six-card "The Team" directory removed | Verified | `app/about/page.tsx` |
| A09 | Four benefits expand inline, homepage + Careers | Verified | `components/v2/Growth.tsx`, `content/growth.ts`, `styles/growth.css` |
| A10 | Careers qualities → C05; FAQ 03/04 → C07/C08 | Verified · client confirmed | `app/careers/page.tsx`, `components/v2/Ask.tsx` |
| A11 | One story grouping; story rail; video controls | Verified | `Carousel.tsx`, `Film.tsx`, `DLife.tsx`, `content/videos.ts` |
| A12 | "Reading and what's coming up"; template unrouted | Verified | `app/resources/page.tsx`, `content/articles.ts`, `components/pages/ArticlePage.tsx` |
| A13 | Youth "Who should join"; FAQs → C09/C10; WhatsApp intents | Implemented | `app/youth-community/page.tsx`, `lib/contact.ts` |
| A14 | DVA grouping preserved; responsive; image framing | Verified | `app/dva/page.tsx` (grouping unchanged) |
| A15 | Founder portraits; group photography; asset map | Verified · client confirmed | `docs/dlife-asset-map.md` |
| A16 | Contact "Other" + conditional "Please specify"; real address | Verified · endpoint pending | `components/v2/Lead.tsx`, `app/contact/page.tsx` |
| A17 | Base path, deep links, one contact record | Verified | `components/DLife.tsx`, `lib/{seo,dlife}.ts`, `content/legal.ts` |

## A04 — the separator, once the client pointed at it

The brief asked for quote-style dividers "where the discussed plain separators
are identifiable", and from the code alone they were not: commit `a53bee1`
(17 Aug) had deliberately stripped quote bands off Existing Policy Support,
DVA and Careers at a client request, so re-adding them would have reversed a
decision three weeks old.

The client named it on 6 Sep: **Existing Policy Support, below "What happens
in a review"**. That was the `.fnote` carrying the page's guardrail — *"Not a
sales meeting with a review attached, and not an assessment of whoever advised
you before."* The single most important sentence on the page, set as small
print between two sections.

It is a quote-style divider now, using the existing `Said` component in a new
cite-less variant. The words are unchanged and unattributed — they are the
page's own statement, not a quotation from anyone, and inventing an
attribution to justify the form is what the brief rules out.

## A02 — revised: 3 across, remainder centred

The first pass made the five-card sets a scroll rail. The client asked for the
other option the brief offered: *"it's 5 designs up there so we should unify it
to 3 in a row, the rest put down there and align to middle."*

Measured at 1280: row one at x=64, 455, 846; row two at 259 and 650, whose
midpoint is 639.5 against a content centre of 640. At 900: 2 + 2 + 1, the lone
card centred. At 375: one column. Medical's five terms and Existing Policy
Support's five both take it; the four-card pages are untouched.

The `Carousel` component stays and is still used by Stories, where a rail is
right for a set of films.

## The trust strip

The client's screenshot showed the three credentials with their copper ticks
at three different heights. They were bottom-aligned, so an item wrapping to
three lines pushed its tick a line above the two that wrapped to two. Now
top-aligned: measured at 1280, all three sit at the same y.

That screenshot also still showed "WE STAY AFTER THE PAPERWORK" and a second
"START A CONVERSATION" button — both already gone on this branch (A06 and
A03). It was taken from the live site, which is three weeks behind.

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

## Still open after the client's answers of 6 Sep

1. **"27 years."** The one figure not resolved. Their performance summary reads
   25 years 4 months, but measures service with the principal insurer, which
   may not be the same span as a career. Left as written, raised, and a
   one-line change once they say which. See `docs/dlife-figures.md`.
2. **The WhatsApp number is a personal mobile** (018-231 7815), standing in
   until D'Life's WhatsApp Business number is issued. Every CTA on the site
   points at it.
3. **`hello@dlife.com.my` is unconfirmed** — and the privacy, disclosures and
   complaints pages all tell people to write to it.
4. **The form has no endpoint**, so it still says nothing was sent. Next job:
   pick a provider and set `NEXT_PUBLIC_FORM_ENDPOINT`.
5. **The four legal drafts** still carry `[TO BE CONFIRMED: …]` markers and go
   live carrying them. They are visible to a visitor. The licensing question
   is answered privately — D'Life is an agency under a principal insurer — but
   the client's instruction is that the site names no insurer, and a
   disclosures page for a regulated agency may be required to name its
   principal. **That tension needs the client's compliance owner, not a
   designer.**
6. **The founders' portraits** carry the principal insurer's marks on the
   lapel while no copy on the site names an insurer. The client has cleared
   them to run; it is worth one more look given instruction 2 of 6 Sep.
7. **No articles**, by decision. Articles & Events runs events only.
8. **The "Clarity" feedback tool** — the client is covering it later. Nothing
   installed, no tracking added.

## Deliberately not done

- No deploy, no push, no messages sent, no cloud sharing changed, no paid
  service provisioned. Every commit is local to
  `claude/dlife-project-handoff-a06d5d`.
- The slogan stays "Let it begin with you".
- Corporate Solutions stays withheld.
- No testimonials, articles, event dates, credentials or business facts were
  invented.
