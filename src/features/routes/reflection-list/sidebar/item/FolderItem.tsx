import { useState } from "react";
import Image from "next/image";
import FolderIcon from "@mui/icons-material/Folder";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField
} from "@mui/material";
import { FolderKebabButtonPopupContainer } from "../kebab-button/FolderKebabMenuButtonContainer";
import { folderAPI } from "@/src/api/folder-api";
import { theme } from "@/src/utils/theme";

type FolderItemProps = {
  initialFoldername: string;
  folderUUID: string;
  username: string;
  onSelectMode: () => void;
};

export const FolderItem: React.FC<FolderItemProps> = ({
  initialFoldername,
  folderUUID,
  username,
  onSelectMode
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  //カスタムフックに切り出したいが、名前が別ブランチと被りそうなので一旦べた書き
  const [isEditFieldOpen, setIsEditFieldOpen] = useState(false);
  const [foldername, setFoldername] = useState(initialFoldername);

  const handleEditFolderName = async () => {
    const res = await folderAPI.updateFolder(username, folderUUID, foldername);
    if (res === 401) {
      return;
    } else {
      setIsEditFieldOpen(false);
    }
  };

  return (
    <ListItem
      sx={{
        py: 0,
        my: 1,
        borderRadius: 2,
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: theme.palette.grey[100],
          "& .hover-icons": { display: "flex" }
        }
      }}
    >
      <ListItemIcon sx={{ minWidth: "27px" }}>
        <FolderIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
      </ListItemIcon>
      {isEditFieldOpen ? (
        <TextField
          value={foldername}
          onChange={(e) => setFoldername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEditFolderName();
            }
          }}
          onBlur={handleEditFolderName}
          size="small"
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              py: 0.5,
              px: 1,
              fontSize: 14.5
            }
          }}
        />
      ) : (
        <>
          <ListItemText
            primary={foldername}
            primaryTypographyProps={{ fontSize: 14.5 }}
          />
          <Box
            className="hover-icons"
            display={isPopupOpen ? "flex" : "none"}
            gap={1}
            alignItems="center"
          >
            <FolderKebabButtonPopupContainer
              folderUUID={folderUUID}
              username={username}
              setIsEditFieldOpen={setIsEditFieldOpen}
              onSelectMode={onSelectMode}
              onPopupChange={(open) => setIsPopupOpen(open)}
            />
            <Image
              src={"/book.svg"}
              alt={"ブックアイコン"}
              width={22}
              height={22}
            />
          </Box>
        </>
      )}
    </ListItem>
  );
};
