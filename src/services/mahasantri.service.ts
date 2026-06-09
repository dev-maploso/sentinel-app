import api from "@/lib/api";

export interface Pondok {
  id: number;
  kode_pondok: string;
  nama_pondok: string;
}

export interface Komplek {
  id: number;
  kode_komplek: string;
  nama_komplek: string;
}

export interface Kamar {
  id: number;
  kode_kamar: string;
  nama_kamar: string;
}

export interface Mahasantri {
  id: number;

  // Data dasar
  name: string;
  nim: string;
  pondok_id: number | null;
  komplek_id: number | null;
  kamar_id: number | null;
  golongan_id: number | null;
  pondok: Pondok | null;
  komplek: Komplek | null;
  kamar: Kamar | null;

  // Data pribadi
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

  // Data ayah
  nama_ayah: string | null;
  status_ayah: string | null;
  nik_ayah: string | null;
  tempat_lahir_ayah: string | null;
  tanggal_lahir_ayah: string | null;
  status_perkawinan_ayah: string | null;
  pendidikan_terakhir_ayah: string | null;
  pekerjaan_ayah: string | null;
  penghasilan_ayah_per_bulan: string | null;

  // Data ibu
  nama_ibu: string | null;
  status_ibu: string | null;
  nik_ibu: string | null;
  tempat_lahir_ibu: string | null;
  tanggal_lahir_ibu: string | null;
  status_perkawinan_ibu: string | null;
  pendidikan_terakhir_ibu: string | null;
  pekerjaan_ibu: string | null;
  penghasilan_ibu_per_bulan: string | null;

  // Alamat
  no_kartu_keluarga: string | null;
  provinsi: string | null;
  kabupaten_kota: string | null;
  kecamatan: string | null;
  kelurahan: string | null;
  dusun_jalan_blok: string | null;
  rt_rw: string | null;

  // Kontak
  no_wa_orang_tua: string | null;

  // Wali
  nik_wali: string | null;
  nama_wali: string | null;
  status_wali: string | null;
  pekerjaan_wali: string | null;
  no_wa_wali: string | null;

  // Timestamp
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  is_active?: number | string;
}

export interface MahasantriResponse {
  data: Mahasantri[];
  meta: {
    current_page: number;
    last_page: number;
    has_more: boolean;
  };
}

export const getMahasantriList = async (
  page = 1
): Promise<MahasantriResponse> => {
  const res = await api.get("/mahasantri", {
    params: { page },
  });

  return res.data;
};

export const searchMahasantri = async (
  query: string,
  page = 1
): Promise<MahasantriResponse> => {
  const res = await api.get("/mahasantri/search", {
    params: {
      query,
      page,
    },
  });

  return res.data;
};

export const getAllMahasantri = async (): Promise<Mahasantri[]> => {
  let allData: Mahasantri[] = [];
  let currentPage = 1;
  let lastPage = 1;

  while (currentPage <= lastPage) {
    const res = await api.get("/mahasantri", {
      params: { page: currentPage },
    });

    allData = [...allData, ...res.data.data];
    lastPage = res.data.meta.last_page;
    currentPage++;
  }

  return allData;
};

export const getTotalMahasantri = async (): Promise<number> => {
  const res = await fetch("/api/mahasantri/total", {
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch total mahasantri");
  }

  const data = await res.json();
  return data.total;
};

export const getMahasantri = async (
  id: string
): Promise<Mahasantri> => {
  const res = await api.get(`/mahasantri/${id}`);
  return res.data;
};