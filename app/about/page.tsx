import type { Metadata } from "next";
import type { ReactNode } from "react";
import Shell from "../../components/v2/Shell";
import JsonLd from "../../components/site/JsonLd";
import { Hero, Band, Open, SplitShot, Checks, Closing, Cards } from "../../components/v2/blocks";
import { ROUTES } from "../../lib/routes";
import { link } from "../../lib/asset";
import { WA, waHref } from "../../lib/contact";
import { pageMeta, breadcrumbLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.about);

/* ============================================================
   About D'Life.

   ⚠️ VERIFY BEFORE PUBLISH. Every figure on this page came through the client
   brief unverified and is listed as such in the design bundle's own README:
   the 27 years, all eight recognition entries, the 3 agency managers, the 40+
   unit managers and the MDRT line. They are stated plainly rather than
   displayed as achievements, and the recognition band says on the page that
   it is pending verification. Do not promote any of them into a headline
   claim until the client confirms them.

   ⚠️ "Protect Lives. Build Wealth. Transform People. Create Impact." is
   presented here as the practice's four commitments, NOT as a quotation from
   Sharon. It arrived through the brief as D'Life's own four-part line, and
   whether Sharon ever said it as a sentence is unconfirmed. No attribution is
   printed. Confirm before adding one.

   Founder portraits are marked empty slots, not stock photography. A stock
   photograph standing in for a real named person is the one substitution this
   design system refuses to make.
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

function Founder({
  name,
  role,
  flip = false,
  tone = "light",
  children,
}: {
  name: string;
  role: string;
  flip?: boolean;
  tone?: "light" | "sand";
  children: ReactNode;
}) {
  return (
    <Band tone={tone}>
      <div className={`folk${flip ? " folk--flip" : ""}`}>
        <div className="plate ph">
          {/* Marked placeholder, deliberately. See the header note. */}
          <div className="slot-empty">
            {name}
            <em>{role}</em>
          </div>
        </div>
        <div>
          <p className="lbl">{role}</p>
          <h2 style={{ marginTop: 6 }}>{name}</h2>
          <div className="dl-prose" style={{ marginTop: 22 }}>
            {children}
          </div>
        </div>
      </div>
    </Band>
  );
}

export default function Page() {
  const route = ROUTES.about;
  const advisor = waHref(WA.advisor);

  return (
    <Shell>
      <Hero
        route={route}
        label="About D’Life"
        title="Founded by sisters, built with purpose"
        lede="D’Life was started by two sisters who believed that success is not simply about making money. It is about building a life that means something."
        photo={{ src: "/media/img/policy-review.jpg", alt: "Two women talking across a table", position: "55% 40%" }}
        actions={
          <a className="pill" href={advisor}>
            <span>Speak with an Advisor</span>
          </a>
        }
      />

      <Band>
        <Open lead="Sharon and Rachel Cheang grew up without financial abundance. What that taught them became the foundation of the agency they built.">
          <p>
            Hard work, integrity, compassion and a habit of continuing to learn. It is also why the first question here
            is usually about your circumstances rather than your budget.
          </p>
          <p>
            D’Life is a Malaysian financial advisory and insurance agency. We help individuals, families, professionals
            and business owners protect what matters and plan for what is ahead, and we stay with them after the
            paperwork is done. Alongside that, we develop advisors, and we run two community initiatives: the{" "}
            <a href={link(ROUTES.dva.path)}>Drive Value Associates</a> leadership circle and the{" "}
            <a href={link(ROUTES.youth.path)}>Youth Community</a>.
          </p>
        </Open>
      </Band>

      <Band tone="dark" label="What the practice is for">
        <h2 style={{ maxWidth: "22ch" }}>Four commitments, in the order they matter</h2>
        <div className="pillars">
          <div>
            <b>Protect Lives</b>
            <p>Cover built around the people who actually depend on you.</p>
          </div>
          <div>
            <b>Build Wealth</b>
            <p>Decisions you could explain, in your own words, to your own family.</p>
          </div>
          <div>
            <b>Transform People</b>
            <p>Advisors developed into professionals, and professionals into leaders.</p>
          </div>
          <div>
            <b>Create Impact</b>
            <p>A practice that leaves the profession in better standing than it found it.</p>
          </div>
        </div>
      </Band>

      <Band tone="sand" label="What we are working towards" title="Mission and vision">
        <div className="mv">
          <div>
            <span className="k">Mission</span>
            <h3>Financial confidence, and leaders worth trusting</h3>
            <p>
              To empower individuals and families with financial confidence, create lasting value through professional
              financial advice, and nurture future leaders who serve with integrity and purpose.
            </p>
          </div>
          <div>
            <span className="k">Vision</span>
            <h3>The most trusted advisory practice we can be</h3>
            <p>
              To become the most trusted financial advisory company, transforming lives through meaningful financial
              planning, while helping financial advisors become respected professionals and capable leaders.
            </p>
          </div>
        </div>
      </Band>

      <Founder name="Sharon Cheang" role="Founder">
        <p>
          Sharon founded D’Life after more than two decades in financial services. She entered the industry with an aim
          larger than selling policies: to help families build secure, well-considered lives, and to raise the standard
          of the advice they were being given.
        </p>
        <p>
          Over 27 years she has advised a great many Malaysian families and mentored a generation of financial
          consultants. She also founded <a href={link(ROUTES.dva.path)}>Drive Value Associates</a>, the leadership
          circle that grew out of that mentoring work. Her mentoring today centres on four things: mindset,
          personality, wealth and quality of life.
        </p>
        <p>
          She is unusually firm on one point: financial success should not come at the cost of family, health or
          personal fulfilment. It should create the freedom to enjoy all three.
        </p>
      </Founder>

      <Founder name="Rachel Cheang" role="Co-Founder" flip tone="sand">
        <p>
          Rachel leads business development, community engagement and the youth development side of D’Life. Where
          Sharon is strategic, Rachel is relational: she builds the rooms people want to come back to.
        </p>
        <p>
          She is particularly involved with young professionals and families finding their direction, and she leads the{" "}
          <a href={link(ROUTES.youth.path)}>Youth Community</a>, D’Life’s open platform for students, fresh graduates
          and people early in their careers.
        </p>
        <p>
          The two of them are sisters, and the partnership works on the ordinary basis that good partnerships do:
          trust, shared values, and a common idea of what the work is for.
        </p>
      </Founder>

      <SplitShot
        photo={{ src: "/media/img/dva-team.jpg", alt: "The D’Life advisory team" }}
        tone="dark"
        label="Recognition"
        title="Professional record"
      >
        <p className="dl-lede">
          Stated plainly rather than displayed: Sharon’s credentials over a 27-year career. Every entry is pending
          client verification.
        </p>
        <Checks items={RECOGNITION} />
      </SplitShot>

      <Band label="Advisor development">
        <h2 style={{ maxWidth: "none" }}>Advisors she has built</h2>
        <p className="dl-lede">
          The part of the work Sharon is proudest of is not her own production. It is the advisors and leaders who came
          through the practice and went on to run teams of their own, a number of them arriving from corporate careers
          in other industries.
        </p>
        <div className="figs">
          <div>
            <b>3</b>
            <span>agency managers now running teams of their own</span>
          </div>
          <div>
            <b>40+</b>
            <span>young assistant and unit managers developed</span>
          </div>
          <div>
            <b>MDRT</b>
            <span>consultants, several of them multiple-year qualifiers</span>
          </div>
        </div>
        <Cards
          columns={2}
          items={[
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
        />
      </Band>

      <Closing
        photo={{
          src: "/media/img/community-gathering.jpg",
          alt: "People seated around a table at a community gathering",
          position: "50% 26%",
        }}
        title="Meet the people, not the brochure"
        lede="If you would rather start by talking to someone than by reading about us, that is usually the better order."
        actions={
          <>
            <a className="pill sand" href={advisor}>
              <span>Speak with an Advisor</span>
            </a>
            <a className="pill ghost" href={link(ROUTES["protecting-your-family"].path)}>
              <span>See how we can help</span>
            </a>
          </>
        }
        note=""
      />

      <JsonLd data={breadcrumbLd(route)} />
    </Shell>
  );
}
