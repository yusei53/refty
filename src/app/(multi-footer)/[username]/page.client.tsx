"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, useMediaQuery } from "@mui/material";
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
import { PostNavigationButton } from "@/src/components/button";
import {
  ArrowPagination,
  NumberedPagination
} from "@/src/components/pagination";
import { EmptyReflection } from "@/src/features/common/empty-reflection";
import ReflectionCardListArea from "@/src/features/routes/reflection-list/card-list/ReflectionCardListArea";
import { GoodJobModal } from "@/src/features/routes/reflection-list/modal";
import UserProfileArea from "@/src/features/routes/reflection-list/profile/UserProfileArea";
import { SelectionHeader } from "@/src/features/routes/reflection-list/selection-header/SelectionHeader";
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
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedReflections, setSelectedReflections] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
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
    setIsSelectMode(true);
    setSelectedFolderUUID(folderUUID);
    const preSelected = reflections
      .filter((r) => r.folderUUID === folderUUID)
      .map((r) => r.reflectionCUID);
    setSelectedReflections(preSelected);
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
    setIsSelectMode(false);
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
    setIsSelectMode(false);
    setSelectedReflections([]);
    setIsLoading(false);
    router.push(`/${username}?folder=${selectedFolderUUID}`);
  };
  const isFolderSelected = foldersState.some(
    (f) => f.folderUUID === selectedFolderUUID
  );
  const disableAdd = selectedReflections.length === 0 || isLoading;

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
        <SelectionHeader
          selectedInfo={selectedInfo}
          isFolderSelected={isFolderSelected}
          isSelectMode={isSelectMode}
          isPCScreen={isPCScreen}
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
