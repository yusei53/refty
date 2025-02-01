import { useState } from "react";
import type { Folder } from "@/src/api/folder-api";
import { FolderSettingPopupArea } from "./FolderSettingPopupArea";

type FolderSettingPopupAreaContainerProps = {
  selectedFolderUUID: string | null;
  setSelectedFolderUUID: (value: string | null) => void;
  folders: Folder[];
};

export const FolderSettingPopupAreaContainer: React.FC<
  FolderSettingPopupAreaContainerProps
> = ({ selectedFolderUUID, setSelectedFolderUUID, folders }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FolderSettingPopupArea
      selectedFolderUUID={selectedFolderUUID}
      setSelectedFolderUUID={setSelectedFolderUUID}
      folders={folders}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onToggle={handleClick}
      onClose={handleClose}
    />
  );
};
