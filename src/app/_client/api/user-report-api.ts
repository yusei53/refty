import type { ReflectionTagCountList } from "./reflection-api";
import type { ReflectionsCount } from "./reflections-count-api";
import type { FetchURLOptions, Result } from "../utils/fetchURL";
import type { Session } from "next-auth";
import { fetchURL } from "../utils/fetchURL";
import { fetchURLDirect } from "../utils/fetchURLDirect";

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

type ReportStatus = {
  isReportOpen: boolean;
  userImage: string;
  session: Session["user"];
};

type HourlyPostCount = {
  reflectionsDateGroup: { hour: number; count: number }[];
};

export const userReportAPI = {
  async getReportStatus(
    username: string,
    headers: HeadersInit | undefined
  ): Promise<Result<ReportStatus, 403 | 404>> {
    const path = `/api/${username}/report/status`;
    const options: FetchURLOptions = {
      method: "GET",
      headers
    };
    return await fetchURL<ReportStatus, 403 | 404>(path, options);
  },

  async getReflectionsCount(username: string): Promise<ReflectionsCount> {
    const path = `/api/${username}/reflections-count`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURLDirect<ReflectionsCount>(path, options);
  },

  async getAllReflectionContent(
    username: string
  ): Promise<AllReflectionContent> {
    const path = `/api/${username}/report/all-content`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURLDirect<AllReflectionContent>(path, options);
  },

  async getPublicPrivateCount(username: string): Promise<PublicPrivateCount> {
    const path = `/api/${username}/report/public-private-reflection`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURLDirect<PublicPrivateCount>(path, options);
  },

  async getUserProfile(username: string): Promise<UserProfile> {
    const path = `/api/${username}/report/profile`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURLDirect<UserProfile>(path, options);
  },

  async getHourlyPostCount(username: string): Promise<HourlyPostCount> {
    const path = `/api/${username}/report/reflection-time`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURLDirect<HourlyPostCount>(path, options);
  },

  async getTagCount(username: string): Promise<ReflectionTagCountList> {
    const path = `/api/${username}/report/tag-count`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURLDirect<ReflectionTagCountList>(path, options);
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
  }
};
