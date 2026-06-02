import AppShell from "@/components/layout/app-shell";
import { ReactNode } from "react";


interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}