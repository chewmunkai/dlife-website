import { pageDocument } from "../define";

/** /youth-community as a Talous CMS document: today's copy (the lists moved here from the page). */
export const YOUTH_PAGE = pageDocument([
  ["PageHero", {
    tone: "sand",
    label: "Empowering youth. Building tomorrow.",
    title: "Youth Community",
    lede: "A platform to prepare the next generation for life, career, leadership and financial independence, because education on its own is no longer enough.",
    photo: "/media/img/youth-hero-pool.jpg",
    photoAlt: "Members of the D’Life Youth Community together by a pool",
    photoFit: "contain",
    actions: [
      {
        id: "a1",
        label: "Ask about joining",
        href: "wa:youthJoin",
        style: "pill"
      }
    ]
  }],
  ["PageBand", {
    read: true,
    label: "Why it exists",
    title: "Young people leaving university today need more than a qualification.",
    lede: "They need confidence, the ability to communicate, some grasp of how money actually works, a bit of leadership practice and some real-world experience to put it all against.",
    prose: "The Youth Community exists to provide those things in a setting that is practical and welcoming rather than academic. Its purpose is to help young people become confident, healthy, financially aware and purpose-driven: people who go on to have a positive effect on their careers, their communities and the generation after them."
  }],
  ["PageTrio", {
    anchor: "resources",
    label: "The 3 pillars",
    title: "Health · Wealth · Leadership",
    items: [
      {
        id: "p1",
        title: "Health",
        claim: "Build a healthy body and a resilient mind.",
        points: "Physical wellness\nMental resilience\nStress management\nBalance, while it is still easy to make it a habit",
        icon: "pulse"
      },
      {
        id: "p2",
        title: "Wealth",
        claim: "Build financial confidence and career opportunity.",
        points: "Financial literacy\nWealth management\nCareer exploration and industry exposure\nEntrepreneurial thinking",
        icon: "coins"
      },
      {
        id: "p3",
        title: "Leadership",
        claim: "Build character, influence and purpose.",
        points: "Leadership development\nCommunication and public speaking\nPersonal branding\nCritical thinking and problem-solving",
        icon: "people"
      }
    ]
  }],
  ["PageWhoGrid", {
    label: "Who it’s for",
    title: "Who should join",
    lede: "The Youth Community welcomes anyone young and genuinely willing to grow, personally and professionally.",
    countLabel: "kinds of member",
    items: [
      {
        id: "w1",
        who: "University students",
        why: "Preparing for a career that has not started yet."
      },
      {
        id: "w2",
        who: "Fresh graduates",
        why: "Exploring work that will actually mean something."
      },
      {
        id: "w3",
        who: "Young professionals",
        why: "After personal and leadership growth, not just the next title."
      },
      {
        id: "w4",
        who: "Young entrepreneurs",
        why: "Building something with a purpose behind it."
      },
      {
        id: "w5",
        who: "Career explorers",
        why: "Wanting clarity, direction and options worth considering."
      },
      {
        id: "w6",
        who: "Young adults",
        why: "Who take health, money and leadership seriously, and together."
      }
    ]
  }],
  ["PageEvents", {
    anchor: "events",
    label: "Events & workshops",
    title: "The kinds of sessions that run",
    lede: "Sessions run through the year across the community and alongside D’Life’s wider programme. Alongside them, members mentor, volunteer and work with universities together. Dates and venues go out to members ahead of time, and the quickest way to hear about the next one is to sign up below.",
    events: [
      {
        id: "e1",
        when: "Runs through the year",
        where: "Klang Valley",
        title: "Youth leadership programmes",
        photo: "/media/img/youth-session.jpg",
        photoAlt: "A youth leadership session in progress",
        copy: "Structured leadership development for students and young professionals, built around practice rather than theory."
      },
      {
        id: "e2",
        when: "Regular",
        where: "Campus & community venues",
        title: "Financial literacy sessions",
        photo: "/media/img/youth-resources-v2.jpg",
        photoAlt: "A financial literacy session, a presenter leading participants seated around tables",
        copy: "How money actually works: saving, protection, and the decisions worth making early. No products, no selling."
      },
      {
        id: "e3",
        when: "Regular",
        where: "Klang Valley",
        title: "Career development sessions",
        photo: "/media/img/team-office.jpg",
        photoAlt: "A career development session",
        copy: "Industry exposure, interview practice and honest conversations with people doing the jobs you are considering."
      },
      {
        id: "e4",
        when: "Regular",
        where: "Klang Valley",
        title: "Personal growth workshops",
        photo: "/media/img/team-award.jpg",
        photoAlt: "A member working through a personal development exercise",
        copy: "Communication, public speaking, personal branding and the confidence to use them."
      },
      {
        id: "e5",
        when: "Several a year",
        where: "Various",
        title: "Community & volunteer projects",
        photo: "/media/img/youth-volunteer-group.jpg",
        photoAlt: "Youth Community members seated together in two rows at a community gathering",
        copy: "Service projects that build compassion and responsibility, and give leadership somewhere real to practise."
      },
      {
        id: "e6",
        when: "Several a year",
        where: "Various",
        title: "Outdoor & team activities",
        photo: "/media/img/team-outdoors.jpg",
        photoAlt: "Members at an outdoor team activity",
        copy: "Adventure-based activities that build teamwork, resilience and friendships that outlast the session."
      }
    ],
    ctaHref: "wa:youthEvent"
  }],
  ["PageSplitList", {
    photo: "/media/img/community-group.jpg",
    photoAlt: "Youth Community members together after a session",
    photoRatio: "4 / 3",
    tone: "light",
    label: "What members take away",
    title: "What people leave with",
    anchor: "stories",
    lede: "More than knowledge: practical skills, real relationships and a bit more confidence than they arrived with.",
    items: [
      {
        id: "t1",
        text: "Confidence and self-awareness"
      },
      {
        id: "t2",
        text: "Leadership and communication, practised rather than taught"
      },
      {
        id: "t3",
        text: "Physical and mental well-being, and the habits that keep them"
      },
      {
        id: "t4",
        text: "Financial literacy and wealth awareness"
      },
      {
        id: "t5",
        text: "Career clarity, direction and a working network"
      },
      {
        id: "t6",
        text: "Friendships and a community that outlast the sessions"
      }
    ]
  }],
  ["PageSignup", {
    anchor: "loop",
    label: "Stay in the loop",
    title: "Hear about the next session",
    lede: "Occasional updates on events, workshops and resources. Nothing is sold to you, and you can stop them at any time."
  }],
  ["PageFaq", {
    label: "Common questions",
    title: "Before you join us",
    faqs: [
      {
        id: "q1",
        q: "Is there a cost to join?",
        a: "Most Youth Community activities are free or kept at a minimal cost. Some workshops and classes are complimentary, while selected sessions may involve a small fee, typically below RM50, to cover refreshments or activity expenses."
      },
      {
        id: "q2",
        q: "Do I have to be studying finance, or want a career in it?",
        a: "Not at all. Most members are not heading into financial services. The sessions are about confidence, communication, health, money and leadership, all of it useful whatever you end up doing."
      },
      {
        id: "q3",
        q: "What age is this for?",
        a: "The Youth Community is open to young adults who are stepping into the working world and beyond. If you are looking to grow, connect, and develop yourself personally and professionally, you are welcome to be part of the community."
      },
      {
        id: "q4",
        q: "Is this a recruitment pipeline for D’Life?",
        a: "No. It is a community initiative, and the great majority of members will never work with us. If someone does become interested in the profession we will have that conversation openly, but it is not what this is for."
      }
    ],
    actions: [
      {
        id: "a1",
        label: "Ask us something else",
        href: "/contact",
        style: "pill ghost"
      }
    ]
  }],
  ["PageClosing", {
    label: "Get involved",
    title: "Come to one and see",
    lede: "The easiest way to find out whether this is for you is to turn up to a session. Message us and we will tell you what is next.",
    actions: [
      {
        id: "a1",
        label: "Ask about joining",
        href: "wa:youthJoin",
        style: "pill sand"
      },
      {
        id: "a2",
        label: "Read about D’Life",
        href: "/about",
        style: "pill ghost"
      }
    ],
    note: ""
  }],
]);
