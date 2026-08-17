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
    <main className="min-h-screen bg-[#dedfd8] text-[#202522]">
      <Sidebar />

      <div className="px-5 py-7 sm:px-8 lg:ml-[248px] lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[1120px]">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#59615c] transition hover:text-[#073f39]"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <section className="mt-6 overflow-hidden rounded-[18px] border border-[#c7cbc6] bg-[#f4f4f0]">
            <div className="flex flex-col gap-6 px-6 py-6 sm:px-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d8e4de] text-[#125c52]">
                  <BriefcaseBusiness
                    size={20}
                  />
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#58746b]">
                    Completed interview
                  </p>

                  <h1 className="mt-1 text-[27px] font-semibold tracking-[-0.03em] text-[#202522]">
                    {session.position}
                  </h1>

                  {session.company && (
                    <p className="mt-1 text-sm text-[#747b76]">
                      {session.company}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-[#d3d6d1] bg-[#e9ebe7] px-4 py-2 text-sm text-[#626963]">
                <Clock3 size={15} />
                {minutes} min
              </div>
            </div>
          </section>

          <section className="mt-5 overflow-hidden rounded-[18px] border border-[#c7cbc6] bg-[#f4f4f0]">
            <div className="flex items-center gap-3 border-b border-[#d8dad5] px-6 py-5 sm:px-8">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e5e7e2] text-[#5f6862]">
                <MessageSquare
                  size={17}
                />
              </div>

              <div>
                <h2 className="text-[18px] font-semibold text-[#202522]">
                  Interview transcript
                </h2>

                <p className="mt-1 text-xs text-[#7b827d]">
                  {turns.length} completed answers
                </p>
              </div>
            </div>

            <div>
              {turns.map((turn, index) => (
                <div
                  key={`${turn.question}-${index}`}
                  className="border-b border-[#d8dad5] px-6 py-6 last:border-b-0 sm:px-8"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f776f]">
                        Question {index + 1}
                      </p>

                      <p className="mt-2 max-w-3xl text-[16px] font-medium leading-7 text-[#252a27]">
                        {turn.question}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-[#dde8e3] px-3 py-1 text-xs font-semibold text-[#125c52]">
                      {turn.score}/100
                    </span>
                  </div>

                  <div className="mt-5 border-l-2 border-[#c4ccc7] pl-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#858b87]">
                      Your answer
                    </p>

                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#555c57]">
                      {turn.answer}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#397267]">
                        Strengths
                      </p>

                      <div className="mt-3 space-y-2">
                        {turn.strengths.map(
                          (item) => (
                            <p
                              key={item}
                              className="text-sm leading-5 text-[#5b625d]"
                            >
                              • {item}
                            </p>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8a6d3b]">
                        Improve
                      </p>

                      <div className="mt-3 space-y-2">
                        {turn.improvements.map(
                          (item) => (
                            <p
                              key={item}
                              className="text-sm leading-5 text-[#5f5a50]"
                            >
                              • {item}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-5">
            <FinalInterviewReport
              report={report}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
