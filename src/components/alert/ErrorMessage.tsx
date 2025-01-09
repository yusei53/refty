import { Typography } from "@mui/material";

type ErrorMessageProps = {
  message: string | undefined;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return message ? (
    <Typography color="error" variant="body2">
      {message}
    </Typography>
  ) : null;
};
