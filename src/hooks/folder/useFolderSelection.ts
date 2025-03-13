import { useState } from "react";
import { useRouter } from "next/navigation";
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
    isLoading,
    isSelectMode,
    selectedReflections,
    selectedInfo,
    isFolderSelected,
    disableAdd,
    handleSelectMode,
    handleSelect,
    handleCancelSelectMode,
    handleAddReflectionToFolder
  };
};
