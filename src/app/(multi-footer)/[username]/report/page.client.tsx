"use client";
import dynamic from "next/dynamic";
import type { SxProps } from "@mui/material";
import { Box, Divider as MUIDivider } from "@mui/material";
import type { ReflectionTagCountList } from "@/src/app/_client/api/reflection-api";
import type { ReflectionsCount } from "@/src/app/_client/api/reflections-count-api";
import { theme } from "@/src/app/_client/utils/theme";
import { LinearLoading } from "@/src/components/loading";
import { UserMenuHeaderContainer } from "@/src/features/common/user-menu";
import { BarChartArea } from "@/src/features/routes/report/BarChartArea";
import { PostingSummaryStats } from "@/src/features/routes/report/PostingSummaryStats";
import TagPieChartArea from "@/src/features/routes/report/TagPieChartArea";
import { ReportHeader } from "@/src/features/routes/report/header/ReportHeader";
import { useResponsive } from "@/src/hooks/responsive/useResponsive";

const CalendarAreaFetcher = dynamic(
  () =>
    import(
      "@/src/features/routes/reflection-list/profile/calendar/CalendarAreaFetcher"
    ).then((mod) => mod.CalendarAreaFetcher),
  {
    loading: () => <LinearLoading />,
    ssr: false
  }
);

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
  reflectionCount: ReflectionsCount;
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
  reflectionCount,
  tagCountList
}) => {
  const { isMobile } = useResponsive();

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
      <CalendarAreaFetcher reflectionCount={reflectionCount} />
      <Box mx={{ sm: 3 }}>
        <Divider sx={{ mt: 6, mb: 4 }} />
        <PostingSummaryStats
          publicCount={publicCount}
          privateCount={privateCount}
          contentLength={contentLength}
        />
        <Divider sx={{ mt: 2 }} />
        <BarChartArea hourlyPostCount={hourlyPostCount} />
        <Divider />
        <TagPieChartArea tagCountList={tagCountList} />
      </Box>
    </>
  );
};

const Divider = ({ sx }: { sx?: SxProps }) => {
  return (
    <MUIDivider
      sx={{
        borderColor: theme.palette.grey[400],
        my: 3,
        ...sx
      }}
    />
  );
};
