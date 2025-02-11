import { Typography } from "@mui/material";

type ErrorMessageProps = {
  message: string | undefined;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return message ? (
    <Typography color="error" fontSize={12}>
      {message}
    </Typography>
  ) : null;
};
