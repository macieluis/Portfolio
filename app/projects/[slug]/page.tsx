import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { Footer } from "@/components/Footer";
import { ProjectImage } from "@/components/ProjectImage";
import { TechBadge } from "@/components/TechBadge";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: project.name,
      description: project.summary,
    },
  };
}

interface DetailBlockProps {
  title: string;
  items?: string[];
}

/** Bulleted case-study block; hidden when the data is missing. */
function DetailBlock({ title, items }: DetailBlockProps) {
  if (!items || items.length === 0) return null;
  return (
    <section aria-label={title} className="border-b border-edge px-4 py-5">
      <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 text-[15px] leading-relaxed text-muted"
          >
            <span
              aria-hidden
              className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent"
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 sm:border-x sm:border-edge">
      <header className="sticky top-0 z-40 border-b border-edge bg-background/75 backdrop-blur-md">
        <nav
          aria-label="Breadcrumb"
          className="flex h-[53px] items-center gap-4 px-4"
        >
          <Link
            href="/#projects"
            aria-label="Back to projects"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-foreground/10"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </Link>
          <div className="min-w-0">
            <p className="truncate text-lg font-extrabold tracking-tight">
              {project.name}
            </p>
            <p className="text-[13px] text-muted">{project.category}</p>
          </div>
        </nav>
      </header>

      <main>
        <div className="border-b border-edge px-4 py-5">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {project.name}
          </h1>
          {project.wip && (
            <p className="mt-2">
              <span className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-[13px] font-medium text-muted">
                🚧 In active development
              </span>
            </p>
          )}
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-[15px] font-bold text-white transition-colors hover:bg-accent-strong"
              >
                <GitHubIcon className="h-4 w-4" aria-hidden />
                View code
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                // Becomes the primary CTA when there is no repository link.
                className={
                  project.links.github
                    ? "inline-flex items-center gap-2 rounded-full border border-edge-strong px-5 py-2 text-[15px] font-bold transition-colors hover:bg-foreground/10"
                    : "inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-[15px] font-bold text-white transition-colors hover:bg-accent-strong"
                }
              >
                Live demo
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            )}
            {!project.links.github && !project.links.demo && (
              <p className="text-[15px] text-muted">
                Repository not public yet — happy to walk through the code on
                request.
              </p>
            )}
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-edge">
            <div className="aspect-[2/1]">
              <ProjectImage
                src={project.image}
                alt={`Screenshot of ${project.name}`}
                label={project.slug}
              />
            </div>
          </div>
        </div>

        <section aria-label="Problem" className="border-b border-edge px-4 py-5">
          <h2 className="text-lg font-extrabold tracking-tight">Problem</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            {project.problem}
          </p>
        </section>

        <section
          aria-label="Solution"
          className="border-b border-edge px-4 py-5"
        >
          <h2 className="text-lg font-extrabold tracking-tight">Solution</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            {project.solution}
          </p>
        </section>

        <section
          aria-label="Tech stack"
          className="border-b border-edge px-4 py-5"
        >
          <h2 className="text-lg font-extrabold tracking-tight">Tech stack</h2>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech}>
                <TechBadge label={tech} />
              </li>
            ))}
          </ul>
        </section>

        {project.detail?.architecture && (
          <section
            aria-label="Architecture"
            className="border-b border-edge px-4 py-5"
          >
            <h2 className="text-lg font-extrabold tracking-tight">
              Architecture
            </h2>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
              {project.detail.architecture}
            </p>
          </section>
        )}

        <DetailBlock title="Technical highlights" items={project.highlights} />
        <DetailBlock
          title="Technical decisions"
          items={project.detail?.decisions}
        />
        <DetailBlock title="Challenges" items={project.detail?.challenges} />
        <DetailBlock title="Results" items={project.detail?.results} />
        <DetailBlock
          title="Future improvements"
          items={project.detail?.improvements}
        />
        <DetailBlock title="What I learned" items={project.detail?.lessons} />
      </main>

      <Footer />
    </div>
  );
}
