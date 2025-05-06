import type { FetchFormDataURLOptions } from "../utils/fetchFormDataURL";
import type { FetchURLOptions, Result } from "../utils/fetchURL";
import { fetchFormDataURL } from "../utils/fetchFormDataURL";
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

// TODO: 命名をいい感じにする
export type ReflectionWithIncludeContent = Reflection & {
  content: string;
};

type Reflections = {
  reflections: (Reflection | ReflectionWithIncludeContent)[];
  totalPage: number;
  filteredReflectionCount: number;
  tagCountList: ReflectionTagCountList;
};

type ReflectionDetail = Reflection & {
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

const getQueryParameters = (
  page: number,
  tag?: string,
  folderUUID?: string,
  isDetailMode: boolean = false
) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  if (tag) params.append("tag", tag);
  if (folderUUID) params.append("folder", folderUUID);
  if (isDetailMode) params.append("viewMode", "detail");
  return params;
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
    tag?: string,
    folderUUID?: string,
    isDetailMode: boolean = false
  ): Promise<Result<Reflections, 404>> {
    const q = getQueryParameters(page, tag, folderUUID, isDetailMode);
    const path = `/api/reflection/${username}?${q.toString()}`;
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

  async getEditReflectionByCUID(
    headers: HeadersInit | undefined,
    reflectionCUID: string
  ): Promise<Result<ReflectionDetail, 401 | 403 | 404>> {
    const path = `/api/reflection/detail/${reflectionCUID}/edit`;
    const options: FetchURLOptions = {
      method: "GET",
      headers
    };
    return await fetchURL<ReflectionDetail, 401 | 403 | 404>(path, options);
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
    folderUUID,
    imageUrls
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
    imageUrls?: string[];
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
        folderUUID: folderUUID || null,
        imageUrls: imageUrls || null
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
  }): Promise<Result<void, 401 | 403 | 404>> {
    const path = `/api/reflection/detail/${reflectionCUID}/edit`;
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
    return await fetchURL<void, 401 | 403 | 404>(path, options);
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
  },

  async bulkUpdateFolderReflection({
    reflectionCUID,
    folderUUID,
    username
  }: {
    reflectionCUID: string[];
    folderUUID: string;
    username: string;
  }): Promise<Result<void, 401>> {
    const path = `/api/reflection/bulk-select`;
    const options: FetchURLOptions = {
      method: "POST",
      body: {
        reflectionCUID,
        folderUUID,
        username
      },
      headers: {
        "Content-Type": "application/json"
      }
    };
    return await fetchURL<void, 401>(path, options);
  },

  async uploadReflectionImage(
    reflectionImageFormData: FormData
  ): Promise<Result<{ imageUrl: string }, 401>> {
    const path = `/api/reflection/image`;
    const options: FetchFormDataURLOptions = {
      method: "POST",
      body: reflectionImageFormData
    };
    return await fetchFormDataURL<{ imageUrl: string }, 401>(path, options);
  },

  async deleteReflectionImage(fileName: string): Promise<Result<void, 401>> {
    const path = `/api/reflection/image/${fileName}`;
    const options: FetchURLOptions = {
      method: "DELETE"
    };
    return await fetchURL<void, 401>(path, options);
  }
};
