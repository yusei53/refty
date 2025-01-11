import Image from "next/image";
import Link from "next/link";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Typography } from "@mui/material";
import type { User } from "@prisma/client";
import { theme } from "@/src/utils/theme";

type ToOtherPageButtonProps = {
  currentUsername: User["username"];
  image: string;
};

export const ToOtherPageButton: React.FC<ToOtherPageButtonProps> = ({
  currentUsername,
  image
}) => {
  const href = currentUsername ? `/${currentUsername}` : "/login";

  return currentUsername ? (
    <Link href={href}>
      <Image
        src={image}
        alt={"text"}
        width={44}
        height={44}
        style={{
          borderRadius: "50%",
          border: `0.8px solid ${theme.palette.grey[500]}`,
          display: "flex",
          alignItems: "center"
        }}
      />
    </Link>
  ) : (
    <Typography
      component={Link}
      href={href}
      letterSpacing={1}
      display={"flex"}
      alignItems={"center"}
      color={theme.palette.primary.light}
      borderBottom={`1px solid #transparent`}
      sx={{
        textDecoration: "none",
        "&:hover": {
          borderBottom: `1px solid ${theme.palette.primary.light}`
        }
      }}
    >
      ログインする
      <ExitToAppIcon
        fontSize="small"
        sx={{ color: theme.palette.primary.light, ml: 0.5 }}
      />
    </Typography>
  );
};
