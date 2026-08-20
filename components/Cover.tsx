"use client";

import { useEffect, useRef, useState } from "react";

interface CoverProps {
  src: string;
}

/**
 * Header banner. Shows public/images/cover.jpg when present; until then
 * a clean pastel band (--cover in globals.css), like a Twitter profile
 * that hasn't lost its charm.
 */
export function Cover({ src }: CoverProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // The image may have already failed before hydration, in which case
  // onError never fires — detect that case on mount.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div
      className="relative h-36 overflow-hidden sm:h-48"
      style={{ background: "var(--cover)" }}
    >
      {src && !failed && (
        // eslint-disable-next-line @next/next/no-img-element -- local file with runtime fallback
        <img
          ref={ref}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
