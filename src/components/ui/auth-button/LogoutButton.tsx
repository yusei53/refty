"use client";
import { theme } from "@/src/utils/theme";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <Button
      sx={{
        fontSize: 13,
        display: "block",
        color: `${theme.palette.grey[600]}`,
        border: "none",
        borderRadius: 0,
        p: 0,
        transform: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
      disableRipple
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      ログアウト
    </Button>
  );
};

export default LogoutButton;
