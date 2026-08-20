import {
  Briefcase,
  FileDown,
  FileText,
  GraduationCap,
  Link2,
  Mail,
  MapPin,
} from "lucide-react";
import { LinkedInIcon } from "./icons";
import { profile } from "@/data/profile";
import { Avatar } from "./Avatar";
import { Cover } from "./Cover";

/** Strip the protocol for a Twitter-style display link. */
function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

export function ProfileHeader() {
  return (
    <header id="home" data-section>
      <Cover src={profile.images.cover} />

      <div className="px-4">
        {/* Avatar overlaps the cover, pill CTA on the right — Twitter style */}
        <div className="flex items-end justify-between">
          <div className="relative z-10 -mt-16 sm:-mt-20">
            <Avatar
              src={profile.images.avatar}
              alt={`Portrait of ${profile.name}`}
              initials={profile.initials}
              size="lg"
            />
          </div>
          <a
            href={profile.cvUrl}
            download
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-[15px] font-bold text-white transition-colors hover:bg-accent-strong"
          >
            <FileDown className="h-4 w-4" aria-hidden />
            Download CV
          </a>
        </div>

        <div className="mt-4 max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {profile.name}{" "}
            <span aria-hidden className="align-middle text-2xl sm:text-3xl">
              {profile.badgeEmoji}
            </span>
          </h1>
          <p className="mt-2 text-[17px] font-medium">{profile.headline} ✨</p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            {profile.bio}
          </p>

          {/* Twitter-style meta rows */}
          <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[15px] text-muted">
            <li className="flex items-center gap-1.5">
              <Briefcase className="h-[18px] w-[18px]" aria-hidden />
              {profile.availability}
            </li>
            <li className="flex items-center gap-1.5">
              <GraduationCap className="h-[18px] w-[18px]" aria-hidden />
              {profile.university}
            </li>
            <li className="flex items-center gap-1.5">
              <MapPin className="h-[18px] w-[18px]" aria-hidden />
              {profile.location}
            </li>
          </ul>

          <ul className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[15px]">
            <li className="flex items-center gap-1.5 text-muted">
              <Link2 className="h-[18px] w-[18px]" aria-hidden />
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline"
              >
                {displayUrl(profile.links.github)}
              </a>
            </li>
            <li className="flex items-center gap-1.5 text-muted">
              <LinkedInIcon className="h-4 w-4" aria-hidden />
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline"
              >
                LinkedIn
              </a>
            </li>
            <li className="flex items-center gap-1.5 text-muted">
              <Mail className="h-[18px] w-[18px]" aria-hidden />
              <a
                href={`mailto:${profile.links.email}`}
                className="font-medium text-accent hover:underline"
              >
                {profile.links.email}
              </a>
            </li>
            <li className="flex items-center gap-1.5 text-muted">
              <FileText className="h-[18px] w-[18px]" aria-hidden />
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline"
              >
                View CV
              </a>
            </li>
          </ul>
        </div>

        <div className="h-4" />
      </div>
    </header>
  );
}
