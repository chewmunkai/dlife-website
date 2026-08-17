import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import Film from "../../components/v2/Film";
import JsonLd from "../../components/site/JsonLd";
import { Band, Open, Closing, Crumbs } from "../../components/v2/blocks";
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

/** The hero carries one film. The second record is the one the bundle leads
 *  with, and it is the most general of the three. */
const HERO_FILM = VIDEOS[1];

export default function Page() {
  const route = ROUTES.stories;

  return (
    <Shell>
      <section className="hero dark">
        <Film
          id="film"
          src={HERO_FILM.src}
          poster={HERO_FILM.poster}
          focus={HERO_FILM.focus}
          title={HERO_FILM.title}
          runtime={HERO_FILM.runtime}
          runtimeLabel={`Film · ${HERO_FILM.runtime}`}
        />
        <div className="card light">
          <Crumbs route={route} />
          <p className="lbl">Advisor stories</p>
          <h1>Meet the people behind D’Life</h1>
          <p className="dl-lede">
            Real advisors, in their own words. What the work actually looks like, who it is for, and what keeps them
            doing it.
          </p>
          <div className="dl-actions">
            <a className="pill" href="#film">
              <span>Play the film</span>
            </a>
            <a className="tlink" href="#films" style={{ alignSelf: "center" }}>
              All three films <em>→</em>
            </a>
          </div>
          <p className="micro" style={{ marginTop: 26 }}>
            Film · “{HERO_FILM.title}” · {HERO_FILM.runtime}
          </p>
        </div>
      </section>

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

      <Band tone="sand">
        <Open lead="These are advisors talking about their work, not testimonials about ours.">
          <p>We have deliberately not scripted them, which is why they are short and specific rather than polished.</p>
          <p>
            If what you are really weighing up is whether this is a career you would want, the{" "}
            <a href={link(ROUTES.careers.path)}>Grow With D’Life</a> page is the more useful read. It covers the parts
            of the job these films do not, including the difficult first year.
          </p>
        </Open>
      </Band>

      <Closing
        photo={{ src: "/media/img/dva-team.jpg", alt: "The D’Life advisory team", position: "50% 28%" }}
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
