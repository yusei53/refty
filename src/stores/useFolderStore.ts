import { create } from "zustand";
import type { Folder } from "@/src/api/folder-api";
import { folderAPI } from "@/src/api/folder-api";

type FolderStore = {
  folders: Folder[];
  selectedFolderUUID: string;
  setFolders: (folders: Folder[]) => void;
  setSelectedFolderUUID: (uuid: string) => void;
  refreshFolders: (username: string) => Promise<void>;
  updateFolder: (updatedFolder: Folder) => void;
};

export const useFolderStore = create<FolderStore>((set) => ({
  folders: [],
  selectedFolderUUID: "",
  setFolders: (folders: Folder[]) => set({ folders }),
  setSelectedFolderUUID: (uuid: string) => set({ selectedFolderUUID: uuid }),
  refreshFolders: async (username: string) => {
    const updatedFolders = await folderAPI.getFolder(username);
    if (Array.isArray(updatedFolders)) {
      set({ folders: updatedFolders });
    }
  },
  updateFolder: (updatedFolder: Folder) => {
    set((state) => ({
      folders: state.folders.map((folder) =>
        folder.folderUUID === updatedFolder.folderUUID ? updatedFolder : folder
      )
    }));
  }
}));
