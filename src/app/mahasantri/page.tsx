"use client";

import { useEffect, useState, useRef } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { searchMahasantri, Mahasantri } from "@/services/mahasantri.service";
import { useRouter } from "next/navigation";

export default function MahasantriPage() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [data, setData] = useState<Mahasantri[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async (q: string, p = 1, reset = false) => {
    if (!q) {
      setData([]);
      return;
    }

    setLoading(true);

    try {
      const res = await searchMahasantri(q, p);

      setData((prev) => {
        const merged = reset ? res.data : [...prev, ...res.data];

        const unique = Array.from(
          new Map(merged.map((item) => [item.id, item])).values(),
        );

        return unique;
      });

      setHasMore(res.meta.has_more);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 search (reset)
  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchData(query, 1, true);
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  // 🔄 load more
  useEffect(() => {
    if (page === 1) return;
    fetchData(query, page);
  }, [page]);

  // 👀 observer
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Mahasantri</h1>

        <input
          type="text"
          placeholder="Cari nama / NIM..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-lg"
        />

        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-2 text-left">NIM</th>
                <th className="px-4 py-2 text-left">Nama</th>
                <th className="px-4 py-2 text-left">Kamar</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => router.push(`/mahasantri/${item.id}`)}
                  className="border-t cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <td className="px-4 py-2">{item.nim}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.kamar || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 👇 trigger infinite scroll */}
        <div
          ref={observerRef}
          className="h-10 flex items-center justify-center"
        >
          {loading && <span>Loading...</span>}
          {!hasMore && query && (
            <span className="text-sm text-zinc-500">Sudah habis</span>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
