import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  BarChart3,
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
    href: "/dashboard/interviews",
    icon: MessageSquare,
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
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 px-4 py-6">
      <div className="flex items-center gap-3 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
          <Sparkles size={20} />
        </div>

        <div>
          <p className="text-lg font-bold text-white">InterviewLab</p>
          <p className="text-xs text-slate-500">AI Interview Coach</p>
        </div>
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <Icon size={19} />
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
