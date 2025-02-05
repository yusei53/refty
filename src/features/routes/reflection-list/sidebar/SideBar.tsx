import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, List } from "@mui/material";
import type { Folder } from "@/src/api/folder-api";
import type { ReflectionTagCountList } from "@/src/api/reflection-api";
import type { TagType } from "@/src/hooks/reflection-tag/useExtractTrueTags";
import { NewFolderField } from "../side-folder-bar/NewFolderField";
import { FolderItem, TagItem } from "./item";
import { tagMap } from "@/src/hooks/reflection-tag/useExtractTrueTags";
import { useFolder } from "@/src/hooks/sidebar/folder/useFolder";
import { theme } from "@/src/utils/theme";

type SidebarProps = {
  initialFolders: Folder[];
  tagCountList: ReflectionTagCountList;
  username: string;
  onSelectMode: (folderUUID: string) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  initialFolders,
  tagCountList,
  username,
  onSelectMode
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFolderUUID, setSelectedFolderUUID] = useState<string | null>(
    null
  );

  const { folders, refreshFolders } = useFolder({
    initialFolders,
    username
  });

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
                initialFoldername={folder.name}
                folderUUID={folder.folderUUID}
                count={folder.countByFolder}
                username={username}
                onSelectMode={() => onSelectMode(folder.folderUUID)}
                onSelect={setSelectedFolderUUID}
                isSelected={selectedFolderUUID === folder.folderUUID}
              />
            ))}
          </List>
          <NewFolderField
            username={username}
            onFolderCreated={refreshFolders}
          />
          <List>
            {Object.entries(tagMap).map(([key, label]) => (
              <TagItem
                tagKey={key as keyof TagType}
                tagname={label}
                key={key}
                isSelected={selectedFolderUUID === key}
                onSelect={setSelectedFolderUUID}
                count={tagCountList[key as keyof ReflectionTagCountList] || 0}
              />
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};
