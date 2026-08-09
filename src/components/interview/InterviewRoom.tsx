"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  MessageSquare,
  Send,
  Sparkles,
  Target,
} from "lucide-react";

type Props = {
  position: string;
  firstQuestion: string;
};

export default function InterviewRoom({
  position,
  firstQuestion,
}: Props) {
  const [answer, setAnswer] = useState("");
  const [seconds, setSeconds] = useState(0);

  const questionIndex = 1;
  const totalQuestions = 10;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const remainingSeconds = (seconds % 60)
    .toString()
    .padStart(2, "0");

  const progress = (questionIndex / totalQuestions) * 100;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
        <div className="flex flex-col gap-5 border-b border-slate-800 px-7 py-6 sm:flex-row sm:items-center sm:justify-between">
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

        <div className="px-7 py-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-300">
                Question {questionIndex} of {totalQuestions}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Take your time and answer as if this were a real interview.
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
              <p className="text-xl leading-9 text-white">
                {firstQuestion}
              </p>
            </div>
          </div>

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
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Write your answer as if you were speaking to the recruiter..."
              className="mt-3 h-56 w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
            />

            <div className="mt-3 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span>
                {answer.length} characters
              </span>

              <span>
                Aim for a clear, specific answer with examples
              </span>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                disabled={!answer.trim()}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none"
              >
                Submit answer
                <Send size={17} />
              </button>
            </div>
          </div>
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
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Session
            </p>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Questions
                </span>

                <span className="text-slate-300">
                  {questionIndex}/{totalQuestions}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Estimated time
                </span>

                <span className="text-slate-300">
                  15–20 min
                </span>
              </div>
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
            <Goal text="Explain your own contribution" />
            <Goal text="Mention the result or impact" />
            <Goal text="Keep the answer focused" />
          </div>
        </section>

        <section className="rounded-3xl border border-blue-500/20 bg-blue-500/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
            Interview tip
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            For behavioral questions, try structuring your answer around the
            situation, your task, the action you took and the final result.
          </p>
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
