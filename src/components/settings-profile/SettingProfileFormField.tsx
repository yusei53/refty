import { Controller } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import type { Control, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "../ui/shared/alert";
import TextArea from "../ui/shared/text-area/TextArea";
import { theme } from "@/src/utils/theme";

type FormValues = {
  username: string;
  bio: string;
  goal: string;
  website: string;
};

type SettingProfileFormFieldProps = {
  label: string;
  description: string;
  name: "username" | "bio" | "goal" | "website";
  placeholder: string;
  rows: number;
  allowMultiline?: boolean;
  control: Control<{
    username: string;
    bio: string | null;
    goal: string | null;
    website: string | null;
  }>;
  errors: FieldErrors<FormValues>;
};

const SettingProfileFormField: React.FC<SettingProfileFormFieldProps> = ({
  label,
  description,
  name,
  placeholder,
  rows,
  allowMultiline = false,
  control,
  errors
}) => {
  return (
    <Box>
      <Typography m={0.3}>{label}</Typography>
      <Typography m={0.3} fontSize={13} color={`${theme.palette.grey[600]}`}>
        {description}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextArea
            placeholder={placeholder}
            rows={rows}
            defaultValue={field.value || ""}
            fullWidth
            multiline={allowMultiline}
            onChange={field.onChange}
          />
        )}
      />
      {errors[name] && <ErrorMessage message={errors[name]?.message} />}
    </Box>
  );
};

export default SettingProfileFormField;
