import React from "react";
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
  const totalPosts = publicCount + privateCount;

  const isMobile = useIsMobile();

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      width={"100%"}
      mb={2}
      mt={4}
    >
      <Box flex={1} mr={2}>
        <Typography
          component={"h2"}
          fontSize={{ xs: "0.875rem", sm: "1rem" }}
          mb={1}
          color={theme.palette.grey[600]}
        >
          投稿数
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            mt: -2,
            mb: 2,
            ml: { xs: 1, sm: 8 }
          }}
        >
          <Typography
            variant={"h3"}
            component={"div"}
            mb={{ xs: 0.5, sm: -0.25 }}
            mr={{ xs: -5, sm: -2 }}
            fontWeight={"normal"}
            lineHeight={1}
            color={theme.palette.grey[600]}
            sx={{
              fontSize: { xs: "1.75rem", sm: "3rem" }
            }}
          >
            {totalPosts}
          </Typography>
          <Box mb={{ xs: -4.5, sm: -4 }}>
            <Image
              src={
                isMobile ? "/curly-brackets-light.png" : "/curly-brackets.png"
              }
              alt={"curly-brackets"}
              width={100}
              height={100}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={1}
            ml={{ xs: -5, sm: -3 }}
            mt={0.5}
          >
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={1}
              mb={{ xs: -0.75, sm: -0.5 }}
            >
              <Typography
                variant={"body2"}
                mt={0.5}
                fontSize={{ xs: "0.6rem", sm: "0.875rem" }}
                whiteSpace="nowrap"
              >
                公開
              </Typography>
              <Typography
                variant={"body1"}
                color={theme.palette.grey[600]}
                fontWeight={"bold"}
                fontSize={{ xs: "0.875rem", sm: "1rem" }}
              >
                {publicCount}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              gap={1}
              mt={{ xs: -0.75, sm: -0.5 }}
            >
              <Typography
                variant={"body2"}
                mt={0.5}
                fontSize={{ xs: "0.6rem", sm: "0.875rem" }}
                whiteSpace="nowrap"
              >
                非公開
              </Typography>
              <Typography
                variant={"body1"}
                color={theme.palette.grey[600]}
                fontWeight={"bold"}
                fontSize={{ xs: "0.875rem", sm: "1rem" }}
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
      <Box flex={1} ml={{ xs: -2, sm: 2 }}>
        <Typography
          component={"h2"}
          fontSize={{ xs: "0.875rem", sm: "1rem" }}
          mb={1}
          color={theme.palette.grey[600]}
        >
          合計文字数
        </Typography>
        <Box display={"flex"} alignItems={"flex-end"} ml={{ xs: 1, sm: 8 }}>
          <Typography
            variant={"h3"}
            component={"div"}
            fontWeight={"normal"}
            color={theme.palette.grey[600]}
            lineHeight={1}
            fontSize={{ xs: "1.75rem", sm: "3rem" }}
            mt={{ xs: 2, sm: 0.5 }}
          >
            {contentLength.toLocaleString()}
          </Typography>
          <Typography
            variant={"body2"}
            color={theme.palette.grey[600]}
            ml={1}
            mb={{ xs: 0.5, sm: 1 }}
            fontSize={{ xs: "0.75rem", sm: "0.875rem" }}
            whiteSpace="nowrap"
          >
            文字
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
