"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  FileText,
  GitCompareArrows,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  MessageSquare,
  Settings,
  Sparkles,
  UserRound,
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

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        setEmail(user.email);
      }
    }

    void loadUser();
  }, []);

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

  const initials = email
    ? email.charAt(0).toUpperCase()
    : "U";

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-slate-800/80 bg-slate-950/90 px-4 py-6 backdrop-blur-xl lg:flex">
      <Link
        href="/dashboard"
        className="flex items-center gap-3 px-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/20">
          <Sparkles size={20} />
        </div>

        <div>
          <p className="text-lg font-bold tracking-tight text-white">
            InterviewLab
          </p>

          <p className="text-xs text-slate-500">
            AI Interview Coach
          </p>
        </div>
      </Link>

      <nav className="mt-10 flex flex-1 flex-col gap-1.5">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
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
                    : "transition group-hover:text-blue-400"
                }
              />

              <span className="flex-1">
                {item.name}
              </span>

              {active && (
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 pt-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl px-3 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-sm font-bold text-slate-200">
            {email ? (
              initials
            ) : (
              <UserRound size={18} />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xs text-slate-500">
              Signed in as
            </p>

            <p className="truncate text-sm font-medium text-slate-300">
              {email || "Loading..."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSigningOut ? (
            <LoaderCircle
              size={19}
              className="animate-spin"
            />
          ) : (
            <LogOut size={19} />
          )}

          {isSigningOut
            ? "Signing out..."
            : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
