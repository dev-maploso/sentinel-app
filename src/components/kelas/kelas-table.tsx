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
      <div className="rounded-lg border p-8 text-center">Memuat data...</div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-lg border p-8 text-center">Tidak ada data</div>
    );
  }

  return (
    <div className="rounded-lg border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">No</TableHead>
            <TableHead>NIM</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Kamar</TableHead>
            <TableHead>Kelas</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, i) => (
            <TableRow key={`${item.nim}-${i}`}>
              <TableCell>{rowNumberStart + i}</TableCell>
              <TableCell className="font-medium">{item.nim}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.kamar?.nama_kamar || "-"}</TableCell>
              <TableCell>{item.kelas?.nama_kelas || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
