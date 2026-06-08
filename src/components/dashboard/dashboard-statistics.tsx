"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDashboardStatistik, StatItem } from "@/services/dashboard.service";

function StatistikTable({
  title,
  description,
  data,
}: {
  title: string;
  description: string;
  data: StatItem[];
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-0 py-0">
        <Table className="min-w-full">
          <TableHeader className="bg-emerald-50">
            <TableRow>
              <TableHead className="w-2/3">Label</TableHead>
              <TableHead className="w-1/3">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item) => (
                <TableRow key={`${item.id ?? "null"}-${item.label}`}>
                  <TableCell className="font-medium text-zinc-900">
                    {item.label}
                  </TableCell>
                  <TableCell className="text-zinc-600">{item.total}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-zinc-500">
                  Belum ada data statistik.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function DashboardStatistics() {
  const [data, setData] = useState<{
    per_kamar: StatItem[];
    per_komplek: StatItem[];
    per_pondok: StatItem[];
  }>({ per_kamar: [], per_komplek: [], per_pondok: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const statistik = await getDashboardStatistik();
        setData(statistik);
      } catch (error) {
        console.error("Failed to load dashboard statistik", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-zinc-900">Statistik Mahasantri</h2>
        <p className="text-sm text-zinc-500">
          Ringkasan jumlah mahasantri per pondok, per komplek, dan per kamar.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-6 text-center text-sm text-zinc-500">
          Memuat statistik...
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-3">
          <StatistikTable
            title="Per Pondok"
            description="Jumlah mahasantri di setiap pondok pesantren."
            data={data.per_pondok}
          />
          <StatistikTable
            title="Per Komplek"
            description="Jumlah mahasantri di setiap komplek."
            data={data.per_komplek}
          />
          <StatistikTable
            title="Per Kamar"
            description="Jumlah mahasantri di setiap kamar."
            data={data.per_kamar}
          />
        </div>
      )}
    </section>
  );
}
