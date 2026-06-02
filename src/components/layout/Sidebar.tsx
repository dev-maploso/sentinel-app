"use client";

import Link from "next/link";
import { X, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.replace("/login");
  };

  return (
    <>
      {/* overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-white dark:bg-zinc-900 border-r
          transform transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:z-auto
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Menu</h2>
          <button onClick={onClose} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-2">
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Dashboard
          </Link>

          <Link
            href="/mahasantri"
            className="block px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Mahasantri
          </Link>

          {/* 🔴 LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 mt-4"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
