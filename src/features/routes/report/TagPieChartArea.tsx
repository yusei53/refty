import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import type { ReflectionTagCountList } from "@/src/api/reflection-api";
import { useIsMobile } from "@/src/hooks/responsive/useIsMobile";

type TagPieChartAreaProps = {
  tagCountList: ReflectionTagCountList;
};

const TagPieChartArea: React.FC<TagPieChartAreaProps> = ({ tagCountList }) => {
  const isMobile = useIsMobile();

  // TODO: 色をthemeに追加する
  const pieData = [
    {
      value: tagCountList.isDailyReflection,
      label: "振り返り",
      color: "#216e39"
    },
    {
      value: tagCountList.isLearning,
      label: "学び",
      color: "#30a14e"
    },
    {
      value: tagCountList.isAwareness,
      label: "気づき",
      color: "#40c463"
    },
    {
      value: tagCountList.isMonologue,
      label: "ひとりごと",
      color: "#9be9a8"
    },
    {
      value: tagCountList.isInputLog,
      label: "インプットの記録",
      color: "#98EF85"
    }
  ];

  //MEMO: 投稿数が0のタグを省く
  const filteredPieData = pieData.filter((item) => item.value !== 0);

  const hasNoTagPost = filteredPieData.length === 0;

  return (
    <>
      <Typography>タグ別の投稿割合</Typography>
      {hasNoTagPost ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          my={10}
          pb={5}
        >
          <Image
            src={"/not-found/no-post.png"}
            alt={"投稿"}
            width={200}
            height={200}
          />
          <Typography>タグが付けられている投稿がありません</Typography>
        </Box>
      ) : (
        <Box display={"flex"} justifyContent={"center"}>
          <PieChart
            height={isMobile ? 200 : 300}
            width={600}
            series={[
              {
                innerRadius: 60,
                outerRadius: 110,
                data: filteredPieData,
                arcLabel: (item) => {
                  const total = filteredPieData.reduce(
                    (sum, i) => sum + i.value,
                    0
                  );
                  const percent = ((item.value / total) * 100).toFixed(1);
                  return `${percent}%`;
                }
              }
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontSize: 11
              }
            }}
            legend={{
              direction: "column",
              position: {
                vertical: "middle",
                horizontal: "right"
              },
              padding: 0,
              itemMarkWidth: 12,
              itemMarkHeight: 12
            }}
          />
        </Box>
      )}
    </>
  );
};

export default TagPieChartArea;
