"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { session: "1", score: 62 },
  { session: "2", score: 68 },
  { session: "3", score: 66 },
  { session: "4", score: 73 },
  { session: "5", score: 78 },
  { session: "6", score: 82 },
  { session: "7", score: 84 },
];

export default function ProgressChart() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Interview progress
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your overall score across recent practice sessions
        </p>
      </div>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />

            <XAxis
              dataKey="session"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[50, 100]}
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
              labelStyle={{
                color: "#94a3b8",
              }}
            />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                fill: "#3b82f6",
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
    </div>
  );
}
