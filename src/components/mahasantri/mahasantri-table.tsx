"use client";

import { useState } from "react";
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
}

export default function MahasantriTable({
  data,
  loading = false,
  onDetail,
}: MahasantriTableProps) {
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
    <div className="rounded-lg border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>NIM</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Pondok</TableHead>
            <TableHead>Komplek</TableHead>
            <TableHead>Kamar</TableHead>
            <TableHead>Tempat Lahir</TableHead>
            <TableHead>Tanggal Lahir</TableHead>
            <TableHead>Nama Ayah</TableHead>
            <TableHead>Nama Ibu</TableHead>
            <TableHead>No. WA Orang Tua</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>

              <TableCell className="font-medium">
                {item.nim}
              </TableCell>

              <TableCell>{item.name}</TableCell>

              <TableCell>{item.pondok?.nama_pondok || "-"}</TableCell>
              <TableCell>{item.komplek?.nama_komplek || "-"}</TableCell>
              <TableCell>{item.kamar?.nama_kamar || "-"}</TableCell>

              <TableCell>
                {item.tempat_lahir || "-"}
              </TableCell>

              <TableCell>
                {item.tanggal_lahir || "-"}
              </TableCell>

              <TableCell>
                {item.nama_ayah || "-"}
              </TableCell>

              <TableCell>
                {item.nama_ibu || "-"}
              </TableCell>

              <TableCell>
                {item.no_wa_orang_tua || "-"}
              </TableCell>

              <TableCell className="text-right">
                <button
                  onClick={() => onDetail?.(item.id)}
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
  );
}