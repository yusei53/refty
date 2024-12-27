import { useMemo } from "react";

type TagType = {
  isDailyReflection: boolean;
  isLearning: boolean;
  isAwareness: boolean;
  isInputLog: boolean;
  isMonologue: boolean;
};

export const tagMap: Record<keyof TagType, string> = {
  isDailyReflection: "振り返り",
  isLearning: "学び",
  isAwareness: "気づき",
  isMonologue: "ひとりごと",
  isInputLog: "インプットの記録"
};

export const useExtractTrueTags = (tags: TagType): string[] => {
  return useMemo(() => {
    return Object.entries(tags)
      .filter(([, value]) => value)
      .map(([key]) => tagMap[key as keyof TagType]);
  }, [tags]);
};
