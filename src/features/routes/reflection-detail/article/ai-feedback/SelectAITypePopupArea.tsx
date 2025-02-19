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
      <Button onClick={onClick} onBlur={onClose} sx={{ mr: 1 }}>
        {AIType === 0 && (
          <SelectedAITypeButton icon="👼" detail="ポジティブAI" />
        )}
        {AIType === 1 && (
          <SelectedAITypeButton icon="🧑‍💻" detail="ストイックAI" />
        )}
        {AIType === 2 && (
          <SelectedAITypeButton icon="👨‍🎨" detail="クリエイティブAI" />
        )}
        {AIType === 3 && (
          <SelectedAITypeButton icon="👨‍🚀" detail="ネクストアクションAI" />
        )}
        {AIType === 4 && <SelectedAITypeButton icon="🧝‍♂️" detail="金言AI" />}
      </Button>

      {anchorEl && (
         <Popper open={open} anchorEl={anchorEl} transition sx={{ zIndex: 2 }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              border={"0.5px solid #DCDFE3"}
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
                icon="👼"
                detail="ポジティブAI"
                description="明るく力強いメッセージで、あなたのモチベーションをアップさせます"
              />
              <SelectAIButton
                onAITypeSelect={onAITypeSelect}
                AIType={1}
                icon="🧑‍💻"
                detail="ストイックAI"
                description="現実的かつ厳しい視点で、改善点を明確に示すリアルなフィードバックを行います"
              />
              <SelectAIButton
                onAITypeSelect={onAITypeSelect}
                AIType={2}
                icon="👨‍🎨"
                detail="クリエイティブAI"
                description="斬新なアイデアと視点で、あなたの発想を広げるヒントを提案します"
              />
              <SelectAIButton
                onAITypeSelect={onAITypeSelect}
                AIType={3}
                icon="👨‍🚀"
                detail="ネクストアクションAI"
                description="次にすべき実践的な行動プランを、詳細にアドバイスします。
"
              />
              <SelectAIButton
                onAITypeSelect={onAITypeSelect}
                AIType={4}
                icon="🧝‍♂️"
                detail="金言AI"
                description="あなたの心に響く、インスピレーショナルな言葉を提示します"
              />
            </Box>
          </Fade>
        )}
      </Popper>
      )}

    </>
  );
};
