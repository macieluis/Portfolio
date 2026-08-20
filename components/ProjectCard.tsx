import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "./icons";
import type { Project } from "@/data/projects";
import { FeedPost } from "./FeedPost";
import { ProjectImage } from "./ProjectImage";
import { TechBadge } from "./TechBadge";

interface ProjectCardProps {
  project: Project;
}

/** A project rendered as a tweet-style feed post. */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <FeedPost
      label="Project"
      chips={[
        `🛠️ ${project.category}`,
        ...(project.wip ? ["🚧 In development"] : []),
      ]}
    >
      <h3 className="text-lg font-extrabold tracking-tight">
        <Link
          href={`/projects/${project.slug}`}
          className="hover:text-accent transition-colors"
        >
          {project.name}
        </Link>
      </h3>
      <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
        {project.summary}
      </p>

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
          View project
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
            GitHub
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
