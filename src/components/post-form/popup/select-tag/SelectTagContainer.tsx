import { useState } from "react";
import { Box } from "@mui/material";
import { SelectTagPopup } from "./SelectTagPopup";

export const SelectTagPopupContainer = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <Box>
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
