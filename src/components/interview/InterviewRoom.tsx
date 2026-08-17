"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  MessageSquare,
  Send,
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

import type { InterviewStyle } from "@/src/types/interview-style";

type Props = {
  position: string;
  company?: string;
  jobDescription?: string;
  interviewStyle: InterviewStyle;

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
  interviewStyle,
  resumeContext,
  firstQuestion,
}: Props) {
  const totalQuestions = 10;

  const [answer, setAnswer] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [questionIndex, setQuestionIndex] =
    useState(1);

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
      interviewStyle,
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
        setError(
          saveResult.error ??
            "Unable to save interview."
        );
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
      <FinalInterviewReport report={finalReport} />
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_290px]">
      <section className="overflow-hidden rounded-[18px] border border-[#d9ddd7] bg-[#f8f8f4]">
        <div className="flex flex-col gap-5 border-b border-[#dfe2dc] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dce9e3] text-[#125c52]">
              <BriefcaseBusiness size={20} />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#568078]">
                Interview session
              </p>

              <h1 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-[#202522]">
                {position}
              </h1>

              {company && (
                <p className="mt-0.5 text-xs text-[#7a817c]">
                  {company}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#d6dcd6] bg-[#eef1ed] px-4 py-2 text-sm text-[#59635e]">
            <Clock3 size={15} />
            {minutes}:{remainingSeconds}
          </div>
        </div>

        <div className="px-6 py-7 sm:px-7">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-semibold text-[#313733]">
                Question {questionIndex} of{" "}
                {totalQuestions}
              </p>

              <p className="mt-1 text-xs text-[#808681]">
                Answer naturally and use specific examples.
              </p>
            </div>

            <span className="text-xs font-semibold text-[#125c52]">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#dde2dd]">
            <div
              className="h-full rounded-full bg-[#125c52] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-8 rounded-[16px] bg-[#e6ede8] px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d2e3db] text-[#125c52]">
                <MessageSquare size={16} />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#202522]">
                  Interviewer
                </p>

                <p className="mt-0.5 text-[11px] text-[#568078]">
                  Interview in progress
                </p>
              </div>
            </div>

            <p className="mt-5 text-[20px] font-medium leading-8 tracking-[-0.015em] text-[#252a27]">
              {currentQuestion}
            </p>
          </div>

          {!evaluation ? (
            <div className="mt-7">
              <label
                htmlFor="answer"
                className="text-sm font-semibold text-[#343a36]"
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
                className="mt-3 h-56 w-full resize-none rounded-[14px] border border-[#ccd6d0] bg-[#f1f4f0] p-5 text-[#202522] outline-none transition placeholder:text-[#9aa19c] focus:border-[#4b8b7e] focus:bg-white"
              />

              <div className="mt-3 flex flex-col gap-2 text-xs text-[#858b87] sm:flex-row sm:justify-between">
                <span>
                  {answer.length} characters
                </span>

                <span>
                  Use specific examples where possible
                </span>
              </div>

              {error && (
                <div className="mt-4 rounded-xl border border-[#dfbcb4] bg-[#f5e3df] p-4 text-sm text-[#944f41]">
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
                  className="flex items-center gap-2 rounded-lg bg-[#125c52] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0e4d45] disabled:cursor-not-allowed disabled:bg-[#ccd4cf] disabled:text-[#8b938e]"
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
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-7 space-y-5">
              <section className="rounded-[14px] border border-[#d7ddd7] bg-[#edf1ed] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6c766f]">
                  Interviewer response
                </p>

                <p className="mt-3 text-sm leading-7 text-[#48504b]">
                  {evaluation.recruiterReaction}
                </p>
              </section>

              <div className="grid gap-4 md:grid-cols-[135px_1fr]">
                <div className="rounded-[14px] border border-[#d3ddd7] bg-[#e6ede8] p-5 text-center">
                  <p className="text-[11px] font-medium text-[#6d766f]">
                    Answer score
                  </p>

                  <p className="mt-3 text-[42px] font-semibold leading-none tracking-[-0.04em] text-[#125c52]">
                    {evaluation.score}
                  </p>

                  <p className="mt-1 text-[11px] text-[#89908b]">
                    /100
                  </p>
                </div>

                <div className="rounded-[14px] border border-[#deddd6] bg-[#f1eee6] p-5">
                  <p className="text-sm font-semibold text-[#343730]">
                    Quick feedback
                  </p>

                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-[#39725f]">
                        What worked
                      </p>

                      {evaluation.strengths
                        .slice(0, 2)
                        .map((item) => (
                          <p
                            key={item}
                            className="mt-2 text-sm leading-5 text-[#60665f]"
                          >
                            • {item}
                          </p>
                        ))}
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-[#9a712c]">
                        Improve
                      </p>

                      {evaluation.improvements
                        .slice(0, 2)
                        .map((item) => (
                          <p
                            key={item}
                            className="mt-2 text-sm leading-5 text-[#666258]"
                          >
                            • {item}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-[#dfbcb4] bg-[#f5e3df] p-4 text-sm text-[#944f41]">
                  {error}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isGeneratingReport}
                  className="flex items-center gap-2 rounded-lg bg-[#125c52] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0e4d45] disabled:bg-[#ccd4cf]"
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

      <aside className="space-y-5">
        <section className="rounded-[16px] border border-[#d7ddd7] bg-[#e7ece8] p-5">
          <div className="flex items-center gap-3">
            <BriefcaseBusiness
              size={18}
              className="text-[#125c52]"
            />

            <div>
              <p className="text-[11px] text-[#78807b]">
                Interview for
              </p>

              <p className="mt-0.5 text-sm font-semibold text-[#202522]">
                {position}
              </p>

              {company && (
                <p className="mt-0.5 text-xs text-[#7b837e]">
                  {company}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 border-t border-[#d2d9d4] pt-5">
            <InfoRow
              label="Progress"
              value={`${questionIndex}/${totalQuestions}`}
            />

            <div className="mt-3">
              <InfoRow
                label="Answers completed"
                value={String(turns.length)}
              />
            </div>
          </div>
        </section>

        <section className="rounded-[16px] border border-[#e0d9ca] bg-[#eee9df] p-5">
          <div className="flex items-center gap-2">
            <Target
              size={17}
              className="text-[#9b722d]"
            />

            <h2 className="text-sm font-semibold text-[#39362f]">
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

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[#79817c]">
        {label}
      </span>

      <span className="font-medium text-[#343a36]">
        {value}
      </span>
    </div>
  );
}

function Goal({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-[#66645c]">
      <CheckCircle2
        size={16}
        className="shrink-0 text-[#54816b]"
      />

      {text}
    </div>
  );
}
