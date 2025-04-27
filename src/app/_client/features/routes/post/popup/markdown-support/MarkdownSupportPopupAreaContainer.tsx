import { useState } from "react";
import MarkdownSupportPopupArea from "./MarkdownSupportPopupArea";

export const MarkdownSupportPopupAreaContainer = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MarkdownSupportPopupArea
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClick={handleClick}
      onClose={handleClose}
    />
  );
};
