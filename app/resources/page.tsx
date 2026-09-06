import type { Metadata } from "next";
import Shell from "../../components/v2/Shell";
import JsonLd from "../../components/site/JsonLd";
import { Hero, Band, ClosingCard, Events } from "../../components/v2/blocks";
import { ROUTES } from "../../lib/routes";
import { asset, link } from "../../lib/asset";
import { WA, waHref } from "../../lib/contact";
import { ROUTABLE_ARTICLES } from "../../content/articles";
import { pageMeta, breadcrumbLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.resources);

/* ============================================================
   Articles & Events.

   Simplified at the client's direction: two sections, articles then events.
   The old "Guidance" card grid duplicated the Solutions hub, the sign-up band
   duplicated the Youth page's, and "Also on this site" was a list of links
   the footer already carries.

   ⚠️ No article library exists yet, and this page must not pretend otherwise.
   While content/articles.ts is empty the section shows a labelled template
   with placeholder copy so the layout can be approved before anything is
   written. Publishing a record removes the template automatically.

   Event dates stay vague because no calendar has been supplied; every "ask
   about attending" opens WhatsApp rather than linking to a schedule that is
   not there.
   ============================================================ */

const EVENTS = [
  {
    when: "Monthly",
    where: "Klang Valley",
    title: "Growth Circle",
    photo: { src: "/media/img/dva-forum.jpg", alt: "Members in a Growth Circle session" },
    copy: "One of D’Life’s signature development platforms. A regular gathering where members reflect on progress, share experience, discuss what is not working and learn from each other.",
  },
  {
    when: "Through the year",
    where: "Klang Valley",
    title: "Leadership development workshops",
    photo: { src: "/media/img/team-office.jpg", alt: "A leadership development workshop" },
    copy: "Interactive sessions on strategic thinking, decision-making, emotional intelligence, coaching and applying leadership in practice.",
  },
  {
    when: "Regular",
    where: "Klang Valley",
    title: "Financial planning seminars",
    photo: { src: "/media/img/youth-workshop.jpg", alt: "An open session on planning fundamentals" },
    copy: "Open sessions on protection and planning fundamentals, run as education rather than as a sales presentation.",
  },
  {
    when: "Regular",
    where: "Klang Valley",
    title: "Learning forums",
    photo: { src: "/media/img/youth-resources.jpg", alt: "A learning forum with invited practitioners" },
    copy: "Knowledge sharing with industry experts and experienced professionals, covering advisory practice, business and personal development.",
  },
  {
    when: "Through the year",
    where: "Campus & community venues",
    title: "Youth leadership programmes",
    photo: { src: "/media/img/youth-session.jpg", alt: "A youth leadership session" },
    copy: "Sessions for students, fresh graduates and young professionals across health, wealth and leadership.",
  },
  {
    when: "Several a year",
    where: "Various",
    title: "Charity & community projects",
    photo: { src: "/media/img/community-gathering.jpg", alt: "Members at a community project" },
    copy: "Service initiatives that members contribute to across the year, run through DVA and the Youth Community.",
  },
];

export default function Page() {
  const route = ROUTES.resources;
  const events = waHref(WA.event);

  return (
    <Shell>
      <Hero
        route={route}
        label="Articles & events"
        title="Reading and what’s coming up"
        lede="Writing worth your time, and the sessions that run across the D’Life community through the year."
        photo={{ src: "/media/img/dva-workshop.jpg", alt: "A workshop session in progress" }}
      />

      {/* Driven by content/articles.ts. A12: while the library is empty this
          band renders nothing at all — the template article used to stand in
          here as a real, clickable card, which put placeholder copy on a
          public page. Publishing a record brings the band back. */}
      {ROUTABLE_ARTICLES.length > 0 && (
      <Band title="Articles">
        <div className="arts">
          {ROUTABLE_ARTICLES.map((a) => (
            <a className="art" href={link(`/articles/${a.slug}`)} key={a.slug}>
              <div className="ph">
                {a.photo ? (
                  <img src={asset(a.photo.src)} alt={a.photo.alt} />
                ) : (
                  <div className="slot-empty">
                    Lead image
                    <em>{a.template ? "Template" : "To be supplied"}</em>
                  </div>
                )}
              </div>
              <div className="body">
                <div className="meta">
                  <span>{a.template ? "Template" : a.category}</span>
                  <em>{a.read}</em>
                </div>
                <h3>{a.title}</h3>
                <p>{a.blurb}</p>
              </div>
            </a>
          ))}
        </div>
      </Band>
      )}

      <Band label="Events" title="What runs across the year">
        <div className="dl-prose" style={{ marginTop: 20 }}>
          <p>
            D’Life and <a href={link(ROUTES.dva.path)}>DVA</a> run a programme of workshops, forums and community
            sessions through the year, alongside the <a href={link(ROUTES.youth.path)}>Youth Community</a>. Dates go out
            to members ahead of time. Ask us and we will let you know what is next.
          </p>
        </div>
        <Events items={EVENTS} href={events} />
      </Band>

      <ClosingCard
        title="Would rather just ask someone?"
        lede="Reading is a fine place to start, but most questions are quicker to answer in a conversation."
        actions={
          <>
            <a className="pill sand" href={waHref(WA.question)}>
              <span>Ask a question</span>
            </a>
            <a className="pill ghost" href={link(ROUTES.solutions.path)}>
              <span>Explore protection &amp; planning</span>
            </a>
          </>
        }
      />

      <JsonLd data={breadcrumbLd(route)} />
    </Shell>
  );
}
