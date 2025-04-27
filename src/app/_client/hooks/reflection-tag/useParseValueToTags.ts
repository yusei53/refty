import { useCallback } from "react";

export type TagStateKeys =
  | "isDailyReflection"
  | "isLearning"
  | "isAwareness"
  | "isInputLog"
  | "isMonologue";

type UseParseValueToTagsProps = {
  setValue: (field: TagStateKeys, value: boolean) => void;
};

export const useParseValueToTags = ({ setValue }: UseParseValueToTagsProps) => {
  const handleTagChange = useCallback(
    (tag: string, isSelected: boolean) => {
      switch (tag) {
        case "振り返り":
          setValue("isDailyReflection", isSelected);
          break;
        case "学び":
          setValue("isLearning", isSelected);
          break;
        case "気づき":
          setValue("isAwareness", isSelected);
          break;
        case "インプットの記録":
          setValue("isInputLog", isSelected);
          break;
        case "ひとりごと":
          setValue("isMonologue", isSelected);
          break;
      }
    },
    [setValue]
  );

  return {
    handleTagChange
  };
};
