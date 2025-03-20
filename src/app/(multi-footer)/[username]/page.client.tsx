"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, useMediaQuery } from "@mui/material";
import type { ReflectionsCount } from "@/src/api/reflections-count-api";
import type { User } from "@prisma/client";
import { type Folder } from "@/src/api/folder-api";
import {
  type RandomReflection,
  type Reflection,
  type ReflectionTagCountList
} from "@/src/api/reflection-api";
import { PostNavigationButton } from "@/src/components/button";
import {
  ArrowPagination,
  NumberedPagination
} from "@/src/components/pagination";
import { EmptyReflection } from "@/src/features/common/empty-reflection";
import { UserMenuHeaderContainer } from "@/src/features/common/user-menu";
import ReflectionCardListArea from "@/src/features/routes/reflection-list/card-list/ReflectionCardListArea";
import { GoodJobModal } from "@/src/features/routes/reflection-list/modal";
import UserProfileArea from "@/src/features/routes/reflection-list/profile/UserProfileArea";
import { SelectionHeader } from "@/src/features/routes/reflection-list/selection-header/SelectionHeader";
import { Sidebar } from "@/src/features/routes/reflection-list/sidebar";
import { FolderInitializer } from "@/src/features/routes/reflection-list/sidebar/FolderInitializer";
import { useFolderSelection } from "@/src/hooks/folder/useFolderSelection";
import { usePagination } from "@/src/hooks/reflection/usePagination";

type UserReflectionListPageProps = {
  currentUsername: User["username"];
  currentUserImage: string | undefined;
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
  currentUserImage,
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPWA = useMediaQuery("(display-mode: standalone)");
  const { handlePageChange } = usePagination();
  const {
    isSelectMode,
    selectedReflections,
    isFolderSelected,
    disableAdd,
    handleSelectMode,
    handleSelect,
    handleCancelSelectMode,
    handleAddReflectionToFolder,
    getSelectedInfo
  } = useFolderSelection(username);

  const isCurrentUser = currentUsername === username;
  // NOTE: 選択されたフォルダかタグの投稿数と名前を取得
  const selectedInfo = getSelectedInfo(tagCountList);

  const isModalOpen = searchParams.get("status") === "posted";
  const handleCloseModal = () => {
    router.push(`/${username}`);
  };

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
        <UserMenuHeaderContainer
          userImage={currentUserImage || ""}
          username={currentUsername}
        />
        <UserProfileArea
          userImage={userImage}
          username={username}
          bio={bio}
          website={website}
          reflectionCount={reflectionCount}
          isCurrentUser={isCurrentUser}
        />
        <SelectionHeader
          selectedInfo={selectedInfo}
          isFolderSelected={isFolderSelected}
          isSelectMode={isSelectMode}
          onCancel={handleCancelSelectMode}
          onAdd={handleAddReflectionToFolder}
          disableAdd={disableAdd}
        />
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
              isSelectMode={isSelectMode}
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
        {username && !isPWA && (
          <PostNavigationButton
            sx={{
              position: "fixed",
              right: { xs: 50, sm: 130 },
              bottom: { xs: 120, sm: 50 }
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
