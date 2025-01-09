import React, { useState } from "react";
import { Box } from "@mui/material";
import { SelectTagPopup } from "./SelectTagPopup";

type SelectTagPopupContainerProps = {
  value: string[];
  onTagChange: (tag: string, isSelected: boolean) => void;
};

export const SelectTagPopupContainer: React.FC<
  SelectTagPopupContainerProps
> = ({ value, onTagChange }) => {
  const [activeTags, setActiveTags] = useState<string[]>(value);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopupOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsPopupOpen((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsPopupOpen(false);
  };

  const handleToggleTag = (tag: string) => {
    const isSelected = activeTags.includes(tag);

    // NOTE: 2つまで選択できる制限と、すでに選択されているタグを選択した場合は削除する
    const updatedTags = isSelected
      ? activeTags.filter((t) => t !== tag)
      : activeTags.length < 2
        ? [...activeTags, tag]
        : activeTags;

    // NOTE: タグが既に2つ選択されている場合は何もしない
    if (updatedTags.length !== activeTags.length) {
      setActiveTags(updatedTags);
      onTagChange(tag, !isSelected);
    }
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
        open={isPopupOpen}
        anchorEl={anchorEl}
        activeTags={activeTags}
        onPopupOpen={handlePopupOpen}
        onToggleTag={handleToggleTag}
      />
    </Box>
  );
};
