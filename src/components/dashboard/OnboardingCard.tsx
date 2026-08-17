import Link from "next/link";
import {
  ArrowRight,
  Check,
  FileText,
  MessageSquare,
} from "lucide-react";

type Props = {
  resumeCount: number;
  interviewCount: number;
};

export default function OnboardingCard({
  resumeCount,
  interviewCount,
}: Props) {
  const hasResume = resumeCount > 0;
  const hasInterview = interviewCount > 0;

  if (hasResume && hasInterview) {
    return null;
  }

  const completedSteps =
    Number(hasResume) +
    Number(hasResume) +
    Number(hasInterview);

  const progress = Math.round(
    (completedSteps / 3) * 100
  );

  const steps = [
    {
      title: "Upload your CV",
      description:
        "Upload a PDF and let InterviewLab analyze your resume.",
      completed: hasResume,
      href: "/dashboard/cv",
      icon: FileText,
    },
    {
      title: "Review your feedback",
      description:
        "See your score, strengths, weaknesses and recommendations.",
      completed: hasResume,
      href: "/dashboard/cv",
      icon: FileText,
    },
    {
      title: "Practice an interview",
      description:
        "Start an mock interview tailored to your target role.",
      completed: hasInterview,
      href: "/dashboard/interview/new",
      icon: MessageSquare,
    },
  ];

  return (
    <section className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
            Getting started
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Set up your InterviewLab workspace
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Complete these steps to unlock personalized CV feedback,
            interview practice and progress tracking.
          </p>
        </div>

        <div className="shrink-0">
          <p className="text-right text-sm font-semibold text-white">
            {progress}% complete
          </p>

          <div className="mt-2 h-2 w-44 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <Link
              key={step.title}
              href={step.href}
              className={`group rounded-2xl border p-5 transition ${
                step.completed
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : "border-slate-800 bg-slate-950/50 hover:border-blue-500/40"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    step.completed
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {step.completed ? (
                    <Check size={18} />
                  ) : (
                    <Icon size={18} />
                  )}
                </div>

                <span className="text-xs font-semibold text-slate-600">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-5 font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {step.description}
              </p>

              {!step.completed && (
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-400">
                  Continue
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </div>
              )}

              {step.completed && (
                <p className="mt-4 text-sm font-medium text-emerald-400">
                  Completed
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
