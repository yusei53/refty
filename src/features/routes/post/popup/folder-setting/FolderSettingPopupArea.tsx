import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";
import { Box, Fade, Popper, Typography } from "@mui/material";
import type { Folder } from "@/src/api/folder-api";
import { NotFoundFolder } from "./NotFolder";
import { Button } from "@/src/components/button";
import { theme } from "@/src/utils/theme";
import { label } from "@/src/components/button/TagButton";

type FolderSettingPopupAreaProps = {
  selectedFolderUUID: string | null;
  setSelectedFolderUUID: (value: string | null) => void;
  folders: Folder[];
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onPopupOpen: (event: React.MouseEvent<HTMLElement>) => void;
};

export const FolderSettingPopupArea: React.FC<FolderSettingPopupAreaProps> = ({
  selectedFolderUUID,
  setSelectedFolderUUID,
  folders,
  open,
  anchorEl,
  onClose,
  onPopupOpen
}) => {
  const isFoldersEmpty = folders.length === 0;

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <Button
          onClick={onPopupOpen}
          sx={{
            mx: 0.5,
            bgcolor: theme.palette.primary.main,
            border: "#ededed solid 1px",
            borderRadius: 2,
            height: "30px",
            display: "flex",
            alignItems: "center",
            p: 1
          }}
        >
          <FolderIcon
            fontSize="small"
            sx={{
              color: theme.palette.grey[500],
              mr: 0.5
            }}
          />
          フォルダ
        </Button>
        {selectedFolderUUID ? (
          <Box display={"flex"} mx={0.4} zIndex={3}>
            <Box
              display={"flex"}
              alignItems={"center"}
              height={"30px"}
              sx={label}
            >
              {
                folders.find(
                  (folder) => folder.folderUUID === selectedFolderUUID
                )?.name
              }
              <CloseIcon
                sx={{
                  color: theme.palette.grey[500],
                  fontSize: 15,
                  ml: 0.5,
                  cursor: "pointer"
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFolderUUID(null);
                }}
              />
            </Box>
          </Box>
        ) : null}
      </Box>
      {/* TODO: disablePortal の動作を確認する */}
      <Popper open={open} anchorEl={anchorEl} transition sx={{ zIndex: 2 }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              px={1}
              py={isFoldersEmpty ? 0.5 : 1}
              maxWidth="250px"
              bgcolor="#f8fbff"
              border={`1px solid ${theme.palette.grey[400]}`}
              borderRadius={4}
            >
              {isFoldersEmpty ? (
                // TODO: ファイル名を変更する
                <NotFoundFolder />
              ) : (
                <>
                  <Typography
                    component={"span"}
                    sx={{ color: theme.palette.grey[500] }}
                    fontSize={12}
                    ml={folders.length === 1 ? 0 : 1}
                  >
                    1つ選択できます
                  </Typography>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    flexWrap={"wrap"}
                    gap={1}
                    mt={0.5}
                  >
                    {folders.map((folder) => (
                      <Button
                        key={folder.folderUUID}
                        onClick={() => {
                          setSelectedFolderUUID(folder.folderUUID);
                          onClose();
                        }}
                        sx={{
                          ...label,
                          textTransform: "none",
                          bgcolor:
                            selectedFolderUUID === folder.folderUUID
                              ? theme.palette.primary.main
                              : "white"
                        }}
                      >
                        {folder.name}
                      </Button>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};
