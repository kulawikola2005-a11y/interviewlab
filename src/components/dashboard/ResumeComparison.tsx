"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  ShieldCheck,
  Target,
  Type,
  Zap,
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
  icon: typeof ShieldCheck;
}[] = [
  {
    key: "atsCompatibility",
    label: "ATS compatibility",
    icon: ShieldCheck,
  },
  {
    key: "skillsMatch",
    label: "Skills match",
    icon: Target,
  },
  {
    key: "experienceRelevance",
    label: "Experience relevance",
    icon: BriefcaseBusiness,
  },
  {
    key: "impact",
    label: "Impact",
    icon: Zap,
  },
  {
    key: "formatting",
    label: "Formatting",
    icon: Type,
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
      <div className="border-t border-[#d4d6d1] py-12 text-center">
        <FileText
          size={32}
          className="mx-auto text-[#7d8580]"
        />

        <h2 className="mt-4 text-xl font-semibold text-[#202522]">
          Two analyses are required
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#737a75]">
          Analyze another version of your CV to compare how your score and
          individual metrics changed.
        </p>
      </div>
    );
  }

  if (!firstResume || !secondResume) {
    return null;
  }

  const firstMetrics =
    firstResume.metrics ?? emptyMetrics;

  const secondMetrics =
    secondResume.metrics ?? emptyMetrics;

  const overallDifference =
    secondResume.overall_score -
    firstResume.overall_score;

  return (
    <div>
      {/* VERSION SELECTORS */}
      <section className="grid gap-4 md:grid-cols-[1fr_72px_1fr] md:items-end">
        <ResumeSelect
          label="Previous version"
          value={firstId}
          onChange={setFirstId}
          resumes={resumes}
        />

        <div className="hidden items-center justify-center pb-1 md:flex">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e3e8e5] text-[#174f49]">
            <ArrowRight size={21} />
          </div>
        </div>

        <ResumeSelect
          label="New version"
          value={secondId}
          onChange={setSecondId}
          resumes={resumes}
        />
      </section>

      {/* OVERALL CHANGE */}
      <section className="mt-10 border-y border-[#d3d5d0] py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr_1.15fr] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#727a75]">
              Previous
            </p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-[58px] font-semibold leading-none tracking-[-0.055em] text-[#39413d]">
                {firstResume.overall_score}
              </span>

              <span className="mb-1 text-lg text-[#6f7772]">
                /100
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 lg:justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#cfd3cf] text-[#2f6b62]">
              <ArrowRight size={21} />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#17685d]">
                Current
              </p>

              <div className="mt-2 flex items-end gap-2">
                <span className="text-[58px] font-semibold leading-none tracking-[-0.055em] text-[#111816]">
                  {secondResume.overall_score}
                </span>

                <span className="mb-1 text-lg text-[#6f7772]">
                  /100
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#d7d9d5] pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div
              className={`flex items-center gap-4 ${
                overallDifference >= 0
                  ? "text-[#236451]"
                  : "text-[#b83030]"
              }`}
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
                  overallDifference >= 0
                    ? "bg-[#dcebe4]"
                    : "bg-[#f4dfdc]"
                }`}
              >
                {overallDifference >= 0 ? (
                  <ArrowRight
                    size={24}
                    className="-rotate-45"
                  />
                ) : (
                  <ArrowDown size={25} />
                )}
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[38px] font-semibold tracking-[-0.04em]">
                    {overallDifference > 0 ? "+" : ""}
                    {overallDifference}
                  </span>

                  <span className="text-sm font-semibold">
                    points
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-[#56605b]">
                  Change vs previous
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCORE BREAKDOWN */}
      <section className="pt-9">
        <div>
          <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#202522]">
            Score breakdown
          </h2>

          <p className="mt-1.5 text-sm text-[#717975]">
            See exactly which areas changed between the two analyses.
          </p>
        </div>

        <div className="mt-6 border-t border-[#d5d7d3]">
          {metricLabels.map((metric) => {
            const previous =
              firstMetrics[metric.key] ?? 0;

            const current =
              secondMetrics[metric.key] ?? 0;

            const difference =
              current - previous;

            const Icon = metric.icon;

            return (
              <div
                key={metric.key}
                className="grid gap-4 border-b border-[#d5d7d3] py-4 md:grid-cols-[260px_1fr_210px] md:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e4e8e5] text-[#17685d]">
                    <Icon size={17} />
                  </div>

                  <p className="text-sm font-semibold text-[#242b27]">
                    {metric.label}
                  </p>
                </div>

                <div className="relative h-2 overflow-hidden rounded-full bg-[#e0e2df]">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#b7d7d0]"
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, previous)
                      )}%`,
                    }}
                  />

                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#14766c]"
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, current)
                      )}%`,
                    }}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 text-sm">
                  <span className="text-[#66706b]">
                    {previous}
                  </span>

                  <ArrowRight
                    size={14}
                    className="text-[#9aa09c]"
                  />

                  <span className="font-semibold text-[#202522]">
                    {current}
                  </span>

                  <span
                    className={`min-w-[48px] rounded-full px-2.5 py-1 text-center text-xs font-semibold ${
                      difference >= 0
                        ? "bg-[#dcebe4] text-[#236451]"
                        : "bg-[#f3dfdd] text-[#b83030]"
                    }`}
                  >
                    {difference > 0 ? "+" : ""}
                    {difference}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-6 text-xs text-[#67706b]">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#14766c]" />
            Current version
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#b7d7d0]" />
            Previous version
          </div>
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
      <label className="mb-2 block text-sm font-medium text-[#4f5954]">
        {label}
      </label>

      <div className="relative">
        <FileText
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#397268]"
        />

        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="w-full appearance-none rounded-xl border border-[#c7cbc7] bg-[#f7f7f3] py-3 pl-11 pr-10 text-sm font-medium text-[#202522] outline-none transition focus:border-[#397e73]"
        >
          {resumes.map((resume) => (
            <option
              key={resume.id}
              value={resume.id}
            >
              {resume.file_name} ·{" "}
              {resume.overall_score}/100
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6f7873]">
          ↓
        </span>
      </div>
    </div>
  );
}
