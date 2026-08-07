const interviews = [
  {
    role: "Frontend Developer",
    company: "TechNova",
    date: "2 days ago",
    score: 88,
  },
  {
    role: "AI Intern",
    company: "NeuralWorks",
    date: "5 days ago",
    score: 82,
  },
  {
    role: "Data Analyst",
    company: "DataFlow",
    date: "1 week ago",
    score: 79,
  },
];

export default function RecentInterviews() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Recent interviews
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest practice sessions
          </p>
        </div>

        <button className="text-sm font-medium text-blue-400 hover:text-blue-300">
          View all
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {interviews.map((interview) => (
          <div
            key={`${interview.role}-${interview.company}`}
            className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4"
          >
            <div>
              <p className="font-medium text-white">{interview.role}</p>
              <p className="mt-1 text-sm text-slate-500">
                {interview.company} · {interview.date}
              </p>
            </div>

            <div className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-400">
              {interview.score}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
