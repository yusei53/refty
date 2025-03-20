"use client";
import { UserMenuHeaderContainer } from "@/src/features/common/user-menu";

type UserReportPageProps = {
  userProfile: {
    image: string;
    isReportOpen: boolean;
  };
  reflectionCounts: {
    public: number;
    private: number;
  };
  contentLength: number;
  username: string;
};

export const UserReportPage = ({
  userProfile,
  reflectionCounts,
  contentLength,
  username
}: UserReportPageProps) => {
  return (
    <>
      <UserMenuHeaderContainer
        userImage={userProfile.image}
        username={username}
      />
      <div>
        <span>公開</span>
        {reflectionCounts.public}
      </div>
      <div>
        <span>非公開</span>
        {reflectionCounts.private}
      </div>
      <div>
        <span>文字数</span>
        {contentLength}
      </div>
      <div>
        <span>プロフィール</span>
        <img src={userProfile.image} alt="プロフィール画像" />
        <p>レポートの公開非公開</p>
        <p>現在{userProfile.isReportOpen ? "公開" : "非公開"}中</p>
      </div>
    </>
  );
};
