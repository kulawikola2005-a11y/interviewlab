import Link from "next/link";

type InterviewSession = {
  id: string;
  position: string;
  overall_score: number | null;
  hiring_recommendation: string | null;
  duration_seconds: number;
  created_at: string;
};

export default function InterviewHistory({
  interviews,
}: {
  interviews: InterviewSession[];
}) {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Recent interviews
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest AI mock interview sessions
          </p>
        </div>

        <Link
          href="/dashboard/interview/new"
          className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
        >
          Start interview
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {interviews.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center">
            <p className="text-sm text-slate-400">
              No interviews completed yet.
            </p>

            <Link
              href="/dashboard/interview/new"
              className="mt-4 inline-block text-sm font-medium text-blue-400"
            >
              Start your first interview →
            </Link>
          </div>
        ) : (
          interviews.map((interview) => {
            const minutes = Math.max(
              1,
              Math.round(interview.duration_seconds / 60)
            );

            return (
              <div
                key={interview.id}
                className="rounded-xl border border-slate-800 bg-slate-950/50 p-5"
              >
                <div className="flex items-center justify-between gap-5">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">
                      {interview.position}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {new Date(interview.created_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                      {" · "}
                      {minutes} min
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-2xl font-bold text-blue-400">
                      {interview.overall_score ?? "—"}
                    </p>

                    <p className="text-xs text-slate-500">
                      /100
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
