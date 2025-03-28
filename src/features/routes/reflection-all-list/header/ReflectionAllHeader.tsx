import { Box, Typography } from "@mui/material";

export const ReflectionAllHeader = () => {
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mx={{ xs: 4, md: 3 }}
        mt={10}
        mb={3}
      >
        <Typography component={"h1"} fontSize={17} letterSpacing={1}>
          みんなの振り返り(公開のみ)
        </Typography>
      </Box>
    </>
  );
};
