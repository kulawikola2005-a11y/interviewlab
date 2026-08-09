"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  FileText,
  GitCompareArrows,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Sparkles,
  X,
} from "lucide-react";

import { createClient } from "@/src/lib/supabase/client";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "CV Analysis",
    href: "/dashboard/cv",
    icon: FileText,
  },
  {
    name: "Mock Interviews",
    href: "/dashboard/interview/new",
    icon: MessageSquare,
  },
  {
    name: "Progress",
    href: "/dashboard/progress",
    icon: BarChart3,
  },
  {
    name: "Compare CVs",
    href: "/dashboard/compare",
    icon: GitCompareArrows,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function MobileNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    if (href === "/dashboard/interview/new") {
      return pathname.startsWith("/dashboard/interview");
    }

    return pathname.startsWith(href);
  }

  async function handleSignOut() {
    setIsSigningOut(true);

    const supabase = createClient();

    await supabase.auth.signOut();

    window.sessionStorage.removeItem(
      "interviewlab-current-interview"
    );

    window.sessionStorage.removeItem(
      "interviewlab-resume-context"
    );

    router.replace("/login");
    router.refresh();
  }

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/90 px-5 py-4 backdrop-blur-xl lg:hidden">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
            <Sparkles size={18} />
          </div>

          <span className="font-bold text-white">
            InterviewLab
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-300"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <aside className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col border-l border-slate-800 bg-slate-950 p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
                  <Sparkles size={19} />
                </div>

                <div>
                  <p className="font-bold text-white">
                    InterviewLab
                  </p>

                  <p className="text-xs text-slate-500">
                    AI Interview Coach
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-900 hover:text-white"
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mt-8 flex flex-1 flex-col gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-blue-500/10 text-white"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <Icon
                      size={19}
                      className={
                        active
                          ? "text-blue-400"
                          : ""
                      }
                    />

                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex items-center gap-3 rounded-xl border-t border-slate-800 px-4 py-4 text-sm font-medium text-slate-500 transition hover:text-red-400 disabled:opacity-50"
            >
              <LogOut size={19} />
              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          </aside>
        </div>
      )}
    </>
  );
}
