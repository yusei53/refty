import { Typography } from "@mui/material";
import { theme } from "@/src/utils/theme";

export const NotFoundFolder: React.FC = () => {
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
