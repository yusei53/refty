"use client";
import { Container, useMediaQuery } from "@mui/material";
import type { ReflectionWithUser } from "../api/reflection-api";
import type { User } from "@prisma/client";
import ReflectionAllCardListArea from "../components/reflection-all-list/card-list/ReflectionAllCardListArea";
import { ReflectionAllHeader } from "../components/reflection-all-list/header";
import { PostNavigationButton } from "../components/ui/shared/button";
import { Footer } from "../components/ui/shared/footer";
import {
  ArrowPagination,
  NumberedPagination
} from "../components/ui/shared/pagination";
import { SearchBar } from "../components/ui/shared/search-bar";
import { usePagination } from "../hooks/reflection/usePagination";
import { tagMap } from "../hooks/reflection-tag/useExtractTrueTags";
import { useTagManager } from "../hooks/reflection-tag/useTagManager";
import { theme } from "../utils/theme";

type RootPageProps = {
  currentUsername: User["username"];
  reflections: ReflectionWithUser[];
  currentPage: number;
  totalPage: number;
  filteredReflectionCount: number;
};

const RootPage: React.FC<RootPageProps> = ({
  currentUsername,
  reflections,
  currentPage,
  totalPage,
  filteredReflectionCount
}) => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const { isOpenTagList, selectedTag, handleToggleTags, handleTagChange } =
    useTagManager();
  const { handlePageChange } = usePagination();

  return (
    <>
      <Container maxWidth="md" sx={{ mt: { xs: 8, sm: 6 }, mb: 6 }}>
        <ReflectionAllHeader currentUsername={currentUsername} />
        <SearchBar
          tags={Object.values(tagMap)}
          selectedTag={selectedTag}
          count={filteredReflectionCount}
          isOpenTagList={isOpenTagList}
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
