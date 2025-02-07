import { Box, Typography } from "@mui/material";

const FirstView: React.FC = () => {
  return (
    <Box textAlign={"center"}>
      <Typography
        component={"h1"}
        fontWeight={"bold"}
        letterSpacing={1}
        fontSize={{ xs: 22, md: 40 }}
        mt={{ xs: 8, md: 10 }}
      >
        なぜ、振り返りを行うのか
      </Typography>
      <Typography
        textAlign={"center"}
        letterSpacing={{ xs: 0.5, md: 0.8 }}
        mb={15}
        mt={4}
        lineHeight={1.8}
        fontSize={{ md: 18 }}
      >
        振り返りを行うことで、どのような影響があるのか。
        <br />
        そのメリットを以下にご紹介します。
      </Typography>
    </Box>
  );
};

export default FirstView;
