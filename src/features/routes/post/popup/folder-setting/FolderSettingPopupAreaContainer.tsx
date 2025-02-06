import { useState } from "react";
import { Box } from "@mui/material";
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsPopupOpen(false);
  };

  const handlePopupOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <Box>
      {isPopupOpen && (
        <Box
          position={"fixed"}
          top={0}
          left={0}
          width={"100vw"}
          height={"100vh"}
          zIndex={1}
          onClick={handleClose}
        />
      )}
      <FolderSettingPopupArea
        selectedFolderUUID={selectedFolderUUID}
        setSelectedFolderUUID={setSelectedFolderUUID}
        folders={folders}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onToggle={handleClick}
        onClose={handleClose}
        onPopupOpen={handlePopupOpen}
      />
    </Box>
  );
};
