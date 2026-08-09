import {
  Bell,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import Sidebar from "@/src/components/dashboard/Sidebar";
import { createClient } from "@/src/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen text-white">
      <Sidebar />

      <div className="px-5 py-6 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Settings size={23} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                Settings
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                Account settings
              </h1>

              <p className="mt-3 text-slate-400">
                Manage your InterviewLab account and preferences.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <UserRound size={20} />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">
                    Profile
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your account information
                  </p>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                      Email
                    </p>

                    <p className="mt-2 text-slate-200">
                      {user?.email ?? "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Privacy
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    Your CV analyses and interview sessions are linked to your
                    account and protected using database access policies.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <Bell size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Notifications
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Notification preferences will be available in a future
                    version of InterviewLab.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
