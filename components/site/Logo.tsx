import { asset } from "../../lib/asset";

/**
 * The single swappable logo slot: one component, used by the loading screen,
 * the header and the footer, so replacing the artwork updates all three.
 *
 * Two cuts, because the lockup is flat artwork rather than currentColor:
 * `logo.png` is the teal-and-gold original for ivory grounds, and
 * `logo-reversed.png` the ivory cut for the dark loader and footer.
 *
 * The lockup already carries the "D'LIFE" wordmark, so no text sits beside
 * it — the alt text is what names it, and sizing is by height with width
 * left to follow the artwork's own 5.04:1 ratio.
 */
export const Logo = ({ reversed = false, alt = "D’Life" }: { reversed?: boolean; alt?: string }) => (
  <img
    className={reversed ? "lmark rev" : "lmark"}
    src={asset(`/media/img/${reversed ? "logo-reversed" : "logo"}.png`)}
    alt={alt}
    width={2890}
    height={573}
    decoding="async"
  />
);

export default Logo;
