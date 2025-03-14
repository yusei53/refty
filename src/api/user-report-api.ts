import type { FetchURLOptions } from "../utils/fetchURL";
import type { Result } from "../utils/types/result";
import { fetchURL } from "../utils/fetchURL";

type AllReflectionContent = {
  allContent: string;
};

type PublicPrivateCount = {
  public: number;
  private: number;
};

export const userReportAPI = {
  async getAllReflectionContent(
    username: string
  ): Promise<Result<AllReflectionContent, 404>> {
    const path = `/api/${username}/report/all-content`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURL<AllReflectionContent, 404>(path, options);
  },

  async getPublicPrivateCount(
    username: string
  ): Promise<Result<PublicPrivateCount, 404>> {
    const path = `/api/${username}/report/public-private-reflection`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURL<PublicPrivateCount, 404>(path, options);
  }
};
