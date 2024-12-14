"use client";
import { Box } from "@mui/material";
import { MobileFooterButton } from "./MobileFooterButton";
import { theme } from "@/src/utils/theme";
import { useSession } from "next-auth/react";

export const MobileFooter = () => {
  const { data: session } = useSession();

  return (
    <Box
      bgcolor={"white"}
      borderTop={`0.5px solid ${theme.palette.grey[300]}`}
      width={"100vw"}
      display={"flex"}
      justifyContent={"center"}
      gap={5}
      pt={1}
      pb={3.5}
      position={"sticky"}
      bottom={0}
    >
      <MobileFooterButton
        href={"/"}
        imagePass={"home.svg"}
        alt={"ホームへ行くボタン"}
        title={"ホーム"}
      />
      {session?.user.username ? (
        <>
          <MobileFooterButton
            href={`/${session?.user.username}`}
            imagePass={"user.svg"}
            alt={"マイページへ行くボタン"}
            title={"マイページ"}
          />
          <MobileFooterButton
            href={`/post`}
            imagePass={"post.svg"}
            alt={"投稿ページへ行くボタン"}
            title={"投稿"}
          />
        </>
      ) : (
        <MobileFooterButton
          href={`/login`}
          imagePass={"login.svg"}
          alt={"ログインページへ行くボタン"}
          title={"ログイン"}
        />
      )}
      <MobileFooterButton
        href={`/welcome`}
        imagePass={"contents.svg"}
        alt={"リフティのランディングページへ行くボタン"}
        title={"リフティとは"}
      />
    </Box>
  );
};
