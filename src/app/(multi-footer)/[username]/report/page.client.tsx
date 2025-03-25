"use client";
import { Divider } from "@mui/material";
import type { ReflectionTagCountList } from "@/src/api/reflection-api";
import { UserMenuHeaderContainer } from "@/src/features/common/user-menu";
import { BarChartArea } from "@/src/features/routes/report/BarChartArea";
import { PostingSummaryStats } from "@/src/features/routes/report/PostingSummaryStats";
import TagPieChartArea from "@/src/features/routes/report/TagPieChartArea";
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
  tagCountList: ReflectionTagCountList;
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
  hourlyPostCount,
  tagCountList
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
      <PostingSummaryStats
        publicCount={publicCount}
        privateCount={privateCount}
        contentLength={contentLength}
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
      <TagPieChartArea tagCountList={tagCountList} />
    </>
  );
};
