import { AccordionDetails, Box, Typography } from "@mui/material";
import { AICalling } from "./AICalling";
import { AIFeedbackArea } from "./AIFeedbackArea";
import { Accordion, AccordionSummary } from "@/src/components/accordion";
import { Button } from "@/src/components/button";
import { useAIFeedbackHandler } from "@/src/hooks/ai-feedback/useAIFeedbackHandler";
import { theme } from "@/src/utils/theme";

type AIFeedbackAreaContainerProps = {
  isCurrentUser: boolean;
  reflectionCUID: string;
  aiFeedback: string;
  content: string;
  onSendToSQS: () => Promise<void>;
};

export const AIFeedbackAreaContainer: React.FC<
  AIFeedbackAreaContainerProps
> = ({ isCurrentUser, reflectionCUID, aiFeedback, content, onSendToSQS }) => {
  const {
    animatedFeedback,
    isLoading,
    realTimeAIFeedback,
    isAICallButtonEnabled,
    handleSendToSQS
  } = useAIFeedbackHandler(reflectionCUID, aiFeedback, content, onSendToSQS);

  return (
    <Accordion>
      <AccordionSummary sx={{ mt: 8 }}>
        <Typography fontSize={17} fontWeight={550} letterSpacing={0.8}>
          AIからフィードバックをもらう
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ py: 0.5, px: 0 }}>
        <Button
          onClick={handleSendToSQS}
          disabled={!isAICallButtonEnabled || isLoading || !isCurrentUser}
          sx={{
            borderRadius: 2,
            bgcolor: theme.palette.primary.contrastText,
            "&:hover": {
              bgcolor: theme.palette.primary.main
            }
          }}
        >
          AIからフィードバックをもらう
        </Button>
        <Typography fontSize={12} color={theme.palette.grey[600]} mt={1}>
          文字数が100文字以上、かつまだAIからのフィードバックがない場合のみAIにフィードバックをもらえます
        </Typography>
        <Box my={3}>
          {aiFeedback ? (
            <AIFeedbackArea AIFeedback={aiFeedback} />
          ) : isLoading ? (
            <AICalling />
          ) : (
            realTimeAIFeedback && (
              <AIFeedbackArea AIFeedback={animatedFeedback} />
            )
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
