# Service page photo selections — 7 September 2026

## Latest sizing revision

This revision supersedes the earlier slot choices below. Family 03 and 04 and Future 05 now use purpose-made landscape scenes instead of portrait Drive images. Wealth 03–05 use the improved `legacy-*-v2.png` scenes. Prompts: [PROMPTS-v2.md](generated/PROMPTS-v2.md). All service moment cards use the existing 16:10 frame with edge-to-edge cover fitting; generated subjects remain visible. Drive originals are no longer used in these card positions. Full-photo fitting remains on the family/future hero images.

The About/Our Founders hero now uses the verified `founder-sharon.jpg` and `founder-rachel.jpg` portraits side by side, without changing their pixels. The DVA page is unchanged. No font stylesheet or text style was modified.

## Earlier selection history

Only `components/v2/SolutionPage.tsx` consumes these overrides. Homepage, Solutions hub and other content records remain unchanged. Original bytes are preserved; CSS contains the entire image, with neutral side space for portraits. No people are removed or retouched.

All 44 originals in the client Group Drive folder were reviewed. These are contextual selections: the folder has no literal hospital, medical-bill, estate-paperwork or lifelong-care imagery. A person shown beside a question is not being identified as a patient, dependent, policyholder or relative. The user subsequently authorised generating matching photography where Drive has no suitable source. Eight generated scenes now fill those gaps; prompts and generation provenance are in [generated/PROMPTS.md](generated/PROMPTS.md).

| File | Source | SHA-256 |
| --- | --- | --- |
| shared-meal.jpg | [Drive original](https://drive.google.com/file/d/1RNKlG4zYgCq-vY_YNdkmVq9sLdjZFPV6/view) | a60e8bfa3ef1c789e9c7b4e88d27d1f12e48692fe5ededa3dd66b1c705ffeca7 |
| generations.jpg | [Drive original](https://drive.google.com/file/d/1POhBoLVJfihCufvgfwoeWVnpAQYDUroS/view) | 845c4d81557afdeae68d17bca13b11fa131c41651dc03141d308b02710d6d6cc |
| review-at-table.jpg | [Drive original](https://drive.google.com/file/d/1wsMAVvjyd23TparMFLiglHw3f5G_DxRY/view) | 8c182020023169aa713a7feb4474d752e03aeb9c0b56f1e56561efcd4d869947 |
| office-team.jpg | [Drive original](https://drive.google.com/file/d/1so0I0Qbw-cIkeZIPH3V_664IuhSWwb3Z/view) | d3b316f02c35ee852146ebefa1670c810fa12619fcef5bfd8d5412d6208e84d8 |
| conversation.jpg | [Drive original](https://drive.google.com/file/d/1QtXVG7XSgjNfgSZE_nzaTQjqOCuZ1qnH/view) | 6f19d2d4aa7a1dc26059f88f957d308438304f252b8133e95ecd56c5453eb307 |

## Point-by-point review

| Service | Image decisions |
| --- | --- |
| Family | Hero: shared meal from Drive. 01: retain family meal for children/household. 02: retain moving-home photo for mortgage. 03: Drive adults with child for generations/support. 04: Drive conversation for seeking support. 05: generated policy-document review. |
| Income | Hero and 01–04 retained: household budgeting, bills, savings, household meal, written priorities. 05: conversation retained for asking for help; incorrect laptop alt text corrected. |
| Medical | Hero consultation retained. 01–05 now use generated scenes: benefit-schedule review, medical-cost calculation, hospital reception, employment-benefits review, and medical-history consultation. |
| Future | Hero: full Drive shared-meal original replaces a tightly framed outdoor gathering. 01: retain document review for EPF. 02: retain generations at meal for retirement/care. 03: savings jar replaces kitchen portrait for inflation/savings. 04: retain library for education. 05: Drive tablet/laptop replaces holiday portrait for starting a review. |
| Wealth | Hero and 01–02 retained. 03: generated shared-business/property discussion. 04: generated adult wheelchair user planning with parents. 05: generated family document organisation. |

## Verification

- Production build, TypeScript and Next build checks passed; 27 static entries generated.
- Desktop and mobile checks cover all five service routes, five cards per route, asset loading and full-image containment.
- New image assets have dedicated filenames; no shared asset was overwritten.
- Not pushed or deployed.
