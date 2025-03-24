"use client";
import Image from "next/image";
import { BarChart } from "@mui/x-charts/BarChart";
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
  hourlyPostCount: { hour: number; count: number }[];
};

export const UserReportPage: React.FC<UserReportPageProps> = ({
  currentUsername,
  currentImage,
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
      <BarChart
        series={[
          {
            data: hourlyPostCount.map((postCount) => postCount.count),
            label: "投稿数(件)"
          }
        ]}
        colors={["#5FD37D"]}
        height={isMobile ? 200 : 350}
        width={isMobile ? 350 : 800}
        xAxis={[
          {
            data: hourlyPostCount.map((postCount) => postCount.hour),
            scaleType: "band",
            label: "時間(時)",
            // ラベルは数字のみ、ホバーしたときは○時の形で表示
            valueFormatter: (value, context) => {
              return context.location === "tick"
                ? value.toString()
                : `${hourlyPostCount.find((postCount) => postCount.hour === value)?.hour}時`;
            }
          }
        ]}
        yAxis={[
          {
            scaleType: "linear",
            min: 0,
            label: "投稿数(件)"
          }
        ]}
        slotProps={{
          legend: {
            hidden: true
          }
        }}
        margin={{
          top: 40,
          bottom: 50,
          left: isMobile ? 0 : 40,
          right: isMobile ? 0 : 40
        }}
      />
    </>
  );
};
