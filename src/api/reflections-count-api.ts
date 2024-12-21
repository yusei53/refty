import type { FetchURLOptions } from "../utils/fetchURL";
import type { Result } from "../utils/types/result";
import { fetchURL } from "../utils/fetchURL";

export type ReflectionPerDate = {
  date: string;
  countReflections: number;
};

export type ReflectionsCount = {
  totalReflections: string;
  reflectionsPerDate: ReflectionPerDate[];
};

export const reflectionsCountAPI = {
  async getReflectionsCount(
    username: string
  ): Promise<Result<ReflectionsCount, 404>> {
    const path = `/api/${username}/reflections-count`;
    const options: FetchURLOptions = {
      method: "GET",
      next: { tags: [`reflections-${username}`] }
    };
    return await fetchURL<ReflectionsCount, 404>(path, options);
  }
};
