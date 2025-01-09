import { Button } from "@/src/ui/shared/button";
import { theme } from "@/src/utils/theme";

type TagButtonProps = {
  tag: string;
  onClick: () => void;
  selected: boolean;
};

export const label = {
  fontSize: 13.8,
  p: "4px 7px",
  letterSpacing: 0.8,
  borderRadius: 2,
  border: "1px solid #DCDFE3",
  backgroundColor: "white"
};

export const TagButton: React.FC<TagButtonProps> = ({
  tag,
  onClick,
  selected
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        ...label,
        ...(selected && {
          backgroundColor: `${theme.palette.primary.main}`
        })
      }}
    >
      {tag}
    </Button>
  );
};
