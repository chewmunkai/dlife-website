import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import { E2Band, E2Closing, E2Hero, E2Qa } from "../../components/blocks/E2";
import JsonLd from "../../components/site/JsonLd";
import { Prose } from "../../components/blocks/Prose";
import SelectedVideos from "../../components/blocks/Video";
import RelatedContent from "../../components/blocks/Related";
import { ROUTES } from "../../lib/routes";
import { WA } from "../../lib/contact";
import { VIDEOS } from "../../content/videos";
import { link } from "../../lib/asset";
import { pageMeta, breadcrumbLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.stories);

/**
 * Advisor stories.
 *
 * The "View all stories" destination from the homepage's featured strip.
 * Playback follows the same rule everywhere on the site: inside the card,
 * never in a lightbox and never handed off to social — a visitor finishes a
 * story without leaving D'Life, and each one ends on a contextual next action.
 *
 * ⚠️ Three films exist today. As more are published they are added to
 * content/videos.ts and appear here and on the homepage strip automatically;
 * no markup changes. The `category` field on each record is the seam where the
 * client's future content categories will land.
 */
export default function Page() {
  const route = ROUTES.stories;

  return (
    <SiteShell path={route.path}>
      <E2Hero
        route={route}
        label="Advisor stories"
        title={<>Meet the people behind D’Life</>}
        lede="Real advisors, in their own words. What the work actually looks like, who it is for, and what keeps them doing it."
      />

      <SelectedVideos
        videos={VIDEOS}
        tone="light"
        label="Watch"
        title="In their own words"
        lede="Each film plays here, with sound. You will not be sent anywhere else to finish one."
        id="films"
      />

      <E2Band tone="sand" read>
        <Prose>
          <p>
            These are advisors talking about their work, not testimonials about ours. We have deliberately not scripted
            them, which is why they are short and specific rather than polished.
          </p>
          <p>
            If what you are really weighing up is whether this is a career you would want, the{" "}
            <a href={ROUTES.careers.path}>Grow With D’Life</a> page is the more useful read — it covers the parts of the
            job these films do not, including the difficult first year.
          </p>
        </Prose>
      </E2Band>

      <E2Closing
        photo={{ src: "/media/img/dva-team.jpg", alt: "The D’Life advisory team", position: "50% 28%" }}
        label="Next step"
        title="Talk to one of them"
        lede="If a particular story landed, we can put you in touch with the advisor who told it."
        actions={
          <>
            <a className="pill sand" data-wa={WA.career} href="#">
              <span>Explore a career conversation</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.careers.path)}>
              <span>Read about the work</span>
            </a>
          </>
        }
      />

      <RelatedContent keys={["careers", "about", "dva"]} tone="light" />

      <JsonLd data={breadcrumbLd(route)} />
    </SiteShell>
  );
}
