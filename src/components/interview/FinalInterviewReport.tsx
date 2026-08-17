import {
  ArrowUpRight,
  Check,
  Target,
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

  const overallScore = Math.round(report.overallScore);

  return (
    <div className="overflow-hidden rounded-[18px] border border-[#D8D0C3] bg-[#F5F1E8] text-[#292723]">
      {/* HEADER */}

      <header className="px-6 pb-8 pt-7 sm:px-9 sm:pb-10 sm:pt-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B5A52]">
              Interview completed
            </p>

            <h1 className="mt-2 text-[30px] font-semibold tracking-[-0.04em] text-[#292723]">
              Your interview report
            </h1>
          </div>

          <div className="rounded-full border border-[#D6D0C5] bg-[#EBE5DA] px-4 py-2 text-xs font-medium text-[#616862]">
            10 questions completed
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[210px_1fr] lg:items-end">
          <div>
            <div className="flex items-end gap-2">
              <span className="text-[76px] font-semibold leading-[0.85] tracking-[-0.075em] text-[#073f39]">
                {overallScore}
              </span>

              <span className="mb-1 text-sm text-[#898177]">
                / 100
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-[#625E57]">
              Overall performance
            </p>
          </div>

          <p className="max-w-3xl border-t border-[#DED7CB] pt-6 text-[15px] leading-7 text-[#68635B] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {report.summary}
          </p>
        </div>
      </header>

      {/* METRICS */}

      <section className="border-t border-[#DED7CB] px-6 py-8 sm:px-9">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#898177]">
              Performance
            </p>

            <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.02em]">
              Score breakdown
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#898177]">
              How your answers performed across the main interview skills.
            </p>
          </div>

          <div className="border-t border-[#DED7CB]">
            {metrics.map(([label, value]) => {
              const score = Math.max(
                0,
                Math.min(100, Math.round(value))
              );

              return (
                <div
                  key={label}
                  className="grid gap-3 border-b border-[#DED7CB] py-4 sm:grid-cols-[145px_1fr_45px] sm:items-center"
                >
                  <span className="text-sm font-medium text-[#48443F]">
                    {label}
                  </span>

                  <div className="h-[5px] overflow-hidden rounded-full bg-[#DDD7CC]">
                    <div
                      className="h-full rounded-full bg-[#0B5A52]"
                      style={{
                        width: `${score}%`,
                      }}
                    />
                  </div>

                  <span className="text-right text-sm font-semibold tabular-nums">
                    {score}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STRENGTHS / IMPROVEMENTS */}

      <section className="border-t border-[#DED7CB] px-6 py-8 sm:px-9">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-0">
          <div className="lg:pr-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#0B5A52]">
                  Strongest areas
                </p>

                <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.02em]">
                  What worked
                </h2>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E0D5] text-[#0B5A52]">
                <Check size={17} strokeWidth={2.4} />
              </div>
            </div>

            <div className="mt-6 border-t border-[#DED7CB]">
              {report.strongestAreas.map((item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-[26px_1fr] gap-3 border-b border-[#DED7CB] py-4"
                >
                  <span className="pt-0.5 text-[11px] font-semibold text-[#91897E]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm leading-6 text-[#5B5650]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#DED7CB] pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#8b7041]">
                  Development
                </p>

                <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.02em]">
                  What to improve
                </h2>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8DDC9] text-[#8b682c]">
                <ArrowUpRight size={17} />
              </div>
            </div>

            <div className="mt-6 border-t border-[#DED7CB]">
              {report.areasToImprove.map((item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-[26px_1fr] gap-3 border-b border-[#DED7CB] py-4"
                >
                  <span className="pt-0.5 text-[11px] font-semibold text-[#9b8359]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm leading-6 text-[#5B5650]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECOMMENDATION */}

      <section className="border-t border-[#DED7CB] px-6 py-8 sm:px-9">
        <div className="overflow-hidden rounded-[14px] bg-[#073f39] text-white">
          <div className="grid gap-6 px-6 py-6 sm:px-7 md:grid-cols-[48px_1fr_auto] md:items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
              <Target size={19} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
                Hiring recommendation
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h2 className="text-[23px] font-semibold tracking-[-0.025em]">
                  {recommendation.title}
                </h2>

                <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />

                <p className="text-sm text-white/70">
                  {recommendation.text}
                </p>
              </div>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/55">
                {report.hiringReason}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}

      <section className="border-t border-[#DED7CB] px-6 py-8 sm:px-9 sm:pb-10">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#898177]">
              Next steps
            </p>

            <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.02em]">
              What to practice next
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#898177]">
              Focus on these before your next interview.
            </p>
          </div>

          <div className="border-t border-[#DED7CB]">
            {report.nextSteps.map((item, index) => (
              <div
                key={item}
                className="grid grid-cols-[38px_1fr] gap-3 border-b border-[#DED7CB] py-4"
              >
                <span className="text-xs font-semibold tabular-nums text-[#0B5A52]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="text-sm leading-6 text-[#5B5650]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
