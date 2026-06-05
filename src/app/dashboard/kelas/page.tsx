"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import KelasTable from "@/components/kelas/kelas-table";

import { getKelasRegistrasi, RegistrasiResponse, RegistrasiItem } from "@/services/kelas.service";

export default function KelasPage() {
	const [data, setData] = useState<RegistrasiItem[]>([]);
	const [loading, setLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const perPage = 20; // used for numbering; server page size unknown
	const [selectedKelasId, setSelectedKelasId] = useState<number | null>(null);

	const load = async (page: number) => {
		try {
			setLoading(true);
			const res: RegistrasiResponse = await getKelasRegistrasi(page);
			setData(res.data);
			setCurrentPage(res.meta.current_page);
			setLastPage(res.meta.last_page);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load(1);
	}, []);

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold">Data Kelas</h1>
				<p className="text-muted-foreground">Daftar registrasi mahasantri per kelas.</p>
			</div>

			<div className="flex items-center gap-4">
				<label className="text-sm font-medium">Filter Kelas:</label>
				<select
					className="rounded border px-3 py-2"
					value={selectedKelasId ?? ""}
					onChange={(e) => setSelectedKelasId(e.target.value ? Number(e.target.value) : null)}
				>
					<option value="">Semua Kelas</option>
					{Array.from(
						new Map(
							data
								.filter((d) => d.kelas)
								.map((d) => [d.kelas!.id, d.kelas!]),
						).values(),
					).map((k) => (
						<option key={k.id} value={k.id}>
							{k.nama_kelas}
						</option>
					))}
				</select>
			</div>

			<Card className="overflow-hidden">
				<KelasTable
					data={selectedKelasId ? data.filter((d) => d.kelas?.id === selectedKelasId) : data}
					loading={loading}
					rowNumberStart={(currentPage - 1) * perPage + 1}
				/>
			</Card>

			<div className="flex items-center justify-between">
				<Button variant="outline" disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
					Previous
				</Button>

				<div className="text-sm text-muted-foreground">Halaman {currentPage} dari {lastPage}</div>

				<Button variant="outline" disabled={currentPage >= lastPage} onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}>
					Next
				</Button>
			</div>
		</div>
	);
}
