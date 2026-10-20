import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import JsonLd from "../../components/site/JsonLd";
import { Sections } from "../../components/cms/Sections";
import { PAGE_SECTIONS } from "../../components/pages";
import { STORIES_PAGE } from "../../content/cms/pages/stories";
import { getFilms, getPublished, sectionsFromPublished } from "../../lib/talous";
import { ROUTES } from "../../lib/routes";
import { pageMeta, breadcrumbLd, withCmsSeo } from "../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return withCmsSeo(pageMeta(ROUTES.stories), (await getPublished("stories"))?.seo ?? {});
}

/* ============================================================
   Advisor stories.

   ⚠️ Deliberate divergence from the design bundle. The bundle's markup shows
   three posters with placeholder titles and runtimes ("Film · 3:48") and a
   note saying the MP4 lands here, because a static HTML export could not
   carry 26MB of video. This repo has the three real films in
   public/media/video, and content/videos.ts holds their real titles,
   runtimes, categories and onward routes.

   So the reel is driven by content/videos.ts and the films actually play.
   Using the bundle's placeholder titles for films that exist would be worse
   fidelity, not better.

   The films are vertical 9:16 with burned-in bilingual subtitles, which is
   why the cards are 4:5 and why no caption track is attached.
   ============================================================ */


export default async function Page() {
  const route = ROUTES.stories;
  // Sections and copy from Talous CMS (content/cms/pages/stories.ts holds today's as defaults);
  // the reel shows the CMS's Film library.
  const blocks = sectionsFromPublished(await getPublished("stories"), STORIES_PAGE.content);
  const films = await getFilms();
  return (
    <Shell>
      <Sections blocks={blocks} registry={PAGE_SECTIONS} context={{ route, films }} />
      <JsonLd data={breadcrumbLd(route)} />
    </Shell>
  );
}
