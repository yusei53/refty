"use client";
import ReflectionPostForm from "@/src/features/post-form/ReflectionPostForm";
import { useCreateReflectionForm } from "@/src/hooks/reflection/useCreateReflectionForm";

type ReflectionPostFormPageProps = {
  username: string;
};

const ReflectionPostFormPage: React.FC<ReflectionPostFormPageProps> = ({
  username
}) => {
  const {
    control,
    isSubmitting,
    isSubmitSuccessful,
    errors,
    onSubmit,
    selectedEmoji,
    handleEmojiChange,
    handleTagChange
  } = useCreateReflectionForm(username);

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
      onTagChange={handleTagChange}
    />
  );
};

export default ReflectionPostFormPage;
