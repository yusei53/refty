import type { FetchURLOptions } from "../utils/fetchURL";
import type { Result } from "../utils/types/result";
import { fetchURL } from "../utils/fetchURL";

export type RandomReflection = {
  reflectionCUID: string;
  title: string;
  charStamp: string;
  isPublic: boolean;
  isPinned: boolean;
  createdAt: string;
};

export type Reflection = {
  reflectionCUID: string;
  title: string;
  charStamp: string;
  isPublic: boolean;
  isPinned: boolean;
  isDailyReflection: boolean;
  isLearning: boolean;
  isAwareness: boolean;
  isInputLog: boolean;
  isMonologue: boolean;
  folderUUID: string | null;
  createdAt: string;
};

export type ReflectionWithUser = Reflection & {
  user: {
    username: string;
    image: string;
  };
};

export type ReflectionTagCountList = {
  isDailyReflection: number;
  isLearning: number;
  isAwareness: number;
  isMonologue: number;
  isInputLog: number;
};

type ReflectionAll = {
  reflections: ReflectionWithUser[];
  totalPage: number;
  filteredReflectionCount: number;
};

export type Reflections = {
  userImage: string;
  bio: string;
  goal: string;
  website: string;
  reflections: Reflection[];
  totalPage: number;
  filteredReflectionCount: number;
  tagCountList: ReflectionTagCountList;
};

export type ReflectionDetail = Reflection & {
  content: string;
  aiFeedback: string;
  userId: string;
  user: {
    image: string;
    username: string;
  };
  folderUUID?: string;
  reflectionCount: number;
};

export const reflectionAPI = {
  async getReflectionAll(
    page: number = 1,
    tag?: string
  ): Promise<Result<ReflectionAll, 404>> {
    const tagParam = tag && `&tag=${tag}`;
    const path = `/api/reflection?page=${page}${tagParam}`;
    const options: FetchURLOptions = {
      method: "GET",
      next: { tags: ["reflections-all"] }
    };
    return await fetchURL<ReflectionAll, 404>(path, options);
  },

  async getReflectionsByUsername(
    headers: HeadersInit | undefined,
    username: string,
    page: number = 1,
    tag?: string
  ): Promise<Result<Reflections, 404>> {
    const tagParam = tag && `&tag=${tag}`;
    const path = `/api/reflection/${username}?page=${page}${tagParam}`;
    const options: FetchURLOptions = {
      method: "GET",
      next: { tags: [`reflections-${username}`] },
      headers: headers
    };
    return await fetchURL<Reflections, 404>(path, options);
  },

  async getDetailReflectionByCUID(
    reflectionCUID: string
  ): Promise<Result<ReflectionDetail, 404>> {
    const path = `/api/reflection/detail/${reflectionCUID}`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURL<ReflectionDetail, 404>(path, options);
  },

  async getRandomReflection(
    headers: HeadersInit | undefined,
    username: string
  ): Promise<Result<RandomReflection, 403 | 404>> {
    const path = `/api/${username}/random-reflection`;
    const options: FetchURLOptions = {
      method: "GET",
      headers: headers
    };
    return await fetchURL<RandomReflection, 403 | 404>(path, options);
  },

  async createReflection({
    title,
    content,
    charStamp,
    isPublic,
    isDailyReflection,
    isLearning,
    isAwareness,
    isInputLog,
    isMonologue,
    folderUUID
  }: {
    title: string;
    content: string;
    charStamp: string;
    isPublic: boolean;
    isDailyReflection: boolean;
    isLearning: boolean;
    isAwareness: boolean;
    isInputLog: boolean;
    isMonologue: boolean;
    folderUUID?: string;
  }): Promise<Result<void, 401>> {
    const path = `/api/reflection`;
    const options: FetchURLOptions = {
      method: "POST",
      body: {
        title,
        content,
        charStamp,
        isPublic,
        isDailyReflection,
        isLearning,
        isAwareness,
        isInputLog,
        isMonologue,
        folderUUID: folderUUID || null
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    return await fetchURL<void, 401>(path, options);
  },

  async updateReflection({
    reflectionCUID,
    title,
    content,
    charStamp,
    isPublic,
    isDailyReflection,
    isLearning,
    isAwareness,
    isInputLog,
    isMonologue,
    folderUUID
  }: {
    reflectionCUID: string;
    title: string;
    content: string;
    charStamp: string;
    isPublic: boolean;
    isDailyReflection: boolean;
    isLearning: boolean;
    isAwareness: boolean;
    isInputLog: boolean;
    isMonologue: boolean;
    folderUUID?: string;
  }): Promise<Result<void, 400 | 401 | 403>> {
    const path = `/api/reflection/detail/${reflectionCUID}`;
    const options: FetchURLOptions = {
      method: "PATCH",
      body: {
        title,
        content,
        charStamp,
        isPublic,
        isDailyReflection,
        isLearning,
        isAwareness,
        isInputLog,
        isMonologue,
        folderUUID: folderUUID || null
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    return await fetchURL<void, 400 | 401 | 403>(path, options);
  },

  async deleteReflection(reflectionCUID: string): Promise<Result<void, 401>> {
    const path = `/api/reflection/detail/${reflectionCUID}`;
    const options: FetchURLOptions = {
      method: "DELETE"
    };
    return await fetchURL<void, 401>(path, options);
  },

  async updatePinnedReflection({
    reflectionCUID,
    isPinned
  }: {
    reflectionCUID: string;
    isPinned: boolean;
  }): Promise<Result<void, 401>> {
    const path = `/api/reflection/pinned/${reflectionCUID}`;
    const options: FetchURLOptions = {
      method: "PATCH",
      body: {
        isPinned
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    return await fetchURL<void, 401>(path, options);
  },

  async updatePublicReflection({
    reflectionCUID,
    isPublic
  }: {
    reflectionCUID: string;
    isPublic: boolean;
  }): Promise<Result<void, 401>> {
    const path = `/api/reflection/public/${reflectionCUID}`;
    const options: FetchURLOptions = {
      method: "PATCH",
      body: {
        isPublic
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    return await fetchURL<void, 401>(path, options);
  }
};
