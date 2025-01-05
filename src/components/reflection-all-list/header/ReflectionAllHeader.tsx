import { Box, Typography, useMediaQuery } from "@mui/material";
import type { User } from "@prisma/client";
import { ToOtherPageButton } from "../button";
import { theme } from "@/src/utils/theme";

type ReflectionAllHeaderProps = {
  currentUsername: User["username"];
  image: string;
};

export const ReflectionAllHeader: React.FC<ReflectionAllHeaderProps> = ({
  currentUsername,
  image
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mx={{ xs: 4, md: 3 }}
        mt={8}
        mb={2}
      >
        <Typography component={"h1"} fontSize={17} letterSpacing={1}>
          みんなの振り返り(公開のみ)
        </Typography>
        {!isSmallScreen && (
          <ToOtherPageButton currentUsername={currentUsername} image={image} />
        )}
      </Box>
    </>
  );
};
