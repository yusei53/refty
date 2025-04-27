import { IoArrowUndoSharp } from "react-icons/io5";
import { AccordionDetails, Box, Typography } from "@mui/material";
import type { AIFeedbackType } from "@/src/app/_client/api/send-to-sqs-api";
import { AICalling } from "./AICalling";
import { AIFeedbackArea } from "./AIFeedbackArea";
import { SelectAITypePopupAreaContainer } from "./SelectAITypePopupAreaContainer";
import {
  Accordion,
  AccordionSummary
} from "@/src/app/_client/components/accordion";
import { Button } from "@/src/app/_client/components/button";
import { useAIFeedbackHandler } from "@/src/app/_client/hooks/ai-feedback/useAIFeedbackHandler";
import { useResponsive } from "@/src/app/_client/hooks/responsive/useResponsive";
import { theme } from "@/src/app/_client/utils/theme";

type AIFeedbackAreaContainerProps = {
  isCurrentUser: boolean;
  reflectionCUID: string;
  aiFeedback: string;
  content: string;
  onSendToSQS: () => Promise<void>;
  setAIType: (type: AIFeedbackType) => void;
  AIType: AIFeedbackType;
};

export const AIFeedbackAreaContainer: React.FC<
  AIFeedbackAreaContainerProps
> = ({
  isCurrentUser,
  reflectionCUID,
  aiFeedback,
  content,
  onSendToSQS,
  setAIType,
  AIType
}) => {
  const {
    animatedFeedback,
    isLoading,
    realTimeAIFeedback,
    isAICallButtonEnabled,
    handleSendToSQS
  } = useAIFeedbackHandler(reflectionCUID, aiFeedback, content, onSendToSQS);

  const { isMobile } = useResponsive();

  return (
    <Accordion>
      <AccordionSummary sx={{ mt: 8 }}>
        <Typography fontSize={17} fontWeight={550} letterSpacing={0.8}>
          {/* NOTE: フィードバックがすでにある場合、「見る」、まだフィードバックがないかつ自分の投稿の場合は「受け取る」 */}
          {aiFeedback
            ? "AIからのフィードバックを見る"
            : "AIからフィードバックを受け取る"}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ py: 0.5, px: 0 }}>
        <Box
          display={"flex"}
          flexDirection={isMobile ? "column-reverse" : "row"}
          gap={isMobile ? 2 : 0}
        >
          <Button
            onClick={handleSendToSQS}
            disabled={!isAICallButtonEnabled || isLoading || !isCurrentUser}
            sx={{
              borderRadius: 3,
              bgcolor: theme.palette.primary.contrastText,
              "&:hover": {
                bgcolor: theme.palette.primary.main
              }
            }}
          >
            AIからフィードバックを受け取る
          </Button>
          {isAICallButtonEnabled && isCurrentUser && (
            <Box display={"flex"} ml={{ sm: 1 }}>
              <SelectAITypePopupAreaContainer
                setAIType={setAIType}
                AIType={AIType}
              />
              <Box display={"flex"} alignItems={"center"}>
                {!isMobile && (
                  <Box
                    color={theme.palette.grey[500]}
                    fontSize={"30px"}
                    mr={1}
                    component={IoArrowUndoSharp}
                  />
                )}
                <Typography
                  fontSize={isMobile ? 13 : 15}
                  color={theme.palette.grey[600]}
                >
                  AIのタイプを選択
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
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
