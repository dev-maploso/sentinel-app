"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import IzinPulangTable from "@/components/izinpulang/izinpulang-table";
import { getIzinPulangList, IzinPulangItem } from "@/services/izinpulang.service";

export default function IzinPulangPage() {
  const [data, setData] = useState<IzinPulangItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const loadData = async (page: number) => {
    try {
      setLoading(true);
      const response = await getIzinPulangList(page);
      setData(response.data);
      setCurrentPage(response.pagination.current_page);
      setLastPage(response.pagination.last_page);
      setTotalData(response.pagination.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage]);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Izin Keluar
        </h1>
        <p className="text-sm text-zinc-500">
          Daftar permohonan izin keluar mahasantri.
        </p>
      </div>

      {/* <Card className="rounded-3xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">
              Total Permohonan: {totalData}
            </p>
            <p className="text-xs text-zinc-500">
              Menampilkan data izin pulang sesuai halaman.
            </p>
          </div>
          <div className="text-sm text-zinc-500">
            Halaman {currentPage} dari {lastPage}
          </div>
        </div>
      </Card> */}

      <IzinPulangTable
        data={data}
        loading={loading}
        rowNumberStart={(currentPage - 1) * 15 + 1}
      />

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          className="rounded-xl"
          disabled={currentPage <= 1 || loading}
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>

        <div className="text-sm text-zinc-500">
          Halaman <span className="font-medium text-zinc-900">{currentPage}</span> dari <span className="font-medium text-zinc-900">{lastPage}</span>
        </div>

        <Button
          variant="outline"
          className="rounded-xl"
          disabled={currentPage >= lastPage || loading}
          onClick={() => setCurrentPage((prev) => Math.min(lastPage, prev + 1))}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {loading && (
        <div className="rounded-3xl border bg-white p-6 text-center shadow-sm">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-600" />
        </div>
      )}
    </div>
  );
}
