"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  title: string;
  data: { label: string; total: number }[];
}

export default function ChartBox({ title, data }: Props) {
  return (
    <div className="p-4 rounded-xl border bg-white dark:bg-zinc-900">
      <h2 className="font-semibold mb-4">{title}</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#6366f1" radius={6} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}