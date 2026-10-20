import { pageDocument } from "../define";

/** /about as a Talous CMS document: today's copy (moved here from the page). */
export const ABOUT_PAGE = pageDocument([
  ["PageHero", {
    label: "About D’Life",
    title: "Founded by sisters and built with purpose",
    lede: "D’Life was started by two sisters who believed that success is not simply about making money. It is about building a life that means something.",
    photo: "/media/img/founder-sharon.jpg",
    photoAlt: "Sharon Cheang, co-founder of D’Life",
    photoFit: "contain",
    companion: "/media/img/founder-rachel.jpg",
    companionAlt: "Rachel Cheang, co-founder of D’Life",
    companionFit: "contain",
    actions: [
      {
        id: "a1",
        label: "Speak with an Advisor",
        href: "wa:advisor",
        style: "pill"
      }
    ]
  }],
  ["PageBand", {
    read: true,
    label: "Where it began",
    title: "Sharon and Rachel Cheang grew up without financial abundance.",
    lede: "It taught them hard work, integrity, compassion and a habit of continuing to learn, and those became the foundation of the agency they built. It is also why the first question here is usually about your circumstances rather than your budget.",
    prose: "D’Life is a Malaysian financial advisory and insurance agency. We help individuals, families, professionals and business owners protect what matters and plan for what is ahead, and we stay with them after the paperwork is done. Alongside that, we develop advisors, and we run two community initiatives: the [Drive Value Associates](/dva) leadership circle and the [Youth Community](/youth-community)."
  }],
  ["PageCreed", {
    label: "What the practice is for",
    title: "Our 4 commitments",
    items: [
      {
        id: "c1",
        term: "Protect Lives",
        copy: "Cover built around the people who actually depend on you.",
        icon: "shield"
      },
      {
        id: "c2",
        term: "Build Wealth",
        copy: "Decisions you could explain, in your own words, to your own family.",
        icon: "coins"
      },
      {
        id: "c3",
        term: "Transform People",
        copy: "Advisors developed into professionals, and professionals into leaders.",
        icon: "people"
      },
      {
        id: "c4",
        term: "Create Impact",
        copy: "A practice that leaves the profession in better standing than it found it.",
        icon: "building"
      }
    ]
  }],
  ["PageMissionVision", {
    label: "What we are working towards",
    title: "Mission and vision",
    items: [
      {
        id: "m1",
        kind: "Mission",
        claim: "Financial confidence, and leaders worth trusting",
        copy: "To empower individuals and families with financial confidence, create lasting value through professional financial advice, and nurture future leaders who serve with integrity and purpose."
      },
      {
        id: "m2",
        kind: "Vision",
        claim: "The most trusted advisory practice we can be",
        copy: "To become the most trusted financial advisory company, transforming lives through meaningful financial planning, while helping financial advisors become respected professionals and capable leaders."
      }
    ]
  }],
  ["PageProfile", {
    name: "Sharon Cheang",
    role: "Founder",
    photo: "/media/img/founder-sharon.jpg",
    photoAlt: "Sharon Cheang, founder of D’Life",
    photoPosition: "50% 22%",
    prose: "Sharon has built her career around two commitments: providing families with trusted financial solutions and transforming people into capable professionals and leaders.\n\nThroughout her journey, she has mentored and developed many individuals into managers and leaders, believing that true success is not only about personal achievement, but about developing people who can go on to develop others.\n\nShe later founded [Drive Value Associates (DVA)](/dva) and the [Youth Community](/youth-community), extending her mission to leadership development and empowering the next generation.\n\nHer mentoring philosophy centres on mindset, personal growth, leadership, financial well-being and quality of life, developing individuals to become confident professionals, financially empowered individuals and purposeful leaders, while building a sustainable and well-balanced life."
  }],
  ["PageProfile", {
    name: "Rachel Cheang",
    role: "Co-Founder",
    photo: "/media/img/founder-rachel.jpg",
    photoAlt: "Rachel Cheang, co-founder of D’Life",
    flip: true,
    tone: "sand",
    prose: "Rachel has been part of D’Life’s journey from the early years, not only as Sharon’s sister, but as a trusted partner who has grown alongside her through different seasons of the business.\n\nA strong performer in personal sales and approaching Lifetime MDRT recognition, Rachel brings years of experience, consistency and a deep commitment to serving her clients.\n\nToday, she leads D’Life’s development in Johor, particularly the Segamat branch, focusing on building people, strengthening the team and nurturing long-term relationships.\n\nHer leadership is grounded in professional excellence, personal growth and people development. Together, the sisters bring different strengths but share one purpose: developing people, nurturing leaders and building a legacy that continues beyond themselves."
  }],
  ["PageSplitList", {
    photo: "/media/img/team-award.jpg",
    photoAlt: "D’Life advisors and managers at an agency recognition event",
    photoRatio: "4 / 3",
    tone: "light",
    label: "Recognition",
    title: "Professional record",
    top: true,
    lede: "A reflection of Sharon’s key professional milestones, achievements and contributions throughout her 27-year career.",
    items: [
      {
        id: "r1",
        text: "Fast-tracked promotion to AIA Agency Manager."
      },
      {
        id: "r2",
        text: "Achieved consecutive Million Dollar Agency (MDA) and Million Dollar Direct Team (MDRT) honors from 2002 – 2025."
      },
      {
        id: "r3",
        text: "MDRT Builder, successfully mentoring and developing numerous MDRT advisors."
      },
      {
        id: "r4",
        text: "Recognized as a speaker on Spiritual Growth and Women’s Empowerment, with long-standing invitations from insurance companies, universities and charity platforms."
      },
      {
        id: "r5",
        text: "Achieved overseas incentive trips for 27 consecutive years, with footprints across 45+ countries."
      },
      {
        id: "r6",
        text: "Successfully guided and transformed many young individuals, from starting with no experience to becoming confident leaders, building meaningful careers and achieving a better work-life balance."
      }
    ],
    aligned: true
  }],
  ["PageRecord", {
    label: "Advisor development",
    title: "Advisors she has built",
    lede: "The part of the work Sharon is proudest of is not her own production. It is the advisors who came through the practice and went on to run teams of their own, a number of them from corporate careers in other industries.",
    photo: "/media/img/about-advisors-dlife.jpg",
    photoAlt: "The D’Life team together in front of the D’Life wall at the office",
    photoRatio: "4 / 3",
    say: "Established a professional advisory team characterized by **High growth,\nHigh culture,\nHigh impact.**",
    figures: [
      {
        id: "f1",
        fig: "3",
        copy: "Mentored **3 top-tier senior agency managers.**"
      },
      {
        id: "f2",
        fig: "34",
        copy: "Developed over **34** young and passionate managers."
      },
      {
        id: "f3",
        fig: "80",
        copy: "Led a team of **80** direct and indirect AIA Life Planners."
      },
      {
        id: "f4",
        fig: "2022 –\n2025",
        word: true,
        copy: "Consistently achieved Million Dollar Agency (MDA) and Million Dollar Direct Team (MDD)."
      },
      {
        id: "f5",
        fig: "MDRT\nBuilder",
        word: true,
        copy: "Developing and empowering advisors to achieve professional excellence and MDRT standards."
      }
    ]
  }],
  ["PageLinkCards", {
    columns: "2",
    overlay: true,
    items: [
      {
        id: "k1",
        title: "Grow With D’Life",
        copy: "What a career here actually involves, and who it suits.",
        href: "/careers",
        cta: "Explore a career",
        photo: "/media/img/team-outdoors.jpg",
        photoAlt: "D’Life advisors together on an agency away day",
        photoRatio: "4 / 3"
      },
      {
        id: "k2",
        title: "Advisor stories",
        copy: "Advisors in their own words, on the work and why they stayed.",
        href: "/stories",
        cta: "Watch the stories",
        photo: "/media/img/team-office.jpg",
        photoAlt: "The D’Life team together at the office",
        photoRatio: "4 / 3"
      }
    ]
  }],
  ["PageClosing", {
    title: "Meet the people, not the brochure",
    lede: "If you would rather start by talking to someone than by reading about us, that is usually the better order.",
    actions: [
      {
        id: "a1",
        label: "Speak with an Advisor",
        href: "wa:advisor",
        style: "pill sand"
      },
      {
        id: "a2",
        label: "See how we can help",
        href: "/solutions/protecting-your-family",
        style: "pill ghost"
      }
    ],
    note: ""
  }],
]);
