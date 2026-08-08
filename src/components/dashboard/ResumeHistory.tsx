import Link from "next/link";

type Resume = {
  id: string;
  file_name: string;
  overall_score: number;
  created_at: string;
};

export default function ResumeHistory({
  resumes,
}: {
  resumes: Resume[];
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Recent CV analyses
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest AI resume reports
          </p>
        </div>

        <Link
          href="/dashboard/cv"
          className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
        >
          Analyze new CV
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {resumes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center">
            <p className="text-sm text-slate-400">
              No CV analyses yet.
            </p>

            <Link
              href="/dashboard/cv"
              className="mt-4 inline-block text-sm font-medium text-blue-400"
            >
              Upload your first CV →
            </Link>
          </div>
        ) : (
          resumes.map((resume) => (
            <Link
              key={resume.id}
              href={`/dashboard/history/${resume.id}`}
              className="block rounded-xl border border-slate-800 bg-slate-950/50 p-5 transition hover:border-blue-500/60 hover:bg-slate-950"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">
                    {resume.file_name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(resume.created_at).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-2xl font-bold text-blue-400">
                    {resume.overall_score}
                  </p>

                  <p className="text-xs text-slate-500">
                    /100
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
