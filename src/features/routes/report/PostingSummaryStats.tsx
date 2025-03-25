import React from "react";
import { Box, Typography } from "@mui/material";
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

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      width={"100%"}
      mb={2}
      mt={4}
    >
      <Box flex={1} mr={2}>
        <Typography component={"h2"} fontSize={"1rem"} mb={1}>
          投稿数
        </Typography>
        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2, ml: 8 }}>
          <Typography
            variant={"h3"}
            component={"div"}
            mb={0.5}
            fontWeight={"normal"}
            lineHeight={1}
            color={theme.palette.grey[600]}
          >
            {totalPosts}
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={1}
            ml={5}
            mt={0.5}
          >
            <Box display={"flex"} flexDirection={"row"} gap={1}>
              <Typography variant={"body2"} mt={0.5}>
                公開
              </Typography>
              <Typography
                variant={"body1"}
                color={theme.palette.grey[600]}
                fontWeight={"bold"}
              >
                {publicCount}
              </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"row"} gap={1}>
              <Typography variant={"body2"} mt={0.5}>
                非公開
              </Typography>
              <Typography
                variant={"body1"}
                color={theme.palette.grey[600]}
                fontWeight={"bold"}
              >
                {privateCount}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box flex={1} pl={2}>
        <Typography
          component={"h2"}
          fontSize={"1rem"}
          mb={1}
          color={theme.palette.grey[600]}
        >
          合計文字数
        </Typography>
        <Box display={"flex"} alignItems={"flex-end"} ml={8}>
          <Typography
            variant={"h3"}
            component={"div"}
            fontWeight={"normal"}
            color={theme.palette.grey[600]}
            lineHeight={1}
          >
            {contentLength.toLocaleString()}
          </Typography>
          <Typography
            variant={"body2"}
            color={theme.palette.grey[600]}
            ml={1}
            mb={1}
          >
            文字
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
