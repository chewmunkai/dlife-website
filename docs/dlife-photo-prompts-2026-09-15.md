# Photo prompts — 15 Sep 2026

Four images. **Each block is complete — paste one block, get one image.**

Save under the exact filename in the heading, put all four in one folder, tell
me the path. I install, measure every crop, mask what each frame discards, and
look at it before it ships.

## What these replace

| # | Filename | Replaces | Where it renders |
|---|---|---|---|
| 1 | `family-01-newborn.jpg` | `hero.jpg` | Protecting your family → card 01 |
| 2 | `legacy-02-fairness.jpg` | `hero.jpg` | Wealth & Legacy → card 02 |
| 3 | `closing-next-step.jpg` | itself | The next-step band, **all ten pages** |
| 4 | `future-05-start.jpg` | `path-career-wide.jpg` (interim) | Planning → card 05 |

`hero.jpg` — the dated stock shot of a family at a glass dining table — is the
photograph the client marked. It renders in exactly **two** places, both of
them cards, and prompts 1 and 2 are those two. It is *not* the homepage hero
(that is `hero-team.jpg`), so nothing else changes when it goes.

Prompt 4 exists because card 05's photograph was promoted to the Planning hero
today; the slot is on a placeholder until this arrives.

## Ethnicity

Every prompt below asks for **Chinese Malaysian** subjects, per the client.

One factual note, not an objection: the site's *real* photography — the team
shots on About, Careers, DVA and Stories, which come from the client's own
Drive — shows a visibly multi-ethnic practice. Generated stock that is
uniformly Chinese sits next to those. The client knows their market; just be
aware the two sets will not match, and that the decision is visible on the
pages that carry both.

The Planning hero installed today already shows East Asian subjects, so it is
consistent with this without being regenerated.

## Size

**1536 × 1024** — the landscape size this generator actually produces. Do not
ask for 16:10 or a custom ratio: it is not a supported output and you get
either a silently different shape or bars baked into the picture. The frames
crop from 3:2 and the margins below account for it.

---

## 1 · `family-01-newborn.jpg`

Card copy: *"A first child, or a second, and the household now depends on 1 or 2 incomes."*

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian couple in their late twenties and their newborn baby.

SCENE: Morning at home in a modest Malaysian apartment. One parent holds the sleeping newborn against their shoulder; the other sits close by with a mug of tea, mid-sentence. Tired and tender rather than joyful. Unfolded laundry and ordinary domestic clutter in shot — this is a real room, not a show home.

FRAMING: Both adult faces and the baby fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

## 2 · `legacy-02-fairness.jpg`

Card copy: *"How to be fair between children in different circumstances."*

Harder than it looks: the subject is two adult children whose lives have gone
differently, and a parent thinking about that. It has to read as *difference*
without reading as failure — no one is the disappointing one.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian mother in her sixties and her two adult children, a man and a woman in their thirties.

SCENE: Late afternoon at the family home, the three of them around the dining table after a meal. The mother is listening to one of them while glancing toward the other — her attention divided, gently. The two adult children are dressed differently from one another, one plainly and one more formally, suggesting lives that have gone in different directions. Warm and unstrained; a family talking, not a family arguing.

FRAMING: All three faces fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. No documents, no money, no paperwork. Fictional people resembling no real individual.
```

## 3 · `closing-next-step.jpg` — the CTA band

This is the one the client called a good idea. It is the ground of the
next-step card on **all ten pages**, so it is the most-seen photograph on the
site.

**The composition brief has changed, and it matters.** Measured on the live
site: this card's frame is its own copy box, so it is **3.14 at 1440** and
**0.54 — portrait — at 375**. On a phone it keeps only the right **36%** of
the picture's width. The current image spreads seven people across the middle,
so three of them fall outside the phone crop. The fix is composition, not CSS:
put a **smaller group in the right third**, and everybody survives at every
width.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian family of four across three generations — a grandmother, two parents in their forties, and a teenage child.

SCENE: Early evening at home, the four of them gathered close together at one end of a long dining table, mid-conversation over tea. The meal is finished. A warm lamp behind them, the last daylight at a window. Unhurried and open.

FRAMING — read this carefully, it decides whether the picture works:
· Place all four people in the RIGHT THIRD of the frame, grouped close together, no further left than 65% across. They must all sit inside the rightmost 35% of the image.
· The LEFT HALF of the frame is the room and nothing else: an empty chair, the table running away from camera, a lamp, a plain wall. No faces, no busy detail, no strong highlights there — website text is laid over it.
· Expose the whole image mid-tone and slightly dark, never bright or high-key: pale type has to stay readable over the left side.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

## 4 · `future-05-start.jpg`

Card copy: *"Whether it is too late to start, or too early to bother."*

Must not repeat the Planning hero, which is now two people of different
generations at a table with a notebook. This one is a single subject.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: One Chinese Malaysian woman in her forties, alone.

SCENE: She is standing at a window at home in the late afternoon with a mug of tea, not looking at anything in particular — the pause in the middle of an ordinary day when a long-postponed thought surfaces. Behind her the room is lived-in and calm. Thoughtful and unresolved rather than sad or decided. No desk, no paperwork, no calculator, no phone.

FRAMING: Her face and upper body fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

---

## What I do when they arrive

1. Install as JPEG quality 82 progressive — 2 MB of PNG becomes ~200 KB with no
   visible change at card size, and the September audit cut the site's image
   weight from 40 MB to 12 MB doing exactly this.
2. Measure every frame the image lands in, at 375, 1280 and 1440.
3. **Mask the bands each frame discards and look at the result.** The standing
   rule is that no D'Life photograph may have a person cropped out of it, and a
   percentage alone does not answer that — a 30% crop that loses backdrop is
   fine and a 40% crop that takes someone's head is not.
4. For the CTA band specifically: re-measure contrast by compositing the new
   picture's own pixels under the card's scrim. The current one holds 13.8:1
   against the 95th-percentile brightest pixel; AA needs 4.5:1.
5. Provenance rows in `docs/dlife-asset-map.md`.
