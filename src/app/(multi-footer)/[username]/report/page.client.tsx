"use client";
import { UserMenuHeaderContainer } from "@/src/features/common/user-menu";
import { ReportHeader } from "@/src/features/routes/report/header/ReportHeader";
import { useIsMobile } from "@/src/hooks/responsive/useIsMobile";

type UserReportPageProps = {
  currentUsername: string | null;
  currentImage: string | null;
  username: string;
  userImage: string;
  isReportOpen: boolean;
  publicCount: number;
  privateCount: number;
  contentLength: number;
};

export const UserReportPage: React.FC<UserReportPageProps> = ({
  currentUsername,
  currentImage,
  username,
  userImage,
  isReportOpen,
  publicCount,
  privateCount,
  contentLength
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
    </>
  );
};
