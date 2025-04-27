import LoginIcon from "@mui/icons-material/Login";
import { Box, IconButton } from "@mui/material";
import { theme } from "@/src/app/_client/utils/theme";

export const LoginButtonHeader = () => {
  return (
    <Box
      component={"header"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={1.5}
      position={"absolute"}
      top={27}
      right={27}
    >
      <IconButton href={`/login`} sx={button}>
        <LoginIcon sx={{ mr: 0.5, color: theme.palette.grey[600] }} />
        ログインする
      </IconButton>
    </Box>
  );
};

// TODO: 内製化したい
const button = {
  color: "black",
  fontSize: 14,
  p: "6px 12px",
  letterSpacing: 0.8,
  borderRadius: 2,
  border: "1px solid #DCDFE3",
  backgroundColor: "white"
};
