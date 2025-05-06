import { useCallback, useEffect, useRef, useState } from "react";
import type { CreateReflectionSchemaType } from "./useCreateReflectionForm";
import type { UseFormReset, UseFormWatch } from "react-hook-form";
import { useDraftId } from "./useDraftId";

export type DraftData = {
  formData: CreateReflectionSchemaType;
  lastSaved: number; // NOTE: 経過時間の計算だけなら number型でOK
};

export type DraftDataList = {
  [key: string]: DraftData;
};

const STORAGE_KEY = "reflectionDraftList";

const getDraftListFromLocalStorage = (): DraftDataList => {
  const list = localStorage.getItem(STORAGE_KEY);
  return list ? JSON.parse(list) : {};
};

const setDraftListToLocalStorage = (draftList: DraftDataList) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draftList));
};

const deleteDraftById = (id: string) => {
  const list = getDraftListFromLocalStorage();
  delete list[id];
  setDraftListToLocalStorage(list);
};

const getDraftById = (id: string): DraftData | null => {
  const list = getDraftListFromLocalStorage();
  return list[id] ?? null;
};

export const useAutoSave = (
  watch: UseFormWatch<CreateReflectionSchemaType>,
  isSubmitSuccessful: boolean,
  reset: UseFormReset<CreateReflectionSchemaType>
) => {
  const [currentDraftId, setCurrentDraftId] = useDraftId();
  const [draftList, setDraftList] = useState<DraftDataList>({});
  const formValuesRef = useRef<CreateReflectionSchemaType>(watch());
  const isFirstRenderRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const saveToLocalStorage = useCallback(() => {
    const currentForm = formValuesRef.current;
    if (currentForm.title === "" && currentForm.content === "") return;

    const draftData: DraftData = {
      formData: currentForm,
      lastSaved: Date.now()
    };
    const newDraftList = {
      ...getDraftListFromLocalStorage(),
      [currentDraftId]: draftData
    };

    // NOTE: 下書きリストをlocalStorageに保存する
    setDraftListToLocalStorage(newDraftList);

    // NOTE: 下書きリストをstate(ユーザーに見えるリスト)に保存する
    setDraftList(newDraftList);
  }, [currentDraftId]);

  useEffect(() => {
    const subscription = watch((value) => {
      formValuesRef.current = value as CreateReflectionSchemaType;

      // NOTE: 初回レンダリング時はスキップ
      if (isFirstRenderRef.current) {
        isFirstRenderRef.current = false;
        return;
      }

      // NOTE: 連続で入力があった時に前の保存予約タイマー(1秒)をクリア
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // NOTE: 1秒ごとに保存
      timeoutRef.current = setTimeout(saveToLocalStorage, 1000);
    });

    // NOTE: アンマウント時に監視の解除と保存予約タイマーのクリア
    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [watch, saveToLocalStorage]);

  // NOTE: 下書きIDが変更された時にフォームの値を下書きデータ（draft.formData）で上書き（reset）する
  useEffect(() => {
    setDraftList(getDraftListFromLocalStorage());

    const draft = getDraftById(currentDraftId);
    reset(draft?.formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDraftId]);

  // NOTE: 投稿成功時に下書きを削除する
  useEffect(() => {
    if (isSubmitSuccessful && getDraftById(currentDraftId)) {
      deleteDraftById(currentDraftId);
      getDraftListFromLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  // NOTE: ユーザーが任意で下書きを削除する
  const deleteDraft = (id: string) => {
    deleteDraftById(id);
    setDraftList(getDraftListFromLocalStorage());
  };

  // NOTE: 下書きを切り替える
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
