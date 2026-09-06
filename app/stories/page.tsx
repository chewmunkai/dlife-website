import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import StoryReel from "../../components/v2/StoryReel";
import JsonLd from "../../components/site/JsonLd";
import { Hero, Band, Open, ClosingCard } from "../../components/v2/blocks";
import { VIDEOS } from "../../content/videos";
import { ROUTES } from "../../lib/routes";
import { link } from "../../lib/asset";
import { WA, waHref } from "../../lib/contact";
import { pageMeta, breadcrumbLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.stories);

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


export default function Page() {
  const route = ROUTES.stories;

  return (
    <Shell>
      {/* A still hero at the client's direction: the films all play in the reel
          below, and opening on a player asked the visitor to commit before the
          page had told them what they were committing to. */}
      <Hero
        route={route}
        label="Advisor stories"
        title="Meet the people behind D’Life"
        lede="Real advisors, in their own words. What the work actually looks like, who it is for, and what keeps them doing it."
        photo={{ src: "/media/img/team-offsite.jpg", alt: "D’Life advisors together away from the office", ratio: "4 / 3" }}
        actions={
          <a className="pill" href="#films">
            <span>Watch the films</span>
          </a>
        }
      />

      {/* L07 (client review, 6 Sep 2026): the grid of three click-to-play
          cards is now the homepage's reel — one film centre stage, its
          neighbours either side, and previous / play-pause / next under it
          with the sound control in the film's own corner. It renders whatever
          content/videos.ts holds, so 5 films or 12 need no change here. */}
      <StoryReel items={VIDEOS} />

      <Band>
        <Open lead="No script, and no polish. This is how the work actually goes.">
          <p>
            You are probably watching because you are wondering what the job is actually like, not because you want to
            hear how good we are at it. So that is what they talk about: an ordinary week, the parts that are hard, and
            the reason they stayed.
          </p>
          <p>
            And if what you are really weighing up is whether you would want this career yourself,{" "}
            <a href={link(ROUTES.careers.path)}>Grow With D’Life</a> is the more useful read. It covers what the films
            leave out, including what the first year actually asks of you.
          </p>
        </Open>
      </Band>

      <ClosingCard
        title="Talk to one of them"
        lede="If a particular story landed, we can put you in touch with the advisor who told it."
        actions={
          <>
            <a className="pill sand" href={waHref(WA.career)}>
              <span>Explore a career conversation</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.careers.path)}>
              <span>Read about the work</span>
            </a>
          </>
        }
        note=""
      />

      <JsonLd data={breadcrumbLd(route)} />
    </Shell>
  );
}
