import { asset } from "../lib/asset";
import type { RouteKey } from "../lib/routes";

/**
 * Featured videos.
 *
 * The guide requires these to play inside the site with audio rather than
 * bouncing a visitor out to social, and asks for "strong thumbnails, play
 * indicators, concise titles, categories and relevant next actions" — so each
 * record carries its own category and the route it should hand a viewer on to
 * once the story finishes.
 *
 * Sources are vertical 9:16 with burned-in bilingual subtitles; each poster is
 * a 4:5 crop that matches the card and keeps the speaker's face.
 *
 * ⚠️ A11 (client, 31 Aug 2026): the films are ONE general grouping. "Client
 * guidance" and "Leadership" were printed on the cards as though the library
 * were filtered into sections, which it is not — three films do not make
 * three categories, and the labels made the set look like the visible part of
 * something larger. Nothing renders `category` any more. The field stays
 * because the client's own note says clearer categories may follow and this
 * is the seam they would land in; the titles, which are meaningful, are
 * untouched.
 */
export type Video = {
  src: string;
  poster: string;
  /** Deliberate focal point for the poster when a card crops it. */
  focus: string;
  title: string;
  runtime: string;
  /**
   * ⚠️ NOT RENDERED (A11). Kept as the seam for a real taxonomy. Before
   * putting this back on a card, check with the client that the library is
   * actually grouped — see the note above.
   */
  category: string;
  /** Contextual next action, per the connected-content rule. */
  next: RouteKey;
  /** One line under the title in list views. */
  blurb: string;
};

/* ============================================================
   THE LIBRARY (28 Sep 2026): 13 films.

   Eleven came from the client's Drive folder "Website (Video)" on 28 Sep.
   The masters are 1080x1920 HEVC at ~10 Mbps, 120–300MB each, which is not
   something to put on a page or in git. Every file here was re-encoded to the
   same shape as the original two: 720x1280 H.264 High, CRF 26 capped at
   1.4 Mbps, AAC 96k, faststart. That is 14–25MB a film. The masters stay in
   Drive; re-encode from there, not from these.

   Skipped from that folder:
     · MayYee_FINAL — excluded from all material (client, 21 Sep 2026).
     · Alex_FINAL — the same film as advisor-alex below (identical runtime to
       the millisecond), so the existing encode stands.

   Posters are the client's own cover images (the "封面" files), cut from 9:16
   to the card's 4:5 at 760x950. The crop is bottom-anchored so the burned-in
   headline survives, except ChingYee (150px from the top, or her face goes)
   and Hebe (from the top, or her headline loses its first line).

   ⚠️ DRAFT COPY. The eleven new titles are the covers' own headlines,
   translated where the cover is in Chinese; the blurbs paraphrase the covers'
   sublines. Neither has been checked by the client. Runtimes are read off
   the files and floored, matching the original two.

   TO ADD A FILM, three steps and no code changes beyond this array:
     1. drop the web encode at  public/media/video/<name>.mp4
     2. drop a poster at        public/media/poster/<name>.jpg (760x950)
     3. add the entry below, following the shape of its neighbours
   ============================================================ */
export const VIDEOS: Video[] = [
  {
    src: asset("/media/video/advisor-alex.mp4"),
    poster: asset("/media/poster/advisor-alex.jpg"),
    focus: "50% 47%",
    title: "A Career Beyond Selling Policies",
    runtime: "1 min 36",
    category: "Advisor stories",
    next: "careers",
    blurb: "What the work looks like when the job is guidance rather than sales.",
  },
  {
    src: asset("/media/video/advisor-debbie.mp4"),
    poster: asset("/media/poster/advisor-debbie.jpg"),
    focus: "50% 50%",
    title: "I Was Scared I’d Say These Words to My Son",
    runtime: "1 min 48",
    category: "Advisor stories",
    next: "careers",
    blurb: "Out of the house before sunrise while her son grew up, and the question that changed that.",
  },
  {
    src: asset("/media/video/dva-kelvin.mp4"),
    poster: asset("/media/poster/dva-kelvin.jpg"),
    focus: "50% 50%",
    title: "No Background, No Talent. How Did I Reach MDRT?",
    runtime: "1 min 58",
    category: "Leadership",
    next: "dva",
    blurb: "Reaching the Million Dollar Round Table without connections or a head start.",
  },
  {
    src: asset("/media/video/advisor-casie.mp4"),
    poster: asset("/media/poster/advisor-casie.jpg"),
    focus: "50% 50%",
    title: "Sick for Two Years, and the Income Never Stopped",
    runtime: "1 min 56",
    category: "Advisor stories",
    next: "careers",
    blurb: "An ex-marketer’s career change story.",
  },
  {
    src: asset("/media/video/advisor-janice.mp4"),
    poster: asset("/media/poster/advisor-janice.jpg"),
    focus: "50% 50%",
    title: "Losing Everything Taught Me How to Live",
    runtime: "2 min 17",
    category: "Advisor stories",
    next: "careers",
    blurb: "A story about loss, and beginning again.",
  },
  {
    src: asset("/media/video/advisor-ching-yee.mp4"),
    poster: asset("/media/poster/advisor-ching-yee.jpg"),
    focus: "50% 50%",
    title: "Twenty Years On, No Regrets",
    runtime: "2 min 24",
    category: "Advisor stories",
    next: "careers",
    blurb: "From journalist to insurance advisor, and why she would make the move again.",
  },
  {
    src: asset("/media/video/dva-evelyn.mp4"),
    poster: asset("/media/poster/dva-evelyn.jpg"),
    focus: "50% 50%",
    title: "Can a Couple Build a Business Together?",
    runtime: "2 min 23",
    category: "Leadership",
    next: "dva",
    blurb: "Working toward the same goal, and getting better at it together.",
  },
  {
    src: asset("/media/video/advisor-joey.mp4"),
    poster: asset("/media/poster/advisor-joey.jpg"),
    focus: "50% 50%",
    title: "Ten Years Out of Work. Can She Start Again?",
    runtime: "2 min 20",
    category: "Advisor stories",
    next: "careers",
    blurb: "Coming back to a career after more than a decade away from one.",
  },
  {
    src: asset("/media/video/advisor-june.mp4"),
    poster: asset("/media/poster/advisor-june.jpg"),
    focus: "50% 50%",
    title: "How Grief Led Her to a Life That Truly Matters",
    runtime: "1 min 42",
    category: "Advisor stories",
    next: "careers",
    blurb: "One loss, one decision, a whole new life.",
  },
  {
    src: asset("/media/video/advisor-hebe.mp4"),
    poster: asset("/media/poster/advisor-hebe.jpg"),
    focus: "50% 50%",
    title: "Five Years In, Ready to Quit",
    runtime: "2 min 21",
    category: "Advisor stories",
    next: "careers",
    blurb: "Alone you go faster. Together you go further.",
  },
  {
    src: asset("/media/video/advisor-sharon-lau.mp4"),
    poster: asset("/media/poster/advisor-sharon-lau.jpg"),
    focus: "50% 50%",
    title: "Five Years, and I Lost Myself",
    runtime: "2 min 00",
    category: "Advisor stories",
    next: "careers",
    blurb: "A mother who keeps growing is the best example her daughter can have.",
  },
  {
    src: asset("/media/video/dva-yeecher.mp4"),
    poster: asset("/media/poster/dva-yeecher.jpg"),
    focus: "50% 50%",
    title: "From Drifting to Finding My Own Path",
    runtime: "1 min 57",
    category: "Leadership",
    next: "dva",
    blurb: "What it took to stop going with the flow and choose a direction.",
  },
  {
    src: asset("/media/video/dva-workshop.mp4"),
    poster: asset("/media/poster/dva-workshop.jpg"),
    focus: "50% 48%",
    title: "Inside D’Life Leadership",
    runtime: "1 min 09",
    category: "Leadership",
    next: "dva",
    blurb: "A Growth Circle session, and the standard the room holds itself to.",
  },
];

/**
 * The short list for everywhere that is NOT the Stories page: the homepage
 * reel and the Careers / Resources previews.
 *
 * Those three lay every item out side by side (the homepage divides its row
 * by `--reel-n`, the previews render one tile per item), so handing them all
 * thirteen films would make a contact sheet. The Stories page's reel windows
 * itself to three cards and takes the whole library.
 *
 * It is the first three of VIDEOS, so reordering the array is how to change
 * what is featured.
 */
export const FEATURED_VIDEOS: ReadonlyArray<Video> = VIDEOS.slice(0, 3);
