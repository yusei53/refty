"use client";
import { Box } from "@mui/material";
import { MobileFooterButton } from "./MobileFooterButton";
import { theme } from "@/src/utils/theme";
import { useSession } from "next-auth/react";

export const MobileFooter = () => {
  const { data: session } = useSession();

  return (
    <Box
      component={"footer"}
      bgcolor={"white"}
      borderTop={`0.5px solid ${theme.palette.grey[300]}`}
      width={"100vw"}
      display={"flex"}
      justifyContent={"center"}
      gap={8}
      pt={1}
      pb={4}
      position={"sticky"}
      bottom={0}
    >
      <MobileFooterButton
        href={"/"}
        imagePass={"home.svg"}
        alt={"ホームへ行くボタン"}
      />
      <MobileFooterButton
        href={`/welcome`}
        imagePass={"contents.svg"}
        alt={"リフティのランディングページへ行くボタン"}
      />
      {session?.user.username ? (
        <>
          <MobileFooterButton
            href={`/post`}
            imagePass={"post.svg"}
            alt={"投稿ページへ行くボタン"}
          />
          <MobileFooterButton
            href={`/${session?.user.username}`}
            imagePass={`${session.user.image}`}
            alt={"マイページへ行くボタン"}
            isAvatar
          />
        </>
      ) : (
        <MobileFooterButton
          href={`/login`}
          imagePass={"login.svg"}
          alt={"ログインページへ行くボタン"}
        />
      )}
    </Box>
  );
};
