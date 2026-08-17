"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  AlignLeft,
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Lightbulb,
  MessageSquare,
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
  const [showAllImprovements, setShowAllImprovements] =
    useState(false);

  const [showAllQuestions, setShowAllQuestions] =
    useState(false);

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
      label: "Experience",
      value: clampScore(safeMetrics.experienceRelevance),
      icon: Trophy,
    },
    {
      label: "Impact",
      value: clampScore(safeMetrics.impact),
      icon: Target,
    },
    {
      label: "Formatting",
      value: clampScore(safeMetrics.formatting),
      icon: AlignLeft,
    },
  ];

  const lowestMetrics = [...metrics]
    .sort((a, b) => a.value - b.value)
    .slice(0, 2);

  const topPriority = lowestMetrics[0];

  return (
    <div className="mt-7 space-y-5">
      {/* MAIN SCORE */}

      <section className="overflow-hidden rounded-[18px] border border-[#d5ddd7] bg-[#e5ece8]">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[180px_1fr] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#577068]">
              Overall score
            </p>

            <div className="mt-3 flex items-end gap-2">
              <span className="text-[64px] font-semibold leading-none tracking-[-0.06em] text-[#125c52]">
                {score}
              </span>

              <span className="mb-2 text-sm text-[#7a817c]">
                /100
              </span>
            </div>

            <div className="mt-4">
              <ScoreBadge score={score} />
            </div>
          </div>

          <div className="border-t border-[#ced8d2] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-sm font-semibold text-[#125c52]">
              Resume review
            </p>

            <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.03em] text-[#202522]">
              {getScoreLabel(score)}
            </h2>

            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#5f6863]">
              {analysis.summary}
            </p>
          </div>
        </div>
      </section>

      {/* METRICS */}

      <section className="rounded-[16px] border border-[#dedfd9] bg-[#f8f8f4] px-6 py-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#777e79]">
            Score breakdown
          </p>

          <h3 className="mt-2 text-[18px] font-semibold text-[#202522]">
            Where your resume stands
          </h3>
        </div>

        <div className="mt-6 divide-y divide-[#e0e2dd] border-y border-[#e0e2dd]">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const status = getMetricStatus(metric.value);

            return (
              <div
                key={metric.label}
                className="grid gap-3 py-4 sm:grid-cols-[220px_1fr_70px] sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e5ebe7] text-[#467068]">
                    <Icon size={15} />
                  </div>

                  <p className="text-sm font-medium text-[#343a36]">
                    {metric.label}
                  </p>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#e2e5e0]">
                  <div
                    className={status.barClassName}
                    style={{
                      width: `${metric.value}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between gap-2 sm:justify-end">
                  <span className="text-sm font-semibold tabular-nums text-[#202522]">
                    {metric.value}
                  </span>

                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRIORITY */}

      {topPriority && (
        <section className="rounded-[16px] border border-[#e1d8c5] bg-[#f1eadc] p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8dcc2] text-[#966c24]">
              <Target size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a6d3b]">
                Focus first
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h3 className="text-[19px] font-semibold text-[#302d27]">
                  {topPriority.label}
                </h3>

                <span className="rounded-full bg-[#e5d4af] px-2.5 py-1 text-xs font-semibold text-[#815c1d]">
                  {topPriority.value}/100
                </span>
              </div>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#6f675a]">
                {getPriorityAdvice(topPriority.label)}
              </p>

              {lowestMetrics[1] && (
                <p className="mt-4 text-xs text-[#8c8270]">
                  Next priority:{" "}
                  <span className="font-semibold">
                    {lowestMetrics[1].label}
                  </span>{" "}
                  · {lowestMetrics[1].value}/100
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* STRENGTHS / WEAKNESSES */}

      <div className="grid gap-5 xl:grid-cols-2">
        <ReportSection
          title="Strengths"
          description="What already works well."
          tone="positive"
          icon={<CheckCircle2 size={19} />}
          items={analysis.strengths}
        />

        <ReportSection
          title="Needs attention"
          description="What may reduce your chances."
          tone="warning"
          icon={<AlertTriangle size={19} />}
          items={analysis.weaknesses}
        />
      </div>

      {/* IMPROVEMENTS */}

      <section className="rounded-[16px] border border-[#dedfd9] bg-[#f8f8f4] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e7e6dc] text-[#696b55]">
            <Lightbulb size={19} />
          </div>

          <div>
            <h3 className="text-[18px] font-semibold text-[#202522]">
              Recommended improvements
            </h3>

            <p className="mt-1 text-sm text-[#777e79]">
              Practical changes for your next version.
            </p>
          </div>
        </div>

        <div className="mt-6 divide-y divide-[#e2e3de] border-y border-[#e2e3de]">
          {(showAllImprovements
            ? analysis.improvements
            : analysis.improvements.slice(0, 5)
          ).map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="grid grid-cols-[30px_1fr] gap-3 py-4"
            >
              <span className="pt-0.5 text-xs font-semibold tabular-nums text-[#8a908b]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="text-sm leading-6 text-[#4e5551]">
                {item}
              </p>
            </div>
          ))}
        </div>

        {analysis.improvements.length > 5 && (
          <button
            type="button"
            onClick={() =>
              setShowAllImprovements((current) => !current)
            }
            className="mt-5 text-sm font-semibold text-[#125c52]"
          >
            {showAllImprovements
              ? "Show fewer recommendations"
              : `Show all ${analysis.improvements.length} recommendations`}
          </button>
        )}
      </section>

      {/* QUESTIONS */}

      <section className="overflow-hidden rounded-[16px] border border-[#d9ddd7] bg-[#e7ece8]">
        <div className="flex items-start gap-4 px-6 py-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d3e3dc] text-[#125c52]">
            <MessageSquare size={19} />
          </div>

          <div>
            <h3 className="text-[18px] font-semibold text-[#202522]">
              Questions to practice
            </h3>

            <p className="mt-1 text-sm text-[#737972]">
              Questions a recruiter may ask based on this resume.
            </p>
          </div>
        </div>

        <div className="border-t border-[#d3dad5] bg-[#f7f8f4]">
          {(showAllQuestions
            ? analysis.interviewQuestions
            : analysis.interviewQuestions.slice(0, 5)
          ).map((question, index) => (
            <div
              key={`${question}-${index}`}
              className="grid grid-cols-[35px_1fr] gap-3 border-b border-[#e0e2dd] px-6 py-4 last:border-b-0"
            >
              <span className="text-xs font-semibold text-[#397268]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="text-sm leading-6 text-[#454c48]">
                {question}
              </p>
            </div>
          ))}
        </div>

        {analysis.interviewQuestions.length > 5 && (
          <div className="border-t border-[#d3dad5] px-6 py-4">
            <button
              type="button"
              onClick={() =>
                setShowAllQuestions((current) => !current)
              }
              className="text-sm font-semibold text-[#125c52]"
            >
              {showAllQuestions
                ? "Show fewer questions"
                : `Show all ${analysis.interviewQuestions.length} questions`}
            </button>
          </div>
        )}
      </section>

      {/* CTA */}

      <section className="flex flex-col gap-6 rounded-[18px] bg-[#125c52] px-7 py-7 text-white md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
            Next step
          </p>

          <h3 className="mt-2 text-[21px] font-semibold">
            Practice the questions that matter.
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-white/65">
            Start an interview using the context from this resume review.
          </p>
        </div>

        <Link
          href="/dashboard/interview/new?fromResume=true"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#f7f7f2] px-5 py-3 text-sm font-semibold text-[#125c52] transition hover:bg-white"
        >
          Start interview
          <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}

function clampScore(value: number) {
  return Math.max(
    0,
    Math.min(100, Math.round(value))
  );
}

function getMetricStatus(score: number) {
  if (score >= 80) {
    return {
      label: "Strong",
      className:
        "bg-[#d8eadf] text-[#286345]",
      barClassName:
        "h-full rounded-full bg-[#398163]",
    };
  }

  if (score >= 60) {
    return {
      label: "Good",
      className:
        "bg-[#dceae6] text-[#326b61]",
      barClassName:
        "h-full rounded-full bg-[#4b8b7e]",
    };
  }

  if (score >= 40) {
    return {
      label: "Needs work",
      className:
        "bg-[#f0dfbd] text-[#8b641f]",
      barClassName:
        "h-full rounded-full bg-[#c4933e]",
    };
  }

  return {
    label: "Critical",
    className:
      "bg-[#efd6d0] text-[#985243]",
    barClassName:
      "h-full rounded-full bg-[#b66757]",
  };
}

function getPriorityAdvice(metric: string) {
  const advice: Record<string, string> = {
    "ATS compatibility":
      "Use standard section headings, simple formatting and role-relevant keywords. Avoid layouts that may be difficult for applicant tracking systems to parse.",

    "Skills match":
      "Make the skills most relevant to the target role easier to find and support them with examples from projects, work, education or volunteering.",

    Experience:
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

function ScoreBadge({
  score,
}: {
  score: number;
}) {
  const status = getMetricStatus(score);

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}
    >
      {status.label}
    </span>
  );
}

function ReportSection({
  title,
  description,
  icon,
  items,
  tone,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
  tone: "positive" | "warning";
}) {
  const positive = tone === "positive";

  return (
    <section
      className={`rounded-[16px] border p-6 ${
        positive
          ? "border-[#d5ded8] bg-[#e8eee9]"
          : "border-[#e1d9cc] bg-[#eee9df]"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            positive
              ? "bg-[#d3e4dc] text-[#286b5c]"
              : "bg-[#e7dcc6] text-[#936d2e]"
          }`}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-[18px] font-semibold text-[#202522]">
            {title}
          </h3>

          <p className="mt-1 text-sm text-[#747a76]">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex gap-3"
          >
            <span
              className={`mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full ${
                positive
                  ? "bg-[#4d8d73]"
                  : "bg-[#bd8d3d]"
              }`}
            />

            <p className="text-sm leading-6 text-[#4f5652]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
