import { useEffect } from "react";
import type { Folder } from "@/src/app/_client/api/folder-api";
import { useFolderStore } from "@/src/app/_client/utils/store/useFolderStore";

type FolderInitializerProps = {
  folders: Folder[];
};

// MEMO: サーバーサイドで取得した初期データをクライアント側の Zustand ストアに反映させるコンポーネント
export const FolderInitializer: React.FC<FolderInitializerProps> = ({
  folders
}) => {
  const setFolders = useFolderStore((state) => state.setFolders);

  useEffect(() => {
    setFolders(folders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // MEMO: 副作用のみを目的としているため、htmlは何も返さない
  return null;
};
