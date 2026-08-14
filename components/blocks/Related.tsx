import { ROUTES, type Route, type RouteKey } from "../../lib/routes";
import { link } from "../../lib/asset";

/**
 * BLOCK: related content.
 *
 * The guide's non-negotiable content behaviour: "every important video or
 * story leads to related content, a relevant page or a contextual CTA", and
 * "social media feeds the website rather than leaking serious visitors back
 * out". So no page on this site dead-ends — each one closes by offering the
 * two or three routes that genuinely follow from it.
 *
 * Cards are built from the route map, which means the label, the URL and the
 * one-line teaser all come from the same record the destination page uses for
 * its own metadata. A renamed route renames itself everywhere it is offered.
 */
export default function RelatedContent({
  keys,
  heading = "Where to next",
  tone = "light",
}: {
  keys: ReadonlyArray<RouteKey>;
  heading?: string;
  tone?: "light" | "sand" | "dark";
}) {
  const routes: Route[] = keys.map((k) => ROUTES[k]);
  const mode = tone === "sand" ? " sand" : tone === "dark" ? " dark" : "";

  return (
    <section className={`dl-band dl-band--wide dl-related${mode}`} aria-labelledby="related-heading">
      <h2 id="related-heading" className="dl-related__head rv">
        {heading}
      </h2>
      <div className="dl-related__grid">
        {routes.map((r) => (
          <a className="dl-related__card rv" href={link(r.path)} key={r.path}>
            <h3>{r.label}</h3>
            <p>{r.teaser}</p>
            <em aria-hidden="true">→</em>
          </a>
        ))}
      </div>
    </section>
  );
}
