"use client";

import "../styles/dlife.css";
import { useEffect, useRef } from "react";

/* ============================================================
   D'Life — "Real Support. Beyond the Policy."
   Implementation of the Claude Design handoff
   (Website v3 publication → project/index.html).

   The prototype's <image-slot> elements are a design-tool affordance
   (drag-to-fill placeholders with a persistence sidecar); in production
   they become plain <img> plus the Unsplash credit chip the design
   system requires on every Unsplash-sourced photo.
   ============================================================ */

type Photo = {
  src: string;
  /** Placeholder caption from the prototype — doubles as alt text. */
  alt: string;
  credit: string;
  /** Photographer's Unsplash profile. Absent for a couple of slots. */
  href?: string;
};

const UNSPLASH_UTM = "utm_source=dlife&utm_medium=referral";
const withUtm = (url: string) => `${url}${url.includes("?") ? "&" : "?"}${UNSPLASH_UTM}`;

// TODO(launch): placeholder photography from the design comp. Swap for real
// D'Life brand shoots — the credit chips come out with them.
const shot = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=70`;

const PHOTOS = {
  hero: { src: shot("photo-1576089073624-b5751a8f4de9"), alt: "Hero image", credit: "National Cancer Institute", href: "https://unsplash.com/@nci" },
  p1: { src: shot("photo-1503454537195-1dcabb73ffb9"), alt: "Protect my family", credit: "MI PHAM", href: "https://unsplash.com/@phammi" },
  p2: { src: shot("photo-1450101499163-c8848c66ca85"), alt: "Review my coverage", credit: "Helloquence" },
  p3: { src: shot("photo-1470252649378-9c29740c9fa8"), alt: "Plan for the future", credit: "Dawid Zawiła", href: "https://unsplash.com/@davealmine" },
  p4: { src: shot("photo-1543269865-cbf427effbad"), alt: "Explore a career", credit: "Mimi Thian", href: "https://unsplash.com/@mimithian" },
  p5: { src: shot("photo-1529156069898-49953e39b3ac"), alt: "Join a community", credit: "Duy Pham" },
  n1: { src: shot("photo-1576089073624-b5751a8f4de9"), alt: "Protecting Family", credit: "National Cancer Institute", href: "https://unsplash.com/@nci" },
  n2: { src: shot("photo-1521791136064-7986c2920216"), alt: "Protecting Income", credit: "Cytonn Photography", href: "https://unsplash.com/@cytonn_photography" },
  n3: { src: shot("photo-1579684385127-1ef15d508118"), alt: "Medical & Health", credit: "National Cancer Institute", href: "https://unsplash.com/@nci" },
  n4: { src: shot("photo-1470252649378-9c29740c9fa8"), alt: "Planning for the Future", credit: "Dawid Zawiła", href: "https://unsplash.com/@davealmine" },
  n5: { src: shot("photo-1560518883-ce09059eeffa"), alt: "Wealth & Legacy", credit: "Tierra Mallorca", href: "https://unsplash.com/@tierramallorca" },
  policy: { src: shot("photo-1554224155-6726b3ff858f"), alt: "Policy review", credit: "Scott Graham", href: "https://unsplash.com/@homajob" },
  s1: { src: shot("photo-1507003211169-0a1dd7228f2d"), alt: "Video still", credit: "Ayo Ogunseinde", href: "https://unsplash.com/@armedshutter" },
  s2: { src: shot("photo-1508214751196-bcfd4ca60f91"), alt: "Video still", credit: "Aiony Haust", href: "https://unsplash.com/@aiony" },
  s3: { src: shot("photo-1531482615713-2afd69097998"), alt: "Video still", credit: "Mimi Thian", href: "https://unsplash.com/@mimithian" },
  dva: { src: shot("photo-1596422846543-75c6fc197f07"), alt: "DVA", credit: "Izuddin Helmi Adnan", href: "https://unsplash.com/@izuddinhelmi" },
} satisfies Record<string, Photo>;

/** Unsplash's prescribed attribution: links the photographer and Unsplash. */
function Credit({ credit, href }: Pick<Photo, "credit" | "href">) {
  return (
    <span className="credit">
      Photo by{" "}
      {href ? (
        <a href={withUtm(href)} target="_blank" rel="noopener noreferrer">
          {credit}
        </a>
      ) : (
        credit
      )}{" "}
      on{" "}
      <a href={`https://unsplash.com/?${UNSPLASH_UTM}`} target="_blank" rel="noopener noreferrer">
        Unsplash
      </a>
    </span>
  );
}

/**
 * Contents of a `.ph` plate. `parallax` wraps the image in the over-scanned
 * `.prlx` layer the scroll engine drives; the credit stays a sibling so it
 * pins to the visible frame rather than riding the parallax offset.
 */
function Plate({ photo, parallax, eager }: { photo: Photo; parallax?: boolean; eager?: boolean }) {
  const img = (
    <img src={photo.src} alt={photo.alt} loading={eager ? "eager" : "lazy"} decoding="async" />
  );
  return (
    <>
      {parallax ? <div className="prlx">{img}</div> : img}
      <Credit credit={photo.credit} href={photo.href} />
    </>
  );
}

const WA_ADVISOR = "Hi D'Life, I'd like to speak with an advisor.";

const NEEDS: Array<[Photo, string, string]> = [
  [PHOTOS.n1, "Protecting Family", "Coverage built around the people who depend on you."],
  [PHOTOS.n2, "Protecting Income", "Keep life steady even when the unexpected happens."],
  [PHOTOS.n3, "Medical & Health Preparation", "Practical support for health and recovery costs."],
  [PHOTOS.n4, "Planning for the Future", "Retirement and legacy planning, with confidence."],
  [PHOTOS.n5, "Wealth & Legacy", "Growing and protecting what you’ve built."],
];

const STORIES: Array<[Photo, string]> = [
  [PHOTOS.s1, "A Career Beyond Selling Policies"],
  [PHOTOS.s2, "What Real Guidance Looks Like"],
  [PHOTOS.s3, "Inside D’Life Leadership"],
];

const YOUTH: Array<[string, string]> = [
  ["Events & Workshops", "Hands-on sessions on money, mindset and growth."],
  ["Stories", "Real journeys from young leaders and mentors."],
  ["Educational Resources", "Practical guides on health, wealth and leadership."],
];

const FAQS: Array<[string, string]> = [
  [
    "How do I know which protection I actually need?",
    "Start with a conversation, not a product. We’ll look at your situation, your responsibilities and what you already have, then explain your options in plain language.",
  ],
  [
    "Can I get clarity on a policy I already hold?",
    "Yes. Many people simply want to understand what they’re covered for. We’re happy to walk you through it, with no obligation to change anything.",
  ],
  [
    "Can I speak with someone before deciding anything?",
    "Always. Most conversations with us don’t end in a decision, and that’s completely fine.",
  ],
  [
    "What happens after I take up a policy?",
    "Your advisor stays with you. Life changes, and your coverage should be reviewed as it does.",
  ],
];

const PlayIcon = () => (
  <span className="play">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  </span>
);

export default function DLife() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    import("../lib/dlife").then(({ initDLife }) => {
      if (cancelled) return;
      dispose = initDLife(el);
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div className="dlife" ref={root}>
      <div id="cur" aria-hidden="true" />
      <div id="loader" aria-hidden="true">
        <div>
          <div className="in">
            <span className="wm">D’Life</span>
          </div>
          <div className="sub">Real support, beyond the policy.</div>
        </div>
      </div>

      <header id="hd">
        <a className="wm" href="#hero">
          D’Life
        </a>
        <div className="rt">
          <a className="msg" data-wa={WA_ADVISOR} href="#">
            Message an Advisor
          </a>
          <a className="pill" data-wa={WA_ADVISOR} href="#">
            <span>Speak with an Advisor</span>
          </a>
          <button className="burger" id="burger" aria-label="Menu" aria-controls="menu" aria-expanded={false}>
            <span id="mlabel">Menu</span>
            <span className="ln" />
          </button>
        </div>
      </header>

      <nav id="menu" aria-hidden="true">
        <div className="big">
          <a href="#needs">
            Solutions<i>01</i>
          </a>
          <a href="#policy">
            Existing Policy Support<i>02</i>
          </a>
          <a href="#stories">
            Stories<i>03</i>
          </a>
          <a href="#careers">
            Careers<i>04</i>
          </a>
          <a href="#youth">
            Community<i>05</i>
          </a>
        </div>
        <div className="side">
          <p>
            Whether you are protecting a family, reviewing a policy or exploring a career, a conversation is the right
            place to start.
          </p>
          <div className="c">
            <a data-wa={WA_ADVISOR} href="#">
              Message an Advisor on WhatsApp
            </a>
            <a href="mailto:hello@dlife.com.my">Ask a Question</a>
          </div>
          <span className="lb">D’Life · Financial Advisory</span>
        </div>
      </nav>

      <section id="hero">
        <div className="bg ph">
          <Plate photo={PHOTOS.hero} parallax eager />
        </div>
        <div className="fg">
          <span className="lb rv">D’Life · Financial Advisory</span>
          <h1>
            <span className="lw">
              <span>Real Support.</span>
            </span>
            <span className="lw">
              <span>
                <i>Beyond the Policy.</i>
              </span>
            </span>
          </h1>
          <p className="rv">
            Protection is only the beginning. D’Life brings real guidance, long-term relationships and support through
            life’s changes.
          </p>
          <div className="acts rv">
            <a className="pill" data-wa={WA_ADVISOR} href="#">
              <span>Speak with an Advisor</span>
            </a>
            <a className="pill ghost" href="#path">
              <span>Find your path</span>
            </a>
          </div>
        </div>
      </section>

      <section id="trust">
        {/* "27 years" pending client verification */}
        <div className="rv">
          <b>27 years</b>of guidance
        </div>
        <div className="rv">
          <b>People first</b>advisory, before products
        </div>
        <div className="rv">
          <b>Clarity</b>protection you can understand
        </div>
        <div className="rv">
          <b>Human support</b>when it matters most
        </div>
      </section>

      <section id="man">
        <p className="man">
          Protection is only the beginning. D’Life brings <i>real guidance,</i> long-term relationships and support{" "}
          <i>through life’s changes.</i>
        </p>
      </section>

      <section id="path">
        <div className="list">
          <span className="lb rv">Find your path</span>
          <div className="q rv">I’m looking to…</div>
          <a className="opt" href="#needs" data-im="0">
            <span>Protect my family</span>
            <span className="no">01</span>
          </a>
          <a className="opt" href="#policy" data-im="1">
            <span>Review my coverage</span>
            <span className="no">02</span>
          </a>
          <a className="opt" href="#needs" data-im="2">
            <span>Plan for the future</span>
            <span className="no">03</span>
          </a>
          <a className="opt" href="#careers" data-im="3">
            <span>Explore a career</span>
            <span className="no">04</span>
          </a>
          <a className="opt" href="#youth" data-im="4">
            <span>Join a community</span>
            <span className="no">05</span>
          </a>
        </div>
        <div className="vis">
          <div className="ph">
            <div className="im on">
              <Plate photo={PHOTOS.p1} />
            </div>
            <div className="im">
              <Plate photo={PHOTOS.p2} />
            </div>
            <div className="im">
              <Plate photo={PHOTOS.p3} />
            </div>
            <div className="im">
              <Plate photo={PHOTOS.p4} />
            </div>
            <div className="im">
              <Plate photo={PHOTOS.p5} />
            </div>
            <div className="cap" id="pathcap">
              Start wherever you are.
            </div>
          </div>
        </div>
      </section>

      <section id="needs">
        <div className="head">
          <div>
            <span className="lb rv">What brings you here</span>
            <h2 className="rv" style={{ marginTop: 26 }}>
              Support built around <i>real life needs</i>
            </h2>
          </div>
          <p className="rv">Everyone arrives with a different question. Start wherever you are.</p>
        </div>
        <div className="rail">
          <div className="track" id="ntrack">
            {NEEDS.map(([photo, title, copy]) => (
              <div className="ncard" key={title}>
                <div className="ph">
                  <Plate photo={photo} />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="policy" className="light">
        <div className="tx">
          <span className="lb rv" style={{ color: "var(--dl-copper-d)" }}>
            Existing policyholders
          </span>
          <h2 className="rv" style={{ marginTop: 26 }}>
            Need clarity on your <i>current coverage?</i>
          </h2>
          <p className="rv">
            Understand the protection you already have. Speak with our team to review your coverage with greater
            confidence, and see what next step, if any, makes sense.
          </p>
          <div className="acts rv">
            <a className="pill dark" data-wa="Hi D'Life, I'd like guidance on my existing policy." href="#">
              <span>Get guidance on my policy</span>
            </a>
            <a className="tlink" href="#faq">
              See how we can help
            </a>
          </div>
        </div>
        <div className="ph">
          <Plate photo={PHOTOS.policy} parallax />
        </div>
      </section>

      <section id="founder">
        <div className="ph rv">
          {/* TODO(launch): Sharon's portrait — intentionally an empty slot in the comp. */}
          <div className="slot-empty">Sharon’s portrait</div>
        </div>
        <div>
          <span className="lb rv">Our founder</span>
          <h2 className="rv">
            Years of trust, guidance and growth, <i>carried forward through real people.</i>
          </h2>
          {/* "almost three decades" pending client verification */}
          <p className="rv">
            For almost three decades, Sharon has built D’Life on one belief: people come before products, and support
            should continue long after a policy is signed.
          </p>
          <p className="rv">
            What began as a financial advisory practice has grown into a place where clients are guided, advisors are
            mentored, and both are expected to become better than they were.
          </p>
          <a className="tlink rv" data-wa="Hi D'Life, I'd like to start a conversation." href="#">
            Discover our story
          </a>
        </div>
      </section>

      <section id="stories">
        <div className="head">
          <div>
            <span className="lb rv">Featured videos</span>
            <h2 className="rv" style={{ marginTop: 26 }}>
              Meet the people <i>behind D’Life</i>
            </h2>
          </div>
          <a className="tlink rv" href="#stories">
            View all stories
          </a>
        </div>
        <div className="grid">
          {STORIES.map(([photo, title]) => (
            <div className="story rv" key={title}>
              <div className="ph">
                <Plate photo={photo} />
                <PlayIcon />
              </div>
              <h3>{title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section id="careers">
        <div>
          <span className="lb rv">Grow with D’Life</span>
          <h2 className="rv">
            A career built on <i>real guidance,</i> not just sales.
          </h2>
          <p className="bd rv">
            Mentorship, professionalism, leadership and culture. A career that helps you become a more valuable person,
            not just a better seller.
          </p>
          <a className="tlink rv" data-wa="Hi D'Life, I'd like to explore a career conversation." href="#">
            Explore a career conversation
          </a>
        </div>
        <div className="qt rv">
          {/* quote attribution pending consent */}
          <p>“D’Life gave me the mentorship I couldn’t find anywhere else.”</p>
          <span>D’Life Advisor</span>
        </div>
      </section>

      <section id="dva">
        <div className="bg ph">
          <Plate photo={PHOTOS.dva} parallax />
        </div>
        <div className="fg">
          <span className="lb rv">DVA · By invitation</span>
          <h2 className="rv">
            Built for leaders. A selective circle shaped by <i>shared values and experience.</i>
          </h2>
          <a className="pill rv" data-wa="Hi D'Life, I'd like to know more about DVA." href="#">
            <span>Discover DVA</span>
          </a>
        </div>
      </section>

      <section id="youth" className="light">
        <div className="head">
          <span className="lb rv" style={{ color: "var(--dl-copper-d)" }}>
            Community
          </span>
          <h2 className="rv" style={{ marginTop: 24 }}>
            Youth Community
          </h2>
          <div className="sup rv">Empowering youth. Building tomorrow.</div>
          <p className="intro rv">
            A platform for young people to explore health, wealth and leadership through real talks, mentors and
            experience.
          </p>
        </div>
        <div className="grid">
          {YOUTH.map(([title, copy]) => (
            <div className="yc rv" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
        <div className="loop rv">
          <div>
            <h3>Stay in the Loop</h3>
            <p>Get event invites and youth community updates.</p>
          </div>
          <form id="loopform">
            <input type="email" placeholder="Your email" required aria-label="Your email" />
            <button className="pill dark" type="submit">
              <span>Sign Up</span>
            </button>
          </form>
        </div>
      </section>

      <section id="faq">
        <div>
          <span className="lb rv">Helpful answers</span>
          <h2 className="rv">
            A few common <i>questions</i>
          </h2>
          <a className="tlink rv" href="#faq">
            Explore Our FAQ
          </a>
        </div>
        <div className="items">
          {FAQS.map(([q, a]) => (
            <div className="item" key={q}>
              <button className="q" type="button" aria-expanded={false}>
                {q}
                <span className="x" />
              </button>
              <div className="a">
                <p>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="close">
        <span className="lb rv">D’Life</span>
        <h2 className="rv">
          A clearer future can begin with <i>one conversation.</i>
        </h2>
        <div className="sub rv">Let it begin with you.</div>
        <div className="acts rv">
          <a className="pill" data-wa="Hi D'Life, I'd like to start a conversation." href="#">
            <span>Speak with an Advisor</span>
          </a>
          <a className="pill ghost" href="#path">
            <span>Find your path</span>
          </a>
        </div>
      </section>

      <footer id="ft">
        <div className="cols">
          <div>
            <div className="wm">D’Life</div>
            <div className="tag">Real support, beyond the policy.</div>
          </div>
          <div className="col">
            <b>Solutions</b>
            <a href="#needs">Protecting Family</a>
            <a href="#needs">Planning for the Future</a>
            <a href="#policy">Existing Policy Support</a>
          </div>
          <div className="col">
            <b>Community</b>
            <a href="#youth">Youth Community</a>
            <a href="#dva">DVA</a>
            <a href="#careers">Careers</a>
          </div>
          <div className="col">
            <b>Contact</b>
            <a data-wa={WA_ADVISOR} href="#">
              Message an Advisor on WhatsApp
            </a>
            <a href="mailto:hello@dlife.com.my">Ask a Question</a>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 D’Life. All rights reserved.</span>
          <span>
            <a href="#">Privacy Policy</a> &nbsp;·&nbsp; <a href="#">Terms</a>
          </span>
        </div>
      </footer>

      <div id="toast" role="status" />
    </div>
  );
}
