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

type Point = {
  label: string;
  score: number;
};

export default function ProgressChart({
  data,
}: {
  data: Point[];
}) {
  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-[#667176]">
        Complete an interview to start tracking progress.
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -18,
            bottom: 0,
          }}
        >
          <CartesianGrid
            stroke="#eef1f5"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#94a3b8",
              fontSize: 11,
            }}
          />

          <YAxis
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#94a3b8",
              fontSize: 11,
            }}
          />

          <Tooltip
            cursor={{
              stroke: "#e2e8f0",
            }}
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5eaf0",
              borderRadius: "8px",
              boxShadow:
                "0 8px 24px rgba(15,23,42,0.08)",
              fontSize: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#4f46e5"
            strokeWidth={2.5}
            dot={{
              fill: "#ffffff",
              stroke: "#4f46e5",
              strokeWidth: 2,
              r: 3,
            }}
            activeDot={{
              fill: "#4f46e5",
              stroke: "#ffffff",
              strokeWidth: 2,
              r: 5,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
