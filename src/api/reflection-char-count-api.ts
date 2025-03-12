import type { FetchURLOptions } from "../utils/fetchURL";
import type { Result } from "../utils/types/result";
import { fetchURL } from "../utils/fetchURL";

type AllReflectionContent = {
  allContent: string;
};

export const reflectionCharCountAPI = {
  async getAllReflectionContent(
    username: string
  ): Promise<Result<AllReflectionContent, 404>> {
    const path = `/api/${username}/detail/all-content`;
    const options: FetchURLOptions = {
      method: "GET",
      next: { tags: [`reflections-${username}`] }
    };
    return await fetchURL<AllReflectionContent, 404>(path, options);
  }
};
