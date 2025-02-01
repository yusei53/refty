"use client";
import ReflectionPostForm from "@/src/features/common/post-form/ReflectionPostForm";
import { useUpdateReflectionForm } from "@/src/hooks/reflection/useUpdateReflectionForm";

type ReflectionUpdateFormPageProps = {
  username: string;
  reflectionCUID: string;
  title: string;
  content: string;
  charStamp: string;
  isPublic: boolean;
  isDailyReflection: boolean;
  isLearning: boolean;
  isAwareness: boolean;
  isInputLog: boolean;
  isMonologue: boolean;
};

const ReflectionUpdateFormPage: React.FC<ReflectionUpdateFormPageProps> = ({
  username,
  reflectionCUID,
  title,
  content,
  charStamp,
  isPublic,
  isDailyReflection,
  isLearning,
  isAwareness,
  isInputLog,
  isMonologue
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
  } = useUpdateReflectionForm({
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
    isMonologue
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
      onTagChange={handleTagChange}
      isDailyReflection={isDailyReflection}
      isLearning={isLearning}
      isAwareness={isAwareness}
      isInputLog={isInputLog}
      isMonologue={isMonologue}
      selectedFolderUUID={null}
      onFolderChange={() => {}}
      folders={[]}
    />
  );
};

export default ReflectionUpdateFormPage;
