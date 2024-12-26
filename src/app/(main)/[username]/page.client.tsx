"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
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

type UserReflectionListPageProps = {
  currentUsername: User["username"];
  userImage: string;
  username: string;
  reflectionCount: ReflectionsCount;
  reflections: Reflection[];
  currentPage: number;
  totalPage: number;
};

const UserReflectionListPage: React.FC<UserReflectionListPageProps> = ({
  currentUsername,
  userImage,
  username,
  reflectionCount,
  reflections,
  currentPage,
  totalPage
}) => {
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleToggleTags = () => setShowTags((prev) => !prev);

  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
    const tagKey = Object.keys(tagMap).find(
      (key) => tagMap[key as keyof typeof tagMap] === tag
    );

    if (tagKey) {
      const currentPageParams = searchParams.get("page");
      const currentTagParams = searchParams.get("tag");

      const newTag = currentTagParams === tagKey ? null : tagKey;
      const newParams = new URLSearchParams(searchParams.toString());

      if (newTag) {
        newParams.set("tag", newTag);
      } else {
        newParams.delete("tag");
      }
      if (currentPageParams) {
        newParams.delete("page");
      }
      router.push(`?${newParams.toString()}`);
    }
  };

  const isModalOpen = searchParams.get("status") === "posted";

  const handleCloseModal = () => {
    router.push(`/${username}`);
  };

  const isCurrentUser = currentUsername === username;

  const handleChange = async (
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
    <Box mb={{ xs: -1, sm: 0 }}>
      <UserProfileArea
        userImage={userImage}
        username={username}
        reflectionCount={reflectionCount}
      />
      <SearchBar
        tags={Object.values(tagMap)}
        selectedTag={selectedTag}
        showTags={showTags}
        onToggleTags={handleToggleTags}
        onTagClick={handleTagClick}
      />
      {reflections.length === 0 ? (
        <HaveNotPost />
      ) : (
        <>
          <ArrowPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onChange={handleChange}
          />
          <ReflectionCardListArea
            username={username}
            reflections={reflections}
            isCurrentUser={isCurrentUser}
          />
          <NumberedPagination
            currentPage={currentPage}
            totalPage={totalPage}
            onChange={handleChange}
          />
        </>
      )}
      {username && (
        <PostNavigationButton
          sx={{
            position: "fixed",
            right: { sm: 130 },
            bottom: { sm: 50 }
          }}
        />
      )}
      <GoodJobModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default UserReflectionListPage;
