import { PaginatedResponse } from "./api";

export interface Pondok {
  id: number;
  kode_pondok: string;
  nama_pondok: string;
}

export interface Komplek {
  id: number;
  pondok_id: number;
  kode_komplek: string;
  nama_komplek: string;
}

export interface Kamar {
  id: number;
  pondok_id: number;
  komplek_id: number;
  kode_kamar: string;
  nama_kamar: string;
}

export type MahasantriStatusValue =
  | "masih_pondok"
  | "boyong"
  | "lulus";

export interface MahasantriStatus {
  value: MahasantriStatusValue;
  label: string;
  color: "success" | "warning" | "primary";
}

/* ============================
 * Mahasantri
 * ============================ */

export interface Mahasantri {
  id: number;

  name: string;
  nim: string;

  pondok_id: number | null;
  komplek_id: number | null;
  kamar_id: number | null;
  golongan_id: number | null;

  pondok: Pondok | null;
  komplek: Komplek | null;
  kamar: Kamar | null;

  pin: string | null;
  nik: string | null;
  nisn: string | null;

  tempat_lahir: string | null;
  tanggal_lahir: string | null;

  anak_ke_berapa: number | null;
  jumlah_saudara: number | null;

  hobi: string | null;
  cita_cita: string | null;
  riwayat_penyakit: string | null;

  pendidikan_terakhir: string | null;

  nama_ayah: string | null;
  status_ayah: string | null;
  nik_ayah: string | null;
  tempat_lahir_ayah: string | null;
  tanggal_lahir_ayah: string | null;
  status_perkawinan_ayah: string | null;
  pendidikan_terakhir_ayah: string | null;
  pekerjaan_ayah: string | null;
  penghasilan_ayah_per_bulan: string | null;

  nama_ibu: string | null;
  status_ibu: string | null;
  nik_ibu: string | null;
  tempat_lahir_ibu: string | null;
  tanggal_lahir_ibu: string | null;
  status_perkawinan_ibu: string | null;
  pendidikan_terakhir_ibu: string | null;
  pekerjaan_ibu: string | null;
  penghasilan_ibu_per_bulan: string | null;

  no_kartu_keluarga: string | null;
  provinsi: string | null;
  kabupaten_kota: string | null;
  kecamatan: string | null;
  kelurahan: string | null;
  dusun_jalan_blok: string | null;
  rt_rw: string | null;

  no_wa_orang_tua: string | null;

  nik_wali: string | null;
  nama_wali: string | null;
  status_wali: string | null;
  pekerjaan_wali: string | null;
  no_wa_wali: string | null;

  email?: string | null;
  phone?: string | null;
  gender?: string | null;
  is_active?: boolean;
  status?: MahasantriStatus | null;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface MahasantriFilterParams {
  page?: number;
  limit?: number;

  query?: string;

  pondok_id?: number;
  komplek_id?: number;
  kamar_id?: number;

  is_active?: boolean;
}

export interface MahasantriFiltersResponse {
  pondok: Pondok[];
  komplek: Komplek[];
  kamar: Kamar[];
}

export type MahasantriResponse =
  PaginatedResponse<Mahasantri>;