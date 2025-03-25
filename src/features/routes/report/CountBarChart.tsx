import React from "react";
import { BarChart } from "@mui/x-charts";
import { useIsMobile } from "@/src/hooks/responsive/useIsMobile";

type CountBarChartProps = {
  publicCount: number;
  privateCount: number;
};

export const CountBarChart: React.FC<CountBarChartProps> = ({
  publicCount,
  privateCount
}) => {
  const isMobile = useIsMobile();

  return (
    <BarChart
      dataset={[
        { month: "公開", seoul: publicCount },
        { month: "非公開", seoul: privateCount }
      ]}
      yAxis={[
        {
          scaleType: "band",
          dataKey: "month",
          id: "y-axis",
          disableTicks: true,
          tickSize: 0,
          tickLabelStyle: {
            opacity: 0
          }
        }
      ]}
      xAxis={[
        {
          id: "x-axis",
          disableTicks: true,
          tickSize: 0,
          tickLabelStyle: {
            opacity: 0
          }
        }
      ]}
      series={[
        {
          dataKey: "seoul",
          label: "件数"
        }
      ]}
      layout="horizontal"
      width={isMobile ? 100 : 200}
      height={isMobile ? 50 : 60}
      leftAxis={null}
      bottomAxis={null}
      slotProps={{
        legend: {
          hidden: true
        }
      }}
      grid={{ vertical: false, horizontal: false }}
      margin={{ left: 10, right: 10, top: 17, bottom: 4 }}
      sx={{
        "& .MuiChartsAxis-line": { display: "none" },
        "& .MuiChartsAxis-tick": { display: "none" },
        "& .MuiChartsAxis-tickLabel": { display: "none" },
        "& .MuiBarElement-root": { maxWidth: "10px", width: "10px" }
      }}
    />
  );
};
