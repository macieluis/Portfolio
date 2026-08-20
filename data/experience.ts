/**
 * ─────────────────────────────────────────────────────────────────────
 *  EXPERIENCE — internships, freelance, research, volunteering.
 *  Most recent first. If this array is empty, the Experience section
 *  and its navigation tab are hidden automatically.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface ExperienceEntry {
  role: string;
  organization: string;
  /** e.g. "Jun 2024 – Sep 2024". */
  period: string;
  location?: string;
  /** e.g. "Internship", "Freelance", "Research". */
  type?: string;
  description: string;
  highlights?: string[];
  stack?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "IT Intern",
    organization: "Inforalfa",
    period: "Jul 2026",
    location: "Azores, Portugal",
    type: "Professional internship (Estagiar U programme)",
    description:
      "Technical support, maintenance and development of IT solutions, with direct hands-on exposure to systems, networks and applications in a real working environment.",
  },
  {
    role: "Software Engineering Intern",
    organization: "Bool",
    period: "Aug 2025",
    location: "Praia da Vitória, Azores",
    type: "University internship",
    description:
      "Software development and systems integration on an accelerated frontend roadmap — HTML, CSS, JavaScript and frameworks — consuming APIs and connecting user-facing applications to the backend infrastructure (servers and databases).",
    stack: ["HTML", "CSS", "JavaScript", "REST APIs"],
  },
];
