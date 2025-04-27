import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useResponsive } from "@/src/app/_client/hooks/responsive/useResponsive";
import { theme } from "@/src/app/_client/utils/theme";

type BarChartAreaProps = {
  hourlyPostCount: { hour: number; count: number }[];
};

export const BarChartArea: React.FC<BarChartAreaProps> = ({
  hourlyPostCount
}) => {
  const { isMobile } = useResponsive();

  return (
    // TODO: リファクタ
    <Box>
      <Typography component={"h2"}>投稿時間帯</Typography>
      <Box display={"flex"} justifyContent={"center"} ml={{ sm: -4.5 }}>
        <BarChart
          series={[
            {
              data: hourlyPostCount.map((postCount) => postCount.count),
              label: "投稿数(件)"
            }
          ]}
          colors={["#5FD37D"]}
          height={isMobile ? 200 : 350}
          width={isMobile ? 340 : 800}
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
              },
              labelStyle: {
                transform: isMobile
                  ? "translate(145px, 1px)"
                  : "translate(310px, 5px)",
                fontSize: isMobile ? 10 : 13,
                fill: theme.palette.grey[600]
              },
              disableTicks: true,
              tickLabelStyle: {
                fill: theme.palette.grey[600]
              }
            }
          ]}
          yAxis={[
            {
              scaleType: "linear",
              min: 0,
              label: "投稿数(件)",
              position: "left",
              labelStyle: {
                transform: isMobile
                  ? "translate(37px, -72px)"
                  : "translate(-26px, -140px)",
                fontSize: isMobile ? 10 : 13,
                fill: theme.palette.grey[600]
              },
              disableTicks: true,
              tickLabelStyle: {
                fill: theme.palette.grey[600]
              }
            }
          ]}
          grid={{
            horizontal: true
          }}
          slotProps={{
            legend: {
              hidden: true
            }
          }}
          margin={{
            top: 40,
            bottom: 50,
            left: isMobile ? 13 : 100,
            right: isMobile ? 0 : 40
          }}
        />
      </Box>
    </Box>
  );
};
