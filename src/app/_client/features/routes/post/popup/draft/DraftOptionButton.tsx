import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography
} from "@mui/material";
import type { DraftData } from "@/src/app/_client/hooks/reflection/useAutoSave";
import { theme } from "@/src/app/_client/utils/theme";

type DraftOptionButtonProps = {
  draft: DraftData;
  draftId: string;
  currentDraftId: string;
  onDraftChange: (draftId: string) => void;
  onClose: () => void;
  deleteDraft: (draftId: string) => void;
};

export const DraftOptionButton: React.FC<DraftOptionButtonProps> = ({
  draft,
  draftId,
  currentDraftId,
  onDraftChange,
  onClose,
  deleteDraft
}) => {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Tooltip title="削除">
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteDraft(draftId)}
            size="small"
            sx={{
              opacity: 0.7,
              ":hover": { color: "error.main", opacity: 1 }
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
      sx={{
        borderRadius: 1,
        px: 1,
        "&:hover": { backgroundColor: theme.palette.primary.contrastText }
      }}
    >
      <ListItemButton
        selected={currentDraftId === draftId}
        onClick={() => {
          onDraftChange(draftId);
          onClose();
        }}
        sx={{
          borderRadius: 1,
          py: 1,
          pr: 4,
          "&:hover": { backgroundColor: "transparent" }
        }}
      >
        <ListItemText
          primary={
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                fontWeight={currentDraftId === draftId ? 500 : 400}
                fontSize={15}
                noWrap
              >
                {draft.formData.title || "無題の投稿"}
              </Typography>
              {currentDraftId === draftId && (
                <CheckIcon fontSize="small" sx={{ ml: 0.5 }} />
              )}
            </Box>
          }
          secondary={
            <Typography fontSize={12} color="text.secondary" noWrap>
              最終更新:{" "}
              {formatDistanceToNow(draft.lastSaved, {
                addSuffix: true,
                locale: ja
              })}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};
