import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParseValueToTags } from "../reflection-tag/useParseValueToTags";
import { reflectionAPI } from "@/src/app/_client/api/reflection-api";

export const createReflectionSchema = z.object({
  title: z
    .string()
    .min(1, { message: "タイトルは1文字以上で入力してください。" })
    .max(40, { message: "タイトルは40文字以内で入力してください。" })
    .refine((value) => value.trim().length > 0, {
      message: "タイトルは1文字以上で入力してください。"
    }),
  content: z.string().min(1, { message: "1文字以上入力してください。" }),
  charStamp: z.string(),
  isPublic: z.boolean(),
  isDailyReflection: z.boolean().default(false),
  isLearning: z.boolean().default(false),
  isAwareness: z.boolean().default(false),
  isInputLog: z.boolean().default(false),
  isMonologue: z.boolean().default(false),
  folderUUID: z.string().optional(),
  imageUrls: z.string().array().optional()
});

export type CreateReflectionSchemaType = z.infer<typeof createReflectionSchema>;

export const useCreateReflectionForm = (
  username: string | undefined,
  stopBGM: () => void
) => {
  const router = useRouter();
  const [selectedEmoji, setSelectedEmoji] = useState("💭");
  const [selectedFolderUUID, setSelectedFolderUUID] = useState<string | null>(
    null
  );
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isDirty, isSubmitting, isSubmitSuccessful, errors }
  } = useForm<CreateReflectionSchemaType>({
    resolver: zodResolver(createReflectionSchema),
    defaultValues: {
      title: "",
      content: "",
      charStamp: selectedEmoji,
      isPublic: true,
      isDailyReflection: false,
      isLearning: false,
      isAwareness: false,
      isInputLog: false,
      isMonologue: false
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
      const res = await reflectionAPI.createReflection(formData);
      if (res === 401) {
        router.push(`/login`);
        return;
      }

      const now = new Date();
      //MEMO: UTC時間を日本時間に変換し、剰余演算子を使って24時間表記に変換
      const currentHourInJapan = (now.getUTCHours() + 9) % 24;

      // MEMO: 日本時間で18時〜翌朝4時の判定
      const isEveningOrNight =
        (currentHourInJapan >= 17 && currentHourInJapan < 24) ||
        (currentHourInJapan >= 0 && currentHourInJapan < 4);

      if (isEveningOrNight) {
        router.push(`/${username}?status=posted`);
      } else {
        router.push(`/${username}`);
      }
      stopBGM();
    }
  );

  return {
    control,
    isDirty,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    onSubmit,
    selectedEmoji,
    handleEmojiChange,
    selectedFolderUUID,
    handleFolderChange,
    handleTagChange,
    addImageUrl,
    handleEditorChange
  };
};
