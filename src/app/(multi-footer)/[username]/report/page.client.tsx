"use client";
import dynamic from "next/dynamic";
import { Divider } from "@mui/material";
import type { ReflectionTagCountList } from "@/src/api/reflection-api";
import type { ReflectionsCount } from "@/src/api/reflections-count-api";
import { LinearLoading } from "@/src/components/loading";
import { UserMenuHeaderContainer } from "@/src/features/common/user-menu";
import { BarChartArea } from "@/src/features/routes/report/BarChartArea";
import TagPieChartArea from "@/src/features/routes/report/TagPieChartArea";
import { ReportHeader } from "@/src/features/routes/report/header/ReportHeader";
import { useIsMobile } from "@/src/hooks/responsive/useIsMobile";
import { theme } from "@/src/utils/theme";
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
      <CalendarAreaFetcher reflectionCount={reflectionCount} />
      {/* TODO: sxのところを切り出し */}
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
