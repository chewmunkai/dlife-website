import { WA } from "../../lib/contact";
import { asset } from "../../lib/asset";

/**
 * The homepage hero, lifted out of DLife.tsx unchanged so Talous CMS can edit
 * its copy and photograph. Markup and classes are the approved ones; only the
 * words and the picture are props.
 *
 * `photo` is a site-relative path ("/media/img/…"); the base path is applied
 * here, so the CMS stores the same value on every host.
 */
export type HeroProps = {
  label: string;
  headline: string;
  headlineItalic?: string;
  lede: string;
  primaryCta: string;
  secondaryCta: string;
  photo: string;
  photoAlt: string;
  /** Desktop only: which side the photograph sits on. Stacked layouts are unchanged. */
  photoSide?: string;
};

export default function Hero({ label, headline, headlineItalic, lede, primaryCta, secondaryCta, photo, photoAlt, photoSide }: HeroProps) {
  return (
    /* Split hero, per the client's reference: the copy on the beige page
       ground at the left, the photograph held at the very right edge. */
    <section id="hero" data-photo={photoSide === "left" ? "left" : undefined}>
      <div className="fg">
        <span className="lb rv">{label}</span>
        <h1>
          <span className="lw">
            <span>{headline}</span>
          </span>
          {headlineItalic && (
            <span className="lw">
              <span>
                <i>{headlineItalic}</i>
              </span>
            </span>
          )}
        </h1>
        <p className="rv">{lede}</p>
        <div className="acts rv">
          <a className="pill" data-wa={WA.advisor} href="#">
            <span>{primaryCta}</span>
          </a>
          <a className="pill ghost" href="#path">
            <span>{secondaryCta}</span>
          </a>
        </div>
      </div>
      <div className="bg ph">
        {/* No parallax: a D'Life photograph never has anyone cropped out of it
            (6 Sep rule). The plate takes the picture's own 4:3 shape. */}
        <img src={asset(photo)} alt={photoAlt} loading="eager" decoding="async" />
      </div>
    </section>
  );
}
