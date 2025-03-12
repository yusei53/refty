import type { FetchURLOptions } from "../utils/fetchURL";
import type { Result } from "../utils/types/result";
import { fetchURL } from "../utils/fetchURL";

type TotalReflectionContent = {
  totalContent: string;
};

export const reflectionCharCountAPI = {
  async getTotalReflectionContent(
    username: string
  ): Promise<Result<TotalReflectionContent, 404>> {
    const path = `/api/${username}/detail/total-content`;
    const options: FetchURLOptions = {
      method: "GET",
      next: { tags: [`reflections-${username}`] }
    };
    return await fetchURL<TotalReflectionContent, 404>(path, options);
  }
};
