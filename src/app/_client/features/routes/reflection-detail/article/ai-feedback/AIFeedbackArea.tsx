import { Box } from "@mui/material";
import { StyledMarkdown } from "../markdown";
import { theme } from "@/src/app/_client/utils/theme";

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
