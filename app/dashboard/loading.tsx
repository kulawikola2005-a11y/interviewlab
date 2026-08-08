export default function DashboardLoading() {
  return (
    <main className="min-h-screen px-5 py-6 text-white lg:ml-64 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-4 w-28 rounded bg-slate-800" />
        <div className="mt-4 h-10 w-64 rounded-xl bg-slate-800" />
        <div className="mt-3 h-5 w-96 max-w-full rounded bg-slate-900" />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-36 rounded-2xl border border-slate-800 bg-slate-900/60"
            />
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
          <div className="h-[420px] rounded-2xl border border-slate-800 bg-slate-900/60" />

          <div className="space-y-6">
            <div className="h-64 rounded-2xl border border-slate-800 bg-slate-900/60" />
            <div className="h-56 rounded-2xl border border-slate-800 bg-slate-900/60" />
          </div>
        </div>
      </div>
    </main>
  );
}
