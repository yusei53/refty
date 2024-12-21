import { theme } from "@/src/utils/theme";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Typography } from "@mui/material";
import { User } from "@prisma/client";
import Link from "next/link";

type ToOtherPageButtonProps = {
  currentUsername: User["username"];
};

export const ToOtherPageButton: React.FC<ToOtherPageButtonProps> = ({
  currentUsername
}) => {
  const text = currentUsername ? "マイページ" : "ログインする";
  const href = currentUsername ? `/${currentUsername}` : "/login";

  return (
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
      {text}
      <ExitToAppIcon
        fontSize="small"
        sx={{ color: theme.palette.primary.light, ml: 0.5 }}
      />
    </Typography>
  );
};
