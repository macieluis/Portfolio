"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
}

/**
 * The observer root is extended far above the viewport, so "has entered
 * the viewport" and "has already been scrolled past" are both reported as
 * intersecting. Without that, an element moved from below the viewport to
 * above it — which is what a hash jump to a section does — never changes
 * its intersecting state, and would stay hidden forever.
 */
const REVEAL_ROOT_MARGIN = "100000px 0px -32px 0px";

/**
 * Fades content in with a subtle slide-up as it enters the viewport.
 *
 * Content is visible by default and only hidden client-side when it sits
 * below the fold at mount, so anything the visitor can already reach is
 * never hidden. Motion is disabled via `prefers-reduced-motion` in
 * globals.css, which also neutralizes the hidden state.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") return;

    // Already reachable — leave it visible, no animation needed.
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    element.classList.add("reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.classList.add("is-visible");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: REVEAL_ROOT_MARGIN },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
