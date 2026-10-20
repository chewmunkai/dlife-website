import { VIDEOS, type Video } from "../videos";
import type { RouteKey } from "../../lib/routes";
import { asset } from "../../lib/asset";

/*
 * The film library in Talous CMS (20 Oct 2026). One list, edited once, used everywhere films
 * appear: all of it on the Stories page, the first three on the homepage reel and the Careers
 * and Resources previews. Reordering the list is how to change what's featured, exactly as
 * reordering VIDEOS was. content/videos.ts stays as the built-in copy the site falls back to
 * when the CMS is unreachable, and as the record of how each film was encoded and cropped.
 */

// Where a film hands the viewer on to once it ends.
export const FILM_NEXT: RouteKey[] = ["careers", "dva", "contact", "about", "stories", "youth", "policy", "resources"];

// The poster's crop inside the 4:5 card, as the encode notes in content/videos.ts set them.
// Every value the existing films use is kept, so importing them changes no crop.
export const FILM_FOCUS = [...new Set(["50% 15%", "50% 30%", ...VIDEOS.map((v) => v.focus), "50% 65%", "50% 80%"])];

export const FILM_LIBRARY_BLOCK = {
  label: "Film library",
  description: "Every film on the site. The first three are featured on the homepage, Careers and Resources; the Stories page shows them all.",
  fields: {
    films: {
      type: "list",
      label: "Films (drag to reorder; the first three are featured)",
      max: 30,
      item: {
        video: { type: "video", label: "Video (MP4)" },
        poster: { type: "image", label: "Poster (the card's picture)" },
        title: { type: "text", label: "Title", max: 80 },
        runtime: { type: "text", label: "Length shown on the card, e.g. 1 min 09", max: 20 },
        blurb: { type: "textarea", label: "One line under the title", max: 200 },
        next: { type: "select", label: "After the film, suggest", options: FILM_NEXT },
        focus: { type: "select", label: "Poster crop (lower % = closer to the top)", options: FILM_FOCUS },
      },
    },
  },
} as const;

// Paths as stored in the CMS: without the GitHub Pages base path asset() adds.
const raw = (p: string) => p.replace(process.env.NEXT_PUBLIC_BASE_PATH || "", "");

export const FILM_MEDIA = VIDEOS.flatMap((v) => [
  { src: raw(v.src), alt: v.title, kind: "video" as const, thumb: raw(v.poster) },
  { src: raw(v.poster), alt: `Poster: ${v.title}` },
]);

export const FILMS_DOCUMENT = {
  root: { props: {} },
  content: [
    {
      type: "FilmLibrary",
      props: {
        id: "film-library",
        films: VIDEOS.map((v, i) => ({
          id: `film-${i + 1}`,
          video: raw(v.src),
          poster: raw(v.poster),
          title: v.title,
          runtime: v.runtime,
          blurb: v.blurb,
          next: v.next,
          focus: v.focus,
        })),
      },
    },
  ],
};

type FilmItem = { video?: string; poster?: string; title?: string; runtime?: string; blurb?: string; next?: string; focus?: string };

/**
 * The CMS's film list as the site's Video records. A film still being filled in (no video, poster
 * or title yet) is left out rather than shown broken.
 */
export function filmsFromContent(content: { content?: { type: string; props: Record<string, unknown> }[] } | null | undefined): Video[] | null {
  const block = content?.content?.find((b) => b.type === "FilmLibrary");
  if (!block) return null;
  const items = ((block.props.films as FilmItem[] | undefined) ?? []).filter((f) => f.video && f.poster && f.title);
  return items.map((f) => ({
    src: asset(f.video!),
    poster: asset(f.poster!),
    focus: f.focus || "50% 50%",
    title: f.title!,
    runtime: f.runtime ?? "",
    category: "",
    next: (FILM_NEXT.includes(f.next as RouteKey) ? f.next : "careers") as RouteKey,
    blurb: f.blurb ?? "",
  }));
}
