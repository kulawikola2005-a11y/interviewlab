import Link from "next/link";
import {
  ArrowLeft,
  SearchX,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 text-white">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 text-slate-400">
          <SearchX size={28} />
        </div>

        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
          404
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Page not found
        </h1>

        <p className="mt-4 leading-7 text-slate-400">
          The page you&apos;re looking for does not exist or may have been moved.
        </p>

        <Link
          href="/dashboard"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
        >
          <ArrowLeft size={17} />
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
