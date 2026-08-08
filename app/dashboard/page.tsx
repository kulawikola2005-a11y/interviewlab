import Link from "next/link";
import {
  FileText,
  Plus,
  Sparkles,
  Target,
  Trophy,
  TrendingUp,
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
    <main className="min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="ml-64 px-8 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-blue-400">
                <Sparkles size={17} />

                <p className="text-sm font-medium">
                  Dashboard
                </p>
              </div>

              <h1 className="mt-3 text-3xl font-bold tracking-tight">
                Welcome back
              </h1>

              <p className="mt-2 text-slate-400">
                Track your CV performance and prepare for your next interview.
              </p>
            </div>

            <Link
              href="/dashboard/cv"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
            >
              <Plus size={18} />
              Analyze CV
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
            <ResumeHistory resumes={resumes.slice(0, 5)} />

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <h2 className="text-xl font-semibold">
                  Quick actions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Continue your preparation
                </p>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/dashboard/cv"
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-blue-500/50"
                  >
                    <div>
                      <p className="font-medium text-white">
                        Analyze a CV
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Get AI-powered resume feedback
                      </p>
                    </div>

                    <FileText
                      size={20}
                      className="text-blue-400"
                    />
                  </Link>

                  <Link
                    href="/dashboard/interview/new"
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-blue-500/50"
                  >
                    <div>
                      <p className="font-medium text-white">
                        New interview
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Practice for a specific role
                      </p>
                    </div>

                    <Sparkles
                      size={20}
                      className="text-purple-400"
                    />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
                <p className="text-sm font-medium text-blue-400">
                  InterviewLab AI
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  Turn feedback into practice
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Use questions generated from your CV to practice realistic
                  interview scenarios.
                </p>

                <Link
                  href="/dashboard/interview/new"
                  className="mt-5 inline-flex text-sm font-semibold text-blue-400 hover:text-blue-300"
                >
                  Start preparing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
