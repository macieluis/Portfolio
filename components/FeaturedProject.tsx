import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "./icons";
import type { Project } from "@/data/projects";
import { FeedPost } from "./FeedPost";
import { ProjectImage } from "./ProjectImage";
import { TechBadge } from "./TechBadge";

interface FeaturedProjectProps {
  project: Project;
}

/** The pinned post at the top of the feed — your best project. */
export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <FeedPost
      pinned
      label="Featured project"
      chips={[
        `🚀 ${project.category}`,
        ...(project.wip ? ["🚧 In development"] : []),
      ]}
    >
      <h3 className="text-xl font-extrabold tracking-tight sm:text-2xl">
        <Link
          href={`/projects/${project.slug}`}
          className="hover:text-accent transition-colors"
        >
          {project.name}
        </Link>
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        {project.summary}
      </p>

      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">
        <p>
          <span className="font-bold text-foreground">Problem — </span>
          {project.problem}
        </p>
        <p>
          <span className="font-bold text-foreground">Solution — </span>
          {project.solution}
        </p>
      </div>

      <ul className="mt-3 space-y-1.5">
        {project.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex gap-2 text-[15px] leading-relaxed text-muted"
          >
            <span
              aria-hidden
              className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent"
            />
            {highlight}
          </li>
        ))}
      </ul>

      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used">
        {project.stack.map((tech) => (
          <li key={tech}>
            <TechBadge label={tech} />
          </li>
        ))}
      </ul>

      <div className="mt-3 overflow-hidden rounded-2xl border border-edge">
        <div className="aspect-[2/1]">
          <ProjectImage
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            label={project.slug}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] font-medium">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          Read the case study
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-accent hover:underline"
          >
            <GitHubIcon className="h-4 w-4" aria-hidden />
            Code
          </a>
        )}
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent hover:underline"
          >
            Live demo
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        )}
      </div>
    </FeedPost>
  );
}
