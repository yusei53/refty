import {
  Box,
  List,
  Typography,
  Popper,
  Fade,
  Paper,
  Divider
} from "@mui/material";
import type { DraftDataList } from "../../../../../hooks/reflection/useAutoSave";
import { useResponsive } from "../../../../../hooks/responsive/useResponsive";
import { DraftOptionButton } from "./DraftOptionButton";
import { Button } from "@/src/app/_client/components/button";
import { theme } from "@/src/app/_client/utils/theme";

type DraftListProps = {
  draftList: DraftDataList;
  currentDraftId: string;
  open: boolean;
  anchorEl: HTMLElement | null;
  onDraftChange: (draftId: string) => void;
  deleteDraft: (draftId: string) => void;
  onToggle: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
};

export const DraftList: React.FC<DraftListProps> = ({
  draftList,
  currentDraftId,
  onDraftChange,
  open,
  anchorEl,
  deleteDraft,
  onToggle,
  onClose
}) => {
  const { isMobile } = useResponsive();
  const draftEntries = Object.entries(draftList);
  if (draftEntries.length === 0) {
    return (
      <Box sx={{ px: 2, py: 1 }}>
        <Typography color="text.secondary" fontSize={14}>
          下書きはありません
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", minWidth: isMobile ? "100%" : 220 }}>
      <Button onClick={onToggle} onBlur={onClose} sx={{ border: "none" }}>
        下書き一覧
      </Button>
      {isMobile ? (
        open && (
          <Paper
            elevation={4}
            sx={{
              boxShadow: 1,
              borderRadius: 2,
              bgcolor: "white",
              minWidth: "100%",
              maxWidth: "100vw",
              maxHeight: 360,
              overflowY: "auto",
              color: "black !important",
              position: "absolute",
              left: 0,
              right: 0,
              zIndex: 20
            }}
          >
            <List sx={{ py: 0 }}>
              {draftEntries.map(([draftId, draft], idx) => (
                <Box key={draftId}>
                  <DraftOptionButton
                    draftId={draftId}
                    currentDraftId={currentDraftId}
                    onDraftChange={onDraftChange}
                    onClose={onClose}
                    deleteDraft={deleteDraft}
                    draft={draft}
                  />
                  {idx < draftEntries.length - 1 && (
                    <Divider sx={{ borderColor: theme.palette.grey[400] }} />
                  )}
                </Box>
              ))}
            </List>
          </Paper>
        )
      ) : (
        <Popper
          disablePortal
          open={open}
          anchorEl={anchorEl}
          transition
          sx={{ zIndex: 2 }}
          placement="bottom"
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={250}>
              <Paper
                elevation={4}
                sx={{
                  boxShadow: 1,
                  borderRadius: 2,
                  bgcolor: "white",
                  minWidth: 260,
                  maxWidth: 340,
                  maxHeight: 360,
                  overflowY: "auto",
                  color: "black !important"
                }}
              >
                <List sx={{ py: 0 }}>
                  {draftEntries.map(([draftId, draft], idx) => (
                    <Box key={draftId}>
                      <DraftOptionButton
                        draftId={draftId}
                        currentDraftId={currentDraftId}
                        onDraftChange={onDraftChange}
                        onClose={onClose}
                        deleteDraft={deleteDraft}
                        draft={draft}
                      />
                      {idx < draftEntries.length - 1 && (
                        <Divider
                          sx={{ borderColor: theme.palette.grey[400] }}
                        />
                      )}
                    </Box>
                  ))}
                </List>
              </Paper>
            </Fade>
          )}
        </Popper>
      )}
    </Box>
  );
};
