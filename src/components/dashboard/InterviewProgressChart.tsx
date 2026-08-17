"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ProgressPoint = {
  label: string;
  score: number;
};

export default function InterviewProgressChart({
  data,
}: {
  data: ProgressPoint[];
}) {
  if (data.length === 0) {
    return (
      <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-slate-800">
        <p className="text-sm text-slate-500">
          Complete an interview to start tracking progress.
        </p>
      </div>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            stroke="#64748b"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            domain={[0, 100]}
            stroke="#64748b"
            tickLine={false}
            axisLine={false}
            width={35}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid #1e293b",
              borderRadius: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#17685d"
            strokeWidth={3}
            dot={{
              fill: "#17685d",
              strokeWidth: 0,
              r: 4,
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
