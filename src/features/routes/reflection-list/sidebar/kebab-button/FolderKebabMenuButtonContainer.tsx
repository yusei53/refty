import { useState } from "react";
import { Box } from "@mui/material";
import { FolderKebabMenuButton } from "./FolderKebabMenuButton";
import { folderAPI } from "@/src/api/folder-api";

type FolderKebabButtonPopupContainerProps = {
  folderUUID: string;
  username: string;
  setIsEditFieldOpen: (isEditFieldOpen: boolean) => void;
  onSelectMode: () => void;
  onPopupChange?: (isOpen: boolean) => void;
};

export const FolderKebabButtonPopupContainer: React.FC<
  FolderKebabButtonPopupContainerProps
> = ({
  folderUUID,
  username,
  setIsEditFieldOpen,
  onSelectMode,
  onPopupChange
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenPopup = (event: React.MouseEvent<HTMLElement>) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
      onPopupChange && onPopupChange(true);
    }
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
    onPopupChange && onPopupChange(false);
  };

  const handleEditFolderName = () => {
    setIsEditFieldOpen(true);
  };

  const handleDeleteFolder = async () => {
    const res = await folderAPI.deleteFolder(username, folderUUID);
    if (res === 401) {
      return;
    }
    handleClosePopup();
  };

  return (
    <>
      {Boolean(anchorEl) && (
        // MEMO: なぜかこのPopperは外側をクリックしてもスマホで閉じないため、透明なBoxを設置
        <Box
          onClick={handleClosePopup}
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          zIndex={3}
        />
      )}
      <FolderKebabMenuButton
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onOpenPopup={handleOpenPopup}
        onClosePopup={handleClosePopup}
        onSelectMode={onSelectMode}
        onEditFolderName={handleEditFolderName}
        onDeleteFolder={handleDeleteFolder}
      />
    </>
  );
};
