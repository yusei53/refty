import { Typography } from "@mui/material";
import { theme } from "@/src/utils/theme";

type AIFeedbackAreaProps = {
  AIFeedback: string;
};

export const AIFeedbackArea: React.FC<AIFeedbackAreaProps> = ({
  AIFeedback
}) => {
  return (
    <Typography
      p={3}
      lineHeight={2}
      letterSpacing={0.5}
      bgcolor={theme.palette.grey[400]}
    >
      {AIFeedback}
    </Typography>
  );
};
