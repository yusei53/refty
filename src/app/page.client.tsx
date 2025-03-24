"use client";
import { Container, useMediaQuery } from "@mui/material";
import type {
  ReflectionTagCountList,
  ReflectionWithUser
} from "../api/reflection-api";
import { PostNavigationButton } from "../components/button";
import { Footer } from "../components/footer";
import { ArrowPagination, NumberedPagination } from "../components/pagination";
import { SearchBar } from "../features/common/search-bar";
import { UserMenuHeaderContainer } from "../features/common/user-menu";
import ReflectionAllCardListArea from "../features/routes/reflection-all-list/card-list/ReflectionAllCardListArea";
import { ReflectionAllHeader } from "../features/routes/reflection-all-list/header";
import { usePagination } from "../hooks/reflection/usePagination";
import { tagMap } from "../hooks/reflection-tag/useExtractTrueTags";
import { useTagHandler } from "../hooks/reflection-tag/useTagHandler";
import { useIsMobile } from "../hooks/responsive/useIsMobile";
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
  const isMobile = useIsMobile();
  const isPWA = useMediaQuery("(display-mode: standalone)");

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
      {username && !isPWA && (
        <PostNavigationButton
          sx={{
            position: "fixed",
            right: { xs: 50, sm: 130 },
            bottom: { xs: 120, sm: 50 }
          }}
        />
      )}
      <Footer />
    </>
  );
};

export default RootPage;
