import { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  icon?: ReactNode;
}

export default function StatCard({ title, value, icon }: Props) {
  return (
    <div className="p-4 rounded-xl border bg-white dark:bg-zinc-900 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-zinc-500">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}