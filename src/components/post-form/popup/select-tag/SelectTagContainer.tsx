import React from "react";
import { Box } from "@mui/material";
import { SelectTagPopup } from "./SelectTagPopup";

type SelectTagPopupContainerProps = {
  onTagChange: (tag: string, isSelected: boolean) => void; // 修正: タグ状態変更関数を受け取る
};

export const SelectTagPopupContainer: React.FC<
  SelectTagPopupContainerProps
> = ({ onTagChange }) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

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
        onTagChange={onTagChange} // 修正: タグ状態変更関数を渡す
        open={isPopupOpen}
        anchorEl={anchorEl}
        onToggle={handleToggle}
      />
    </Box>
  );
};
