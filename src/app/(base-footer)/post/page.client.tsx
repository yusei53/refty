"use client";
import { useState } from "react";
import type { Folder } from "@/src/api/folder-api";
import ReflectionPostForm from "@/src/features/common/post-form/ReflectionPostForm";
import { useBGMPlayer } from "@/src/hooks/audio/useBGMPlayer";
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
  const [isNightMode, setIsNightMode] = useState(false);
  const { playTrack, stop, currentTrack, getBGMName } = useBGMPlayer({
    bird: "/nature.mp3",
    rain: "/rain.mp3",
    star: "/star.mp3",
    piano: "/piano.mp3"
  });

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
  } = useCreateReflectionForm(username, stop);

  useWarningDialog(isDirty, isSubmitSuccessful);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
    setIsNightMode(false);
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
      playTrack={playTrack}
      stop={stop}
      currentTrack={currentTrack}
      getBGMName={getBGMName}
      isNightMode={isNightMode}
      setIsNightMode={setIsNightMode}
    />
  );
};

export default ReflectionPostFormPage;
