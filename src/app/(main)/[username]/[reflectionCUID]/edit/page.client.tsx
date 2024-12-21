"use client";
import ReflectionPostForm from "@/src/components/post-form/ReflectionPostForm";
import { useUpdateReflectionForm } from "@/src/hooks/reflection/useUpdateReflectionForm";

type ReflectionUpdateFormPageProps = {
  username: string;
  reflectionCUID: string;
  title: string;
  content: string;
  charStamp: string;
  isPublic: boolean;
};

const ReflectionUpdateFormPage: React.FC<ReflectionUpdateFormPageProps> = ({
  username,
  reflectionCUID,
  title,
  content,
  charStamp,
  isPublic,
}) => {
  const {
    control,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    onSubmit,
    selectedEmoji,
    handleEmojiChange,
  } = useUpdateReflectionForm({
    reflectionCUID,
    username,
    title,
    content,
    charStamp,
    isPublic,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
  };

  return (
    <ReflectionPostForm
      control={control}
      isSubmitting={isSubmitting}
      isSubmitSuccessful={isSubmitSuccessful}
      errors={errors}
      onSubmit={handleSubmit}
      selectedEmoji={selectedEmoji}
      onEmojiChange={handleEmojiChange}
    />
  );
};

export default ReflectionUpdateFormPage;
