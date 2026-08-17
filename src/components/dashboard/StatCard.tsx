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
    <div className="group rounded-[18px] border border-[#c7cdca] bg-[#f4f5f2] p-6 transition duration-200 hover:border-[#aeb9b4] hover:bg-[#eef1ee]">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-medium text-[#667176]">
            {title}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#20282b]">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dfe9e5] text-[#17685d]">
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-5 text-sm text-[#78858a]">
        {change}
      </p>
    </div>
  );
}
