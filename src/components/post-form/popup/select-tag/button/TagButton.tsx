import { Button } from "@/src/components/ui/shared/button";

type TagButtonProps = {
  tag: string;
  onClick: () => void;
  selected: boolean; // 追加: 選択状態を受け取る
};

const label = {
  fontSize: 13.8,
  letterSpacing: 0.8,
  p: "4px 7px",
  borderRadius: 2,
  border: "1px solid #DCDFE3",
  backgroundColor: "white",
  "&.selected": {
    borderColor: "#007bff", // 選択されたときのボーダーカラー
    backgroundColor: "#e0f7fa" // 選択されたときの背景色
  }
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
        ...(selected && label["&.selected"]) // 選択されたときのスタイルを適用
      }}
    >
      {tag}
    </Button>
  );
};
