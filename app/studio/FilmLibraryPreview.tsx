"use client";

import { createContext, useContext } from "react";
import { filmsFromContent } from "../../content/cms/films";
import type { Video } from "../../content/videos";
import { asset } from "../../lib/asset";

/** The project's library pages as the CMS has them now (draft), keyed by slug. */
export const LibrariesContext = createContext<Record<string, unknown>>({});

/** The film library's films for sections that feature them, falling back to the built-in list. */
export function useLibraryFilms(): Video[] | undefined {
  const libs = useContext(LibrariesContext);
  return filmsFromContent(libs.films as Parameters<typeof filmsFromContent>[0]) ?? undefined;
}

type Film = { id?: string; video?: string; poster?: string; title?: string; runtime?: string; blurb?: string };

/**
 * The film library page in the editor: the list as cards, in order, with the first three marked
 * as featured. Incomplete films are shown as such, since the site leaves them out until done.
 */
export function FilmLibraryPreview({ films }: { films?: Film[] }) {
  const list = films ?? [];
  return (
    <section className="flib">
      <header>
        <b>Film library</b>
        <span>
          {list.length} film{list.length === 1 ? "" : "s"}. The first three are featured on the homepage, Careers and Resources; the Stories page shows them all. Add, remove and reorder them in the panel on the right.
        </span>
      </header>
      <ol>
        {list.map((f, i) => {
          const missing = [!f.video && "video", !f.poster && "poster", !f.title && "title"].filter(Boolean);
          return (
            <li key={f.id ?? i} className={missing.length ? "incomplete" : ""}>
              <div className="flib-card">
                {f.poster ? <img src={asset(f.poster)} alt="" /> : <div className="flib-none">No poster yet</div>}
                {i < 3 && <span className="flib-tag">Featured</span>}
              </div>
              <div className="flib-text">
                <b>
                  {i + 1}. {f.title || "Untitled film"}
                </b>
                <span>{f.runtime}</span>
                {missing.length > 0 && <em>Needs a {missing.join(", ")} before it shows on the site</em>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
