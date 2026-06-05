"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      let message = "Login gagal";

      if (err instanceof AxiosError && err.response?.data) {
        const data = err.response.data as {
          message?: string;
        };

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="relative hidden lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-500" />

          <div className="relative z-10 flex flex-col justify-between p-12 text-white">
            <div>
  <div className="flex items-center gap-4">
    <div className="flex items-center justify-center rounded-2xl bg-white/10 p-2 backdrop-blur-sm">
      <Image
        src="/logo.png"
        alt="Sentinel Logo"
        width={80}
        height={80}
        priority
        className="h-20 w-20 object-contain"
      />
    </div>

    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        SENTINEL
      </h1>

      <p className="text-sm text-emerald-100">
        Sistem Informasi Mahasantri
      </p>
    </div>
  </div>
</div>

            <div className="max-w-lg">
              <h2 className="mb-4 text-5xl font-bold leading-tight">
                Lihat Data Mahasantri Lebih Mudah
              </h2>

              <p className="text-lg text-emerald-100 leading-relaxed">
                Platform modern untuk memantau mahasantri, kelas, akademik, dan
                administrasi pondok secara terintegrasi.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm text-emerald-50 italic">
                &quot;Ilmu adalah cahaya, dan cahaya Allah tidak diberikan
                kepada pelaku maksiat.&quot;
              </p>

              <p className="mt-2 text-xs text-emerald-200">
                — Imam Asy-Syafi&apos;i
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border bg-white p-8 shadow-xl">
              {/* Mobile Logo */}
              <div className="mb-8 flex flex-col items-center lg:hidden">
                <div className="mb-4">
                  <Image
                    src="/logo.png"
                    alt="Sentinel Logo"
                    width={80}
                    height={80}
                    className="h-20 w-20 object-contain"
                    priority
                  />
                </div>

                <h1 className="text-3xl font-bold tracking-tight">SENTINEL</h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Sistem Informasi Mahasantri
                </p>
              </div>

              {/* Heading */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-zinc-900">
                  Selamat Datang
                </h2>

                <p className="mt-2 text-zinc-500">
                  Masuk untuk melanjutkan ke dashboard.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="admin@sentinel.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  {loading ? "Memproses..." : "Masuk ke Dashboard"}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 border-t pt-4 text-center text-sm text-zinc-500">
                Sentinel © {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
