import DashboardStatistics from "@/components/dashboard/dashboard-statistics";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-muted-foreground">Selamat datang di Sentinel.</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Sistem pemantauan data mahasantri yang menyediakan informasi mahasantri,
          kelas, dan izin keluar secara terpusat.
        </p>
      </div>

      <DashboardStatistics />
    </div>
  );
}
