import { Button } from "@/src/components/ui/shared/button";

type TagButtonProps = {
  tag: string;
  onClick: () => void;
};

export const label = {
  fontSize: 13.8,
  letterSpacing: 0.8,
  p: "4px 7px",
  borderRadius: 2,
  border: "1px solid #DCDFE3",
  backgroundColor: "white"
};

export const TagButton: React.FC<TagButtonProps> = ({ tag, onClick }) => {
  return (
    <Button onClick={onClick} sx={label}>
      {tag}
    </Button>
  );
};
