# Live client review — status by L-ID

Source: `CLAUDE-CODE-AMENDMENTS-ROUND-2.md`, from the live review of
6 September 2026. Every item was reproduced against the current code before it
was touched; two turned out to be worse than the review described and one was
a different defect underneath.

⚠️ **Two referenced files were not supplied**: `DLife-live-client-review.md`
(the audit evidence) and revision 2 of `CLAUDE-CODE-DLIFE-BRIEF.md`. Only
revision 1 is in the handoff. That matters in exactly one place — L11, where
the wording to use comes from revision 2 — and is noted there.

**Nothing was deployed.** The round-2 instructions put deployment and real
enquiry submissions out of scope, so this is local only.

| ID | Status | Changed files | Verification |
|---|---|---|---|
| L01 | **Awaiting input** | — | Four policy pages still carry `[TO BE CONFIRMED: …]`. Nothing removed, nothing invented. Privacy's "no contact form" line is now wrong and is listed below. |
| L02 | **Done** | `lib/contact.ts`, `components/v2/Shell.tsx`, `components/site/SiteFooter.tsx`, `app/contact/page.tsx` | `WhatsApp 03-9766 1205` absent from the built output; `+60 18-231 7815` present on every page. Landline kept under its own Telephone label in both footers. |
| L03 | **Awaiting input** | — | About's verification note stands. The 29 / 2,872 / RM921m figures come from the client's performance summary; person-vs-agency scope and date are unconfirmed. See `docs/dlife-figures.md`. |
| L04 | **Done (wiring) · delivery unverified** | `lib/forms.ts` (new), `components/v2/Lead.tsx`, `components/v2/Signup.tsx`, `lib/dlife.ts` | See the section below — this found a real defect. |
| L05 | **Done** | `components/v2/Growth.tsx`, `content/growth.ts`, `components/DLife.tsx`, `styles/growth.css` | Measured: collapsed rows carry no summary; opening gives summary + detail + `More on mentorship →` to `/careers#mentorship`. Anchors are `mentorship`, `professionalism`, `leadership`, `culture`. `/careers#leadership` opens that row (`aria-expanded="true"`) and scrolls to it (top 108px). |
| L06 | **Done** | `components/v2/blocks.tsx`, `app/existing-policy-support/page.tsx`, `styles/amendments.css` | Measured at 1280: 5 cards, 273px each, **4 in view**, 293px of scroll, previous disabled at the start, track focusable and labelled "review cards — scrollable". The 3+2 centred arrangement is untouched on Medical's five terms and the five-question sections. |
| L07 | **Done** | `components/v2/StoryReel.tsx` (new), `app/stories/page.tsx`, `styles/amendments.css` | Screenshot in a real browser: centre film playing, neighbours held as posters, previous / pause / dots / next, and **"MUTED. TAP FOR SOUND" in the film's top-left corner**, separate from play/pause. Controls 48px and 44px. Renders whatever `content/videos.ts` holds; past six films the dots become an `03 / 12` readout. One `<video>` mounted at a time. |
| L08 | **Done** | `app/resources/page.tsx` | "Advisors, in their own words" renders in the main column with 3 tiles into `/stories` and a "Watch all the stories" action. |
| L09 | **Done** | `components/DLife.tsx`, `public/media/img/hero-team.jpg` | Switched to the client's own team photograph after a five-way comparison rendered at the real hero crop. Measured: 712×751 desktop and 375×463 mobile at `50% 42%`, every face whole, no upscaling (0.4× and 0.21×). `PHOTOS.hero` keeps the stock family so reverting is one word. Also fixed: the live alt text read "An Asian family…", which infers ethnicity. |
| L10 | **Done** | `app/dva/page.tsx` | Built output reads `<span>Built for leaders</span><span>by invitation.</span>`. The line break is real, so the comma was decorative. It is the only decorative heading comma on the site; grammatical commas in prose are untouched. |
| L12 | **Done (links removed)** | `lib/contact.ts`, `components/v2/Shell.tsx`, `components/site/SiteFooter.tsx` | No Instagram / Facebook / YouTube string appears anywhere in the built output. Nothing in the repository or the supplied materials gives the URLs. `SOCIALS` in `lib/contact.ts` brings both footers back at once. **Missing: the three profile URLs.** |
| L13 | **Done** | `styles/ds/overrides.css` §8, `styles/pages.css` | Reproduced and worse than described: `.big` sized to its widest label's max-content, so at 320px it was **352px wide inside a 320px window — 56px of clipping**, 1px at 375px, fine at 390px. Both overlays fixed. Measured after: 320 → 272px wide, 375 → 327, 390 → 342, everything 24px inside the right edge. |
| L14 | **Done** | `components/v2/Lead.tsx` | "Other" is gone from the built output; "Something else" is back. The specification field appears for it and is **optional** — no `required`, no validation, no error path. The general message field is unchanged and still optional. |
| L15 | **Done (review) · selections recorded** | `app/stories/page.tsx`, `docs/dlife-asset-map.md` | Crops re-checked at desktop and mobile; no cut-off faces. DVA's monthly / quarterly / annual grouping untouched. The stale teaser "including how slow the first year is" contradicted the revised Careers copy and now reads "what the first year actually asks of you" — editorial prose, not a quotation. |

## L04 — what the audit actually found

Tracing all three surfaces turned up one real defect, and it was not the one
the review was looking for.

**The homepage sign-up was reporting a success it never had.** Submitting it
replaced the form with *"Thanks — we'll be in touch with the next Youth
Community update."* while storing nothing and sending nothing. The Contact
form and the Youth sign-up both said plainly that nothing was sent; the
homepage one — the busiest page on the site — did not. That is the one thing
the round-2 instructions say a form must never do, and it was live.

All three now share `lib/forms.ts` and ask the same question: is an endpoint
configured?

- **No** (today) — each says nothing was stored, and hands over the routes
  that reach a person.
- **Yes** — the answers POST as JSON, and a non-2xx or a network failure shows
  an error with the answers still in the form. No path reports a send that did
  not happen.

**What is needed to connect them** — one variable, and three client decisions:

| What | Where | Note |
|---|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | build environment | A URL taking a browser JSON POST with **no secret in the client** — this bundle is public. A Google Apps Script web app fits, and can append the Sheet row and send the mail in the same script. |
| Destination inbox | behind that endpoint | Not stored in this repository. |
| Google Sheet | same Apps Script | No separate variable. |
| Acknowledgement email | same endpoint | Still an open client decision; nothing here sends one. |
| PDPA consent wording | `content/legal.ts` | Privacy still marks it `[TO BE CONFIRMED]`. |

**Delivery is unverified, and not because a test failed.** No endpoint has
ever existed in this repository, so there has never been an inbox receipt, a
Sheet row or an acknowledgement to observe. That stays true until someone with
access runs an authorised end-to-end test.

Each submission carries a `form` field — `contact`, `youth-signup`,
`home-signup` — plus the page path, so whoever reads the inbox does not have
to guess which surface produced it.

## Checks run

- `npx tsc --noEmit` — clean.
- `npm run build` — 26 routes, 21 pages, clean.
- `npm run lint` — **still not configured**; `next lint` opens an interactive
  ESLint setup rather than running. Unchanged from round 1.
- Layout measured at 320 / 375 / 390 / 900 / 1280 px on every changed page:
  no page overflow, nothing past the viewport edge outside a deliberate
  scroll container, no broken image.
- Rendered-text sweep of the built HTML: no `lorem`, no `Other` option, no
  `WhatsApp 03-9766 1205`, no `Built for leaders,`, no "how slow the first
  year", no fake sign-up success, no social placeholder links.

### What could not be verified, again

The homepage's GSAP loader curtain does not complete in a background tab —
`requestAnimationFrame` is throttled — so **no screenshot of the homepage is
possible from here**, including the L05 accordion. Its DOM state was measured
instead and is recorded above. The Stories reel screenshotted fine, because
that page has no loader.

**Please look at the homepage yourself** with `npm run dev` and a foreground
window: the four Careers rows opening, and the reel.

## Still needed from the client

1. **Policy page content** (L01) — and note that Privacy currently says there
   is no contact form on the site. There is, and it now has a defined data
   flow, so that sentence has to change whoever writes the final text.
2. **Business facts** (L03) — scope and date for the figures, then the
   verification note comes off.
3. **Contact ownership** (L02 follow-up) — WhatsApp, landline, email, office.
4. **Form endpoint and an authorised delivery test** (L04 follow-up).
5. ~~Hero, crops and slogan approval~~ — **decided 6 Sep**: hero is the team photograph, slogan keeps "Let it begin with you." Revision 2 of the brief is still missing if it ever said otherwise.
6. **Three social profile URLs** (L12).
7. **New testimonial, extra videos, optional FAQs** — none fabricated; none of
   them blocked the Stories reel or the Resources preview.
8. **"Clarity"** — still undefined; nothing installed.

Public release remains **blocked** while L01 and L03 are open.
