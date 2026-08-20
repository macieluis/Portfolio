/**
 * ─────────────────────────────────────────────────────────────────────
 *  PROFILE — the single place to edit your personal information.
 *  Anything still marked [PLACEHOLDER] needs your input.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface Profile {
  /** Full name, displayed prominently in the header. */
  name: string;
  /** Short professional headline shown under your name. */
  headline: string;
  /** One or two sentences describing what you do / want to do. */
  bio: string;
  location: string;
  university: string;
  /** Availability line shown in the header and contact section. */
  availability: string;
  /** Paragraphs for the About section — professional but human. */
  about: string[];
  /** Areas you want to work in, shown as tags in the About section. */
  interests: string[];
  /** Initials used as the avatar fallback until you add a photo. */
  initials: string;
  /** Small emoji rendered next to your name (Twitter-verified style). */
  badgeEmoji: string;
  /** Short handle shown in feed posts, e.g. "@your-username". */
  handle: string;
  /** The intro post at the top of the feed. */
  intro: {
    chip: string;
    heading: string;
    body: string;
  };
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
  /** Place your CV at public/cv.pdf — this path serves it. */
  cvUrl: string;
  images: {
    /** Place your photo at public/images/avatar.jpg */
    avatar: string;
    /** Place a cover image at public/images/cover.jpg (optional — a pastel band shows until then). */
    cover: string;
  };
}

export const profile: Profile = {
  name: "Luís Maciel",
  headline: "Software Engineer · Computer Engineering Graduate",
  bio: "Full-stack engineer who ships real products — from a SaaS for short-term rental hosts to an end-to-end encrypted chat. Solid foundations in software, networks, systems administration and security.",
  location: "Azores, Portugal",
  university: "University of Minho",
  availability: "Open to software engineering roles — remote & international",
  about: [
    "I'm a Computer Engineering graduate from the University of Minho (2023–2026), based in the Azores, Portugal. My degree gave me solid foundations in software development, networks and infrastructure, systems administration (Linux and Windows Server) and cybersecurity fundamentals.",
    "What sets me apart is that I build real things outside class: I'm the solo founder of FlowBnB, a SaaS that automates guest communication for short-term rental hosts, and I've built projects ranging from a Signal-style end-to-end encrypted chat to an AI-powered betting analysis app. I've also worked in industry through two internships, doing frontend development, API integration and IT systems work.",
    "I'm looking for my first full-time software engineering role — ideally backend or full-stack — where I can keep learning how large-scale systems are designed and operated.",
  ],
  interests: [
    "Backend systems",
    "Full-stack development",
    "Security & applied cryptography",
    "Networks & infrastructure",
    "SaaS products",
  ],
  initials: "LM",
  badgeEmoji: "🧑‍💻",
  handle: "@macieluis",
  intro: {
    chip: "👋 Hello",
    heading: "Hello World!",
    body: "Welcome to my corner of the internet. I'm Luís, a Computer Engineering graduate from the University of Minho who likes building real products — this is where I share them. Scroll down for my projects, or jump straight to my GitHub to read the code.",
  },
  links: {
    github: "https://github.com/macieluis",
    // [PLACEHOLDER] Replace with your real LinkedIn profile URL.
    linkedin: "https://www.linkedin.com/in/your-linkedin-slug",
    email: "luismaciel2005@gmail.com",
  },
  cvUrl: "/cv.pdf",
  images: {
    avatar: "/images/avatar.jpg",
    cover: "",
  },
};
