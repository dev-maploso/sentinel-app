"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { IzinPulangItem } from "@/services/izinpulang.service";

interface IzinPulangTableProps {
  data: IzinPulangItem[];
  loading?: boolean;
  rowNumberStart?: number;
}

export default function IzinPulangTable({
  data,
  loading = false,
  rowNumberStart = 1,
}: IzinPulangTableProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
        <Loader2 className="mx-auto mb-3 h-10 w-10 animate-spin text-emerald-600" />
        <p className="text-sm font-medium text-zinc-900">
          Memuat data izin keluar...
        </p>
        <p className="mt-1 text-xs text-zinc-500">Mohon tunggu sebentar.</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
        <p className="text-sm font-semibold text-zinc-900">
          Tidak ada data izin keluar
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          Belum ada data izin keluar yang tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-emerald-50">
            <TableRow>
              <TableHead className="w-16">No</TableHead>
              <TableHead>NIM</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Jenis Izin</TableHead>
              <TableHead>Tanggal Mulai</TableHead>
              <TableHead>Tanggal Selesai</TableHead>
              <TableHead>Tujuan</TableHead>
              <TableHead>Keperluan</TableHead>
              {/* <TableHead>Status</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, index) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              const [year, month, day] = item.tanggal_selesai
                .split("-")
                .map(Number);

              const tanggalSelesai = new Date(year, month - 1, day);

              const isExpired = tanggalSelesai < today;

              return (
                <TableRow
                  key={item.id}
                  className={`transition-colors ${
                    isExpired
                      ? "bg-red-50 hover:bg-red-100"
                      : "hover:bg-emerald-50/50"
                  }`}
                >
                  <TableCell className="font-medium text-zinc-500">
                    {rowNumberStart + index}
                  </TableCell>

                  <TableCell className="font-semibold text-zinc-900">
                    {item.mahasantri.nim}
                  </TableCell>

                  <TableCell className="font-medium text-zinc-800">
                    {item.mahasantri.name}
                  </TableCell>

                  <TableCell className="text-zinc-600">
                    {item.kelas?.nama_kelas || "-"}
                  </TableCell>

                  <TableCell className="text-zinc-600">
                    {item.jenis_izin_label || item.jenis_izin}
                  </TableCell>

                  <TableCell className="text-zinc-600">
                    {item.tanggal_mulai}
                  </TableCell>

                  <TableCell
                    className={`${
                      isExpired ? "font-semibold text-red-700" : "text-zinc-600"
                    }`}
                  >
                    {item.tanggal_selesai}
                  </TableCell>

                  <TableCell className="text-zinc-600">
                    {item.tujuan || "-"}
                  </TableCell>

                  <TableCell className="text-zinc-600">
                    {item.keperluan || "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
