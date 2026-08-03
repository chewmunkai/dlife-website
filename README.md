# D'Life — Real Support. Beyond the Policy.

Marketing site for **D'Life Financial Advisory**, built from the Claude Design
handoff bundle *Website v3 publication* (`design-source/project/index.html`),
correction build.

Two client documents govern this build, both in
`design-source/project/uploads/`. *DLife Homepage Prototype Correction Report
EdgePoint* is the source of truth — where its wording is fuller than the
`DLife_Amendments_By_Section.md` summary, as it is for the trust section, the
report wins.

The homepage is a single long-scroll editorial page on an ivory ground, with
dark green used as punctuation rather than the canvas. In order: a split hero
(copy beside a contained photograph), a first-person "choose your path" routing
strip, a six-cell trust band, an image-led life-needs grid, existing-policy
guidance, the founder diptych, an inline video carousel, careers, a contained
DVA panel, the youth community and its signup, an FAQ accordion, a closing call
to action and a utility footer.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **GSAP** + **ScrollTrigger** — loader/hero choreography, paced scroll
  reveals, plate parallax, read progress, the video carousel, custom cursor
- **D'Life Design System** — Lora (headings) and Work Sans (everything else);
  the ten approved brand hexes. Tokens are inlined at the top of
  `styles/dlife.css`.

Exports fully static (`output: "export"`), so it can be served from any static
host or CDN with no server runtime.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

> Requires Node 18.17+. `npm run build` writes the static export to `./out`.

## Where things live

```
app/
  layout.tsx        Root layout — metadata, theme colour, pre-paint `.js` flag
  page.tsx          Renders <DLife/>
  icon.svg          Favicon — the leaf from D'Life's own lockup on dark teal
components/
  DLife.tsx         The page markup and all of its copy
lib/
  dlife.ts          Motion engine — owns every piece of dynamic behaviour
styles/
  dlife.css         Design tokens + the full experience layer
design-source/      The original Claude Design handoff bundle (reference)
```

`styles/dlife.css` is scoped under `.dlife` and `lib/dlife.ts` is scoped to the
component's root element, so the page is self-contained — it can be dropped
into a host app without either side's styles bleeding across.

`components/DLife.tsx` holds no state: every dynamic behaviour lives in
`lib/dlife.ts` and is driven imperatively against the markup, the way the
prototype's `site.js` drives its own. Because nothing re-renders after mount,
that engine's DOM writes are never clobbered — and its teardown is
load-bearing, since React StrictMode mounts it twice in development.

## Before launch

Everything below is carried from the design and flagged with a comment at its
call site.

### Pending client verification

| What | Where | Note |
| --- | --- | --- |
| "27 Years" of experience | `TRUST` in `DLife.tsx` | Sharon personally, or D'Life as an organisation? |
| AIA principal partnership | `TRUST` | Partnership wording and any recognition claimed with it. |
| Million Dollar Agency / MDRT Builder | `TRUST` | "Since 2002" and the MDRT Builder appointment. |
| "4 Senior Managers, 34+ young leaders" | `TRUST` | Unverified figures. |
| Claims figure | `TRUST` | Copy reads "RM __ million", the blank exactly as the correction report prints it. |
| "Est. 1999" | footer `.est` | Rendered with a visible `[pending]` mark. |
| `hello@dlife.com.my` | `CONTACT` | Is this the published address? |
| Licensing block | footer `.fine` | Legal entity, company registration, regulator — shown as a marked placeholder rather than invented. |

None of these appear in the structured data in `app/layout.tsx`; unverified
claims must not go into an entity graph.

### Pending client confirmation

| What | Where | Note |
| --- | --- | --- |
| Legal entity name | footer | Previously "D'Life Revolution"; contract documents say "D'Life Sdn Bhd". Visible copy now says only "D'Life", and `legalName` is deliberately absent from the entity graph. |
| Youth signup consent | `#youth .loop` | Wording, list ownership, storage and unsubscribe method. The form is front-end only and acknowledges inline — nothing is stored. |
| DVA WhatsApp routing | `#dva` | No number assigned, so the CTA routes to `/dva/`. |
| Office address | `CONTACT.city` | Only "Kuala Lumpur, Malaysia" is confirmed. |
| Photography | `public/media/img/` | All provisional, subject to Sharon's approval. |
| Founder portraits | `#founder` | Both slots ship as marked empty plates. |
| Production domain | `lib/site.ts` (`SITE`) | Drives canonical, OG URLs, sitemap and structured data. |

### Confirmed in the correction report

WhatsApp routing is live: **016-236 2286** in office hours (Mon–Fri,
9:00am–5:30pm) and **016-661 6083** evenings and weekends. Every CTA builds its
own `wa.me` link from `wa()` in `DLife.tsx` with a distinct pre-filled message,
so the team sees intent and source before replying.

### Internal links

Every `href` resolves to a real path from the correction report's link map —
there are no `#` placeholders left. The pages themselves (`/solutions/…`,
`/careers/`, `/dva/`, `/stories/`, `/contact/`, `/privacy-policy/` and the rest)
are not built yet, so those links 404 until they are.

## Implementation notes

The design medium was an HTML/CSS/JS prototype, recreated here in React rather
than copied verbatim. Deliberate departures:

- **The stylesheet is flattened.** The handoff ships `site.css` as a base sheet
  plus two append-only correction passes, where a rule 700 lines further down
  quietly wins. `styles/dlife.css` resolves that: every rule in it is one that
  actually renders, and the dead ones — the full-bleed hero, the photographic
  closing scrim, the DVA background plate — are gone rather than overridden.
  Verified by diffing computed styles against the prototype across 333
  properties at 1280px and 375px; the only difference left is `text-align:
  left` versus the initial `start` on the DVA panel, which are the same thing
  in a left-to-right document.
- **`<image-slot>` → `<img>`.** The prototype's image slots are a design-tool
  affordance (drag-to-fill placeholders backed by a persistence sidecar). In
  production they are plain images against D'Life's own media.
- **Default link underline dropped.** The design system's base layer puts a
  copper `border-bottom` on every `<a>`, which the prototype's own stylesheet
  never resets. Reproducing it literally would double the rule beneath every
  `.tlink`. Inline links inside running text get their underline back
  explicitly, since colour alone is not a link affordance.
- **Cards use a stretched link, not a wrapping `<a>`.** The comp makes each
  life-needs and youth card a single anchor, which would swallow the card's
  heading and copy into one very long accessible name. The card is a `div` and
  its CTA stretches over it, so the whole card is still one target.
- **The site ships `noindex, nofollow`.** Correction report G10 keeps it out of
  search indexes while it is staging, on the real domain as well as the
  preview. `PRELAUNCH` in [lib/site.ts](lib/site.ts) is the single switch —
  flip it to `false` at launch and both the meta tag and the sitemap line in
  `robots.txt` re-open. `robots.txt` deliberately still allows crawling while
  staging, because `noindex` only works if a crawler can fetch the page and
  read the tag; a blanket disallow would hide it.

## Accessibility and mobile

Contrast was computed rather than eyeballed — every text/ground pairing was
alpha-composited against its section's real background and checked against WCAG
AA. Four things came out of that and are now fixed in `styles/dlife.css`:

- **The focus ring reads `--s-accent`, not a literal.** As hard-coded
  copper-dark it cleared 3:1 only on ivory and cream, and fell to 2.98:1 on
  sand, 2.35:1 on the charcoal footer and 1.85:1 on deep green — all of which
  carry focusable controls. Following the token clears 3:1 on every ground.
- **`--s-quiet` was too light.** At `.55` it sat at 3.11:1 on ivory, which
  fails for the 10–13px supporting text that uses it (the path and needs cues,
  the careers attribution, the youth consent line). It is now `.72` on light
  grounds, `.82` on sand and `.64` on dark.
- **`#youth .sup` bypassed the token system**, hard-coding copper-dark onto the
  sand ground at 2.98:1. The `.sand` mode already remaps the accent to teal for
  exactly this reason.
- **Touch targets.** The carousel dots were 9×9. They are still 9px visually
  but now carry a 25px target with an 18px gap so adjacent targets can't
  overlap. The header lockup, the burger, `.tlink` and `.pill` all reach 44px —
  the lockup and `.tlink` via transparent overlays, so the bar depth and the
  underline position are unchanged.

On phones the section rhythm is compressed by roughly a quarter (correction
report G8 and the responsive pass), keeping the relative order intact so
sections still have different heights, and the footer directory drops to two
fixed columns instead of stacking into one. Together that takes about 1,000px
off the page at 375px without removing content.

### Two AA conflicts that are the client's call

Both are in the approved design rather than the implementation, so they are
flagged rather than unilaterally changed:

| Pairing | Ratio | Where |
| --- | --- | --- |
| White on copper | 4.12:1 | Every primary `.pill` and the WhatsApp float. The report specifies "copper fill, white text". Normal-size text needs 4.5:1. The dark-copper hover state passes at 5.34:1. |
| Copper-dark on cream | 4.38:1 | The 10px labels in the cream careers section. Fixing it needs either an eleventh hex or a hue change to teal. |

### Unreferenced media

`close-conversation.jpg`, `community-gathering.jpg` and the four `path-*.jpg`
files in `public/media/img/` are no longer referenced — the correction build
deleted the manifesto and closing photographs and stripped the imagery from the
path selector. They are left in place rather than deleted, since they are the
client's own photography; remove them if you want a leaner export.
