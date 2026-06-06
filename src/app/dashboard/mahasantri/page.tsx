"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import MahasantriSearch from "@/components/mahasantri/mahasantri-search";
import MahasantriTable from "@/components/mahasantri/mahasantri-table";

import {
  Mahasantri,
  getMahasantriList,
  searchMahasantri,
  getAllMahasantri,
  getTotalMahasantri,
} from "@/services/mahasantri.service";
import { exportMahasantriToExcel } from "@/lib/export";

export default function MahasantriPage() {
  const router = useRouter();

  const [data, setData] = useState<Mahasantri[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [totalData, setTotalData] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const loadData = async (page: number, queryValue: string) => {
    try {
      setLoading(true);

      const res = queryValue
        ? await searchMahasantri(queryValue, page)
        : await getMahasantriList(page);

      setData(res.data);
      setCurrentPage(res.meta.current_page);
      setLastPage(res.meta.last_page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch total data mahasantri once on mount
    const fetchTotal = async () => {
      try {
        const total = await getTotalMahasantri();
        setTotalData(total);
      } catch (error) {
        console.error('Failed to fetch total:', error);
      }
    };

    fetchTotal();
  }, []);

  useEffect(() => {
    loadData(currentPage, query);
  }, [currentPage, query]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setQuery(searchTerm);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleExport = async () => {
    try {
      setExportLoading(true);
      // Fetch semua data mahasantri
      const allData = await getAllMahasantri();
      const timestamp = new Date().toISOString().split('T')[0];
      exportMahasantriToExcel(allData, undefined, `mahasantri-${timestamp}.xlsx`);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Mahasantri
        </h1>

        <p className="text-sm text-zinc-500">
          Kelola data seluruh mahasantri pondok pesantren.
        </p>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="text-sm text-emerald-600 font-medium">
            Total data: {totalData}
          </div>
          <Button
            onClick={handleExport}
            disabled={exportLoading}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
          >
            {exportLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengexport...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export ke Excel
              </>
            )}
          </Button>
        </div>
      </div>

      {/* SEARCH */}
      <MahasantriSearch
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {/* TABLE (NO CARD WRAPPER) */}
      <MahasantriTable
        data={data}
        loading={loading}
        rowNumberStart={(currentPage - 1) * 10 + 1}
        onDetail={(id) =>
          router.push(`/dashboard/mahasantri/${id}`)
        }
      />

      {/* PAGINATION */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          className="rounded-xl"
          disabled={currentPage <= 1 || loading}
          onClick={() =>
            setCurrentPage((prev) => prev - 1)
          }
        >
          Previous
        </Button>

        <div className="text-sm text-zinc-500">
          Halaman{" "}
          <span className="font-medium text-zinc-900">
            {currentPage}
          </span>{" "}
          dari{" "}
          <span className="font-medium text-zinc-900">
            {lastPage}
          </span>
        </div>

        <Button
          variant="outline"
          className="rounded-xl"
          disabled={
            currentPage >= lastPage || loading
          }
          onClick={() =>
            setCurrentPage((prev) => prev + 1)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}