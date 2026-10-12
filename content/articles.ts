/* ============================================================
   Articles.

   The library is empty: D'Life has not published anything yet. This file is
   the seam where real articles land, and TEMPLATE_ARTICLE is the working
   example that renders while it is empty, so the layout can be approved
   before anything is written.

   To publish: add a record to ARTICLES. The Articles & Events grid switches
   to the real set and the template stops being routed, so no placeholder page
   survives on a live site. No markup changes either way.

   The categories the direction guide suggests: client guidance; protection
   and planning; founder and D'Life story; advisor stories; careers; DVA;
   Youth Community; events and resources.
   ============================================================ */

/** One block of an article body. Exactly one key is set per block. */
export type Block =
  | { h: string }
  | { p: string }
  | { list: string[] }
  | { quote: string; cite: string };

export type Article = {
  /** URL segment, kebab-case. The page lives at /articles/<slug>. */
  slug: string;
  /** Sentence case, and specific. */
  title: string;
  /** One line under the title in the grid and under the H1 on the page. */
  blurb: string;
  /** Free-form, from the guide's suggested taxonomy. */
  category: string;
  /** ISO date. Shown as the published date. */
  date: string;
  /** Reading time, written as it should appear. */
  read: string;
  /** Lead image from /public/media/img. Omitted renders a marked slot.
   *  `position` is the crop's object-position: the lead plate is a 21:9
   *  banner, so a 4:3 photograph loses ~43% of its height and centred is
   *  rarely where the subject's head is. */
  photo?: { src: string; alt: string; position?: string };
  body: Block[];
  /** Marks placeholder copy so the page can label itself honestly. */
  template?: true;
};

/* 12 Oct 2026, client: "change the template article content to an actual
   article". The first published guide, on the template's own subject.

   Every regulatory statement is sourced; check them again before editing:
     · free-look, 15 days, refund less medical-exam costs — BNM policy
       document "Medical and Health Insurance/Takaful Business" (Dec 2025),
       paras 8.11–8.12, and insuranceinfo.com.my's life insurance FAQ;
     · co-payment option offered since 1 Sep 2024 (5% co-insurance and/or
       RM500 deductible minimum) — same BNM document, para 9.4 and §4.1;
       deductible and co-insurance as defined there;
     · grace period "usually 15 days" monthly, "usually 30 days" otherwise,
       lapse and reinstatement — insuranceinfo.com.my life insurance FAQ;
     · trust nomination for a non-Muslim policy owner naming a spouse, child,
       or a parent where there is none — Financial Services Act 2013,
       Schedule 10, as restated on insurers' nomination forms.
   No insurer is named, no premium or payout is quoted, and the Base MHIT
   plan is left out on purpose: its terms were still being set. */
export const ARTICLES: Article[] = [
  {
    slug: "how-to-read-your-policy-schedule",
    title: "How to read your own policy schedule",
    blurb:
      "Ten minutes with the first page of your policy tells you who is covered, for what, until when, and who receives the money. Here is what each part means.",
    category: "Client guidance",
    date: "2026-10-12",
    read: "6 min read",
    photo: {
      src: "/media/img/article-reading-schedule.jpg",
      alt: "A woman at her dining table reading through a policy schedule",
      /* Centred, the 21:9 banner clipped the top of her hair; at 18% her whole
         head and the top of the page she is reading are in, and the trim
         falls on the table. */
      position: "50% 18%",
    },
    body: [
      {
        p: "Most people file their policy away and read it properly for the first time when they need to make a claim. The policy schedule, usually the first page or two of the policy document, is the part worth reading now. It is a summary of your contract: who is covered, for what, for how much, and until when. This guide walks through each part and what to check while nothing is urgent.",
      },
      { h: "Start with who’s who" },
      {
        p: "A schedule can name up to three different people, and they are not always the same person. The policy owner holds the contract and pays for it. The life assured is the person whose life or health is insured. The nominee, recorded in a separate nomination, is the person who receives the money if the life assured dies. A parent who insures a child is the policy owner; the child is the life assured.",
      },
      { h: "The basic plan and its riders" },
      {
        p: "The schedule lists the basic plan first, then any riders attached to it, such as a critical illness, medical or waiver-of-premium rider. Each benefit has its own coverage amount and often its own end date. Riders can stop well before the basic plan does, so a policy that runs for decades may carry a medical rider that ends much sooner.",
      },
      {
        p: "For each line on the schedule, it is worth noting four things:",
      },
      {
        list: [
          "The coverage amount, sometimes called the sum assured",
          "The coverage term, and the date or age at which that benefit ends",
          "The premium term, which is how long you pay and can be shorter than how long you are covered",
          "The premium amount, and how often it is due",
        ],
      },
      { h: "The dates that matter" },
      {
        p: "Three dates do most of the work. The commencement date is when cover begins. The expiry or maturity date is when it ends. The premium due date is when payment is expected. If a payment is missed, policies allow a grace period, usually 15 days for monthly premiums and 30 days for other frequencies, during which cover carries on. After that a policy can lapse, and reinstating it may mean declaring your health again.",
      },
      { h: "If you have a medical card" },
      {
        p: "Medical and health policies have their own vocabulary. The annual limit is the most the policy pays in one policy year, and the lifetime limit, where there is one, is the most it pays over the life of the policy. A deductible is a fixed amount you pay yourself before the policy pays. Co-insurance is a percentage of each eligible bill that you share with the insurer.",
      },
      {
        p: "Since September 2024, insurers and takaful operators in Malaysia have had to offer medical plans with a co-payment option alongside their existing plans, so two medical cards that look alike can work quite differently when a bill arrives. While you are reading, look for the daily room and board entitlement, and for any waiting period: some conditions are not covered until a set time after the policy starts.",
      },
      { h: "Check the nomination separately" },
      {
        p: "Who receives the money is usually not on the schedule; it is in your nomination. Under the Financial Services Act 2013, when a non-Muslim policy owner nominates a spouse or child, or a parent where there is no spouse or child at the time, the nomination creates a trust in their favour. The policy cannot then be surrendered or assigned without the trustee’s written consent. Muslim policy owners and takaful participants have different arrangements, such as hibah. A marriage, a birth or a death in the family is the moment to check that the nomination still says what you mean.",
      },
      {
        quote: "A schedule tells you what you bought. It does not tell you whether it still fits the life you have now.",
        cite: "D’Life client guidance",
      },
      { h: "Questions worth asking yourself" },
      {
        list: [
          "Would these coverage amounts still matter to your household at today’s costs?",
          "Does any rider end before you expect to need it?",
          "Are you paying for overlapping cover across two policies?",
          "Does the nomination name the people you would choose today?",
          "If you have a medical card, do you know its annual limit and any deductible or co-payment?",
        ],
      },
      { h: "If something is unclear" },
      {
        p: "Your insurer’s customer service team can explain any line on the schedule. A newly issued policy also comes with a 15-day free-look period from the day you receive it, during which you can cancel for a refund of the premium, less any medical examination costs. If you have a dispute that an insurer’s complaints unit cannot resolve, the Ombudsman for Financial Services is the independent body that hears it.",
      },
      {
        p: "Or bring the schedule to us. A review costs nothing, covers any policy wherever you bought it, and does not require you to change anything.",
      },
    ],
  },
];

/**
 * The template. Structure is real; the words are placeholder, and the
 * `template` flag makes every surface that renders it say so. Do not edit
 * this into a real article: write a new record in ARTICLES instead, which
 * also un-routes this page.
 */
export const TEMPLATE_ARTICLE: Article = {
  slug: "template",
  title: "How to read your own policy schedule",
  blurb:
    "A worked example of the article template: the shape a D’Life guide takes, with the editorial rules written into the copy itself.",
  category: "Client guidance",
  date: "2026-09-06",
  read: "4 min read",
  template: true,
  photo: { src: "/media/img/article-policy-schedule.jpg", alt: "Reading through a policy schedule at a desk" },
  body: [
    {
      p: "Every paragraph below says what belongs in its place, at about the length the real thing should run to — so the reading page can be judged on its typography rather than on a wall of filler. The notice above says the rest.",
    },
    {
      p: "The opening paragraph does the work of the whole article. It names the question the reader arrived with and says what they will be able to decide by the end — in about the length of this one. It does not introduce the topic in general terms, because a reader who is here already knows the topic.",
    },
    { h: "A subheading marks the turn in the argument" },
    {
      p: "Body paragraphs run to three or four sentences and use the site's voice: plain language, no jargon left unexplained, no fear-led framing, and no figure that D’Life cannot stand behind. The rules the rest of the site follows apply here without exception — no insurer is named, no premium or payout is quoted, and nothing is promised that a product disclosure sheet would have to contradict.",
    },
    {
      list: [
        "A list earns its place when the items are genuinely parallel",
        "Three to six items, each one a complete thought",
        "No item so long that it should have been a paragraph",
      ],
    },
    {
      quote:
        "A pull quote carries the one sentence a reader should leave with. It is not decoration, and it is never a sentence the article has not earned.",
      cite: "D’Life editorial note",
    },
    { h: "Close on what the reader does next" },
    {
      p: "The last paragraph hands the reader somewhere to go — a page on this site, or a conversation. It does not summarise what they have just read. Replace this whole record with a real article in content/articles.ts and the template stops being routed automatically.",
    },
  ],
};

/**
 * What the /articles route builds, and what the Articles & Events grid lists.
 *
 * A12 (31 Aug) took the template off the public build because its body was
 * lorem ipsum and it was being presented as a real, clickable article.
 *
 * Restored 6 Sep at the client's request — "add back the article and do a
 * template mock up article, design the template nicely" — on one condition:
 * the template now reads as a template. Its body is the editorial brief for a
 * D'Life guide rather than filler, every surface still labels it "Article
 * template", and it is still `noindex`. Nobody can mistake it for published
 * guidance, and the reading page can be signed off at the right length.
 *
 * Adding a real record to ARTICLES un-routes it automatically.
 */
export const ROUTABLE_ARTICLES: Article[] = ARTICLES.length ? ARTICLES : [TEMPLATE_ARTICLE];

/** Kept for the route's own import. Same set. */
export const PREVIEW_ARTICLES: Article[] = ROUTABLE_ARTICLES;
