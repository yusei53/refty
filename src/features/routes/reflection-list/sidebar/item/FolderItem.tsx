import { useState } from "react";
import Link from "next/link";
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
  isSelected: boolean;
  onSelect: (folderUUID: string) => void;
};

export const FolderItem: React.FC<FolderItemProps> = ({
  initialFoldername,
  folderUUID,
  username,
  onSelectMode,
  isSelected,
  onSelect
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
      //refreshFoldersを呼ぶ（別ブランチのもの）
    }
  };

  return (
    <ListItem
      sx={{
        py: 0,
        my: 1,
        borderRadius: 2,
        transition: "background-color 0.3s",
        backgroundColor: isSelected ? theme.palette.grey[200] : "transparent",
        "&:hover": {
          backgroundColor: theme.palette.grey[100],
          "& .hover-icons": { display: "flex" }
        }
      }}
    >
      <Link
        href={`?folder=${folderUUID}`}
        onClick={() => {
          onSelect(folderUUID);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          width: "100%"
        }}
      >
        <ListItemIcon sx={{ minWidth: "27px" }}>
          <FolderIcon
            fontSize="small"
            sx={{ color: theme.palette.grey[500] }}
          />
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
          <ListItemText
            primary={foldername}
            primaryTypographyProps={{
              fontSize: 14.5,
              color: "black",
              noWrap: true,
              maxWidth: "120px"
            }}
          />
        )}
      </Link>
      <Box
        className="hover-icons"
        display={isPopupOpen ? "flex" : "none"}
        gap={1}
        alignItems="center"
      >
        <FolderKebabButtonPopupContainer
          onSelectMode={onSelectMode}
          onPopupChange={(open) => setIsPopupOpen(open)}
          folderUUID={folderUUID}
          username={username}
          setIsEditFieldOpen={setIsEditFieldOpen}
        />
      </Box>
    </ListItem>
  );
};
