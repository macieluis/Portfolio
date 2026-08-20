/**
 * ─────────────────────────────────────────────────────────────────────
 *  EDUCATION — degrees, dates and optional coursework/achievements.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface EducationEntry {
  degree: string;
  institution: string;
  /** e.g. "2023 – 2026". */
  period: string;
  location?: string;
  /** Optional: subjects relevant to the roles you target. */
  coursework?: string[];
  /** Optional: academic projects, awards or achievements. */
  achievements?: string[];
}

export const education: EducationEntry[] = [
  {
    degree: "BSc in Computer Engineering (Engenharia Informática)",
    institution: "University of Minho",
    period: "2023 – 2026",
    location: "Braga, Portugal",
    coursework: [
      "Computer Networks & Architecture",
      "Operating Systems",
      "Databases",
      "Artificial Intelligence",
    ],
    achievements: [
      "Solid training in software development, infrastructure and cybersecurity, with practical projects combining programming and algorithms with network topology design and access management.",
    ],
  },
  {
    degree: "Professional courses",
    institution: "Politécnico de Lisboa (NAU platform) & others",
    period: "2025 – 2026",
    coursework: [
      "Web Programming",
      "Software Development Techniques",
      "Mobile Development",
      "Database Fundamentals",
      "Algorithms & Complexity",
      "Artificial Intelligence",
      "Intro to Blockchain",
    ],
  },
];
