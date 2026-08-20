/**
 * ─────────────────────────────────────────────────────────────────────
 *  PROJECTS — add, remove or reorder projects here.
 *
 *  Each project automatically gets:
 *    • a post in the feed / Projects section
 *    • a detail page at /projects/<slug>
 *  Set `featured: true` on exactly one project to pin it at the top.
 *  Set `wip: true` while a project is still in active development.
 *
 *  Screenshots: put images in public/images/projects/ and reference
 *  them in `image`. Until then, a styled fallback is rendered.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface Project {
  /** URL-safe identifier — becomes /projects/<slug>. */
  slug: string;
  name: string;
  category: string;
  /** One-liner shown on the card. */
  summary: string;
  /** Pinned to the top of the feed when true (use on one project). */
  featured?: boolean;
  /** Shows an "in development" chip — honest signal for unfinished work. */
  wip?: boolean;
  problem: string;
  solution: string;
  stack: string[];
  highlights: string[];
  /** Optional deeper write-up for the detail page. Omit sections you don't need. */
  detail?: {
    architecture?: string;
    decisions?: string[];
    challenges?: string[];
    results?: string[];
    improvements?: string[];
    lessons?: string[];
  };
  links: {
    github?: string;
    demo?: string;
  };
  /** Path under /public, e.g. "/images/projects/my-project.png". */
  image?: string;
}

export const projects: Project[] = [
  {
    slug: "flowbnb",
    name: "FlowBnB",
    category: "SaaS · Full-Stack",
    summary:
      "A SaaS that automates guest communication for Airbnb and short-term rental hosts: paste a listing link and AI sets up the guest guide, automated messages, review management and upsells.",
    featured: true,
    wip: true,
    problem:
      "Short-term rental hosts answer the same guest questions over and over — check-in details, wifi, house rules — and lose hours every week to repetitive messaging, review follow-ups and manual upsells.",
    solution:
      "I'm building FlowBnB solo, end to end: a host pastes their Airbnb link and AI configures the whole workspace in seconds. The product ships as a Turborepo monorepo with two Next.js apps (marketing site and dashboard) on Vercel, backed by Supabase, with Stripe subscriptions, transactional email and scheduled automations.",
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Supabase (PostgreSQL)",
      "Stripe",
      "OpenAI API",
      "Resend",
      "Turborepo",
      "Vercel",
    ],
    highlights: [
      "Turborepo + pnpm monorepo: marketing app (flowbnb.co) and product dashboard (app.flowbnb.co) sharing lib/ui/types/i18n packages",
      "Cross-subdomain Supabase auth with shared cookie domain between marketing site and dashboard",
      "Stripe subscription billing gated behind a single feature flag, so the full paid flow is testable on staging while production runs waitlist-only",
      "AI onboarding that configures a property from an Airbnb listing link",
      "Transactional email (Resend), SMS (Twilio) and 6 scheduled cron automations on Vercel",
      "Real dev workflow: protected main, develop → staging previews, deploy checklists and runbooks",
    ],
    detail: {
      architecture:
        "Monorepo with two independently deployed Next.js apps. The marketing app owns the public site, blog, free tools and waitlist/lead APIs; the dashboard app owns authentication, all business APIs and the product itself. Shared packages hold the Supabase clients (server/client, with cross-subdomain cookies), email and AI integrations, plans configuration, feature flags and the design tokens. Two Vercel projects deploy from the same repo.",
      decisions: [
        "Split a single app into a monorepo so the marketing site and the product can evolve and deploy independently while sharing code.",
        "Gated every paid surface behind one environment variable instead of scattered checks — production runs waitlist-only while staging exercises the full Stripe flow.",
        "Launched with a waitlist + survey funnel to collect real host data (property count, platforms, pain points) before spending on ads.",
      ],
      challenges: [
        "Making authentication work seamlessly across subdomains (flowbnb.co and app.flowbnb.co) with Supabase SSR cookies.",
        "Designing the AI onboarding so a single Airbnb link produces a useful, editable guest guide instead of generic filler.",
      ],
      results: [
        "Fully functional product in production with a free beta, a growing waitlist, and a staged launch plan.",
      ],
      improvements: [
        "Finish the monorepo migration to main, expand channel-manager integrations, and open paid plans publicly.",
      ],
      lessons: [
        "Shipping a real SaaS solo teaches everything at once: product, infra, billing, email deliverability, and the discipline of staging environments and runbooks.",
      ],
    },
    links: {
      demo: "https://flowbnb.co",
    },
    image: "/images/projects/flowbnb.png",
  },
  {
    slug: "e2ee-chat",
    name: "E2EE Chat",
    category: "Security · Cryptography",
    summary:
      "A chat application with Signal-style end-to-end encryption (X3DH + Double Ratchet) and its own PKI — the server never sees a message in plaintext.",
    wip: true,
    problem:
      "Most chat systems trust the server with message contents. I wanted to understand, by building it, how modern messengers guarantee that only the endpoints can read messages — even when the server stores and relays them.",
    solution:
      "A Python client/server system implementing the X3DH handshake and the Double Ratchet algorithm, with an internal certificate authority issuing X.509 certificates per user, encrypted offline delivery queues, an optional peer-to-peer direct mode, and a local web interface built without frameworks.",
    stack: ["Python", "Cryptography", "X3DH", "Double Ratchet", "X.509 PKI"],
    highlights: [
      "X3DH key agreement + Double Ratchet sessions with forward secrecy and automatic one-time prekey replenishment",
      "Group chats via pairwise encrypted sessions per member",
      "Own PKI: an internal CA issues X.509 certificates for every user",
      "P2P direct mode — clients can talk without going through the server",
      "Private keys encrypted at rest with a local password; they never leave the device",
      "Client-server transport wrapped in its own encrypted channel (ECDH + HKDF)",
      "Local web UI (plain HTML/CSS/JS + SSE) over the Python client — crypto stays in the client process",
    ],
    detail: {
      architecture:
        "The server only stores public key bundles and encrypted message queues. Each client runs the full protocol stack locally — X3DH for session establishment, Double Ratchet for message keys — and exposes a local HTTP bridge (JSON API + server-sent events) that a frameworkless web UI consumes. The browser is purely a presentation layer; keys and encryption never leave the client process.",
      decisions: [
        "Implemented the Signal protocol primitives (X3DH, Double Ratchet) instead of using a ready-made library, to actually understand them.",
        "Kept the web UI as a thin local bridge over the client so the crypto boundary stays in one process.",
      ],
      challenges: [
        "Getting the Double Ratchet state machine right — out-of-order messages, skipped keys and session resets.",
        "Designing offline delivery so queued messages stay encrypted and forward secrecy is preserved.",
      ],
      improvements: [
        "Add authenticated group management and safety-number verification UX.",
      ],
      lessons: [
        "Cryptographic protocols are unforgiving: the hard part is not the math but the state management and the failure modes.",
      ],
    },
    links: {
      // TODO: add the repository URL once it is public on GitHub.
    },
  },
  {
    slug: "trustybet",
    name: "TrustYBet",
    category: "Mobile · AI",
    summary:
      "A mobile app that analyzes a photo of a betting slip and tells you whether the bet has positive expected value, using OCR, LLM extraction and a multi-agent quant pipeline.",
    wip: true,
    problem:
      "Casual bettors have no idea whether the odds they're taking are good — bookmakers price in a margin, and comparing a slip against the sharp market by hand is impractical.",
    solution:
      "Users photograph a betting slip; the backend extracts teams, odds and market with GPT-4o-mini vision, normalizes them with fuzzy matching, pulls sharp-market odds from The Odds API, and runs two agents in parallel — a quant model deriving Poisson goal rates from de-vigged sharp odds and a scout scanning news feeds for injuries and form — then fuses everything into a single EV verdict.",
    stack: [
      "Python",
      "FastAPI",
      "MongoDB",
      "React Native",
      "Expo",
      "TypeScript",
      "OpenAI API",
    ],
    highlights: [
      "OCR + LLM vision extraction of teams, odds, selection and bookmaker from slip screenshots",
      "Fuzzy normalization of team and bookmaker names (rapidfuzz) against curated databases",
      "Quant agent: Poisson grid search over goal rates derived from de-vigged sharp odds — no external stats API",
      "Scout agent: RSS + LLM analysis of injuries, suspensions and form, run in parallel with asyncio",
      "EV fusion combining market EV, quant EV and risk flags into a single verdict",
      "Odds snapshots persisted to MongoDB for line-movement history and charts",
      "Bearer-token session auth and per-tier daily rate limiting",
    ],
    detail: {
      architecture:
        "Two independently deployed services: a FastAPI + MongoDB backend exposing everything under /api, and a React Native (Expo Router) app. The core pipeline — upload → LLM extraction → normalization → sharp-odds lookup → parallel quant/scout agents → EV fusion → persistence — touches every backend module and feeds the history and tracker screens.",
      decisions: [
        "Derived true probabilities from de-vigged sharp bookmaker odds instead of paying for a stats API.",
        "Ran the quant and scout agents concurrently with asyncio.gather to keep analysis latency acceptable.",
        "Weighted market EV over model EV in the fusion formula, penalized by scout risk flags.",
      ],
      challenges: [
        "Making LLM extraction reliable across many bookmaker slip layouts and languages.",
        "Fuzzy-matching real-world team names against odds-API event names without false positives.",
      ],
      improvements: [
        "Add more sports and markets, and a proper bankroll tracker on top of the persisted analyses.",
      ],
      lessons: [
        "LLMs are a practical extraction layer, but everything around them — normalization, validation, fallbacks — is where the engineering happens.",
      ],
    },
    links: {
      // TODO: add the repository URL once it is public on GitHub.
    },
  },
  {
    slug: "spotifum",
    name: "SpotifUM",
    category: "Java · OOP",
    summary:
      "A music-management application built for the Object-Oriented Programming course at the University of Minho — a JUnit-tested, MVC-structured Java domain model.",
    wip: true,
    problem:
      "The OOP course project: model a Spotify-like music service — users, playlists, music library, playback statistics — with a clean object-oriented design.",
    solution:
      "A Java 23 application built with Gradle, organized as MVC (controller, views, menus) over domain packages for users, musics, playlists and statistics, with custom exceptions, Javadoc and a JUnit 5 test suite.",
    stack: ["Java", "Gradle", "JUnit 5"],
    highlights: [
      "MVC architecture separating controller, views and menu navigation from the domain model",
      "Domain packages for users, musics, playlists and playback statistics",
      "Custom exception hierarchy for domain errors",
      "20 JUnit 5 test classes covering the domain model",
      "Gradle build with Javadoc generation and a documented UML class diagram",
    ],
    links: {
      // TODO: add the repository URL once it is public on GitHub.
    },
  },
];

export const featuredProject: Project | undefined = projects.find(
  (project) => project.featured,
);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
