"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hasCookie = document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("token="));

    if (hasCookie) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-semibold">
          Selamat datang 👋
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400">
          Silakan login untuk melanjutkan
        </p>

        <button
          onClick={() => router.push("/login")}
          className="px-6 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black"
        >
          Login
        </button>
        console.log(process.env.NEXT_PUBLIC_API_URL);
      </div>
    </div>
  );
}