"use client";

interface SearchMahasantriProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchMahasantri({
  value,
  onChange,
  placeholder = "Cari nama / NIM...",
}: SearchMahasantriProps) {
  return (
    <div className="mb-6">
      <label
        htmlFor="search-mahasantri"
        className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-200"
      >
        Cari Mahasantri
      </label>
      <input
        id="search-mahasantri"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full max-w-md rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
      />
    </div>
  );
}
