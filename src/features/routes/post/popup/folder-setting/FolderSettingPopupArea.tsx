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
};

export const FolderSettingPopupArea: React.FC<FolderSettingPopupAreaProps> = ({
  selectedFolderUUID,
  setSelectedFolderUUID,
  folders,
  open,
  anchorEl,
  onToggle,
  onClose
}) => {
  return (
    <>
      <Button
        onClick={onToggle}
        onBlur={onClose}
        sx={{
          width: "90px",
          border: "none",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap"
        }}
      >
        {/* <Image
          src={value ? "/unlock.png" : "/lock.png"}
          alt={value ? "非公開アイコン" : "公開アイコン"}
          width={18}
          height={18}
          style={{ marginRight: 4 }}
        /> */}
        {selectedFolderUUID
          ? folders.find((folder) => folder.folderUUID === selectedFolderUUID)
              ?.name
          : "フォルダを選択"}
      </Button>
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
              {/* <PublishStatusOptionButton
                isActive={value}
                onClick={() => {
                  onChange(true);
                  onClose();
                }}
                icon="/unlock.png"
                text="公開"
                description="他の人も見えるようになります"
              />
              <Divider sx={{ borderColor: theme.palette.grey[400] }} />
              <PublishStatusOptionButton
                isActive={!value}
                onClick={() => {
                  onChange(false);
                  onClose();
                }}
                icon="/lock.png"
                text="非公開"
                description="自分だけが見えるようになります"
              /> */}
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};
