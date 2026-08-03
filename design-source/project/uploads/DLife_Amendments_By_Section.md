# D'LIFE HOMEPAGE — AMENDMENTS BY SECTION

Mode: **amend the existing build**. Do not redesign. Do not add ideas. Apply only what's listed. If something can't be done technically, skip it and list it at the end — do not build an alternative.

---

## 0. DESIGN SYSTEM REFERENCE (the only approved values)

### Palette — these 10 hexes ONLY, no others

| Name | Hex | Use |
|---|---|---|
| Primary teal | `#174A45` | Headings, primary surfaces |
| Deep green | `#1D4B3E` | Section backgrounds |
| Dark teal | `#0F332C` | Deepest surfaces, footer, loading screen, theme-color |
| Copper | `#B36B43` | Primary buttons, accent labels |
| Dark copper | `#9C5A37` | Button hover |
| Bronze | `#A88752` | Secondary accent |
| Ivory | `#F6F1E8` | Default page background |
| Cream | `#EFE8DA` | Alternate section background |
| Sand | `#D0BFA9` | Warm block backgrounds |
| Charcoal | `#2F3532` | Body text |

Vary the distribution — do NOT make every section a dark-green block. `#0B211D` is off-palette; remove it.

### Typography — Lora + Work Sans ONLY

| Role | Font | Weight |
|---|---|---|
| Hero headline, section headings | Lora | Semibold 600 |
| Supporting editorial emphasis | Lora | Medium 500 |
| Body, nav, labels, buttons, cards, FAQ, footer | Work Sans | Regular / Medium |

Target balance ≈ 60% Work Sans / 40% Lora. Emphasis comes from **size, spacing, alignment, grouping** — never from switching font, italicising, or bolding words inside a sentence.

### Components
- Primary button: copper fill, white text, restrained radius, dark-copper hover.
- Secondary: outline or text-and-arrow.
- Cards: warm neutrals, restrained borders, modest rounding, short copy.
- Icons: geometric outline. Motion: quiet reveal + reduced-motion support.

---

## A. GLOBAL AMENDMENTS (apply site-wide first)

| # | Amendment |
|---|---|
| G1 | **Remove all italic-span emphasis in headings** — every `<em>` inside h1/h2/h3 and footer headings. One font, one weight, one style per heading. |
| G2 | No mixed font families mid-sentence, no decorative italics, no selective bolding inside body copy. Fonts: Lora 600 headings / Lora 500 editorial support / Work Sans everything else. |
| G3 | Loading screen + meta theme-color: change `#0B211D` → `#0F332C` (approved Dark teal). Only the 10 approved hexes anywhere. |
| G4 | Replace every `href="#"` with a real path (map in section E). |
| G5 | Add `data-cta="..."` attribute to every major CTA. |
| G6 | WhatsApp CTAs → `https://wa.me/60162362286?text=...` with distinct pre-filled message per intent (policy / career / youth / general). |
| G7 | Logo: single swappable slot (`media/img/logo.svg`) used in loading screen, header, footer. New logo file incoming. |
| G8 | Reduce oversized vertical gaps globally. Sections use different heights per their job — no uniform giant spacing. |
| G9 | Custom cursor: desktop only, never suppress keyboard focus states. Respect `prefers-reduced-motion`. |
| G10 | Keep `noindex, nofollow` (staging). |

---

## B. STRUCTURE CHANGES

| # | Amendment |
|---|---|
| S1 | **DELETE** the entire "What we actually do" section (Protect / Plan / Stay manifesto). |
| S2 | **MOVE** "Find your path" selector to directly after the Hero (before trust strip). |
| S3 | Final order: Header → Hero → Path selector → Trust proof → Life needs → Existing policy → Founders → Videos → Grow With D'Life → DVA → Youth Community → FAQ → Closing CTA → Footer. |

---

## C. SECTION AMENDMENTS

### 01 Header / Nav
- Mobile: **recompose** the header, don't compress desktop into one row. No logo/CTA/menu clipping.
- Opened menu: same Lora/Work Sans system and spacing as page. Remove any separate menu styling.

### 02 Hero
- KEEP: loading screen, logo reveal, soft transition, cursor.
- Reduce headline scale (currently dominates the brand).
- Remove rectangular shadow/backing block behind "REAL SUPPORT."
- Fix duplicated "D'LIFE · FINANCIAL ADVISORY" eyebrow — render once, improve its contrast.
- Make wordmark clearly visible.
- Replace hotlinked Unsplash hero image with local path.

### 03 Path selector (moved up)
- **Shrink** to a small, centred, light horizontal strip. Remove the 5 background images — text/icon chips only.
- Keep first-person labels: Protect my family / Review my coverage / Plan for the future / Explore a career / Join a community.
- Route per map (E). Mobile: wrap or cued horizontal scroll.

### 04 Trust proof
- Expand current 4 items to the **6 approved themes** (exact copy below — do not invent):
  1. **27 Years** / Experience — Guiding families through changing markets, life stages and financial decisions for over 27 years.
  2. **AIA** / Trusted Principal — Partnering with AIA, one of Asia's leading insurers, with recognition for professional excellence and client service.
  3. **Million Dollar Agency** / MDRT Builder — Million Dollar Agency recognition since 2002; appointed MDRT Builder, developing high-performing financial professionals.
  4. **Leadership** / People Development — 4 top-tier Senior Managers and 34+ young leaders developed through systematic training.
  5. **Clients** / People First — People before products. Every recommendation begins with understanding individual needs.
  6. **Claims** / Real Support — Assisting clients with claims exceeding RM [PENDING] million, with dedicated support throughout.
- Keep compact — strip or 2×3 grid, not six big cards.
- Comment-mark all figures `[PENDING D'LIFE VERIFICATION]`. Claims RM amount stays blank-pending.

### 05 Life needs
- **Remove scroll-jacking.** Normal vertical scroll only.
- Full 5-card range visible at one glance on desktop; varied card sizes OK.
- Mobile: uniform readable cards + visible swipe cue (arrow/dots/partial next card).
- Rename labels to second person: Protecting **Your** Family / Protecting **Your** Income / Medical & Health Preparation / Planning for **Your** Future / Wealth & Legacy.
- Each card → its own Solutions page (E). Result: scan → identify → click.

### 06 Existing policy
- Enlarge the "EXISTING POLICYHOLDERS" section label — readable first, currently disappears.
- Heading loses italic mix (G1) and must not outweigh the label.
- Tighten empty space; concise and calm.
- Wording stays insurer-neutral (no insurer names, no "lost touch with your agent," no switching implication).

### 07 Founders
- Change heading to: **"Founded by sisters. Built with purpose."**
- Titles: Sharon Cheang — Founder · Rachel Cheang — Co-Founder.
- Keep intro short; "Discover our story" → `/about/`.

### 08 Featured videos
- Cap at 3–5 videos; "View all stories" → `/stories/`.
- Centre card active + visibly larger; autoplay **muted** on section entering view; clear Muted state + Unmute control.
- Inline playback inside own card only — **no lightbox/overlay/blur**.
- Play/Pause + Prev/Next; carousel cue (arrows/dots/partial card).
- On finish: rotate forward one position (next enters centre muted, finished shrinks to secondary). Never force page scroll.
- Autoplay blocked → poster + Play button.

### 09 Grow With D'Life
- KEEP four pillars (Mentorship/Professionalism/Leadership/Culture) + quote + editorial split.
- Heading loses italics (G1). CTA → `/careers/`.

### 10 DVA
- Rename everywhere (section + footer): **"DVA — Drive Value Associates"** (currently "Association" — wrong).
- Keep visibly smaller/contained than Careers and Youth. CTA "Discover DVA" → `/dva/`.

### 11 Youth Community
- Keep "Youth Community" as dominant heading; tagline subordinate.
- ADD a **"Stay in the Loop"** block with **both** email signup **and** WhatsApp updates route.
- Signup consent line: `By signing up you agree to receive Youth Community updates. Unsubscribe anytime.` — mark `[PENDING D'LIFE CONFIRMATION]`.
- Three module cards → `/youth-community/`.

### 12 FAQ
- May be **fuller** — keep/extend current answers, clear accordion, each answer links to deeper page or contact route.
- "Explore Our FAQ" → real destination (Existing Policy Support or Contact), not `#faq` self-link.

### 13 Closing CTA
- Keep copy. Heading loses italics. CTAs: WhatsApp + `#path`.

### 14 Footer
- Heading "Talk to a person, not a form" — remove italics.
- Hours: change **9am–6pm → Monday–Friday, 9:00am–5:30pm**.
- Phone: replace placeholder with **016-236 2286** (office) / **016-661 6083** (after hours & weekends).
- "DVA — By Invitation" link label → "DVA — Drive Value Associates" → `/dva/`.
- Mark `Est. 1999`, `hello@dlife.com.my`, licensing block, and entity name ("D'Life Revolution" vs "D'Life Sdn Bhd") as `[PENDING D'LIFE VERIFICATION]`.
- All footer links per map (E).

### Floating WhatsApp
- Keep restrained; must never overlap content/CTAs on any breakpoint.
- Contextual pre-filled messages per route. DVA routing `[PENDING]`.

---

## D. RESPONSIVE PASS (after amendments)

- Rebuild mobile header (C-01). Visible cues on all sideways content. No unexpected horizontal takeover. Menu typography per G2. WhatsApp non-blocking. Varied section heights. Check contrast, focus states, reduced motion. Verify desktop + tablet + mobile before output.

---

## E. LINK MAP

`/` Home · `/solutions/` · `/solutions/protecting-your-family/` · `/solutions/protecting-your-income/` · `/solutions/medical-health-preparation/` · `/solutions/planning-for-your-future/` · `/solutions/wealth-legacy/` · `/existing-policy-support/` · `/about/` · `/careers/` · `/dva/` · `/youth-community/` · `/stories/` · `/contact/`

Corporate solutions: link inside `/solutions/` only — no homepage section or nav pillar.

---

## F. OUTPUT

1. Amended responsive HTML (single file, embedded CSS/JS).
2. Top comment block: all `[PENDING]` items.
3. End list: any amendment you could NOT apply + why. Do not substitute alternatives.
