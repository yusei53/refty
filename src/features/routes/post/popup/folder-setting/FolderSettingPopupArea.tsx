import { Box, Fade, Popper, Typography } from "@mui/material";
import type { Folder } from "@/src/api/folder-api";
import { Button } from "@/src/components/button";
import { theme } from "@/src/utils/theme";

type FolderSettingPopupAreaProps = {
  selectedFolderUUID: string | null;
  setSelectedFolderUUID: (value: string | null) => void;
  folders: Folder[];
  open: boolean;
  anchorEl: HTMLElement | null;
  onToggle: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  onPopupOpen: (event: React.MouseEvent<HTMLElement>) => void;
};

export const FolderSettingPopupArea: React.FC<FolderSettingPopupAreaProps> = ({
  selectedFolderUUID,
  setSelectedFolderUUID,
  folders,
  open,
  anchorEl,
  onToggle,
  onClose,
  onPopupOpen
}) => {
  return (
    <>
      <Box display="flex" alignItems="center">
        <Button
          onClick={onPopupOpen}
          sx={{
            mr: 0.5,
            bgcolor: theme.palette.primary.main,
            border: "#ededed solid 1px",
            borderRadius: 2,
            height: "30px",
            p: 0,
            cursor: "pointer"
          }}
        >
          {/* <TagIcon sx={{ color: theme.palette.grey[500], fontSize: 18 }} /> */}
          フォルダ
        </Button>
        <Typography>
          {selectedFolderUUID ? (
            folders.find((folder) => folder.folderUUID === selectedFolderUUID)
              ?.name
          ) : (
            <></>
          )}
        </Typography>
      </Box>
      <Popper open={open} anchorEl={anchorEl} transition sx={{ zIndex: 2 }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box boxShadow={1} borderRadius={2} bgcolor={"white"}>
              {folders.map((folder) => (
                <Button
                  key={folder.folderUUID}
                  onClick={() => {
                    setSelectedFolderUUID(folder.folderUUID);
                    onClose();
                  }}
                  sx={{
                    border: "none",
                    display: "block",
                    textAlign: "left",
                    width: "100%",
                    borderRadius: "none",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.contrastText
                    }
                  }}
                >
                  <Typography fontSize={12} color={theme.palette.grey[600]}>
                    {folder.name}
                  </Typography>
                </Button>
              ))}
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};
