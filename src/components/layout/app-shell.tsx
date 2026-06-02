import { ReactNode } from "react";

import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <AppSidebar />

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader />

          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}