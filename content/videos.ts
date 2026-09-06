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
   ⏳ AWAITING A FOURTH FILM (client, round 17)

   The client asked for one more video and supplied an Instagram permalink for
   it. That link is not something this repository can consume: Instagram does
   not serve a downloadable file, and pulling media off a third-party page is
   not a thing to do on the client's behalf without them handing the file over.
   The homepage reel is sized for four either way — see the note on
   `#stories .reel .story` in styles/dlife.css — so the layout is waiting, not
   blocked.

   TO ADD IT, three steps and no code changes beyond this array:

     1. drop the file at  public/media/video/<name>.mp4
     2. drop a poster at  public/media/poster/<name>.jpg
        — a still from the film, exported at the same 760x950 as the other
          three so the reel cards stay identical
     3. add the entry below, following the shape of its neighbours

   `focus` is the poster's focal point for when a card crops it; `runtime` is
   read off the file; `next` is the route the film should send a viewer to.
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
    src: asset("/media/video/advisor-mayyee.mp4"),
    poster: asset("/media/poster/advisor-mayyee.jpg"),
    focus: "50% 54%",
    title: "What Real Guidance Looks Like",
    runtime: "1 min 30",
    category: "Client guidance",
    next: "solutions",
    blurb: "How a first conversation actually goes, and what it does not involve.",
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
