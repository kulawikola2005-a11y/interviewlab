import {
  FileText,
  MessageSquare,
  Target,
  TrendingUp,
} from "lucide-react";

import Sidebar from "@/src/components/dashboard/Sidebar";
import StatCard from "@/src/components/dashboard/StatCard";
import RecentInterviews from "@/src/components/dashboard/RecentInterviews";
import ProgressChart from "@/src/components/dashboard/ProgressChart";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="ml-64 px-8 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-400">
                Overview
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Welcome back
              </h1>

              <p className="mt-2 text-slate-400">
                Here is how your interview preparation is progressing.
              </p>
            </div>

            <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500">
              Start new interview
            </button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Overall score"
              value="84%"
              change="+6% this month"
              icon={Target}
            />

            <StatCard
              title="Mock interviews"
              value="12"
              change="+3 this month"
              icon={MessageSquare}
            />

            <StatCard
              title="CV score"
              value="91%"
              change="+4% since last review"
              icon={FileText}
            />

            <StatCard
              title="Improvement"
              value="+18%"
              change="Across recent sessions"
              icon={TrendingUp}
            />
          </div>

          <div className="mt-8">
            <ProgressChart />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <RecentInterviews />

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-xl font-semibold">
                Your focus areas
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                AI recommendations based on recent answers
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">
                      Answer structure
                    </span>
                    <span className="text-slate-500">72%</span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-800">
                    <div className="h-2 w-[72%] rounded-full bg-blue-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">
                      Specific examples
                    </span>
                    <span className="text-slate-500">64%</span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-800">
                    <div className="h-2 w-[64%] rounded-full bg-blue-500" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">
                      Role relevance
                    </span>
                    <span className="text-slate-500">86%</span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-800">
                    <div className="h-2 w-[86%] rounded-full bg-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
