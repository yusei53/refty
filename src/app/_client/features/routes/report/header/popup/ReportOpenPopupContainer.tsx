import React, { useState } from "react";
import { Box } from "@mui/material";
import ReportOpenPopup from "./ReportOpenPopup";
import { useUpdateIsReportOpen } from "@/src/app/_client/hooks/report/useUpdateIsReportOpen";

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setIsPopupOpen((prev) => !prev);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
    setIsPopupOpen(false);
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
    <>
      {isPopupOpen && (
        <Box
          position={"fixed"}
          top={0}
          left={0}
          width={"100vw"}
          height={"100vh"}
          zIndex={1}
          onClick={handleClosePopup}
        />
      )}
      <ReportOpenPopup
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        isReportOpen={isReportOpen}
        onOpenPopup={handleOpenPopup}
        onIsReportOpenToggle={handleIsReportOpenToggle}
      />
    </>
  );
};

export default ReportOpenPopupContainer;
