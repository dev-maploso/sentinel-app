"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      let message = "Login gagal";

      if (err instanceof AxiosError && err.response?.data) {
        const data = err.response.data as { message?: string };
        message = data.message ?? message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-800 p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6 text-zinc-800 dark:text-white">
          Login
        </h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-zinc-600 dark:text-zinc-300">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              placeholder="email@kamu.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div>
            <label className="text-sm text-zinc-600 dark:text-zinc-300">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
              placeholder="********"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-black text-white hover:bg-zinc-800 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}