# D'Life — Real Support. Beyond the Policy.

Marketing site for **D'Life Financial Advisory**, built from the Claude Design
handoff bundle *Website v3 publication* (`design-source/project/index.html`).

The homepage is a single long-scroll editorial page on a deep teal ink canvas:
a full-bleed hero, a scrubbed manifesto, a hover-driven "find your path"
pathway, a pinned horizontal needs rail, alternating light sections
(policy support, youth community), founder and careers panels, an FAQ
accordion and a closing call to action.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **GSAP** + **ScrollTrigger** — loader/hero choreography, scroll reveals,
  manifesto scrub, plate parallax, the pinned needs rail, custom cursor
- **D'Life Design System** — Newsreader (display serif), Bricolage Grotesque
  (headings, labels, buttons), Work Sans (body); teal-ink + copper palette.
  Tokens are inlined at the top of `styles/dlife.css`.

Exports fully static (`output: "export"`), so it can be served from any static
host or CDN with no server runtime.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

> Requires Node 18.17+.

## Where things live

```
app/
  layout.tsx        Root layout — metadata, theme colour, pre-paint `.js` flag
  page.tsx          Renders <DLife/>
components/
  DLife.tsx         The page markup
lib/
  dlife.ts          Motion engine — owns every piece of dynamic behaviour
styles/
  dlife.css         Design tokens + the full experience layer
design-source/      The original Claude Design handoff bundle (reference)
```

`styles/dlife.css` is scoped under `.dlife` and `lib/dlife.ts` is scoped to the
component's root element, so the page is self-contained — it can be dropped
into a host app without either side's styles bleeding across.

## Before launch

These are carried over from the design comp and need real values. Each one is
also flagged with a `TODO(launch)` comment at its call site.

| What | Where | Note |
| --- | --- | --- |
| WhatsApp number | `lib/dlife.ts` (`WA_NUMBER`) | Currently the comp's `60123456789` placeholder. Every "Speak with an Advisor" CTA builds its `wa.me` deep link from it. |
| Photography | `components/DLife.tsx` (`PHOTOS`) | Unsplash placeholders from the comp. Replacing them with real D'Life shoots also removes the attribution chips, which are only required while the Unsplash images are in place. |
| Founder portrait | `components/DLife.tsx` (`#founder`) | Intentionally an empty slot in the comp — renders a labelled placeholder. |
| Newsletter endpoint | `lib/dlife.ts` (`#loopform`) | Front-end only; the success toast is optimistic and nothing is stored. |
| Production domain | `app/layout.tsx` (`SITE`) | Drives canonical + OG URLs. |
| Legal + social links | `components/DLife.tsx` (footer) | Privacy Policy and Terms point at `#`. |

Two claims in the copy were marked *pending client verification* in the design
and are commented as such in the markup: **"27 years"** of guidance (trust bar)
and **"almost three decades"** (founder). The careers pull-quote is attributed
generically to "D'Life Advisor" pending consent.

## Implementation notes

The design medium was an HTML/CSS/JS prototype, recreated here in React rather
than copied verbatim. Two deliberate departures:

- **`<image-slot>` → `<img>`.** The prototype's image slots are a design-tool
  affordance (drag-to-fill placeholders backed by a persistence sidecar). In
  production they are plain images plus the Unsplash credit chip the design
  system requires on any Unsplash-sourced photo.
- **Default link underline dropped.** The design system's base layer puts a
  copper `border-bottom` on every `<a>`, which the prototype's own stylesheet
  never resets. Reproducing it literally would double the rule beneath every
  `.tlink` and defeat `#path a.opt:last-of-type`, which is written so only the
  final pathway option carries a bottom border.
- **Youth cards use a stretched link, not a wrapping `<a>`.** The comp makes
  each card a single anchor, but these cards carry an Unsplash credit chip
  whose links would then sit inside that anchor — invalid HTML, and the
  browser's fix-up breaks React hydration. The prototype avoids this only
  because `<image-slot>` hides its credit in shadow DOM. The card is a `div`
  and the CTA link stretches over it, so the whole card is still one target
  while the credit stays above the overlay and separately clickable.
