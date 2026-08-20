import type { ReactNode } from "react";
import { Pin } from "lucide-react";
import { profile } from "@/data/profile";
import { Avatar } from "./Avatar";

interface FeedPostProps {
  /** Gray text after the name, e.g. "· Featured project". */
  label?: string;
  /** Small rounded chips under the name, e.g. ["🚀 Backend"]. */
  chips?: string[];
  /** Shows the "Pinned" row above the post. */
  pinned?: boolean;
  children: ReactNode;
}

/**
 * Tweet-style post: small avatar on the left, author row, optional chip,
 * then arbitrary content. The building block of the whole feed.
 */
export function FeedPost({ label, chips, pinned, children }: FeedPostProps) {
  return (
    <article className="border-b border-edge px-4 py-4">
      {pinned && (
        <p className="mb-2 flex items-center gap-2 pl-[52px] text-[13px] font-medium text-muted sm:pl-[56px]">
          <Pin className="h-3.5 w-3.5" aria-hidden />
          Pinned
        </p>
      )}
      <div className="flex gap-3">
        <Avatar
          src={profile.images.avatar}
          alt=""
          initials={profile.initials}
          size="sm"
        />
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-baseline gap-x-1.5 text-[15px]">
            <span className="font-bold">
              {profile.name}{" "}
              <span aria-hidden className="text-sm">
                {profile.badgeEmoji}
              </span>
            </span>
            <span className="text-muted">{profile.handle}</span>
            {label && <span className="text-muted">· {label}</span>}
          </p>
          {chips && chips.length > 0 && (
            <p className="mt-1.5 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-[13px] font-medium"
                >
                  {chip}
                </span>
              ))}
            </p>
          )}
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </article>
  );
}
