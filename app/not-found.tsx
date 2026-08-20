import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center sm:border-x sm:border-edge">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="text-2xl font-extrabold tracking-tight">Page not found</h1>
      <p className="text-[15px] text-muted">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full border border-edge-strong px-5 py-2 text-[15px] font-bold transition-colors hover:bg-foreground/10"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back home
      </Link>
    </main>
  );
}
