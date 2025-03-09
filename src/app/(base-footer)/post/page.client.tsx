"use client";
import type { Folder } from "@/src/api/folder-api";
import ReflectionPostForm from "@/src/features/common/post-form/ReflectionPostForm";
import { useCreateReflectionForm } from "@/src/hooks/reflection/useCreateReflectionForm";
import { useWarningDialog } from "@/src/hooks/reflection/useWarningDialog";

type ReflectionPostFormPageProps = {
  username: string;
  folders: Folder[];
};

const ReflectionPostFormPage: React.FC<ReflectionPostFormPageProps> = ({
  username,
  folders
}) => {
  const {
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
    handleTagChange
  } = useCreateReflectionForm(username);

  useWarningDialog(isDirty, isSubmitSuccessful);

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
      selectedFolderUUID={selectedFolderUUID}
      onFolderChange={handleFolderChange}
      onTagChange={handleTagChange}
      folders={folders}
    />
  );
};

export default ReflectionPostFormPage;
