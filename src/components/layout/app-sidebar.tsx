"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
  Users,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Mahasantri",
    href: "/dashboard/mahasantri",
    icon: Users,
  },
  {
    title: "Kelas",
    href: "/dashboard/kelas",
    icon: GraduationCap,
  },
  {
    title: "Izin Keluar",
    href: "/dashboard/izin_pulang",
    icon: CalendarCheck,
  },
];

type AppSidebarProps = {
  mobile?: boolean;
};

export default function AppSidebar({
  mobile = false,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={
        mobile
          ? "flex h-full w-full flex-col bg-white"
          : "hidden w-72 shrink-0 border-r border-zinc-200 bg-white md:flex md:flex-col"
      }
    >
      {/* Header */}
      <div className="border-b border-zinc-100 px-6 py-5">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Sentinel"
            width={48}
            height={48}
            priority
            className="h-12 w-12 object-contain"
          />

          <div>
            <h1 className="text-lg font-bold tracking-tight text-zinc-900">
              SENTINEL
            </h1>

            <p className="text-xs text-emerald-600">
              Sistem Informasi Mahasantri
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Main Menu
        </p>

        <ul className="space-y-1.5">
          {menus.map((menu) => {
            const Icon = menu.icon;

            const active =
              menu.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === menu.href ||
                  pathname.startsWith(`${menu.href}/`);

            return (
              <li key={menu.href}>
                <Link
                  href={menu.href}
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-100"
                      : "text-zinc-600 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${
                      active
                        ? "text-white"
                        : "text-zinc-400 group-hover:text-emerald-600"
                    }`}
                  />

                  <span>{menu.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="border-t border-zinc-100 p-4">
        <div className="rounded-2xl bg-emerald-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                Sentinel
              </p>

              <p className="text-xs text-emerald-600">
                Version 1.1.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}