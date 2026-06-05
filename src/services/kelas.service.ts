import api from "@/lib/api";

export interface Kamar {
  id: number;
  kode_kamar: string;
  nama_kamar: string;
}

export interface Kelas {
  id: number;
  kode_kelas: string;
  nama_kelas: string;
}

export interface RegistrasiItem {
  nim: string;
  name: string;
  kamar: Kamar | null;
  kelas: Kelas | null;
}

export interface RegistrasiResponse {
  meta: {
    current_page: number;
    last_page: number;
    has_more: boolean;
  };
  data: RegistrasiItem[];
}

export const getKelasRegistrasi = async (
  page = 1,
  kelasId?: number,
): Promise<RegistrasiResponse> => {
  const res = await api.get("/mahasantri/registrasi", {
    params: {
      page,
      ...(kelasId ? { kelas_id: kelasId } : {}),
    },
  });

  return res.data;
};
