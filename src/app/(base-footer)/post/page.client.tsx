"use client";
import { useRef, useState } from "react";
import { Box } from "@mui/material";
import type { Folder } from "@/src/api/folder-api";
import { BirdAnimation } from "@/src/components/animation";
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

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isNatureMode, setIsNatureMode] = useState<boolean>(false);

  const handlePlayBgm = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/nature.mp3");
      audioRef.current.loop = true;
    }
    try {
      await audioRef.current.play();
    } catch (error) {
      console.error("BGMの再生に失敗しました:", error);
    }
  };

  const handleStopBgm = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleNatureMode = async () => {
    if (!isNatureMode) {
      await handlePlayBgm();
    } else {
      handleStopBgm();
    }
    setIsNatureMode((prev) => !prev);
  };

  return (
    <>
      {isNatureMode && (
        <Box
          position={"fixed"}
          height={"100vh"}
          bgcolor={"#FAFDFB"}
          width={"100vw"}
        >
          <BirdAnimation />
        </Box>
      )}
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
        onNatureMode={handleNatureMode}
        isNatureMode={isNatureMode}
      />
    </>
  );
};

export default ReflectionPostFormPage;
