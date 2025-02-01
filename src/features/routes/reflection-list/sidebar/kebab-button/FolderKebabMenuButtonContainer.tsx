import { useState } from "react";
import { Box } from "@mui/material";
import { FolderKebabMenuButton } from "./FolderKebabMenuButton";

type FolderKebabButtonPopupContainerProps = {
  onSelectMode: () => void;
};

export const FolderKebabButtonPopupContainer: React.FC<
  FolderKebabButtonPopupContainerProps
> = ({ onSelectMode }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenPopup = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  const handleEditFolderName = () => {};

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
      />
    </>
  );
};
