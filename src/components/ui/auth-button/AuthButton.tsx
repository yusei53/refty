import type {
  ButtonProps,
  SxProps} from "@mui/material";
import {
  Box,
  Button as MuiButton,
  Typography
} from "@mui/material";
import type { IconType } from "react-icons";

type AuthButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: IconType;
  iconColor?: string;
  sx?: SxProps;
} & ButtonProps;

export const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  onClick,
  icon: Icon,
  iconColor,
  sx
}) => {
  return (
    <MuiButton
      onClick={onClick}
      sx={{
        position: "relative",
        textTransform: "none",
        fontSize: { xs: 13, md: 14 },
        width: "100%",
        color: "black",
        border: "1px solid #c4c4c4",
        fontWeight: "bold",
        letterSpacing: 1,

        ...sx
      }}
    >
      {Icon && (
        <Box
          display={"flex"}
          alignItems={"center"}
          position={"absolute"}
          left={{ xs: 15, md: 24 }}
          fontSize={{ xs: 20, md: 25 }}
        >
          <Icon
            style={{
              color: iconColor
            }}
          />
        </Box>
      )}
      {label}
      <Typography
        component={"span"}
        fontSize={{ xs: 13, md: 14 }}
        letterSpacing={0.8}
      >
        でログイン
      </Typography>
    </MuiButton>
  );
};
