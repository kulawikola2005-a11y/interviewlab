"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart3,
  FileText,
  GitCompareArrows,
  Home,
  LoaderCircle,
  LogOut,
  MessageSquare,
  Settings,
  Sparkle,
  UserRound,
} from "lucide-react";

import { createClient } from "@/src/lib/supabase/client";

const navigation = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Interview",
    href: "/dashboard/interview/new",
    icon: MessageSquare,
  },
  {
    name: "Resume",
    href: "/dashboard/cv",
    icon: FileText,
  },
  {
    name: "Compare",
    href: "/dashboard/compare",
    icon: GitCompareArrows,
  },
  {
    name: "Progress",
    href: "/dashboard/progress",
    icon: BarChart3,
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

  const displayName = email
    ? email.split("@")[0]
    : "Account";

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col overflow-hidden bg-[#073f39] text-white lg:flex">
      {/* subtle sidebar depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(45,138,120,0.18),transparent_32%)]" />

      <div className="relative flex min-h-0 flex-1 flex-col px-5 py-6">
        {/* LOGO */}

        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-1"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#16806f] text-sm font-bold tracking-tight text-white shadow-sm">
            IL
          </div>

          <div>
            <p className="text-[16px] font-semibold tracking-[-0.02em] text-white">
              InterviewLab
            </p>

            <p className="mt-0.5 text-[10px] text-white/45">
              Interview preparation
            </p>
          </div>
        </Link>

        {/* NAVIGATION */}

        <nav className="mt-9 flex flex-col gap-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-[#176c60] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                    : "text-white/70 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <Icon
                  size={19}
                  strokeWidth={active ? 2 : 1.8}
                  className={
                    active
                      ? "text-white"
                      : "text-white/55 transition group-hover:text-white/85"
                  }
                />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* PRO TIP */}

        <div className="mt-8 border-t border-white/10 pt-7">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <div className="flex items-center gap-2">
              <Sparkle
                size={16}
                className="text-[#efc56b]"
                fill="currentColor"
              />

              <p className="text-sm font-semibold text-white">
                Pro tip
              </p>
            </div>

            <p className="mt-3 text-xs leading-5 text-white/60">
              Consistency is key. Practice a little every day to see better
              results.
            </p>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs font-semibold text-white/85">
                Weekly goal
              </p>

              <p className="text-[11px] text-white/45">
                3 / 5
              </p>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-3/5 rounded-full bg-[#4fae9b]" />
            </div>
          </div>
        </div>

        {/* pushes account area down */}
        <div className="min-h-5 flex-1" />

        {/* ACCOUNT */}

        <div className="border-t border-white/10 pt-4">
          <Link
            href="/dashboard/settings"
            className="group flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-white/[0.06]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#16806f] text-sm font-semibold text-white">
              {email ? initials : <UserRound size={17} />}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {displayName}
              </p>

              <p className="mt-0.5 text-[11px] text-white/45">
                View profile
              </p>
            </div>

            <span className="text-lg text-white/35 transition group-hover:translate-x-0.5 group-hover:text-white/70">
              ›
            </span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/65 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSigningOut ? (
              <LoaderCircle
                size={19}
                className="animate-spin"
              />
            ) : (
              <LogOut size={19} strokeWidth={1.8} />
            )}

            {isSigningOut ? "Signing out..." : "Log out"}
          </button>
        </div>
      </div>
    </aside>
  );
}
