"use client";
import { Container } from "@mui/material";
import type {
  ReflectionTagCountList,
  ReflectionWithUser
} from "@/src/app/_client/api/reflection-api";
import { PostNavigationButton } from "@/src/app/_client/components/button";
import { Footer } from "@/src/app/_client/components/footer";
import {
  ArrowPagination,
  NumberedPagination
} from "@/src/app/_client/components/pagination";
import { SearchBar } from "@/src/app/_client/features/common/search-bar";
import { UserMenuHeaderContainer } from "@/src/app/_client/features/common/user-menu";
import ReflectionAllCardListArea from "@/src/app/_client/features/routes/reflection-all-list/card-list/ReflectionAllCardListArea";
import { ReflectionAllHeader } from "@/src/app/_client/features/routes/reflection-all-list/header";
import { usePagination } from "@/src/app/_client/hooks/reflection/usePagination";
import { tagMap } from "@/src/app/_client/hooks/reflection-tag/useExtractTrueTags";
import { useTagHandler } from "@/src/app/_client/hooks/reflection-tag/useTagHandler";
import { useResponsive } from "@/src/app/_client/hooks/responsive/useResponsive";

type RootPageProps = {
  username: string | null;
  image: string | null;
  reflections: ReflectionWithUser[];
  currentPage: number;
  totalPage: number;
  tagCountList: ReflectionTagCountList;
};

const RootPage: React.FC<RootPageProps> = ({
  username,
  image,
  reflections,
  currentPage,
  totalPage,
  tagCountList
}) => {
  const { isMobile, isPWA } = useResponsive();

  const {
    isOpenTagList,
    selectedTag,
    handleToggleTags,
    handleTagChange,
    getSelectedTagCount
  } = useTagHandler();
  const { handlePageChange } = usePagination();

  return (
    <>
      <Container maxWidth="md" sx={{ mt: { xs: 8, sm: 11 }, mb: 6 }}>
        {!isMobile && (
          <UserMenuHeaderContainer userImage={image} username={username} />
        )}
        <ReflectionAllHeader />
        <SearchBar
          tags={Object.values(tagMap)}
          selectedTag={selectedTag}
          isOpenTagList={isOpenTagList}
          selectedTagCount={getSelectedTagCount(tagCountList, selectedTag)}
          onToggleTags={handleToggleTags}
          onTagChange={handleTagChange}
        />
        <ArrowPagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChange={handlePageChange}
        />
        <ReflectionAllCardListArea
          currentUsername={username}
          reflections={reflections}
        />
        <NumberedPagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChange={handlePageChange}
        />
      </Container>
      {username && !isPWA && <PostNavigationButton />}
      <Footer />
    </>
  );
};

export default RootPage;
