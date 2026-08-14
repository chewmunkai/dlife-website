import { trail, type Route } from "../../lib/routes";
import { link } from "../../lib/asset";

/**
 * Visible breadcrumb trail. Pairs with `breadcrumbLd` in lib/seo.ts — the
 * structured data and the visible path are built from the same `trail()`, so
 * they cannot drift apart.
 *
 * Rendered on inner pages only; the homepage's trail is just itself.
 */
export default function Breadcrumbs({ route }: { route: Route }) {
  const crumbs = trail(route);
  if (crumbs.length < 2) return null;

  return (
    <nav className="dl-crumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path}>
              {last ? (
                <span aria-current="page">{c.label}</span>
              ) : (
                <>
                  <a href={link(c.path)}>{c.label}</a>
                  <em aria-hidden="true">/</em>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
