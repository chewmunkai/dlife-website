import type { ReactNode } from "react";
import type { Route } from "../../lib/routes";
import Breadcrumbs from "../site/Breadcrumbs";
import { asset } from "../../lib/asset";

/**
 * BLOCK: page hero.
 *
 * The opening band of every inner page: breadcrumb, chapter label, H1 and a
 * short lede. Deliberately quieter than the homepage hero — the homepage
 * opens the site, an inner page opens a subject.
 *
 * The optional photograph sits full-bleed beneath the copy rather than behind
 * it, so nothing needs a scrim and the type never lands on a moving crop.
 */
export default function PageHero({
  route,
  label,
  title,
  lede,
  photo,
  actions,
  tone = "light",
}: {
  route: Route;
  /** Chapter marker above the heading. Defaults to the parent's label. */
  label: string;
  /** Visible H1. Distinct from `route.title`, which is the <title> tag. */
  title: ReactNode;
  lede?: ReactNode;
  photo?: { src: string; alt: string };
  actions?: ReactNode;
  tone?: "light" | "sand" | "dark";
}) {
  return (
    <section
      className={`dl-pagehero${tone === "sand" ? " sand" : tone === "dark" ? " dark" : ""}`}
      id="page-hero"
    >
      <div className="dl-pagehero__inner">
        <Breadcrumbs route={route} />
        <span className="lb rv">{label}</span>
        <h1 className="rv">{title}</h1>
        {lede && <p className="dl-lede rv">{lede}</p>}
        {actions && <div className="dl-actions rv">{actions}</div>}
      </div>
      {photo && (
        <div className="dl-pagehero__plate ph rv">
          <img src={asset(photo.src)} alt={photo.alt} loading="eager" decoding="async" />
        </div>
      )}
    </section>
  );
}
