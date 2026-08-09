import { GitCompareArrows } from "lucide-react";

import Sidebar from "@/src/components/dashboard/Sidebar";
import ResumeComparison from "@/src/components/dashboard/ResumeComparison";
import { getResumeComparisons } from "@/src/lib/resume/getResumeComparisons";

export default async function ComparePage() {
  const resumes = await getResumeComparisons();

  return (
    <main className="min-h-screen text-white">
      <Sidebar />

      <div className="px-5 py-6 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
              <GitCompareArrows size={23} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
                CV Comparison
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                See how your CV improved
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Compare two resume analyses and see exactly how your overall
                score and individual metrics changed.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <ResumeComparison resumes={resumes} />
          </div>
        </div>
      </div>
    </main>
  );
}
