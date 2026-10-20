import { pageDocument, sectionBlock } from "../define";

/** /resources as a Talous CMS document: today's copy. Articles still come from content/articles.ts. */
export const RESOURCES_PAGE = pageDocument([
  [
    "PageHero",
    {
      label: "Articles & events",
      title: "Reading and what’s coming up",
      lede: "Writing worth your time, and the sessions that run across the D’Life community through the year.",
      // The award-night group shot is 1.77 with people at both edges, so it's matted, never cropped
      // (client, 21 Sep 2026: "without cutting ppl off").
      photo: "/media/img/dva-award-night-v2.jpg",
      photoAlt: "D’Life advisors together at the DVA award night",
      photoFit: "contain",
    },
  ],
  ["ResourcesArticles", { label: "Reading", title: "Articles" }],
  [
    "ResourcesEvents",
    {
      label: "Events",
      title: "What runs across the year",
      prose:
        "D’Life and [DVA](/dva) run a programme of workshops, forums and community sessions through the year, alongside the [Youth Community](/youth-community). Dates go out to members ahead of time. Ask us and we will let you know what is next.",
      events: [
        {
          id: "e1",
          when: "Monthly",
          where: "Klang Valley",
          title: "Growth Circle",
          photo: "/media/img/dva-forum.jpg",
          photoAlt: "Members in a Growth Circle session",
          copy: "One of D’Life’s signature development platforms. A regular gathering where members reflect on progress, share experience, discuss what is not working and learn from each other.",
        },
        {
          id: "e2",
          when: "Through the year",
          where: "Klang Valley",
          title: "Leadership development workshops",
          photo: "/media/img/team-office.jpg",
          photoAlt: "A leadership development workshop",
          copy: "Interactive sessions on strategic thinking, decision-making, emotional intelligence, coaching and applying leadership in practice.",
        },
        {
          id: "e3",
          when: "Regular",
          where: "Klang Valley",
          title: "Financial planning seminars",
          photo: "/media/img/youth-workshop.jpg",
          photoAlt: "An open session on planning fundamentals",
          copy: "Open sessions on protection and planning fundamentals, run as education rather than as a sales presentation.",
        },
        {
          id: "e4",
          when: "Regular",
          where: "Klang Valley",
          title: "Learning forums",
          photo: "/media/img/learning-forum.jpg",
          photoAlt: "A D’Life learning forum group together in a lounge",
          copy: "Knowledge sharing with industry experts and experienced professionals, covering advisory practice, business and personal development.",
        },
        {
          id: "e5",
          when: "Through the year",
          where: "Campus & community venues",
          title: "Youth leadership programmes",
          photo: "/media/img/youth-leadership-cafe.jpg",
          photoAlt: "Youth leadership programme members together at a café session",
          copy: "Sessions for students, fresh graduates and young professionals across health, wealth and leadership.",
        },
        {
          id: "e6",
          when: "Several a year",
          where: "Various",
          title: "Charity & community projects",
          photo: "/media/img/charity-pickleball.jpg",
          photoAlt: "The D’Life team with the podium signs at the St. John Pickle Cup",
          copy: "Service initiatives that members contribute to across the year, run through DVA and the Youth Community.",
        },
      ],
    },
  ],
  [
    "FilmsPreview",
    {
      label: "Watch",
      title: "Advisors, in their own words",
      lede: "Short films on what the work actually looks like. Each one plays on the Stories page, with sound.",
      cta: "Watch all the stories",
    },
  ],
  [
    "PageClosing",
    {
      title: "Would rather just ask someone?",
      lede: "Reading is a fine place to start, but most questions are quicker to answer in a conversation.",
      actions: [
        { id: "a1", label: "Ask a question", href: "wa:question", style: "pill sand" },
        { id: "a2", label: "Explore protection & planning", href: "/#needs", style: "pill ghost" },
      ],
    },
  ],
]);

export const RESOURCES_BLOCKS = {
  ResourcesArticles: sectionBlock("Articles list", { label: "", title: "" }, { labels: { label: "Small label", title: "Heading" } }),
  ResourcesEvents: sectionBlock(
    "Events",
    { label: "", title: "", prose: "", events: [{ when: "", where: "", title: "", photo: "/media/x.jpg", photoAlt: "", copy: "" }], cta: "", ctaHref: "" },
    {
      labels: {
        label: "Small label",
        title: "Heading",
        prose: "Paragraph above the events ([words](/page) makes a link)",
        events: "Events",
        when: "When",
        where: "Where",
        copy: "Description",
        cta: "Card button text (default “Ask about dates”)",
        ctaHref: "Card button goes to (default wa:event)",
      },
      long: ["prose", "copy"],
    },
  ),
};
