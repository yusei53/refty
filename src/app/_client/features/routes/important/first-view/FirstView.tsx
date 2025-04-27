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
        なぜ振り返りを行うのか
      </Typography>
      <Typography
        textAlign={"center"}
        letterSpacing={{ xs: 0.5, md: 0.8 }}
        mt={4}
        lineHeight={1.8}
        fontSize={{ md: 18 }}
      >
        振り返りは、過去の自分から大切なヒントを見つけ、未来に活かすチャンスです。
        <br />
        ここでは、振り返りがもたらす魅力とその効果をご紹介します。
      </Typography>
    </Box>
  );
};

export default FirstView;
