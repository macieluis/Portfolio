import { ArrowUpRight, FileDown, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { FeedPost } from "@/components/FeedPost";
import { Footer } from "@/components/Footer";
import { FeaturedProject } from "@/components/FeaturedProject";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { TabNav, type TabItem } from "@/components/TabNav";
import { TechBadge } from "@/components/TechBadge";
import { education } from "@/data/education";
import { experience } from "@/data/experience";
import { featuredProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";

export default function Home() {
  const otherProjects = projects.filter((project) => !project.featured);
  const visibleSkillGroups = skillGroups.filter(
    (group) => group.skills.length > 0,
  );

  const tabs: TabItem[] = [
    { id: "home", label: "Feed" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    // The Experience tab only exists when there is real experience to show.
    ...(experience.length > 0
      ? [{ id: "experience", label: "Experience" }]
      : []),
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* Faint brand watermark in the outer gutter, like the reference. */}
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-16 -right-8 z-0 hidden select-none font-mono text-[16rem] leading-none text-foreground opacity-[0.04] lg:block"
      >
        {"</>"}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl flex-1 bg-background sm:border-x sm:border-edge">
        <ProfileHeader />
        <TabNav tabs={tabs} />

        <main>
          {/* ─────────────────────────── Feed ─────────────────────────── */}
          <FeedPost pinned chips={[profile.intro.chip]}>
            <h3 className="text-xl font-extrabold tracking-tight sm:text-2xl">
              {profile.intro.heading}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {profile.intro.body}
            </p>
            <p className="mt-3">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[15px] font-medium text-accent hover:underline"
              >
                <GitHubIcon className="h-4 w-4" aria-hidden />
                Explore my GitHub
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </p>
          </FeedPost>

          {featuredProject && (
            <Reveal>
              <FeaturedProject project={featuredProject} />
            </Reveal>
          )}

          {/* ───────────────────────── Projects ───────────────────────── */}
          <Section
            id="projects"
            title="Projects"
            subtitle="Built to learn — and to prove it."
          >
            {otherProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 60}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </Section>

          {/* ──────────────────────────── About ───────────────────────── */}
          <Section id="about" title="About">
            <Reveal>
              <div className="border-b border-edge px-4 py-4">
                <div className="max-w-xl space-y-3 text-[15px] leading-relaxed text-muted">
                  {profile.about.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {profile.interests.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {profile.interests.map((interest) => (
                      <li key={interest}>
                        <TechBadge label={interest} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>

            {/* Skills */}
            {visibleSkillGroups.length > 0 && (
              <Reveal delay={60}>
                <div className="border-b border-edge px-4 py-4">
                  <h3 className="font-bold">Skills</h3>
                  <p className="mt-0.5 text-[13px] text-muted">
                    Technologies I can demonstrate through my projects.
                  </p>
                  <dl className="mt-4 space-y-3.5">
                    {visibleSkillGroups.map((group) => (
                      <div
                        key={group.category}
                        className="grid gap-1.5 sm:grid-cols-[9rem_1fr] sm:gap-4"
                      >
                        <dt className="text-sm font-medium text-muted">
                          {group.category}
                        </dt>
                        <dd className="flex flex-wrap gap-1.5">
                          {group.skills.map((skill) => (
                            <TechBadge key={skill} label={skill} />
                          ))}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            )}

            {/* Education */}
            {education.length > 0 && (
              <Reveal delay={90}>
                <div className="border-b border-edge px-4 py-4">
                  <h3 className="font-bold">Education</h3>
                  <ul className="mt-3 space-y-5">
                    {education.map((entry) => (
                      <li key={`${entry.degree}-${entry.institution}`}>
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <p className="font-bold text-[15px]">
                            {entry.degree}
                          </p>
                          <p className="text-[13px] text-muted">
                            {entry.period}
                          </p>
                        </div>
                        <p className="mt-0.5 text-[15px] text-muted">
                          {entry.institution}
                          {entry.location ? ` · ${entry.location}` : ""}
                        </p>
                        {entry.coursework && entry.coursework.length > 0 && (
                          <ul className="mt-2.5 flex flex-wrap gap-1.5">
                            {entry.coursework.map((subject) => (
                              <li key={subject}>
                                <TechBadge label={subject} />
                              </li>
                            ))}
                          </ul>
                        )}
                        {entry.achievements &&
                          entry.achievements.length > 0 && (
                            <ul className="mt-2.5 space-y-1.5">
                              {entry.achievements.map((achievement) => (
                                <li
                                  key={achievement}
                                  className="flex gap-2 text-[15px] text-muted"
                                >
                                  <span
                                    aria-hidden
                                    className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent"
                                  />
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </Section>

          {/* ─────────────────────── Experience ───────────────────────── */}
          {experience.length > 0 && (
            <Section id="experience" title="Experience">
              {experience.map((entry) => (
                <Reveal key={`${entry.role}-${entry.organization}`}>
                  <div className="border-b border-edge px-4 py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <p className="font-bold text-[15px]">
                        {entry.role}{" "}
                        <span className="font-medium text-muted">
                          · {entry.organization}
                        </span>
                      </p>
                      <p className="text-[13px] text-muted">{entry.period}</p>
                    </div>
                    <p className="mt-0.5 text-[13px] text-muted">
                      {[entry.type, entry.location].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                      {entry.description}
                    </p>
                    {entry.highlights && entry.highlights.length > 0 && (
                      <ul className="mt-2.5 space-y-1.5">
                        {entry.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-2 text-[15px] text-muted"
                          >
                            <span
                              aria-hidden
                              className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                    {entry.stack && entry.stack.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {entry.stack.map((tech) => (
                          <li key={tech}>
                            <TechBadge label={tech} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </Section>
          )}

          {/* ───────────────────────── Contact ────────────────────────── */}
          <Section id="contact" title="Let's build something.">
            <Reveal>
              <div className="px-4 py-5">
                <p className="max-w-xl text-[15px] leading-relaxed text-muted">
                  I am currently looking for software engineering
                  opportunities, including remote positions with international
                  teams. If you think I could be a good fit for your team, I
                  would be happy to talk.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <a
                    href={`mailto:${profile.links.email}`}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-[15px] font-bold text-white transition-colors hover:bg-accent-strong"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    Email me
                  </a>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-edge-strong px-5 py-2 text-[15px] font-bold transition-colors hover:bg-foreground/10"
                  >
                    <LinkedInIcon className="h-4 w-4" aria-hidden />
                    LinkedIn
                  </a>
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-edge-strong px-5 py-2 text-[15px] font-bold transition-colors hover:bg-foreground/10"
                  >
                    <GitHubIcon className="h-4 w-4" aria-hidden />
                    GitHub
                  </a>
                  <a
                    href={profile.cvUrl}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-edge-strong px-5 py-2 text-[15px] font-bold transition-colors hover:bg-foreground/10"
                  >
                    <FileDown className="h-4 w-4" aria-hidden />
                    Download CV
                  </a>
                </div>
              </div>
            </Reveal>
          </Section>
        </main>

        <Footer />
      </div>
    </>
  );
}
