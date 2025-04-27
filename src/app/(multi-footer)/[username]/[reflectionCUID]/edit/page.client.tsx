"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import type { Folder } from "@/src/app/_client/api/folder-api";
import { DefaultLoading } from "@/src/components/loading";
import { useBGMPlayer } from "@/src/hooks/audio/useBGMPlayer";
import { useUpdateReflectionForm } from "@/src/hooks/reflection/useUpdateReflectionForm";

// NOTE: next15にしてからhydration errorが出るようになったので、一旦dynamic importで回避
const ReflectionPostForm = dynamic(
  () => import("@/src/features/common/post-form/ReflectionPostForm"),
  {
    loading: () => <DefaultLoading />,
    ssr: false
  }
);

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
  folderUUID?: string;
  folders: Folder[];
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
  isMonologue,
  folderUUID,
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
    isSubmitting,
    isSubmitSuccessful,
    errors,
    onSubmit,
    selectedEmoji,
    handleEmojiChange,
    handleTagChange,
    selectedFolderUUID,
    handleFolderChange
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
    isMonologue,
    folderUUID,
    stopBGM: stop
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
      selectedFolderUUID={selectedFolderUUID}
      onFolderChange={handleFolderChange}
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

export default ReflectionUpdateFormPage;
