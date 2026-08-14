import type { Metadata } from "next";
import SiteShell from "../../components/site/SiteShell";
import JsonLd from "../../components/site/JsonLd";
import PageHero from "../../components/blocks/PageHero";
import { Band, Prose, Pullquote, CheckList } from "../../components/blocks/Prose";
import { Steps, Contrast } from "../../components/blocks/Steps";
import SelectedVideos from "../../components/blocks/Video";
import Faq from "../../components/blocks/Faq";
import ContextualCTA from "../../components/blocks/CTA";
import RelatedContent from "../../components/blocks/Related";
import { ROUTES } from "../../lib/routes";
import { WA } from "../../lib/contact";
import { VIDEOS } from "../../content/videos";
import { pageMeta, breadcrumbLd, faqLd } from "../../lib/seo";

export const metadata: Metadata = pageMeta(ROUTES.careers);

/* ============================================================
   ⚠️ GUARDRAILED PAGE. Read before editing.

   The recruitment boundary in the direction guide is as firm as the
   existing-policy one. Nothing on this page may contain:
     ✗ mass-recruitment framing
     ✗ easy-money or lifestyle promises
     ✗ income claims of any kind
     ✗ MLM-style language ("be your own boss", "unlimited earning")
     ✗ generic motivational claims

   What it should contain: realistic career exploration, mentorship and
   professional development, advisor voices and learning journeys, and culture,
   standards and responsibility.

   The practical test applied throughout: would this sentence be equally at
   home on a recruitment site we would be embarrassed to be mistaken for? If
   so, it is rewritten or removed.

   ⚠️ The advisor quotation used here is attributed generically pending
   consent — the guide lists testimonials and advisor quotations as
   verify-before-publish.
   ============================================================ */

const FAQS = [
  {
    q: "Do I need a financial services background?",
    a: "No. A good number of our advisors came from corporate roles in other industries. What matters more is whether you are comfortable having careful conversations with people about things that matter to them.",
  },
  {
    q: "What qualifications do I need?",
    a: "You will need to be licensed to advise, and we will take you through what that involves and support you through it. It is a real examination process, not a formality.",
  },
  {
    q: "What does the first year actually look like?",
    a: "Learning, mostly. Licensing, product knowledge, and sitting in on conversations before you lead them. Building a client base takes time and the early months are the hardest part of the job — we would rather say that now than have you discover it.",
  },
  {
    q: "How is the income structured?",
    a: "Advisor income is commission-based, which means it varies and it starts slowly. We will talk through the specifics honestly with you, including what a realistic first two years looks like. We do not publish income figures, because any figure we published would be someone else's and not yours.",
  },
  {
    q: "Is this a full-time commitment?",
    a: "For it to work properly, yes. Advising people on their protection and planning is not something we think is well done around the edges of another job.",
  },
  {
    q: "What happens if it turns out not to suit me?",
    a: "Then it is better for everybody that you find that out early, and we will say so if we think it. Not every conversation about a career here ends with someone joining, and that is the point of having the conversation.",
  },
];

export default function Page() {
  const route = ROUTES.careers;

  return (
    <SiteShell path={route.path}>
      <PageHero
        route={route}
        label="Grow with D’Life"
        title={<>A career built on real guidance, not just sales</>}
        lede="Advising people on their protection and planning is a profession. It takes licensing, training, judgement and a long attention span. If that sounds like the version of this job you were hoping existed, it is worth a conversation."
        photo={{ src: "/media/img/path-career.jpg", alt: "Looking out over the trees, weighing what’s next" }}
      />

      <Band width="read">
        <Prose>
          <p>
            You have probably seen how this industry usually recruits. We are not going to do that. There is no income
            figure on this page, no promise about your lifestyle, and no suggestion that this is easy or fast.
          </p>
          <p>
            What we can tell you is what the work actually involves, how you would be trained, and who tends to do well
            at it. If that reads as less exciting than the alternative, we would rather you decided on the accurate
            version.
          </p>
        </Prose>
      </Band>

      <Band tone="sand" label="Straight answers" title={<>What this is, and what it is not</>} width="wide">
        <Contrast
          left={{
            heading: "What the job is",
            items: [
              "A licensed profession with real examinations behind it",
              "Long conversations with people about money and risk",
              "Building a client base slowly, and keeping it for years",
              "Being the person somebody calls at the point of a claim",
              "Continuous learning, because the products and rules keep moving",
            ],
          }}
          right={{
            heading: "What it is not",
            items: [
              "A fast route to a large income",
              "Something that works well as a side project",
              "A recruitment structure where you earn from signing people up",
              "A job with a salary floor while you are building",
              "Suited to everybody, including some people who would be good at it",
            ],
          }}
        />
      </Band>

      <Band label="How you would grow" title={<>What we actually provide</>} width="wide">
        <Steps
          items={[
            {
              title: "Mentorship before independence",
              copy: "You learn the craft beside someone senior before you ever learn a pitch. That means sitting in on real client conversations, and being observed in your own.",
            },
            {
              title: "Licensing and professional standards",
              copy: "We take you through licensing, product knowledge and proper disclosure. Doing this correctly is not the boring part of the job — it is the job.",
            },
            {
              title: "A route into leadership",
              copy: "For those who want it, there is a path from advisor to team leader with training at each step. More than 40 young managers have come through that route here.",
            },
            {
              title: "A culture that measures the right thing",
              copy: "People here judge a good year by the clients who stayed and the families who were properly looked after when something happened.",
            },
          ]}
        />
      </Band>

      <Band tone="dark" width="read">
        {/* ⚠️ Attribution pending consent. */}
        <Pullquote cite="D’Life advisor">
          “D’Life gave me the mentorship I couldn’t find anywhere else.”
        </Pullquote>
      </Band>

      <SelectedVideos
        videos={VIDEOS}
        tone="light"
        label="Advisor stories"
        title="Hear it from people doing the job"
        lede="Advisors in their own words, on what the work involves and why they stayed."
        id="stories"
      />

      <Band tone="sand" label="Who tends to do well" title={<>The people this suits</>} width="wide">
        <Prose>
          <p>
            There is no single background. Across the advisors who have built something lasting here, these are the
            things they had in common when they started.
          </p>
        </Prose>
        <CheckList
          items={[
            "Comfortable initiating conversations with people they do not know",
            "Genuinely interested in other people’s circumstances",
            "Able to sit with a slow first year without panicking",
            "Willing to tell a client that they do not need something",
            "Organised enough to follow up years later, unprompted",
            "Coming from a professional background, in any field",
          ]}
        />
      </Band>

      <Faq items={FAQS} label="Common questions" title={<>The questions worth asking us</>} />

      <ContextualCTA
        label="Next step"
        title="Explore a career conversation"
        copy="An honest discussion about what the work involves and whether it fits. It is not an interview, and it does not commit you to anything."
        wa={WA.career}
        action="Explore a career conversation"
        secondary={{ label: "Read about D’Life", href: ROUTES.about.path }}
      />

      <RelatedContent keys={["stories", "dva", "about"]} tone="light" />

      <JsonLd data={breadcrumbLd(route)} />
      <JsonLd data={faqLd(FAQS)} />
    </SiteShell>
  );
}
