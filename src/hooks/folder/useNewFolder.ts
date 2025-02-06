import { useState } from "react";
import { folderAPI } from "@/src/api/folder-api";

type UseNewFolderProps = {
  username: string;
  onFolderCreated: () => void;
};

export const useNewFolder = ({
  username,
  onFolderCreated
}: UseNewFolderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleClick = () => {
    setIsEditing(true);
  };

  // MEMO: フォルダを作成したらテキストエリアが閉じて、フォルダ一覧を更新する
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      folderAPI.createFolder(username, folderName).then(() => {
        setFolderName("");
        setIsEditing(false);
        onFolderCreated();
      });
    }
  };
  return {
    isEditing,
    folderName,
    handleClick,
    handleSubmit,
    setFolderName,
    setIsEditing
  };
};
