import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import JsonLd from "../../components/site/JsonLd";
import PageHero from "../../components/blocks/PageHero";
import { Band, Prose } from "../../components/blocks/Prose";
import SelectedVideos from "../../components/blocks/Video";
import ContextualCTA from "../../components/blocks/CTA";
import RelatedContent from "../../components/blocks/Related";
import { ROUTES } from "../../lib/routes";
import { WA } from "../../lib/contact";
import { VIDEOS } from "../../content/videos";
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
      <PageHero
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

      <Band tone="sand" width="read">
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
      </Band>

      <ContextualCTA
        label="Next step"
        title="Talk to one of them"
        copy="If a particular story landed, we can put you in touch with the advisor who told it."
        wa={WA.career}
        action="Explore a career conversation"
        secondary={{ label: "Read about the work", href: ROUTES.careers.path }}
      />

      <RelatedContent keys={["careers", "about", "dva"]} tone="light" />

      <JsonLd data={breadcrumbLd(route)} />
    </SiteShell>
  );
}
