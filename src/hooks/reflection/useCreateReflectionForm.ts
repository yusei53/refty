import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { reflectionAPI } from "@/src/api/reflection-api";

export const createReflectionSchema = z.object({
  title: z
    .string()
    .min(1, { message: "タイトルは1文字以上で入力してください。" })
    .max(40, { message: "タイトルは40文字以内で入力してください。" }),
  content: z
    .string()
    .min(1, { message: "本文は1文字以上で入力してください。" }),
  charStamp: z.string(),
  isPublic: z.boolean()
});

export type CreateReflectionSchemaType = z.infer<typeof createReflectionSchema>;

export const useCreateReflectionForm = (username: string | undefined) => {
  const router = useRouter();
  const [selectedEmoji, setSelectedEmoji] = useState("💭");

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful, errors }
  } = useForm<CreateReflectionSchemaType>({
    resolver: zodResolver(createReflectionSchema),
    defaultValues: {
      title: "",
      content: "",
      charStamp: selectedEmoji,
      isPublic: true
    }
  });

  const handleEmojiChange = (emoji: string) => {
    setSelectedEmoji(emoji);
    setValue("charStamp", emoji);
  };

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
        (currentHourInJapan >= 18 && currentHourInJapan < 24) ||
        (currentHourInJapan >= 0 && currentHourInJapan < 4);

      if (isEveningOrNight) {
        router.push(`/${username}?status=posted`);
      } else {
        router.push(`/${username}`);
      }
    }
  );

  return {
    control,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    onSubmit,
    selectedEmoji,
    handleEmojiChange
  };
};
