import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Clock3,
  MessageSquare,
} from "lucide-react";

import Sidebar from "@/src/components/dashboard/Sidebar";
import FinalInterviewReport from "@/src/components/interview/FinalInterviewReport";

import { getInterviewSession } from "@/src/lib/interview/getInterviewSession";

import type {
  FinalInterviewReport as FinalReport,
  InterviewTurn,
} from "@/src/types/interview";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InterviewHistoryPage({
  params,
}: PageProps) {
  const { id } = await params;

  const session =
    await getInterviewSession(id);

  if (!session) {
    notFound();
  }

  const turns = Array.isArray(session.turns)
    ? (session.turns as InterviewTurn[])
    : [];

  const report: FinalReport = {
    overallScore:
      session.overall_score ?? 0,

    metrics: session.metrics ?? {
      communication: 0,
      specificity: 0,
      structure: 0,
      relevance: 0,
      confidence: 0,
    },

    summary: session.summary ?? "",

    strongestAreas: Array.isArray(
      session.strongest_areas
    )
      ? session.strongest_areas
      : [],

    areasToImprove: Array.isArray(
      session.areas_to_improve
    )
      ? session.areas_to_improve
      : [],

    hiringRecommendation:
      session.hiring_recommendation ??
      "maybe",

    hiringReason:
      session.hiring_reason ?? "",

    nextSteps: Array.isArray(
      session.next_steps
    )
      ? session.next_steps
      : [],
  };

  const minutes = Math.max(
    1,
    Math.round(
      session.duration_seconds / 60
    )
  );

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

          <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <BriefcaseBusiness
                    size={22}
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                    Completed interview
                  </p>

                  <h1 className="mt-2 text-3xl font-bold">
                    {session.position}
                  </h1>

                  {session.company && (
                    <p className="mt-1 text-slate-400">
                      {session.company}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock3 size={17} />
                {minutes} min
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
            <div className="flex items-center gap-3">
              <MessageSquare
                size={20}
                className="text-violet-400"
              />

              <div>
                <h2 className="text-xl font-semibold">
                  Interview transcript
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {turns.length} completed answers
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-6">
              {turns.map((turn, index) => (
                <div
                  key={`${turn.question}-${index}`}
                  className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6"
                >
                  <div className="flex items-start justify-between gap-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
                      Question {index + 1}
                    </p>

                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                      {turn.score}/100
                    </span>
                  </div>

                  <p className="mt-3 font-medium leading-7 text-white">
                    {turn.question}
                  </p>

                  <div className="mt-5 border-l-2 border-slate-700 pl-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Your answer
                    </p>

                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                      {turn.answer}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-400">
                        Strengths
                      </p>

                      {turn.strengths.map(
                        (item) => (
                          <p
                            key={item}
                            className="mt-2 text-sm leading-5 text-slate-400"
                          >
                            • {item}
                          </p>
                        )
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-400">
                        Improve
                      </p>

                      {turn.improvements.map(
                        (item) => (
                          <p
                            key={item}
                            className="mt-2 text-sm leading-5 text-slate-400"
                          >
                            • {item}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-6">
            <FinalInterviewReport
              report={report}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
