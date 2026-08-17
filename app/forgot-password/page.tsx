"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  Mail,
} from "lucide-react";

import { createClient } from "@/src/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!email.trim()) return;

    setIsLoading(true);
    setError("");

    const supabase = createClient();

    const redirectTo =
      `${window.location.origin}/reset-password`;

    const { error: resetError } =
      await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo,
        }
      );

    if (resetError) {
      setError(resetError.message);
      setIsLoading(false);
      return;
    }

    setSent(true);
    setIsLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12 text-white">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-7 sm:p-8">
          {!sent ? (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Mail size={22} />
              </div>

              <h1 className="mt-6 text-3xl font-bold">
                Forgot your password?
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter your email and we&apos;ll send you a link to create a
                new password.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8"
              >
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-300"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />

                {error && (
                  <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
                >
                  {isLoading && (
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                    />
                  )}

                  {isLoading
                    ? "Sending..."
                    : "Send reset link"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 size={25} />
              </div>

              <h1 className="mt-6 text-3xl font-bold">
                Check your inbox
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                If an account exists for{" "}
                <span className="font-medium text-slate-200">
                  {email}
                </span>
                , you&apos;ll receive a password reset link.
              </p>

              <Link
                href="/login"
                className="mt-7 inline-flex rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Return to login
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
