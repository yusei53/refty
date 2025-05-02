import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { CreateReflectionSchemaType } from "./useCreateReflectionForm";
import type { UseFormReset, UseFormWatch } from "react-hook-form";

export type DraftData = {
  formData: CreateReflectionSchemaType;
  selectedEmoji: string;
  selectedFolderUUID: string | null;
  lastSaved: number;
};

export type DraftDataList = {
  [key: string]: DraftData;
};

export const useAutoSave = (
  watch: UseFormWatch<CreateReflectionSchemaType>,
  selectedEmoji: string,
  selectedFolderUUID: string | null,
  isSubmitSuccessful: boolean,
  reset: UseFormReset<CreateReflectionSchemaType>,
  handleEmojiChange: (emoji: string) => void,
  handleFolderChange: (folderUUID: string | null) => void
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  // 初期値はSSR/CSRで同じ値にする
  const [draftList, setDraftList] = useState<DraftDataList>({});
  const [currentDraftId, setCurrentDraftId] = useState<string>("");

  // フォーム全体を監視
  const formValues = watch();

  // クライアントでのみlocalStorageやuuidv4()を使う
  useEffect(() => {
    if (typeof window !== "undefined") {
      const list = localStorage.getItem("reflectionDraftList");
      const listData = list ? JSON.parse(list) : {};
      setDraftList(listData);
      setCurrentDraftId(uuidv4());
    }
  }, []);

  useEffect(() => {
    // 投稿成功時は下書きを削除
    if (isSubmitSuccessful) {
      if (draftList[currentDraftId]) {
        const newDraftList = { ...draftList };
        delete newDraftList[currentDraftId];
        localStorage.setItem(
          "reflectionDraftList",
          JSON.stringify(newDraftList)
        );
        setDraftList(newDraftList);
      }
      return;
    }

    // 前回のタイマーをクリア
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 2秒間の無操作後に保存
    timeoutRef.current = setTimeout(() => {
      if (formValues.title === "" && formValues.content === "") {
        return;
      }

      const draftData: DraftData = {
        formData: formValues,
        selectedEmoji,
        selectedFolderUUID,
        lastSaved: Date.now()
      };
      const draftDataList: DraftDataList = {
        ...draftList,
        [currentDraftId]: draftData
      };
      localStorage.setItem(
        "reflectionDraftList",
        JSON.stringify(draftDataList)
      );
      setDraftList(draftDataList);
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    formValues,
    selectedEmoji,
    selectedFolderUUID,
    isSubmitSuccessful,
    currentDraftId,
    draftList
  ]);

  useEffect(() => {
    // 保存された下書きを取得
    const loadDraft = (): DraftData | null => {
      const savedDraft = draftList[currentDraftId];
      if (!savedDraft) return null;

      return savedDraft;
    };
    const draft = loadDraft();
    if (draft) {
      reset(draft.formData);
      handleEmojiChange(draft.selectedEmoji);
      handleFolderChange(draft.selectedFolderUUID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDraftId]);

  const deleteDraft = (id: string) => {
    const list = localStorage.getItem("reflectionDraftList");
    const listData = list ? JSON.parse(list) : {};
    delete listData[id];
    localStorage.setItem("reflectionDraftList", JSON.stringify(listData));
    setDraftList(listData);
  };

  // 下書きの切り替え処理
  const handleDraftChange = (draftId: string) => {
    setCurrentDraftId(draftId);
  };

  return {
    deleteDraft,
    draftList,
    currentDraftId,
    handleDraftChange
  };
};
