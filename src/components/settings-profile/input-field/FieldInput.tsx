import { Controller } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import type { Control, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "../../ui/shared/alert";
import TextArea from "../../ui/shared/text-area/TextArea";

type FormValues = {
  username: string;
  bio: string;
  goal: string;
  website: string;
};
type FieldInputProps = {
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

export const FieldInput: React.FC<FieldInputProps> = ({
  name,
  placeholder,
  rows,
  allowMultiline = false,
  control,
  errors
}) => {
  return name === "username" ? (
    <>
      <Box display={"flex"} alignItems={"baseline"}>
        <Typography
          component={"span"}
          m={0.3}
          whiteSpace={"nowrap"}
          fontSize={16}
          letterSpacing={0.8}
        >
          https://www.refty.jp/
        </Typography>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextArea
              placeholder={placeholder}
              rows={rows}
              defaultValue={field.value}
              multiline={allowMultiline}
              onChange={field.onChange}
              fullWidth={false}
            />
          )}
        />
      </Box>
      {errors[name] && <ErrorMessage message={errors[name].message} />}
    </>
  ) : (
    <>
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
      {errors[name] && <ErrorMessage message={errors[name].message} />}
    </>
  );
};
