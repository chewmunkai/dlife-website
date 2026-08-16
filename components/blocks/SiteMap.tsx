import type { Route } from "../../lib/routes";
import { link } from "../../lib/asset";

/** One row. `title` overrides the route's nav label where the longer form
 *  reads better in a list than it does in a navigation bar. */
export type SiteMapRow = { route: Route; title?: string };

/**
 * BLOCK: site index rows.
 *
 * A page per row: its name, the address it lives at, and a marker. The address
 * is shown rather than hidden, because this block exists to describe the build
 * — the path is the useful half of the row, not an implementation detail to
 * tuck away.
 *
 * Rows are `Route` records rather than hand-written links, so a path renamed
 * in lib/routes.ts is renamed here too and this page cannot drift into listing
 * addresses that no longer exist.
 */
export default function SiteMap({ rows }: { rows: ReadonlyArray<SiteMapRow> }) {
  return (
    <div className="dl-sitemap rv">
      {rows.map(({ route, title }) => (
        <a key={route.path} href={link(route.path)}>
          <b>{title ?? route.label}</b>
          <span>{route.path}</span>
          <em aria-hidden="true">→</em>
        </a>
      ))}
    </div>
  );
}
