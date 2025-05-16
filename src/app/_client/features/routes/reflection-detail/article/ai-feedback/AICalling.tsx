import { Box, Typography } from "@mui/material";
import { AILoading } from "@/src/app/_client/components/loading";

export const AICalling = () => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      <Typography mr={1}>考えています</Typography>
      <AILoading />
    </Box>
  );
};
