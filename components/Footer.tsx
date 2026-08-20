import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-edge px-4 py-6">
      <div className="flex flex-col gap-1.5 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with Next.js, TypeScript & Tailwind CSS</p>
      </div>
    </footer>
  );
}
