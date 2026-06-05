"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import KelasTable from "@/components/kelas/kelas-table";

import {
	getKelasRegistrasi,
	Kelas,
	RegistrasiResponse,
	RegistrasiItem,
} from "@/services/kelas.service";

export default function KelasPage() {
	const [data, setData] = useState<RegistrasiItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [classes, setClasses] = useState<Kelas[]>([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const perPage = 20; // used for numbering; server page size unknown
	const [selectedKelasId, setSelectedKelasId] = useState<number | null>(null);

	const load = async (page: number, kelasId: number | null = null) => {
		try {
			setLoading(true);
			const res: RegistrasiResponse = await getKelasRegistrasi(page, kelasId ?? undefined);
			setData(res.data);
			setCurrentPage(res.meta.current_page);
			setLastPage(res.meta.last_page);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const loadAllClasses = async () => {
		try {
			const firstPage = await getKelasRegistrasi(1);
			const kelasMap = new Map<number, Kelas>();

			firstPage.data.forEach((item) => {
				if (item.kelas) {
					kelasMap.set(item.kelas.id, item.kelas);
				}
			});

			if (firstPage.meta.last_page > 1) {
				const otherPages = Array.from({ length: firstPage.meta.last_page - 1 }, (_, index) => index + 2);
				const results = await Promise.all(otherPages.map((page) => getKelasRegistrasi(page)));

				results.forEach((pageResult) => {
					pageResult.data.forEach((item) => {
						if (item.kelas) {
							kelasMap.set(item.kelas.id, item.kelas);
						}
					});
				});
			}

			setClasses(Array.from(kelasMap.values()));
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		load(currentPage, selectedKelasId);
	}, [currentPage, selectedKelasId]);

	useEffect(() => {
		loadAllClasses();
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
					onChange={(e) => { setSelectedKelasId(e.target.value ? Number(e.target.value) : null); setCurrentPage(1); }}
				>
					<option value="">Semua Kelas</option>
					{(classes.length > 0
						? classes
						: Array.from(
							new Map(
								data
									.filter((d) => d.kelas)
									.map((d) => [d.kelas!.id, d.kelas!]),
								).values(),
							)
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
