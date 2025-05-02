import React, { useState } from "react";
import type { DraftDataList } from "@/src/app/_client/hooks/reflection/useAutoSave";
import { DraftList } from "./DraftList";

type DraftListContainerProps = {
  draftList: DraftDataList;
  currentDraftId: string;
  onDraftChange: (draftId: string) => void;
  deleteDraft: (draftId: string) => void;
};

export const DraftListContainer: React.FC<DraftListContainerProps> = ({
  draftList,
  currentDraftId,
  onDraftChange,
  deleteDraft
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DraftList
      draftList={draftList}
      currentDraftId={currentDraftId}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onDraftChange={onDraftChange}
      deleteDraft={deleteDraft}
      onToggle={handleClick}
      onClose={handleClose}
    />
  );
};
