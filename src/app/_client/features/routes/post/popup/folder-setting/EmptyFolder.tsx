import { Typography } from "@mui/material";
import { theme } from "@/src/app/_client/utils/theme";

export const EmptyFolder = () => {
  return (
    <Typography
      component={"span"}
      sx={{ color: theme.palette.grey[500] }}
      fontSize={12}
    >
      フォルダがありません
    </Typography>
  );
};
