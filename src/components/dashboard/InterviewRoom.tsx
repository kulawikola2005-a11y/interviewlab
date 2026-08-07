"use client";

import { useState } from "react";
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Clock3,
  BriefcaseBusiness,
} from "lucide-react";

const questions = [
  "Tell me about yourself and your background.",
  "Why are you interested in this role?",
  "Tell me about a challenging project you worked on.",
  "What is one weakness you are currently working on?",
];

export default function InterviewRoom() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  function handleSubmit() {
    if (!answer.trim()) return;

    setAnswer("");
    setAnsweredQuestions((current) => current + 1);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((current) => current + 1);
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] gap-6 xl:grid-cols-[1fr_340px]">
      <section className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Sparkles size={20} />
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

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock3 size={17} />
            Practice session
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center px-8 py-12">
          <div className="mx-auto w-full max-w-3xl">
            <p className="text-sm font-medium text-blue-400">
              Question {questionIndex + 1} of {questions.length}
            </p>

            <h1 className="mt-4 text-3xl font-semibold leading-tight text-white">
              {questions[questionIndex]}
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Answer as if you were speaking with a real recruiter. Your response
              will later be evaluated for relevance, structure and clarity.
            </p>

            <div className="mt-10">
              <textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Type your answer here..."
                rows={8}
                className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
              />

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsRecording((current) => !current)}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    isRecording
                      ? "border-red-500/30 bg-red-500/10 text-red-400"
                      : "border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                  {isRecording ? "Stop recording" : "Answer by voice"}
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!answer.trim()}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
                >
                  Submit answer
                  <Send size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center gap-3">
            <BriefcaseBusiness
              size={19}
              className="text-blue-400"
            />

            <div>
              <p className="text-xs text-slate-500">
                Interview for
              </p>

              <p className="font-medium text-white">
                Frontend Developer
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-6">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">
                Progress
              </span>

              <span className="font-medium text-white">
                {answeredQuestions}/{questions.length}
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{
                  width: `${(answeredQuestions / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <p className="font-semibold text-white">
            AI evaluation
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            After connecting the AI engine, InterviewLab will evaluate each
            answer automatically.
          </p>

          <div className="mt-6 space-y-5">
            <Metric
              name="Answer structure"
              value="—"
            />

            <Metric
              name="Relevance"
              value="—"
            />

            <Metric
              name="Specific examples"
              value="—"
            />

            <Metric
              name="Clarity"
              value="—"
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

function Metric({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-400">
        {name}
      </span>

      <span className="text-sm font-medium text-slate-300">
        {value}
      </span>
    </div>
  );
}
