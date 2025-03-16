import { Box, Typography } from "@mui/material";
import type { User } from "@prisma/client";
import { ToOtherPageButton } from "../button";
import { useIsMobile } from "@/src/hooks/responsive/useIsMobile";

type ReflectionAllHeaderProps = {
  currentUsername: User["username"];
  image: string;
};

export const ReflectionAllHeader: React.FC<ReflectionAllHeaderProps> = ({
  currentUsername,
  image
}) => {
  const isMobile = useIsMobile();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      mx={{ xs: 4, md: 3 }}
      mt={10}
      mb={2}
    >
      <Typography component={"h1"} fontSize={17} letterSpacing={1}>
        みんなの振り返り(公開のみ)
      </Typography>
      {!isMobile && (
        <ToOtherPageButton currentUsername={currentUsername} image={image} />
      )}
    </Box>
  );
};
