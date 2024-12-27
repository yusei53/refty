"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, useMediaQuery } from "@mui/material";
import type { Reflection } from "@/src/api/reflection-api";
import type { ReflectionsCount } from "@/src/api/reflections-count-api";
import type { User } from "@prisma/client";
import ReflectionCardListArea from "@/src/components/reflection-list/card-list/ReflectionCardListArea";
import { GoodJobModal } from "@/src/components/reflection-list/modal";
import HaveNotPost from "@/src/components/reflection-list/no-post/HaveNotPost";
import UserProfileArea from "@/src/components/reflection-list/profile/UserProfileArea";
import { SearchBar } from "@/src/components/reflection-list/search-bar";
import { PostNavigationButton } from "@/src/components/ui/shared/button";
import {
  ArrowPagination,
  NumberedPagination
} from "@/src/components/ui/shared/pagination";
import { tagMap } from "@/src/hooks/reflection-tag/useExtractTrueTags";
import { theme } from "@/src/utils/theme";

type UserReflectionListPageProps = {
  currentUsername: User["username"];
  userImage: string;
  username: string;
  reflectionCount: ReflectionsCount;
  reflections: Reflection[];
  currentPage: number;
  totalPage: number;
  filteredReflectionCount: number;
};

const UserReflectionListPage: React.FC<UserReflectionListPageProps> = ({
  currentUsername,
  userImage,
  username,
  reflectionCount,
  reflections,
  currentPage,
  totalPage,
  filteredReflectionCount
}) => {
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const newParams = new URLSearchParams(searchParams.toString());

  const isCurrentUser = currentUsername === username;
  const isModalOpen = searchParams.get("status") === "posted";
  const handleCloseModal = () => {
    router.push(`/${username}`);
  };

  const handleToggleTags = () => {
    setShowTags((prev) => {
      if (prev) {
        setSelectedTag(null);
        newParams.delete("tag");
        router.push(`?${newParams.toString()}`);
      }
      return !prev;
    });
  };

  const createUpdatedParams = (tagKey: string): URLSearchParams => {
    const currentPageParams = searchParams.get("page");
    const currentTagParams = searchParams.get("tag");

    if (currentTagParams === tagKey) {
      newParams.delete("tag");
    } else {
      newParams.set("tag", tagKey);
    }

    if (currentPageParams) {
      newParams.delete("page");
    }

    return newParams;
  };

  const handleTagChange = (tag: string) => {
    const tagKey = Object.keys(tagMap).find(
      (key) => tagMap[key as keyof typeof tagMap] === tag
    );
    if (!tagKey) return;

    setSelectedTag((prev) => (prev === tag ? null : tag));

    const newParams = createUpdatedParams(tagKey);
    router.push(`?${newParams.toString()}`);
  };

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const currentTag = searchParams.get("tag");
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("page", value.toString());
    if (currentTag) {
      newParams.set("tag", currentTag);
    } else {
      newParams.delete("tag");
    }

    router.push(`?${newParams.toString()}`);
  };

  // TODO: ReflectionAllAreaのようなコンポーネントを作ってリファクタする
  return (
    <>
      <Box minHeight={"90vh"}>
        <UserProfileArea
          userImage={userImage}
          username={username}
          reflectionCount={reflectionCount}
        />
        <SearchBar
          tags={Object.values(tagMap)}
          selectedTag={selectedTag}
          count={filteredReflectionCount}
          showTags={showTags}
          onToggleTags={handleToggleTags}
          onTagChange={handleTagChange}
        />
        {reflections.length === 0 ? (
          <HaveNotPost />
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
