"use client";

import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  const router = useRouter();

  const { user, logout } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((x) => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 rounded-xl p-1 hover:bg-muted transition">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="hidden text-left md:block">
            <p className="text-sm font-medium">
              {user?.name ?? "User"}
            </p>

            <p className="text-xs text-muted-foreground">
              {user?.email ?? "-"}
            </p>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        <DropdownMenuLabel>
          Akun Saya
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profil
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}