import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import Ask, { type Question } from "../../components/v2/Ask";
import JsonLd from "../../components/site/JsonLd";
import { ClosingCard } from "../../components/v2/blocks";
import { ROUTES } from "../../lib/routes";
import { asset, link } from "../../lib/asset";
import { pageMeta, breadcrumbLd, faqLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.dva);

/* ============================================================
   Drive Value Associates (DVA).

   Source: the client's own "About the Founders" document, section 4, as
   rebuilt in the Claude Design project (direction E2, "layered depth").

   ── Design intent ──────────────────────────────────────────
   DVA and the Youth Community are a deliberate contrast pair. DVA's power is
   exclusivity; Youth's is openness. Placed together they explain each other
   without a paragraph of copy — so this page is short, dark, contained and
   restrained, and the Youth page is long, warm and content-rich. If a future
   edit makes this page bigger or brighter, the pair stops working.

   This is the only page in the site that opens on `.crest`: type first, with
   the photograph held back until under the fold. Every other page leads with
   a picture and a copy panel cut into it. That difference is the whole
   register change between something you can buy and something you are asked
   to join — do not "harmonise" this hero with the others.

   ⚠️ AUDIENCE — previously an open question, now resolved by the source.
   The client's document opens by describing DVA as "professionals from
   different backgrounds", then states its purpose as building "a community of
   exceptional financial advisors" and says plainly that it is "built for
   financial advisors". Read together, the consistent reading is: financial
   advisors, who arrive from a range of professional backgrounds. That is how
   this page is written. Worth confirming with Sharon at sign-off.

   ⚠️ Not open recruitment. Membership is by invitation and every member is
   personally interviewed by the founder. The page must never read as an
   application funnel — the CTA asks a question, it does not invite a signup.
   ============================================================ */

const FAQS: Question[] = [
  {
    q: "Can I apply to join?",
    a: "Not in the usual sense. Membership is by invitation, and every member is personally interviewed by Sharon before joining. You are welcome to ask about it, and that conversation is where it would start.",
  },
  {
    q: "Is DVA a recruitment channel for D’Life?",
    a: "No. Members remain in their own practices. DVA exists to raise the standard of the profession, not to move people between agencies.",
  },
  {
    q: "What is the commitment?",
    a: "A monthly Growth Circle, plus workshops, forums and community projects across the year. It is a real commitment of time, which is part of why the circle stays small.",
  },
];

/* What members develop. Set as `.index` rather than as cards: these are
   provisions, and the list should read down the page. */
const DEVELOPS = [
  {
    title: "Leadership",
    copy: "The mindset, confidence and practical skill to influence teams, guide others and lead with purpose in business and outside it.",
  },
  {
    title: "Communication",
    copy: "Interpersonal communication, client engagement, negotiation, presentation and relationship building.",
  },
  {
    title: "Personal branding",
    copy: "A credible, authentic professional identity that reflects your values, expertise and long-term aspirations.",
  },
  {
    title: "Financial literacy",
    copy: "Deeper understanding of financial planning, wealth management, industry movement and responsible advisory practice.",
  },
  {
    title: "Mentorship",
    copy: "Ongoing coaching and knowledge sharing from experienced leaders, drawn from real business experience rather than theory.",
  },
  {
    title: "Public speaking",
    copy: "Structured opportunities to present, facilitate discussion and communicate ideas with confidence.",
  },
];

/* Grouped by how often each session comes round. Eight equal bullets said
   nothing about the shape of a year; the frequency is the information a
   prospective member actually wants. */
const CADENCE = [
  {
    when: "Every month",
    note: "The spine of it",
    items: [
      {
        name: "Growth Circle",
        copy: "Progress, obstacles and shared experience, in a room where everyone is held to the same line.",
      },
    ],
  },
  {
    when: "Through the quarter",
    note: "Development",
    items: [
      { name: "Leadership workshops", copy: "Strategic thinking, decision-making and coaching." },
      { name: "Learning forums", copy: "Industry experts and experienced practitioners, on the record." },
      { name: "Personal development programmes", copy: "Structured, and chosen by the member." },
    ],
  },
  {
    when: "Across the year",
    note: "The circle in practice",
    items: [
      { name: "Networking sessions", copy: "Members and invited guests." },
      { name: "Team building", copy: "Indoors and outdoors." },
      { name: "Charity and volunteer projects", copy: "Work members contribute to together." },
      { name: "Cross-agency collaboration", copy: "Joint initiatives beyond D’Life." },
    ],
  },
];

const TRAITS = [
  "Values that hold up when nobody is checking",
  "Ethics before opportunity, in every recommendation",
  "Professionalism: licensing, disclosure and continued learning",
  "A long-term view of a client relationship, and of a career",
];

export default function Page() {
  const route = ROUTES.dva;

  return (
    <Shell>
      {/* Type-led hero. The photograph is a full-height plate carried off the
          right edge — no card over the crop. */}
      <section className="crest dark ink">
        <div className="fg">
          <nav className="dl-crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <a href={link(ROUTES.home.path)}>Home</a>
                <em>/</em>
              </li>
              <li>
                <span aria-current="page">Drive Value Associates</span>
              </li>
            </ol>
          </nav>
          <p className="lbl">Drive Value Associates</p>
          <h1>
            <span>Built for leaders,</span>
            <span>by invitation.</span>
          </h1>
          <div className="r" />
          <p className="dl-lede">
            A selective circle of financial advisors, shaped by shared values and experience. Founded by Sharon Cheang.
          </p>
          <div className="dl-actions">
            <a className="pill sand" href={link(ROUTES.contact.path)}>
              <span>Ask about DVA</span>
            </a>
          </div>
        </div>
        <div className="shot ph">
          <img
            src={asset("/media/img/dva-team.jpg")}
            alt="The D’Life advisory team"
            style={{ objectPosition: "58% 42%" }}
          />
        </div>
      </section>

      {/* The page's single loud moment: one statement at display scale, alone. */}
      <section className="bleed light">
        <div className="r" />
        <p className="lead">It is not a networking group.</p>
        <p className="foot">
          Networking groups meet to exchange referrals. This one meets for long-term development, working relationships
          and collaborative success. The difference shows up in what members are asked to give rather than in what they
          are offered.
        </p>
      </section>

      <section className="band sand">
        <p className="lbl">Purpose</p>
        <h2 style={{ maxWidth: "28ch" }}>
          To build a community of exceptional financial advisors who lead with integrity and grow with purpose
        </h2>
        <p className="dl-lede" style={{ maxWidth: "54ch" }}>
          Members arrive from a range of professional backgrounds and stay in their own practices. What they share is
          the aim, not an employer. These are the four things the circle is organised around.
        </p>
        <div className="pillars">
          <div>
            <b>Learning</b>
            <p>Progress is discussed openly, including the parts that are not working.</p>
          </div>
          <div>
            <b>Leadership</b>
            <p>Advisors developed into people others choose to follow.</p>
          </div>
          <div>
            <b>Real value</b>
            <p>Advice measured by what it does for the client, not by what it produces.</p>
          </div>
          <div>
            <b>Impact</b>
            <p>A profession left in better standing than the circle found it.</p>
          </div>
        </div>
      </section>


      <section className="band light">
        <p className="lbl">What members develop</p>
        <h2>The work of the circle</h2>
        <div className="index">
          {DEVELOPS.map((item, i) => (
            <div key={item.title}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <div className="with">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="band sand">
        <p className="lbl">Across the year</p>
        <h2 style={{ maxWidth: "22ch" }}>The shape of a year in the circle</h2>
        <p className="dl-lede" style={{ maxWidth: "54ch" }}>
          Eight kinds of session. What tells you most about the commitment is how often each one comes round.
        </p>
        <div className="cadence">
          {CADENCE.map((group) => (
            <div key={group.when}>
              <span className="when">{group.when}</span>
              <span className="note">{group.note}</span>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name}>
                    <b>{item.name}</b>
                    <span>{item.copy}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Selection, as a process on one copper line. Sticky rail beside it so
          the label stays put while the three beats scroll. */}
      <section className="spread light">
        <div className="spread__rail">
          <p className="lbl">Selection</p>
          <h2>Slow, on purpose</h2>
          <p className="aside">
            There is no application form, and there is no cohort. A place opens when the fit is right and not before.
          </p>
        </div>
        <div className="spread__body">
          <div className="seq">
            <div>
              <span className="k">First</span>
              <h3>A conversation</h3>
              <p>
                Usually because a member has suggested it, or because you asked. Nothing is decided at this stage.
              </p>
            </div>
            <div>
              <span className="k">Then</span>
              <h3>A personal interview with Sharon</h3>
              <p>
                Every member is interviewed and selected by Sharon herself, to make sure the alignment is genuine rather
                than assumed.
              </p>
            </div>
            <div>
              <span className="k">Only then</span>
              <h3>An invitation</h3>
              <p>
                Extended when the standard is clearly shared. Some conversations end here, and that is a reasonable
                outcome for both sides.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band dark ink">
        <p className="lbl">The standard</p>
        <h2 style={{ maxWidth: "22ch" }}>Four things every member is asked to hold</h2>
        <div className="traits">
          {TRAITS.map((trait, i) => (
            <div key={trait}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              <span>{trait}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ask-host light">
        <div className="ask-head">
          <p className="lbl">Questions</p>
          <h2>About membership</h2>
        </div>
        <div>
          <Ask items={FAQS} />
          <div className="dl-actions" style={{ marginTop: "clamp(28px,4vh,44px)" }}>
            <a className="pill ghost" href={link(ROUTES.contact.path)}>
              <span>Ask us something else</span>
            </a>
          </div>
        </div>
      </section>

      {/* The CTA asks a question rather than inviting an application. Now the
          standardised next-step card, as on every other page. */}
      <ClosingCard
        label="Discover DVA"
        title="If this sounds like the room you have been looking for"
        lede="Membership is by invitation, but a conversation is not. Tell us a little about your practice and we will take it from there."
        note=""
        actions={
          <>
            <a className="pill" href={link(ROUTES.contact.path)}>
              <span>Ask about DVA</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.about.path)}>
              <span>Read about D’Life</span>
            </a>
          </>
        }
      />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS.map(({ q, a }) => ({ q, a })))} />
    </Shell>
  );
}
