"use client";
import { Container, useMediaQuery } from "@mui/material";
import type {
  ReflectionTagCountList,
  ReflectionWithUser
} from "../api/reflection-api";
import type { User } from "@prisma/client";
import ReflectionAllCardListArea from "../components/reflection-all-list/card-list/ReflectionAllCardListArea";
import { ReflectionAllHeader } from "../components/reflection-all-list/header";
import { usePagination } from "../hooks/reflection/usePagination";
import { tagMap } from "../hooks/reflection-tag/useExtractTrueTags";
import { useTagHandler } from "../hooks/reflection-tag/useTagHandler";
import { PostNavigationButton } from "../ui/shared/button";
import { Footer } from "../ui/shared/footer";
import { ArrowPagination, NumberedPagination } from "../ui/shared/pagination";
import { SearchBar } from "../ui/shared/search-bar";
import { theme } from "../utils/theme";

type RootPageProps = {
  currentUsername: User["username"];
  image: string;
  reflections: ReflectionWithUser[];
  currentPage: number;
  totalPage: number;
  tagCountList: ReflectionTagCountList;
};

const RootPage: React.FC<RootPageProps> = ({
  currentUsername,
  image,
  reflections,
  currentPage,
  totalPage,
  tagCountList
}) => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
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
      <Container maxWidth="md" sx={{ mt: { xs: 8, sm: 6 }, mb: 6 }}>
        <ReflectionAllHeader currentUsername={currentUsername} image={image} />
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
          currentUsername={currentUsername}
          reflections={reflections}
        />
        <NumberedPagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChange={handlePageChange}
        />
      </Container>
      {currentUsername && isLargeScreen && (
        <PostNavigationButton
          sx={{
            position: "fixed",
            right: { sm: 130 },
            bottom: { sm: 50 }
          }}
        />
      )}
      <Footer />
    </>
  );
};

export default RootPage;
