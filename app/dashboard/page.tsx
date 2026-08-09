import Link from "next/link";
import {
  FileText,
  MessageSquare,
  Plus,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import Sidebar from "@/src/components/dashboard/Sidebar";
import StatCard from "@/src/components/dashboard/StatCard";
import ResumeHistory from "@/src/components/dashboard/ResumeHistory";
import InterviewHistory from "@/src/components/dashboard/InterviewHistory";
import OnboardingCard from "@/src/components/dashboard/OnboardingCard";

import { getResumeHistory } from "@/src/lib/resume/getResumeHistory";
import { getInterviewHistory } from "@/src/lib/interview/getInterviewHistory";

export default async function DashboardPage() {
  const [resumes, interviews] = await Promise.all([
    getResumeHistory(),
    getInterviewHistory(),
  ]);

  const resumeScores = resumes.map(
    (resume) => resume.overall_score
  );

  const interviewScores = interviews
    .map((interview) => interview.overall_score)
    .filter(
      (score): score is number =>
        typeof score === "number"
    );

  const averageResumeScore =
    resumeScores.length > 0
      ? Math.round(
          resumeScores.reduce(
            (sum, score) => sum + score,
            0
          ) / resumeScores.length
        )
      : 0;

  const averageInterviewScore =
    interviewScores.length > 0
      ? Math.round(
          interviewScores.reduce(
            (sum, score) => sum + score,
            0
          ) / interviewScores.length
        )
      : 0;

  const bestInterviewScore =
    interviewScores.length > 0
      ? Math.max(...interviewScores)
      : 0;

  return (
    <main className="min-h-screen text-white">
      <Sidebar />

      <div className="px-5 py-6 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-blue-400">
                <Sparkles size={17} />

                <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                  Dashboard
                </p>
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Track your CV performance and mock interview progress in one
                place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/cv"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold transition hover:border-slate-600"
              >
                <FileText size={17} />
                Analyze CV
              </Link>

              <Link
                href="/dashboard/interview/new"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                <Plus size={18} />
                Start interview
              </Link>
            </div>
          </div>

          <OnboardingCard
            resumeCount={resumes.length}
            interviewCount={interviews.length}
          />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="CV analyses"
              value={String(resumes.length)}
              change={`${averageResumeScore}% average score`}
              icon={FileText}
            />

            <StatCard
              title="Mock interviews"
              value={String(interviews.length)}
              change={
                interviews.length > 0
                  ? "Completed AI sessions"
                  : "Start your first session"
              }
              icon={MessageSquare}
            />

            <StatCard
              title="Interview average"
              value={`${averageInterviewScore}%`}
              change={
                interviewScores.length > 0
                  ? "Across completed interviews"
                  : "No interview scores yet"
              }
              icon={Target}
            />

            <StatCard
              title="Best interview"
              value={`${bestInterviewScore}%`}
              change={
                interviewScores.length > 0
                  ? "Your highest result"
                  : "No result yet"
              }
              icon={Trophy}
            />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <ResumeHistory
              resumes={resumes.slice(0, 4)}
            />

            <InterviewHistory
              interviews={interviews.slice(0, 4)}
            />
          </div>

          <section className="mt-8 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-slate-900/70 to-violet-500/10 p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                  Your next step
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Turn CV feedback into interview practice
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  Use your resume analysis to practice realistic questions,
                  improve weak areas and track your interview performance over
                  time.
                </p>
              </div>

              <Link
                href="/dashboard/interview/new"
                className="shrink-0 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold transition hover:bg-blue-500"
              >
                Practice now →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
