import { Box, styled, Typography } from "@mui/material";
import Image from "next/image";

const HaveNotPost = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={1}
      mb={10}
    >
      <CustomImage
        src={"/not-found/no-post.png"}
        alt={"閲覧できる投稿がありません"}
        width={200}
        height={200}
      />
      <Typography letterSpacing={0.4}>まだ投稿がありません</Typography>
    </Box>
  );
};

const CustomImage = styled(Image)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: 140,
    height: 140,
    marginRight: 10
  }
}));

export default HaveNotPost;
