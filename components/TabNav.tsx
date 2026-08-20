"use client";

import { useEffect, useState } from "react";

export interface TabItem {
  id: string;
  label: string;
}

interface TabNavProps {
  tabs: TabItem[];
}

/**
 * Twitter-profile style tab bar: evenly distributed tabs, the active one
 * bold with a rounded accent underline. Sticky, with scroll-spy.
 */
export function TabNav({ tabs }: TabNavProps) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  useEffect(() => {
    const sections = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A narrow band near the top of the viewport decides the active tab.
      { rootMargin: "-15% 0px -75% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    // The last section may be too short to ever reach the observer band —
    // force it active when the page is scrolled to the bottom.
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) setActive(tabs[tabs.length - 1].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [tabs]);

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-0 z-40 border-b border-edge bg-background/75 backdrop-blur-md"
    >
      {/* Tabs size to their label and scroll on narrow screens, then spread
          evenly once there is room — labels are never truncated. */}
      <ul className="flex items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <li key={tab.id} className="shrink-0 sm:min-w-0 sm:flex-1">
              <a
                href={`#${tab.id}`}
                aria-current={isActive ? "true" : undefined}
                className="relative flex h-[53px] items-center justify-center px-4 transition-colors hover:bg-foreground/10 sm:px-2"
              >
                <span
                  className={`whitespace-nowrap text-[15px] ${
                    isActive
                      ? "font-bold text-foreground"
                      : "font-medium text-muted"
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-accent"
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
