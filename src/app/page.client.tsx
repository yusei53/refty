"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { tagMap } from "../hooks/reflection-tag/useExtractTrueTags";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const newParams = new URLSearchParams(searchParams.toString());

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

  return (
    <>
      <Container maxWidth="md" sx={{ mt: { xs: 8, sm: 6 }, mb: 6 }}>
        <ReflectionAllHeader currentUsername={currentUsername} />
        <SearchBar
          tags={Object.values(tagMap)}
          selectedTag={selectedTag}
          count={filteredReflectionCount}
          showTags={showTags}
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
