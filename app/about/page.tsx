import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import JsonLd from "../../components/site/JsonLd";
import PageHero from "../../components/blocks/PageHero";
import { Band, Prose, Pullquote, CheckList } from "../../components/blocks/Prose";
import { SplitStory } from "../../components/blocks/Steps";
import { Portrait, CardGrid } from "../../components/blocks/Cards";
import ContextualCTA from "../../components/blocks/CTA";
import RelatedContent from "../../components/blocks/Related";
import { ROUTES } from "../../lib/routes";
import { WA } from "../../lib/contact";
import { pageMeta, breadcrumbLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.about);

/* ============================================================
   About D'Life & our founders.

   Source: the client's own "About the Founders" document.

   ⚠️ LANGUAGE NOTE. The source material describes D'Life as a "transformation
   platform" and organises Sharon's work around mindset, personality, wealth
   and quality of life. That is internal language: to a stranger it reads as
   vague and seminar-like, which the brand's own guide rules out. Public copy
   stays anchored to financial advisory and protection, and lets the
   transformation show through what people actually did rather than as a label.

   ⚠️ Sharon's philosophy — "Protect Lives. Build Wealth. Transform People.
   Create Impact." — is kept verbatim and attributed to her, rather than
   paraphrased into house copy. It is hers.

   ⚠️ The founder is a trust anchor, not the subject. The guide is explicit:
   use Sharon's story for values, credibility and commitment "without turning
   the website into a personal biography". This page stays under that line —
   two sisters and an agency, not a profile.

   ⚠️ PENDING VERIFICATION before publication: every award, credential and
   figure in the recognition section below is transcribed from the client's
   document and is listed in the direction guide as verify-before-publish.
   Confirm with D'Life which of these may appear publicly.
   ============================================================ */

const RECOGNITION = [
  "27 years in the financial services industry",
  "GAMA Premium Recruitment Award",
  "GAMA Excellent Recruitment Award",
  "MDRT Builder",
  "Million Dollar Agency (MDA) Qualifier",
  "Million Dollar District (MDD) Achiever",
  "Multiple-year MDRT Qualifier",
  "Multiple overseas convention qualifier",
];

const DEVELOPED = [
  "Multiple MDRT consultants",
  "Three agency managers",
  "More than 40 young assistant and unit managers",
  "Professionals moving from corporate careers into financial planning",
];

export default function Page() {
  const route = ROUTES.about;

  return (
    <SiteShell path={route.path}>
      <PageHero
        route={route}
        label="About D’Life"
        title={<>Founded by sisters, built with purpose</>}
        lede="D’Life was started by two sisters who believed that success is not simply about making money — it is about building a life that means something, and helping other people do the same."
      />

      <Band width="read">
        <Prose>
          <p>
            Sharon and Rachel Cheang grew up without financial abundance. What that taught them — hard work, integrity,
            compassion and a habit of continuing to learn — became the foundation of the agency they built. It is also
            why the first question here is usually about your circumstances rather than your budget.
          </p>
          <p>
            D’Life is a Malaysian financial advisory and insurance agency. We help individuals, families, professionals
            and business owners protect what matters and plan for what is ahead — and we stay with them after the
            paperwork is done. Alongside that, we develop advisors, and we run two community initiatives: the{" "}
            <a href="/dva">Drive Value Associates</a> leadership circle and the{" "}
            <a href="/youth-community">Youth Community</a>.
          </p>
        </Prose>
      </Band>

      {/* Her words, kept as hers rather than translated into house copy. */}
      <Band tone="dark" width="read">
        <Pullquote cite="Sharon Cheang, Founder">
          “Protect Lives. Build Wealth. Transform People. Create Impact.”
        </Pullquote>
        <Prose>
          <p>
            In practice, that comes down to something simpler: we help you protect what matters, plan for what is
            ahead, and we are still here afterwards.
          </p>
        </Prose>
      </Band>

      <Band tone="sand" label="What we are working towards" title={<>Mission and vision</>} width="wide">
        <div className="dl-cards dl-cards--2">
          <article className="dl-card rv">
            <div className="dl-card__body">
              <span className="dl-card__no">Mission</span>
              <h3>Financial confidence, and leaders worth trusting</h3>
              <p>
                To empower individuals and families with financial confidence, create lasting value through professional
                financial advice, and nurture future leaders who serve with integrity and purpose.
              </p>
            </div>
          </article>
          <article className="dl-card rv">
            <div className="dl-card__body">
              <span className="dl-card__no">Vision</span>
              <h3>The most trusted advisory practice we can be</h3>
              <p>
                To become the most trusted financial advisory company — transforming lives through meaningful financial
                planning, while helping financial advisors become respected professionals and capable leaders.
              </p>
            </div>
          </article>
        </div>
      </Band>

      {/* ── Sharon ───────────────────────────────────────────── */}
      <section id="sharon" className="dl-band dl-split">
        <div className="dl-split__ph">
          {/* TODO(launch): founder portraits. The slot stays marked rather than
              filled with a film still — photography rights are a blocking
              question, and a founder's face is the last thing to fake. */}
          <Portrait name="Sharon Cheang" role="Founder" />
        </div>
        <div className="dl-split__body">
          <span className="lb rv">Founder</span>
          <h2 className="rv">Sharon Cheang</h2>
          <div className="dl-prose rv">
            <p>
              Sharon founded D’Life after more than two decades in financial services. She entered the industry with an
              aim larger than selling policies: to help families build secure, well-considered lives, and to raise the
              standard of the advice they were being given.
            </p>
            <p>
              Over 27 years she has advised a great many Malaysian families and mentored a generation of financial
              consultants. Her title inside the practice is Founder and Transformation Leadership Mentor, and she also
              founded <a href="/dva">Drive Value Associates</a>, the leadership circle that grew out of that mentoring
              work.
            </p>
            <p>
              She is unusually firm on one point: financial success should not come at the cost of family, health or
              personal fulfilment. It should create the freedom to enjoy all three.
            </p>
          </div>
        </div>
      </section>

      {/* ── Rachel ───────────────────────────────────────────── */}
      <section id="rachel" className="dl-band dl-split dl-split--flip sand">
        <div className="dl-split__ph">
          <Portrait name="Rachel Cheang" role="Co-Founder" />
        </div>
        <div className="dl-split__body">
          <span className="lb rv">Co-Founder</span>
          <h2 className="rv">Rachel Cheang</h2>
          <div className="dl-prose rv">
            <p>
              Rachel leads business development, community engagement and the youth development side of D’Life. Where
              Sharon is strategic, Rachel is relational — she builds the rooms people want to come back to.
            </p>
            <p>
              She is particularly involved with young professionals and families finding their direction, and she leads
              the <a href="/youth-community">Youth Community</a>, D’Life’s open platform for students, fresh graduates
              and people early in their careers.
            </p>
            <p>
              The two of them are sisters, and the partnership works on the ordinary basis that good partnerships do:
              trust, shared values, and a common idea of what the work is for.
            </p>
          </div>
        </div>
      </section>

      {/* ⚠️ Everything in this band is pending client verification. */}
      <Band label="Recognition" title={<>Professional record</>} width="wide">
        <Prose>
          <p>
            Stated plainly rather than displayed. These are Sharon’s professional credentials over a 27-year career in
            the industry.
          </p>
        </Prose>
        <CheckList items={RECOGNITION} />
      </Band>

      <Band tone="sand" label="Advisor development" title={<>People she has helped build</>} width="wide">
        <Prose>
          <p>
            The part of the work Sharon is proudest of is not her own production. It is the advisors and leaders who
            came through the practice and went on to run teams of their own.
          </p>
        </Prose>
        <CheckList items={DEVELOPED} columns={1} />
        <CardGrid
          cards={[
            {
              title: "Grow With D’Life",
              copy: "What a career here actually involves, and who it suits.",
              href: ROUTES.careers.path,
              cta: "Explore a career",
            },
            {
              title: "Advisor stories",
              copy: "Advisors in their own words, on the work and why they stayed.",
              href: ROUTES.stories.path,
              cta: "Watch the stories",
            },
          ]}
          columns={2}
        />
      </Band>

      <ContextualCTA
        label="Next step"
        title="Meet the people, not the brochure"
        copy="If you would rather start by talking to someone than by reading about us, that is usually the better order."
        wa={WA.conversation}
        secondary={{ label: "See how we can help", href: ROUTES.solutions.path }}
      />

      <RelatedContent keys={["dva", "youth", "careers"]} tone="sand" />

      <JsonLd data={breadcrumbLd(route)} />
    </SiteShell>
  );
}
