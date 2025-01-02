import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ReflectionTagCountList } from "@/src/api/reflection-api";
import { tagMap } from "./useExtractTrueTags";

export const useTagManager = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpenTagList, setIsOpenTagList] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const newParams = new URLSearchParams(searchParams.toString());

  const handleToggleTags = () => {
    setIsOpenTagList((prev) => {
      if (prev) {
        setSelectedTag(null);
        newParams.delete("tag");
        newParams.delete("page");
        router.push(`?${newParams.toString()}`);
      }
      return !prev;
    });
  };

  const createUpdatedParams = (tagKey: string): URLSearchParams => {
    const currentPageParams = searchParams.get("page");
    const currentTagParams = searchParams.get("tag");

    if (currentTagParams === tagKey) {
      newParams.delete("tag");
    } else {
      newParams.set("tag", tagKey);
    }

    if (currentPageParams) {
      newParams.delete("page");
    }

    return newParams;
  };

  const handleTagChange = (tag: string) => {
    const tagKey = Object.keys(tagMap).find(
      (key) => tagMap[key as keyof typeof tagMap] === tag
    );
    if (!tagKey) return;

    setSelectedTag((prev) => (prev === tag ? null : tag));

    const newParams = createUpdatedParams(tagKey);
    router.push(`?${newParams.toString()}`);
  };

  const getSelectedTagCount = (
    tagCountList: ReflectionTagCountList,
    selectedTag: string | null
  ) => {
    if (!selectedTag) return 0;

    let selectedTagCount = 0;

    switch (selectedTag) {
      case "振り返り":
        selectedTagCount = tagCountList.isDailyReflection;
        break;
      case "学び":
        selectedTagCount = tagCountList.isLearning;
        break;
      case "気づき":
        selectedTagCount = tagCountList.isAwareness;
        break;
      case "ひとりごと":
        selectedTagCount = tagCountList.isMonologue;
        break;
      case "インプットの記録":
        selectedTagCount = tagCountList.isInputLog;
        break;
      default:
        selectedTagCount = 0;
    }

    return selectedTagCount;
  };

  return {
    isOpenTagList,
    selectedTag,
    handleToggleTags,
    handleTagChange,
    getSelectedTagCount
  };
};
