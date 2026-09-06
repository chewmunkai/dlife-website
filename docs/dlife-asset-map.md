# Photography — what was chosen, and where it sits (A15)

Source: the client's own Drive folders, supplied 6 Sep 2026.

- **Founders** — "Website (Sharon & Rachel)", folder `16FxFmaFaJfz…`. Two files,
  `SHARON.jpg` (4000×6000) and `RACHEL.jpg` (3719×5578).
- **Group** — "Website (Group Photo)", folder `1pj3yQxKUfIT…`. 44 files; 28 were
  readable and were reviewed as a contact sheet before any was chosen.

Every founder mapping below is **by filename**, never by looking at the two
photographs and deciding which woman is the older sister. Map any future
portrait the same way.

## Founders

| Where | File | Source | Crop | Desktop | Mobile |
|---|---|---|---|---|---|
| About → Sharon Cheang | `founder-sharon.jpg` | `SHARON.jpg` | top 83% of frame, full width → 1400×1750 (4:5) | `50% 22%` | same |
| About → Rachel Cheang | `founder-rachel.jpg` | `RACHEL.jpg` | x 15–90%, y 6–68% → 1400×1749 (4:5) | `50% 25%` | same |

Both plates are `aspect-ratio: 4/5`, so the exported files are cut to 4:5 and
`object-position` only fine-tunes. Neither crop touches a face.

Rachel's supplied frame is full-length standing. At plate size that left her a
small figure in a wide field of backdrop, so the export is head-to-upper-thigh
— a portrait crop, not a face crop.

> ⚠️ **Launch decision, not a design one.** Both portraits are studio shots in
> AIA MDRT blazers, with the AIA wordmark and the MDRT roundel legible on the
> lapel. Nothing else on this site names an insurer — `content/solutions.ts`
> forbids it outright — so whether D'Life wants insurer branding on its
> founders' portraits needs the client's answer. The alternative is a
> re-shoot, not a retouch.

## Group photography

Exported at 1800px on the long edge, quality 82, progressive. Nothing is
upscaled: two files are smaller than that because their originals are
(`team-office.jpg` 1280×960, `youth-group.jpg` 810×1080), and both are used in
plates rather than full-bleed for that reason.

| File | Source | What it is | Used at | Desktop | Mobile |
|---|---|---|---|---|---|
| `team-award.jpg` | g11 · 2048×1536 | Advisors and managers seated at a recognition event | About → Recognition; homepage → DVA panel | `50% 42%` / `50% 38%` | inherits |
| `team-gathering.jpg` | g02 · 2048×1317 | The agency together in an office lounge | About → "Advisors she has built" | `50% 44%` | inherits |
| `team-outdoors.jpg` | g03 · 2048×1536 | The team on an away day, matching jackets | Careers → hero | `50% 46%` | inherits |
| `team-office.jpg` | g18 · 1280×960 | Advisors and managers at the office | Careers → "Could this be you?"; Articles & Events | `50% 42%` | inherits |
| `team-offsite.jpg` | g06 · 2048×1536 | The team relaxed, away from the office | Stories → hero | `50% 40%` | inherits |
| `dva-forum.jpg` | g10 · 1536×2048 | A leadership forum in session, panel on stage | DVA → split shot; Articles & Events | `50% 34%` | inherits |
| `youth-session.jpg` | g17 · 2048×1536 | Youth Community members at a session | Youth → hero, events; homepage | `50% 46%` | inherits |
| `youth-group.jpg` | g19 · 810×1080 | Youth Community members after a session | Youth → takeaways, events; homepage | `50% 38%` | inherits |

`dva-forum.jpg` is the only portrait-orientation source used in a landscape
frame. It is positioned on the stage band rather than centred, so the crop
keeps the panel and the screen and loses the empty ceiling — the people are
where the frame is.

## Contrast, after the swaps

The homepage DVA panel carries copy over its photograph. Measured against the
panel's own radial wash (`styles/dlife.css`, `#dva .panel .bg::after`, 0.72 on
the centre line falling to 0.62 at 45%), the new picture holds ivory type at
**9.9:1** on the mean and **5.7:1** against its 95th-percentile brightest
pixel — both past AA, so the wash was left exactly as it was. Re-run this
check if the picture is ever changed again.

## Not used, and why

- **Two files carry AIA branding on a backdrop or a step-and-repeat** (an "AIA"
  wall and a "Selangor & East Coast Region" board). Excluded for the same
  reason as the founder note above — this site names no insurer.
- **Sixteen of the 44 files could not be read** from the folder listing and
  were never reviewed. If the client expected a specific photograph to appear
  and it has not, it is likely one of those; ask them to name it.
- The remaining reviewed files are restaurant meals, travel snapshots and
  individual selfies. They are real and they are fine, but none of them is
  about the practice in a way any current section needs.

## Still outstanding

- No photograph of the office itself, which is what the Contact page would use.
- No individual advisor portraits, which is what a named roster would need if
  the client ever wants the About team directory back (A08 removed it).
- The solution pages keep their licensed stock photography. It is about the
  visitor's life rather than about D'Life, so client photographs would be the
  wrong substitution there, not a better one.

## The logo (6 Sep 2026)

Source: `D'Life Logo-20260906T090952Z-1-001.zip`. Fourteen files, numbered
rather than named; five of them (`Color/07–12`) are **palette swatches, not
logos** — `#174A45` primary teal, `#1D4B3E` deep green, `#D0BFA9` sand,
`#EFE8DA` cream, `#A88652` leaf gold.

All three horizontal lockups trim to an identical 2890×897 (3.22:1). Two are
dark-on-transparent and one is the cream cut for dark grounds.

| Shipped file | Cut from | Ratio | Used at |
|---|---|---|---|
| `logo.png` | `PNG/D_Life FA Logo-02.png`, wordmark region | 5.02:1 | both headers, on ivory |
| `logo-reversed.png` | `PNG/D_Life FA Logo-03.png`, wordmark region | 5.04:1 | homepage footer; both headers while the menu overlay is open |
| `logo-full.png` | `PNG/D_Life FA Logo-02.png`, whole lockup | 3.22:1 | **not currently placed** — the light-ground counterpart, kept for any large placement on ivory |
| `logo-full-reversed.png` | `PNG/D_Life FA Logo-03.png`, whole lockup | 3.23:1 | the homepage loading curtain |
| `app/icon.png` | `D_Life FA Logo_icon.png`, squared | 1:1, 512px | favicon (replaced the hand-built `app/icon.svg`) |

### Why two cuts rather than one

The supplied lockup sets "IT BEGINS WITH YOU" under the wordmark, and the
tagline is **19% of the artwork's height**. The header renders the mark at
22px, which would put the tagline at **4.1px** — not small type, a smudge. So
the small placements take a wordmark-only cut of the same file and the tagline
appears where there is room for it: the loading curtain, where the mark runs
to 76px and the tagline lands near 13px.

Nothing was redrawn. Both cuts come out of the client's own files, and the
`-reversed` pair is their cream artwork rather than a filtered version of the
dark one.

The wordmark cut is **5.02:1 against the previous logo's 5.04:1**, which is
why no header or footer measurement changed with the swap. Measured after:
110×22 in the header at 1280, 1181 and 375; 135×27 in the footer; 227×70 on
the curtain. No broken images, no upscaling, no page overflow, and the header
still clears its right edge at every width.

### What the logo settled

The tagline is **"IT BEGINS WITH YOU"** — which resolves the slogan question
open since the first round. The page said "Let it begin with you."; the
meeting transcript asked for "Let it begins with you", which is ungrammatical
and was therefore refused. Neither was right: the transcript was a garbled
record of the real brand line. The homepage now reads **"It begins with you."**
to match the mark above it. If the artwork ever changes, match it.

## The standing rule on D'Life photography (6 Sep 2026)

> "For D'Life images NEVER crop out someone — must adjust it to include
> everyone on the picture, or DON'T use it."

This is a hard rule and it is now enforceable rather than a matter of taste.
`Photo.ratio` (components/v2/blocks.tsx) tells a frame to take the
photograph's own shape, so `object-fit: cover` resolves to an exact fit.
Set it on every placement that carries the practice's own photography.

**How to check it.** Run this in the console on any page — it reports the
percentage of each D'Life photograph the frame is throwing away:

```js
[...document.querySelectorAll('img')]
  .filter(i => i.naturalWidth && /founder-|team-|dva-team|youth-session|youth-group|community-group|hero-team/.test(i.currentSrc))
  .map(i => { const r = i.getBoundingClientRect(), n = i.naturalWidth / i.naturalHeight, b = r.width / r.height;
    return { src: i.currentSrc.split('/').pop(), lostPct: +(Math.abs(n - b) / Math.max(n, b) * 100).toFixed(1) }; })
```

Anything above 0 is a photograph with people missing from it. **Check it at
375px as well as at desktop** — the hero passed at 1280 while a fixed mobile
height was resolving the plate's width from it and losing 123px of the
picture on a phone.

**What it was before the sweep**, measured at 1280:

| Page | Photograph | Lost |
|---|---|---|
| Careers | `team-office.jpg` in a 4:5 plate | **40%** |
| Youth | `youth-group.jpg` in a 4:3 card | **44%** |
| About | `team-award.jpg` in a 0.91 plate | **32%** |
| DVA | `dva-team.jpg` in a 1.26 plate | **29%** |
| Careers · Stories · Youth | three heroes at 0.97 | **27%** each |
| Homepage | `hero-team.jpg` at 0.95 | **29%** |
| About | `team-gathering.jpg` | 9% |

All of them are 0% now. The client named three; the sweep found seven more.

**A correction, from the re-audit of 6 September 2026.** The line above was
written from a sweep of the placements that had been named, not of every
image on every page, and "all of them" was doing work it had not earned. A
full sweep at 375, 1280 and 1440 found more, and — more usefully — showed that
the percentage is the wrong test on its own. It measures how far the frame is
from the picture's shape; the client's rule is about whether anyone is lost.
Those come apart constantly. So the check now has two steps, and the second
one is the one that decides:

```
# 2. mask what the frame throws away and LOOK at it
python3 - <<'EOF'
from PIL import Image, ImageDraw
im = Image.open("public/media/img/NAME.jpg").convert("RGB"); w, h = im.size
fw, fh = FRAME_W, FRAME_H          # from the sweep above
fr, nr = fw / fh, w / h
if nr > fr: keep = int(h * fr); off = (w - keep) // 2; bands = [(0,0,off,h), (w-off,0,w,h)]
else:       keep = int(w / fr); off = (h - keep) // 2; bands = [(0,0,w,off), (0,h-off,w,h)]
d = ImageDraw.Draw(im, "RGBA")
for b in bands: d.rectangle(b, fill=(220, 40, 40, 130))
im.save("/tmp/crop.png")
EOF
```

What that turned up, and what each one turned out to be:

| Page | Photograph | Lost | Verdict |
|---|---|---|---|
| Homepage, ≤860px | `dva-team.jpg` in the DVA panel | **64%** | **Twelve of nineteen people gone**, whole figures cut at both edges. Fixed: the panel is a stacked card on mobile now, picture above copy, 0%. |
| Youth | `dva-workshop.jpg` in a 4:3 event card | **40%** | Cut the seated participants off the bottom. Replaced with `team-office.jpg`. |
| Youth | `path-future.jpg` in a 4:3 event card | **35%** | Cut through the writing hand and the notebook. Replaced with `team-award.jpg`. |
| Youth | `community-gathering.jpg` in a 4:3 event card | 11% | **Left alone.** The bands are kitchen counter and bare wall; nobody is in them. |
| About · homepage | `advisor-*.jpg` reel posters at 0.563 | 30% | **Left alone.** Single portraits, centred; only backdrop is lost. |
| Every inner page | `hero.jpg` in the header band | 40–64% | **Flagged, not changed.** It cuts two of the three people on mobile — but it is licensed stock, not a D'Life photograph, so the client's rule does not reach it. It is also the header band on every page, which makes it a design decision rather than a defect to fix at go-live. |
| Various | `policy-review.jpg`, `need-*-malaysia.jpg` | 13–35% | **Left alone.** Stock, and the subject stays in frame; the bands are foliage, worktop and window. |

The one placement still cropping a person is `dva-workshop.jpg` as the third
story-reel poster: a 0.8 group shot in a 0.563 card loses a standing
participant at the left edge. The card is a *video* frame and the film itself
is 0.8, so a poster swap alone would not fix it — it needs either a 9:16 cut
of that film or a reel card shaped to the footage. Client decision, recorded
here rather than guessed at.

**When the picture cannot fit the frame, the picture changes.** The Youth
event cards are a 4:3 grid, and a portrait staircase photograph cannot become
4:3 without losing the people at the top and bottom of it — so that card
carries a 4:3 photograph instead. That is the "or DON'T use it" half of the
rule, and it is the right half more often than it looks.
