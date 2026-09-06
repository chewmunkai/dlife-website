# v3 re-audit — status by ID

Source: `CLAUDE-CODE-AMENDMENTS-V3.md`, against the deployment served on
6 September 2026. Each item was reproduced against current code before it was
touched. **Nothing was deployed** and no real enquiry was sent — v3 puts both
out of scope.

| ID | Status | Changed files | Evidence |
|---|---|---|---|
| V3-01 | **Done** | `components/v2/Lead.tsx`, `styles/amendments.css`, `styles/pages.css` | Reproduced, root-caused and re-tested — see below. |
| V3-02 | **Partly done · rest awaiting input** | `content/legal.ts` | False Privacy statement corrected; the full inventory of 15 unresolved fields is below. Public-release blocker stands. |
| V3-03 | **Awaiting input** | — | About's verification note untouched. Nothing guessed. |
| V3-04 | **Local paths proven · delivery unverified** | `package.json`, `.claude/launch.json` | Five submissions exercised against a local mock. Payloads and results below. |
| V3-05 | **Tracked · one decision recorded, one preview attached** | `components/DLife.tsx` (comments only) | Slogan and hero recorded with provenance; hero fade re-measured — see below. |

## V3-01 — the field that `hidden` did not hide

The audit's reading was exactly right, and the cause is a specificity loss.
`[hidden] { display: none }` comes from the user agent at **one** class of
specificity. `.wrap .lead__f { display: grid }` in `styles/amendments.css` is
**two**. So the attribute was overridden and the browser kept rendering the
field — visible under the default subject, focusable, and in the accessibility
tree. `hidden` was doing nothing at all.

The field is **rendered conditionally** now, so when it is not being asked for
it is not in the document. No stylesheet can override that.

A second guard went in alongside it: `.wrap [hidden]` and `.dlife [hidden]`
are now `display: none !important`, scoped to each shell — so the next use of
`hidden` in either layer works the way whoever writes it expects. It was the
only `hidden` in the codebase; now it is a rule rather than a trap.

**Measured at 375px**, with the tab order read off the live DOM:

| Subject selected | Field in the DOM | Tab order |
|---|---|---|
| `Protection and planning` (default) | **no** | name · email · phone · subject · message · submit |
| `Something else` | **yes**, `display: grid`, 50px | name · email · phone · subject · **subjectOther** · message · submit |
| switched back | **no** | name · email · phone · subject · message · submit |

**Stale value:** selected `Something else`, typed `THIS MUST NOT TRAVEL`,
switched to `A career at D'Life`, submitted against the mock. The payload
arrived with `subject: "A career at D'Life"` and `subjectOther: ""`, and the
string appears in no payload the mock received. Two guards do it — the select
clears the answer on change, and the payload only sends the value when
`Something else` is the subject.

## V3-04 — five submissions against a local mock

Ran a mock endpoint on `localhost:4555` and a dev build pointed at it
(`npm run dev:mock`, added for this, plus a matching `.claude/launch.json`
entry so it is repeatable). No real inbox, no credentials, nothing external.

| # | Surface | Condition | Result on screen | Endpoint saw |
|---|---|---|---|---|
| 1 | Contact | 200 | "Thank you — that reached us." | `form: contact`, subject `Something else`, `subjectOther: "Speaking at an event"`, `source: /contact` |
| 2 | Contact | 200, stale-value test | success | `subject: "A career at D'Life"`, `subjectOther: ""` |
| 3 | Contact | **500** | **error, `role="alert"`, form still present, name and message still filled** | nothing stored |
| 4 | Youth sign-up | 200 | "Thank you — you're on the list." | `form: youth-signup` |
| 5 | Homepage sign-up | 200 | "Thanks — we'll be in touch…" | `form: home-signup` |

The unwired path was verified separately on the ordinary build: with no
endpoint, all three say nothing was stored. **No path reports a send that did
not happen** — including the homepage sign-up, which did exactly that before
round 2.

**Required configuration** (no secrets here, and none belong in this repo):

| Name | Value | Note |
|---|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | a URL accepting a browser JSON POST | Must need **no secret in the client** — this bundle is public. A Google Apps Script web app fits and can append the Sheet row and send the mail in one script. |
| — | destination inbox | Belongs to the endpoint, not to this repo. |
| — | Google Sheet | Same Apps Script. No separate variable. |
| — | acknowledgement email | Endpoint's job; still an open client decision. |

**Delivery remains UNVERIFIED — not broken.** Nothing here has ever had an
endpoint, so there has never been an inbox receipt, a Sheet row or an
acknowledgement to observe. Local mock success is not delivery evidence and is
not reported as such. An authorised end-to-end test against a real endpoint is
the only thing that closes this.

Ownership of the displayed WhatsApp, landline and email is still unconfirmed
(V3-04 last bullet). The WhatsApp number is a personal mobile standing in.

## V3-02 — the Privacy statement, and the full inventory

**Corrected:** Privacy said *"There is no contact form here."* That stopped
being true when the enquiry form and the two sign-ups were built. A privacy
notice that misdescribes its own data flow is worse than an unfilled
placeholder, so it now says what the code actually does — what the forms
collect, and that nothing is transmitted because no endpoint is configured —
with a marked gap for the provider, mailbox, retention and acknowledgement
that has to be completed **before** the forms are connected, not after.

**Sharpened:** the Disclosures marker asked whether D'Life is licensed in its
own right. That question is *answered* — the client confirmed on 6 Sep that
D'Life is an agency under a principal insurer, and instructed in the same
message that the site names no insurer. Those two do not conflict for
marketing copy; they may conflict here, because a disclosures page is where a
regulator expects the principal named. The fact is now recorded in the source
and the public marker asks for **the required wording**, not for the answer.
**That call belongs to a compliance owner.**

**15 unresolved fields still render publicly**, all four pages still carry
"Structural draft, not approved for publication.":

- **/privacy — 6**: company registration number and registered address ·
  form provider, mailbox, spreadsheet/CRM, access, retention, acknowledgement ·
  analytics provider, IP anonymisation, cookie notice · principal insurer
  relationship and other processors · retention periods · the full PDPA notice
  (the Act sets content and bilingual requirements this summary does not meet)
- **/terms — 2**: company registration number · limitation of liability
  wording, which needs a lawyer against Malaysian law
- **/disclosures — 5**: the regulator's required wording for the page ·
  regulator and licence number · whether fee-based services exist and the
  commission disclosure wording · the conflicts of interest statement · the
  cooling-off period and conditions
- **/complaints — 2**: the complaints procedure (acknowledgement timeframe,
  who investigates, response target, escalation) · the correct external
  escalation route

Nothing was invented and no notice was removed. **Public release stays
blocked.**

## V3-05 — the two decisions, and the hero preview

**Slogan.** Recorded, with provenance rather than a claim of completion. The
live text is `Let it begin with you.`; the transcript asks for
`Let it begins with you`, which is ungrammatical. On 6 Sep the client answered
"go with your recommendations", and the recommendation was to keep the current
line — a slogan is the one piece of copy that cannot carry a grammatical
error, so this treats the transcript as a typo rather than as brand voice.
**Revision 2 of the brief has still never been supplied**, so if it specifies
different wording this decision was made without it. The source says not to
change it back without written instruction.

**Hero fade — the audit is right, and moving the crop makes it worse.**

The observation was that the desktop fade overlaps people at the left edge and
the group reaches the right edge. Both are true. Composited the real gradient
(`clamp(60px, 8vw, 148px)` — 115px at 1440, not the wider ramp a first pass
suggested) over the actual crop at three horizontal positions:

- **50% (as shipped)** — the ramp grazes the leftmost seated figure's arm. No
  face is touched. The group reaches the right edge.
- **58%** — the left figure clears the ramp; the right edge cuts further into
  the far-right person.
- **64%** — left fully clear; the right cut is worse again.

The group spans the full width of the source, and the frame is near-square
against a 4:3 original, so **29% of the width is discarded whatever the
position**. Moving right does not remove the problem, it relocates it from a
graze to a cut. Narrowing the ramp instead would weaken the ground the
headline sits on, which is a worse trade than a lightly faded sleeve.

**Left at 50% 42% deliberately, and the three renders go to the client for the
sign-off v3 asks for.** If they want the left edge fully clear, the honest fix
is a wider crop of the same shot or a different frame — not a nudge.

## Checks run

- `npx tsc --noEmit` — clean. `npm run build` — 26 routes, clean.
- `npm run lint` — still not configured in this repo (`next lint` opens an
  interactive setup). Unchanged since round 1.
- Contact form exercised at **375px and 1440px**, keyboard order read from the
  DOM at both.
- Rendered-content sweep of the built HTML for unresolved markers: 15, all
  accounted for above, none removed.

## The one client-input list

1. **Policy content** — 15 fields above. Blocks release. The regulator-wording
   question needs a compliance owner, not a designer.
2. **Business records** — titles, MDRT attribution, and whose figures 29 /
   2,872 / RM921m are, with date and scope.
3. **Contact ownership** — WhatsApp (currently a personal mobile), landline,
   email.
4. **Form endpoint**, then an authorised end-to-end test.
5. **Hero sign-off** — the three renders attached.
6. **Slogan** — confirm the decision above, ideally against revision 2.
7. **Social profile URLs** — links stay removed until they exist.
8. **New testimonial, extra videos, optional FAQs** — nothing fabricated;
   nothing blocked by their absence.
