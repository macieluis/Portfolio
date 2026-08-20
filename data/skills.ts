/**
 * ─────────────────────────────────────────────────────────────────────
 *  SKILLS — grouped by category, rendered as simple badges.
 *  Sourced from the CV; keep it to technologies you can demonstrate.
 *  Remove any category you don't need; empty categories are hidden.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Java", "C", "C++", "Haskell"],
  },
  {
    category: "Web & APIs",
    skills: ["React", "Next.js", "Node.js", "Express", "REST APIs", "HTML & CSS"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Supabase"],
  },
  {
    category: "Systems & Networks",
    skills: ["Linux", "Windows Server", "TCP/IP", "Systems administration"],
  },
  {
    category: "Security",
    skills: ["Security fundamentals", "Applied cryptography", "IAM basics"],
  },
  {
    category: "Tools",
    skills: ["Git", "GitHub", "Docker", "Vercel"],
  },
];
