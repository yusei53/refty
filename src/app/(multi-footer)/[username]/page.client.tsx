"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FolderIcon from "@mui/icons-material/Folder";
import TagIcon from "@mui/icons-material/Tag";
import { Box, Typography, useMediaQuery } from "@mui/material";
import type { ReflectionsCount } from "@/src/api/reflections-count-api";
import type { TagType } from "@/src/hooks/reflection-tag/useExtractTrueTags";
import type { User } from "@prisma/client";
import { folderAPI, type Folder } from "@/src/api/folder-api";
import {
  reflectionAPI,
  type RandomReflection,
  type Reflection,
  type ReflectionTagCountList
} from "@/src/api/reflection-api";
import { Button, PostNavigationButton } from "@/src/components/button";
import {
  ArrowPagination,
  NumberedPagination
} from "@/src/components/pagination";
import { EmptyReflection } from "@/src/features/common/empty-reflection";
import ReflectionCardListArea from "@/src/features/routes/reflection-list/card-list/ReflectionCardListArea";
import { GoodJobModal } from "@/src/features/routes/reflection-list/modal";
import UserProfileArea from "@/src/features/routes/reflection-list/profile/UserProfileArea";
import { Sidebar } from "@/src/features/routes/reflection-list/sidebar";
import { FolderInitializer } from "@/src/features/routes/reflection-list/sidebar/FolderInitializer";
import { usePagination } from "@/src/hooks/reflection/usePagination";
import { tagMap } from "@/src/hooks/reflection-tag/useExtractTrueTags";
import { useFolderStore } from "@/src/utils/store/useFolderStore";
import { theme } from "@/src/utils/theme";

type UserReflectionListPageProps = {
  currentUsername: User["username"];
  userImage: string;
  username: string;
  bio: string;
  website: string;
  reflectionCount: ReflectionsCount;
  reflections: Reflection[];
  currentPage: number;
  totalPage: number;
  tagCountList: ReflectionTagCountList;
  randomReflection: RandomReflection | null;
  folders: Folder[];
};

const UserReflectionListPage: React.FC<UserReflectionListPageProps> = ({
  currentUsername,
  userImage,
  username,
  bio,
  website,
  reflectionCount,
  reflections,
  currentPage,
  totalPage,
  tagCountList,
  randomReflection,
  folders
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedReflections, setSelectedReflections] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  // TODO: 別ブランチでも分割したからisPCScreenは消せる
  const isPCScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const { handlePageChange } = usePagination();

  const foldersState = useFolderStore((state) => state.folders);
  const selectedFolderUUID = useFolderStore(
    (state) => state.selectedFolderUUID
  );
  const setFolders = useFolderStore((state) => state.setFolders);
  const setSelectedFolderUUID = useFolderStore(
    (state) => state.setSelectedFolderUUID
  );

  const handleSelectMode = (folderUUID: string) => {
    router.push(pathname);
    setIsSelectionMode(true);
    setSelectedFolderUUID(folderUUID);
  };

  const handleSelect = (reflectionCUID: string) => {
    setSelectedReflections((prev) => {
      if (prev.includes(reflectionCUID)) {
        return prev.filter((id) => id !== reflectionCUID);
      } else {
        return [...prev, reflectionCUID];
      }
    });
  };

  const handleCancelSelectMode = () => {
    setIsSelectionMode(false);
    setSelectedReflections([]);
    setSelectedFolderUUID("");
  };

  const handleAddReflectionToFolder = async () => {
    setIsLoading(true);

    await reflectionAPI.bulkUpdateFolderReflection({
      reflectionCUID: selectedReflections,
      folderUUID: selectedFolderUUID,
      username
    });
    const updatedFolders = await folderAPI.getFolder(username);
    if (updatedFolders === 404) {
      return router.refresh();
    }

    setFolders(updatedFolders);
    setIsSelectionMode(false);
    setSelectedReflections([]);
    setIsLoading(false);
    router.push(`/${username}?folder=${selectedFolderUUID}`);
  };

  const isCurrentUser = currentUsername === username;
  const isModalOpen = searchParams.get("status") === "posted";
  const handleCloseModal = () => {
    router.push(`/${username}`);
  };

  let selectedInfo: { name: string; count: number } | null = null;
  if (selectedFolderUUID !== "") {
    const folder = foldersState.find(
      (f) => f.folderUUID === selectedFolderUUID
    );
    if (folder) {
      selectedInfo = {
        name: folder.name,
        count: folder.countByFolder || 0
      };
    } else if (tagMap[selectedFolderUUID as keyof TagType]) {
      selectedInfo = {
        name: tagMap[selectedFolderUUID as keyof TagType],
        count:
          tagCountList[selectedFolderUUID as keyof ReflectionTagCountList] || 0
      };
    }
  }

  return (
    <>
      <Box minHeight={"90vh"}>
        {isCurrentUser && (
          <>
            <FolderInitializer folders={folders} />
            <Sidebar
              username={username}
              onSelectMode={handleSelectMode}
              tagCountList={tagCountList}
            />
          </>
        )}
        <UserProfileArea
          userImage={userImage}
          username={username}
          bio={bio}
          website={website}
          reflectionCount={reflectionCount}
          isCurrentUser={isCurrentUser}
        />
        <Box
          height={32}
          mx={3}
          my={1}
          letterSpacing={0.8}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {selectedInfo && (
            <Box display={"flex"} alignItems={"center"}>
              {foldersState.some((f) => f.folderUUID === selectedFolderUUID) ? (
                <FolderIcon
                  fontSize="small"
                  sx={{ color: theme.palette.grey[500], mr: "4px" }}
                />
              ) : (
                <TagIcon
                  fontSize="small"
                  sx={{ color: theme.palette.grey[500], mr: "4px" }}
                />
              )}
              <Typography component={"span"} fontWeight={550}>
                {selectedInfo.name}
              </Typography>
              <Typography>{`　${selectedInfo.count}件`}</Typography>
            </Box>
          )}
          {isSelectionMode && isPCScreen && (
            <Box display={"flex"} justifyContent={"right"} gap={1}>
              <Button sx={button} onClick={handleCancelSelectMode}>
                キャンセル
              </Button>
              <Button
                sx={{ ...button, color: theme.palette.primary.light }}
                onClick={handleAddReflectionToFolder}
                disabled={selectedFolderUUID.length === 0 || isLoading}
              >
                追加
              </Button>
            </Box>
          )}
        </Box>
        {reflections.length === 0 ? (
          <EmptyReflection />
        ) : (
          <>
            <ArrowPagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChange={handlePageChange}
            />
            <ReflectionCardListArea
              username={username}
              reflections={reflections}
              isCurrentUser={isCurrentUser}
              isSelectMode={isSelectionMode}
              isSelected={(reflectionCUID) =>
                selectedReflections.includes(reflectionCUID)
              }
              onSelect={handleSelect}
            />
            <NumberedPagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChange={handlePageChange}
            />
          </>
        )}
        {username && isLargeScreen && (
          <PostNavigationButton
            sx={{
              position: "fixed",
              right: { sm: 130 },
              bottom: { sm: 50 }
            }}
          />
        )}
      </Box>
      {isModalOpen && (
        <GoodJobModal
          open={isModalOpen}
          onClose={handleCloseModal}
          username={username}
          randomReflection={randomReflection}
        />
      )}
    </>
  );
};

export default UserReflectionListPage;

const button = {
  fontSize: 13.5,
  p: "3px 6px",
  letterSpacing: 0.8,
  borderRadius: 2,
  border: "1px solid #DCDFE3",
  backgroundColor: "white"
};
