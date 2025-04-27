import type { ReflectionTagCountList } from "./reflection-api";
import type { FetchURLOptions } from "../utils/fetchURL";
import type { Result } from "../utils/types/result";
import { fetchURL } from "../utils/fetchURL";

type TagCountList = {
  tagCountList: ReflectionTagCountList;
};

export const reflectionsTagCountAPI = {
  async getReflectionTagCountList(): Promise<Result<TagCountList, 500>> {
    const path = `/api/reflection/tag-counts`;
    const options: FetchURLOptions = {
      method: "GET"
    };
    return await fetchURL<TagCountList, 500>(path, options);
  }
};
