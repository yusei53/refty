import React, { useState } from "react";
import ReportPublicPopup from "./ReportPublicPopup";
import { useUpdateIsReportOpen } from "@/src/hooks/report/useUpdateIsReportOpen";

type ReportPublicPopupContainerProps = {
  username: string;
  isReportOpen: boolean;
  isCurrentUser: boolean;
};

const ReportPublicPopupContainer: React.FC<ReportPublicPopupContainerProps> = ({
  username,
  isReportOpen
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenPopup = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  const { handleUpdateIsReportOpen } = useUpdateIsReportOpen({
    username,
    isReportOpen
  });

  const handlePublicToggle = () => {
    handleUpdateIsReportOpen();
    handleClosePopup();
  };

  return (
    <ReportPublicPopup
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      isReportOpen={isReportOpen}
      onOpenPopup={handleOpenPopup}
      onClosePopup={handleClosePopup}
      onPublicToggle={handlePublicToggle}
    />
  );
};

export default ReportPublicPopupContainer;
