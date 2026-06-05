"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MahasantriSearch from "@/components/mahasantri/mahasantri-search";
import MahasantriTable from "@/components/mahasantri/mahasantri-table";

import {
  Mahasantri,
  getMahasantriList,
  searchMahasantri,
} from "@/services/mahasantri.service";

export default function MahasantriPage() {
  const router = useRouter();
  const [data, setData] = useState<Mahasantri[]>([]);
  const [loading, setLoading] = useState(true);
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
    loadData(currentPage, query);
  }, [currentPage, query]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setQuery(searchTerm);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Data Mahasantri
        </h1>

        <p className="text-muted-foreground">
          Daftar seluruh mahasantri.
        </p>
      </div>

      <MahasantriSearch
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <Card className="overflow-hidden">
        <MahasantriTable
          data={data}
          loading={loading}
          rowNumberStart={1}
          onDetail={(id) => router.push(`/dashboard/mahasantri/${id}`)}
        />
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Halaman {currentPage} dari {lastPage}
        </div>

        <Button
          variant="outline"
          disabled={currentPage >= lastPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}