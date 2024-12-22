import React, { useState } from "react";
import { Box } from "@mui/material";
import { SelectTagPopup } from "./SelectTagPopup";

export const SelectTagPopupContainer: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsPopupOpen((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsPopupOpen(false);
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
      <SelectTagPopup
        selectedTags={selectedTags}
        onChange={setSelectedTags}
        open={isPopupOpen}
        anchorEl={anchorEl}
        onToggle={handleToggle}
      />
    </Box>
  );
};
