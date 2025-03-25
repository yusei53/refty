import React, { useState } from "react";
import ReportOpenPopup from "./ReportOpenPopup";
import { useUpdateIsReportOpen } from "@/src/hooks/report/useUpdateIsReportOpen";

type ReportOpenPopupContainerProps = {
  username: string;
  isReportOpen: boolean;
  isCurrentUser: boolean;
};

const ReportOpenPopupContainer: React.FC<ReportOpenPopupContainerProps> = ({
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

  const handleIsReportOpenToggle = () => {
    handleUpdateIsReportOpen();
    handleClosePopup();
  };

  return (
    <ReportOpenPopup
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      isReportOpen={isReportOpen}
      onOpenPopup={handleOpenPopup}
      onClosePopup={handleClosePopup}
      onIsReportOpenToggle={handleIsReportOpenToggle}
    />
  );
};

export default ReportOpenPopupContainer;
