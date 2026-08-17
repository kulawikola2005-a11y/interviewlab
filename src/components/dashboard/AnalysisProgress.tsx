import {
  Check,
  FileSearch,
  Brain,
  MessageSquareText,
  LoaderCircle,
} from "lucide-react";

type AnalysisProgressProps = {
  step: number;
};

const steps = [
  {
    title: "Reading your CV",
    description: "Extracting information from the PDF",
    icon: FileSearch,
  },
  {
    title: "Analyzing your profile",
    description: "Reviewing experience, skills and resume quality",
    icon: Brain,
  },
  {
    title: "Generating feedback",
    description: "Creating recommendations and interview questions",
    icon: MessageSquareText,
  },
];

export default function AnalysisProgress({
  step,
}: AnalysisProgressProps) {
  return (
    <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">
            InterviewLab is working
          </p>

          <p className="mt-1 text-xs text-slate-500">
            This usually takes a moment.
          </p>
        </div>

        <LoaderCircle
          size={20}
          className="animate-spin text-blue-400"
        />
      </div>

      <div className="mt-6 space-y-4">
        {steps.map((item, index) => {
          const Icon = item.icon;
          const completed = index < step;
          const active = index === step;

          return (
            <div
              key={item.title}
              className={`flex items-center gap-4 transition ${
                completed || active
                  ? "opacity-100"
                  : "opacity-35"
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                  completed
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    : active
                      ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                      : "border-slate-800 bg-slate-900 text-slate-600"
                }`}
              >
                {completed ? (
                  <Check size={17} />
                ) : (
                  <Icon size={17} />
                )}
              </div>

              <div>
                <p
                  className={`text-sm font-medium ${
                    active || completed
                      ? "text-slate-200"
                      : "text-slate-600"
                  }`}
                >
                  {item.title}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-700"
          style={{
            width: `${Math.min(100, ((step + 1) / steps.length) * 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
