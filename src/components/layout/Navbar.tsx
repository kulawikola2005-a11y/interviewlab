import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white"
        >
          InterviewLab
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="#features"
            className="text-slate-300 transition hover:text-white"
          >
            Features
          </Link>

          <Link
            href="#pricing"
            className="text-slate-300 transition hover:text-white"
          >
            Pricing
          </Link>

          <Link
            href="/login"
            className="text-slate-300 transition hover:text-white"
          >
            Login
          </Link>

          <button className="rounded-xl bg-blue-600 px-5 py-2 font-semibold transition hover:bg-blue-500">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}
