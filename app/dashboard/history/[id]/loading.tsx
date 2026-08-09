export default function HistoryLoading() {
  return (
    <main className="min-h-screen px-5 py-6 lg:ml-64 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-5 w-36 rounded bg-slate-800" />

        <div className="mt-8 h-36 rounded-2xl border border-slate-800 bg-slate-900/60" />

        <div className="mt-6 h-80 rounded-3xl border border-slate-800 bg-slate-900/60" />

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <div className="h-80 rounded-3xl border border-slate-800 bg-slate-900/60" />
          <div className="h-80 rounded-3xl border border-slate-800 bg-slate-900/60" />
        </div>
      </div>
    </main>
  );
}
