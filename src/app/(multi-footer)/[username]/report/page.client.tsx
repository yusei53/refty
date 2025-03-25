"use client";
import { Divider } from "@mui/material";
import { UserMenuHeaderContainer } from "@/src/features/common/user-menu";
import { BarChartArea } from "@/src/features/routes/report/BarChartArea";
import { ReportHeader } from "@/src/features/routes/report/header/ReportHeader";
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
      <div>
        <span>公開</span>
        {publicCount}
      </div>
      <div>
        <span>非公開</span>
        {privateCount}
      </div>
      <div>
        <span>文字数</span>
        {contentLength}
      </div>
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
