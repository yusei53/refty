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
  };

  const isModalOpen = searchParams.get("status") === "posted";

  const handleCloseModal = () => {
    router.push(`/${username}`);
  };

  const isCurrentUser = currentUsername === username;

  // MEMO: 自分の投稿は全て表示、他人の投稿は公開設定のもののみ表示
  const filteredReflections = isCurrentUser
    ? reflections
    : reflections.filter((reflection) => reflection.isPublic);

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`?page=${value}`);
  };

  // TODO: ReflectionAllAreaのようなコンポーネントを作ってリファクタする
  return (
    <Box mb={{ xs: -1, sm: 0 }}>
      <UserProfileArea
        userImage={userImage}
        username={username}
        reflectionCount={reflectionCount}
      />
      {reflections.length === 0 ? (
        <HaveNotPost />
      ) : (
        <>
          <SearchBar
            tags={Object.values(tagMap)}
            selectedTag={selectedTag}
            showTags={showTags}
            onToggleTags={handleToggleTags}
            onTagClick={handleTagClick}
          />
          {totalPage > 1 && (
            <ArrowPagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChange={handleChange}
            />
          )}
          <ReflectionCardListArea
            username={username}
            reflections={filteredReflections}
            isCurrentUser={isCurrentUser}
          />
          {totalPage > 1 && (
            <NumberedPagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChange={handleChange}
            />
          )}
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
