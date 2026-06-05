"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

const extraColumns: { key: ToggleKey; label: string }[] = [
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
  const [visibleColumns, setVisibleColumns] = useState<
    Record<ToggleKey, boolean>
  >(() =>
    Object.fromEntries(
      extraColumns.map((column) => [column.key, false]),
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
      <div className="rounded-lg border p-8 text-center">
        Memuat data mahasantri...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-lg border p-8 text-center">
        Tidak ada data mahasantri
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm font-semibold">Pilih kolom tambahan</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {extraColumns.map((column) => (
            <label
              key={column.key}
              className="inline-flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={visibleColumns[column.key]}
                onChange={() => toggleColumn(column.key)}
                className="h-4 w-4 rounded border"
              />
              <span>{column.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">No</TableHead>
              <TableHead>NIM</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Pondok</TableHead>
              <TableHead>Komplek</TableHead>
              <TableHead>Kamar</TableHead>
              <TableHead>Tempat Lahir</TableHead>
              <TableHead>Tanggal Lahir</TableHead>
              <TableHead>No. WA Orang Tua</TableHead>
              {extraColumns.map(
                (column) =>
                  visibleColumns[column.key] && (
                    <TableHead key={column.key}>{column.label}</TableHead>
                  ),
              )}
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{rowNumberStart + index}</TableCell>

                <TableCell className="font-medium">
                  {item.nim}
                </TableCell>

                <TableCell>{item.name}</TableCell>

                <TableCell>{item.pondok?.nama_pondok || "-"}</TableCell>
                <TableCell>{item.komplek?.nama_komplek || "-"}</TableCell>
                <TableCell>{item.kamar?.nama_kamar || "-"}</TableCell>

                <TableCell>{item.tempat_lahir || "-"}</TableCell>

                <TableCell>{item.tanggal_lahir || "-"}</TableCell>

                <TableCell>{item.no_wa_orang_tua || "-"}</TableCell>

                {extraColumns.map(
                  (column) =>
                    visibleColumns[column.key] ? (
                      <TableCell key={column.key}>
                        {String(item[column.key] ?? "-")}
                      </TableCell>
                    ) : null,
                )}

                <TableCell className="text-right">
                  <button
                    onClick={() => {
                      if (onDetail) return onDetail(item.id);
                      router.push(`/mahasantri/${item.id}`);
                    }}
                    className="rounded-md border px-3 py-1 text-sm hover:bg-muted"
                  >
                    Detail
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
