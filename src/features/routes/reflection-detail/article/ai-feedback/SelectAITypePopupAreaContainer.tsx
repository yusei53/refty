import { useState } from "react";
import { SelectAITypePopupArea } from "./SelectAITypePopupArea";

type SelectAITypePopupAreaContainerProps = {
  setAIType: (type: 0 | 1 | 2 | 3) => void;
  AIType: 0 | 1 | 2 | 3 | null;
};

export const SelectAITypePopupAreaContainer: React.FC<
  SelectAITypePopupAreaContainerProps
> = ({ setAIType, AIType }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAITypeSelect = (type: 0 | 1 | 2 | 3) => {
    setAIType(type);
    setAnchorEl(null);
  };

  return (
    <SelectAITypePopupArea
      open={open}
      anchorEl={anchorEl}
      onClick={handleClick}
      onClose={handleClose}
      onAITypeSelect={handleAITypeSelect}
      AIType={AIType}
    />
  );
};
