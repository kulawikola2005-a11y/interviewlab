"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  MessageSquare,
  Send,
  Sparkles,
  Target,
} from "lucide-react";

import { evaluateAnswer } from "@/app/dashboard/interview/actions/evaluateAnswer";
import { generateFinalReport } from "@/app/dashboard/interview/actions/generateFinalReport";
import { saveInterview } from "@/app/dashboard/interview/actions/saveInterview";

import FinalInterviewReport from "@/src/components/interview/FinalInterviewReport";

import type {
  FinalInterviewReport as FinalReport,
  InterviewTurn,
  InterviewTurnEvaluation,
} from "@/src/types/interview";

type Props = {
  position: string;
  company?: string;
  jobDescription?: string;

  resumeContext?: {
    overallScore: number;
    summary: string;
    metrics?: {
      atsCompatibility: number;
      skillsMatch: number;
      experienceRelevance: number;
      impact: number;
      formatting: number;
    };
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
    interviewQuestions: string[];
  } | null;

  firstQuestion: string;
};

export default function InterviewRoom({
  position,
  company,
  jobDescription,
  resumeContext,
  firstQuestion,
}: Props) {
  const totalQuestions = 10;

  const [answer, setAnswer] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(1);

  const [currentQuestion, setCurrentQuestion] =
    useState(firstQuestion);

  const [previousQuestions, setPreviousQuestions] =
    useState<string[]>([firstQuestion]);

  const [turns, setTurns] =
    useState<InterviewTurn[]>([]);

  const [evaluation, setEvaluation] =
    useState<InterviewTurnEvaluation | null>(null);

  const [finalReport, setFinalReport] =
    useState<FinalReport | null>(null);

  const [isEvaluating, setIsEvaluating] =
    useState(false);

  const [isGeneratingReport, setIsGeneratingReport] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (finalReport) return;

    const timer = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [finalReport]);

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const remainingSeconds = (seconds % 60)
    .toString()
    .padStart(2, "0");

  const progress =
    (questionIndex / totalQuestions) * 100;

  async function handleSubmit() {
    if (!answer.trim() || isEvaluating) return;

    setIsEvaluating(true);
    setError("");

    const result = await evaluateAnswer({
      position,
      company,
      jobDescription,
      resumeContext,
      question: currentQuestion,
      answer,
      previousQuestions,
    });

    if (!result.success) {
      setError(result.error);
      setIsEvaluating(false);
      return;
    }

    const completedTurn: InterviewTurn = {
      question: currentQuestion,
      answer,
      score: result.evaluation.score,
      strengths: result.evaluation.strengths,
      improvements:
        result.evaluation.improvements,
    };

    setTurns((current) => [
      ...current,
      completedTurn,
    ]);

    setEvaluation(result.evaluation);
    setIsEvaluating(false);
  }

  async function handleContinue() {
    if (!evaluation) return;

    if (questionIndex === totalQuestions) {
      setIsGeneratingReport(true);
      setError("");

      const result = await generateFinalReport({
        position,
        turns,
      });

      if (!result.success) {
        setError(result.error);
        setIsGeneratingReport(false);
        return;
      }

      const saveResult = await saveInterview({
        position,
        company,
        jobDescription,
        interviewStyle,
        turns,
        report: result.report,
        durationSeconds: seconds,
      });

      if (!saveResult.success) {
        setError(saveResult.error);
      }

      setFinalReport(result.report);
      setIsGeneratingReport(false);
      return;
    }

    const nextQuestion = evaluation.nextQuestion;

    setPreviousQuestions((current) => [
      ...current,
      nextQuestion,
    ]);

    setCurrentQuestion(nextQuestion);

    setQuestionIndex((current) =>
      Math.min(current + 1, totalQuestions)
    );

    setAnswer("");
    setEvaluation(null);
    setError("");
  }

  if (finalReport) {
    return (
      <FinalInterviewReport
        report={finalReport}
      />
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
        <div className="flex flex-col gap-5 border-b border-slate-800 px-5 py-5 sm:px-7 sm:py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/20">
              <Sparkles size={21} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Live interview
              </p>

              <h1 className="mt-1 text-2xl font-bold text-white">
                {position}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/60 px-4 py-2 text-sm text-slate-400">
            <Clock3 size={16} />
            {minutes}:{remainingSeconds}
          </div>
        </div>

        <div className="px-5 py-6 sm:px-7 sm:py-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-300">
                Question {questionIndex} of{" "}
                {totalQuestions}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Answer naturally and support your
                points with examples.
              </p>
            </div>

            <span className="text-sm font-semibold text-blue-400">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <MessageSquare size={19} />
              </div>

              <div>
                <p className="font-semibold text-white">
                  AI Recruiter
                </p>

                <p className="text-xs text-emerald-400">
                  Interview in progress
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
              <p className="text-lg leading-8 text-white sm:text-xl sm:leading-9">
                {currentQuestion}
              </p>
            </div>
          </div>

          {!evaluation ? (
            <div className="mt-8">
              <label
                htmlFor="answer"
                className="text-sm font-medium text-slate-300"
              >
                Your answer
              </label>

              <textarea
                id="answer"
                value={answer}
                onChange={(event) =>
                  setAnswer(event.target.value)
                }
                placeholder="Write your answer as if you were speaking to the recruiter..."
                className="mt-3 h-56 w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />

              <div className="mt-3 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:justify-between">
                <span>
                  {answer.length} characters
                </span>

                <span>
                  Use specific examples where possible
                </span>
              </div>

              {error && (
                <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={
                    !answer.trim() ||
                    isEvaluating
                  }
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
                >
                  {isEvaluating ? (
                    <>
                      <LoaderCircle
                        size={17}
                        className="animate-spin"
                      />
                      Evaluating...
                    </>
                  ) : (
                    <>
                      Submit answer
                      <Send size={17} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 space-y-5">
              <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-400">
                  Recruiter
                </p>

                <p className="mt-3 leading-7 text-slate-200">
                  {evaluation.recruiterReaction}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-[140px_1fr]">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5 text-center">
                  <p className="text-xs text-slate-500">
                    Answer score
                  </p>

                  <p className="mt-2 text-4xl font-bold text-white">
                    {evaluation.score}
                  </p>

                  <p className="text-xs text-slate-600">
                    /100
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                  <p className="text-sm font-semibold text-white">
                    Quick feedback
                  </p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-400">
                        What worked
                      </p>

                      {evaluation.strengths
                        .slice(0, 2)
                        .map((item) => (
                          <p
                            key={item}
                            className="mt-2 text-sm text-slate-400"
                          >
                            • {item}
                          </p>
                        ))}
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-400">
                        Improve
                      </p>

                      {evaluation.improvements
                        .slice(0, 2)
                        .map((item) => (
                          <p
                            key={item}
                            className="mt-2 text-sm text-slate-400"
                          >
                            • {item}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isGeneratingReport}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:bg-slate-800"
                >
                  {isGeneratingReport ? (
                    <>
                      <LoaderCircle
                        size={17}
                        className="animate-spin"
                      />
                      Creating final report...
                    </>
                  ) : questionIndex ===
                    totalQuestions ? (
                    "Finish interview →"
                  ) : (
                    "Continue interview →"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center gap-3">
            <BriefcaseBusiness
              size={19}
              className="text-blue-400"
            />

            <div>
              <p className="text-xs text-slate-500">
                Interview for
              </p>

              <p className="font-semibold text-white">
                {position}
              </p>

              {company && (
                <p className="mt-1 text-xs text-slate-500">
                  {company}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-6">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Progress
              </span>

              <span className="text-slate-300">
                {questionIndex}/{totalQuestions}
              </span>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <span className="text-slate-500">
                Answers completed
              </span>

              <span className="text-slate-300">
                {turns.length}
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center gap-2">
            <Target
              size={18}
              className="text-amber-400"
            />

            <h2 className="font-semibold text-white">
              Answer goals
            </h2>
          </div>

          <div className="mt-5 space-y-4">
            <Goal text="Use specific examples" />
            <Goal text="Explain your contribution" />
            <Goal text="Mention the outcome" />
            <Goal text="Keep the answer focused" />
          </div>
        </section>
      </aside>
    </div>
  );
}

function Goal({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-400">
      <CheckCircle2
        size={17}
        className="shrink-0 text-emerald-400"
      />

      {text}
    </div>
  );
}
