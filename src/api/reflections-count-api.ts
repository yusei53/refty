import { fetchURL, FetchURLOptions } from "../utils/fetchURL";
import { Result } from "../utils/types/result";

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
      next: { tags: ["reflections-with-user"] },
    };
    return await fetchURL<ReflectionsCount, 404>(path, options);
  },
};
