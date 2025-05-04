import { useCallback, useEffect, useRef, useState } from "react";
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
  const [draftList, setDraftList] = useState<DraftDataList>({});
  const [currentDraftId, setCurrentDraftId] = useState<string>("");
  const formValuesRef = useRef<CreateReflectionSchemaType>(watch());
  const selectedEmojiRef = useRef(selectedEmoji);
  const selectedFolderUUIDRef = useRef(selectedFolderUUID);
  const isFirstRender = useRef(true);
  const draftListRef = useRef<DraftDataList>({});

  // 保存処理を useCallback で定義
  const saveToLocalStorage = useCallback(() => {
    const currentFormValues = formValuesRef.current;
    if (currentFormValues.title === "" && currentFormValues.content === "") {
      return;
    }

    const draftData: DraftData = {
      formData: currentFormValues,
      selectedEmoji: selectedEmojiRef.current,
      selectedFolderUUID: selectedFolderUUIDRef.current,
      lastSaved: Date.now()
    };

    const newDraftList = {
      ...draftListRef.current,
      [currentDraftId]: draftData
    };

    localStorage.setItem("reflectionDraftList", JSON.stringify(newDraftList));
    draftListRef.current = newDraftList;
    setDraftList(newDraftList);
  }, [currentDraftId]);

  // フォームの値を監視
  useEffect(() => {
    const subscription = watch((value) => {
      formValuesRef.current = value as CreateReflectionSchemaType;

      // 初回レンダリング時は保存しない
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      // 前回のタイマーをクリア
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 2秒間の無操作後に保存
      timeoutRef.current = setTimeout(saveToLocalStorage, 2000);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [watch, saveToLocalStorage]);

  // 絵文字とフォルダーの変更を監視
  useEffect(() => {
    selectedEmojiRef.current = selectedEmoji;
    selectedFolderUUIDRef.current = selectedFolderUUID;

    // 初回レンダリング時は保存しない
    if (isFirstRender.current) {
      return;
    }

    // 前回のタイマーをクリア
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 2秒間の無操作後に保存
    timeoutRef.current = setTimeout(saveToLocalStorage, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selectedEmoji, selectedFolderUUID, saveToLocalStorage]);

  // クライアントでのみlocalStorageやuuidv4()を使う
  useEffect(() => {
    if (typeof window !== "undefined") {
      const list = localStorage.getItem("reflectionDraftList");
      const listData = list ? JSON.parse(list) : {};
      draftListRef.current = listData;
      setDraftList(listData);
      setCurrentDraftId(uuidv4());
    }
  }, []);

  // 投稿成功時の処理
  useEffect(() => {
    if (isSubmitSuccessful && draftListRef.current[currentDraftId]) {
      const newDraftList = { ...draftListRef.current };
      delete newDraftList[currentDraftId];
      localStorage.setItem("reflectionDraftList", JSON.stringify(newDraftList));
      draftListRef.current = newDraftList;
      setDraftList(newDraftList);
    }
  }, [isSubmitSuccessful, currentDraftId]);

  // 下書きの読み込み
  useEffect(() => {
    const loadDraft = (): DraftData | null => {
      const savedDraft = draftListRef.current[currentDraftId];
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
    draftListRef.current = listData;
    setDraftList(listData);
  };

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
