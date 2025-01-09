import { Typography } from "@mui/material";
import { theme } from "@/src/utils/theme";

type SettingProfileFormFieldProps = {
  label: string;
  description?: string;
};

export const FieldHeader: React.FC<SettingProfileFormFieldProps> = ({
  label,
  description
}) => {
  return (
    <>
      <Typography m={0.3}>{label}</Typography>
      {description && (
        <Typography m={0.3} fontSize={13} color={`${theme.palette.grey[600]}`}>
          {description}
        </Typography>
      )}
    </>
  );
};
