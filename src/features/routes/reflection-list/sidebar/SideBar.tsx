import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, List } from "@mui/material";
import type { Folder } from "@/src/api/folder-api";
import { FolderItem, TagItem } from "./item";
import { theme } from "@/src/utils/theme";
import { tagMap, TagType } from "@/src/hooks/reflection-tag/useExtractTrueTags";
import type { ReflectionTagCountList } from "@/src/api/reflection-api"; // 仮のパス

type SidebarProps = {
  folders: Folder[];
  onSelectMode: (folderUUID: string) => void;
  tagCountList: ReflectionTagCountList;
};

export const Sidebar: React.FC<SidebarProps> = ({
  folders,
  onSelectMode,
  tagCountList
}) => {
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
            {Object.entries(tagMap).map(([key, label]) => (
              <TagItem
                tagKey={key as keyof TagType}
                tagname={label}
                key={key}
                isSelected={selectedFolderUUID === key}
                onSelect={setSelectedFolderUUID}
                count={tagCountList[key as keyof ReflectionTagCountList] || 0} // CountTagList を適用
              />
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};
