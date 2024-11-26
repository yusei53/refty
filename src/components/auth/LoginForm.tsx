import { Box, Typography, Divider, Stack } from "@mui/material";
import { AuthButton } from "./AuthButton";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  return (
    <Box
      mt={10}
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
      <Typography textAlign={"center"} my={3} fontSize={14}>
        ログインすると投稿作成ができます
      </Typography>
      <Divider sx={{ borderColor: "#c4c4c4", mx: 3 }} />
      <Stack gap={2} mx={6} mt={3.5}>
        <AuthButton
          label="Google"
          icon={FcGoogle}
          onClick={() =>
            signIn("google", {
              callbackUrl: "/setting/username",
            })
          }
        />
        <AuthButton
          label="Discord"
          icon={FaDiscord}
          onClick={() =>
            signIn("discord", {
              callbackUrl: "/setting/username",
            })
          }
        />
      </Stack>
    </Box>
  );
};

export default LoginForm;
