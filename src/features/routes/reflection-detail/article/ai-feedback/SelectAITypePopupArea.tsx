import { Box, Popper, Fade } from "@mui/material";
import type { AIFeedbackType } from "@/src/api/send-to-sqs-api";
import { SelectAIButton } from "./SelectAIButton";
import { SelectedAITypeButton } from "./SelectedAITypeButton";
import { Button } from "@/src/components/button";
import { theme } from "@/src/utils/theme";

type SelectAITypePopupAreaProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onAITypeSelect: (type: AIFeedbackType) => void;
  AIType: AIFeedbackType;
};

export const SelectAITypePopupArea: React.FC<SelectAITypePopupAreaProps> = ({
  open,
  anchorEl,
  onClick,
  onClose,
  onAITypeSelect,
  AIType
}) => {
  return (
    <>
      <Button
        variant="outlined"
        onClick={onClick}
        onBlur={onClose}
        sx={{ mx: 2 }}
      >
        {AIType === 0 && (
          <SelectedAITypeButton
            icon="/book.svg"
            alt="ポジティブタイプ"
            detail="ポジティブタイプ"
          />
        )}
        {AIType === 1 && (
          <SelectedAITypeButton
            icon="/book.svg"
            alt="ストイックタイプ"
            detail="ストイックタイプ"
          />
        )}
        {AIType === 2 && (
          <SelectedAITypeButton
            icon="/book.svg"
            alt="クリエイティブタイプ"
            detail="クリエイティブタイプ"
          />
        )}
        {AIType === 3 && (
          <SelectedAITypeButton
            icon="/book.svg"
            alt="ネクストアクションタイプ"
            detail="ネクストアクションタイプ"
          />
        )}
        {AIType === 4 && (
          <SelectedAITypeButton
            icon="/book.svg"
            alt="金言タイプ"
            detail="金言タイプ"
          />
        )}
      </Button>
      <Popper
        disablePortal
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{ zIndex: 2 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              boxShadow={1}
              borderRadius={2.5}
              bgcolor={"white"}
              zIndex={2}
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
              <SelectAIButton
                onAITypeSelect={onAITypeSelect}
                AIType={0}
                icon="/book.svg"
                detail="ポジティブタイプ"
                description="ポジティブなフィードバックをもらえますポジティブなフィードバックをもらえます"
              />
              <SelectAIButton
                onAITypeSelect={onAITypeSelect}
                AIType={1}
                icon="/book.svg"
                detail="ストイックタイプ"
                description="ストイックなフィードバックをもらえます"
              />
              <SelectAIButton
                onAITypeSelect={onAITypeSelect}
                AIType={2}
                icon="/book.svg"
                detail="クリエイティブタイプ"
                description="斬新な視点でのフィードバックをもらえます"
              />
              <SelectAIButton
                onAITypeSelect={onAITypeSelect}
                AIType={3}
                icon="/book.svg"
                detail="ネクストアクションタイプ"
                description="具体的なネクストアクションが提示されます"
              />
              <SelectAIButton
                onAITypeSelect={onAITypeSelect}
                AIType={4}
                icon="/book.svg"
                detail="金言タイプ"
                description="あなたに響く金言をもらえます"
              />
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};
