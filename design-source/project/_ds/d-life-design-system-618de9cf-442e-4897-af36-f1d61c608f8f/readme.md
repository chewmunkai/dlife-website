# D'life Design System

Warm editorial authority — roughly 60% modern, 40% heritage. A financial-advisory brand that wants to read like a letter from someone who knows what they are talking about, not like a product brochure.

## What D'life is

D'life is a financial advisory practice serving Malaysian families and business owners: protection review, savings with dates attached, retirement income, business continuity. Around the advisory work sit three other surfaces the brand notes call out explicitly — a **careers** track (D'life recruits and trains advisers rather than hiring closers), **DVA**, the internal adviser-development programme, and a free **youth community** programme that teaches money basics with no product attached.

The tone that follows from that: confident, unhurried, specific. Serif headlines for authority, a clean sans for everything operational, warm greens and copper instead of the blue-and-white of the category.

### Sources used

- **The brand notes supplied in the project brief** (fonts, the nine-colour palette, component rules, section rhythm). This is the only source of truth for this system.
- **No codebase, Figma file, screenshots, decks, logo files or font binaries were provided.** Nothing here was reverse-engineered from a live product.
- Substitutions and inventions are listed under [Caveats](#caveats) — read that section before treating any copy or number in the UI kit as real.

---

## Index

| Path | What it holds |
| --- | --- |
| `styles.css` | The single entry point consumers link. `@import` list only. |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `shape.css`, `motion.css`, `base.css` |
| `components/core/` | Icon, Button, IconButton, Badge, Tag, Card |
| `components/forms/` | Field, Input, Textarea, Select, Checkbox, Radio (+ RadioGroup), Switch |
| `components/navigation/` | Tabs, Accordion (+ AccordionItem) |
| `components/feedback/` | Dialog, Toast, Tooltip |
| `components/editorial/` | Wordmark, Section, SectionHeading, QuoteBlock, WhatsAppFloat |
| `guidelines/` | 21 specimen cards (Colors, Type, Spacing, Brand) that render in the Design System tab |
| `ui_kits/website/` | The D'life marketing site: home, careers, youth community, contact (`README.md` inside) |
| `templates/dlife-page/` | "D'life page" template — the section rhythm as a ready-to-copy starting page |
| `assets/icons/` | 46 Lucide outline SVGs, copied in for static artifacts |
| `assets/image-slot.js` | Drag-and-drop image placeholder used everywhere real photography is missing |
| `thumbnail.html` | Homepage tile |
| `SKILL.md` | Agent-Skills front matter for use outside this project |

Each component directory also carries `<Name>.d.ts` (props contract) and `<Name>.prompt.md` (one-line "what & when", a usage example, notable variants).

---

## Content fundamentals

**Voice.** A senior adviser talking across a table. Plain, declarative, a little dry. The brand earns trust by being specific rather than reassuring — "thirty minutes, no obligation" beats "we care about your future".

**Person.** Speak to the reader as **you**; speak for the practice as **we**. Never "our clients" when addressing a client, never "I" (the founder is quoted, not the narrator).

**Casing.** Sentence case everywhere except eyebrows and small labels, which are uppercase with 0.09em tracking. Headlines never end in a full stop. No title case in buttons ("Book a conversation", not "Book A Conversation").

**Length.** Headlines under 9 words. Leads one sentence, two at most. Card body copy 1–2 lines. If a paragraph needs a third sentence, it belongs in a guidance note, not on a card.

**Numbers.** Written concretely and only when true: "15 yrs", "RM 42m in claims supported", "one working day". Malaysian conventions: RM prefix, "012 345 6789" phone spacing, "03–7710 2288" with an en dash.

**Copy examples in the brand voice**

- Hero: *"Protect what you're building"* / *"A conversation first, then a plan you can read in one sitting."*
- Value line: *"We measure ourselves by the claims our clients never have to worry about."*
- Card: *"Papers your spouse can find — a one-page summary of what you hold and who to call."*
- Careers: *"Learn the craft before you learn the pitch."*
- Youth: *"Learn money before it costs you."* / *"No products, no forms, no follow-up call unless you ask for one."*
- Disclosure, said plainly: *"Commission from the insurer, disclosed in writing before anything is signed."*
- CTA: *"Book a conversation"*, *"Read the guidance notes"*, *"Save my seat"*.

**Avoid.** Exclamation marks. Emoji (the brand uses none — icons carry that load). Fear-based selling ("don't leave your family exposed"). Category clichés: "peace of mind", "tailored solutions", "financial freedom", "journey", "holistic". Anything that implies a guaranteed return.

**Apostrophe.** The brand name is **D'life** — lowercase L, typographic right quote (’), never "D'Life" or "Dlife".

---

## Visual foundations

**Palette.** Nine brand colours, no more. Three greens carry structure (primary teal `#174A45`, deep green `#1D4B3E`, dark teal `#0F332C`); copper `#B36B43` is the action colour and is never used for large fills; bronze `#A88752` is an accent and eyebrow colour on light; four warm neutrals (charcoal, sand, cream, ivory) do everything else. Ivory `#F6F1E8` is the page. Derived neutrals are always charcoal or ivory at an alpha — never a grey from outside the palette.

**Type.** Three families with fixed jobs. Bricolage Grotesque carries the wordmark and every headline — bold (600–700), tightly tracked (about -0.035em), usually uppercase, line-height near 0.95. Newsreader appears only as the counterpoint: italic Light phrase accents inside grotesk headlines (at ~0.82em, sand on dark, dark copper on light), editorial manifesto lines, quotes, and small italic captions. Work Sans does all body and UI work — body 18/1.75 Light, leads ~19–20px, captions 13–16px, uppercase labels 11px at 0.32em tracking in Bricolage 600. Chinese text sets in Noto Serif SC.

**Measure and rhythm.** 1200px container, gutter clamped 20→56px, section padding clamped 72→120px (48→72px for strips). Titles cap at ~20ch so lines break editorially; body at 62ch. Spacing is a 4px scale — 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.

**Backgrounds.** Flat colour bands, always — no gradient backgrounds, no patterns, no textures, no noise. The page is composed by *alternating tones* in a fixed order: ivory hero → light (cream) selector strip → dark green trust strip → ivory life needs → cream policy-guidance band → ivory founder split → dark teal video panel → ivory careers → dark green DVA teaser → sand youth community → ivory FAQ → dark teal closing CTA → charcoal footer. Two dark bands never touch; a light section always separates them.

**Imagery.** Warm, natural daylight; real people mid-conversation rather than posed stock; no cool blue-grey grading, no black and white, no heavy grain. Portraits are cropped 3:4 or 4:5 with a 14px radius; film stills 16:10. Where imagery is missing, use an `<image-slot>` placeholder rather than a drawn illustration — the brand has no illustration system.

**Text over imagery.** Use the teal protection gradient (`--scrim-bottom` / `--scrim-side`), never a rounded capsule or a blurred plate behind text. Transparency and blur appear in exactly two places: the sticky header (92% ivory + 8px blur) and the dialog scrim (62% dark teal + 3px blur). Nothing else is glassy.

**Corners.** Restrained: 2px on badges, 4px on buttons and inputs, 6px on toasts, 10px on cards and dialogs, 14px on image frames. Full pills are reserved for filter tags and the WhatsApp pill — nothing else.

**Cards.** Warm neutral fill (cream on ivory, white or ivory on cream, sand for community content, teal for dark panels), 1px hairline or no border, 10px radius, 24px padding, **no shadow at rest**. An icon in copper (sand on dark) sits above the eyebrow; eyebrow above a Lora title; one or two lines of Work Sans body. Linked cards lift 2px and gain `--shadow-md` on hover and append an `arrow-up-right`.

**Elevation.** Four steps, all tinted teal, none of them black: `xs` 1px hairline lift, `sm` 2/6, `md` 8/20 for hover and toasts, `lg` 24/48 for dialogs only. Inner shadows are not used; a hairline `inset 0 0 0 1px` stands in when a surface needs definition.

**Borders and rules.** Hairlines are charcoal at 16% on light, ivory at 20% on dark; warm dividers (`#DED3C0`) separate list rows on cream. Section headings carry a 28px × 2px rule before the eyebrow — the one decorative flourish in the system.

**Motion.** Quiet by default: a 16px rise with fade over 640ms (`--ease-quiet`, `cubic-bezier(.22,.7,.24,1)`) as content enters; 220ms for hover; 140ms for press. Nothing bounces, nothing springs, nothing loops. Microinteractions are small and literal — cards lift 2px, arrows nudge 3px right, the accordion plus rotates 45° into a cross, the WhatsApp label expands from the icon. `prefers-reduced-motion` is honoured globally in `tokens/motion.css`.

**States.** Hover on the copper primary darkens to `#9C5A37` (never lightens, never adds shadow); secondary fills with teal at 7%; on dark, ivory at 12%. Press scales to 0.985 for 140ms. Focus is a 2px bronze outline at 2px offset — except form controls, which take a teal border plus a 3px teal glow. Disabled is 42% opacity with no colour change.

**Layout fixtures.** One sticky header (76px). One floating contact point — the copper WhatsApp pill, bottom-right, 24px offsets. Toasts sit above it at 96px. Nothing else is fixed; no sticky CTAs, no cookie bar in mockups, no second floating dial button.

---

## Iconography

- **One system: Lucide outline**, 24×24 grid, 1.75px stroke (a touch lighter than Lucide's 2px default), round caps and joins. This is a documented substitution — the brand notes ask for "geometric outline style" icons but no icon set was supplied. Lucide is the closest CDN-available match; swap it if D'life owns a set.
- 46 icons are copied into `assets/icons/` as real SVGs for static artifacts, and inlined in `components/core/Icon.jsx` (`ICON_PATHS`) so the React component needs no asset path. `ICON_NAMES` lists what is available.
- Sizes in use: 14–15px inline with captions, 17–20px in UI, 26px as a card marker, 20px in the WhatsApp pill.
- Colour: `currentColor` by default; copper for card markers and inline affirmations on light; sand on dark panels. Icons are never filled, never two-tone, never placed in a coloured circle.
- **No emoji, ever.** No unicode characters as icons — the only unicode glyphs used decoratively are the middle dot (·) as a separator, the en dash in phone numbers, and the typographic apostrophe in the wordmark.
- No icon font, no sprite sheet. If you need an icon that isn't bundled, take it from Lucide at the same stroke weight rather than drawing one.

---

## Components

Built from the brand notes' component rules (no source library existed to enumerate). Every component is a self-contained `.jsx` styled entirely through CSS custom properties.

**Core** — `Icon`, `Button`, `IconButton`, `Badge`, `Tag`, `Card`
**Forms** — `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`
**Navigation** — `Tabs`, `Accordion`, `AccordionItem`
**Feedback** — `Dialog`, `Toast`, `Tooltip`
**Editorial** — `Wordmark`, `Section`, `SectionHeading`, `QuoteBlock`, `WhatsAppFloat`

### Intentional additions

The brand notes describe rules and a page rhythm rather than a component list, so five components exist to encode those rules rather than to fill out a standard kit:

- **`Icon`** — a wrapper over the bundled Lucide set so stroke weight and sizing stay consistent.
- **`Wordmark`** — the brand name set in type, because no logo files were supplied. Replace this component if official artwork arrives.
- **`Section`** — owns the documented background rhythm, vertical padding and content measure.
- **`SectionHeading`** — the eyebrow + rule + Lora title + lead pattern that opens every section.
- **`WhatsAppFloat`** — encodes the "one restrained floating WhatsApp point" rule so nobody adds a second.

---

## Caveats

- **Fonts are loaded from Google Fonts**, not from licensed binaries — `tokens/fonts.css` imports Lora and Work Sans. If D'life has licensed webfont files, drop them in and replace that import with real `@font-face` rules.
- **No logo.** Every mark in the system is the typographic wordmark.
- **No photography, illustration or brand imagery** was supplied; all image areas are `<image-slot>` placeholders.
- **All copy, statistics, addresses and phone numbers in the UI kit are illustrative**, written in the brand voice to make the layouts legible. They are not D'life facts.
- **"DVA"** appears as it does in the brand notes; its expansion and description were not provided and the placeholder copy says so.
