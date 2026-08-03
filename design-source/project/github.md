repo: chewmunkai/dlife-website
branch: main
path:

## Last sync

date: 2026-08-03T03:45:00Z
commit:

### Updated in this project

- Rebuilt `index.html` from the live Next.js build (`components/DLife.tsx`) — clover wordmark, read-progress rail, manifesto pillars, two-founder diptych, in-page advisor films, expanded footer.
- Replaced `site.css` with the production `styles/dlife.css` (scoped `.dlife`, section modes `.dark` / `.sand`, tokens inlined). Design-system stylesheet link dropped, per the repo README's note on the doubled link underline.
- Replaced Unsplash `<image-slot>` placeholders with D'Life's own photography, copied from `public/media/` into `media/`.
- Ported `lib/dlife.ts` to plain-JS `site.js` (paced reveals, scroll-driven pathway, pinned needs rail, video dialog).
- Dropped in the real D'Life lockup (`media/brand/`), replacing the placeholder clover mark in the header, loader and footer. The repo's `CloverMark` component and `app/icon.svg` still carry the stand-in and should follow.
- Previous design comp archived under `archive/`.

### Amendments applied since sync

- Client correction report executed in full: Lora + Work Sans only, italic-span emphasis removed, manifesto deleted, path selector moved above trust proof, six approved trust themes, no scroll-jacking, inline video carousel, "DVA — Drive Value Associates", corrected footer hours and numbers.
- Wireframe pass: persistent top navigation with dropdowns, split ivory hero.
- Single-file build emitted as `DLife Homepage (single file).html` for the WordPress port.

## Screen map

| Screen | Built from |
| --- | --- |
| index.html | components/DLife.tsx, styles/dlife.css, lib/dlife.ts |
| media/ | public/media/img/, public/media/poster/ |

## Notes

- `media/video/*.mp4` are not in the repo (advisor films are not committed), so the story dialog opens on its poster frame.
- Open before launch, carried from the repo: WhatsApp number `60123456789`, "27 years" / "almost three decades", founder portraits, licensing entity, street address, "Drive Value Association" vs "Associate".
