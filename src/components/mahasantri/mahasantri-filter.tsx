"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  MahasantriFilterParams,
  MahasantriFiltersResponse,
} from "@/types/mahasantri";

interface Props {
  filters: MahasantriFiltersResponse | null;
  value: MahasantriFilterParams;
  onChange: (value: MahasantriFilterParams) => void;
}

export default function MahasantriFilter({
  filters,
  value,
  onChange,
}: Props) {
  const komplek =
    filters?.komplek.filter(
      (item) =>
        !value.pondok_id ||
        item.pondok_id === value.pondok_id
    ) ?? [];

  const kamar =
    filters?.kamar.filter(
      (item) =>
        (!value.pondok_id ||
          item.pondok_id === value.pondok_id) &&
        (!value.komplek_id ||
          item.komplek_id === value.komplek_id)
    ) ?? [];

  return (
    <div className="grid grid-cols-1 gap-4 rounded-xl border bg-white p-4 md:grid-cols-2 xl:grid-cols-4">
      {/* Pondok */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Pondok
        </label>

        <Select
          value={value.pondok_id?.toString() ?? "all"}
          onValueChange={(v) =>
            onChange({
              ...value,
              pondok_id:
                v === "all" ? undefined : Number(v),

              // reset child
              komplek_id: undefined,
              kamar_id: undefined,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Semua Pondok" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              Semua Pondok
            </SelectItem>

            {filters?.pondok.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id.toString()}
              >
                {item.nama_pondok}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Komplek */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Komplek
        </label>

        <Select
          value={value.komplek_id?.toString() ?? "all"}
          onValueChange={(v) =>
            onChange({
              ...value,
              komplek_id:
                v === "all" ? undefined : Number(v),

              // reset kamar
              kamar_id: undefined,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Semua Komplek" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              Semua Komplek
            </SelectItem>

            {komplek.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id.toString()}
              >
                {item.nama_komplek}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Kamar */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Kamar
        </label>

        <Select
          value={value.kamar_id?.toString() ?? "all"}
          onValueChange={(v) =>
            onChange({
              ...value,
              kamar_id:
                v === "all" ? undefined : Number(v),
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Semua Kamar" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              Semua Kamar
            </SelectItem>

            {kamar.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id.toString()}
              >
                {item.nama_kamar}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Status
        </label>

        <Select
          value={
            value.is_active === undefined
              ? "all"
              : value.is_active
              ? "1"
              : "0"
          }
          onValueChange={(v) =>
            onChange({
              ...value,
              is_active:
                v === "all"
                  ? undefined
                  : v === "1",
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              Semua Status
            </SelectItem>

            <SelectItem value="1">
              Aktif
            </SelectItem>

            <SelectItem value="0">
              Tidak Aktif
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}