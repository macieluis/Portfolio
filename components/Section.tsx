import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  /** Optional gray subtitle under the title. */
  subtitle?: string;
  children: ReactNode;
}

/** Section with a Twitter-style bold header row. */
export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} data-section aria-labelledby={`${id}-heading`}>
      <div className="border-b border-edge px-4 py-3">
        <h2
          id={`${id}-heading`}
          className="text-xl font-extrabold tracking-tight"
        >
          {title}
        </h2>
        {subtitle && <p className="text-[13px] text-muted">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
