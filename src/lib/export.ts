import * as XLSX from "xlsx";

import type { Mahasantri } from "@/types/mahasantri";

export interface ExportColumn {
  key: keyof Mahasantri;
  label: string;
}

type ExcelCell =
  | string
  | number
  | boolean
  | null
  | undefined;

type ExcelRow = Record<string, ExcelCell>;

const defaultColumns: ExportColumn[] = [
  { key: "nim", label: "NIM" },
  { key: "name", label: "Nama" },
  { key: "tempat_lahir", label: "Tempat Lahir" },
  { key: "tanggal_lahir", label: "Tanggal Lahir" },
  { key: "nik", label: "NIK" },
  { key: "pondok", label: "Pondok" },
  { key: "komplek", label: "Komplek" },
  { key: "kamar", label: "Kamar" },
  { key: "nama_ayah", label: "Nama Ayah" },
  { key: "nama_ibu", label: "Nama Ibu" },
  { key: "no_wa_orang_tua", label: "No. WA Orang Tua" },
  { key: "nama_wali", label: "Nama Wali" },
  { key: "status_wali", label: "Status Wali" },
  { key: "pekerjaan_ayah", label: "Pekerjaan Ayah" },
  { key: "pekerjaan_ibu", label: "Pekerjaan Ibu" },
  { key: "pekerjaan_wali", label: "Pekerjaan Wali" },
];

function getCellValue(
  row: Mahasantri,
  key: keyof Mahasantri,
): ExcelCell {
  switch (key) {
    case "pondok":
      return row.pondok?.nama_pondok ?? "-";

    case "komplek":
      return row.komplek?.nama_komplek ?? "-";

    case "kamar":
      return row.kamar?.nama_kamar ?? "-";

    case "is_active":
      return row.is_active ? "Aktif" : "Nonaktif";

    case "status":
      if (!row.status) {
        return "-";
      }

      if (typeof row.status === "string") {
        return row.status;
      }

      return row.status.label;

    default: {
      const value = row[key];

      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return value;
      }

      return value ?? "-";
    }
  }
}

export function exportMahasantriToExcel(
  data: Mahasantri[],
  columns: ExportColumn[] = defaultColumns,
  filename = "mahasantri.xlsx",
): void {
  try {
    const excelData: ExcelRow[] = data.map((row) => {
      const excelRow: ExcelRow = {};

      columns.forEach((column) => {
        excelRow[column.label] = getCellValue(
          row,
          column.key,
        );
      });

      return excelRow;
    });

    const worksheet =
      XLSX.utils.json_to_sheet(excelData);

    worksheet["!cols"] = columns.map(() => ({
      wch: 20,
    }));

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Mahasantri",
    );

    XLSX.writeFile(workbook, filename);
  } catch (error) {
    console.error(error);

    throw new Error(
      "Gagal mengekspor data ke Excel.",
    );
  }
}

export function exportMahasantriWithExtendedColumns(
  data: Mahasantri[],
  visibleColumns: Record<string, boolean>,
  filename = "mahasantri-detail.xlsx",
): void {
  const columns: ExportColumn[] = [
    { key: "nim", label: "NIM" },
    { key: "name", label: "Nama" },
    { key: "tempat_lahir", label: "Tempat Lahir" },
    {
      key: "tanggal_lahir",
      label: "Tanggal Lahir",
    },
    { key: "nik", label: "NIK" },
  ];

  const extraColumns: Record<
    string,
    ExportColumn
  > = {
    pondok: {
      key: "pondok",
      label: "Pondok",
    },

    komplek: {
      key: "komplek",
      label: "Komplek",
    },

    kamar: {
      key: "kamar",
      label: "Kamar",
    },

    status: {
      key: "status",
      label: "Status Mahasantri",
    },

    is_active: {
      key: "is_active",
      label: "Status Aktif",
    },

    nama_ayah: {
      key: "nama_ayah",
      label: "Nama Ayah",
    },

    nama_ibu: {
      key: "nama_ibu",
      label: "Nama Ibu",
    },

    no_wa_orang_tua: {
      key: "no_wa_orang_tua",
      label: "No. WA Orang Tua",
    },

    nama_wali: {
      key: "nama_wali",
      label: "Nama Wali",
    },

    status_wali: {
      key: "status_wali",
      label: "Status Wali",
    },

    pekerjaan_ayah: {
      key: "pekerjaan_ayah",
      label: "Pekerjaan Ayah",
    },

    pekerjaan_ibu: {
      key: "pekerjaan_ibu",
      label: "Pekerjaan Ibu",
    },

    pekerjaan_wali: {
      key: "pekerjaan_wali",
      label: "Pekerjaan Wali",
    },
  };

  Object.entries(visibleColumns).forEach(
    ([key, visible]) => {
      if (visible && extraColumns[key]) {
        columns.push(extraColumns[key]);
      }
    },
  );

  exportMahasantriToExcel(
    data,
    columns,
    filename,
  );
}