import { Fragment } from "react";
import { Box, Popper, Fade, Divider, Typography } from "@mui/material";
import type { DraftDataList } from "../../../../../hooks/reflection/useAutoSave";
import { DraftOptionButton } from "./DraftOptionButton";
import { Button } from "@/src/app/_client/components/button";
import { useResponsive } from "@/src/app/_client/hooks/responsive/useResponsive";
import { theme } from "@/src/app/_client/utils/theme";

type DraftPopupAreaProps = {
  draftList: DraftDataList;
  currentDraftId: string;
  open: boolean;
  anchorEl: HTMLElement | null;
  onDraftChange: (draftId: string) => void;
  deleteDraft: (draftId: string) => void;
  onToggle: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
};

export const DraftPopupArea: React.FC<DraftPopupAreaProps> = ({
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
    return null;
  }

  return (
    <Box>
      <Button
        onClick={onToggle}
        onBlur={onClose}
        sx={isMobile ? mobileButton : { border: "none" }}
        data-testid="draft-list"
      >
        下書き一覧
      </Button>
      <Popper
        disablePortal
        open={open}
        anchorEl={anchorEl}
        transition
        sx={{ zIndex: 1 }}
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              boxShadow={1}
              borderRadius={2}
              bgcolor={"white"}
              minWidth={"220px"}
              width={"100%"}
              maxHeight={"300px"}
              color={"black !important"}
            >
              {draftEntries.map(([draftId, draft], idx) => (
                <Fragment key={draftId}>
                  <DraftOptionButton
                    draftId={draftId}
                    currentDraftId={currentDraftId}
                    onDraftChange={onDraftChange}
                    deleteDraft={deleteDraft}
                    draft={draft}
                  />
                  {idx < draftEntries.length - 1 && (
                    <Divider sx={{ borderColor: theme.palette.grey[400] }} />
                  )}
                </Fragment>
              ))}
              <Typography
                fontSize={11.5}
                color={theme.palette.grey[600]}
                py={0.5}
                px={1}
                pl={2}
                bgcolor={theme.palette.primary.contrastText}
                borderRadius={"0 0 8px 8px"}
              >
                下書きは自動で保存されます
              </Typography>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

const mobileButton = {
  mx: 0.5,
  bgcolor: theme.palette.primary.main,
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: 2,
  height: "30px",
  display: "flex",
  alignItems: "center",
  p: 1
};
