interface TechBadgeProps {
  label: string;
}

export function TechBadge({ label }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-[13px] font-medium text-muted">
      {label}
    </span>
  );
}
