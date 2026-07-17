import api from "@/lib/api";

import type {
  Mahasantri,
  MahasantriFilterParams,
  MahasantriFiltersResponse,
  MahasantriResponse,
} from "@/types/mahasantri";

export class MahasantriService {
  static async list(
    params: MahasantriFilterParams = {},
  ): Promise<MahasantriResponse> {
    const res = await api.get("/mahasantri", {
      params,
    });

    return res.data;
  }

  static async search(
    params: MahasantriFilterParams,
  ): Promise<MahasantriResponse> {
    const res = await api.get("/mahasantri/search", {
      params,
    });

    return res.data;
  }

  static async detail(
    id: string,
  ): Promise<Mahasantri> {
    const res = await api.get(
      `/mahasantri/${id}`,
    );

    return res.data.data;
  }

  static async total(): Promise<number> {
    const res = await api.get(
      "/mahasantri/total",
    );

    return res.data.total;
  }

  static async filters(): Promise<MahasantriFiltersResponse> {
    const res = await api.get(
      "/mahasantri/filters",
    );

    return res.data;
  }

  static async all(
    params: Omit<
      MahasantriFilterParams,
      "page"
    > = {},
  ): Promise<Mahasantri[]> {
    let page = 1;
    let lastPage = 1;

    const items: Mahasantri[] = [];

    do {
      const res = await this.list({
        ...params,
        page,
        limit: 50,
      });

      items.push(...res.data);

      lastPage = res.meta.last_page;
      page++;
    } while (page <= lastPage);

    return items;
  }
}