import { fetchURL, FetchURLOptions } from "../utils/fetchURL";
import { Result } from "../utils/types/result";

export type Reflection = {
  reflectionCUID: string;
  title: string;
  charStamp: string;
  isPublic: boolean;
  createdAt: string;
  isPinned: boolean;
};

export type ReflectionWithUser = Reflection & {
  user: {
    username: string;
    image: string;
  };
};

type ReflectionAll = {
  reflections: ReflectionWithUser[];
  totalPage: number;
};

export type Reflections = {
  userImage: string;
  reflections: Reflection[];
  totalPage: number;
};

export type ReflectionDetail = Reflection & {
  content: string;
  userId: string;
  user: {
    image: string;
    username: string;
  };
  reflectionCount: number;
};

export const reflectionAPI = {
  async getReflectionAll(
    page: number = 1
  ): Promise<Result<ReflectionAll, 404>> {
    const path = `/api/reflection?page=${page}`;
    const options: FetchURLOptions = {
      method: "GET",
      next: { tags: ["reflections-all"] }
    };
    return await fetchURL<ReflectionAll, 404>(path, options);
  },

  async getReflectionsByUsername(
    username: string,
    page: number = 1
  ): Promise<Result<Reflections, 404>> {
    const path = `/api/reflection/${username}?page=${page}`;
    const options: FetchURLOptions = {
      method: "GET",
      next: { tags: [`reflections-${username}`] }
    };
    return await fetchURL<Reflections, 404>(path, options);
  },

  async getReflectionByCUID(
    reflectionCUID: string
  ): Promise<Result<ReflectionDetail, 404>> {
    const path = `/api/reflection/detail/${reflectionCUID}`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURL<ReflectionDetail, 404>(path, options);
  },

  async createReflection({
    title,
    content,
    charStamp,
    isPublic
  }: {
    title: string;
    content: string;
    charStamp: string;
    isPublic: boolean;
  }): Promise<Result<void, 401>> {
    const path = `/api/reflection`;
    const options: FetchURLOptions = {
      method: "POST",
      body: {
        title,
        content,
        charStamp,
        isPublic
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
    isPublic
  }: {
    reflectionCUID: string;
    title: string;
    content: string;
    charStamp: string;
    isPublic: boolean;
  }): Promise<Result<void, 400 | 401 | 403>> {
    const path = `/api/reflection/detail/${reflectionCUID}`;
    const options: FetchURLOptions = {
      method: "PATCH",
      body: {
        title,
        content,
        charStamp,
        isPublic
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
  }
};
