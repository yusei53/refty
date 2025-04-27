import { useState } from "react";
import type { AIFeedbackType } from "@/src/app/_client/api/send-to-sqs-api";
import { SelectAITypePopupArea } from "./SelectAITypePopupArea";

type SelectAITypePopupAreaContainerProps = {
  setAIType: (type: AIFeedbackType) => void;
  AIType: AIFeedbackType;
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

  const handleAITypeSelect = (type: AIFeedbackType) => {
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
