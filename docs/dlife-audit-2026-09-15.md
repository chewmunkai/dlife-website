# Site audit — 15 Sep 2026

A full pass over the codebase and the deployed site, asked for as "fix bugs,
trim unnecessary code, make sure the website is functional and smooth". Every
route was walked in a real browser; every asset and import was traced from the
built output rather than from the source. Two commits: wave 1 (correctness and
trim), wave 2 (performance and SEO). Nothing here was deployed by the audit.

## What was checked, and how

| Check | Method | Result |
|---|---|---|
| Type safety | `tsc --noEmit`, plus `--noUnusedLocals --noUnusedParameters` as a probe | Clean; 3 unused bindings found and removed |
| Lint | `next lint` | **Was never configured** — the build's "Linting" step was a no-op. Configured; 1 real error found |
| Every route | 22 routes at 1280px: one `h1`, no horizontal overflow, no broken image, no missing `alt`, every `data-wa` link hydrated, no dead `#` link | All clean |
| Console | Errors read across the whole walk | One dev-only React hydration warning, on every page; fixed |
| Interactive | Menu, FAQ rows, contact form submit | All work; FAQ lacked `aria-controls`; fixed |
| Links | Every `href` in the built HTML resolved against `out/` | None broken |
| Assets | Every `src`/`url()`/bundle string resolved against `out/` | None missing; 22 files nothing referenced |
| Dead source | Import graph walked from `app/` | 12 files no route reaches |
| Head metadata | description / canonical / og / twitter / lang per page | All present — except **no `og:image` on any page** |
| Structure | Heading order, duplicate ids, empty links | 4 legal pages skipped h1→h3; fixed |
| Weight | Bytes each page asks a browser for | **Medical page: 10 MB of images** |
| Fonts | How Lora and Work Sans arrive | CSS `@import` from Google, twice, render-blocking |

## Fixed — wave 1 (`6ddf3d9`)

- **ESLint configured** (`.eslintrc.js`, `next/core-web-vitals`). One rule off
  with its reason recorded: `no-img-element`, because bare `<img>` is the
  deliberate choice on a static export with no optimizer. First run found a
  missing `key` on every TRUST icon in `components/DLife.tsx` — which would
  have failed the build the moment lint was on.
- **A real 404.** The site shipped Next's default page: browser font, no
  header, no footer, no link. `app/not-found.tsx` uses the shell and offers
  three ways out. GitHub Pages serves it for any unknown URL.
- **Legal pages h1→h3 skip.** `LegalPage` emits h2; an alias in
  `overrides.css` holds the design's h3 size — at `(0,3,1)`, because a first
  attempt at `(0,1,1)` lost to `amendments.css`'s `.wrap :is(.band,…) h2` and
  doubled the headings. Measured identical before/after: 20px, 38px margin.
- **FAQ `aria-controls`** wired with `useId`.
- **`<html suppressHydrationWarning>`** — the `class="js"` script is by design.
- Sitemap `lastmod` bumped; three unused bindings removed.
- **Trimmed:** 12 unreachable source files (the E2 block library, its two
  orphaned page templates, `Film.tsx`, an unwired `content/team.ts`, a script
  generating a bleed nothing used) and 22 unreferenced media files (8 MB).
  Every deletion re-verified by rebuilding and diffing the referenced-asset
  set.

## Fixed — wave 2

- **Generated scenes re-encoded** PNG → JPEG q82: 22 MB → 2.2 MB, same
  pixels. Per page: medical 10.0 → 1.8 MB, family 7.0 → 1.9 MB.
- **Lazy loading.** The `Img` helper is `loading="lazy" decoding="async"` by
  default; the hero plate is `eager` + `fetchpriority="high"`. Built HTML went
  from 19 lazy images to 85. On the medical page, none of the five scene
  images is fetched on initial load.
- **Fonts self-hosted** through `next/font/google`. Both `@import`s removed,
  both design systems' `--dl-disp`/`--dl-sans` re-pointed (via
  `overrides.css` for the re-syncable token file, in place for `dlife.css`).
  Verified: 17 woff2 files in the build, 3 preloads, **zero** requests to
  googleapis/gstatic, headings compute to `__Lora_…` on both designs.
- **Open Graph image** on every page — `public/media/og-default.jpg`,
  1200×630, the homepage hero with all three people whole. Declared in
  `lib/seo.ts` (`OG_IMAGE`) and used by `pageMeta`, the layout defaults and
  the article page.

## Deliberately not changed

- **Old-design CSS** carries 28 `.e2-*` selectors no page uses. Hand-trimming
  a stylesheet is real risk for a few gzipped kilobytes.
- **`hero.jpg` at 2400×1920 / 569 KB** and a dozen JPEGs over 250 KB. The repo
  convention is 1800px q82; re-encoding is safe but touches client-approved
  photography bytes for a modest gain. Left for a deliberate pass.
- **`fetchPriority`** stays camelCase — React 18 emits it as written and HTML
  attribute names are case-insensitive; the codebase already used it.
- **OG URLs point at `dlife.com.my`** on the Pages preview, as every canonical
  already does. The preview is `noindex`; the real domain resolves them.
- **Carousels' motion** could not be exercised: this machine throttles
  `requestAnimationFrame` in a background tab (documented in memory). Their
  DOM and ARIA state were checked; their scrolling was not.

## Still open (pre-existing, unchanged by the audit)

- `hello@dlife.com.my` unconfirmed; three legal pages name it.
- The tagline is still the document `<title>` and a trust-strip fact.
- The next-step card's frame (0.54 at 375 → 3.14 at 1440) loses people from
  any photograph at phone width — structural, all ten cards.
- The founders' portraits carry legible AIA/MDRT marks.
- The enquiry form has no endpoint (`NEXT_PUBLIC_FORM_ENDPOINT`) and says so.

## Re-running the checks

`npm run build` now lints. `node scripts/audit-layout.mjs` diffs band
structure against the design (6/14 identical is the known baseline — the
eight diffs are client-amendment drift). The link, asset, dead-source and
page-weight checks are one-off Python in this audit's session; the shapes are
simple enough to rewrite from the table above.
