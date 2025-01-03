import TextField from "@mui/material/TextField";
import { theme } from "@/src/utils/theme";

type TextAreaProps = {
  placeholder: string;
  rows: number;
  defaultValue: string;
  fullWidth: boolean;
  multiline: boolean;
} & Omit<
  React.ComponentProps<typeof TextField>,
  "placeholder" | "rows" | "defaultValue" | "fullWidth" | "multiline"
>;

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  rows,
  defaultValue,
  fullWidth,
  multiline,
  ...rest
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      placeholder={placeholder}
      multiline={multiline}
      rows={rows}
      defaultValue={defaultValue}
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          fontSize: 15,
          bgcolor: `${theme.palette.primary.contrastText}`,
          "& fieldset": {
            borderColor: `${theme.palette.grey[400]}`
          },
          "&:hover fieldset": {
            borderColor: `${theme.palette.grey[400]}`
          },
          "&.Mui-focused fieldset": {
            borderColor: `#C4C4C4`,
            borderWidth: 1.2
          }
        }
      }}
      {...rest}
    />
  );
};

export default TextArea;
