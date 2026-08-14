# D'Life — WordPress / Elementor handoff

**Purpose.** This site is built as a static Next.js export, but it is built *to be
rebuilt* in WordPress with Elementor. This document is the mapping: where each
design token, block, behaviour and page goes on the other side.

The short version: **every section on this site is a self-contained block with a
`.dl-*` root class, styling that depends on nothing outside itself, and behaviour
bound to a `data-*` attribute rather than an element id.** That combination is
what makes a section transplantable — you can lift one into an Elementor template
without dragging the rest of the site behind it.

---

## 1. Design tokens → Elementor Global Colors and Fonts

Set these once in **Site Settings → Design System**. Every block reads them, so
getting this right first means nothing downstream needs per-widget colour
overrides.

### Global Colors

| Elementor global | Hex | CSS variable | Used for |
|---|---|---|---|
| Primary | `#174A45` | `--dl-teal` | Headings on light grounds |
| Secondary | `#1D4B3E` | `--dl-green` | Deep-green section backgrounds |
| Text | `#2F3532` | `--dl-char` | Body copy, footer ground |
| Accent | `#B36B43` | `--dl-copper` | Decorative accents, rules |
| Custom — Copper Dark | `#9C5A37` | `--dl-copper-d` | **Primary button fill** |
| Custom — Copper Hover | `#85482B` | `--dl-copper-x` | Primary button hover |
| Custom — Dark Teal | `#0F332C` | `--dl-ink` | Deepest panels, overlays |
| Custom — Bronze | `#A88752` | `--dl-bronze` | Decorative rules only |
| Custom — Sand | `#D0BFA9` | `--dl-sand` | Warm section backgrounds |
| Custom — Cream | `#EFE8DA` | `--dl-cream` | Soft neutral surfaces |
| Custom — Ivory | `#F6F1E8` | `--dl-ivory` | Default page background |

> **Accessibility note, carried over from this build.** Copper `#B36B43` does not
> clear AA as button text on white — the primary action uses **Copper Dark**
> (5.34:1) with **Copper Hover** on hover (7.09:1). Bronze is a mid-tone that
> fails on both ivory and deep green, so it is decorative only, never label text.
> On Sand, copper-dark drops to 2.98:1, so labels there use `#744329`. Do not
> "simplify" these to one copper.

### Global Fonts

| Elementor global | Family | Weight | Used for |
|---|---|---|---|
| Primary | Lora | 600 | H1–H3, section titles, editorial statements |
| Secondary | Lora | 500 | Supporting editorial emphasis, pull quotes |
| Text | Work Sans | 400 | Body copy |
| Accent | Work Sans | 500/600 | Navigation, labels, buttons, cards, FAQ, footer |

Target balance is roughly 60% modern / 40% heritage — Work Sans carries more of
the page than Lora does. Load both from Google Fonts with `display=swap`, and
confirm fallbacks (`Georgia, serif` for Lora; `system-ui, sans-serif` for Work
Sans) before launch.

---

## 2. Stylesheet structure

Two files. Enqueue both in the child theme.

| File | Contents | Where it goes in WordPress |
|---|---|---|
| `styles/dlife.css` | Tokens, section modes, base layer, header/footer/menu, homepage sections | Child theme stylesheet |
| `styles/blocks.css` | The reusable block library — every `.dl-*` class | Child theme stylesheet, or split per-section into each template's Custom CSS |

Everything is scoped under a root `.dlife` class. **Add `dlife` to the `<body>`
class** (Elementor: Site Settings → Layout → Body class, or via
`body_class` filter) and the whole system applies.

### The section-mode system — read this before styling anything

Section colour is expressed as a **mode**, not as per-section overrides. A section
carries `dark`, `sand`, or nothing, and that sets a family of `--s-*` variables:

```
.dlife            → light  (ivory ground, teal headings, copper labels)
.dlife .sand      → sand   (sand ground, darkened copper labels for contrast)
.dlife .dark      → dark   (deep green ground, ivory headings, sand labels)
.dlife .dark.charcoal → charcoal (footer only)
```

Blocks only ever read `--s-bg`, `--s-heading`, `--s-body`, `--s-label`,
`--s-accent`, `--s-line`, `--s-plate` and friends. **Never a `--dl-*` colour
directly.** This is why the same card component works on all three grounds with
no variant.

**In Elementor:** add `dark` or `sand` to a Section/Container's *CSS Classes*
field (Advanced tab). Do not set background colours per-widget — you will break
the mode system and every nested element will need fixing by hand.

**Section rhythm rule from the brand guide:** light and dark alternate, and **no
two dark sections may sit adjacent.** The single permitted exception is the
homepage's closing CTA (deep green) into the footer (charcoal).

---

## 3. Blocks → Elementor templates

Each of these is one file in `components/blocks/`, one root class, and one
Elementor template. The eight the client's direction guide names by name are
marked ★.

| Block | Root class | Component | Elementor build |
|---|---|---|---|
| Page hero | `.dl-pagehero` | `PageHero.tsx` | Container + Heading + Text; optional Image below |
| Band (section wrapper) | `.dl-band` | `Prose.tsx` | Container — this is the wrapper for most others |
| Prose | `.dl-prose` | `Prose.tsx` | Text Editor widget |
| Pull quote | `.dl-quote` | `Prose.tsx` | Blockquote widget |
| Check list | `.dl-checks` | `Prose.tsx` | Icon List widget, geometric tick icon |
| Definition rows | `.dl-defs` | `Prose.tsx` | Loop grid or repeater |
| Card grid | `.dl-cards` / `.dl-card` | `Cards.tsx` | Loop Grid over a CPT, or Container + repeater |
| ★ Story card | `.dl-storycard` | `Cards.tsx` | Loop item template |
| ★ Event card | `.dl-event` | `Cards.tsx` | Loop item template over an Events CPT |
| Portrait slot | `.dl-portrait` | `Cards.tsx` | Image widget with a placeholder fallback |
| Stat band | `.dl-stats` | `Cards.tsx` | Container + repeater |
| Steps | `.dl-steps` | `Steps.tsx` | Icon List or repeater |
| Story-led split | `.dl-split` | `Steps.tsx` | Two-column Container |
| Contrast pair | `.dl-contrast` | `Steps.tsx` | Two-column Container + two Icon Lists |
| ★ Video card | `.dl-video` | `Video.tsx` | Video widget, **self-hosted or lightbox-off** |
| ★ Selected videos | `.dl-videos` | `Video.tsx` | Loop Grid of video cards |
| ★ FAQ | `.dl-faq` | `Faq.tsx` | Accordion widget — see §4 |
| ★ Contextual CTA | `.dl-cta` | `CTA.tsx` | Container + Heading + two Buttons |
| ★ Related content | `.dl-related` | `Related.tsx` | Loop Grid, or three linked Containers |
| ★ Stay in the Loop | `.dl-loop` | `Signup.tsx` | Form widget — see §4 |
| Breadcrumbs | `.dl-crumbs` | `Breadcrumbs.tsx` | Breadcrumbs widget (Yoast/Rank Math) |
| Floating WhatsApp | `.dl-wafloat` | `SiteShell.tsx` | Fixed-position Container, or a small plugin |

**Header and footer** (`components/site/SiteHeader.tsx`, `SiteFooter.tsx`) become
Elementor **Theme Builder** Header and Footer templates, applied site-wide.

---

## 4. Behaviour → data attributes

This is the part that usually does not survive a rebuild, so it was built for it.
**No behaviour is bound to an element id.** Everything binds to a `data-*`
attribute, which Elementor can set on any widget via
**Advanced → Attributes**.

| Attribute | Put it on | What it does |
|---|---|---|
| `data-wa="<message>"` | Any link | Rewrites `href` to `https://wa.me/<number>?text=<encoded message>`, sets `target="_blank"` and `rel="noopener"` |
| `data-dl-accordion` | The FAQ container | Enables the accordion on `.item` children |
| `data-dl-signup="<thanks message>"` | A `<form>` | Intercepts submit and replaces the form with the message |

Elementor's Attributes field takes `key|value` pairs, one per line:

```
data-wa|Hi D'Life, I'd like to speak with an advisor.
```

Plus these class-based hooks, applied by adding the class in **Advanced → CSS
Classes**:

| Class | Effect |
|---|---|
| `rv` | Opts the element into the scroll-reveal pass |
| `pill` | Primary button treatment + magnetic hover on fine pointers |
| `pill ghost` | Secondary outline button |
| `tlink` | Text-and-arrow secondary link |
| `ph` | Photo plate — object-fit cover, overflow hidden |
| `ph` + inner `.prlx` | Adds scroll parallax to the image |
| `lb` | Section label / chapter marker |
| `dark` / `sand` | Section mode (see §2) |

### The motion engine

`lib/dlife.ts` is a single self-contained module (GSAP + ScrollTrigger). To port
it: enqueue GSAP and ScrollTrigger, then enqueue a build of this file and call
`initDLife(document.querySelector('.dlife'))` on `DOMContentLoaded`.

It degrades correctly on its own — every selector it looks for is optional, so a
page without a hero, loader or FAQ simply skips those. It also respects
`prefers-reduced-motion` throughout, which is a requirement in the brand guide,
not a nicety.

**One thing to preserve:** the stylesheet only pre-hides `.rv` elements when the
`js` class is present on `<html>`, stamped by an inline script before paint. If
you drop that script, elements stay visible (good). If you drop the *class* but
keep the pre-hide CSS, **the whole page will be invisible without JS.** Keep them
together.

### The WhatsApp number

One constant: `WA_NUMBER` in `lib/dlife.ts`. In WordPress, make this a theme
option or an ACF site-wide field so D'Life can change it without a developer.

**Every CTA carries a distinct pre-filled message** — that is a client
requirement, not decoration. It is how the team sees a visitor's intent and
source without any analytics or automation. The full routing table is
`lib/contact.ts`. Keep the messages distinct when rebuilding; two CTAs sharing a
prefill silently destroys the signal.

---

## 5. Content model → WordPress

Content lives in `content/` and `lib/routes.ts`, already shaped for a CMS.

| Source file | Becomes |
|---|---|
| `lib/routes.ts` | The page tree, menus, and Yoast/Rank Math titles + descriptions |
| `content/solutions.ts` | Six pages from one template — a CPT or ACF flexible content |
| `content/videos.ts` | A **Videos** CPT: title, poster, source, runtime, category, next-action |
| `content/legal.ts` | Four static pages |
| `content/home.ts` | The homepage FAQ — an ACF repeater, or a **FAQ** CPT |
| `content/articles.ts` | **Does not exist yet.** Where the article library lands — same shape as `videos.ts` |

**Suggested CPTs:** Videos, Stories, Events, Articles, FAQs.
**Suggested taxonomy**, from the client's own guide: client guidance · protection
and planning · founder and D'Life story · advisor stories · careers · DVA · Youth
Community · events and resources.

The client asked specifically how the structure accommodates new content
categories later. The answer: every card block is already driven by an array of
records, so pointing it at a WP query instead changes the data source and not the
markup.

---

## 6. Routes

Twenty-one URLs. Keep these slugs — they are already in the sitemap and in every
internal link.

```
/                                          Home
/solutions                                 Protection & Planning hub
/solutions/protecting-your-family
/solutions/protecting-your-income
/solutions/medical-health-preparation
/solutions/planning-for-your-future
/solutions/wealth-legacy
/solutions/corporate                       Corporate Solutions
/existing-policy-support
/about                                     About & founders (#sharon, #rachel)
/careers                                   Grow With D'Life
/dva                                       Drive Value Associates
/youth-community                           (#events, #resources, #stories)
/stories                                   Advisor stories
/resources                                 Articles & Events
/contact
/privacy  /terms  /disclosures  /complaints    noindex until reviewed
```

---

## 7. SEO parity checklist

Do not lose these in the rebuild.

- [ ] Per-page title and meta description — source them from `lib/routes.ts`
- [ ] Self-referential canonical on every page
- [ ] OpenGraph + Twitter card per page
- [ ] `Organization` / `FinancialService` + `WebSite` graph, site-wide (`lib/seo.ts`)
- [ ] `BreadcrumbList` on every inner page, matching the visible breadcrumb
- [ ] `FAQPage` on every page with an FAQ — **built from the same records the accordion renders**, so answers cannot drift
- [ ] `Service` on each Solutions page
- [ ] `noindex` on the four legal drafts until compliance sign-off
- [ ] XML sitemap excluding noindex pages
- [ ] One `<h1>` per page, headings in order
- [ ] Descriptive `alt` on every image
- [ ] Related-content block on every page — nothing dead-ends

**Structured data carries relationships and identity only — never a figure.**
Every statistic, award and credential on this site is pending client
verification, and an unverified claim in JSON-LD is a claim made to search
engines in D'Life's name. Add numbers to structured data only after sign-off.

---

## 8. Tracking

The guide asks for these events. None are wired yet — no analytics property
exists.

| Event | Trigger | Notes |
|---|---|---|
| WhatsApp click | Any `[data-wa]` | Capture the page and the prefill — that is the intent signal |
| Form submission | `[data-dl-signup]` | Needs a real endpoint first |
| Video start / progress / complete | `.dl-video video` | `play`, 25/50/75%, `ended` |
| Pathway selection | `#path .opt` | Which route a visitor picks |
| Card engagement | `.dl-card__go`, `.dl-related__card` | Which onward routes work |

Set up GA4 and Search Console under **accounts D'Life owns**, not the agency's.
The ownership principle in the client guide is explicit: D'Life must not be
permanently dependent on a vendor-owned account for site access, business data,
analytics, licences or renewals.

---

## 9. Before launch — the open items

These are unresolved and each one is marked `TODO(launch)` or ⚠️ at its call site.

| # | Item | Where | Blocks |
|---|---|---|---|
| 1 | **WhatsApp number** — currently the prototype placeholder `60123456789` | `lib/contact.ts` | Every CTA on the site |
| 2 | **Office address** — no document states one | `lib/contact.ts` | Footer, contact page |
| 3 | **Social profile URLs** — Instagram, Facebook, YouTube all `#` | `SiteFooter.tsx` | Footer |
| 4 | **Founder portraits** — both slots render marked placeholders | `/about`, homepage | About, homepage founder band |
| 5 | **Awards and credentials** — transcribed from the founders document, pending approval to publish | `/about` | Recognition section |
| 6 | **"27 years"** — Sharon personally, or D'Life as an organisation? | Trust strip, `/about` | Both |
| 7 | **Licensed agency, or a team under a larger insurer?** | `/disclosures` | All four legal pages, and use of "we" |
| 8 | **Legal copy** — four drafts with visible `[TO BE CONFIRMED]` markers | `content/legal.ts` | Publishing the legal pages |
| 9 | **Advisor quote attribution** — consent pending | `/careers` | Careers pull quote |
| 10 | **Claims figure** — "RM __ million" left blank exactly as the client's report prints it | Homepage trust strip | Trust strip |
| 11 | **Newsletter endpoint** — front-end only, nothing is stored | `[data-dl-signup]` | Stay in the Loop |
| 12 | **Production domain** — drives canonicals, OG and the sitemap | `lib/site.ts` | All metadata |
| 13 | **Real photography** — the film stills are 1440px video frames and will not enlarge | `public/media/img` | Every page with a plate |

---

## 10. Handover checklist (from the client's guide)

The direction guide sets ownership expectations explicitly. Document each of
these at handover:

- **Core access** — D'Life receives full WordPress admin, plus hosting, domain
  and DNS control, under accounts it can retain
- **Build register** — active theme/child theme, page builder, custom code
  locations, plugin list, licences, renewal dates, any vendor-owned dependency
- **Business integrations** — forms, notification emails, WhatsApp links,
  analytics, Search Console, SMTP
- **Renewals and costs** — who renews hosting, domain, SSL, premium plugins and
  fonts, and what it costs after year one
- **Operating model** — which content edits are safe for D'Life to make, which
  need technical support, who updates core/theme/plugins, backup frequency and
  restore process, and what happens when the included support period ends
