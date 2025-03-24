"use client";
import Image from "next/image";
import { UserMenuHeaderContainer } from "@/src/features/common/user-menu";
import { useIsMobile } from "@/src/hooks/responsive/useIsMobile";

type UserReportPageProps = {
  currentUsername: string | null;
  currentImage: string | null;
  image: string;
  username: string;
  isReportOpen: boolean;
  publicCount: number;
  privateCount: number;
  contentLength: number;
};

export const UserReportPage: React.FC<UserReportPageProps> = ({
  currentUsername,
  currentImage,
  image,
  isReportOpen,
  publicCount,
  privateCount,
  contentLength,
  username
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
      <div>
        <span>プロフィール</span>
        <Image width={50} height={50} src={image} alt={`${username}の画像`} />
        <p>レポートの公開非公開</p>
        <p>現在{isReportOpen ? "公開" : "非公開"}中</p>
      </div>
    </>
  );
};
