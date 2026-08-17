"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  KeyRound,
  LoaderCircle,
} from "lucide-react";

import { createClient } from "@/src/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmation) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    const supabase = createClient();

    const { error: updateError } =
      await supabase.auth.updateUser({
        password,
      });

    if (updateError) {
      setError(updateError.message);
      setIsLoading(false);
      return;
    }

    setCompleted(true);
    setIsLoading(false);

    window.setTimeout(() => {
      router.replace("/dashboard");
      router.refresh();
    }, 1500);
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12 text-white">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7 sm:p-8">
          {!completed ? (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <KeyRound size={22} />
              </div>

              <h1 className="mt-6 text-3xl font-bold">
                Create new password
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Choose a new password for your InterviewLab account.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-300"
                  >
                    New password
                  </label>

                  <input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Minimum 8 characters"
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmation"
                    className="text-sm font-medium text-slate-300"
                  >
                    Confirm password
                  </label>

                  <input
                    id="confirmation"
                    type="password"
                    required
                    minLength={8}
                    value={confirmation}
                    onChange={(event) =>
                      setConfirmation(event.target.value)
                    }
                    placeholder="Repeat your password"
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:bg-slate-800"
                >
                  {isLoading && (
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                    />
                  )}

                  {isLoading
                    ? "Updating..."
                    : "Set new password"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <CheckCircle2
                size={48}
                className="mx-auto text-emerald-400"
              />

              <h1 className="mt-6 text-3xl font-bold">
                Password updated
              </h1>

              <p className="mt-3 text-sm text-slate-400">
                Taking you back to InterviewLab...
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
