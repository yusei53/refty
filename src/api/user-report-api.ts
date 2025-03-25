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

type UserProfile = {
  image: string;
  isReportOpen: boolean;
};

type IsReportOpen = {
  isReportOpen: boolean;
};

type HourlyPostCount = {
  reflectionsDateGroup: { hour: number; count: number }[];
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
  },

  async getUserProfile(username: string): Promise<Result<UserProfile, 404>> {
    const path = `/api/${username}/report/profile`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURL<UserProfile, 404>(path, options);
  },

  async updateIsReportOpen(
    username: string,
    isReportOpen: boolean
  ): Promise<Result<IsReportOpen, 404>> {
    const path = `/api/${username}/report/toggle-report-open`;
    const options: FetchURLOptions = {
      method: "PATCH",
      body: { isReportOpen },
      headers: {
        "Content-Type": "application/json"
      }
    };
    return await fetchURL<IsReportOpen, 404>(path, options);
  },
  
  async getHourlyPostCount(
    username: string
  ): Promise<Result<HourlyPostCount, 404>> {
    const path = `/api/${username}/report/reflection-time`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURL<HourlyPostCount, 404>(path, options);
  }
};
