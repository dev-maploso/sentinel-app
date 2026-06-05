"use client";

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
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              className="rounded-lg p-2 hover:bg-muted md:hidden"
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

            {/* Sidebar versi mobile */}
            <AppSidebar mobile />
          </SheetContent>
        </Sheet>

        {/* App Title */}
        <div>
          <h1 className="text-lg font-semibold">
            Sentinel
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <UserMenu />
      </div>
    </header>
  );
}