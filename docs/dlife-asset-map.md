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
