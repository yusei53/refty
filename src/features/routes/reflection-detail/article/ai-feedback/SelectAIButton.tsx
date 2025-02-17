import { Button } from "@/src/components/button";
import { theme } from "@/src/utils/theme";

type SelectAIButtonProps = {
  onAITypeSelect: (type: 0 | 1 | 2 | 3) => void;
  AIType: 0 | 1 | 2 | 3;
  emoji: string;
  detail: string;
};

const button = {
  border: "none",
  display: "block",
  textAlign: "left",
  width: "100%"
};

export const SelectAIButton: React.FC<SelectAIButtonProps> = ({
  onAITypeSelect,
  AIType,
  emoji,
  detail
}) => {
  return (
    <Button
      onClick={() => onAITypeSelect(AIType)}
      sx={{
        ...button,
        borderRadius: "none",
        letterSpacing: 0.8,
        "&:hover": {
          backgroundColor: theme.palette.primary.contrastText
        }
      }}
    >
      {emoji}　{detail}
    </Button>
  );
};
