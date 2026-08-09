"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  FileSearch,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import type { ResumeAnalysis } from "@/src/lib/openai/types/resume-analysis";

type ResumeAnalysisReportProps = {
  analysis: ResumeAnalysis;
};

export default function ResumeAnalysisReport({
  analysis,
}: ResumeAnalysisReportProps) {
  const [showAllImprovements, setShowAllImprovements] = useState(false);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const score = clampScore(analysis.overallScore);

  useEffect(() => {
    window.sessionStorage.setItem(
      "interviewlab-resume-context",
      JSON.stringify({
        overallScore: analysis.overallScore,
        summary: analysis.summary,
        metrics: analysis.metrics,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        improvements: analysis.improvements,
        interviewQuestions: analysis.interviewQuestions,
      })
    );
  }, [analysis]);

  const safeMetrics = analysis.metrics ?? {
    atsCompatibility: 0,
    skillsMatch: 0,
    experienceRelevance: 0,
    impact: 0,
    formatting: 0,
  };

  const metrics = [
    {
      label: "ATS compatibility",
      value: clampScore(safeMetrics.atsCompatibility),
      icon: FileSearch,
    },
    {
      label: "Skills match",
      value: clampScore(safeMetrics.skillsMatch),
      icon: Target,
    },
    {
      label: "Experience relevance",
      value: clampScore(safeMetrics.experienceRelevance),
      icon: Trophy,
    },
    {
      label: "Impact",
      value: clampScore(safeMetrics.impact),
      icon: Sparkles,
    },
    {
      label: "Formatting",
      value: clampScore(safeMetrics.formatting),
      icon: Bot,
    },
  ];

  const lowestMetrics = [...metrics]
    .sort((a, b) => a.value - b.value)
    .slice(0, 2);

  const topPriority = lowestMetrics[0];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
        <div className="grid gap-5 sm:p-5 sm:p-7 lg:p-8 p-5 sm:p-5 sm:p-7 lg:p-8 lg:grid-cols-[220px_1fr] lg:items-center">
          <div className="flex justify-center">
            <div
              className="relative flex h-44 w-44 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#3b82f6 ${score * 3.6}deg, #1e293b 0deg)`,
              }}
            >
              <div className="absolute inset-[10px] rounded-full bg-slate-950" />

              <div className="relative text-center">
                <p className="text-4xl sm:text-5xl font-bold text-white">
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

            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
              {getScoreLabel(score)}
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              {analysis.summary}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
            Score breakdown
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Resume performance
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            A closer look at the areas that contribute to your overall score.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.label}
                className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <Icon size={18} />
                  </div>

                  <span className="text-xl font-bold text-white">
                    {metric.value}
                  </span>
                </div>

                <p className="mt-4 text-sm font-medium text-slate-300">
                  {metric.label}
                </p>

                <div className="mt-2">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getMetricStatus(metric.value).className}`}
                  >
                    {getMetricStatus(metric.value).label}
                  </span>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getMetricStatus(metric.value).barClassName}`}
                    style={{
                      width: `${metric.value}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {topPriority && (
        <section className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <Target size={21} />
            </div>

            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
                Top priority
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-white">
                  {topPriority.label}
                </h3>

                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-300">
                  {topPriority.value}/100
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                This is currently the lowest-scoring part of your resume.
                Improving it is likely to have the biggest impact on your next
                analysis.
              </p>

              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Recommended next action
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {getPriorityAdvice(topPriority.label)}
                </p>
              </div>

              {lowestMetrics[1] && (
                <p className="mt-4 text-xs text-slate-500">
                  Secondary priority:{" "}
                  <span className="font-medium text-slate-300">
                    {lowestMetrics[1].label}
                  </span>{" "}
                  ({lowestMetrics[1].value}/100)
                </p>
              )}
            </div>
          </div>
        </section>
      )}

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

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7">
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
          {(showAllImprovements
            ? analysis.improvements
            : analysis.improvements.slice(0, 5)
          ).map((item, index) => (
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

        {analysis.improvements.length > 5 && (
          <button
            type="button"
            onClick={() => setShowAllImprovements((current) => !current)}
            className="mt-5 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
          >
            {showAllImprovements
              ? "Show fewer recommendations"
              : `Show all ${analysis.improvements.length} recommendations`}
          </button>
        )}
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7">
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
          {(showAllQuestions
            ? analysis.interviewQuestions
            : analysis.interviewQuestions.slice(0, 5)
          ).map((question, index) => (
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

        {analysis.interviewQuestions.length > 5 && (
          <button
            type="button"
            onClick={() => setShowAllQuestions((current) => !current)}
            className="mt-5 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
          >
            {showAllQuestions
              ? "Show fewer questions"
              : `Show all ${analysis.interviewQuestions.length} questions`}
          </button>
        )}
      </section>

      <section className="rounded-3xl border border-blue-500/20 bg-blue-500/5 p-5 sm:p-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Ready to practice?
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Turn these recommendations into practice with a personalized mock
              interview.
            </p>
          </div>

          <Link
            href="/dashboard/interview/new?fromResume=true"
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

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getMetricStatus(score: number) {
  if (score >= 80) {
    return {
      label: "Strong",
      className: "bg-emerald-500/10 text-emerald-400",
      barClassName: "bg-emerald-500",
    };
  }

  if (score >= 60) {
    return {
      label: "Good",
      className: "bg-blue-500/10 text-blue-400",
      barClassName: "bg-blue-500",
    };
  }

  if (score >= 40) {
    return {
      label: "Needs work",
      className: "bg-amber-500/10 text-amber-400",
      barClassName: "bg-amber-500",
    };
  }

  return {
    label: "Critical",
    className: "bg-red-500/10 text-red-400",
    barClassName: "bg-red-500",
  };
}

function getPriorityAdvice(metric: string) {
  const advice: Record<string, string> = {
    "ATS compatibility":
      "Use standard section headings, simple formatting and role-relevant keywords. Avoid layouts that may be difficult for applicant tracking systems to parse.",

    "Skills match":
      "Make the skills most relevant to the target role easier to find and support them with examples from projects, work, education or volunteering.",

    "Experience relevance":
      "Reframe your existing experience around responsibilities that transfer to the target position. Include relevant volunteering, projects, internships and informal experience.",

    Impact:
      "Replace generic responsibilities with outcomes. Add specific achievements, numbers, improvements, responsibilities or examples that show what changed because of your work.",

    Formatting:
      "Improve hierarchy and consistency. Use clear sections, concise bullet points, consistent spacing and a professional structure that recruiters can scan quickly.",
  };

  return (
    advice[metric] ??
    "Focus on adding clearer evidence and more role-specific information to strengthen this part of your resume."
  );
}

function getScoreLabel(score: number) {
  if (score >= 85) return "Excellent resume";
  if (score >= 70) return "Strong resume";
  if (score >= 55) return "Good foundation";
  if (score >= 40) return "Needs improvement";

  return "Major improvements needed";
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
    <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-7">
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
