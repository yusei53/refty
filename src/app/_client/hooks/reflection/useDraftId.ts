import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const useDraftId = () => {
  const [draftId, setDraftId] = useState<string>("");

  useEffect(() => {
    setDraftId(uuidv4());
  }, []);

  return [draftId, setDraftId] as const;
};
