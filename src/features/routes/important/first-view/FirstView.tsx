import { Box, Typography } from "@mui/material";

const FirstView: React.FC = () => {
  return (
    <Box textAlign={"center"}>
      <Typography
        component={"h1"}
        fontWeight={"bold"}
        letterSpacing={1}
        fontSize={{ xs: 22, md: 40 }}
        my={15}
      >
        なぜ、振り返りを行うのか
      </Typography>
    </Box>
  );
};

export default FirstView;
