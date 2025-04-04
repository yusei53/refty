import Image from "next/image";
import { Box, styled, Typography } from "@mui/material";
import { CountBarChart } from "./CountBarChart";
import { useResponsive } from "@/src/hooks/responsive/useResponsive";
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
  const { isMobile } = useResponsive();
  const totalPosts = publicCount + privateCount;

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      flexDirection={{ xs: "column", sm: "row" }}
      gap={3}
    >
      <Box width={{ xs: "100%", sm: "auto" }}>
        <Typography mb={-3}>投稿数</Typography>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          ml={{ sm: 5 }}
        >
          <Typography sx={mainNumber}>{totalPosts}</Typography>
          <Image
            src={"/curly-brackets.png"}
            alt={"curly-brackets"}
            width={120}
            height={120}
            style={{ marginLeft: -30 }}
          />
          <Box
            display={"flex"}
            flexDirection={"column"}
            ml={-5}
            height={"100%"}
          >
            <Box display={"flex"} alignItems={"center"} gap={1.5}>
              <Box display={"flex"} flexDirection={"column"} gap={0.2}>
                <Typography whiteSpace={"nowrap"}>公開</Typography>
                <Typography whiteSpace={"nowrap"}>非公開</Typography>
              </Box>
              <Box>
                <Typography mb={-0.4} sx={subNumber}>
                  {publicCount}
                </Typography>
                <Typography mt={-0.4} sx={subNumber}>
                  {privateCount}
                </Typography>
              </Box>
            </Box>
          </Box>
          {!isMobile && (
            <CountBarChart
              publicCount={publicCount}
              privateCount={privateCount}
            />
          )}
        </Box>
      </Box>
      <Box width={{ xs: "100%", sm: "auto" }}>
        <Typography mb={-3}>合計文字数</Typography>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          ml={{ xs: -4, sm: 8 }}
          position={"relative"}
        >
          <TransparentBox />
          <Typography sx={mainNumber}>
            {contentLength.toLocaleString()}
          </Typography>
          <Typography
            color={theme.palette.grey[600]}
            whiteSpace={"nowrap"}
            position={"absolute"}
            right={{ xs: 100, sm: -45 }}
            bottom={{ xs: 40, sm: 30 }}
          >
            文字
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const mainNumber = {
  fontSize: { xs: 36, sm: 50 },
  color: theme.palette.grey[600]
};

const subNumber = {
  fontSize: 18,
  color: theme.palette.grey[600]
};

// MEMO: curly-bracketsと同じBoxを用意するため
const TransparentBox = styled(Box)({
  height: 120
});
