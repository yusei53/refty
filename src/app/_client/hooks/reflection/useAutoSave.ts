import { useEffect, useRef } from "react";
import type { UseFormWatch } from "react-hook-form";

type FormValues = {
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
};

type AutoSaveData = {
  formData: FormValues;
  selectedEmoji: string;
  selectedFolderUUID: string | null;
  lastSaved: number;
};

export const useAutoSave = (
  watch: UseFormWatch<FormValues>,
  selectedEmoji: string,
  selectedFolderUUID: string | null,
  isSubmitSuccessful: boolean
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  // フォーム全体を監視
  const formValues = watch();

  useEffect(() => {
    // 投稿成功時は下書きを削除
    if (isSubmitSuccessful) {
      localStorage.removeItem("reflectionDraft");
      return;
    }

    // 前回のタイマーをクリア
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 2秒間の無操作後に保存
    timeoutRef.current = setTimeout(() => {
      const draftData: AutoSaveData = {
        formData: formValues,
        selectedEmoji,
        selectedFolderUUID,
        lastSaved: Date.now()
      };
      localStorage.setItem("reflectionDraft", JSON.stringify(draftData));
    }, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [formValues, selectedEmoji, selectedFolderUUID, isSubmitSuccessful]);

  // 保存された下書きを取得
  const loadDraft = (): AutoSaveData | null => {
    const savedDraft = localStorage.getItem("reflectionDraft");
    if (!savedDraft) return null;

    try {
      return JSON.parse(savedDraft);
    } catch {
      return null;
    }
  };

  return { loadDraft };
};
