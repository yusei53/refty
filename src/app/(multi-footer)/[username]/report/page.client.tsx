"use client";
import Image from "next/image";
import { Divider } from "@mui/material";
import { UserMenuHeaderContainer } from "@/src/features/common/user-menu";
import { ReportHeader } from "@/src/features/routes/report/header/ReportHeader";
import { BarChartArea } from "@/src/features/routes/report/BarChartArea";
import { useIsMobile } from "@/src/hooks/responsive/useIsMobile";
import { theme } from "@/src/utils/theme";

type UserReportPageProps = {
  currentUsername: string | null;
  currentImage: string | null;
  username: string;
  userImage: string;
  isReportOpen: boolean;
  publicCount: number;
  privateCount: number;
  contentLength: number;
  hourlyPostCount: { hour: number; count: number }[];
};

export const UserReportPage: React.FC<UserReportPageProps> = ({
  currentUsername,
  currentImage,
  username,
  userImage,
  isReportOpen,
  publicCount,
  privateCount,
  contentLength,
  hourlyPostCount
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && (
        <UserMenuHeaderContainer
          userImage={currentImage}
          username={currentUsername}
        />
      )}
      <ReportHeader
        userImage={userImage}
        username={username}
        isReportOpen={isReportOpen}
        isCurrentUser={currentUsername === username}
      />
      <Divider
        sx={{
          borderColor: theme.palette.grey[400],
          marginTop: 6,
          marginBottom: 4
        }}
      />
      <BarChartArea hourlyPostCount={hourlyPostCount} />
      <Divider
        sx={{
          borderColor: theme.palette.grey[400],
          marginTop: 6,
          marginBottom: 4
        }}
      />
    </>
  );
};
