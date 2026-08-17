import {
  FileText,
  MessageSquare,
  Brain,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "CV Analysis",
    description:
      "Review your resume, strengths, weaknesses and missing details.",
  },
  {
    icon: MessageSquare,
    title: "Mock Interviews",
    description:
      "Practice realistic interview questions tailored to your experience and target role.",
  },
  {
    icon: Brain,
    title: "Detailed Feedback",
    description:
      "Receive detailed feedback on clarity, relevance, STAR structure and answer quality.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Track your interview performance over time and identify areas that need improvement.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-slate-950 px-6 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Interview preparation
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to prepare better
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            InterviewLab helps you prepare for real interviews using your own
            CV, target role and previous performance.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Icon size={24} />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
