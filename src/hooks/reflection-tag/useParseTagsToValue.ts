import { TagStateKeys } from "./useTagHandler";

export const useParseTagsToValue = () => {
  const parseTagsToValue = (stateKey: TagStateKeys): string => {
    switch (stateKey) {
      case "isDailyReflection":
        return "振り返り";
      case "isLearning":
        return "学び";
      case "isAwareness":
        return "気づき";
      case "isInputLog":
        return "インプットの記録";
      case "isMonologue":
        return "ひとりごと";
    }
  };

  return {
    parseTagsToValue
  };
};
