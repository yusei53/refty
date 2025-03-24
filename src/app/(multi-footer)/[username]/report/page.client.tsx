"use client";
import Image from "next/image";
import { BarChart } from "@mui/x-charts/BarChart";
import { UserMenuHeaderContainer } from "@/src/features/common/user-menu";
import { useIsMobile } from "@/src/hooks/responsive/useIsMobile";

type UserReportPageProps = {
  image: string;
  username: string;
  isReportOpen: boolean;
  publicCount: number;
  privateCount: number;
  contentLength: number;
  hourlyPostCount: { hour: number; count: number }[];
};

export const UserReportPage: React.FC<UserReportPageProps> = ({
  image,
  isReportOpen,
  publicCount,
  privateCount,
  contentLength,
  username,
  hourlyPostCount
}) => {
  const isMobile = useIsMobile();

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
      <BarChart
        series={[{ data: hourlyPostCount.map((postCount) => postCount.count) }]}
        colors={["#5FD37D"]}
        height={isMobile ? 200 : 350}
        width={isMobile ? 350 : 800}
        xAxis={[
          {
            data: hourlyPostCount.map((postCount) => postCount.hour),
            scaleType: "band"
          }
        ]}
        margin={{
          top: 40,
          bottom: 30,
          left: isMobile ? 0 : 40,
          right: isMobile ? 0 : 40
        }}
      />
    </>
  );
};
