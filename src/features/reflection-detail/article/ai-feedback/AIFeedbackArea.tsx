import { Box } from "@mui/material";
import { StyledMarkdown } from "../mark-down";
import { theme } from "@/src/utils/theme";

type AIFeedbackAreaProps = {
  AIFeedback: string;
};

export const AIFeedbackArea: React.FC<AIFeedbackAreaProps> = ({
  AIFeedback
}) => {
  return (
    <Box py={1} px={4} borderRadius={1} bgcolor={theme.palette.grey[400]}>
      <StyledMarkdown dangerouslySetInnerHTML={{ __html: AIFeedback }} />
    </Box>
  );
};
