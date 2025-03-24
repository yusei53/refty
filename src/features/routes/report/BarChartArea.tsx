import { BarChart } from "@mui/x-charts/BarChart";
import { useIsMobile } from "@/src/hooks/responsive/useIsMobile";

type BarChartAreaProps = {
  hourlyPostCount: { hour: number; count: number }[];
};

export const BarChartArea: React.FC<BarChartAreaProps> = ({
  hourlyPostCount
}) => {
  const isMobile = useIsMobile();

  return (
    // TODO: リファクタ
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
  );
};
