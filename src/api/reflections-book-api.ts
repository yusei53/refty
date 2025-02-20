import type { FetchURLOptions } from "../utils/fetchURL";
import type { Result } from "../utils/types/result";
import { fetchURL } from "../utils/fetchURL";

// TODO: 命名変える
export type ReflectionBook = {
  reflectionCUID: string;
  title: string;
  content: string;
  isPublic: boolean;
  isDailyReflection: boolean;
  isLearning: boolean;
  isAwareness: boolean;
  isMonologue: boolean;
  isInputLog: boolean;
  createdAt: string;
};

type ReflectionsBook = {
  reflections: ReflectionBook[];
  folderName: string;
};

export const reflectionsBookAPI = {
  async getReflections(
    username: string,
    folderUUID?: string
  ): Promise<Result<ReflectionsBook, 404>> {
    const query = folderUUID ? `?folder=${folderUUID}` : "";
    const path = `/api/${username}/reflections-book${query}`;

    const options: FetchURLOptions = {
      method: "GET",
      next: { tags: [`reflections-book-${username}`] }
    };
    return await fetchURL<ReflectionsBook, 404>(path, options);
  }
};
