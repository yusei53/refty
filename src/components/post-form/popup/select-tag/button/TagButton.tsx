import { Button } from "@/src/components/ui/shared/button";

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
          borderColor: "#007bff",
          backgroundColor: "#e0f7fa"
        })
      }}
    >
      {tag}
    </Button>
  );
};
