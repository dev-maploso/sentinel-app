"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Loader2, Eye } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Mahasantri } from "@/types/mahasantri";

type ToggleKey =
  | "status"
  | "pondok"
  | "komplek"
  | "kamar"
  | "status_mahasantri"
  | "nama_ayah"
  | "nama_ibu"
  | "no_wa_orang_tua"
  | "nama_wali"
  | "status_wali"
  | "pekerjaan_ayah"
  | "pekerjaan_ibu"
  | "pekerjaan_wali";

const columns: {
  key: ToggleKey;
  label: string;
  defaultVisible: boolean;
}[] = [
  {
    key: "status",
    label: "Status Aktif",
    defaultVisible: true,
  },
  {
    key: "status_mahasantri",
    label: "Status Mahasantri",
    defaultVisible: true,
  },
  {
    key: "pondok",
    label: "Pondok",
    defaultVisible: true,
  },
  {
    key: "komplek",
    label: "Komplek",
    defaultVisible: true,
  },
  {
    key: "kamar",
    label: "Kamar",
    defaultVisible: true,
  },

  {
    key: "nama_ayah",
    label: "Nama Ayah",
    defaultVisible: false,
  },
  {
    key: "nama_ibu",
    label: "Nama Ibu",
    defaultVisible: false,
  },
  {
    key: "no_wa_orang_tua",
    label: "No. WA Orang Tua",
    defaultVisible: false,
  },
  {
    key: "nama_wali",
    label: "Nama Wali",
    defaultVisible: false,
  },
  {
    key: "status_wali",
    label: "Status Wali",
    defaultVisible: false,
  },
  {
    key: "pekerjaan_ayah",
    label: "Pekerjaan Ayah",
    defaultVisible: false,
  },
  {
    key: "pekerjaan_ibu",
    label: "Pekerjaan Ibu",
    defaultVisible: false,
  },
  {
    key: "pekerjaan_wali",
    label: "Pekerjaan Wali",
    defaultVisible: false,
  },
];

const statusColorMap = {
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  primary: "bg-blue-100 text-blue-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-sky-100 text-sky-700",
} as const;

interface Props {
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
}: Props) {
  const router = useRouter();

  const [visibleColumns, setVisibleColumns] = useState<
    Record<ToggleKey, boolean>
  >(
    () =>
      Object.fromEntries(
        columns.map((c) => [c.key, c.defaultVisible]),
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

        <h3 className="font-semibold">Memuat Data...</h3>

        <p className="mt-2 text-sm text-zinc-500">Mohon tunggu sebentar.</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
          <Users className="h-8 w-8 text-emerald-600" />
        </div>

        <h3 className="font-semibold">Data kosong</h3>

        <p className="mt-2 text-sm text-zinc-500">Belum ada data mahasantri.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-emerald-50">
              <TableRow>
                <TableHead>Aksi</TableHead>

                <TableHead>No</TableHead>

                <TableHead>NIM</TableHead>

                <TableHead>Nama</TableHead>

                {visibleColumns.status && <TableHead>Status</TableHead>}

                {visibleColumns.status_mahasantri && (
                  <TableHead>Status Mahasantri</TableHead>
                )}

                {visibleColumns.pondok && <TableHead>Pondok</TableHead>}

                {visibleColumns.komplek && <TableHead>Komplek</TableHead>}

                {visibleColumns.kamar && <TableHead>Kamar</TableHead>}

                <TableHead>Tempat Lahir</TableHead>

                <TableHead>Tanggal Lahir</TableHead>

                {columns
                  .filter(
                    (c) =>
                      ![
                        "status",
                        "status_mahasantri",
                        "pondok",
                        "komplek",
                        "kamar",
                      ].includes(c.key),
                  )
                  .map(
                    (column) =>
                      visibleColumns[column.key] && (
                        <TableHead key={column.key}>{column.label}</TableHead>
                      ),
                  )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <button
                      onClick={() =>
                        onDetail
                          ? onDetail(item.id)
                          : router.push(`/dashboard/mahasantri/${item.id}`)
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs text-white hover:bg-emerald-700"
                    >
                      <Eye className="h-4 w-4" />
                      Detail
                    </button>
                  </TableCell>

                  <TableCell>{rowNumberStart + index}</TableCell>

                  <TableCell>{item.nim}</TableCell>

                  <TableCell className="font-medium">{item.name}</TableCell>

                  {visibleColumns.status && (
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          item.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.is_active ? "Aktif" : "Nonaktif"}
                      </span>
                    </TableCell>
                  )}

                  {visibleColumns.status_mahasantri && (
                    <TableCell>
                      {item.status ? (
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            statusColorMap[item.status.color]
                          }`}
                        >
                          {item.status.label}
                        </span>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  )}

                  {visibleColumns.pondok && (
                    <TableCell>{item.pondok?.nama_pondok ?? "-"}</TableCell>
                  )}

                  {visibleColumns.komplek && (
                    <TableCell>{item.komplek?.nama_komplek ?? "-"}</TableCell>
                  )}

                  {visibleColumns.kamar && (
                    <TableCell>{item.kamar?.nama_kamar ?? "-"}</TableCell>
                  )}

                  <TableCell>{item.tempat_lahir ?? "-"}</TableCell>

                  <TableCell>{item.tanggal_lahir ?? "-"}</TableCell>

                  {columns
                    .filter(
                      (c) =>
                        ![
                          "status",
                          "status_mahasantri",
                          "pondok",
                          "komplek",
                          "kamar",
                        ].includes(c.key),
                    )
                    .map((column) =>
                      visibleColumns[column.key] ? (
                        <TableCell key={column.key}>
                          {String(item[column.key as keyof Mahasantri] ?? "-")}
                        </TableCell>
                      ) : null,
                    )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Toggle */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <h3 className="mb-1 font-semibold">Kolom yang Ditampilkan</h3>

        <p className="mb-5 text-sm text-zinc-500">
          Centang kolom yang ingin ditampilkan.
        </p>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((column) => (
            <label
              key={column.key}
              className="flex cursor-pointer items-center gap-3 rounded-xl border p-3 hover:border-emerald-400 hover:bg-emerald-50"
            >
              <input
                type="checkbox"
                checked={visibleColumns[column.key]}
                onChange={() => toggleColumn(column.key)}
                className="h-4 w-4 accent-emerald-600"
              />

              <span className="text-sm">{column.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
