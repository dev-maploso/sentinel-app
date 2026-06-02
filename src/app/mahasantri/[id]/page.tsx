"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getMahasantri } from "@/services/mahasantri.service";

interface DetailMahasantri {
  id: number;
  name: string;
  nim: string;
  kamar?: { nama_kamar: string };
  komplek?: { nama_komplek: string };
  pondok?: { nama_pondok: string };
}

export default function MahasantriDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [data, setData] = useState<DetailMahasantri | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      const res = await getMahasantri(id);
      setData(res);
    } catch (err) {
      console.error(err);
      router.replace("/mahasantri");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <p>Data tidak ditemukan</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-xl space-y-4">
        <button
          onClick={() => router.back()}
          className="text-sm text-blue-500"
        >
          ← Kembali
        </button>

        <h1 className="text-xl font-semibold">Detail Mahasantri</h1>

        <div className="border rounded-lg p-4 space-y-2 bg-white dark:bg-zinc-900">
          <div>
            <span className="text-zinc-500 text-sm">Nama</span>
            <p className="font-medium">{data.name}</p>
          </div>

          <div>
            <span className="text-zinc-500 text-sm">NIM</span>
            <p className="font-medium">{data.nim}</p>
          </div>

          <div>
            <span className="text-zinc-500 text-sm">Kamar</span>
            <p>{data.kamar?.nama_kamar || "-"}</p>
          </div>

          <div>
            <span className="text-zinc-500 text-sm">Komplek</span>
            <p>{data.komplek?.nama_komplek || "-"}</p>
          </div>

          <div>
            <span className="text-zinc-500 text-sm">Pondok</span>
            <p>{data.pondok?.nama_pondok || "-"}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}