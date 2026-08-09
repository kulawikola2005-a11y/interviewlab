"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  FileText,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type Metrics = {
  atsCompatibility: number;
  skillsMatch: number;
  experienceRelevance: number;
  impact: number;
  formatting: number;
};

type Resume = {
  id: string;
  file_name: string;
  overall_score: number;
  metrics: Metrics | null;
  created_at: string;
};

const emptyMetrics: Metrics = {
  atsCompatibility: 0,
  skillsMatch: 0,
  experienceRelevance: 0,
  impact: 0,
  formatting: 0,
};

const metricLabels: {
  key: keyof Metrics;
  label: string;
}[] = [
  {
    key: "atsCompatibility",
    label: "ATS compatibility",
  },
  {
    key: "skillsMatch",
    label: "Skills match",
  },
  {
    key: "experienceRelevance",
    label: "Experience relevance",
  },
  {
    key: "impact",
    label: "Impact",
  },
  {
    key: "formatting",
    label: "Formatting",
  },
];

export default function ResumeComparison({
  resumes,
}: {
  resumes: Resume[];
}) {
  const [firstId, setFirstId] = useState(
    resumes[1]?.id ?? resumes[0]?.id ?? ""
  );

  const [secondId, setSecondId] = useState(
    resumes[0]?.id ?? ""
  );

  const firstResume = useMemo(
    () => resumes.find((resume) => resume.id === firstId),
    [firstId, resumes]
  );

  const secondResume = useMemo(
    () => resumes.find((resume) => resume.id === secondId),
    [secondId, resumes]
  );

  if (resumes.length < 2) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center">
        <FileText
          size={34}
          className="mx-auto text-slate-600"
        />

        <h2 className="mt-5 text-xl font-semibold text-white">
          Two analyses are required
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          Analyze another version of your CV to compare how your score and
          individual metrics have changed.
        </p>
      </div>
    );
  }

  if (!firstResume || !secondResume) {
    return null;
  }

  const firstMetrics = firstResume.metrics ?? emptyMetrics;
  const secondMetrics = secondResume.metrics ?? emptyMetrics;

  const overallDifference =
    secondResume.overall_score - firstResume.overall_score;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
        <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-end">
          <ResumeSelect
            label="Previous version"
            value={firstId}
            onChange={setFirstId}
            resumes={resumes}
          />

          <div className="hidden pb-3 text-slate-600 md:block">
            <ArrowRight size={22} />
          </div>

          <ResumeSelect
            label="New version"
            value={secondId}
            onChange={setSecondId}
            resumes={resumes}
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
          Overall improvement
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-5">
          <div>
            <p className="text-sm text-slate-500">
              Previous
            </p>

            <p className="mt-1 text-4xl font-bold text-slate-400">
              {firstResume.overall_score}
            </p>
          </div>

          <ArrowRight
            size={26}
            className="text-slate-600"
          />

          <div>
            <p className="text-sm text-slate-500">
              Current
            </p>

            <p className="mt-1 text-5xl font-bold text-white">
              {secondResume.overall_score}
            </p>
          </div>

          <div
            className={`ml-auto flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              overallDifference >= 0
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {overallDifference >= 0 ? (
              <TrendingUp size={17} />
            ) : (
              <TrendingDown size={17} />
            )}

            {overallDifference > 0 ? "+" : ""}
            {overallDifference} points
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
        <h2 className="text-xl font-semibold text-white">
          Score breakdown
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          See exactly which areas improved between the two analyses.
        </p>

        <div className="mt-7 space-y-6">
          {metricLabels.map((metric) => {
            const previous = firstMetrics[metric.key] ?? 0;
            const current = secondMetrics[metric.key] ?? 0;
            const difference = current - previous;

            return (
              <div key={metric.key}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-300">
                    {metric.label}
                  </p>

                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-500">
                      {previous}
                    </span>

                    <ArrowRight
                      size={14}
                      className="text-slate-700"
                    />

                    <span className="font-semibold text-white">
                      {current}
                    </span>

                    <span
                      className={
                        difference >= 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }
                    >
                      {difference > 0 ? "+" : ""}
                      {difference}
                    </span>
                  </div>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-500"
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, current)
                      )}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ResumeSelect({
  label,
  value,
  onChange,
  resumes,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  resumes: Resume[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-400">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500"
      >
        {resumes.map((resume) => (
          <option
            key={resume.id}
            value={resume.id}
          >
            {resume.file_name} · {resume.overall_score}/100
          </option>
        ))}
      </select>
    </div>
  );
}
