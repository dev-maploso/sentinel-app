"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RegistrasiItem } from "@/services/kelas.service";
import { Loader2 } from "lucide-react";

interface KelasTableProps {
  data: RegistrasiItem[];
  loading?: boolean;
  rowNumberStart?: number;
}

export default function KelasTable({
  data,
  loading = false,
  rowNumberStart = 1,
}: KelasTableProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
        <Loader2 className="mx-auto mb-3 h-10 w-10 animate-spin text-emerald-600" />
        <p className="text-sm font-medium text-zinc-900">
          Memuat data kelas...
        </p>
        <p className="text-xs text-zinc-500">
          Mohon tunggu sebentar
        </p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
        <p className="text-sm font-semibold text-zinc-900">
          Tidak ada data
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          Belum ada data registrasi kelas yang tersedia
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          {/* Header */}
          <TableHeader className="bg-emerald-50">
            <TableRow>
              <TableHead className="w-20 font-semibold text-emerald-700">
                No
              </TableHead>

              <TableHead className="font-semibold text-emerald-700">
                NIM
              </TableHead>

              <TableHead className="font-semibold text-emerald-700">
                Nama
              </TableHead>

              <TableHead className="font-semibold text-emerald-700">
                Kamar
              </TableHead>

              <TableHead className="font-semibold text-emerald-700">
                Kelas
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Body */}
          <TableBody>
            {data.map((item, i) => (
              <TableRow
                key={`${item.nim}-${i}`}
                className="transition-colors hover:bg-emerald-50/50"
              >
                <TableCell className="font-medium text-zinc-500">
                  {rowNumberStart + i}
                </TableCell>

                <TableCell className="font-semibold text-zinc-900">
                  {item.nim}
                </TableCell>

                <TableCell className="font-medium text-zinc-800">
                  {item.name}
                </TableCell>

                <TableCell className="text-zinc-600">
                  {item.kamar?.nama_kamar || "-"}
                </TableCell>

                <TableCell className="text-zinc-600">
                  {item.kelas?.nama_kelas || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}