"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {useAuth }from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <DashboardLayout>
      <h1 className="text-xl font-semibold mb-4">Dashboard</h1>

      <p className="mb-4">Halo, {user.name}</p>

      <button
        onClick={async () => {
          await logout();
          router.replace("/login");
        }}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </DashboardLayout>
  );
}