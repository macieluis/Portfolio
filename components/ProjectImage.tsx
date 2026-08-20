"use client";

import { useEffect, useRef, useState } from "react";
import { Code2 } from "lucide-react";

interface ProjectImageProps {
  src?: string;
  alt: string;
  /** Shown inside the fallback tile until a screenshot exists. */
  label: string;
}

/**
 * Project screenshot with a styled fallback, so cards look intentional
 * before real screenshots are added to public/images/projects/.
 */
export function ProjectImage({ src, alt, label }: ProjectImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // The image may have already failed before hydration, in which case
  // onError never fires — detect that case on mount.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={`${label} — screenshot placeholder`}
        className="relative flex h-full w-full items-center justify-center overflow-hidden bg-surface"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(rgba(244, 244, 245, 0.06) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative flex flex-col items-center gap-2 text-faint">
          <Code2 className="h-6 w-6" aria-hidden />
          <span className="font-mono text-xs">{label}</span>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- local file with runtime fallback
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}
