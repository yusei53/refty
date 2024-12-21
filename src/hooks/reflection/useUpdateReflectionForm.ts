import { reflectionAPI } from "@/src/api/reflection-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createReflectionSchema,
  CreateReflectionSchemaType
} from "./useCreateReflectionForm";

type useUpdateReflectionFormProps = {
  reflectionCUID: string;
  username: string;
  title: string;
  content: string;
  charStamp: string;
  isPublic: boolean;
};

export const useUpdateReflectionForm = ({
  reflectionCUID,
  username,
  title,
  content,
  charStamp,
  isPublic
}: useUpdateReflectionFormProps) => {
  const router = useRouter();
  const [selectedEmoji, setSelectedEmoji] = useState(charStamp);

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
      isPublic: isPublic
    }
  });

  const handleEmojiChange = (emoji: string) => {
    setSelectedEmoji(emoji);
    setValue("charStamp", emoji);
  };

  const onSubmit = handleSubmit(
    async (formData: CreateReflectionSchemaType) => {
      const res = await reflectionAPI.updateReflection({
        reflectionCUID,
        title: formData.title,
        content: formData.content,
        charStamp: formData.charStamp,
        isPublic: formData.isPublic
      });

      if (res === 401) {
        router.push(`/login`);
      } else if (res === 400 || res === 403) {
        notFound();
      } else {
        router.push(`/${username}/${reflectionCUID}?updated=true`);
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
