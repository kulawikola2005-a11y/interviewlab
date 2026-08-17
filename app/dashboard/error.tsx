"use client";

import {
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

export default function DashboardError({
  reset,
}: {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-red-500/20 bg-slate-900/70 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
          <AlertTriangle size={25} />
        </div>

        <h1 className="mt-6 text-2xl font-bold">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          InterviewLab could not load this part of your dashboard.
          Your saved data has not been removed.
        </p>

        <button
          type="button"
          onClick={reset}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
        >
          <RefreshCw size={17} />
          Try again
        </button>
      </div>
    </main>
  );
}
