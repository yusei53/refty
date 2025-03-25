import React from "react";
import { BarChart } from "@mui/x-charts";

const chartSetting = {
  width: 200,
  height: 60,
  leftAxis: null,
  bottomAxis: null,
  slotProps: {
    legend: {
      hidden: true
    }
  },
  grid: { vertical: false, horizontal: false },
  margin: { left: 10, right: 10, top: 17, bottom: 4 }
};

type CountBarChartProps = {
  publicCount: number;
  privateCount: number;
};

export const CountBarChart: React.FC<CountBarChartProps> = ({
  publicCount,
  privateCount
}) => {
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
      {...chartSetting}
      sx={{
        "& .MuiChartsAxis-line": { display: "none" },
        "& .MuiChartsAxis-tick": { display: "none" },
        "& .MuiChartsAxis-tickLabel": { display: "none" },
        "& .MuiBarElement-root": { maxWidth: "10px", width: "10px" }
      }}
    />
  );
};
