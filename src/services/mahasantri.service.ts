import api from "@/lib/api";

export interface Mahasantri {
  id: number;
  nim: string;
  name: string;
  kamar?: string;
}

export interface MahasantriResponse {
  data: Mahasantri[];
  meta: {
    current_page: number;
    last_page: number;
    has_more: boolean;
  };
}

export const searchMahasantri = async (
  query: string,
  page = 1
) => {
  const res = await api.get("/mahasantri/search", {
    params: { query, page },
  });

  return res.data as MahasantriResponse;
};

export const getMahasantri = async (id: string) => {
  const res = await api.get(`/mahasantri/${id}`);
  return res.data;
};