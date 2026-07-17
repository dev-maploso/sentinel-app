"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import MahasantriSearch from "@/components/mahasantri/mahasantri-search";
import MahasantriTable from "@/components/mahasantri/mahasantri-table";
import MahasantriFilter from "@/components/mahasantri/mahasantri-filter";

import type {
  Mahasantri,
  MahasantriFilterParams,
  MahasantriFiltersResponse,
} from "@/types/mahasantri";

import { MahasantriService } from "@/services/mahasantri.service";

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

  const [filters, setFilters] =
    useState<MahasantriFiltersResponse | null>(null);

  const [filter, setFilter] =
    useState<MahasantriFilterParams>({});

  const loadData = async (
    page: number,
    keyword: string,
    filterValue: MahasantriFilterParams
  ) => {
    try {
      setLoading(true);

      const response = keyword
        ? await MahasantriService.search({
            query: keyword,
            page,
            ...filterValue,
          })
        : await MahasantriService.list({
            page,
            ...filterValue,
          });

      setData(response.data);
      setCurrentPage(response.meta.current_page);
      setLastPage(response.meta.last_page);
    } catch (error) {
      console.error("Failed to load mahasantri:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadTotal = async () => {
      try {
        const total = await MahasantriService.total();
        setTotalData(total);
      } catch (error) {
        console.error(error);
      }
    };

    loadTotal();
  }, []);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await MahasantriService.filters();
        setFilters(res);
      } catch (err) {
        console.error(err);
      }
    };

    loadFilters();
  }, []);

  useEffect(() => {
    loadData(currentPage, query, filter);
  }, [currentPage, query, filter]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentPage(1);
      setQuery(searchTerm);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleExport = async () => {
    try {
      setExportLoading(true);

      const allData = await MahasantriService.all();

      const filename = `mahasantri-${
        new Date().toISOString().split("T")[0]
      }.xlsx`;

      exportMahasantriToExcel(
        allData,
        undefined,
        filename
      );
    } catch (error) {
      console.error(error);
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
          <div className="text-sm font-medium text-emerald-600">
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

      <MahasantriSearch
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <MahasantriFilter
        filters={filters}
        value={filter}
        onChange={(value) => {
          setCurrentPage(1);
          setFilter(value);
        }}
      />

      <MahasantriTable
        data={data}
        loading={loading}
        rowNumberStart={(currentPage - 1) * 10 + 1}
        onDetail={(id) =>
          router.push(`/dashboard/mahasantri/${id}`)
        }
      />

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