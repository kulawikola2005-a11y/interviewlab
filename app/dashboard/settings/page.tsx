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

      <div className="px-5 py-6 sm:px-6 lg:ml-[248px] lg:px-8 lg:py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dfeae6] text-[#17685d]">
              <Settings size={23} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#17685d]">
                Settings
              </p>

              <h1 className="mt-2 text-3xl font-bold text-[#202522]">
                Account settings
              </h1>

              <p className="mt-3 text-[#667176]">
                Manage your InterviewLab account and preferences.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <section className="rounded-3xl border border-[#d1d4cf] bg-[#f2f3ef] p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dfeae6] text-[#17685d]">
                  <UserRound size={20} />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-[#202522]">
                    Profile
                  </h2>

                  <p className="mt-1 text-sm text-[#7A858A]">
                    Your account information
                  </p>

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7A858A]">
                      Email
                    </p>

                    <p className="mt-2 text-[#2A3134]">
                      {user?.email ?? "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#d1d4cf] bg-[#f2f3ef] p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e3ece8] text-[#287267]">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#202522]">
                    Privacy
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#667176]">
                    Your CV analyses and interview sessions are linked to your
                    account and protected using database access policies.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#d1d4cf] bg-[#f2f3ef] p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4e8e5] text-[#5d6963]">
                  <Bell size={20} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#202522]">
                    Notifications
                  </h2>

                  <p className="mt-2 text-sm text-[#667176]">
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
