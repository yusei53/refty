import { useState, useEffect } from "react";
import { folderAPI, type Folder } from "@/src/api/folder-api";

type UseFolderProps = {
  initialFolders: Folder[];
  username: string;
};

export const useFolder = ({ initialFolders, username }: UseFolderProps) => {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  //MEMO: countsを更新するためには、リフレッシュが必要
  useEffect(() => {
    setFolders(initialFolders);
  }, [initialFolders]);

  const refreshFolders = async () => {
    const updatedFolders = await folderAPI.getFolder(username);
    if (Array.isArray(updatedFolders)) {
      setFolders(updatedFolders);
    }
  };

  return { folders, refreshFolders };
};
