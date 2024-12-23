import { Box, Typography, useMediaQuery } from "@mui/material";
import type { User } from "@prisma/client";
import { ToOtherPageButton } from "../button";
import { theme } from "@/src/utils/theme";

type ReflectionAllHeaderProps = {
  currentUsername: User["username"];
};

export const ReflectionAllHeader: React.FC<ReflectionAllHeaderProps> = ({
  currentUsername
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        mx={{ xs: 4, md: 3 }}
      >
        <Typography component={"h1"} fontSize={17} letterSpacing={1}>
          みんなの振り返り(公開のみ)
        </Typography>
        {!isSmallScreen && (
          <ToOtherPageButton currentUsername={currentUsername} />
        )}
      </Box>
    </>
  );
};
