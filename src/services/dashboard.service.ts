import api from "@/lib/api";

export interface StatItem {
  id: number | null;
  label: string;
  total: number;
  aktif: number | string;
  non_aktif: number;
}

export interface GlobalPondok {
  total: number;
  aktif: number | string;
  non_aktif: number;
}

export interface DashboardResponse {
  data: {
    global_pondok: GlobalPondok;
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