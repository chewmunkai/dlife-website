# Photo prompts — 21 Sep 2026

Nine images. Paste one block into ChatGPT image generation, get one picture.
Save each under the **file name in its heading** and drop them all in
`~/Downloads`, same as last time.

All nine are **1536 × 1024 landscape** — the only landscape size the generator
actually makes. The LOOK and NEVER paragraphs are byte-identical in every
block so the whole set reads as one shoot.

---

## Read this before you generate anything

**Five of the items on the ethnicity list are already done.** They are sitting
in commit `61bf000`, which has never been pushed, so the live site still shows
the old pictures and the client is reviewing a five-day-old version of the
page. Do not regenerate these:

| Client's note | Slot | Status |
|---|---|---|
| "Protecting Your Family 03 (aging parents…)" | Family 03 | ✅ replaced — `family-03-sandwich.jpg` |
| "Planning 02, because there's malay" | Planning 02 | ✅ replaced — `need-family-card.jpg` |
| "Wealth hero, it's indian family now" | Wealth hero | ✅ replaced — `need-legacy-card.jpg` |
| "Wealth 01, malay family" | Wealth 01 | ✅ replaced — `need-health-card.jpg` |
| "Wealth 05, malay" | Wealth 05 | ✅ replaced — `legacy-05-records.jpg` |

Pushing that commit resolves all five without generating a thing.

**May Yee's video is already removed** — from the homepage reel, Stories,
Careers and Resources, plus her `.mp4` and poster deleted. Verified: her name
returns no match anywhere in the built site.

**Her photograph is not**, and that is what prompts A1–A3 are for.
`policy-review.jpg` is a still frame from her own video — same face, same
burned-in subtitles — and it renders on **four** pages, not the three in the
brief: the homepage "Existing policyholders" section, the Existing Policy
Support hero, the Articles template, **and Resources**. It also sits in two
currently-dormant config blocks (`solutions-e2.ts` lines 177 and 230) that
would put her back on screen if those blocks are ever switched on. All of it
goes when A1–A3 land.

---

## Part A — replacing May Yee (4 images)

A note that affects composition: the current file is **portrait, 1080 × 1440**,
dropped into landscape frames. It is losing 31% of its height on the Existing
Policy hero and **50% on the Resources card** — half the picture is thrown
away today. A 1536 × 1024 landscape file fixes that outright: the Resources
card is exactly 1.5, so the crop there goes to zero.

A1 and A2 are deliberately **different scenes**. They sit on two pages about
the same subject, and one picture doing both jobs is what produced the
"03 cuz its repeated" complaint elsewhere.


### A1 · `policy-homepage-review.jpg`

**Homepage → "Existing policyholders"** — *"Need clarity on your current coverage?"*
Replacing: a still of May Yee from her video.
Frame is 720×628 at 1440 and crops **23% off the width**, so this one needs
its subjects well in from the sides.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian couple in their forties and a Chinese Malaysian advisor in her thirties.

SCENE: At the couple's own dining table. They have brought out a policy document they have owned for years — a worn paper wallet, a few loose pages — and the advisor is reading it with them rather than presenting anything of her own. She has nothing in front of her but the client's own paperwork. The mood is relief at finally understanding something, not a sales meeting. No laptop, no brochure, no branded folder.

FRAMING: Every face and all key objects fully inside the central 70% of the frame — the outer sixth of each side will be cropped away. Leave clear headroom.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### A2 · `eps-hero-clarity.jpg`

**Existing Policy Support → hero** — *"Understand the protection you already have… wherever you bought it, and with no obligation to change anything."*
Replacing: the same May Yee still.
Frame is 720×660 at 1440 and crops **27% off the width** — the tightest of the
four. Compose centrally.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian man in his fifties and a Chinese Malaysian advisor in his forties.

SCENE: Two men side by side at a table, both looking down at the same open policy schedule. The client's finger rests on one clause; the advisor is mid-explanation, open-handed, unhurried. They are on the same side of the table and the same side of the problem. The document shows ruled structure but no readable words. Quiet, adult, no urgency.

FRAMING: Every face and all key objects fully inside the central 70% of the frame — roughly the outer seventh of each side will be cropped away. Leave clear headroom.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### A3 · `article-policy-schedule.jpg`

**Articles thumbnail + Resources card** — the article is *"How to read your own policy schedule"*
Replacing: the same May Yee still, which loses **half its height** in this card today.
This frame is exactly 1.5, so a 1536×1024 file crops to **zero**. Single
subject, because it sits in a small card.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian woman in her thirties, alone.

SCENE: At a desk at home, reading a multi-page policy schedule properly for the first time — one page held up, the rest squared off beside her, a pen resting on top, a mug going cold. Concentrated and capable, working something out rather than struggling with it. The pages show ruled structure and table lines but no readable words.

FRAMING: Every face and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### A4 · `contact-conversation.jpg`

**Contact → hero** — *"Tell us what you need. We will read it, work out who should answer, and come back to you."*
Replacing: `team-table.jpg`.

**On the Drive question.** I went through all 22 files in the client's folder on
15 Sep. Every one is group or event photography of the practice's own people —
there is no lifestyle imagery in there at all. This page has now carried four
photographs and the client has turned down all four: a stock still of one man,
then `team-office`, then `team-gathering`, now `team-table`. Three of those
four were Drive group shots. A fifth group shot is very likely to be turned
down for the same reason, and there is a second problem — any team photograph
in that folder may contain May Yee, and she cannot be cropped out under the
client's own never-crop rule. **So: generate.** The folder has changed once
before without notice (44 files in August, 22 in September), so if you want me
to re-open it in the browser and look again, say so and I will.

The rejections all share a shape: they show *the practice*, lined up. This
brief shows *the conversation* instead — which is what the page is actually
asking someone to start.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: Two Chinese Malaysian women — one in her forties who has come to ask something, one in her thirties listening.

SCENE: A bright, plain meeting room or a quiet corner of a café. The one who came to ask is mid-sentence, hands describing something; the other is genuinely listening — leaning in, not writing, not selling, notebook closed on the table between them. Two mugs. The photograph is about being heard. Warm and ordinary. No laptop open, no paperwork spread out, no lineup of colleagues, no office signage.

FRAMING: Both faces and all key objects fully inside the central 80% of the frame.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

---

## Part B — the service cards (5 images)

All five sit in the same card frame: 396×248 at 1440, which crops **6.3% off
the bottom** and nothing else. Keep feet, hands and anything that matters out
of the bottom eighth.

Each one is written to the caption printed on its own card, which is why they
are all different scenes — the "repeated" complaint on Planning 03 was correct
and is fixed here.


### B1 · `income-03-one-income.jpg`

**Protecting your income → card 03** — *"Whether a partner's income could carry the household alone"*
Replacing: `inc-askhelp.jpg`, which the client does not like.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian couple in their thirties.

SCENE: Late evening at the kitchen table after the children have gone to bed. One of them is working down a column of household costs with a pen; the other sits close, watching the same page, one hand flat on the table. They are working out whether one salary could hold this up. Serious and united, not arguing, not distressed. The paper shows ruled structure but no readable words.

FRAMING: Every face and all key objects fully inside the central 80% of the frame, and nothing that matters in the bottom eighth.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### B2 · `income-04-what-comes-first.jpg`

**Protecting your income → card 04** — *"What you would want to protect first, and what could wait"*
Replacing: `inc-priorities.jpg` — a hand writing in a notebook, which the client
calls not relevant. It is also abstract where every other card on the page has
people in it.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian couple in their forties.

SCENE: At a dining table, sorting a month of household paperwork into two separate piles — one they are keeping close, one they are pushing to the side. A hand rests decisively on the nearer pile. This is a photograph about choosing what comes first. Calm and deliberate. The papers show ruled structure and folded creases but no readable words.

FRAMING: Every face and all key objects fully inside the central 80% of the frame, and nothing that matters in the bottom eighth.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### B3 · `income-05-asking.jpg`

**Protecting your income → card 05** — *"Who you would have to ask for help, and how that would feel"*
Replacing: `close-conversation.jpg`, which is generic and also used elsewhere.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian man in his thirties and his elderly mother.

SCENE: The mother's living room. The son has come to ask for help and has not managed to say it lightly — he is sitting forward, hands together, looking at the floor mid-sentence. His mother is turned fully towards him, listening, one hand near his arm without taking it. The difficulty of asking is the subject. No money on screen, no documents, no tears, no embrace.

FRAMING: Both faces and all key objects fully inside the central 80% of the frame, and nothing that matters in the bottom eighth.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### B4 · `future-01-is-epf-enough.jpg`

**Planning for your future → card 01** — *"Whether EPF alone will be enough, and what 'enough' even means"*
Replacing: `fut-epf.jpg`.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian couple in their early fifties.

SCENE: At home in the late afternoon, sitting together with a single printed retirement statement between them. One holds it; the other has stopped to think, looking past it rather than at it. The question in the room is whether the number on that page is enough. Sober and thoughtful, not anxious, not defeated. The statement shows ruled rows but no readable figures.

FRAMING: Both faces and all key objects fully inside the central 80% of the frame, and nothing that matters in the bottom eighth.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```


### B5 · `future-03-inflation.jpg`

**Planning for your future → card 03** — *"What inflation does to a fixed sum over 20 years"*
Replacing: `inc-savings.jpg` — coins in a glass jar. **The client is right that it
is repeated**: the identical file is also Protecting-your-income card 02, so the
same jar appears twice across two pages. This brief is deliberately a scene
with a person in it rather than a second still life.

```
Create one photorealistic editorial photograph, 1536x1024 landscape, for a Malaysian financial advisory website.

LOOK: Warm natural daylight from a window, soft and directional. Muted palette — cream, sand, deep olive-green, warm timber, one small note of terracotta. 35mm lens at f/2, shallow but not blurry, fine natural film grain. Unposed documentary framing: people caught mid-action, nobody looking at the camera. Realistic skin texture, anatomically correct hands.

PEOPLE: A Chinese Malaysian woman in her sixties, alone.

SCENE: A Malaysian neighbourhood grocer or morning market, warm daylight under an awning. She has a small basket with a modest amount in it and has paused, purse open in one hand, doing the arithmetic before she picks up one more item. Produce and everyday goods around her, greenery at the edges. This is what a fixed sum buying less looks like, twenty years on. Dignified and matter-of-fact — not poverty, not distress.

FRAMING: Her face and all key objects fully inside the central 80% of the frame, and nothing that matters in the bottom eighth.

NEVER: No lettering, numbers, signage, labels, handwriting or watermarks anywhere — including on paper, screens, packaging, walls and clothing. No logos or brand marks of any kind. No insurance or financial branding. No collage, borders, frames, insets or split-screens: one single continuous photograph filling the frame. No studio backdrop. No stock-photo grins, no thumbs-up, no handshake. Fictional people resembling no real individual.
```

---

## Re-audit, 21 Sep — four things the list misses

Swept all **49 photographs** the branch renders, by placement count and by
perceptual hash rather than by filename. The nine prompts are all justified and
nothing on the list is unnecessary. But the list is not complete.

**1. Two photographs are on the site twice under different names.** A 16x16
average hash finds them at Hamming distance **0** — same picture, same
dimensions, re-encoded:

| Pair | Renders on | Fixed by our list? |
|---|---|---|
| `services/shared-meal.jpg` = `team-table.jpg` | Protecting-your-family **hero** + Contact **hero** | ✅ yes — A4 replaces the Contact copy, which un-duplicates it |
| `hero-team.jpg` = `team-offsite.jpg` | Homepage + About + Stories | ❌ **no — nothing on the list touches this** |

A filename check never catches these. This is the same defect the client
flagged as "03 cuz its repeated", and there are two more of it.

**2. `close-conversation.jpg` stays on the homepage.** B3 replaces the
Protecting-your-income copy, but the file also fronts the homepage closing
section, and that copy is untouched. Two things about it want a decision: the
man in it does not clearly read as Chinese Malaysian, and there is a legible
café brand mark on the window behind him — the kind of thing every generated
prompt in this repo explicitly forbids. If he is a real D'Life advisor rather
than stock, he belongs in the group-photography question instead.

**3. `need-health-card.jpg` renders on four pages** — homepage need card,
Solutions hub, Medical **hero** and Wealth card 01. One picture doing four
jobs. This is inherited from `need-health-malaysia.jpg`, which had exactly the
same spread, so it is not new — but given the client has just flagged a
two-page repeat, a four-page one is likely the next note. `need-family-card`
and `need-legacy-card` are each on three.

**4. `services/generated/policy-review.jpg` renders twice** — Protecting-your-
family 05 and Medical 01. Deliberate when it was briefed, but it is the same
repeat pattern.

### What the sweep did NOT find

No missed ethnicity problems. Every photograph in the generated and stock set
that is not already on the amendment list reads as Chinese Malaysian or has no
identifiable subject: `need-income-malaysia` (a couple at a laptop, on the
homepage), `path-career`, `fut-education` (subject seen from behind),
`hospital-access`, `employment-cover`, `medical-history`, `starting-a-plan`,
and the three installed on 15 Sep. `close-conversation` above is the one
borderline call, and it is a judgement for the client rather than a finding.

The five items already fixed in `61bf000` were re-verified as actually
rendering the new files, not just renamed in source.

## What I cannot solve with an image

**The replacement film.** "What Real Guidance Looks Like" was the library's
only client-guidance story and it is now gone. That leaves two films on a
homepage section called "stories", and no image generator makes video. A
replacement has to be **shot** with another advisor. Until then the reel
divides itself between two, which works but is thin.

**Whether May Yee is in the group photography.** She may appear in the team,
DVA, Youth and community photographs on About, Careers, DVA, Stories and
Contact. I compared her video still against `team-table.jpg` and could not
make a confident identification from a different angle and expression — and
guessing wrong means either leaving her up or pulling a photograph that is
fine. **You or the client can settle this in seconds.** Send me the list and
I will act on it. Note in advance that the client's own standing rule —
*"NEVER crop out someone… or DON'T use it"* — means any group photo she is in
has to be replaced whole, not cropped around her.

## What happens when the nine arrive

Same as every batch. Installed as JPEG q82 progressive, every frame measured at
375, 1280 and 1440, every crop masked and looked at before it ships, and a
provenance row per file in `docs/dlife-asset-map.md`. A1 and A2 land in the two
tightest frames on the site after the solution heroes, so those two get the
closest look.
