import Link from "next/link";
import {
  FileText,
  Plus,
  Sparkles,
  Target,
  Trophy,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import Sidebar from "@/src/components/dashboard/Sidebar";
import StatCard from "@/src/components/dashboard/StatCard";
import ResumeHistory from "@/src/components/dashboard/ResumeHistory";
import { getResumeHistory } from "@/src/lib/resume/getResumeHistory";

export default async function DashboardPage() {
  const resumes = await getResumeHistory();

  const scores = resumes.map((resume) => resume.overall_score);

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((sum, score) => sum + score, 0) /
            scores.length
        )
      : 0;

  const bestScore =
    scores.length > 0
      ? Math.max(...scores)
      : 0;

  const latestScore =
    scores.length > 0
      ? scores[0]
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
                Track your resume performance, review AI feedback and prepare
                for your next interview.
              </p>
            </div>

            <Link
              href="/dashboard/cv"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              <Plus size={18} />
              Analyze CV
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="CV analyses"
              value={String(resumes.length)}
              change={
                resumes.length === 1
                  ? "1 resume analyzed"
                  : `${resumes.length} resumes analyzed`
              }
              icon={FileText}
            />

            <StatCard
              title="Average CV score"
              value={`${averageScore}%`}
              change={
                resumes.length > 0
                  ? "Across all analyses"
                  : "Analyze your first CV"
              }
              icon={Target}
            />

            <StatCard
              title="Best CV score"
              value={`${bestScore}%`}
              change={
                resumes.length > 0
                  ? "Your highest result"
                  : "No score yet"
              }
              icon={Trophy}
            />

            <StatCard
              title="Latest score"
              value={`${latestScore}%`}
              change={
                resumes.length > 0
                  ? "Most recent analysis"
                  : "No recent analysis"
              }
              icon={TrendingUp}
            />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
            <ResumeHistory resumes={resumes.slice(0, 5)} />

            <div className="space-y-6">
              <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Next step
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    Quick actions
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Continue your preparation
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/dashboard/cv"
                    className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-blue-500/40 hover:bg-slate-950"
                  >
                    <div>
                      <p className="font-medium text-white">
                        Analyze a CV
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Get targeted AI feedback
                      </p>
                    </div>

                    <ArrowUpRight
                      size={19}
                      className="text-slate-600 transition group-hover:text-blue-400"
                    />
                  </Link>

                  <Link
                    href="/dashboard/interview/new"
                    className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-violet-500/40 hover:bg-slate-950"
                  >
                    <div>
                      <p className="font-medium text-white">
                        Start interview
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Practice for a specific role
                      </p>
                    </div>

                    <ArrowUpRight
                      size={19}
                      className="text-slate-600 transition group-hover:text-violet-400"
                    />
                  </Link>
                </div>
              </section>

              <section className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-slate-900/70 to-violet-500/10 p-6">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Sparkles size={19} />
                  </div>

                  <p className="mt-5 text-sm font-medium text-blue-400">
                    InterviewLab AI
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    Turn feedback into practice
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Practice questions generated from your resume and prepare
                    for realistic interview scenarios.
                  </p>

                  <Link
                    href="/dashboard/interview/new"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
                  >
                    Start preparing
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
