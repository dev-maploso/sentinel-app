import * as XLSX from 'xlsx';
import { Mahasantri } from '@/services/mahasantri.service';

export interface ExportColumn {
  key: keyof Mahasantri;
  label: string;
}

const defaultColumns: ExportColumn[] = [
  { key: 'nim', label: 'NIM' },
  { key: 'name', label: 'Nama' },
  { key: 'tempat_lahir', label: 'Tempat Lahir' },
  { key: 'tanggal_lahir', label: 'Tanggal Lahir' },
  { key: 'nik', label: 'NIK' },
  { key: 'nama_ayah', label: 'Nama Ayah' },
  { key: 'nama_ibu', label: 'Nama Ibu' },
  { key: 'no_wa_orang_tua', label: 'No. WA Orang Tua' },
  { key: 'nama_wali', label: 'Nama Wali' },
  { key: 'status_wali', label: 'Status Wali' },
  { key: 'pekerjaan_ayah', label: 'Pekerjaan Ayah' },
  { key: 'pekerjaan_ibu', label: 'Pekerjaan Ibu' },
  { key: 'pekerjaan_wali', label: 'Pekerjaan Wali' },
];

export function exportMahasantriToExcel(
  data: Mahasantri[],
  columns: ExportColumn[] = defaultColumns,
  filename: string = 'mahasantri.xlsx'
): void {
  try {
    // Transform data untuk Excel
    const excelData = data.map((row) => {
      const excelRow: Record<string, any> = {};
      columns.forEach((col) => {
        let value = row[col.key];
        
        // Handle nested objects
        if (col.key === 'pondok' && row.pondok) {
          value = row.pondok.nama_pondok;
        } else if (col.key === 'komplek' && row.komplek) {
          value = row.komplek.nama_komplek;
        } else if (col.key === 'kamar' && row.kamar) {
          value = row.kamar.nama_kamar;
        }
        
        excelRow[col.label] = value || '-';
      });
      return excelRow;
    });

    // Create workbook dan worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Mahasantri');

    // Styling kolom (set column width)
    const colWidths = columns.map(() => 18);
    worksheet['!cols'] = colWidths.map((width) => ({ wch: width }));

    // Write file
    XLSX.writeFile(workbook, filename);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw new Error('Gagal mengekspor data ke Excel');
  }
}

export function exportMahasantriWithExtendedColumns(
  data: Mahasantri[],
  visibleExtraColumns: Record<string, boolean>,
  filename: string = 'mahasantri-detail.xlsx'
): void {
  const columns: ExportColumn[] = [
    { key: 'nim', label: 'NIM' },
    { key: 'name', label: 'Nama' },
    { key: 'tempat_lahir', label: 'Tempat Lahir' },
    { key: 'tanggal_lahir', label: 'Tanggal Lahir' },
    { key: 'nik', label: 'NIK' },
  ];

  // Tambah kolom extra yang visible
  const extraColumnMap: Record<string, ExportColumn> = {
    nama_ayah: { key: 'nama_ayah', label: 'Nama Ayah' },
    nama_ibu: { key: 'nama_ibu', label: 'Nama Ibu' },
    no_wa_orang_tua: { key: 'no_wa_orang_tua', label: 'No. WA Orang Tua' },
    nama_wali: { key: 'nama_wali', label: 'Nama Wali' },
    status_wali: { key: 'status_wali', label: 'Status Wali' },
    pekerjaan_ayah: { key: 'pekerjaan_ayah', label: 'Pekerjaan Ayah' },
    pekerjaan_ibu: { key: 'pekerjaan_ibu', label: 'Pekerjaan Ibu' },
    pekerjaan_wali: { key: 'pekerjaan_wali', label: 'Pekerjaan Wali' },
  };

  Object.entries(visibleExtraColumns).forEach(([key, isVisible]) => {
    if (isVisible && extraColumnMap[key]) {
      columns.push(extraColumnMap[key]);
    }
  });

  exportMahasantriToExcel(data, columns, filename);
}
