import { useState } from "react";
import {
  AccordionDetails,
  Box,
  Stack,
  Popper,
  Typography,
  Fade,
  Divider
} from "@mui/material";
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
  setAIType: (type: 0 | 1 | 2 | 3) => void;
  AIType: 0 | 1 | 2 | 3 | null;
};

const button = {
  border: "none",
  display: "block",
  textAlign: "left",
  width: "100%"
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAITypeSelect = (type: 0 | 1 | 2 | 3) => {
    setAIType(type);
    setAnchorEl(null);
  };

  return (
    <Accordion>
      <AccordionSummary sx={{ mt: 8 }}>
        <Typography fontSize={17} fontWeight={550} letterSpacing={0.8}>
          AIからフィードバックをもらう
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ py: 0.5, px: 0 }}>
        <Box display="flex" flexDirection="row">
          <Button
            onClick={handleSendToSQS}
            disabled={
              !isAICallButtonEnabled ||
              isLoading ||
              !isCurrentUser ||
              AIType === null
            }
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
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            border={`1px solid ${theme.palette.grey[300]}`}
            borderRadius={8}
            px={2}
            py={1}
            mx={3}
            tabIndex={0}
            onClick={handleClick}
            onBlur={handleClose}
            sx={{
              "&:hover": {
                cursor: "pointer"
              }
            }}
          >
            {AIType === null && (
              <>
                <Box>👹</Box>
                <Box>👼</Box>
                <Box>👻</Box>
                <Box>👽</Box>
              </>
            )}
            {AIType === 0 && <Box>👹</Box>}
            {AIType === 1 && <Box>👼</Box>}
            {AIType === 2 && <Box>👻</Box>}
            {AIType === 3 && <Box>👽</Box>}
          </Stack>
          <Popper open={open} anchorEl={anchorEl} transition sx={{ zIndex: 2 }}>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={250}>
                <Box
                  boxShadow={1}
                  borderRadius={2.5}
                  bgcolor={"white"}
                  zIndex={2}
                  maxHeight={"320px"}
                  overflow={"auto"}
                  sx={{
                    "&::-webkit-scrollbar": {
                      width: "4px",
                      height: "4px"
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: theme.palette.grey[400],
                      borderRadius: "4px"
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: theme.palette.grey[600]
                    }
                  }}
                >
                  <Button
                    onClick={() => handleAITypeSelect(0)}
                    sx={{
                      ...button,
                      borderRadius: "none",
                      letterSpacing: 0.8,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.contrastText
                      }
                    }}
                  >
                    👹
                  </Button>
                  <Divider sx={{ borderColor: theme.palette.grey[400] }} />
                  <Button
                    onClick={() => handleAITypeSelect(1)}
                    sx={{
                      ...button,
                      borderRadius: "none",
                      letterSpacing: 0.8,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.contrastText
                      }
                    }}
                  >
                    👼
                  </Button>
                  <Divider sx={{ borderColor: theme.palette.grey[400] }} />
                  <Button
                    onClick={() => handleAITypeSelect(2)}
                    sx={{
                      ...button,
                      borderRadius: "none",
                      letterSpacing: 0.8,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.contrastText
                      }
                    }}
                  >
                    👻
                  </Button>
                  <Divider sx={{ borderColor: theme.palette.grey[400] }} />
                  <Button
                    onClick={() => handleAITypeSelect(3)}
                    sx={{
                      ...button,
                      borderRadius: "none",
                      letterSpacing: 0.8,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.contrastText
                      }
                    }}
                  >
                    👽
                  </Button>
                  <Divider sx={{ borderColor: theme.palette.grey[400] }} />
                </Box>
              </Fade>
            )}
          </Popper>
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
