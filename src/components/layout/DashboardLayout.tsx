"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-zinc-950 overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MAIN */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* NAVBAR */}
        <Navbar onToggleSidebar={() => setOpen(!open)} />

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}