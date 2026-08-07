import { CheckCircle2, Sparkles } from "lucide-react";

import Sidebar from "@/src/components/dashboard/Sidebar";
import ResumeUpload from "@/src/components/dashboard/ResumeUpload";

export default function CVAnalysisPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="ml-64 px-8 py-8">
        <div className="mx-auto max-w-6xl">
          <div>
            <p className="text-sm font-medium text-blue-400">
              CV Analysis
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Make your CV interview-ready
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Upload your resume and receive structured AI feedback on clarity,
              impact, relevance and potential interview questions.
            </p>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <ResumeUpload />

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Sparkles size={22} />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                What InterviewLab will analyze
              </h2>

              <div className="mt-6 space-y-4">
                {[
                  "Strengths and weaknesses",
                  "Missing or vague achievements",
                  "Role-specific relevance",
                  "Potential recruiter questions",
                  "Clarity and readability",
                  "Suggested improvements",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-emerald-400"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <p className="text-sm font-medium text-slate-300">
              Your analysis results will appear here
            </p>

            <p className="mt-2 text-sm text-slate-500">
              After we connect the AI engine, this section will display your CV
              score, detailed feedback and personalized recommendations.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
