"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Loader2 } from "lucide-react";

import { getMahasantri, Mahasantri } from "@/services/mahasantri.service";

export default function DashboardMahasantriDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [data, setData] = useState<Mahasantri | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getMahasantri(id);
        setData(res);
      } catch (err) {
        console.error(err);
        router.replace("/dashboard/mahasantri");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-emerald-600" />
          <p className="mt-3 text-sm text-zinc-500">
            Memuat detail mahasantri...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
        <p className="text-zinc-600">Data tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.push("/dashboard/mahasantri")}
        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Daftar
      </button>

      {/* Header Card */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
            <User className="h-7 w-7 text-emerald-600" />
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-bold text-zinc-900">
              {data.name}
            </h1>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                NIM: {data.nim}
              </span>

              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600">
                Detail Mahasantri
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Data Pribadi */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-emerald-700">
            Data Pribadi
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-zinc-500">Nama</p>
              <p className="font-semibold text-zinc-900">
                {data.name}
              </p>
            </div>

            <div>
              <p className="text-zinc-500">Tempat / Tanggal Lahir</p>
              <p className="font-medium">
                {data.tempat_lahir || "-"} /{" "}
                {data.tanggal_lahir || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Akademik */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-emerald-700">
            Data Akademik
          </h2>

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-zinc-500">Pondok</p>
              <p className="font-medium">
                {data.pondok?.nama_pondok || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500">Komplek</p>
              <p className="font-medium">
                {data.komplek?.nama_komplek || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500">Kamar</p>
              <p className="font-medium">
                {data.kamar?.nama_kamar || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Keluarga */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm md:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-emerald-700">
            Data Keluarga
          </h2>

          <div className="grid gap-4 text-sm md:grid-cols-3">
            <div>
              <p className="text-zinc-500">Nama Ayah</p>
              <p className="font-medium">
                {data.nama_ayah || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500">Nama Ibu</p>
              <p className="font-medium">
                {data.nama_ibu || "-"}
              </p>
            </div>

            <div>
              <p className="text-zinc-500">No WA Orang Tua</p>
              <p className="font-medium">
                {data.no_wa_orang_tua || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}