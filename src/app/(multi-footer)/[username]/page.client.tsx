"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, useMediaQuery } from "@mui/material";
import type {
  Reflection,
  ReflectionTagCountList
} from "@/src/api/reflection-api";
import type { ReflectionsCount } from "@/src/api/reflections-count-api";
import type { User } from "@prisma/client";
import ReflectionCardListArea from "@/src/components/reflection-list/card-list/ReflectionCardListArea";
import { EmptyReflection } from "@/src/components/reflection-list/card-list/empty-reflection";
import { GoodJobModal } from "@/src/components/reflection-list/modal";
import UserProfileArea from "@/src/components/reflection-list/profile/UserProfileArea";
import { PostNavigationButton } from "@/src/components/ui/shared/button";
import {
  ArrowPagination,
  NumberedPagination
} from "@/src/components/ui/shared/pagination";
import { SearchBar } from "@/src/components/ui/shared/search-bar";
import { usePagination } from "@/src/hooks/reflection/usePagination";
import { tagMap } from "@/src/hooks/reflection-tag/useExtractTrueTags";
import { useTagHandler } from "@/src/hooks/reflection-tag/useTagHandler";
import { theme } from "@/src/utils/theme";

type UserReflectionListPageProps = {
  currentUsername: User["username"];
  userImage: string;
  username: string;
  bio: string;
  reflectionCount: ReflectionsCount;
  reflections: Reflection[];
  currentPage: number;
  totalPage: number;
  tagCountList: ReflectionTagCountList;
};

const UserReflectionListPage: React.FC<UserReflectionListPageProps> = ({
  currentUsername,
  userImage,
  username,
  bio,
  reflectionCount,
  reflections,
  currentPage,
  totalPage,
  tagCountList
}) => {
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

  const isCurrentUser = currentUsername === username;
  const isModalOpen = searchParams.get("status") === "posted";
  const handleCloseModal = () => {
    router.push(`/${username}`);
  };

  // TODO: ReflectionAllAreaのようなコンポーネントを作ってリファクタする
  return (
    <>
      <Box minHeight={"90vh"}>
        <UserProfileArea
          userImage={userImage}
          username={username}
          bio={bio}
          reflectionCount={reflectionCount}
        />
        <SearchBar
          tags={Object.values(tagMap)}
          selectedTag={selectedTag}
          selectedTagCount={getSelectedTagCount(tagCountList, selectedTag)}
          isOpenTagList={isOpenTagList}
          onToggleTags={handleToggleTags}
          onTagChange={handleTagChange}
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
      <GoodJobModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default UserReflectionListPage;
