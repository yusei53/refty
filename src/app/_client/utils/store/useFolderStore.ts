import { create } from "zustand";
import type { Folder } from "../../api/folder-api";
import { folderAPI } from "../../api/folder-api";

type FolderStore = {
  folders: Folder[];
  selectedInfo: string;
  setFolders: (folders: Folder[]) => void;
  setSelectedInfo: (uuid: string) => void;
  refreshFolders: (username: string) => Promise<void>;
  updateFolder: (updatedFolder: Folder) => void;
};

export const useFolderStore = create<FolderStore>((set) => ({
  folders: [],
  selectedInfo: "",
  setFolders: (folders: Folder[]) => set({ folders }),
  setSelectedInfo: (uuid: string) => set({ selectedInfo: uuid }),
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
