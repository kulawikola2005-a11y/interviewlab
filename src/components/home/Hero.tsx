export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">InterviewLab</h1>

        <p className="mt-6 text-xl text-slate-300">
          Interview preparation built around your resume and target role.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500">
            Upload CV
          </button>

          <button className="rounded-xl border border-slate-600 px-6 py-3 font-semibold transition hover:bg-slate-800">
            Try Demo
          </button>
        </div>
      </div>
    </section>
  );
}
