import { theme } from "@/src/utils/theme";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Typography } from "@mui/material";
import Link from "next/link";

export const ToHomePageButton: React.FC = () => {
  return (
    <Typography
      component={Link}
      href={"/"}
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
      ホーム
      <ExitToAppIcon
        fontSize="small"
        sx={{ color: theme.palette.primary.light, ml: 0.5 }}
      />
    </Typography>
  );
};
