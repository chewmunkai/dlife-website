# Photo generation pack — T02–T06, T08 (14 Sep 2026, rev 2)

Twelve images. **Each block below is complete — paste one block, get one
image.** Nothing needs stitching together.

Save each under the exact filename in its heading, put all twelve in one
folder, and tell me the path. I crop, place, re-run the crop-mask and overflow
checks and update the asset map.

## Why all twelve are generated

The client's Drive folder "Website (Group Photo)" was re-read on 14 Sep: **22
files, every one of them group or event photography of D'Life's own people** —
award nights, offsites, restaurant tables, a stage, a pool. No family at home,
no couple moving house, no ageing parent, no advisor reading a document with a
client. (It held 44 when the asset map was written; the client changed it on
31 Aug.) So D3's "Drive first, generate the gaps" resolves to generating all
of them.

## What changed in rev 2

| Was | Now | Why |
|---|---|---|
| `EXACT 16:10, 1536x960` | `1536x1024` (3:2) | **16:10 is not a size this generator makes.** It does 1024×1024, 1536×1024, 1024×1536. Asking for 16:10 gets it ignored, or gets bars baked into the image. I crop 3:2 → 16:10 on placement; the 6.7% that comes off the height is inside the safety margin below. |
| One "central 80%" rule for everything | Per-slot framing rules | The hero plates crop toward square and keep only ~66% of a 3:2 width. Cards keep all of it. Those need different margins. |
| Look described loosely | One identical LOOK paragraph, verbatim in all twelve | Twelve prompts in twelve chats drift in grade and lens. Identical wording is what makes them read as one shoot. |
| "Malaysian people" | Ethnicity assigned per image | Malaysia is Malay, Chinese and Indian. Twelve independent "Malaysian" prompts collapse to whatever the model defaults to. Assigned deliberately below — 4 Malay-led, 4 Chinese-led, 3 Indian-led, 1 hands-only. Change any of them if the client has a view. |
| "No insurer branding" | No brand marks on anything, clothing included | A logo on a polo shirt breaks `content/solutions.ts`'s no-insurer rule as surely as a sentence does — and the founders' AIA blazers are already an open question on this site. |
| "No text overlays" | Names the surfaces | Image models leak lettering onto paper, screens and walls unless you list them. |

---

## T02 · Contact page hero — `contact-hero.png`

Replaces `team-table.jpg`. This hero is on its fourth photograph — a stock
still of one man, then `team-office.jpg`, then `team-gathering.jpg`, then the
dim-sum table, all turned down. The common factor in all four rejections is
that every one was a **group lineup**. This page is about one person asking for
help, so this brief is deliberately two people.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian woman in her thirties and an Indian Malaysian man in his forties.

SCENE: The two of them at a small café or office table, mid-conversation. She is asking something; he is listening and writing a short note. Unhurried, warm, equal footing — a conversation between two adults, not a sales meeting. No laptop dominating the table, no fanned-out paperwork. Two cups.

FRAMING: Both faces fully inside the central 60% of the width and the central 80% of the height — this image is cropped toward square.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

## T03a · Protecting your family, hero — `family-hero.png`

Both solution heroes currently share one file, which is how a single rejection
took out two pages. Splitting them.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Malay family of four — two parents in their thirties, a school-age child, a toddler.

SCENE: Early evening at home, the four of them around the dining table after a meal. Plates not yet cleared. One parent is listening to the child; the toddler is occupied with something of their own. Ordinary domestic warmth, nobody performing. The room is lived-in rather than styled.

FRAMING: All four faces fully inside the central 60% of the width and the central 80% of the height — this image is cropped toward square.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

## T03b · Planning for your future, hero — `future-hero.png`

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian couple in their early fifties.

SCENE: Late afternoon on the veranda of their own home, or in the living room beside an open window with a long view out. Relaxed, mid-conversation, a pot of tea between them. Settled and unhurried. This is about having time ahead of you — not about money, and no money or documents are present.

FRAMING: Both faces fully inside the central 60% of the width and the central 80% of the height — this image is cropped toward square.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

## T04 · Planning card 05 — `future-05-start.png`

Card copy: *"Whether it is too late to start, or too early to bother."*

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: An Indian Malaysian man in his late twenties and his mother in her sixties.

SCENE: The two of them at a kitchen table, both working on the same open notebook and a simple wall calendar. Neither is leading — they are equally involved, heads at the same height. The notebook is blank paper. Calm and practical, the beginning of something rather than a correction of something.

FRAMING: Both faces and the notebook fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

## T05 · "5 signs it's worth having this conversation" — five cards

All five, not the three in the client's screenshot: card 01's photo is also
`CLOSING_PHOTO` and goes regardless, and cards 04–05 left as the old generated
scenes beside three new ones would read as a mismatched set.

### 01 — `family-01-newborn.png` · *"A first child, or a second, and the household now depends on 1 or 2 incomes"*

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian couple in their late twenties and a newborn baby.

SCENE: Morning at home. One parent holds the sleeping newborn; the other sits close by with a cup of tea, mid-sentence. Tired and tender rather than joyful. Unfolded laundry and ordinary domestic clutter in shot. Small apartment, not a show home.

FRAMING: Both adult faces and the baby fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

### 02 — `family-02-mortgage.png` · *"A mortgage signed, with 20 or 30 years still to run"*

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Malay couple in their early thirties.

SCENE: A mostly empty apartment they have just taken on. Unopened boxes, bare walls, no curtains yet. One of them stands at the window looking out; the other is crouched over a box, pausing. Quiet, a little daunted, hopeful. No keys held up to camera, no estate agent, no celebration.

FRAMING: Both faces fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

### 03 — `family-03-sandwich.png` · *"Ageing parents who may need support, at the same time as young children"*

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: An Indian Malaysian woman in her forties, her elderly father, and her young daughter.

SCENE: Home, late afternoon. The woman is between the two generations at one table — passing a cup to her father with one hand while her daughter shows her something with the other. She is attending to both at once. Warm, ordinary, slightly stretched. All three faces clearly visible.

FRAMING: All three faces fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. No medical props or mobility aids. Fictional people resembling no real individual.
```

### 04 — `family-04-bereaved-friend.png` · *"A friend or colleague's family going through something difficult"*

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: Two Malay women in their forties.

SCENE: A doorway or a quiet kitchen. One has brought food in a stacked tiffin carrier and is handing it over with both hands; the other receives it. A brief touch on the forearm. Restrained sympathy — the gesture carries it. No tears, no embrace, no hospital, no funeral props, no black clothing.

FRAMING: Both faces and the tiffin carrier fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

### 05 — `family-05-old-policy.png` · *"A policy bought years ago that nobody has looked at since"*

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian man in his fifties, alone.

SCENE: He has taken an old ring-binder out of a cupboard and opened it on the dining table for the first time in years — slightly dusty, corners soft with age. He is turning a page, curious rather than anxious. The cupboard door still open behind him. Paper structure visible; the pages carry no readable writing.

FRAMING: His face and the open folder fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

## T06 · The next-step band, site-wide — `closing-next-step.png`

This one photograph is the ground of **all ten** next-step cards. Ivory type
sits over its left side under a scrim, and the current image measures 9.9:1
against that wash — the replacement has to hold AA, which is why the exposure
and the quiet left third are in the brief rather than left to chance.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A mixed group of six or seven across three generations, Malay and Chinese Malaysian together.

SCENE: Around a long table at home in the late afternoon, seen from a little distance — nobody close to camera. Food has been eaten; people are talking across the table. Warm lamplight beginning to matter as the daylight drops. Open and unhurried.

FRAMING: Keep the LEFT THIRD of the frame free of faces and busy detail — it sits under overlaid text. Put the group right of centre. Expose the whole image mid-tone and slightly dark, never bright or high-key: pale type has to stay readable over it.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

## T08a · Existing Policy Support hero — `policy-clarity-hero.png`

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Malay woman in her forties and a Chinese Malaysian advisor in her thirties.

SCENE: Side by side at a wooden table, both looking down at the same printed document. The client's finger rests on one line; the advisor is mid-explanation, open-handed. Collaborative and unhurried — they are on the same side of the table and the same side of the problem. The document shows ruled structure but no readable words. No branded folder, no brochure, no laptop.

FRAMING: Both faces fully inside the central 60% of the width and the central 80% of the height — this image is cropped toward square.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

## T08b · "How to read your own policy schedule" article card — `policy-schedule-card.png`

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing, realistic skin texture, anatomically correct hands.

PEOPLE: Two pairs of adult hands only — one lighter, one darker skin tone. No faces in frame.

SCENE: Overhead-angled close view of a printed benefits schedule lying on a wooden table. One hand rests flat on the page, the other traces down a column with a pen. A cup of tea to one side, reading glasses folded nearby. The page shows clear ruled rows and columns and blocks of grey texture where type would be, with nothing readable. Calm and instructional.

FRAMING: Hands and document fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on the document, packaging, walls and clothing. The page must carry structure without a single legible character. No logos or brand marks of any kind. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No stock-photo styling. Fictional hands resembling no real individual.
```

---

## What I check when they come back

Per the standing crop rule, a ratio number alone is not enough — I mask the
bands each frame discards and look at the result, at 375, 1280 and 1440.
Plus: no horizontal overflow on any touched route, AA contrast re-measured on
the closing band against its own wash, and a provenance row per file in
`docs/dlife-asset-map.md`.

## Still needs the client — the Sharon Lau photo

One file received, 1706x2560: a full-length studio portrait on a plain white
backdrop, standing, no context. Both T08 slots are landscape and contextual.
There is no landscape crop of a standing full-length studio shot that holds a
person at a usable size — dropping it into either reproduces exactly the defect
T07 has just corrected on Rachel.

1. **Ask for two or three more frames of her**, in a setting rather than a
   studio, landscape or croppable to it. The only option that does what the
   annotation asks.
2. **Give her a portrait-shaped placement** — crop what we have to
   head-and-shoulders and add one portrait plate to the page, an advisor's note
   beside the FAQ. Costs one new block, slightly beyond the PDF.
3. **Leave her off this page** and use the portrait where a portrait next
   belongs. Honest, but it ignores a direct instruction.
