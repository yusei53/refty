"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, useMediaQuery } from "@mui/material";
import type { ReflectionsCount } from "@/src/api/reflections-count-api";
import type { User } from "@prisma/client";
import { type Folder } from "@/src/api/folder-api";
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
import { SearchBar } from "@/src/features/common/search-bar";
import ReflectionCardListArea from "@/src/features/routes/reflection-list/card-list/ReflectionCardListArea";
import { EmptyReflection } from "@/src/features/routes/reflection-list/card-list/empty-reflection";
import { GoodJobModal } from "@/src/features/routes/reflection-list/modal";
import UserProfileArea from "@/src/features/routes/reflection-list/profile/UserProfileArea";
import { Sidebar } from "@/src/features/routes/reflection-list/sidebar";
import { usePagination } from "@/src/hooks/reflection/usePagination";
import { tagMap } from "@/src/hooks/reflection-tag/useExtractTrueTags";
import { useTagHandler } from "@/src/hooks/reflection-tag/useTagHandler";
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
  const [selectedFolderUUID, setSelectedFolderUUID] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const isPCScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const {
    isOpenTagList,
    selectedTag,
    handleToggleTags,
    handleTagChange,
    getSelectedTagCount
  } = useTagHandler();
  const { handlePageChange } = usePagination();

  const handleSelectMode = (folderUUID: string) => {
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
    if (!selectedFolderUUID) {
      console.error("フォルダが選択されていません");
      return;
    }
    await reflectionAPI.bulkUpdateFolderReflection({
      reflectionCUID: selectedReflections,
      folderUUID: selectedFolderUUID,
      username
    });

    setIsSelectionMode(false);
    setSelectedReflections([]);
    setSelectedFolderUUID("");
    setIsLoading(false);
  };

  const isCurrentUser = currentUsername === username;
  const isModalOpen = searchParams.get("status") === "posted";
  const handleCloseModal = () => {
    router.push(`/${username}`);
  };

  // const handleCreateFolder = async () => {
  //   const folderName = prompt("新しいフォルダ名を入力してください"); // 直接入力
  //   if (!folderName) return;

  //   try {
  //     const result = await folderAPI.createFolder(username, folderName);
  //     if (result === 401) {
  //       alert("フォルダの作成に失敗しました");
  //     } else {
  //       alert("フォルダが作成されました");
  //       router.refresh();
  //     }
  //   } catch (error) {
  //     console.error("フォルダ作成エラー:", error);
  //     alert("エラーが発生しました");
  //   }
  // };

  return (
    <>
      <Box minHeight={"90vh"}>
        {isPCScreen && (
          <Sidebar folders={folders} onSelectMode={handleSelectMode} />
        )}
        <UserProfileArea
          userImage={userImage}
          username={username}
          bio={bio}
          website={website}
          reflectionCount={reflectionCount}
          isCurrentUser={isCurrentUser}
        />
        {!isPCScreen && (
          <SearchBar
            tags={Object.values(tagMap)}
            selectedTag={selectedTag}
            selectedTagCount={getSelectedTagCount(tagCountList, selectedTag)}
            isOpenTagList={isOpenTagList}
            onToggleTags={handleToggleTags}
            onTagChange={handleTagChange}
          />
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
