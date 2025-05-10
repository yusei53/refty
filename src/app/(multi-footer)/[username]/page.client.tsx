"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import type { ReflectionWithIncludeContent } from "@/src/app/_client/api/reflection-api";
import type { ReflectionsCount } from "@/src/app/_client/api/reflections-count-api";
import type { ViewMode } from "@/src/app/_client/hooks/tabs/useViewMode";
import { type Folder } from "@/src/app/_client/api/folder-api";
import {
  type RandomReflection,
  type Reflection,
  type ReflectionTagCountList
} from "@/src/app/_client/api/reflection-api";
import { PostNavigationButton } from "@/src/app/_client/components/button";
import {
  ArrowPagination,
  NumberedPagination
} from "@/src/app/_client/components/pagination";
import { EmptyReflection } from "@/src/app/_client/features/common/empty-reflection";
import { UserMenuHeaderContainer } from "@/src/app/_client/features/common/user-menu";
import ReflectionCardListArea from "@/src/app/_client/features/routes/reflection-list/card-list/ReflectionCardListArea";
import { FullViewReflectionListFetcher } from "@/src/app/_client/features/routes/reflection-list/full-view/FullViewReflectionListFetcher";
import {
  GoodJobModal,
  ReflectionDateModal
} from "@/src/app/_client/features/routes/reflection-list/modal";
import UserProfileArea from "@/src/app/_client/features/routes/reflection-list/profile/UserProfileArea";
import { SelectionHeader } from "@/src/app/_client/features/routes/reflection-list/selection-header/SelectionHeader";
import { Sidebar } from "@/src/app/_client/features/routes/reflection-list/sidebar";
import { FolderInitializer } from "@/src/app/_client/features/routes/reflection-list/sidebar/FolderInitializer";
import { TabsArea } from "@/src/app/_client/features/routes/reflection-list/tabs/TabsArea";
import { useFolderSelection } from "@/src/app/_client/hooks/folder/useFolderSelection";
import { usePagination } from "@/src/app/_client/hooks/reflection/usePagination";
import { useResponsive } from "@/src/app/_client/hooks/responsive/useResponsive";
import { useViewMode } from "@/src/app/_client/hooks/tabs/useViewMode";

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
  reflectionsByDate: RandomReflection[] | null;
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
  reflectionsByDate,
  folders,
  viewMode
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isGoodJobModalOpen = searchParams.get("status") === "posted";
  const isReflectionDateModalOpen = searchParams.get("reflectionDate") !== null;
  const isCurrentUser = currentUsername === username;
  // NOTE: viewModeがdetail、かつreflectionsの最初の要素がcontentプロパティを持っているかどうかのフラグ
  const isContentReady = viewMode === "detail" && "content" in reflections[0];

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
        {reflections.length >= 1 && (
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
      {isReflectionDateModalOpen && (
        <ReflectionDateModal
          open={isReflectionDateModalOpen}
          onClose={handleCloseModal}
          username={username}
          reflectionsByDate={reflectionsByDate}
        />
      )}
      {isGoodJobModalOpen && (
        <GoodJobModal
          open={isGoodJobModalOpen}
          onClose={handleCloseModal}
          username={username}
          randomReflection={randomReflection}
        />
      )}
    </>
  );
};

export default UserReflectionListPage;
