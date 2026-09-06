import { asset } from "../../lib/asset";

/**
 * The single swappable logo slot: one component, used by the loading screen,
 * both headers and the footer, so replacing the artwork updates all of them.
 *
 * Four cuts, because the lockup is flat artwork rather than currentColor, and
 * because it has two jobs at two sizes.
 *
 * **Which cut, and why.** The client's September 2026 artwork is a 3.22:1
 * lockup: the D'LIFE wordmark with "IT BEGINS WITH YOU" set underneath it.
 * The tagline is 19% of the artwork's height, so in the header — where the
 * lockup is 22px tall — it would render at **4.1px**. That is not small type,
 * it is a smudge, and a smudge under a wordmark reads as a printing fault
 * rather than as a tagline.
 *
 * So the small placements take a wordmark-only cut of the same file, and the
 * tagline appears where there is room for it:
 *
 *   · `logo.png` / `logo-reversed.png` — wordmark only, 5.02:1. The header
 *     and the footer. Almost exactly the previous artwork's 5.04:1, which is
 *     why no header or footer measurement changed with this swap.
 *   · `logo-full.png` / `logo-full-reversed.png` — the complete lockup,
 *     3.22:1, tagline included. The loading curtain, where the mark runs up
 *     to 76px and the tagline is legible at 14px.
 *
 * Both are cut from the supplied files — nothing was redrawn. The `-reversed`
 * pair is the client's own cream cut for dark grounds, not a filtered version
 * of the dark one.
 *
 * The lockup already carries the wordmark, so no text sits beside it — the
 * alt text is what names it, and sizing is by height with width left to
 * follow the artwork's own ratio.
 */
export const Logo = ({
  reversed = false,
  full = false,
  alt = "D’Life",
}: {
  reversed?: boolean;
  /** The complete lockup, tagline included. Only where it is ≥ ~50px tall. */
  full?: boolean;
  alt?: string;
}) => (
  <img
    className={reversed ? "lmark rev" : "lmark"}
    src={asset(`/media/img/logo${full ? "-full" : ""}${reversed ? "-reversed" : ""}.png`)}
    alt={alt}
    width={full ? 1600 : 1400}
    height={full ? 497 : 279}
    decoding="async"
  />
);

export default Logo;
