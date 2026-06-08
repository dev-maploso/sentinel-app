import api from "@/lib/api";

export interface StatItem {
  id: number | null;
  label: string;
  total: number;
}

export interface DashboardResponse {
  data: {
    per_kamar: StatItem[];
    per_komplek: StatItem[];
    per_pondok: StatItem[];
  };
}

export const getDashboardStatistik = async () => {
  const res = await api.get<DashboardResponse>(
    "/dashboard/statistik-mahasantri"
  );

  return res.data.data;
};