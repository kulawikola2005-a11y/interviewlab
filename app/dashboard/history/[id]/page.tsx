import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, FileText } from "lucide-react";

import Sidebar from "@/src/components/dashboard/Sidebar";
import ResumeAnalysisReport from "@/src/components/dashboard/ResumeAnalysisReport";
import { getResumeAnalysis } from "@/src/lib/resume/getResumeAnalysis";
import type { ResumeAnalysis } from "@/src/lib/openai/types/resume-analysis";

type HistoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function HistoryPage({
  params,
}: HistoryPageProps) {
  const { id } = await params;

  const savedAnalysis = await getResumeAnalysis(id);

  if (!savedAnalysis) {
    notFound();
  }

  const analysis: ResumeAnalysis = {
    overallScore: savedAnalysis.overall_score,

    metrics: savedAnalysis.metrics ?? {
      atsCompatibility: 0,
      skillsMatch: 0,
      experienceRelevance: 0,
      impact: 0,
      formatting: 0,
    },

    summary: savedAnalysis.summary,

    strengths: Array.isArray(savedAnalysis.strengths)
      ? savedAnalysis.strengths
      : [],

    weaknesses: Array.isArray(savedAnalysis.weaknesses)
      ? savedAnalysis.weaknesses
      : [],

    improvements: Array.isArray(savedAnalysis.improvements)
      ? savedAnalysis.improvements
      : [],

    interviewQuestions: Array.isArray(
      savedAnalysis.interview_questions
    )
      ? savedAnalysis.interview_questions
      : [],
  };

  return (
    <main className="min-h-screen text-white">
      <Sidebar />

      <div className="px-5 py-6 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to dashboard
          </Link>

          <div className="mt-8 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <FileText size={22} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                    Saved analysis
                  </p>

                  <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    {savedAnalysis.file_name}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays size={17} />

                {new Date(
                  savedAnalysis.created_at
                ).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            {savedAnalysis.job_description && (
              <div className="mt-6 border-t border-slate-800 pt-6">
                <p className="text-sm font-medium text-slate-300">
                  Job description used
                </p>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                  {savedAnalysis.job_description}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <ResumeAnalysisReport analysis={analysis} />
          </div>
        </div>
      </div>
    </main>
  );
}
