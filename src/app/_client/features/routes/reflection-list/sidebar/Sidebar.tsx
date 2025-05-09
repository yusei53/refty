import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, List, useMediaQuery } from "@mui/material";
import type { ReflectionTagCountList } from "@/src/app/_client/api/reflection-api";
import type { TagType } from "@/src/app/_client/hooks/reflection-tag/useExtractTrueTags";
import { CreateFolderField } from "./CreateFolderField";
import { FolderItem, TagItem } from "./item";
import { tagMap } from "@/src/app/_client/hooks/reflection-tag/useExtractTrueTags";
import { useFolderStore } from "@/src/app/_client/utils/store/useFolderStore";
import { theme } from "@/src/app/_client/utils/theme";

type SidebarProps = {
  username: string;
  tagCountList: ReflectionTagCountList;
  onSelectMode: (folderUUID: string) => Promise<void>;
};

export const Sidebar: React.FC<SidebarProps> = ({
  username,
  tagCountList,
  onSelectMode
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const folders = useFolderStore((state) => state.folders);
  const selectedInfo = useFolderStore((state) => state.selectedInfo);
  const setSelectedInfo = useFolderStore((state) => state.setSelectedInfo);
  const refreshFolders = useFolderStore((state) => state.refreshFolders);
  const updatedFolders = useFolderStore((state) => state.updateFolder);

  const handleFolderSelect = (folderUUID: string) => {
    if (selectedInfo === folderUUID) {
      setSelectedInfo("");
    } else {
      setSelectedInfo(folderUUID);
    }
    if (isMobile) setSidebarOpen(false);
  };

  const handleTagSelect = (tagKey: string) => {
    if (selectedInfo === tagKey) {
      setSelectedInfo("");
    } else {
      setSelectedInfo(tagKey);
    }
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <>
      <IconButton
        disableRipple
        onClick={() => setSidebarOpen((prev) => !prev)}
        sx={{
          position: isMobile ? "absolute" : "fixed",
          top: isMobile ? 10 : 16,
          left: isMobile ? 10 : 16,
          zIndex: 11
        }}
      >
        {isSidebarOpen ? (
          <CloseIcon sx={{ color: theme.palette.grey[500] }} />
        ) : (
          <MenuIcon sx={{ color: theme.palette.grey[500] }} />
        )}
      </IconButton>
      {isMobile && isSidebarOpen && (
        <Box
          position={"fixed"}
          top={0}
          left={0}
          width={"100vw"}
          height={"100vh"}
          bgcolor={"rgba(0,0,0,0.2)"}
          zIndex={10}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Box
        position={"fixed"}
        top={0}
        left={isSidebarOpen ? 0 : isMobile ? "-80vw" : "-250px"}
        width={"240px"}
        height={"100vh"}
        borderRight={`1px solid ${theme.palette.grey[400]}`}
        px={1.2}
        bgcolor={"white"}
        zIndex={10}
        sx={{
          transition: "left 0.3s ease-in-out"
        }}
      >
        <Box my={8}>
          <List>
            {folders.map((folder) => (
              <FolderItem
                key={folder.folderUUID}
                initialFoldername={folder.name}
                folderUUID={folder.folderUUID}
                count={folder.countByFolder}
                username={username}
                onSelectMode={() => onSelectMode(folder.folderUUID)}
                onCloseSidebar={() => setSidebarOpen(false)} // TODO: バケツリレーしすぎなのでzustandに移行してもいいかも
                onSelect={() => handleFolderSelect(folder.folderUUID)}
                isSelected={selectedInfo === folder.folderUUID}
                onRefetch={refreshFolders}
                onFolderUpdate={updatedFolders}
                setSelectedFolderUUID={setSelectedInfo}
              />
            ))}
            <CreateFolderField username={username} onRefetch={refreshFolders} />
          </List>
          <List>
            {Object.entries(tagMap).map(([key, label]) => (
              <TagItem
                tagKey={key as keyof TagType}
                tagname={label}
                key={key}
                isSelected={selectedInfo === key}
                onSelect={() => handleTagSelect(key)}
                count={tagCountList[key as keyof ReflectionTagCountList] || 0}
              />
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};
