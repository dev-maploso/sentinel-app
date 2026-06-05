"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
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
          ? "flex h-full flex-col bg-background"
          : "hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col"
      }
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-bold">
          Sentinel
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
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
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{menu.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground">
          Sentinel v1.0
        </p>
      </div>
    </aside>
  );
}