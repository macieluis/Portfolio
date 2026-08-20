"use client";

import { useEffect, useRef, useState } from "react";

interface AvatarProps {
  src: string;
  alt: string;
  initials: string;
  /** "lg" for the profile header, "sm" for feed posts. */
  size?: "lg" | "sm";
}

const sizeClasses = {
  lg: "h-32 w-32 sm:h-40 sm:w-40 ring-4 ring-background text-4xl",
  sm: "h-10 w-10 sm:h-11 sm:w-11 text-sm",
};

/**
 * Circular avatar. Renders the photo at `src` when it exists and falls
 * back to styled initials until public/images/avatar.jpg is added.
 */
export function Avatar({ src, alt, initials, size = "lg" }: AvatarProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // The image may have already failed before hydration, in which case
  // onError never fires — detect that case on mount.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  const frame = `${sizeClasses[size]} shrink-0 rounded-full bg-surface overflow-hidden`;

  if (failed) {
    return (
      <div
        className={`${frame} flex items-center justify-center`}
        role="img"
        aria-label={alt}
      >
        <span className="font-mono font-semibold text-accent">{initials}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- local file with runtime fallback
    <img
      ref={ref}
      src={src}
      alt={alt}
      width={size === "lg" ? 160 : 44}
      height={size === "lg" ? 160 : 44}
      className={`${frame} object-cover`}
      onError={() => setFailed(true)}
    />
  );
}
