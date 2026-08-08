import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
};

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/80">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/10" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-white">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-500/10 bg-blue-500/10 text-blue-400 transition group-hover:scale-105">
          <Icon size={21} />
        </div>
      </div>

      <p className="relative mt-4 text-sm text-slate-500">
        {change}
      </p>
    </div>
  );
}
