import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Target,
} from "lucide-react";

import type { ResumeAnalysis } from "@/src/lib/openai/types/resume-analysis";

type ResumeAnalysisReportProps = {
  analysis: ResumeAnalysis;
};

export default function ResumeAnalysisReport({
  analysis,
}: ResumeAnalysisReportProps) {
  const score = Math.max(0, Math.min(100, analysis.overallScore));

  function getScoreLabel() {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Strong";
    if (score >= 55) return "Good foundation";
    if (score >= 40) return "Needs improvement";
    return "Major improvements needed";
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
        <div className="grid gap-8 p-8 lg:grid-cols-[220px_1fr] lg:items-center">
          <div className="flex justify-center">
            <div
              className="relative flex h-44 w-44 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#3b82f6 ${score * 3.6}deg, #1e293b 0deg)`,
              }}
            >
              <div className="absolute inset-[10px] rounded-full bg-slate-950" />

              <div className="relative text-center">
                <p className="text-5xl font-bold text-white">
                  {score}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  out of 100
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-blue-400">
              <Sparkles size={18} />
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                AI Resume Analysis
              </p>
            </div>

            <h2 className="mt-4 text-3xl font-bold text-white">
              {getScoreLabel()}
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              {analysis.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm text-slate-300">
                {analysis.strengths.length} strengths
              </div>

              <div className="rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm text-slate-300">
                {analysis.improvements.length} recommendations
              </div>

              <div className="rounded-full border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm text-slate-300">
                {analysis.interviewQuestions.length} interview questions
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <ReportSection
          title="Strengths"
          description="What already works well in your CV."
          icon={<CheckCircle2 size={20} />}
          items={analysis.strengths}
        />

        <ReportSection
          title="Weaknesses"
          description="Areas that may reduce your chances with recruiters."
          icon={<AlertTriangle size={20} />}
          items={analysis.weaknesses}
        />
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Lightbulb size={21} />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">
              Recommended improvements
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Practical changes that could strengthen your next CV version.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {analysis.improvements.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
            >
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-xs font-bold text-amber-400">
                  {index + 1}
                </div>

                <p className="text-sm leading-6 text-slate-300">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <MessageSquare size={21} />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">
              Potential interview questions
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Questions a recruiter may ask based on this CV.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {analysis.interviewQuestions.map((question, index) => (
            <div
              key={`${question}-${index}`}
              className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
            >
              <span className="font-semibold text-blue-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="text-sm leading-6 text-slate-300">
                {question}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-blue-500/20 bg-blue-500/5 p-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Target size={22} />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">
                Ready to practice?
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Continue with a mock interview and practice questions based on
                your resume analysis.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/interview/room"
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Start mock interview
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ReportSection({
  title,
  description,
  icon,
  items,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
          >
            <p className="text-sm leading-6 text-slate-300">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
