"use client";

import Image from "next/image";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import AppSidebar from "./app-sidebar";
import UserMenu from "./user-menu";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/90 backdrop-blur-md">
      <div className="flex h-18 items-center justify-between px-4 md:px-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="rounded-xl border border-zinc-200 bg-white p-2.5 shadow-sm transition hover:bg-zinc-50 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-72 p-0"
            >
              <SheetTitle className="sr-only">
                Navigation Menu
              </SheetTitle>

              <AppSidebar mobile />
            </SheetContent>
          </Sheet>

          {/* Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Sentinel"
              width={42}
              height={42}
              priority
              className="h-10 w-10 object-contain"
            />

            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight text-zinc-900">
                SENTINEL
              </h1>

              <p className="text-xs text-emerald-600">
                Sistem Informasi Mahasantri
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}