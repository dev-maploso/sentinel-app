"use client";

import { Search, X } from "lucide-react";

interface SearchKelasProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchKelas({
  value,
  onChange,
  placeholder = "Cari nama mahasantri...",
}: SearchKelasProps) {
  return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <div className="mb-3">
        <h3 className="font-semibold text-zinc-900">Pencarian Mahasantri</h3>

        <p className="text-sm text-zinc-500">
          Temukan data mahasantri di dalam kelas dengan cepat.
        </p>
      </div>

      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />

        <input
          id="search-mahasantri"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-zinc-200
            bg-white
            pl-12
            pr-12
            text-sm
            text-zinc-900
            outline-none
            transition-all
            placeholder:text-zinc-400
            focus:border-emerald-500
            focus:ring-4
            focus:ring-emerald-100
          "
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="
              absolute
              right-3
              top-1/2
              flex
              h-8
              w-8
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              text-zinc-400
              transition
              hover:bg-zinc-100
              hover:text-zinc-700
            "
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
