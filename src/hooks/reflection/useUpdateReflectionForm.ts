import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { CreateReflectionSchemaType } from "./useCreateReflectionForm";
import { useParseValueToTags } from "../reflection-tag/useParseValueToTags";
import { createReflectionSchema } from "./useCreateReflectionForm";
import { reflectionAPI } from "@/src/api/reflection-api";

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

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting, isSubmitSuccessful, errors }
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
      isMonologue: isMonologue
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
        folderUUID: formData.folderUUID
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
    handleFolderChange
  };
};
