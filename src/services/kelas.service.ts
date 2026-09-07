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
  nik?: string | null;
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
  kodeKelas?: string,
): Promise<RegistrasiResponse> => {
  const res = await api.get("/mahasantri/registrasi", {
    params: {
      page,
      ...(kodeKelas ? { kode_kelas: kodeKelas } : {}),
    },
  });

  return res.data;
};

export const getAllKelasRegistrasi = async (): Promise<RegistrasiItem[]> => {
  const firstPage = await getKelasRegistrasi(1);
  const items = [...firstPage.data];

  if (firstPage.meta.last_page <= 1) {
    return items;
  }

  const pages = await Promise.all(
    Array.from(
      { length: firstPage.meta.last_page - 1 },
      (_, index) => getKelasRegistrasi(index + 2),
    ),
  );

  pages.forEach((page) => items.push(...page.data));

  return items;
};
