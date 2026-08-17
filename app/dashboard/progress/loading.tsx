export default function ProgressLoading() {
  return (
    <main className="min-h-screen px-5 py-6 text-white sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-[#c4cfd2]" />

          <div>
            <div className="h-3 w-20 rounded bg-[#c4cfd2]" />
            <div className="mt-3 h-9 w-72 max-w-full rounded bg-[#c4cfd2]" />
            <div className="mt-3 h-4 w-96 max-w-full rounded bg-[#b7c3c7]" />
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-36 rounded-2xl border border-[#aab8bd] bg-[#b7c3c7]/60"
            />
          ))}
        </div>

        <div className="mt-8 h-96 rounded-3xl border border-[#aab8bd] bg-[#b7c3c7]/60" />

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="h-96 rounded-3xl border border-[#aab8bd] bg-[#b7c3c7]/60" />
          <div className="h-96 rounded-3xl border border-[#aab8bd] bg-[#b7c3c7]/60" />
        </div>
      </div>
    </main>
  );
}
