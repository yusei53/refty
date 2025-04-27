import { useEffect, useState } from "react";

export const useWarningDialog = (
  isDirty: boolean,
  isSubmitSuccessful: boolean
) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // NOTE: 投稿ページで変更があった場合、または投稿が成功していない場合にhasUnsavedChangesをtrueにする
  useEffect(() => {
    if (isDirty && !isSubmitSuccessful) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [isDirty, isSubmitSuccessful]);

  // NOTE: ページを離れる際に警告ダイアログを表示する
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  return hasUnsavedChanges;
};
