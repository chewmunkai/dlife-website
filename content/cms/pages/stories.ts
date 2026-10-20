import { pageDocument } from "../define";

/** /stories as a Talous CMS document: today's copy (the films come from the Film library). */
export const STORIES_PAGE = pageDocument([
  [
    "PageHero",
    {
      label: "Advisor stories",
      title: "Meet the people behind D’Life",
      lede: "Real advisors, in their own words. What the work actually looks like, who it is for, and what keeps them doing it.",
      photo: "/media/img/team-welcome.jpg",
      photoAlt: "The D’Life team together at a gathering",
      actions: [{ id: "a1", label: "Watch the films", href: "#films", style: "pill" }],
    },
  ],
  ["FilmReel", {}],
  [
    "PageBand",
    {
      read: true,
      label: "In their own words",
      title: "No script, and no polish. This is how the work actually goes.",
      lede: "You are probably watching because you are wondering what the job is actually like, not because you want to hear how good we are at it. So that is what they talk about: an ordinary week, the parts that are hard, and the reason they stayed.",
      prose:
        "And if what you are really weighing up is whether you would want this career yourself, [Grow With D’Life](/careers) is the more useful read. It covers what the films leave out, including what the first year actually asks of you.",
    },
  ],
  [
    "PageClosing",
    {
      title: "Talk to one of them",
      lede: "If a particular story landed, we can put you in touch with the advisor who told it.",
      actions: [
        { id: "a1", label: "Explore a career conversation", href: "wa:career", style: "pill sand" },
        { id: "a2", label: "Read about the work", href: "/careers", style: "pill ghost" },
      ],
      note: "",
    },
  ],
]);
