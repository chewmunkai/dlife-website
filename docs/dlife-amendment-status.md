# Client amendments — implementation status

Source: `CLAUDE-CODE-DLIFE-BRIEF.md` (6 Sep 2026), built from the client's
WhatsApp copy register (31 Aug 2026) and the meeting notes. Amendment IDs are
the brief's. Copy IDs (C01–C10) are the brief's client copy register.

Status vocabulary: **To do · In progress · Implemented · Verified · Waiting for
input · Already satisfied**.

Baseline: `b49fcad` (17 Aug 2026), which is also `origin/main`. No amendment on
this list had been implemented before this pass.

| ID | Amendment | Status | Files |
|---|---|---|---|
| A01 | Header: logo / nav / CTA rebalance, no clipping at intermediate widths | To do | |
| A02 | Solution pages: carousel for uneven lists; card padding, measure, spacing | To do | |
| A03 | Remove the redundant CTA inside the hero trust strip | To do | |
| A04 | Quote-style section dividers from approved page copy | To do | |
| A05 | Homepage claims paragraph → C01 | Implemented | `components/DLife.tsx` |
| A06 | Family hero → C02; trust strip → "Support beyond the policy" (C03) | Implemented | `content/solutions.ts`, `content/solutions-e2.ts`, `app/solutions/page.tsx` |
| A07 | Medical term 02 "Your share" → C04 | Implemented | `content/solutions.ts` |
| A08 | About: remove the six-card "The Team" directory | Implemented | `app/about/page.tsx` |
| A09 | Homepage + Careers benefits expand inline | To do | |
| A10 | Careers: qualities → C05; FAQ 03/04 → C07/C08; align conflicting pay copy | Implemented | `app/careers/page.tsx`, `components/v2/Ask.tsx` |
| A11 | Stories/Careers carousel; one story grouping; video control placement | To do | |
| A12 | "Reading and what's coming up"; template article off the public build | Implemented | `app/resources/page.tsx`, `content/articles.ts`, `components/pages/ArticlePage.tsx` |
| A13 | Youth: "Who should join"; FAQ cost/age → C09/C10 | Implemented | `app/youth-community/page.tsx` |
| A14 | DVA: keep event grouping, verify responsive layout, fix image framing | To do | |
| A15 | Founder portraits; group photography; asset map | To do | |
| A16 | Contact: "Other" + conditional "Please specify"; form handler | To do | |
| A17 | Base-path / deep-link verification | To do | |

## Notes carried forward

- **A05 — "exceeding" is unconfirmed.** The supplied wording is used with the
  brief's `RM22 million` respacing. The supporting screenshot shows agency
  claims **of** RM22M; it does not establish an amount above it. Flagged in
  `components/DLife.tsx` as `TODO(launch)`.
- **A10 — programme terms unconfirmed.** C08's 18-month programme and basic
  bonus allowance are published as supplied. No eligibility rule, amount or
  guarantee has been added, and none should be until the client supplies them.
- **A12 — the article library is empty.** With the template no longer routed,
  `/resources` currently shows no articles at all. That is accurate, not a
  bug; the client has published nothing yet.
