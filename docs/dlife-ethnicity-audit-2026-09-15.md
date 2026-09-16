# Ethnicity audit and replacement prompts — 15 Sep 2026

Client direction: the photography should show Chinese Malaysian subjects,
because that is their target market.

I walked every photograph that renders on the live site — **49 of them** — and
sorted by what can actually be done about each. Two groups, and the difference
between them matters.

- **Replaceable (30 images).** Generated scenes and licensed stock. Fictional
  or anonymous people standing in for a customer. Changing these is ordinary
  marketing work; **13 are flagged below, with a prompt for each.**
- **Real D'Life photography (19 images).** The team, the founders, DVA, the
  Youth Community — the client's own Drive. These are real, identifiable
  employees. See the last section: there is no prompt for these, and the
  change they would require is not the same kind of change.

---

## Flagged — 13 images

Ordered by how many pages each one renders on, because that is how much it
costs to leave in place.

| # | File | Renders on | Flag |
|---|---|---|---|
| 1 | `need-health-malaysia.jpg` | **4 pages** — homepage, Solutions hub, Medical hero, Wealth card 01 | Malay — hijab |
| 2 | `need-family-malaysia.jpg` | **3 pages** — homepage, Solutions hub, Planning card 02 | Malay — hijab |
| 3 | `need-legacy-malaysia.jpg` | **3 pages** — homepage, Solutions hub, Wealth hero | **Indian family** |
| 4 | `services/generated/policy-review.jpg` | 2 slots — Family card 05, Medical card 01 | Client-side woman reads Malay |
| 5 | `need-family.jpg` | Solutions hub | Café crowd, hijabs visible |
| 6 | `services/generated/family-generations.jpg` | Family card 03 | Malay — hijab and songkok |
| 7 | `services/generated/family-support.jpg` | Family card 04 | Both men read Malay |
| 8 | `services/generated/medical-costs.jpg` | Medical card 02 | Reads Malay |
| 9 | `services/generated/legacy-business-v2.jpg` | Wealth card 03 | Advisor reads Malay |
| 10 | `services/generated/legacy-support-v2.jpg` | Wealth card 04 | Wheelchair user reads Malay |
| 11 | `services/generated/legacy-records-v2.jpg` | Wealth card 05 | Malay — hijab |
| 12 | `fam-newhome.jpg` | Family card 02 | **White / Western couple — not Malaysian at all** |
| 13 | `inc-bills.jpg` | Income card 01 | **White / Middle Eastern man — not Malaysian at all** |

**Two of these the client has not asked about, and they are the worse
mismatch.** `fam-newhome` and `inc-bills` are not Chinese, not Malay, not
Indian — they are Western stock on a Malaysian agency's website. Whatever is
decided about the rest, those two do not belong.

### Clean already — no action

`starting-a-plan` (the new Planning hero), `hospital-access`,
`employment-cover`, `medical-history`, `close-conversation`, `fut-epf`,
`need-income-malaysia`, `path-career`, `policy-review.jpg` (the top-level one
on Existing Policy), `inc-askhelp`, and the four installed today —
`family-01-newborn`, `legacy-02-fairness`, `future-05-start`,
`closing-next-step`. Subject-free images (`inc-savings`, `inc-priorities`,
`fut-education`) are neutral.

---

## The prompts

Same rules as before: **1536 × 1024**, the size this generator actually makes.
The LOOK and NEVER paragraphs are byte-identical in every block so the set
reads as one shoot. Paste one block, get one image.


### 1 · `family-03-sandwich.jpg`

**Protecting your family → card 03** — *"Ageing parents who may need support, at the same time as young children"*
Replacing: Malay — hijab and songkok, a whole family in traditional dress

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian woman in her forties, her elderly father, and her young daughter.

SCENE: Home, late afternoon. The woman sits between the two generations at one table — passing a cup to her father with one hand while her daughter shows her a drawing with the other. She is attending to both at once. Warm, ordinary, slightly stretched. All three faces clearly visible. No medical props, no mobility aids.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### 2 · `family-04-bereaved-friend.jpg`

**Protecting your family → card 04** — *"A friend or colleague's family going through something difficult"*
Replacing: Both men read Malay / Southeast Asian

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: Two Chinese Malaysian men in their forties.

SCENE: A quiet kitchen or a doorway. One has brought food in a stacked tiffin carrier and is handing it over with both hands; the other receives it. A brief touch on the forearm. Restrained sympathy — the gesture carries it. No tears, no embrace, no hospital, no funeral props, no black clothing.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### 3 · `policy-review.jpg`

**Protecting your family → card 05  ·  Medical → card 01** — *"A policy bought years ago that nobody has looked at since  /  What my annual and lifetime limits actually are"*
Replacing: The client-side woman reads Malay

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: Two Chinese Malaysian women — one in her fifties, one an advisor in her thirties.

SCENE: Side by side at a wooden table, both looking down at the same printed benefits schedule. The client's finger rests on one line; the advisor is mid-explanation, open-handed. They are on the same side of the table and the same side of the problem. The document shows ruled structure but no readable words. No branded folder, no brochure.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### 4 · `medical-02-excess.jpg`

**Medical → card 02** — *"How much I would pay myself before cover starts"*
Replacing: The man reads Malay

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian man in his forties, alone.

SCENE: At a home dining table working out a hospital expense: a calculator under one hand, a modest stack of Malaysian ringgit notes, a receipt, a plain folder. Close editorial composition on the hands and the paperwork, his face visible and thoughtful. Calm, not distressed.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### 5 · `legacy-03-business.jpg`

**Wealth & Legacy → card 03** — *"What happens to a business, or a property held with others"*
Replacing: The advisor reads Malay

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian mother in her sixties, her adult son, and a Chinese Malaysian advisor in his thirties.

SCENE: A modest family furniture workshop. The three of them at a workbench discussing the business's future, a property floor plan and a set of keys on the table, neatly made wooden furniture behind them. Wide enough to show the workshop. About handing a family business on.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### 6 · `legacy-04-dependant.jpg`

**Wealth & Legacy → card 04** — *"How to provide for a dependant who will always need support"*
Replacing: The wheelchair user reads Malay

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian adult woman who uses a wheelchair, her elderly parent, and a Chinese Malaysian advisor.

SCENE: The family's accessible home. The three of them at a table actively planning long-term support, an open notebook and an organised folder between them. The wheelchair is fully visible and the woman is engaged and independent — she is part of the conversation, not its subject. Warm, dignified, hopeful. All three comfortably inside the frame.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### 7 · `legacy-05-records.jpg`

**Wealth & Legacy → card 05** — *"Whether my family would know what to do, and where to find things"*
Replacing: Malay — hijab

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian older couple and their adult daughter.

SCENE: A home study. The daughter is taking an organised document folder from a low shelf as her father indicates where it lives; her mother watches. Discreet coloured tabs with no readable words, house keys and a notebook on a nearby desk. All three visible. Clearly about a family knowing where the records are.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### 8 · `need-family-card.jpg`

**Homepage need card · Solutions hub · Planning → card 02** — *"Protecting your family / the years between stopping work and needing care"*
Replacing: Malay — hijab. Renders on THREE pages including the homepage

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian family across three generations — grandparents, two parents, a school-age child.

SCENE: At home around the dining table after a meal, mid-conversation. Ordinary domestic warmth, nobody performing for the camera, the room lived-in rather than styled. This is the picture that introduces 'protecting your family' on the homepage, so it has to read as an ordinary family at ease.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### 9 · `need-health-card.jpg`

**Homepage need card · Solutions hub · Medical hero · Wealth → card 01** — *"Medical & health preparation"*
Replacing: Malay — hijab. Renders on FOUR pages including the homepage

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: Three Chinese Malaysian women: two family members and a healthcare professional.

SCENE: A calm, bright consultation room in a Malaysian private clinic. The two family members sit together; the professional leans in, explaining something with an open hand, a tablet resting on her knee. Collaborative, unhurried. A discreet generic medical cross, no readable signage, no branding.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### 10 · `need-legacy-card.jpg`

**Homepage need card · Solutions hub · Wealth hero** — *"Wealth & legacy"*
Replacing: Indian family. Renders on THREE pages including the homepage

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian family across two generations — an older couple and their adult children.

SCENE: At home in the living room, looking through a folder of documents and old family photographs together on a low table. Unhurried and affectionate, the older generation doing the explaining. Papers and photographs visible in structure but nothing readable.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### 11 · `need-community-card.jpg`

**Solutions hub** — *"the community / gathering card"*
Replacing: Outdoor café crowd with hijabs visible in the background

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A group of Chinese Malaysian adults of mixed ages.

SCENE: An open-air café or community space in Kuala Lumpur, a group of six or seven seated around two tables in conversation, greenery and daylight. Seen from a little distance — this is a scene, not a portrait. Relaxed and social.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### 12 · `family-02-mortgage.jpg`

**Protecting your family → card 02** — *"A mortgage signed, with 20 or 30 years still to run"*
Replacing: A white / Western couple — not Malaysian at all

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian couple in their early thirties.

SCENE: A mostly empty apartment they have just taken on. Unopened boxes, bare walls, no curtains yet. One stands at the window looking out; the other is crouched over a box, pausing. Quiet, a little daunted, hopeful. No keys held up to camera, no estate agent, no celebration.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### 13 · `income-01-repayments.jpg`

**Protecting your income → card 01** — *"The loan repayments that continue regardless"*
Replacing: A white / Middle Eastern man — not Malaysian at all

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian man in his thirties, alone.

SCENE: Early morning at his kitchen table, a mug beside him, reading a single sheet of paper with a steady expression. The room is ordinary and lived-in. Sober and level — a man looking at a number that is not going to change, not a man in crisis. The paper shows ruled structure but no readable words.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


---

## The real photography — flagged, but not a prompt

The other 19 images are the client's own: `hero-team`, `team-gathering`,
`team-outdoors`, `team-office`, `team-offsite`, `team-award`, `team-welcome`,
`team-table`, `dva-team`, `dva-award-night`, `dva-forum`,
`community-gathering`, `community-group`, `youth-session`, `youth-resources`,
`youth-workshop`, `services/shared-meal`, and the two founder portraits.

Looked at all of them. The practice photographs as overwhelmingly Chinese
Malaysian already — but several of the large group shots include a handful of
colleagues who read as Indian or Malay: `dva-team`, `dva-award-night`,
`team-outdoors`, `team-gathering`, `team-welcome` and `community-gathering`
among them.

**These cannot be regenerated.** They are photographs of real, identifiable
people who work there. Changing them would mean one of two things:

1. **Choosing different real team photographs that happen not to include those
   colleagues.** The Drive folder holds 22 files and I have seen all of them;
   there is no set that shows the practice without them.
2. **Cropping them out of the frame.** This runs directly into the client's
   own standing rule, which is in this repo verbatim: *"For D'Life images
   NEVER crop out someone, must adjust it to include everyone on the picture,
   or DON'T use it."*

So I have flagged them and stopped there. Removing named employees from their
employer's website on the basis of ethnicity is a decision with consequences
well outside a photo swap, and it is not one I will take from an instruction
about stock imagery. If that is genuinely what the client wants, I would want
it asked and answered explicitly, and I would want the client — not the
agency — to be the one who decides it.

There is also a plain practical point. The generated stock is going all-Chinese
while the real team photographs on About, Careers, DVA and Stories are not.
A visitor who scrolls from one to the other sees both. That mismatch is the
argument for leaving the team photography exactly as it is.

---

## Installed, 16 Sep 2026

All thirteen arrived and are in. Every frame measured at 375, 1280 and 1440
across the seven pages that carry them, every crop masked and looked at:
**no photograph loses a person at any width.** Twelve old files retired.
28.0 MB of PNG in, 3.0 MB of JPEG out. Provenance per file, with the measured
crops, is in `docs/dlife-asset-map.md`.

The nineteen real D'Life photographs below are untouched, and the question
under them is still open.

## What happened when the 13 arrived

Same as every batch: installed as JPEG q82 progressive, every frame measured
at 375, 1280 and 1440, every crop masked and looked at before it ships, and a
provenance row per file in `docs/dlife-asset-map.md`. Three of these
(`need-health`, `need-family`, `need-legacy`) render on the homepage, so those
get a contrast check against the card washes as well.
