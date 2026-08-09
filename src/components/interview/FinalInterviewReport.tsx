import {
  CheckCircle2,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

import type { FinalInterviewReport as Report } from "@/src/types/interview";

export default function FinalInterviewReport({
  report,
}: {
  report: Report;
}) {
  const metrics = [
    ["Communication", report.metrics.communication],
    ["Specificity", report.metrics.specificity],
    ["Structure", report.metrics.structure],
    ["Relevance", report.metrics.relevance],
    ["Confidence", report.metrics.confidence],
  ] as const;

  const recommendation = {
    strong_yes: {
      title: "Strong yes",
      text: "I would strongly consider moving you to the next stage.",
    },

    yes: {
      title: "Yes",
      text: "I would likely invite you to the next stage.",
    },

    maybe: {
      title: "Maybe",
      text: "The interview showed potential, but some concerns remain.",
    },

    no: {
      title: "Not yet",
      text: "I would probably not move forward based on this interview.",
    },
  }[report.hiringRecommendation];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-slate-900/80 to-violet-500/10 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
          Interview completed
        </p>

        <div className="mt-5 flex flex-col gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-6xl font-bold text-white">
              {Math.round(report.overallScore)}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              overall score / 100
            </p>
          </div>

          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white">
              Final interview report
            </h1>

            <p className="mt-3 leading-7 text-slate-300">
              {report.summary}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
        <h2 className="text-xl font-semibold text-white">
          Performance breakdown
        </h2>

        <div className="mt-7 space-y-5">
          {metrics.map(([label, value]) => (
            <div key={label}>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">
                  {label}
                </span>

                <span className="font-semibold text-white">
                  {Math.round(value)}
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(100, value)
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
          <div className="flex items-center gap-3">
            <Trophy className="text-emerald-400" size={20} />

            <h2 className="text-xl font-semibold text-white">
              Strongest areas
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            {report.strongestAreas.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />

                <p className="text-sm leading-6 text-slate-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-amber-400" size={20} />

            <h2 className="text-xl font-semibold text-white">
              Areas to improve
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            {report.areasToImprove.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <p className="text-sm leading-6 text-slate-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-violet-500/20 bg-violet-500/5 p-7">
        <div className="flex items-start gap-4">
          <Target
            size={22}
            className="mt-1 shrink-0 text-violet-400"
          />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
              Hiring recommendation
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              {recommendation.title}
            </h2>

            <p className="mt-2 text-slate-300">
              {recommendation.text}
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              {report.hiringReason}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
        <h2 className="text-xl font-semibold text-white">
          What to practice next
        </h2>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {report.nextSteps.map((item, index) => (
            <div
              key={item}
              className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4"
            >
              <span className="font-semibold text-blue-400">
                {index + 1}.
              </span>

              <p className="text-sm leading-6 text-slate-300">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
