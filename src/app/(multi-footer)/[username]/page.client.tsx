"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, useMediaQuery } from "@mui/material";
import type { Folder } from "@/src/api/folder-api";
import type {
  RandomReflection,
  Reflection,
  ReflectionTagCountList
} from "@/src/api/reflection-api";
import type { ReflectionsCount } from "@/src/api/reflections-count-api";
import type { User } from "@prisma/client";
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
import SideBar from "@/src/features/routes/reflection-list/side-folder-bar/SideBar";
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
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedReflections, setSelectedReflections] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const {
    isOpenTagList,
    selectedTag,
    handleToggleTags,
    handleTagChange,
    getSelectedTagCount
  } = useTagHandler();
  const { handlePageChange } = usePagination();
  const handleSelectMode = () => {
    setIsSelectionMode((prev) => !prev);
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

  const onCancelSelectMode = () => {
    setIsSelectionMode(false);
    setSelectedReflections([]);
  };

  const onAddSelected = () => {
    setIsSelectionMode(false);
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
        <SideBar
          onSelectMode={handleSelectMode}
          username={username}
          folders={folders}
        />
        <UserProfileArea
          userImage={userImage}
          username={username}
          bio={bio}
          website={website}
          reflectionCount={reflectionCount}
          isCurrentUser={isCurrentUser}
        />
        <Box display={"flex"} justifyContent={"space-between"}>
          <SearchBar
            tags={Object.values(tagMap)}
            selectedTag={selectedTag}
            selectedTagCount={getSelectedTagCount(tagCountList, selectedTag)}
            isOpenTagList={isOpenTagList}
            onToggleTags={handleToggleTags}
            onTagChange={handleTagChange}
          />
          {isSelectionMode && (
            <Box>
              <Button
                sx={{
                  ...label
                }}
                onClick={onCancelSelectMode}
              >
                キャンセル
              </Button>
              <Button
                sx={{
                  ...label,
                  color: theme.palette.primary.light
                }}
                onClick={onAddSelected}
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

export const label = {
  fontSize: 13.8,
  p: "4px 7px",
  letterSpacing: 0.8,
  borderRadius: 2,
  border: "1px solid #DCDFE3",
  backgroundColor: "white"
};
