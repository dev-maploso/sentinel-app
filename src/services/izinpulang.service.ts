import api from "@/lib/api";

export interface IzinPulangMahasantri {
  id: number;
  name: string;
  nim: string;
}

export interface IzinPulangKelas {
  id: number;
  nama_kelas: string;
}

export interface IzinPulangItem {
  id: number;
  mahasantri: IzinPulangMahasantri;
  kelas: IzinPulangKelas;
  jenis_izin: string;
  jenis_izin_label: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  tujuan: string;
  keperluan: string;
  status: string;
  status_label: string;
  created_at: string;
  updated_at: string;
}

export interface IzinPulangResponse {
  data: IzinPulangItem[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
  };
}

export const getIzinPulangList = async (
  page = 1
): Promise<IzinPulangResponse> => {
  const res = await api.get("/izin-pulang", {
    params: { page },
  });

  return res.data;
};
