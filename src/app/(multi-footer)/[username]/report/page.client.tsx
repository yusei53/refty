"use client";
import Image from "next/image";
import { UserMenuHeaderContainer } from "@/src/features/common/user-menu";

type UserReportPageProps = {
  image: string;
  username: string;
  isReportOpen: boolean;
  publicCount: number;
  privateCount: number;
  contentLength: number;
};

export const UserReportPage: React.FC<UserReportPageProps> = ({
  image,
  isReportOpen,
  publicCount,
  privateCount,
  contentLength,
  username
}) => {
  return (
    <>
      <UserMenuHeaderContainer userImage={image} username={username} />
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
