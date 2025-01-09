import { Box, Typography } from "@mui/material";
import { AILoading } from "@/src/ui/shared/loading";

export const AICalling = () => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      <Typography mr={1}>考えてます</Typography>
      <AILoading />
    </Box>
  );
};
