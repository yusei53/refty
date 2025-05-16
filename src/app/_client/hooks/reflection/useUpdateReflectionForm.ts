import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { CreateReflectionSchemaType } from "./useCreateReflectionForm";
import { useParseValueToTags } from "../reflection-tag/useParseValueToTags";
import { createReflectionSchema } from "./useCreateReflectionForm";
import { reflectionAPI } from "@/src/app/_client/api/reflection-api";

export type useUpdateReflectionFormProps = {
  reflectionCUID: string;
  username: string;
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
  stopBGM: () => void;
};

export const useUpdateReflectionForm = ({
  reflectionCUID,
  username,
  title,
  content,
  charStamp,
  isPublic,
  isDailyReflection,
  isLearning,
  isAwareness,
  isInputLog,
  isMonologue,
  folderUUID,
  stopBGM
}: useUpdateReflectionFormProps) => {
  const router = useRouter();
  const [selectedEmoji, setSelectedEmoji] = useState(charStamp);
  const [selectedFolderUUID, setSelectedFolderUUID] = useState<string | null>(
    folderUUID ?? null
  );
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    // TODO: watchとresetは本来要らないので削除する
    watch,
    reset
  } = useForm<CreateReflectionSchemaType>({
    resolver: zodResolver(createReflectionSchema),
    defaultValues: {
      title: title,
      content: content,
      charStamp: charStamp,
      isPublic: isPublic,
      isDailyReflection: isDailyReflection,
      isLearning: isLearning,
      isAwareness: isAwareness,
      isInputLog: isInputLog,
      isMonologue: isMonologue,
      folderUUID: folderUUID
    }
  });

  const handleEmojiChange = (emoji: string) => {
    setSelectedEmoji(emoji);
    setValue("charStamp", emoji);
  };

  const handleFolderChange = (folderUUID: string | null) => {
    setSelectedFolderUUID(folderUUID);
    setValue("folderUUID", folderUUID ?? undefined);
  };

  // MEMO: 画像URLを重複しないように追加する関数
  const addImageUrl = (url: string) => {
    if (!imageUrls.includes(url)) {
      const newUrls = [...imageUrls, url];
      setImageUrls(newUrls);
      setValue("imageUrls", newUrls);
    }
  };

  // MEMO: 画像URLを投稿用のimageUrlsから削除する関数
  const removeImageUrl = (url: string) => {
    const newUrls = imageUrls.filter((imageUrl) => imageUrl !== url);
    setImageUrls(newUrls);
    setValue("imageUrls", newUrls);
  };

  const getFileNameFromUrl = (url: string): string | null => {
    const match = url.match(/\/([^/]+)$/);
    return match ? match[1] : null;
  };

  const handleEditorChange = (val: string) => {
    // MEMO: HTMLからimgタグのsrcをすべて抽出
    const doc = new DOMParser().parseFromString(val, "text/html");
    const currentImageUrls = Array.from(doc.querySelectorAll("img"))
      .map((img) => img.getAttribute("src") || "")
      .filter(Boolean);

    // MEMO: 既存のimageUrlsと比較し、消えたURLを検出
    const removedUrls = imageUrls.filter(
      (url) => !currentImageUrls.includes(url)
    );
    removedUrls.forEach(async (url) => {
      // MEMO: 画像URLを送信するFormDataから削除
      removeImageUrl(url);

      const fileName = getFileNameFromUrl(url);
      if (fileName) {
        await reflectionAPI.deleteReflectionImage(fileName);
      }
    });

    // MEMO: imageUrlsを最新に
    setImageUrls(currentImageUrls);
    setValue("imageUrls", currentImageUrls);
  };

  const { handleTagChange } = useParseValueToTags({ setValue });

  const onSubmit = handleSubmit(
    async (formData: CreateReflectionSchemaType) => {
      const res = await reflectionAPI.updateReflection({
        reflectionCUID,
        title: formData.title,
        content: formData.content,
        charStamp: formData.charStamp,
        isPublic: formData.isPublic,
        isDailyReflection: formData.isDailyReflection,
        isLearning: formData.isLearning,
        isAwareness: formData.isAwareness,
        isInputLog: formData.isInputLog,
        isMonologue: formData.isMonologue,
        folderUUID: formData.folderUUID ?? undefined
      });

      if (res === 401) {
        router.push(`/login`);
      } else if (res === 403 || res === 404) {
        notFound();
      } else {
        router.push(`/${username}/${reflectionCUID}?updated=true`);
      }
      stopBGM();
    }
  );

  return {
    control,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    onSubmit,
    selectedEmoji,
    handleEmojiChange,
    handleTagChange,
    selectedFolderUUID,
    handleFolderChange,
    addImageUrl,
    handleEditorChange
    watch,
    reset
  };
};
