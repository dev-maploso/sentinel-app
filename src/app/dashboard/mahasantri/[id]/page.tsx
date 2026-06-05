"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Data tidak ditemukan</p>;
  }

  return (
      <div className="max-w-2xl space-y-4">
        <button
          onClick={() => router.push("/dashboard/mahasantri")}
          className="text-sm text-blue-500"
        >
          ← Kembali ke Daftar
        </button>

        <h1 className="text-xl font-semibold">Detail Mahasantri (Dashboard)</h1>

        <div className="border rounded-lg p-4 space-y-2 bg-white dark:bg-zinc-900">
          <div>
            <span className="text-zinc-500 text-sm">Nama</span>
            <p className="font-medium">{data.name}</p>
          </div>

          <div>
            <span className="text-zinc-500 text-sm">NIM</span>
            <p className="font-medium">{data.nim}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-500 text-sm">Pondok</span>
              <p>{data.pondok?.nama_pondok || "-"}</p>
            </div>

            <div>
              <span className="text-zinc-500 text-sm">Komplek</span>
              <p>{data.komplek?.nama_komplek || "-"}</p>
            </div>

            <div>
              <span className="text-zinc-500 text-sm">Kamar</span>
              <p>{data.kamar?.nama_kamar || "-"}</p>
            </div>

            <div>
              <span className="text-zinc-500 text-sm">Tanggal Lahir</span>
              <p>{data.tanggal_lahir || "-"}</p>
            </div>
          </div>

          <div>
            <span className="text-zinc-500 text-sm">Nama Ayah</span>
            <p>{data.nama_ayah || "-"}</p>
          </div>

          <div>
            <span className="text-zinc-500 text-sm">Nama Ibu</span>
            <p>{data.nama_ibu || "-"}</p>
          </div>
        </div>
      </div>
  );
}
