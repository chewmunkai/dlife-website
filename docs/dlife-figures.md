# The numbers on this site — audit, 6 Sep 2026

Client instruction: *"audit the numbers"*, *"follow whatsapp screenshot"*.

The evidence is the client's own performance summary, screenshotted from the
principal insurer's adviser portal on **14 Aug 2026** and supplied with the
brief (`2.01.06 PM.jpeg`). Everything below is measured against it.

## What the summary says

**The practice**

| Figure | Meaning |
|---|---|
| 29 | advisors in the agency |
| 2,872 | clients served by the agency |
| RM 921M | total sum assured under the agency |
| 5,211 | total claim count under the agency |
| **RM 22M** | **total claim amount under the agency** |
| 2 | MDRT qualifiers produced by the agency |

**Sharon, personally**

| Figure | Meaning |
|---|---|
| 25 years 4 months | insurance experience and service with the principal insurer |
| 467 | clients served personally |
| RM 102M | total sum assured under her portfolio |
| 704 | total claim count |
| RM 3M | total claim amount under her portfolio |
| 7× | MDRT |

## What the site claimed, and what changed

| Claim | Where | Verdict | Now |
|---|---|---|---|
| "Built 4 top-tier Senior Managers and 34+ young, passionate leaders" | homepage trust band | **Impossible.** 38 leaders inside a 29-advisor practice. | "A practice of 29 advisors … and 2 MDRT qualifiers produced along the way." |
| "3 agency managers now running teams of their own" / "40+ young assistant and unit managers developed" | About → Advisors she has built | **Impossible**, same arithmetic. | 29 advisors · 2,872 clients · RM921m of cover |
| "More than 40 young managers have come through it here" | Careers → Leadership | **Impossible**, same arithmetic. | number dropped; the route into leadership is the claim, not a headcount |
| "several going on to six-figure incomes" | About → Advisors she has built | **No evidence, and an earnings claim.** | removed |
| "Multiple-year MDRT Qualifier" | About → Recognition | True but vague. | "Seven-time MDRT Qualifier" |
| "claims exceeding RM22 million" | homepage trust band | **Supported.** RM22M is the agency's total claim amount. | unchanged — client confirmed the wording runs as they wrote it |
| "Proudly partnering with AIA, one of Asia's leading insurers" | homepage trust band | **Against the client's 6 Sep instruction** that the site reads as an insurance agency and names no insurer. | naming removed, recognition kept |

## The one number left open

**"27 years."** It appears 23 times — the trust strip on every solution page,
the homepage trust band, and About's "27-year career".

The summary reads **25 years 4 months**, as at 14 Aug 2026. But it measures
*service with the principal insurer*, which is not necessarily the same span
as a career, and not the same thing as the agency's own age. A two-year gap is
too big to ignore and too ambiguous to overwrite silently on a brand line
across 23 places.

**Left exactly as the client wrote it, and raised.** One of these is true:

- 27 is Sharon's whole career, including time before the principal insurer →
  the site is right, and nothing needs doing.
- 27 is meant to be years *with the principal insurer* → it should read 25.
- 27 is the agency's age → say so, because it currently reads as experience.

It is a one-line change in `components/DLife.tsx`, `content/solutions-e2.ts`
and `app/about/page.tsx` once the client says which.

## Standing rule

Nothing on this site states a figure that this summary does not support, and
no figure was invented to replace one that was removed. If a new number
arrives, add it here first with its source, then to the page.
