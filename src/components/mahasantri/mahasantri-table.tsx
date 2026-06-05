"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Loader2,
  Eye,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Mahasantri } from "@/services/mahasantri.service";

type ToggleKey =
  | "nama_ayah"
  | "nama_ibu"
  | "no_wa_orang_tua"
  | "nama_wali"
  | "status_wali"
  | "pekerjaan_ayah"
  | "pekerjaan_ibu"
  | "pekerjaan_wali";

const extraColumns: {
  key: ToggleKey;
  label: string;
}[] = [
  { key: "nama_ayah", label: "Nama Ayah" },
  { key: "nama_ibu", label: "Nama Ibu" },
  { key: "no_wa_orang_tua", label: "No. WA Orang Tua" },
  { key: "nama_wali", label: "Nama Wali" },
  { key: "status_wali", label: "Status Wali" },
  { key: "pekerjaan_ayah", label: "Pekerjaan Ayah" },
  { key: "pekerjaan_ibu", label: "Pekerjaan Ibu" },
  { key: "pekerjaan_wali", label: "Pekerjaan Wali" },
];

interface MahasantriTableProps {
  data: Mahasantri[];
  loading?: boolean;
  onDetail?: (id: number) => void;
  rowNumberStart?: number;
}

export default function MahasantriTable({
  data,
  loading = false,
  onDetail,
  rowNumberStart = 1,
}: MahasantriTableProps) {
  const router = useRouter();

  const [visibleColumns, setVisibleColumns] =
    useState<Record<ToggleKey, boolean>>(
      () =>
        Object.fromEntries(
          extraColumns.map((column) => [
            column.key,
            false,
          ]),
        ) as Record<ToggleKey, boolean>,
    );

  const toggleColumn = (key: ToggleKey) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) {
    return (
      <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
        <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-emerald-600" />

        <h3 className="font-semibold text-zinc-900">
          Memuat Data Mahasantri
        </h3>

        <p className="mt-1 text-sm text-zinc-500">
          Mohon tunggu sebentar...
        </p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
          <Users className="h-8 w-8 text-emerald-600" />
        </div>

        <h3 className="font-semibold text-zinc-900">
          Data Mahasantri Kosong
        </h3>

        <p className="mt-1 text-sm text-zinc-500">
          Belum ada data mahasantri yang tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Column Filter */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="font-semibold text-zinc-900">
            Kolom Tambahan
          </h3>

          <p className="text-sm text-zinc-500">
            Pilih informasi yang ingin ditampilkan.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {extraColumns.map((column) => (
            <label
              key={column.key}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-zinc-200 px-4 py-3 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <input
                type="checkbox"
                checked={visibleColumns[column.key]}
                onChange={() =>
                  toggleColumn(column.key)
                }
                className="h-4 w-4 accent-emerald-600"
              />

              <span className="text-sm font-medium">
                {column.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-emerald-50">
              <TableRow>
                <TableHead className="w-20">
                  No
                </TableHead>

                <TableHead>NIM</TableHead>

                <TableHead>Nama</TableHead>

                <TableHead>Pondok</TableHead>

                <TableHead>Komplek</TableHead>

                <TableHead>Kamar</TableHead>

                <TableHead>
                  Tempat Lahir
                </TableHead>

                <TableHead>
                  Tanggal Lahir
                </TableHead>

                {extraColumns.map(
                  (column) =>
                    visibleColumns[column.key] && (
                      <TableHead key={column.key}>
                        {column.label}
                      </TableHead>
                    ),
                )}

                <TableHead className="text-right">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="transition-colors hover:bg-emerald-50/50"
                >
                  <TableCell className="font-medium text-zinc-500">
                    {rowNumberStart + index}
                  </TableCell>

                  <TableCell className="font-medium">
                    {item.nim}
                  </TableCell>

                  <TableCell>
                    <div className="font-semibold text-zinc-900">
                      {item.name}
                    </div>
                  </TableCell>

                  <TableCell>
                    {item.pondok?.nama_pondok || "-"}
                  </TableCell>

                  <TableCell>
                    {item.komplek?.nama_komplek || "-"}
                  </TableCell>

                  <TableCell>
                    {item.kamar?.nama_kamar || "-"}
                  </TableCell>

                  <TableCell>
                    {item.tempat_lahir || "-"}
                  </TableCell>

                  <TableCell>
                    {item.tanggal_lahir || "-"}
                  </TableCell>

                  {extraColumns.map((column) =>
                    visibleColumns[column.key] ? (
                      <TableCell key={column.key}>
                        {String(
                          item[column.key] ?? "-",
                        )}
                      </TableCell>
                    ) : null,
                  )}

                  <TableCell className="text-right">
                    <button
                      onClick={() => {
                        if (onDetail) {
                          return onDetail(item.id);
                        }

                        router.push(
                          `/mahasantri/${item.id}`,
                        );
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                    >
                      <Eye className="h-4 w-4" />
                      Detail
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}