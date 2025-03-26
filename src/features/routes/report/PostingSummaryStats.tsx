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
    <Box display={"flex"} alignItems={"center"} gap={3}>
      <Box>
        <Typography mb={-1}>投稿数</Typography>
        <Box display={"flex"} alignItems={"center"} ml={{ xs: 1, sm: 5 }}>
          <Typography
            color={theme.palette.grey[600]}
            fontSize={{ xs: 30, sm: 50 }}
          >
            {totalPosts}
          </Typography>
          <Image
            src={isMobile ? "/curly-brackets-light.png" : "/curly-brackets.png"}
            alt={"curly-brackets"}
            width={120}
            height={120}
            style={{ marginLeft: -30 }}
          />
          <Box
            display={"flex"}
            flexDirection={"column"}
            ml={-5.5}
            height={"100%"}
          >
            <Box display={"flex"} alignItems={"center"} gap={1.5}>
              <Box display={"flex"} flexDirection={"column"} gap={0.2}>
                <Typography fontSize={{ xs: 10, sm: 14 }} whiteSpace={"nowrap"}>
                  公開
                </Typography>
                <Typography fontSize={{ xs: 10, sm: 14 }} whiteSpace={"nowrap"}>
                  非公開
                </Typography>
              </Box>
              <Box>
                <Typography
                  color={theme.palette.grey[600]}
                  fontSize={{ xs: 0.875, sm: 18 }}
                  mb={-0.4}
                >
                  {publicCount}
                </Typography>
                <Typography
                  color={theme.palette.grey[600]}
                  fontSize={{ xs: 0.875, sm: 18 }}
                  mt={-0.4}
                >
                  {privateCount}
                </Typography>
              </Box>
            </Box>
          </Box>
          <CountBarChart
            publicCount={publicCount}
            privateCount={privateCount}
          />
        </Box>
      </Box>
      <Box>
        <Typography mb={-1}>合計文字数</Typography>
        <Box
          display={"flex"}
          alignItems={"center"}
          ml={{ xs: 1, sm: 8 }}
          position={"relative"}
        >
          {/* // 画像の高さと合わせるための固定値のheightをセットする */}
          <Box height={120} />
          <Typography
            color={theme.palette.grey[600]}
            fontSize={{ xs: 30, sm: 50 }}
          >
            {contentLength.toLocaleString()}
          </Typography>
          <Typography
            color={theme.palette.grey[600]}
            whiteSpace={"nowrap"}
            position={"absolute"}
            right={-45}
            bottom={30}
          >
            文字
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
