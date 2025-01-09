"use client";
import Image from "next/image";
import { Box, styled, Typography } from "@mui/material";
import { Button } from "../ui/shared/button";
import { Footer } from "../ui/shared/footer";
import { theme } from "../utils/theme";

const NotFound = () => {
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        height={"90vh"}
      >
        <CustomImage
          src={"/not-found/404.png"}
          alt={"閲覧できる投稿がありません"}
          width={200}
          height={200}
          priority
        />
        <Typography component={"h2"} mb={1} fontSize={18}>
          ページが見つかりませんでした
        </Typography>
        <Typography color={`${theme.palette.grey[600]}`} mb={3} mx={3}>
          お探しのページはアクセスができないか、削除された可能性があります。
        </Typography>
        <Button>ホームに戻る</Button>
      </Box>
      <Footer />
    </>
  );
};

const CustomImage = styled(Image)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: 140,
    height: 140,
    marginRight: 10
  }
}));

export default NotFound;
