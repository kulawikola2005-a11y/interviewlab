import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  BarChart3,
  GitCompareArrows,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

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
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-slate-800/80 bg-slate-950/90 px-4 py-6 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-3 px-3">
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
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-1.5">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <Icon
                size={19}
                className="transition group-hover:text-blue-400"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-900 hover:text-white">
        <LogOut size={19} />
        Sign out
      </button>
    </aside>
  );
}
