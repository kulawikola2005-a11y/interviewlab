import { GitCompareArrows } from "lucide-react";

import Sidebar from "@/src/components/dashboard/Sidebar";
import ResumeComparison from "@/src/components/dashboard/ResumeComparison";
import { getResumeComparisons } from "@/src/lib/resume/getResumeComparisons";

export default async function ComparePage() {
  const resumes = await getResumeComparisons();

  return (
    <main className="min-h-screen bg-[#f1f1ec] text-[#202522]">
      <Sidebar />

      <div className="px-5 py-7 sm:px-8 lg:ml-[248px] lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d7ddda] text-[#315c56]">
              <GitCompareArrows size={20} />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#56736c]">
                CV comparison
              </p>

              <h1 className="mt-2 text-[30px] font-semibold tracking-[-0.035em] text-[#202522]">
                See how your CV changed
              </h1>

              <p className="mt-3 max-w-2xl text-[15px] leading-6 text-[#6d7470]">
                Compare two resume analyses and see how the overall score and
                individual areas changed.
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
