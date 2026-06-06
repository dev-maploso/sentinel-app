"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import KelasSearch from "@/components/kelas/kelas-search";
import KelasTable from "@/components/kelas/kelas-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  getKelasRegistrasi,
  Kelas,
  RegistrasiResponse,
  RegistrasiItem,
} from "@/services/kelas.service";

export default function KelasPage() {
  const [data, setData] = useState<RegistrasiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState<Kelas[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const perPage = 20;
  const [selectedKelasKode, setSelectedKelasKode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [allData, setAllData] = useState<RegistrasiItem[]>([]);

  const load = async (page: number, kodeKelas: string | null = null) => {
    try {
      setLoading(true);
      const res: RegistrasiResponse = await getKelasRegistrasi(
        page,
        kodeKelas ?? undefined
      );

      setData(res.data);
      setCurrentPage(res.meta.current_page);
      setLastPage(res.meta.last_page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadAllClasses = async () => {
    try {
      const firstPage = await getKelasRegistrasi(1);
      const kelasMap = new Map<number, Kelas>();
      const registrations: RegistrasiItem[] = [...firstPage.data];

      firstPage.data.forEach((item) => {
        if (item.kelas) {
          kelasMap.set(item.kelas.id, item.kelas);
        }
      });

      if (firstPage.meta.last_page > 1) {
        const otherPages = Array.from(
          { length: firstPage.meta.last_page - 1 },
          (_, index) => index + 2
        );

        const results = await Promise.all(
          otherPages.map((page) => getKelasRegistrasi(page))
        );

        results.forEach((pageResult) => {
          pageResult.data.forEach((item) => {
            if (item.kelas) {
              kelasMap.set(item.kelas.id, item.kelas);
            }

            registrations.push(item);
          });
        });
      }

      setClasses(Array.from(kelasMap.values()));
      setAllData(registrations);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load(currentPage, selectedKelasKode);
  }, [currentPage, selectedKelasKode]);

  useEffect(() => {
    loadAllClasses();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedKelasKode]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }

    const query = searchTerm.toLowerCase();
    const source = allData.length ? allData : data;

    return source.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.nim.toLowerCase().includes(query);

      const matchesClass = selectedKelasKode
        ? item.kelas?.kode_kelas === selectedKelasKode
        : true;

      return matchesSearch && matchesClass;
    });
  }, [data, allData, searchTerm, selectedKelasKode]);

  const displayLastPage = useMemo(() => {
    if (!searchTerm.trim()) {
      return lastPage;
    }

    return Math.max(1, Math.ceil(filteredData.length / perPage));
  }, [filteredData.length, lastPage, perPage, searchTerm]);

  useEffect(() => {
    if (currentPage > displayLastPage) {
      setCurrentPage(displayLastPage);
    }
  }, [currentPage, displayLastPage]);

  const displayData = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }

    const startIndex = (currentPage - 1) * perPage;
    return filteredData.slice(startIndex, startIndex + perPage);
  }, [data, filteredData, currentPage, perPage, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">
          Data Kelas
        </h1>
        <p className="text-sm text-zinc-500">
          Daftar registrasi mahasantri per kelas
        </p>
      </div>

      <KelasSearch
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {/* Filter Card */}
      <Card className="rounded-3xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-emerald-700">
              Filter Data
            </h3>
            <p className="text-xs text-zinc-500">
              Pilih kelas untuk memfilter data
            </p>
          </div>

          <select
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 md:w-64"
            value={selectedKelasKode ?? ""}
            onChange={(e) => {
              setSelectedKelasKode(e.target.value || null);
              setCurrentPage(1);
            }}
          >
            <option value="">Semua Kelas</option>

            {(classes.length > 0
              ? classes
              : Array.from(
                  new Map(
                    data
                      .filter((d) => d.kelas)
                      .map((d) => [d.kelas!.id, d.kelas!])
                  ).values()
                )
            ).map((k) => (
              <option key={k.id} value={k.kode_kelas}>
                {k.nama_kelas}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        <KelasTable
          data={displayData}
          loading={loading}
          rowNumberStart={(currentPage - 1) * perPage + 1}
        />
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() =>
            setCurrentPage((p) => Math.max(1, p - 1))
          }
          className="rounded-2xl"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>

        <div className="text-sm text-zinc-500">
          Halaman{" "}
          <span className="font-semibold text-zinc-900">
            {currentPage}
          </span>{" "}
          dari {displayLastPage}
        </div>

        <Button
          variant="outline"
          disabled={currentPage >= displayLastPage}
          onClick={() =>
            setCurrentPage((p) => Math.min(displayLastPage, p + 1))
          }
          className="rounded-2xl"
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}