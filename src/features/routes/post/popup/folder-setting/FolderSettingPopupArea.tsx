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
  onToggle: (event: React.MouseEvent<HTMLElement>) => void;
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
            px: 0.5,
            cursor: "pointer"
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
                フォルダを選択してください
              </Typography>
              <Box
                display={"flex"}
                flexDirection={"row"}
                flexWrap={"wrap"}
                gap={1}
                mt={0.5}
              >
                {folders.map((folder) => (
                  // TODO: 後でリファクタする
                  <Button
                    key={folder.folderUUID}
                    onClick={() => {
                      setSelectedFolderUUID(folder.folderUUID);
                      onClose();
                    }}
                    sx={{
                      ...label
                    }}
                  >
                    <Typography fontSize={12} color={theme.palette.grey[600]}>
                      {folder.name}
                    </Typography>
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
