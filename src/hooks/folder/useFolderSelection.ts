import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ReflectionTagCountList } from "@/src/api/reflection-api";
import { tagMap, type TagType } from "../reflection-tag/useExtractTrueTags";
import { folderAPI } from "@/src/api/folder-api";
import { reflectionAPI } from "@/src/api/reflection-api";
import { getReflectionWithFolderInfo } from "@/src/utils/actions/get-reflection-with-folder-info";
import { useFolderStore } from "@/src/utils/store/useFolderStore";

export const useFolderSelection = (username: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedReflections, setSelectedReflections] = useState<string[]>([]);

  const router = useRouter();
  const {
    folders: foldersState,
    selectedInfo,
    setFolders,
    setSelectedInfo
  } = useFolderStore();

  const isFolderSelected = foldersState.some(
    (f) => f.folderUUID === selectedInfo
  );
  const disableAdd = selectedReflections.length === 0 || isLoading;

  const getFolderSelectionInfo = (folderUUID: string) => {
    const folder = foldersState.find((f) => f.folderUUID === folderUUID);
    return folder
      ? { name: folder.name, count: folder.countByFolder || 0 }
      : null;
  };

  const getTagSelectionInfo = (
    tagId: string,
    tagCountList: ReflectionTagCountList
  ) => {
    const tagName = tagMap[tagId as keyof TagType];
    return tagName
      ? {
          name: tagName,
          count: tagCountList[tagId as keyof ReflectionTagCountList] || 0
        }
      : null;
  };

  // NOTE: 選択されたフォルダかタグの投稿数を取得する。
  const getSelectedInfo = (tagCountList: ReflectionTagCountList) => {
    if (!selectedInfo) return null;
    return (
      getFolderSelectionInfo(selectedInfo) ||
      getTagSelectionInfo(selectedInfo, tagCountList)
    );
  };

  const handleSelectMode = async (folderUUID: string) => {
    router.push(`/${username}`);
    setIsSelectMode(true);
    setSelectedInfo(folderUUID);
    const info = await getReflectionWithFolderInfo(username, folderUUID);
    if (!info) return;
    const preSelected = info.map((i) => i.reflectionCUID);
    setSelectedReflections(preSelected);
  };

  const handleSelect = (reflectionCUID: string) => {
    setSelectedReflections((prev) => {
      if (prev.includes(reflectionCUID)) {
        return prev.filter((id) => id !== reflectionCUID);
      }
      return [...prev, reflectionCUID];
    });
  };

  const handleCancelSelectMode = () => {
    setIsSelectMode(false);
    setSelectedReflections([]);
    setSelectedInfo("");
  };

  const handleAddReflectionToFolder = async () => {
    setIsLoading(true);
    await reflectionAPI.bulkUpdateFolderReflection({
      reflectionCUID: selectedReflections,
      folderUUID: selectedInfo,
      username
    });
    const updatedFolders = await folderAPI.getFolder(username);
    if (updatedFolders === 404) {
      return router.refresh();
    }

    setFolders(updatedFolders);
    setIsSelectMode(false);
    setSelectedReflections([]);
    setIsLoading(false);
    router.push(`/${username}?folder=${selectedInfo}`);
    router.refresh();
  };

  return {
    isSelectMode,
    selectedReflections,
    selectedInfo,
    isFolderSelected,
    disableAdd,
    handleSelectMode,
    handleSelect,
    handleCancelSelectMode,
    handleAddReflectionToFolder,
    getFolderSelectionInfo,
    getTagSelectionInfo,
    getSelectedInfo
  };
};
