import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";
import type { DraftData } from "@/src/app/_client/hooks/reflection/useAutoSave";
import { Button } from "@/src/app/_client/components/button";
import { theme } from "@/src/app/_client/utils/theme";

type DraftOptionButtonProps = {
  draft: DraftData;
  draftId: string;
  currentDraftId: string;
  onDraftChange: (draftId: string) => void;
  deleteDraft: (draftId: string) => void;
};

export const DraftOptionButton: React.FC<DraftOptionButtonProps> = ({
  draft,
  draftId,
  currentDraftId,
  onDraftChange,
  deleteDraft
}) => {
  return (
    <Button
      onClick={() => onDraftChange(draftId)}
      sx={{
        border: "none",
        display: "block",
        textAlign: "left",
        width: "100%",
        borderRadius: "none",
        position: "relative",
        textTransform: "none",
        "&:hover": { backgroundColor: theme.palette.primary.contrastText }
      }}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Typography
          fontSize={13.5}
          maxWidth={"145px"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          position={"relative"}
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1
          }}
        >
          {draft.formData.title || "無題の投稿"}
        </Typography>
        {draftId == currentDraftId && (
          <CheckIcon fontSize="small" sx={{ pl: 0.5 }} />
        )}
      </Box>
      <Typography fontSize={11.5} color={theme.palette.grey[600]}>
        最終更新:
        {formatDistanceToNow(draft.lastSaved, {
          addSuffix: true,
          locale: ja
        })}
      </Typography>
      <DeleteIcon
        fontSize="small"
        onClick={() => deleteDraft(draftId)}
        sx={{
          color: theme.palette.grey[600],
          opacity: 0.7,
          position: "absolute",
          right: 12,
          top: 16,
          ":hover": { color: "error.main", opacity: 1 }
        }}
      />
    </Button>
  );
};
