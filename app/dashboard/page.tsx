import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

import Sidebar from "@/src/components/dashboard/Sidebar";
import { getResumeHistory } from "@/src/lib/resume/getResumeHistory";
import { getInterviewHistory } from "@/src/lib/interview/getInterviewHistory";

type ActivityItem = {
  id: string;
  type: "resume" | "interview";
  title: string;
  subtitle: string;
  score: number | null;
  createdAt: string;
  href: string;
};

export default async function DashboardPage() {
  const [resumes, interviews] = await Promise.all([
    getResumeHistory(),
    getInterviewHistory(),
  ]);

  const latestResume = resumes[0] ?? null;
  const latestInterview = interviews[0] ?? null;

  const activities: ActivityItem[] = [
    ...resumes.map((item) => ({
      id: item.id,
      type: "resume" as const,
      title: item.file_name,
      subtitle: "Resume review",
      score: item.overall_score,
      createdAt: item.created_at,
      href: `/dashboard/history/${item.id}`,
    })),

    ...interviews.map((item) => ({
      id: item.id,
      type: "interview" as const,
      title: item.position,
      subtitle: item.company
        ? `Interview · ${item.company}`
        : "Interview practice",
      score: item.overall_score,
      createdAt: item.created_at,
      href: `/dashboard/interviews/${item.id}`,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  const weekAgo = getWeekAgoTimestamp();

  const interviewsThisWeek = interviews.filter(
    (item) =>
      new Date(item.created_at).getTime() >= weekAgo
  ).length;

  return (
    <main className="min-h-screen bg-[#f1f1ec]">
      <Sidebar />

      <div className="px-5 py-7 sm:px-8 lg:ml-[248px] lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[1180px]">
          {/* HEADER */}

          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#1d211f]">
                Good afternoon
              </h1>

              <p className="mt-1 text-sm text-[#747a76]">
                Let&apos;s make progress today.
              </p>
            </div>

            <Link
              href="/dashboard/interview/new"
              className="hidden rounded-lg bg-[#125c52] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0e4d45] sm:block"
            >
              New
            </Link>
          </header>

          {/* HERO */}

          <section className="relative mt-7 overflow-hidden rounded-[18px] bg-[#155f54] px-7 py-8 text-white sm:px-10 sm:py-10">
            <div className="relative z-10 max-w-[430px]">
              <h2 className="text-[30px] font-semibold leading-[1.12] tracking-[-0.035em]">
                Prepare for
                <br />
                an interview
              </h2>

              <p className="mt-4 max-w-[360px] text-[15px] leading-6 text-white/75">
                Practice for a specific role with questions tailored to your
                experience.
              </p>

              <Link
                href="/dashboard/interview/new"
                className="mt-7 inline-flex items-center gap-3 rounded-lg bg-[#f7f7f2] px-5 py-3 text-sm font-semibold text-[#174f48] transition hover:bg-white"
              >
                Start interview
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Subtle decorative shapes — no AI gradients */}

            <div className="absolute -right-20 -top-28 h-[330px] w-[520px] rotate-[-10deg] rounded-[45%] bg-white/[0.055]" />

            <div className="absolute -bottom-40 right-24 h-[300px] w-[500px] rotate-[8deg] rounded-[50%] bg-[#0d4942]/40" />

            <div className="absolute right-12 top-10 hidden h-32 w-24 rounded-t-[60px] border-[3px] border-white/10 xl:block" />
          </section>

          {/* TWO PRIMARY OBJECTS */}

          <section className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-[16px] border border-[#d9ddd7] bg-[#e8eeea] p-6">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#68736d]">
                  Resume status
                </p>

                <span className="text-lg leading-none text-[#65706a]">
                  ···
                </span>
              </div>

              {latestResume ? (
                <>
                  <div className="mt-6 flex items-start gap-5">
                    <div className="flex h-[76px] w-[64px] shrink-0 items-center justify-center rounded-xl bg-[#f8f9f6] text-[#32786e]">
                      <FileText size={29} strokeWidth={1.5} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[16px] font-semibold text-[#202522]">
                        {latestResume.file_name}
                      </p>

                      <p className="mt-1 text-xs text-[#747c77]">
                        Reviewed{" "}
                        {formatDate(latestResume.created_at)}
                      </p>

                      <div className="mt-3 flex items-end gap-2">
                        <span className="text-[30px] font-semibold leading-none text-[#125c52]">
                          {latestResume.overall_score}
                        </span>

                        <span className="pb-0.5 text-sm text-[#7d847f]">
                          /100
                        </span>

                        <ScoreLabel
                          score={latestResume.overall_score}
                        />
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/history/${latestResume.id}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#125c52]"
                  >
                    Review again
                    <ArrowRight size={14} />
                  </Link>
                </>
              ) : (
                <EmptyState
                  text="No resume reviews yet."
                  href="/dashboard/cv"
                  action="Review a resume"
                />
              )}
            </div>

            <div className="rounded-[16px] border border-[#ded9ce] bg-[#eeeae1] p-6">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#756f64]">
                  Continue interview
                </p>

                <span className="text-lg leading-none text-[#746f65]">
                  ···
                </span>
              </div>

              {latestInterview ? (
                <>
                  <div className="mt-6 flex items-start gap-5">
                    <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-[18px] bg-[#dfe5dd] text-[#125c52]">
                      <BriefcaseBusiness
                        size={29}
                        strokeWidth={1.6}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[17px] font-semibold text-[#202522]">
                        {latestInterview.position}
                      </p>

                      <p className="mt-1 truncate text-sm text-[#6e716d]">
                        {latestInterview.company ||
                          "Interview practice"}
                      </p>

                      <p className="mt-2 text-xs text-[#88867e]">
                        {formatDate(
                          latestInterview.created_at
                        )}
                        {latestInterview.duration_seconds
                          ? ` · ${Math.max(
                              1,
                              Math.round(
                                latestInterview.duration_seconds /
                                  60
                              )
                            )} min`
                          : ""}
                      </p>

                      <div className="mt-3 flex items-end gap-1">
                        <span className="text-[30px] font-semibold leading-none text-[#125c52]">
                          {latestInterview.overall_score ??
                            "—"}
                        </span>

                        <span className="pb-0.5 text-sm text-[#89867e]">
                          /100
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/interviews/${latestInterview.id}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#125c52]"
                  >
                    Continue session
                    <ArrowRight size={14} />
                  </Link>
                </>
              ) : (
                <EmptyState
                  text="No interview sessions yet."
                  href="/dashboard/interview/new"
                  action="Start an interview"
                />
              )}
            </div>
          </section>

          {/* ACTIVITY */}

          <section className="mt-5 overflow-hidden rounded-[16px] border border-[#dcded8] bg-[#f8f8f4]">
            <div className="flex items-center justify-between px-6 pb-4 pt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6d746f]">
                Recent activity
              </p>

              <Link
                href="/dashboard/progress"
                className="text-xs font-semibold text-[#125c52]"
              >
                View all
              </Link>
            </div>

            {activities.length === 0 ? (
              <div className="border-t border-[#e0e2dd] px-6 py-10 text-center text-sm text-[#777d79]">
                Your recent work will appear here.
              </div>
            ) : (
              activities.map((item) => (
                <Link
                  key={`${item.type}-${item.id}`}
                  href={item.href}
                  className="group grid grid-cols-[1fr_auto] items-center gap-5 border-t border-[#e0e2dd] px-6 py-3.5 transition hover:bg-white/70 sm:grid-cols-[1.2fr_1fr_auto_auto]"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        item.type === "resume"
                          ? "bg-[#deebe6] text-[#176b61]"
                          : "bg-[#eee5cf] text-[#9a6b1e]"
                      }`}
                    >
                      {item.type === "resume" ? (
                        <FileText size={14} />
                      ) : (
                        <MessageSquare size={14} />
                      )}
                    </div>

                    <p className="truncate text-sm font-semibold text-[#202522]">
                      {item.title}
                    </p>
                  </div>

                  <p className="hidden truncate text-xs text-[#747a76] sm:block">
                    {item.subtitle}
                  </p>

                  <p className="hidden whitespace-nowrap text-xs text-[#858b87] sm:block">
                    {formatDate(item.createdAt)}
                  </p>

                  <div className="flex items-center gap-5">
                    <Score score={item.score} />

                    <ArrowRight
                      size={14}
                      className="text-[#9da39f] transition group-hover:translate-x-0.5 group-hover:text-[#125c52]"
                    />
                  </div>
                </Link>
              ))
            )}
          </section>

          {/* PROGRESS STRIP */}

          <section className="mt-5 flex flex-col gap-5 rounded-[16px] border border-[#d6ddd7] bg-[#e6ede8] px-6 py-5 md:flex-row md:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d5e4dc] text-[#125c52]">
                <TrendingUp size={20} />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#202522]">
                  Keep improving
                </p>

                <p className="mt-0.5 text-xs text-[#747b76]">
                  You&apos;ve practiced{" "}
                  {interviewsThisWeek}{" "}
                  {interviewsThisWeek === 1
                    ? "interview"
                    : "interviews"}{" "}
                  this week.
                </p>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-4">
              <span className="whitespace-nowrap text-sm font-semibold text-[#125c52]">
                {Math.min(interviewsThisWeek, 5)} / 5
              </span>

              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#d3dad5]">
                <div
                  className="h-full rounded-full bg-[#125c52]"
                  style={{
                    width: `${Math.min(
                      100,
                      (interviewsThisWeek / 5) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <Link
              href="/dashboard/progress"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#125c52]"
            >
              See progress
              <ArrowRight size={14} />
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

function Score({
  score,
}: {
  score: number | null;
}) {
  if (score === null) {
    return (
      <span className="min-w-12 text-right text-sm text-[#8a908c]">
        —
      </span>
    );
  }

  return (
    <span
      className={`min-w-12 text-right text-sm font-semibold tabular-nums ${
        score < 40
          ? "text-[#b87513]"
          : "text-[#125c52]"
      }`}
    >
      {score}
      <span className="ml-0.5 text-[10px] font-normal text-[#8a908c]">
        /100
      </span>
    </span>
  );
}

function ScoreLabel({
  score,
}: {
  score: number;
}) {
  const label =
    score >= 75
      ? "Strong"
      : score >= 55
        ? "Good start"
        : "Needs improvement";

  return (
    <span className="ml-2 rounded-full bg-[#f1dfb7] px-2.5 py-1 text-[10px] font-medium text-[#8a611d]">
      {label}
    </span>
  );
}

function EmptyState({
  text,
  href,
  action,
}: {
  text: string;
  href: string;
  action: string;
}) {
  return (
    <div className="mt-7">
      <p className="text-sm text-[#747a76]">
        {text}
      </p>

      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#125c52]"
      >
        {action}
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}


function getWeekAgoTimestamp() {
  return new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
}
