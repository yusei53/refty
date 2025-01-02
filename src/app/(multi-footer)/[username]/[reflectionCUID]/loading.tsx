import { Box, CircularProgress } from "@mui/material";

const loading = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"80vh"}
    >
      <CircularProgress size={45} sx={{ color: "#8FC9F9" }} />
    </Box>
  );
};

export default loading;
