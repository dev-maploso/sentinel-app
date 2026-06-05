"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MahasantriTable from "@/components/mahasantri/mahasantri-table";

import {
  Mahasantri,
  getMahasantriList,
} from "@/services/mahasantri.service";

export default function MahasantriPage() {
  const router = useRouter();
  const [data, setData] = useState<Mahasantri[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const loadData = async (page: number) => {
    try {
      setLoading(true);

      const res = await getMahasantriList(page);

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
    loadData(1);
  }, []);

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

      <Card className="overflow-hidden">
        <MahasantriTable
          data={data}
          loading={loading}
          onDetail={(id) => router.push(`/dashboard/mahasantri/${id}`)}
        />
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() =>
            loadData(currentPage - 1)
          }
        >
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Halaman {currentPage} dari {lastPage}
        </div>

        <Button
          variant="outline"
          disabled={currentPage >= lastPage}
          onClick={() =>
            loadData(currentPage + 1)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}