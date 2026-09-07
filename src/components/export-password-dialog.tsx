"use client";

import { useState } from "react";
import { ArrowRight, Download, Eye, EyeOff, LockKeyhole, X } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ExportPasswordDialogProps {
  open: boolean;
  loading?: boolean;
  title: string;
  expectedPassword: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
}

export default function ExportPasswordDialog({
  open,
  loading = false,
  title,
  expectedPassword,
  onOpenChange,
  onConfirm,
}: ExportPasswordDialogProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (!open) {
    return null;
  }

  const close = () => {
    setPassword("");
    setShowPassword(false);
    setError("");
    onOpenChange(false);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password.trim()) {
      setError("Password wajib diisi.");
      return;
    }

    if (password !== expectedPassword) {
      setError("Password salah. Silakan coba lagi.");
      return;
    }

    setError("");
    await onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 px-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Tutup dialog"
        className="absolute inset-0 cursor-default"
        onClick={close}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-password-title"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-emerald-950/20"
      >
        <div className="bg-linear-to-br from-emerald-700 via-emerald-600 to-teal-500 px-6 pb-8 pt-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
              <Download className="h-6 w-6" />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Tutup dialog"
              className="text-white hover:bg-white/15 hover:text-white"
              onClick={close}
            >
              <X />
            </Button>
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
            Data terlindungi
          </p>
          <h2 id="export-password-title" className="mt-1 text-2xl font-bold">
            {title}
          </h2>
          <p className="mt-2 text-sm text-emerald-50">
            Masukkan password untuk mengunduh file Excel.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5 p-6">
          <div>
            <label htmlFor="export-password" className="mb-2 block text-sm font-semibold text-zinc-800">
              Password export
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                id="export-password"
                autoFocus
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Masukkan password"
                className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-11 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
              <button
                type="button"
                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-700"
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              disabled={loading}
              onClick={close}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-emerald-600 px-4 text-white hover:bg-emerald-700"
            >
              {loading ? "Menyiapkan..." : "Lanjut export"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}