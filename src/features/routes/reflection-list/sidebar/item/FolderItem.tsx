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
  count: number;
};

export const FolderItem: React.FC<FolderItemProps> = ({
  initialFoldername,
  folderUUID,
  username,
  onSelectMode,
  isSelected,
  onSelect,
  count
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditFieldOpen, setIsEditFieldOpen] = useState(false);
  const [foldername, setFoldername] = useState(initialFoldername);

  const handleEditFolderName = async () => {
    const res = await folderAPI.updateFolder(username, folderUUID, foldername);
    if (res === 401) {
      return;
    }
    setIsEditFieldOpen(false);
  };

  const Content = (
    <>
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
        <ListItemText
          primary={foldername}
          primaryTypographyProps={{
            fontSize: 14,
            color: "black",
            noWrap: true,
            maxWidth: "120px"
          }}
          secondary={count.toString()}
          secondaryTypographyProps={{
            className: "secondary-text",
            sx: {
              opacity: 0,
              transition: "opacity 0.3s",
              color: theme.palette.grey[600],
              bgcolor: theme.palette.grey[400],
              fontSize: 12.5,
              width: 20,
              height: 20,
              borderRadius: "50%",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        />
      )}
    </>
  );

  return (
    <ListItem
      sx={{
        position: "relative",
        py: 0,
        my: 1,
        borderRadius: 2,
        height: 30,
        transition: "background-color 0.3s",
        backgroundColor: isSelected ? theme.palette.grey[200] : "transparent",
        "&:hover": {
          backgroundColor: theme.palette.grey[100],
          "& .hover-icons": { display: "flex" },
          "& .secondary-text": { opacity: 1 }
        }
      }}
    >
      {isEditFieldOpen ? (
        <Box display={"flex"} alignItems={"center"}>
          {Content}
        </Box>
      ) : (
        <Link
          href={`?folder=${folderUUID}`}
          onClick={() => onSelect(folderUUID)}
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            width: "100%"
          }}
        >
          {Content}
        </Link>
      )}
      <Box
        className="hover-icons"
        display={isPopupOpen ? "flex" : "none"}
        alignItems={"center"}
        gap={1}
        position={"absolute"}
        right={4}
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
