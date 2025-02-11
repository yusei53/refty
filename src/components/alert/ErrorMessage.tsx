import { Typography } from "@mui/material";
import type { SxProps } from "@mui/material";

type ErrorMessageProps = {
  message: string | undefined;
  sx?: SxProps;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, sx }) => {
  return message ? (
    <Typography color="error" fontSize={12} sx={sx}>
      {message}
    </Typography>
  ) : null;
};
