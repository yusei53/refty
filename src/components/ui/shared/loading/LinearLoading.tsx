import { Box, LinearProgress } from "@mui/material";

// MEMO: カレンダー専用のローディング
export const LinearLoading = () => {
  return (
    <Box my={5} width={"100%"} px={5}>
      <LinearProgress color="success" />
    </Box>
  );
};
