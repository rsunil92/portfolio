/**
 * All content for the portfolio lives here.
 * Edit this file to make the site yours — no other file needs to change.
 */
window.PORTFOLIO = {
  profile: {
    name: "Maya Ortega",
    shortName: "Maya Ortega",
    headline: "Senior UX Designer · Product design for fintech, health & SaaS",
    location: "Lyon, France · Hybrid / Remote (CET)",
    yearsLabel: "8 years",
    followers: "4,180",
    // Shown top-right of the profile card, like the school/company row on LinkedIn.
    companies: [
      { label: "Northwind Bank", role: "Current" },
      { label: "École de Design Nantes", role: "Education" }
    ]
  },

  openTo: {
    title: "Open to work",
    text: "Senior / Lead Product Designer roles and 3–6 month design engagements. Available from October 2026."
  },

  about: [
    "I design software that people have to use at work — the kind where a confusing screen costs someone an hour, not just a click. Eight years in, most of that time has gone into fintech dashboards, clinical tools and B2B SaaS, where the constraints are real and the users are experts.",
    "My work usually starts with watching people do the job today: contextual interviews, session replays, support tickets. From there I move fast into flows and prototypes, test them with 5–8 users, and hand over specs that engineers can build without a translation layer. I maintain the design system alongside the work rather than as a side project.",
    "I care about accessibility as a baseline (WCAG 2.2 AA, not a retrofit), about designing the empty and error states before the happy path, and about measuring whether the redesign actually helped."
  ],

  metrics: [
    { value: "8", label: "years designing products" },
    { value: "40+", label: "shipped features & flows" },
    { value: "120+", label: "usability sessions run" },
    { value: "4", label: "design systems built" }
  ],

  experience: [
    {
      role: "Senior Product Designer",
      company: "Northwind Bank",
      companyType: "Fintech · 900 employees",
      type: "Full-time",
      start: "Mar 2024",
      end: "Present",
      duration: "2 yrs 5 mos",
      location: "Lyon, France · Hybrid",
      summary:
        "Design lead for the business banking platform used by 60k SMEs. Own end-to-end design for payments and onboarding, and co-maintain the design system with two engineers.",
      bullets: [
        "Redesigned the bulk-payments flow — approval errors down 41% and median completion time from 6m10s to 3m25s across 12k monthly sessions.",
        "Rebuilt KYC onboarding as a resumable, progressively-disclosed flow; drop-off at the document step fell from 34% to 19%.",
        "Led the accessibility audit and remediation for the core app, taking it from 61 to 98 on the internal WCAG 2.2 AA checklist.",
        "Set up a continuous research cadence: 6 sessions a month, findings triaged with PM and eng in a shared weekly review."
      ],
      skills: ["Design systems", "Service design", "Accessibility", "Prototyping", "Figma"]
    },
    {
      role: "Product Designer",
      company: "Helio Health",
      companyType: "Digital health · Series B",
      type: "Full-time",
      start: "Jan 2021",
      end: "Feb 2024",
      duration: "3 yrs 2 mos",
      location: "Remote (France)",
      summary:
        "Sole designer for the clinician-facing product, then one of three as the team grew. Worked directly with nurses and care coordinators in hospital settings.",
      bullets: [
        "Designed the care-plan builder now used by 2,300 clinicians daily; cut plan creation from ~15 to ~6 minutes in timed tests.",
        "Ran 60+ contextual interviews and shadowing sessions across 9 hospital sites, and turned them into a shared journey map the whole company used for roadmap planning.",
        "Created the first design system (48 components, tokens shared with the React codebase), removing roughly 200 one-off styles.",
        "Introduced a lightweight design-critique ritual that shortened design→dev handoff from 5 days to 2."
      ],
      skills: ["User research", "Journey mapping", "Design systems", "Usability testing", "Figma"]
    },
    {
      role: "UX Designer",
      company: "Coda Studio",
      companyType: "Product & branding agency",
      type: "Full-time",
      start: "Sep 2019",
      end: "Dec 2020",
      duration: "1 yr 4 mos",
      location: "Nantes, France · On-site",
      summary:
        "Client-facing designer across 14 projects — SaaS dashboards, e-commerce and two public-sector services.",
      bullets: [
        "Led discovery and UX for a regional transport ticketing app (180k users at launch), including a full accessibility pass.",
        "Ran co-design workshops with client teams; standardised the studio's discovery kit, later used on every new engagement.",
        "Took three products from research to shipped UI, working alongside 2–4 engineers per project."
      ],
      skills: ["Workshop facilitation", "Information architecture", "Wireframing", "Client strategy"]
    },
    {
      role: "Junior UX/UI Designer",
      company: "Brightline Apps",
      companyType: "Mobile product studio",
      type: "Full-time",
      start: "Aug 2018",
      end: "Aug 2019",
      duration: "1 yr 1 mo",
      location: "Nantes, France · On-site",
      summary:
        "First design role. Shipped mobile interfaces for consumer apps and learned the craft from a senior team.",
      bullets: [
        "Designed screens and interaction states for 5 iOS/Android apps, including a 40-screen habit tracker.",
        "Built and maintained the studio's shared UI kit and icon set.",
        "Moderated my first usability tests — 20+ sessions in that year."
      ],
      skills: ["UI design", "Mobile design", "Prototyping", "Sketch"]
    }
  ],

  projects: [
    {
      title: "Bulk payments, rebuilt",
      client: "Northwind Bank",
      year: "2025",
      tag: "Case study",
      accent: "blue",
      summary:
        "A payments screen SMEs dreaded. Fifteen interviews, three prototypes and a staged rollout later, approval errors dropped 41%.",
      tags: ["Research", "Interaction design", "Design system"],
      url: "#"
    },
    {
      title: "Care plans in six minutes",
      client: "Helio Health",
      year: "2023",
      tag: "Case study",
      accent: "green",
      summary:
        "Shadowing nurses on the ward showed the real bottleneck wasn't the form — it was finding last week's plan. So we redesigned around retrieval.",
      tags: ["Field research", "Complex forms", "Healthcare"],
      url: "#"
    },
    {
      title: "Atlas Design System",
      client: "Helio Health",
      year: "2022",
      tag: "System",
      accent: "purple",
      summary:
        "48 components, tokenised and shipped to a React codebase. Documentation written for engineers first, designers second.",
      tags: ["Tokens", "Documentation", "Governance"],
      url: "#"
    },
    {
      title: "Regional transport ticketing",
      client: "Coda Studio",
      year: "2020",
      tag: "Case study",
      accent: "amber",
      summary:
        "A public service app used by everyone, so it had to work for everyone — screen readers, low bandwidth, and gloves in winter.",
      tags: ["Accessibility", "Public sector", "Mobile"],
      url: "#"
    }
  ],

  education: [
    {
      title: "École de Design Nantes Atlantique",
      subtitle: "MSc Interaction Design",
      period: "2016 — 2018",
      note: "Thesis on decision support interfaces for non-expert users. Graduated with distinction."
    },
    {
      title: "Université Lumière Lyon 2",
      subtitle: "BA Applied Arts & Human Sciences",
      period: "2013 — 2016",
      note: "Minor in cognitive psychology."
    }
  ],

  certifications: [
    "NN/g UX Certification",
    "IAAP CPACC (Accessibility)",
    "Google UX Design Certificate",
    "Design Sprint Facilitation"
  ],

  skills: [
    { name: "User research & interviewing", level: 95 },
    { name: "Interaction & flow design", level: 92 },
    { name: "Design systems", level: 90 },
    { name: "Usability testing", level: 88 },
    { name: "Accessibility (WCAG 2.2)", level: 85 },
    { name: "Prototyping & motion", level: 80 },
    { name: "Workshop facilitation", level: 78 },
    { name: "HTML / CSS literacy", level: 70 }
  ],

  tools: [
    "Figma", "FigJam", "Maze", "Dovetail", "Framer",
    "Storybook", "Notion", "Jira", "Optimal Workshop", "Adobe CC"
  ],

  languages: [
    { title: "French", subtitle: "Native" },
    { title: "English", subtitle: "Full professional proficiency" },
    { title: "Spanish", subtitle: "Conversational" }
  ],

  quotes: [
    {
      text:
        "Maya is the rare designer who will happily sit in a hospital corridor for three days to understand a workflow, then come back with something engineers can build on Monday. Our care-plan numbers moved because of that.",
      author: "Priya Raman",
      role: "VP Product, Helio Health"
    },
    {
      text:
        "She turned accessibility from a launch blocker into something the team just does. The design system documentation she wrote is still the first thing we give new engineers.",
      author: "Thomas Lefèvre",
      role: "Engineering Manager, Northwind Bank"
    }
  ],

  contact: [
    { label: "Email", value: "hello@mayaortega.design", href: "mailto:hello@mayaortega.design", icon: "mail" },
    { label: "LinkedIn", value: "linkedin.com/in/mayaortega", href: "#", icon: "linkedin" },
    { label: "Portfolio", value: "mayaortega.design", href: "#", icon: "globe" },
    { label: "Location", value: "Lyon, France (CET)", href: null, icon: "pin" }
  ]
};
