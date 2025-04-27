import FolderIcon from "@mui/icons-material/Folder";
import TagIcon from "@mui/icons-material/Tag";
import { Box, Typography } from "@mui/material";
import { theme } from "@/src/app/_client/utils/theme";
import { Button } from "@/src/components/button";

type SelectionHeaderProps = {
  selectedInfo: { name: string; count: number } | null;
  isFolderSelected: boolean;
  isSelectMode: boolean;
  onCancel: () => void;
  onAdd: () => void;
  disableAdd: boolean;
};

// MEMO: サイドバーで選択したフォルダ、タグの情報を表示。一括追加時のボタンも表示
export const SelectionHeader: React.FC<SelectionHeaderProps> = ({
  selectedInfo,
  isSelectMode,
  onCancel,
  onAdd,
  isFolderSelected,
  disableAdd
}) => {
  return (
    <Box
      height={32}
      mx={3}
      my={1}
      letterSpacing={0.8}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      {selectedInfo && (
        <Box display={"flex"} alignItems={"center"}>
          {isFolderSelected ? <FolderIcon sx={icon} /> : <TagIcon sx={icon} />}
          <Typography component="span" fontWeight={550}>
            {selectedInfo.name}
          </Typography>
          <Typography>{`　${selectedInfo.count}件`}</Typography>
        </Box>
      )}
      {isSelectMode && (
        <Box display={"flex"} justifyContent={"right"} gap={1}>
          <Button sx={button} onClick={onCancel}>
            キャンセル
          </Button>
          <Button
            sx={{ ...button, color: theme.palette.primary.light }}
            onClick={onAdd}
            disabled={disableAdd}
          >
            更新
          </Button>
        </Box>
      )}
    </Box>
  );
};

const icon = {
  fontSize: 18,
  color: theme.palette.grey[500],
  mr: "4px"
};

const button = {
  fontSize: 13.5,
  p: "3px 6px",
  letterSpacing: 0.8,
  borderRadius: 2,
  border: "1px solid #DCDFE3",
  backgroundColor: "white"
};
