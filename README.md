# D'Life — Real Support. Beyond the Policy.

Marketing site for **D'Life Revolution**, a Malaysian financial advisory and
insurance agency. Built to the client's *Brand, Website Direction &
Implementation Guide (Rev 4)* and its companion *Visual System & Prototype
Reference*.

Twenty-one static routes: a long-scroll homepage, a Solutions hub with six
child pages, existing-policy support, about, careers, DVA, Youth Community,
stories, resources, contact, and four legal drafts.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**, exported fully
  static (`output: "export"`) — no server runtime, serve from any CDN
- **GSAP** + **ScrollTrigger** — loader and hero choreography, scroll reveals,
  plate parallax, the FAQ accordion, the custom cursor
- **Lora** (headings, 600 / editorial 500) + **Work Sans** (body, UI), on the
  teal–copper–sand–ivory palette from the client's approved visual system

### Built for the WordPress rebuild

This build is a staging post: the site moves to WordPress + Elementor next. That
constraint shaped the architecture rather than being retrofitted to it.

- Every section is a **self-contained block** with a `.dl-*` root class and no
  dependence on its siblings, so it can be lifted into an Elementor template on
  its own
- Behaviour binds to **`data-*` attributes**, never element ids, so the same JS
  drives an Elementor widget from its Advanced → Attributes tab
- Colour is a **section mode** (`dark` / `sand` / default) that sets a family of
  `--s-*` variables; blocks never read a palette colour directly, so one card
  component works on all three grounds
- Content lives in `content/` and `lib/routes.ts`, already shaped for a CMS

**→ [`docs/elementor-handoff.md`](docs/elementor-handoff.md)** is the full
mapping: tokens to Global Colors and Fonts, blocks to templates, data attributes
to the Attributes field, content files to custom post types, plus the SEO parity
checklist and the launch open-items table.

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
  layout.tsx           Root layout — metadata defaults, organisation JSON-LD
  page.tsx             Homepage
  solutions/[slug]/    Six solution pages from one template
  <route>/page.tsx     One file per remaining route
  sitemap.ts           Generated from lib/routes.ts
components/
  site/                Chrome used by every page — shell, header, menu, footer
  blocks/              The reusable block library
  pages/               Multi-instance page templates (solutions, legal)
  DLife.tsx            The homepage's own sections
content/
  solutions.ts         Copy for the six solution pages
  legal.ts             The four legal drafts
  videos.ts            Video records — shared by homepage, stories, careers
  home.ts              Homepage FAQ
lib/
  routes.ts            The route map — one source of truth
  seo.ts               Metadata + structured data builders
  contact.ts           WhatsApp routing table, one prefill per intent
  dlife.ts             Motion engine
styles/
  dlife.css            Tokens, section modes, base layer, homepage
  blocks.css           The block library
design-source/         The original Claude Design handoff bundle (reference)
```

`SiteShell` wraps every route: it owns the header, overlay menu, footer, read
progress, the floating WhatsApp point and the motion engine. A page supplies its
own sections and nothing else.

### The route map

`lib/routes.ts` is the single source of truth. The primary nav, the overlay menu,
the footer directory, breadcrumbs, the sitemap and every "related content" card
read from it — so renaming a route cannot leave a dead link somewhere else on the
site, and adding one gives it a canonical URL, an OG record, a breadcrumb trail
and a sitemap entry with no second edit.

## Editorial guardrails

Three pages carry hard constraints from the client's guide, stated as comment
blocks at the top of the file so a later edit cannot undo them by accident.

**`/existing-policy-support`** is a service-led trust offering, not client
acquisition built on dissatisfaction with another advisor. No insurer or agency
names, no "lost touch with your agent", no advisor-abandonment language, no
competitor comparison, no switching or poaching implication.

**`/careers`** must not read as mass recruitment. No income claims, no lifestyle
or easy-money promises, no MLM language, no generic motivational copy.

**`/about`** uses Sharon as a trust anchor without becoming a personal
biography. Her documents describe D'Life as a "transformation platform" — that
is internal language the brand's own guide rules out for public copy, so the
page stays anchored to financial advisory and lets the rest show through what
people actually did.

**DVA and Youth Community are a contrast pair.** DVA is short, dark, contained
and closed; Youth is long, warm, open and content-rich. Placed together they
explain each other without a paragraph of copy. An edit that makes DVA bigger or
Youth quieter breaks both.

## Before launch

Thirteen open items — the WhatsApp number, the office address, social URLs,
founder portraits, the awards on `/about`, the "27 years" attribution, D'Life's
licensing status, the legal copy, and real photography among them. Each is marked
`TODO(launch)` or ⚠️ at its call site.

**The full table, with what each one blocks, is in
[`docs/elementor-handoff.md` §9](docs/elementor-handoff.md).**

Two things worth repeating here:

- **Nothing unverified is in structured data.** Every figure, award and
  credential on this site is pending client verification, and an unverified
  claim in JSON-LD is a claim made to search engines in D'Life's name. The graph
  carries relationships and identity only.
- **The four legal pages are drafts and say so on the page**, not only in a
  comment. Values only D'Life or its adviser can supply render as visible
  `[TO BE CONFIRMED]` markers, and the pages are `noindex` until reviewed.

## Implementation notes

The design medium was an HTML/CSS/JS prototype, recreated in React rather than
copied verbatim. Deliberate departures:

- **`<image-slot>` → `<img>`.** The prototype's image slots are a design-tool
  affordance (drag-to-fill placeholders backed by a persistence sidecar).
- **Default link underline dropped.** The design system's base layer puts a
  copper `border-bottom` on every `<a>`, which the prototype never resets.
  Reproducing it literally would double the rule beneath every `.tlink`.
- **Cards use a stretched link, not a wrapping `<a>`.** A card that is one big
  anchor cannot contain another link — invalid HTML, and the browser's fix-up
  breaks hydration. The card is a `div` and its CTA stretches over it, so the
  whole card is one target while nested links stay clickable.
- **No web form anywhere.** No endpoint exists, no consent wording is approved
  and no data-handling decision has been made. A form that silently discarded an
  enquiry would be worse than none, so contact routes go to WhatsApp and email,
  which reach a person. The Stay in the Loop signup acknowledges inline and is
  explicitly front-end only.
