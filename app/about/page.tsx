import type { Metadata } from "next";
import type { ReactNode } from "react";
import Shell from "../../components/v2/Shell";
import JsonLd from "../../components/site/JsonLd";
import {
  Hero,
  Band,
  SplitShot,
  Checks,
  ClosingCard,
  Cards,
  Creed,
  MissionVision,
  Record,
} from "../../components/v2/blocks";
import { ROUTES } from "../../lib/routes";
import { asset, link } from "../../lib/asset";
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

   A15 (client, 31 Aug 2026): the founder portraits are real now. Sharon and
   Rachel were supplied as SHARON.jpg and RACHEL.jpg in the client's own Drive
   folder, and each is mapped to its subject BY FILENAME — not by looking at
   the two photographs and deciding which woman is the older sister. If a
   third portrait ever arrives, map it the same way and confirm the name with
   the client rather than inferring it.

   The empty-slot path below is kept for exactly that case: a founder without
   a portrait still renders a marked slot. A stock photograph standing in for
   a real named person is the one substitution this design system refuses to
   make, and that has not changed.

   ⚠️ TODO(launch): both portraits are studio shots in AIA MDRT blazers, with
   the AIA wordmark and the MDRT roundel legible on the lapel. Nothing else on
   this site names an insurer — content/solutions.ts forbids it outright — so
   whether D'Life wants insurer branding on its founders' portraits is the
   client's call and a compliance question, not a design one. Raise it before
   launch. The alternative is a re-shoot, not a retouch.
   ============================================================ */

/* The last entry carries the client's 45-countries credential inside the
   convention row rather than as a row of its own, and advisor incomes appear
   as a subordinate clause in the development band's lede: the client asked
   for both (2026-08 decisions doc, Q4) included subtly, and a trophy row is
   the opposite of subtle. Both join the verify-before-publish set. */
/* The practice's four-part line, in the client's own order. See the header
   note: presented as the practice's commitments, not as a quotation. */
const COMMITMENTS = [
  { term: "Protect Lives", copy: "Cover built around the people who actually depend on you." },
  { term: "Build Wealth", copy: "Decisions you could explain, in your own words, to your own family." },
  { term: "Transform People", copy: "Advisors developed into professionals, and professionals into leaders." },
  { term: "Create Impact", copy: "A practice that leaves the profession in better standing than it found it." },
];

const RECOGNITION = [
  /* ⚠️ See the note on the homepage trust card: the client's performance
     summary reads 25 years 4 months as at Aug 2026, measured as service with
     the principal insurer. Raised with the client rather than overwritten. */
  "27 years in the financial services industry",
  "GAMA Premium Recruitment Award",
  "GAMA Excellent Recruitment Award",
  "MDRT Builder",
  "Million Dollar Agency (MDA) Qualifier",
  "Million Dollar District (MDD) Achiever",
  "Seven-time MDRT Qualifier",
  "Multiple overseas convention qualifier, across more than 45 countries",
];

function Founder({
  name,
  role,
  photo,
  flip = false,
  tone = "light",
  children,
}: {
  name: string;
  role: string;
  /** Omitted still renders the marked slot. See the header note. */
  photo?: { src: string; alt: string; position?: string };
  flip?: boolean;
  tone?: "light" | "sand";
  children: ReactNode;
}) {
  return (
    <Band tone={tone}>
      <div className={`folk${flip ? " folk--flip" : ""}`}>
        <div className="plate ph">
          {photo ? (
            <img
              src={asset(photo.src)}
              alt={photo.alt}
              style={photo.position ? { objectPosition: photo.position } : undefined}
            />
          ) : (
            /* Marked placeholder, deliberately. See the header note. */
            <div className="slot-empty">
              {name}
              <em>{role}</em>
            </div>
          )}
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
        title="Founded by sisters and built with purpose"
        lede="D’Life was started by two sisters who believed that success is not simply about making money. It is about building a life that means something."
        photo={{ src: "/media/img/policy-review.jpg", alt: "Two women talking across a table", position: "55% 40%" }}
        actions={
          <a className="pill" href={advisor}>
            <span>Speak with an Advisor</span>
          </a>
        }
      />

      {/* ⚠️ THE OPENING SECTION FOLLOWS THE SAME PATTERN ON ALL FIVE PAGES.
          Round 19, client: "every page's beginning section is changed to be
          like this (headline on top and description on bottom), I don't like
          this design — replace all page first sections that are like this to
          [the Advisor development section]."

          What was wrong was not the stacking; that section stacks too. It was
          that these openings had only two parts to stack. A sentence-long
          heading sitting straight on a block of body prose reads as the top of
          an article, not as the start of a section — there is no label to say
          what the section IS, and the description carries the same ink weight
          as the heading, so nothing steps down.

          They take the page's own section grammar now, the one "Advisor
          development" uses: a copper label, the heading, then the description
          as a lede rather than as body copy. Three registers instead of two.
          Any further paragraphs stay as prose underneath. */}
      <Band
        read
        label="Where it began"
        title="Sharon and Rachel Cheang grew up without financial abundance."
        lede="What that taught them — hard work, integrity, compassion and a habit of continuing to learn — became the foundation of the agency they built. It is also why the first question here is usually about your circumstances rather than your budget."
      >
        <div className="dl-prose">
          <p>
            D’Life is a Malaysian financial advisory and insurance agency. We help individuals, families, professionals
            and business owners protect what matters and plan for what is ahead, and we stay with them after the
            paperwork is done. Alongside that, we develop advisors, and we run two community initiatives: the{" "}
            <a href={link(ROUTES.dva.path)}>Drive Value Associates</a> leadership circle and the{" "}
            <a href={link(ROUTES.youth.path)}>Youth Community</a>.
          </p>
        </div>
      </Band>

      {/* The page's one ink panel. The four commitments are the practice's own
          statement of what it is for, so they get the strongest object on the
          page rather than four columns of text on a band. */}
      <Creed
        label="What the practice is for"
        title="Our 4 commitments"
        items={COMMITMENTS}
        icons={["shield", "coins", "people", "building"]}
      />

      <MissionVision
        label="What we are working towards"
        title="Mission and vision"
        items={[
          {
            kind: "Mission",
            claim: "Financial confidence, and leaders worth trusting",
            copy: "To empower individuals and families with financial confidence, create lasting value through professional financial advice, and nurture future leaders who serve with integrity and purpose.",
          },
          {
            kind: "Vision",
            claim: "The most trusted advisory practice we can be",
            copy: "To become the most trusted financial advisory company, transforming lives through meaningful financial planning, while helping financial advisors become respected professionals and capable leaders.",
          },
        ]}
      />

      <Founder
        name="Sharon Cheang"
        role="Founder"
        /* A15. Mapped from the client's SHARON.jpg. The frame is the shot's
           own upper two-thirds, so the 4:5 plate holds her head and hands
           without cutting either — see docs/dlife-asset-map.md. */
        photo={{
          src: "/media/img/founder-sharon.jpg",
          alt: "Sharon Cheang, founder of D’Life",
          position: "50% 22%",
        }}
      >
        <p>
          Sharon founded D’Life after more than two decades in financial services. She entered the industry with an aim
          larger than selling policies: to help families build secure, well-considered lives, and to raise the standard
          of the advice they were being given.
        </p>
        <p>
          Over 27 years she has advised a great many Malaysian families and mentored a generation of financial
          consultants. She also founded <a href={link(ROUTES.dva.path)}>Drive Value Associates</a>, the leadership
          circle that grew out of that mentoring work. Her mentoring today centres on 4 things: mindset,
          personality, wealth and quality of life.
        </p>
        <p>
          She is unusually firm on one point: financial success should not come at the cost of family, health or
          personal fulfilment. It should create the freedom to enjoy all three.
        </p>
      </Founder>

      <Founder
        name="Rachel Cheang"
        role="Co-Founder"
        flip
        tone="sand"
        /* A15. Mapped from the client's RACHEL.jpg. The supplied frame is
           full-length, which left her a small figure in a field of backdrop
           at plate size; cropped to head-and-upper-body instead. */
        photo={{
          src: "/media/img/founder-rachel.jpg",
          alt: "Rachel Cheang, co-founder of D’Life",
          position: "50% 25%",
        }}
      >
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
        /* A15: was a stock plate standing in for "the D'Life advisory team".
           This is the practice's own room. */
        photo={{ src: "/media/img/team-award.jpg", alt: "D’Life advisors and managers at an agency recognition event", ratio: "4 / 3" }}
        tone="light"
        label="Recognition"
        title="Professional record"
      >
        <p className="dl-lede">
          Stated plainly rather than displayed: Sharon’s credentials over a 27-year career. Every entry is pending
          client verification.
        </p>
        <Checks items={RECOGNITION} />
      </SplitShot>

      {/* The figures were a loose stack under a lede. Held on a contained sand
          panel they read as one record: the sentence that frames them beside
          the figures themselves. */}
      <Record
        label="Advisor development"
        title="Advisors she has built"
        /* ⚠️ ARE THESE REAL? Asked by the client on 6 Sep 2026, and the
           honest answer has three parts.
           
           1. The numbers are real. Every one is read off the client's own
              adviser-portal performance summary, screenshotted 14 Aug 2026 and
              supplied with the brief. Nothing here is estimated.
           2. One of them was in the wrong section. "RM921m of cover arranged"
              is agency PRODUCTION, not advisor development — a fine figure,
              and not evidence for a heading about the advisors Sharon built.
              It has been removed rather than relabelled.
           3. The scope is still unverified. The summary measures the agency,
              and whether "the agency" and "the advisors she built" are the
              same population over the same period is a question only the
              client can answer. About still says every figure is pending
              their verification, and it should keep saying so until they
              confirm it.

           The two that stay are development figures on any reading — how many
           advisors the practice holds, and how many of them reached MDRT —
           plus the clients those advisors look after between them. The panel
           now prints the source and date under them, which is the difference
           between a claim and a record. See docs/dlife-figures.md. */
        lede="The part of the work Sharon is proudest of is not her own production. It is the advisors who came through the practice and went on to run teams of their own, a number of them from corporate careers in other industries."
        photo={{ src: "/media/img/team-gathering.jpg", alt: "The D’Life advisory team together at an agency gathering", ratio: "1800 / 1158" }}
        figures={[
          { fig: "29", copy: "advisors in the practice today" },
          { fig: "2", copy: "MDRT qualifiers the practice has produced" },
          { fig: "2,872", copy: "clients they look after between them" },
        ]}
        source="Figures as at August 2026, from D’Life’s own performance record. Pending client verification."
      />

      {/* A08 (client, 31 Aug 2026): the six-card "The Team" directory is
          removed — heading, lede, portrait placeholders and name placeholders
          together, not just the unfilled cards. The two onward routes that sat
          under it are not part of the directory and neither leads to it, so
          they stay, now carried by a plain band. The roster seam itself
          survives in content/team.ts if a real, named team is ever supplied. */}
      {/* Round 16, client: "reference the design of our card, with an image
          background overlay." These were the text-only card — a rule, a
          heading, a line and a link — at the foot of a page carrying the
          founders' portraits and two photographic panels, which is where the
          design visibly stopped.

          Each card takes its destination's own hero photograph, so the preview
          looks like the page it opens. Both are 4:3 and the frame follows the
          picture, so neither is cropped. See amendments.css §36. */}
      <Band tone="light">
        <Cards
          columns={2}
          overlay
          items={[
            {
              title: "Grow With D’Life",
              copy: "What a career here actually involves, and who it suits.",
              href: ROUTES.careers.path,
              cta: "Explore a career",
              photo: {
                src: "/media/img/team-outdoors.jpg",
                alt: "D’Life advisors together on an agency away day",
                ratio: "4 / 3",
              },
            },
            {
              title: "Advisor stories",
              copy: "Advisors in their own words, on the work and why they stayed.",
              href: ROUTES.stories.path,
              cta: "Watch the stories",
              photo: {
                src: "/media/img/team-offsite.jpg",
                alt: "D’Life advisors relaxed away from the office",
                ratio: "4 / 3",
              },
            },
          ]}
        />
      </Band>

      <ClosingCard
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
