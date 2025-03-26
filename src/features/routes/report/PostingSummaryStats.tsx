import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { CountBarChart } from "./CountBarChart";
import { useIsMobile } from "@/src/hooks/responsive/useIsMobile";
import { theme } from "@/src/utils/theme";

type PostingSummaryStatsProps = {
  publicCount: number;
  privateCount: number;
  contentLength: number;
};

export const PostingSummaryStats: React.FC<PostingSummaryStatsProps> = ({
  publicCount,
  privateCount,
  contentLength
}) => {
  const isMobile = useIsMobile();
  const totalPosts = publicCount + privateCount;

  return (
    <Box display={"flex"} alignItems={"center"} gap={2}>
      <Box>
        <Typography>投稿数</Typography>
        <Box display={"flex"} alignItems={"center"} ml={{ xs: 1, sm: 6 }}>
          <Typography
            color={theme.palette.grey[600]}
            fontSize={{ xs: 30, sm: 60 }}
          >
            {totalPosts}
          </Typography>
          <Image
            src={isMobile ? "/curly-brackets-light.png" : "/curly-brackets.png"}
            alt={"curly-brackets"}
            width={110}
            height={110}
            style={{ marginLeft: -25 }}
          />
          <Box
            display={"flex"}
            flexDirection={"column"}
            ml={-4}
            height={"100%"}
          >
            <Box display={"flex"} alignItems={"center"} gap={1} mb={-0.1}>
              <Typography fontSize={{ xs: 10, sm: 14 }} whiteSpace={"nowrap"}>
                公開
              </Typography>
              <Typography
                color={theme.palette.grey[600]}
                fontWeight={550}
                fontSize={{ xs: 0.875, sm: 18 }}
              >
                {publicCount}
              </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"} gap={1} mt={-0.1}>
              <Typography fontSize={{ xs: 10, sm: 14 }} whiteSpace={"nowrap"}>
                非公開
              </Typography>
              <Typography
                color={theme.palette.grey[600]}
                fontWeight={"bold"}
                fontSize={{ xs: 0.875, sm: 18 }}
              >
                {privateCount}
              </Typography>
            </Box>
          </Box>
          <CountBarChart
            publicCount={publicCount}
            privateCount={privateCount}
          />
        </Box>
      </Box>
      <Box>
        <Typography>合計文字数</Typography>
        <Box display={"flex"} ml={{ xs: 1, sm: 8 }} position={"relative"}>
          {/* // 画像の高さと合わせるための固定値のheightをセットする */}
          <Box height={100} />
          <Typography
            color={theme.palette.grey[600]}
            fontSize={{ xs: 30, sm: 60 }}
          >
            {contentLength.toLocaleString()}
          </Typography>
          <Typography
            color={theme.palette.grey[600]}
            whiteSpace={"nowrap"}
            position={"absolute"}
            right={-40}
            bottom={25}
          >
            文字
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
