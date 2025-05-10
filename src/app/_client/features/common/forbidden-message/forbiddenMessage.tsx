import Image from "next/image";
import { Box, styled, Typography } from "@mui/material";

export const ForbiddenMessage = () => {
  return (
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <CustomImage
        src={"/not-found/no-post.png"}
        alt={"閲覧できる投稿がありません"}
        width={200}
        height={200}
      />
      <Typography letterSpacing={0.4}>
        権限がないか、投稿がありません
      </Typography>
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
