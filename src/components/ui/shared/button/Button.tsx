import type { ButtonProps } from "@mui/material";
import { Button as MuiButton } from "@mui/material";

type CustomButtonProps = {
  children: React.ReactNode;
} & ButtonProps;

export const Button: React.FC<CustomButtonProps> = ({
  children,
  sx,
  ...props
}) => (
  <MuiButton
    disableRipple
    sx={{
      color: "black",
      border: "1px solid #DCDFE3",
      borderRadius: 10,
      p: { xs: "5px 14px", sm: "8px 16px" },
      ...sx
    }}
    {...props}
  >
    {children}
  </MuiButton>
);
