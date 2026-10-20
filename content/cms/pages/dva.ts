import { pageDocument } from "../define";

/** /dva as a Talous CMS document: today's copy (the lists moved here from the page). */
export const DVA_PAGE = pageDocument([
  ["PageHero", {
    tone: "ink",
    panel: "green",
    label: "Drive Value Associates",
    title: "Built for leaders\nby invitation.",
    lede: "A selective circle of financial advisors, shaped by shared values and experience. Founded by Sharon Cheang.",
    photo: "/media/img/dva-hero-dinner.jpg",
    photoAlt: "DVA members together around a banquet table at a dinner",
    photoFit: "contain",
    actions: [
      {
        id: "a1",
        label: "Ask about DVA",
        href: "/contact",
        style: "pill sand"
      }
    ]
  }],
  ["PageStatement", {
    kick: "What is DVA",
    lead: "A selective circle of financial advisors. They meet for long-term development rather than to trade referrals, and they stay in their own practices.",
    prose: "Networking groups meet to exchange referrals. This one meets for long-term development, working relationships and collaborative success, and the difference shows up in what members are asked to give rather than in what they are offered.\n\nWhat members share is the aim, not an employer. It is also why the circle stays small, and why a place in it is offered rather than applied for."
  }],
  ["PageCreed", {
    label: "Purpose",
    title: "Why the circle exists",
    lede: "To build a community of exceptional financial advisors who lead with integrity and grow with purpose. These are the 4 things it is organised around.",
    items: [
      {
        id: "p1",
        term: "Learning",
        copy: "Progress is discussed openly, including the parts that are not working.",
        icon: "growth"
      },
      {
        id: "p2",
        term: "Leadership",
        copy: "Advisors developed into people others choose to follow.",
        icon: "people"
      },
      {
        id: "p3",
        term: "Real value",
        copy: "Advice measured by what it does for the client, not by what it produces.",
        icon: "gauge"
      },
      {
        id: "p4",
        term: "Impact",
        copy: "A profession left in better standing than the circle found it.",
        icon: "building"
      }
    ]
  }],
  ["PageIndex", {
    label: "What members develop",
    title: "The work of the circle",
    items: [
      {
        id: "d1",
        title: "Leadership",
        copy: "The mindset, confidence and practical skill to influence teams, guide others and lead with purpose in business and outside it."
      },
      {
        id: "d2",
        title: "Communication",
        copy: "Interpersonal communication, client engagement, negotiation, presentation and relationship building."
      },
      {
        id: "d3",
        title: "Personal branding",
        copy: "A credible, authentic professional identity that reflects your values, expertise and long-term aspirations."
      },
      {
        id: "d4",
        title: "Financial literacy",
        copy: "Deeper understanding of financial planning, wealth management, industry movement and responsible advisory practice."
      },
      {
        id: "d5",
        title: "Mentorship",
        copy: "Ongoing coaching and knowledge sharing from experienced leaders, drawn from real business experience rather than theory."
      },
      {
        id: "d6",
        title: "Public speaking",
        copy: "Structured opportunities to present, facilitate discussion and communicate ideas with confidence."
      }
    ]
  }],
  ["PageYearMap", {
    label: "Across the year",
    title: "The shape of a year in the circle",
    lede: "What tells you most about the commitment is how often each one comes round.",
    tier1When: "Every month",
    tier1Note: "The spine of it",
    tier1Sessions: [
      {
        id: "t1s1",
        name: "Growth Circle",
        copy: "Progress, obstacles and shared experience, in a room where everyone is held to the same line."
      }
    ],
    tier2When: "Through the quarter",
    tier2Note: "Development",
    tier2Sessions: [
      {
        id: "t2s1",
        name: "Leadership workshops",
        copy: "Build leadership mindset, strategic thinking and practical skills through coaching and real cases."
      },
      {
        id: "t2s2",
        name: "Learning forums",
        copy: "Insights from industry experts and experienced practitioners, with sharing and discussions."
      },
      {
        id: "t2s3",
        name: "Personal development programmes",
        copy: "Chosen to support each member’s growth in both personal and professional life."
      }
    ],
    tier3When: "Across the year",
    tier3Note: "The circle in practice",
    tier3Sessions: [
      {
        id: "t3s1",
        name: "Networking sessions",
        copy: "Connect with members and invited guests."
      },
      {
        id: "t3s2",
        name: "Team building",
        copy: "Indoors and outdoors."
      },
      {
        id: "t3s3",
        name: "Charity and volunteer projects",
        copy: "Give back and make a positive impact together."
      },
      {
        id: "t3s4",
        name: "Cross-agency collaboration",
        copy: "Joint initiatives beyond D’Life."
      }
    ]
  }],
  ["PageGate", {
    label: "Selection",
    title: "Slow, on purpose",
    aside: "There is no application form, and there is no cohort. A place opens when the fit is right and not before.",
    stages: [
      {
        id: "s1",
        k: "First",
        title: "A conversation",
        copy: "Usually because a member has suggested it, or because you asked. Nothing is decided at this stage."
      },
      {
        id: "s2",
        k: "Then",
        title: "A personal interview with Sharon",
        copy: "Every member is interviewed and selected by Sharon herself, to make sure the alignment is genuine rather than assumed."
      },
      {
        id: "s3",
        k: "Only then",
        title: "An invitation",
        copy: "Extended when the standard is clearly shared. Some conversations end here, and that is a reasonable outcome for both sides."
      }
    ]
  }],
  ["PageHolds", {
    label: "The standard",
    title: "What members hold each other to",
    items: [
      {
        id: "i1",
        text: "Values that hold up when nobody is checking"
      },
      {
        id: "i2",
        text: "Ethics before opportunity, in every recommendation"
      },
      {
        id: "i3",
        text: "Professionalism: licensing, disclosure and continued learning"
      },
      {
        id: "i4",
        text: "A long-term view of a client relationship, and of a career"
      }
    ]
  }],
  ["PageFaq", {
    label: "Questions",
    title: "About membership",
    faqs: [
      {
        id: "q1",
        q: "Can I apply to join?",
        a: "Not in the usual sense. Membership is by invitation, and every member is personally interviewed by Sharon before joining. You are welcome to ask about it, and that conversation is where it would start."
      },
      {
        id: "q2",
        q: "Is DVA a recruitment channel for D’Life?",
        a: "No. Members remain in their own practices. DVA exists to raise the standard of the profession, not to move people between agencies."
      },
      {
        id: "q3",
        q: "What is the commitment?",
        a: "A monthly Growth Circle, plus workshops, forums and community projects across the year. It is a real commitment of time, which is part of why the circle stays small."
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
    label: "Discover DVA",
    title: "If this sounds like the room you have been looking for",
    lede: "Membership is by invitation, but a conversation is not. Tell us a little about your practice and we will take it from there.",
    actions: [
      {
        id: "a1",
        label: "Ask about DVA",
        href: "/contact",
        style: "pill"
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
