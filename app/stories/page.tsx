import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import Film from "../../components/v2/Film";
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
        photo={{ src: "/media/img/dva-team.jpg", alt: "The D’Life advisory team", position: "50% 34%" }}
        actions={
          <a className="pill" href="#films">
            <span>Watch the films</span>
          </a>
        }
      />

      <section className="band light" id="films">
        <p className="lbl">Watch</p>
        <h2>In their own words</h2>
        <p className="dl-lede">Each film plays here, with sound. You will not be sent anywhere else to finish one.</p>
        <div className="dl-videos__grid" style={{ marginTop: "clamp(30px,4vh,52px)" }}>
          {VIDEOS.map((v) => (
            <article className="dl-video" key={v.src}>
              <Film
                className="dl-video__ph ph"
                src={v.src}
                poster={v.poster}
                focus={v.focus}
                title={v.title}
                runtime={v.runtime}
                playSize={20}
              />
              <span className="dl-video__cat">{v.category}</span>
              <h3>{v.title}</h3>
              <p>{v.blurb}</p>
              <a className="tlink" href={link(ROUTES[v.next].path)}>
                {ROUTES[v.next].label} <em aria-hidden="true">→</em>
              </a>
            </article>
          ))}
        </div>
      </section>

      <Band>
        <Open lead="Nobody here is reading from a script. That is why these are short, specific, and a little unpolished.">
          <p>
            You are probably watching because you are wondering what the job is actually like, not because you want to
            hear how good we are at it. So that is what they talk about: an ordinary week, the parts that are hard, and
            the reason they stayed.
          </p>
          <p>
            And if what you are really weighing up is whether you would want this career yourself,{" "}
            <a href={link(ROUTES.careers.path)}>Grow With D’Life</a> is the more useful read. It covers what the films
            leave out, including how slow the first year is.
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
