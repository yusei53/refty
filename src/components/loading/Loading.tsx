import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <CircularProgress size={45} sx={{ color: "#8FC9F9" }} />
    </Box>
  );
};
