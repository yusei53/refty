import CloseIcon from "@mui/icons-material/Close";
import FolderIcon from "@mui/icons-material/Folder";
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
  onClose: () => void;
  onPopupOpen: (event: React.MouseEvent<HTMLElement>) => void;
};

export const label = {
  fontSize: 13.8,
  p: "4px 7px",
  letterSpacing: 0.8,
  borderRadius: 2,
  border: "1px solid #DCDFE3",
  backgroundColor: "white"
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
      <Box display="flex" alignItems="center">
        <Button
          onClick={onPopupOpen}
          sx={{
            bgcolor: theme.palette.primary.main,
            border: "#ededed solid 1px",
            borderRadius: 2,
            height: "30px",
            cursor: "pointer",
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
      <Popper open={open} anchorEl={anchorEl} transition sx={{ zIndex: 2 }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <Box
              p={1}
              maxWidth="250px"
              bgcolor="#f8fbff"
              border={`1px solid ${theme.palette.grey[400]}`}
              borderRadius={4}
            >
              <Typography
                component={"span"}
                sx={{ color: theme.palette.grey[500] }}
                fontSize={12}
                ml={1}
              >
                {isFoldersEmpty ? "フォルダがありません" : "1つ選択できます"}
              </Typography>
              <Box
                display={"flex"}
                flexDirection={"row"}
                flexWrap={"wrap"}
                gap={1}
                mt={0.5}
              >
                {!isFoldersEmpty &&
                  folders.map((folder) => (
                    // TODO: 後でリファクタする
                    <Button
                      key={folder.folderUUID}
                      onClick={() => {
                        setSelectedFolderUUID(folder.folderUUID);
                        onClose();
                      }}
                      sx={{
                        ...label,
                        bgcolor:
                          selectedFolderUUID === folder.folderUUID
                            ? theme.palette.primary.main
                            : "white"
                      }}
                    >
                      <Typography fontSize={12}>{folder.name}</Typography>
                    </Button>
                  ))}
              </Box>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};
