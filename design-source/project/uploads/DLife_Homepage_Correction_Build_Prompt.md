# D'LIFE HOMEPAGE — CORRECTION BUILD PROMPT (v2, audited)

Paste everything below into Claude Design.

---

## ROLE & MODE

You are implementing an **already-approved** design direction for D'Life, a Malaysian financial advisory and insurance agency (AIA agency). This is **controlled implementation, not concept exploration.**

The client has issued a formal correction report. Your job is to correct an existing homepage back to the approved baseline — not to reinterpret it, not to propose alternatives, not to improve on it creatively.

**If you think something should be different, do not change it. Flag it in a separate list at the end of your output with: the issue, why it affects implementation, what you tried, your proposed alternative, and how the alternative preserves the same visitor outcome.**

Deliver a single responsive HTML page (desktop, tablet, mobile) that will later be ported to WordPress.

---

## NON-NEGOTIABLE RULES

1. Follow the section sequence below **exactly**. Do not reorder, merge, remove, or add sections.
2. Use **only** Lora and Work Sans. No third font family.
3. Use **only** the palette hex codes below. No additional colours — including in the loading screen.
4. Every CTA must point to a real destination from the **CTA destination map** below. **No `href="#"` anywhere.**
5. Homepage **teases and links deeper**. It must not contain the full content of every deeper page.
6. Any visitor must reach a relevant next action within **1–2 clicks**.
7. Never convert normal vertical scrolling into unexpected horizontal movement. **No scroll-jacking.**
8. Do not turn every section into the same dark green block. Vary the palette distribution.
9. **Non-duplication rule:** the Choose Your Path selector and the life-needs section must NOT repeat the same labels, scale or imagery. The selector routes quickly (first-person, light, no images). The life-needs section explores (second-person, image-led, larger).
10. Do not invent any statistic, award, name, or figure. Use only what is specified here.

---

## DESIGN SYSTEM

### Typography

| Role | Font | Weight |
|---|---|---|
| Hero headline, section headings | Lora | Semibold 600 |
| Supporting editorial emphasis | Lora | Medium 500 |
| Body copy, navigation, labels, buttons, cards, FAQ, footer | Work Sans | Regular / Medium |

Overall balance target: roughly **60% modern (Work Sans) / 40% heritage (Lora)**.

**Typography rules — these are the client's single biggest complaint:**

- ❌ Do **not** switch font family mid-sentence.
- ❌ Do **not** use decorative italics as a substitute for hierarchy.
- ❌ Do **not** bold a full body sentence or random words inside normal copy.
- ❌ Do **not** style individual words differently from the rest of their sentence.
- ✅ Create emphasis using **size, spacing, alignment and grouping only**.
- ✅ The opened mobile menu must use the same type system, hierarchy and spacing as the page.

> The current build wraps a phrase in every heading in an italic span — e.g. `Real Support. <em>Beyond the Policy.</em>`, `Support built around <em>real life needs</em>`, `Talk to a person, <em>not a form.</em>`. **Remove this pattern site-wide, including the footer.** Headings are one font, one weight, one style.

### Palette

| Name | Hex | Typical use |
|---|---|---|
| Primary teal | `#174A45` | Headings, primary surfaces |
| Deep green | `#1D4B3E` | Section backgrounds |
| Dark teal | `#0F332C` | Deepest surfaces, footer, **loading screen, meta theme-color** |
| Copper | `#B36B43` | Primary buttons, accent labels |
| Dark copper | `#9C5A37` | Button hover |
| Bronze | `#A88752` | Secondary accent |
| Ivory | `#F6F1E8` | Default page background |
| Cream | `#EFE8DA` | Alternate section background |
| Sand | `#D0BFA9` | Warm block backgrounds |
| Charcoal | `#2F3532` | Body text |

> The current build uses `#0B211D` for the loading screen / theme-color. That is off-palette. Replace with Dark teal `#0F332C`.

### Components

- **Primary action:** copper fill, white text, restrained radius, dark copper on hover.
- **Secondary action:** outline or text-and-arrow, depending on background.
- **Cards:** warm neutrals, restrained borders, modest rounding, short copy, consistent spacing.
- **Icons:** geometric outline style.
- **Motion:** quiet reveal as baseline. Simple micro-interactions on buttons and cards. Narrative scroll used sparingly. Must respect `prefers-reduced-motion`.
- **Custom cursor:** desktop pointer devices only. Must never suppress or interfere with visible keyboard focus states, and must fall back to the system cursor on touch devices.

### Logo

A **new D'Life logo file is incoming**. Build the wordmark/logo as a single swappable slot (inline SVG or one `<img>` referencing `media/img/logo.svg`) used consistently in the loading screen, header and footer, so one file swap updates all three. Current logo is a placeholder.

---

## CTA DESTINATION MAP

Every link and CTA uses these paths (stub pages are fine; the paths must exist as named destinations). This mirrors the agreed 14-page structure.

| Destination | Path |
|---|---|
| Home | `/` |
| Solutions | `/solutions/` |
| Protecting Your Family | `/solutions/protecting-your-family/` |
| Protecting Your Income | `/solutions/protecting-your-income/` |
| Medical & Health Preparation | `/solutions/medical-health-preparation/` |
| Planning for Your Future | `/solutions/planning-for-your-future/` |
| Wealth & Legacy | `/solutions/wealth-legacy/` |
| Existing Policy & Claims Support | `/existing-policy-support/` |
| About D'Life & Founders | `/about/` |
| Career / Grow With D'Life | `/careers/` |
| DVA — Drive Value Associates | `/dva/` |
| Youth Community | `/youth-community/` |
| Stories & Resources | `/stories/` |
| Contact | `/contact/` |

**WhatsApp CTAs** use `https://wa.me/<number>?text=<pre-filled message>`. Every major CTA carries a **distinct pre-filled message** identifying intent and source, e.g.:

- Hero / closing "Speak with an Advisor": `Hi D'Life, I'd like to speak with an advisor. (via website homepage)`
- Existing policy "Get guidance on my policy": `Hi D'Life, I'd like guidance on my existing policy. (via website)`
- Careers: `Hi D'Life, I'd like to explore a career conversation. (via website)`
- Youth Community: `Hi D'Life, I'd like Youth Community updates. (via website)`

**Tracking readiness:** give every major CTA a `data-cta` attribute (e.g. `data-cta="hero-speak-advisor"`) so clicks can be tracked later without rebuilding.

---

## SECTION SEQUENCE — BUILD IN THIS EXACT ORDER

### 01 — Header and navigation

Nav items: Solutions · Existing Policy Support · Stories · Careers · Community
Persistent right-side: "Message an Advisor" (secondary) + "Speak with an Advisor" (primary copper).

**Mobile: recompose the header. Do not squeeze the desktop header into one row.** No crowding or clipping between logo, CTA and menu trigger.

### 02 — Hero

**Keep from the current build:** loading screen (Dark teal `#0F332C`), D'Life logo reveal, soft transition into hero, custom desktop cursor. Timing may be refined; do not remove the identity treatment.

Copy:
- Eyebrow: `D'LIFE · FINANCIAL ADVISORY` (render once — the current build duplicates it)
- Headline: `Real Support. Beyond the Policy.`
- Support: `Protection is only the beginning. D'Life brings real guidance, long-term relationships and support through life's changes.`
- Primary CTA: `Speak with an Advisor` (WhatsApp) · Secondary CTA: `Find your path` (→ #path selector)

Required corrections:
- Make the D'Life identity/wordmark **clearly visible**.
- **Reduce the headline scale** so it supports the brand rather than dominating it.
- Improve contrast on the eyebrow label and body copy.
- **Remove the rectangular shadow / backing block behind the headline.**
- Room for approved human photography — all photography is provisional and **subject to Sharon's approval**. Use a local asset path, not a hotlinked stock URL.

### 03 — Choose Your Path selector `← this comes BEFORE trust proof`

A **small, centred, light horizontal routing strip**. Fast recognition. Visually lighter than the life-needs section below. **No images. Not a card grid.**

Intro line: `I'm looking to…`

Labels stay **first-person**, each routing to its map destination:
`Protect my family` → Protecting Your Family · `Review my coverage` → Existing Policy Support · `Plan for the future` → Planning for Your Future · `Explore a career` → Careers · `Join a community` → Youth Community

Keep centred on desktop; **adapt deliberately for smaller screens** (wrap or a clearly cued horizontal scroll) — do not shrink it into illegibility.

### 04 — Trust proof

Early, **compact**, evidence-led — a strip or tight grid (e.g. 2 rows × 3), not six large cards. Six approved themes:

| # | Label | Sub-label | Content direction |
|---|---|---|---|
| 01 | 27 Years | Experience | Guiding families through changing markets, life stages and financial decisions for over 27 years. |
| 02 | AIA | Trusted Principal | Partnering with AIA, one of Asia's leading insurers, with recognition for professional excellence and client service. |
| 03 | Million Dollar Agency | MDRT Builder | Million Dollar Agency recognition since 2002; appointed MDRT Builder, developing high-performing financial professionals. |
| 04 | Leadership | People Development | 4 top-tier Senior Managers and 34+ young leaders developed through systematic training. |
| 05 | Clients | People First | People before products. Every recommendation begins with understanding individual needs. |
| 06 | Claims | Real Support | Assisting clients with claims exceeding RM [PENDING] million, with dedicated support throughout. |

Mark all figures `[PENDING D'LIFE VERIFICATION]` in a code comment. Do not invent numbers.

### 05 — Life-needs section

The larger, richer exploration layer. Carries more imagery and emotional weight than the path selector above.

**Labels are second person:**
`Protecting Your Family` · `Protecting Your Income` · `Medical & Health Preparation` · `Planning for Your Future` · `Wealth & Legacy`

Required behaviour:
- Image-led card composition.
- **The full range must be scannable at one glance on desktop.**
- Different card sizes may be used to create hierarchy.
- Mobile: consistent readable cards with a **visible sideways cue** (arrow, dots, or partial next card).
- ❌ Do **not** force images to pass before the heading and CTA become readable.
- ❌ Do **not** take over vertical scrolling with horizontal movement.
- ✅ Required result: **scan → identify the need → click the CTA.**

Each card links to its own Solutions destination from the map. Corporate/employee protection is **not** a homepage card — it stays discoverable inside the Solutions page.

### 06 — Existing-policy guidance

Headline: `Need clarity on your current coverage?`
Body: `Understand the protection you already have. Speak with our team to review your coverage with greater confidence, and see what next step, if any, makes sense.`
CTA: `Get guidance on my policy` (WhatsApp, pre-filled)

Required corrections:
- **Make the section label readable first.** It must not be tiny or disappearing.
- The slogan must not carry more weight than the section identity.
- One font family, no presentation-style emphasis.
- **Reduce excessive empty space** — this section currently feels stretched.
- Keep concise and calm.

**Compliance — strictly insurer-neutral in this section:** no insurer or competitor name, no "lost touch with your agent", no advisor-abandonment language, no negative comparison, no switching or poaching implication.

### 07 — Founder story

Section heading: `Founded by sisters. Built with purpose.`

- **Sharon Cheang — Founder**
- **Rachel Cheang — Co-Founder**

Keep the introduction short and link to the full About story. Do not reduce this to a single-founder narrative. Do not let a slogan overpower the section label. No mixed font families inside one thought.

CTA: `Discover our story` → `/about/`

### 08 — Featured videos

Heading: `Meet the people behind D'Life` · Link: `View all stories` → `/stories/`

**Quantity: 3 to 5 videos on the homepage.** The rest live on the deeper stories page. The homepage teases; it is not the media hub.

Behaviour:
- Compact **horizontal row** of video cards.
- One **centre card is active and visibly larger** than the side previews.
- When the section enters view: activate the centre card and **start playback muted**.
- Show a clear **Muted state** and an obvious **Unmute** control.
- Enlarge only relative to the secondary cards.
- **Playback stays inline, inside its own card.** ❌ No lightbox, overlay, blurred background, or semi-detached viewing space.
- Controls: **Play/Pause, Previous, Next.**
- Carousel cue: arrows, dots, or partial next-card visibility.
- When the active video finishes: **rotate forward by one position.** Next video enters centre, enlarges, starts muted. Completed video moves to a smaller secondary slot.
- Continue through the set **without forcing page scrolling**.
- If autoplay is blocked: show a poster and a clear Play control.

### 09 — Grow With D'Life

The standard main career route. Focus on career exploration, mentorship and real advisor stories.

Heading: `A career built on real guidance, not just sales.`

Keep the current four-pillar structure — **Mentorship, Professionalism, Leadership, Culture** — in an editorial split layout, connecting to advisor stories. An advisor quote may be included.

CTA: `Explore a career conversation` → `/careers/`

Tone: values-led, selective, mentorship-oriented. ❌ No mass recruitment, easy-money or lifestyle promises, MLM-style language, or generic motivational claims.

### 10 — DVA

**Public name must read exactly: `DVA — Drive Value Associates`** (the current build says "Drive Value Association" — this is wrong; correct it everywhere it appears, including the footer).

- Keep this section **visibly smaller, contained and selective** — smaller than Grow With D'Life and smaller than Youth Community.
- Present leadership, values and professional growth.
- ❌ Must not resemble open public recruitment.

Copy: `By invitation. Built for leaders.` / `A selective circle shaped by shared values and experience.`
CTA: `Discover DVA` → `/dva/`

### 11 — Youth Community

A **larger, more public-facing** section than DVA.

- `Youth Community` remains the **primary heading**.
- `Empowering youth. Building tomorrow.` is visually **subordinate** supporting copy.
- Modules: Events & Workshops · Stories · Educational Resources — each linking to `/youth-community/`.
- Include **both** an email signup **and** a WhatsApp updates route, presented through a clear **`Stay in the Loop`** block.
- The signup form includes a short consent line (e.g. `By signing up you agree to receive Youth Community updates. Unsubscribe anytime.`) with the exact wording marked `[PENDING D'LIFE CONFIRMATION]` — data storage, list ownership and unsubscribe method are unresolved client-side.

### 12 — FAQ

Heading: `A few common questions` · CTA: `Explore Our FAQ` (FAQ lives on Existing Policy & Claims Support or Contact — route there; do not leave it dangling)

This section **may be fuller** than the current version. Include enough detail to genuinely answer visitor questions. Keep it organised, scannable and mobile-friendly through a clear **accordion**. Avoid repetitive filler, but do not shorten useful answers just to make the section small. Each answer connects to deeper guidance or the correct contact route.

### 13 — Closing CTA

One calm invitation with a clear primary and secondary action.

Heading: `A clearer future can begin with one conversation.`
Support: `Let it begin with you.`
CTAs: `Speak with an Advisor` (WhatsApp) · `Find your path` (→ #path selector)

### 14 — Footer

Structured, easy to scan: navigation, legal, contact and ownership details.
Column groups: Protection & Planning · Guidance & Support · People & Community · Contact.

Corrections to the current footer:
- Remove the italic emphasis pattern from the footer heading.
- **Hours: `Monday–Friday, 9:00am–5:30pm`** (current build says 9am–6pm — wrong).
- Replace placeholder phone `+60 12-345 6789` with the confirmed routing numbers.
- `DVA — Drive Value Associates` (correct name).
- Mark `Est. 1999`, `hello@dlife.com.my`, and the licensing block `[PENDING D'LIFE VERIFICATION]`.
- Entity naming: footer currently says "D'Life Revolution"; contract documents say "D'Life Sdn Bhd". Use `D'Life` in visible copy and flag the legal-entity line as `[PENDING D'LIFE CONFIRMATION]`.
- Include the general-advice disclaimer (keep the existing wording).

---

## PERSISTENT WHATSAPP

A **restrained** floating WhatsApp control, present throughout the page. **It must never block content or CTAs** on any breakpoint.

Contextual pre-filled messages per route — client/policy, career, Youth Community (see CTA destination map).

| Window | Number |
|---|---|
| Monday–Friday, 9:00am–5:30pm | 016-236 2286 |
| After office hours and weekends | 016-661 6083 |

DVA routing: `[PENDING D'LIFE CONFIRMATION]`

---

## RESPONSIVE REQUIREMENTS

**Recompose each breakpoint deliberately. Do not shrink the desktop layout.**

- **Mobile header:** rebuilt, not compressed. No clipping or crowding.
- **Sideways content:** always show a visible next card, arrow, dots or swipe cue.
- **Never** convert vertical scrolling into unexpected horizontal movement.
- **Opened menu:** approved typography and spacing, same system as the page.
- **WhatsApp:** must not obstruct content or CTAs.
- **Vertical rhythm:** reduce unnecessary gaps. Different sections should use different heights — do not apply one oversized gap everywhere. Whitespace should support reading, not create dead space.
- Validate contrast, visible keyboard focus states, and reduced-motion support.

---

## DELETE FROM THE CURRENT BUILD

- ❌ **The entire "What we actually do" manifesto section** (Protect / Plan / Stay). It repeats the hero and delays the visitor journey. Remove completely.
- ❌ The italic-span emphasis pattern in every heading **and the footer**.
- ❌ The rectangular shadow/backing block behind the hero headline.
- ❌ Any horizontal scroll-jacking in the life-needs section.
- ❌ All `href="#"` placeholders — replace using the CTA destination map.
- ❌ The hotlinked external stock hero image — use a local asset path.
- ❌ Placeholder phone number and wrong footer hours.
- ❌ Off-palette loading-screen colour `#0B211D`.
- ❌ "Drive Value Association" naming.
- ❌ The duplicated hero eyebrow line.

---

## KEEP FROM THE CURRENT BUILD

- ✅ Loading screen (recoloured to `#0F332C`)
- ✅ D'Life logo reveal (swappable logo slot)
- ✅ Soft transition into the hero
- ✅ Custom desktop cursor (desktop only, accessibility-safe)
- ✅ Sections 05–14 sequence (already correct)
- ✅ Grow With D'Life four-pillar content
- ✅ FAQ answer copy (may be extended)
- ✅ Footer disclaimer wording

---

## CONTENT & COMPLIANCE NOTES

- All photography is **provisional and subject to Sharon's approval**. Use local placeholder paths under `media/img/`.
- Corporate/employee protection stays discoverable **inside Solutions**. Do **not** create a separate homepage branch, navigation pillar, or standalone section for it.
- All statistics, awards, credentials, RM figures, dates and contact details are **unverified**. Mark them clearly.
- Keep `noindex, nofollow` while this is on a staging URL.

---

## OUTPUT

1. One responsive HTML file with embedded CSS and JS.
2. Semantic heading structure (single `h1`, logical `h2`/`h3` order), descriptive `alt` text on every image, `data-cta` attributes on major CTAs.
3. A comment block at the top listing every `[PENDING D'LIFE VERIFICATION]` / `[PENDING D'LIFE CONFIRMATION]` item.
4. A separate closing list of any genuine UX, accessibility, responsive, WordPress or technical constraint you encountered — with issue, impact, what you attempted, proposed alternative, and how it preserves the approved visitor outcome. **Do not implement these alternatives. List them only.**
