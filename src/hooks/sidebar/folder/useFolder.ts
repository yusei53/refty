import { useState } from "react";
import { folderAPI, type Folder } from "@/src/api/folder-api";

type UseFolderProps = {
  initialFolders: Folder[];
  username: string;
};

export const useFolder = ({ initialFolders, username }: UseFolderProps) => {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const refreshFolders = async () => {
    const updatedFolders = await folderAPI.getFolder(username);
    if (Array.isArray(updatedFolders)) {
      setFolders(updatedFolders);
    }
  };

  return { folders, refreshFolders };
};
