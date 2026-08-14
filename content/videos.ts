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
 * ⚠️ The client's own note: most current video content is general, with a
 * focus on transformation and the stories behind D'Life. Clearer categories
 * may follow — this array is the seam where they would land, and the
 * `category` field is already editable per record.
 */
export type Video = {
  src: string;
  poster: string;
  /** Deliberate focal point for the poster when a card crops it. */
  focus: string;
  title: string;
  runtime: string;
  category: string;
  /** Contextual next action, per the connected-content rule. */
  next: RouteKey;
  /** One line under the title in list views. */
  blurb: string;
};

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
