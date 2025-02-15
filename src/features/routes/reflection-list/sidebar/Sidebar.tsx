import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, List } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import type { ReflectionTagCountList } from "@/src/api/reflection-api";
import type { TagType } from "@/src/hooks/reflection-tag/useExtractTrueTags";
import { CreateFolderField } from "./CreateFolderField";
import { FolderItem, TagItem } from "./item";
import { tagMap } from "@/src/hooks/reflection-tag/useExtractTrueTags";
import { useFolderStore } from "@/src/utils/store/useFolderStore";
import { theme } from "@/src/utils/theme";

type SidebarProps = {
  username: string;
  tagCountList: ReflectionTagCountList;
  onSelectMode: (folderUUID: string) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  username,
  tagCountList,
  onSelectMode
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const folders = useFolderStore((state) => state.folders);
  const selectedFolderUUID = useFolderStore(
    (state) => state.selectedFolderUUID
  );
  const setSelectedFolderUUID = useFolderStore(
    (state) => state.setSelectedFolderUUID
  );
  const refreshFolders = useFolderStore((state) => state.refreshFolders);
  const updatedFolders = useFolderStore((state) => state.updateFolder);

  const handleFolderSelect = (folderUUID: string) => {
    setSelectedFolderUUID(folderUUID);
    if (isMobile) setSidebarOpen(false);
  };
  const handleTagSelect = (tagKey: string) => {
    setSelectedFolderUUID(tagKey);
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
                isSelected={selectedFolderUUID === folder.folderUUID}
                onRefetch={refreshFolders}
                onFolderUpdate={updatedFolders}
                setSelectedFolderUUID={setSelectedFolderUUID}
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
                isSelected={selectedFolderUUID === key}
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
