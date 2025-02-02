import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, List } from "@mui/material";
import type { Folder } from "@/src/api/folder-api";
import { TAGS } from "../../post/popup/select-tag/SelectTagPopup";
import { FolderItem, TagItem } from "./item";
import { theme } from "@/src/utils/theme";

type SidebarProps = {
  folders: Folder[];
  onSelectMode: (folderUUID: string) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ folders, onSelectMode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFolderUUID, setSelectedFolderUUID] = useState<string | null>(
    null
  );

  return (
    <>
      <IconButton
        disableRipple
        onClick={() => setSidebarOpen((prev) => !prev)}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 10
        }}
      >
        <MenuIcon sx={{ color: theme.palette.grey[500] }} />
      </IconButton>
      <Box
        position={"fixed"}
        top={0}
        left={isSidebarOpen ? 0 : "-250px"}
        width={"240px"}
        height={"100vh"}
        borderRight={`1px solid ${theme.palette.grey[400]}`}
        px={1.2}
        sx={{
          transition: "left 0.3s ease-in-out",
          backgroundColor: "white"
        }}
      >
        <Box my={10}>
          <List>
            {folders.map((folder) => (
              <FolderItem
                key={folder.folderUUID}
                folderUUID={folder.folderUUID}
                foldername={folder.name}
                isSelected={selectedFolderUUID === folder.folderUUID}
                onSelectMode={() => onSelectMode(folder.folderUUID)}
                onSelect={setSelectedFolderUUID}
              />
            ))}
          </List>
          <List>
            {TAGS.map((tag) => (
              <TagItem tagname={tag} key={tag} />
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};
