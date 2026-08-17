import {
  CheckCircle2,
  FileText,
  ShieldCheck,
} from "lucide-react";

import Sidebar from "@/src/components/dashboard/Sidebar";
import ResumeUpload from "@/src/components/dashboard/ResumeUpload";

const reviewItems = [
  "Strengths and weaknesses",
  "Role-specific relevance",
  "Missing or vague achievements",
  "Clarity and readability",
  "Potential interview questions",
  "Practical improvements",
];

export default function CVAnalysisPage() {
  return (
    <main className="min-h-screen bg-[#f1f1ec]">
      <Sidebar />

      <div className="px-5 py-7 sm:px-8 lg:ml-[248px] lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[1180px]">
          <header className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#397268]">
              Resume
            </p>

            <h1 className="mt-2 text-[30px] font-semibold tracking-[-0.035em] text-[#202522]">
              Review your resume
            </h1>

            <p className="mt-2 text-[15px] leading-6 text-[#737972]">
              Upload your CV and get a structured review focused on the things
              recruiters are most likely to notice.
            </p>
          </header>

          <section className="mt-7 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
            <ResumeUpload />

            <aside className="overflow-hidden rounded-[16px] border border-[#d7ddd7] bg-[#e7ece8]">
              <div className="border-b border-[#d4dad5] px-6 py-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d3e3dc] text-[#125c52]">
                  <FileText size={19} />
                </div>

                <h2 className="mt-4 text-[17px] font-semibold text-[#202522]">
                  What we look at
                </h2>

                <p className="mt-1.5 text-sm leading-6 text-[#737972]">
                  Your review is based on content, relevance and how clearly
                  your experience is presented.
                </p>
              </div>

              <div className="px-6 py-5">
                <div className="space-y-4">
                  {reviewItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-[#388273]"
                      />

                      <span className="text-sm leading-5 text-[#505752]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-[#d4dad5] pt-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={17}
                      className="mt-0.5 shrink-0 text-[#67746e]"
                    />

                    <p className="text-xs leading-5 text-[#747b76]">
                      Your previous reviews remain available in your account so
                      you can compare changes over time.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
}
