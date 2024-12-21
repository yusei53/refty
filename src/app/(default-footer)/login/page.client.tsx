"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { FaDiscord, FaLine } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { AuthButton } from "@/src/components/ui/auth-button";

const LoginFormPage = () => {
  return (
    <Box
      mt={10}
      mb={{ xs: 9, md: 0 }}
      mx={{ md: 28 }}
      py={5}
      px={1}
      border={"1px solid #c4c4c4"}
      borderRadius={"10px"}
    >
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Typography
          component={"h1"}
          fontWeight={"bold"}
          fontSize={21}
          letterSpacing={1.2}
        >
          リフティ
        </Typography>
        <Typography fontSize={16} mt={0.4} mx={0.4}>
          に
        </Typography>
        <Typography
          component={"h2"}
          textAlign={"center"}
          fontSize={19}
          letterSpacing={1.2}
        >
          ログイン
        </Typography>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        my={1.5}
      >
        <Image
          src="/favicon.svg"
          alt="リフティのアイコン"
          width={100}
          height={100}
        />
        <Typography fontSize={14} my={1}>
          ログインすると投稿作成ができます
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "#c4c4c4", mx: 3 }} />
      <Stack gap={2} mx={6} mt={3.5}>
        <AuthButton
          label="Google"
          icon={FcGoogle}
          onClick={() =>
            signIn("google", {
              callbackUrl: "/setting/username"
            })
          }
        />
        <AuthButton
          label="Discord"
          icon={FaDiscord}
          iconColor={"#5865F2"}
          onClick={() =>
            signIn("discord", {
              callbackUrl: "/setting/username"
            })
          }
        />
        <AuthButton
          label="LINE"
          icon={FaLine}
          iconColor={"#00b900"}
          onClick={() =>
            signIn("line", {
              callbackUrl: "/setting/username"
            })
          }
        />
      </Stack>
    </Box>
  );
};

export default LoginFormPage;
