"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import type { ReflectionWithIncludeContent } from "@/src/api/reflection-api";
import type { ReflectionsCount } from "@/src/api/reflections-count-api";
import type { ViewMode } from "@/src/hooks/tabs/useViewMode";
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
import { FullViewReflectionListFetcher } from "@/src/features/routes/reflection-list/full-view/FullViewReflectionListFetcher";
import { GoodJobModal } from "@/src/features/routes/reflection-list/modal";
import UserProfileArea from "@/src/features/routes/reflection-list/profile/UserProfileArea";
import { SelectionHeader } from "@/src/features/routes/reflection-list/selection-header/SelectionHeader";
import { Sidebar } from "@/src/features/routes/reflection-list/sidebar";
import { FolderInitializer } from "@/src/features/routes/reflection-list/sidebar/FolderInitializer";
import { TabsArea } from "@/src/features/routes/reflection-list/tabs/TabsArea";
import { useFolderSelection } from "@/src/hooks/folder/useFolderSelection";
import { usePagination } from "@/src/hooks/reflection/usePagination";
import { useResponsive } from "@/src/hooks/responsive/useResponsive";
import { useViewMode } from "@/src/hooks/tabs/useViewMode";

type UserReflectionListPageProps = {
  currentUsername: string | null;
  currentUserImage: string | null;
  userImage: string;
  username: string;
  bio: string;
  website: string;
  reflectionCount: ReflectionsCount;
  reflections: (Reflection | ReflectionWithIncludeContent)[];
  currentPage: number;
  totalPage: number;
  tagCountList: ReflectionTagCountList;
  randomReflection: RandomReflection | null;
  folders: Folder[];
  viewMode: ViewMode;
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
  folders,
  viewMode
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { isMobile, isPWA } = useResponsive();
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
  const { currentViewMode, handleViewModeChange } = useViewMode();

  const isModalOpen = searchParams.get("status") === "posted";
  const isCurrentUser = currentUsername === username;

  // NOTE: viewModeがdetail、かつreflectionsの最初の要素がcontentプロパティを持っているかどうかのフラグ
  const isContentReady = viewMode === "detail" && "content" in reflections[0];

  // NOTE: 選択されたフォルダかタグの投稿数と名前を取得
  const selectedInfo = getSelectedInfo(tagCountList);

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
        {!isMobile && (
          <UserMenuHeaderContainer
            userImage={currentUserImage}
            username={currentUsername}
          />
        )}
        <UserProfileArea
          userImage={userImage}
          username={username}
          bio={bio}
          website={website}
          reflectionCount={reflectionCount}
          isCurrentUser={isCurrentUser}
        />
        {reflections.length >= 1 && !isMobile && (
          <TabsArea
            currentViewMode={currentViewMode}
            onViewModeChange={handleViewModeChange}
          />
        )}
        <SelectionHeader
          selectedInfo={selectedInfo}
          isFolderSelected={isFolderSelected}
          isSelectMode={isSelectMode}
          onCancel={handleCancelSelectMode}
          onAdd={handleAddReflectionToFolder}
          disableAdd={disableAdd}
        />
        {reflections.length >= 1 ? (
          <>
            {currentViewMode === "card" ? (
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
            ) : (
              <FullViewReflectionListFetcher
                reflections={reflections as ReflectionWithIncludeContent[]}
                isReady={isContentReady}
                username={username}
                userImage={userImage}
              />
            )}
          </>
        ) : (
          <EmptyReflection />
        )}
        {username && !isPWA && <PostNavigationButton />}
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
