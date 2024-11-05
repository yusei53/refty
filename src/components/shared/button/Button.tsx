import { Button as MuiButton, ButtonProps } from "@mui/material";

type CustomButtonProps = {
  children: React.ReactNode;
} & ButtonProps;

export const Button: React.FC<CustomButtonProps> = ({
  children,
  sx,
  ...props
}) => (
  <MuiButton
    sx={{
      color: "black",
      border: "1px solid #DCDFE3",
      borderRadius: 10,
      p: "8px 16px",
      ...sx,
    }}
    {...props}
  >
    {children}
  </MuiButton>
);
