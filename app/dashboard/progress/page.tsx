import {
  BarChart3,
  MessageSquare,
  Target,
  TrendingUp,
} from "lucide-react";

import Sidebar from "@/src/components/dashboard/Sidebar";
import StatCard from "@/src/components/dashboard/StatCard";
import InterviewProgressChart from "@/src/components/dashboard/InterviewProgressChart";

import { getInterviewProgress } from "@/src/lib/interview/getInterviewProgress";

type Metrics = {
  communication?: number;
  specificity?: number;
  structure?: number;
  relevance?: number;
  confidence?: number;
};

export default async function ProgressPage() {
  const interviews = await getInterviewProgress();

  const scoredInterviews = interviews.filter(
    (interview) =>
      typeof interview.overall_score === "number"
  );

  const scores = scoredInterviews.map(
    (interview) => interview.overall_score as number
  );

  const average =
    scores.length > 0
      ? Math.round(
          scores.reduce(
            (sum, score) => sum + score,
            0
          ) / scores.length
        )
      : 0;

  const latest =
    scores.length > 0
      ? scores[scores.length - 1]
      : 0;

  const first =
    scores.length > 0
      ? scores[0]
      : 0;

  const improvement =
    scores.length > 1
      ? latest - first
      : 0;

  const metricTotals = {
    communication: 0,
    specificity: 0,
    structure: 0,
    relevance: 0,
    confidence: 0,
  };

  let metricCount = 0;

  for (const interview of scoredInterviews) {
    const metrics = interview.metrics as Metrics | null;

    if (!metrics) continue;

    metricTotals.communication +=
      metrics.communication ?? 0;

    metricTotals.specificity +=
      metrics.specificity ?? 0;

    metricTotals.structure +=
      metrics.structure ?? 0;

    metricTotals.relevance +=
      metrics.relevance ?? 0;

    metricTotals.confidence +=
      metrics.confidence ?? 0;

    metricCount += 1;
  }

  const metricAverages = {
    communication:
      metricCount > 0
        ? Math.round(
            metricTotals.communication / metricCount
          )
        : 0,

    specificity:
      metricCount > 0
        ? Math.round(
            metricTotals.specificity / metricCount
          )
        : 0,

    structure:
      metricCount > 0
        ? Math.round(
            metricTotals.structure / metricCount
          )
        : 0,

    relevance:
      metricCount > 0
        ? Math.round(
            metricTotals.relevance / metricCount
          )
        : 0,

    confidence:
      metricCount > 0
        ? Math.round(
            metricTotals.confidence / metricCount
          )
        : 0,
  };

  const chartData = scoredInterviews.map(
    (interview, index) => ({
      label: `#${index + 1}`,
      score: interview.overall_score as number,
    })
  );

  const metrics = [
    ["Communication", metricAverages.communication],
    ["Specificity", metricAverages.specificity],
    ["Structure", metricAverages.structure],
    ["Relevance", metricAverages.relevance],
    ["Confidence", metricAverages.confidence],
  ] as const;

  const weakestMetric = [...metrics].sort(
    (a, b) => a[1] - b[1]
  )[0];

  return (
    <main className="min-h-screen text-white">
      <Sidebar />

      <div className="px-5 py-6 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#dfeae6] text-[#17685d]">
              <BarChart3 size={23} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#17685d]">
                Progress
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#202522] sm:text-4xl">
                Interview performance
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#667176] sm:text-base">
                Track how your interview skills change across practice sessions.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Interviews"
              value={String(scoredInterviews.length)}
              change="Completed sessions"
              icon={MessageSquare}
            />

            <StatCard
              title="Average score"
              value={`${average}%`}
              change="Across all interviews"
              icon={Target}
            />

            <StatCard
              title="Latest score"
              value={`${latest}%`}
              change="Most recent session"
              icon={TrendingUp}
            />

            <StatCard
              title="Improvement"
              value={`${improvement > 0 ? "+" : ""}${improvement}%`}
              change="First session vs latest"
              icon={BarChart3}
            />
          </div>

          <section className="mt-8 rounded-3xl border border-[#c6cdca] bg-[#edf1ef] p-7">
            <div>
              <h2 className="text-xl font-semibold text-[#202522]">
                Overall score trend
              </h2>

              <p className="mt-1 text-sm text-[#7a858a]">
                Your interview score across completed sessions.
              </p>
            </div>

            <div className="mt-7">
              <InterviewProgressChart
                data={chartData}
              />
            </div>
          </section>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <section className="rounded-3xl border border-[#c2cbc7] bg-[#e1e8e5] p-7">
              <h2 className="text-xl font-semibold">
                Skill breakdown
              </h2>

              <p className="mt-1 text-sm text-[#7a858a]">
                Average performance across your completed interviews.
              </p>

              <div className="mt-7 space-y-6">
                {metrics.map(([label, value]) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#3f494d]">
                        {label}
                      </span>

                      <span className="font-semibold text-white">
                        {value}
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#cfd6d3]">
                      <div
                        className="h-full rounded-full bg-[#17685d]"
                        style={{
                          width: `${value}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-3xl border border-[#9eb4ad] bg-[#bed3cc] p-7">
              <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-[#17685d]/5" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#17685d]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#3e625c]">
                    Priority for next session
                  </p>
                </div>

                {scoredInterviews.length > 0 ? (
                  <>
                    <div className="mt-5 flex items-end justify-between gap-5">
                      <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#202522]">
                        {weakestMetric[0]}
                      </h2>

                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-semibold tracking-[-0.04em] text-[#17685d]">
                          {weakestMetric[1]}
                        </span>

                        <span className="text-sm font-medium text-[#6d7773]">
                          /100
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#a6bbb5]">
                      <div
                        className="h-full rounded-full bg-[#17685d]"
                        style={{
                          width: `${Math.max(
                            0,
                            Math.min(100, weakestMetric[1])
                          )}%`,
                        }}
                      />
                    </div>

                    <p className="mt-5 max-w-lg text-sm leading-6 text-[#49605b]">
                      Your lowest average skill right now. Give it extra
                      attention in your next practice interview.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="mt-5 text-xl font-semibold text-[#202522]">
                      Complete your first interview
                    </h2>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-[#49605b]">
                      Once you complete a session, InterviewLab will show you
                      which interview skill deserves the most attention.
                    </p>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
