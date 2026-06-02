"use client";

import { Menu } from "lucide-react";

interface Props {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: Props) {
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b bg-white dark:bg-zinc-900">
      <button
        onClick={onToggleSidebar}
        className="md:hidden p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <Menu size={20} />
      </button>

      <h1 className="font-semibold">Dashboard</h1>

      <div className="text-sm text-zinc-500">Admin</div>
    </header>
  );
}