import { useState, type ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Container } from "@mui/material";
import type { ReflectionWithUser } from "@/src/api/reflection-api";
import type { User } from "@prisma/client";
import {
  ArrowPagination,
  NumberedPagination
} from "../../ui/shared/pagination";
import { SearchBar } from "../../ui/shared/search-bar";
import { ReflectionAllHeader } from "../header";
import ReflectionAllCardListArea from "./ReflectionAllCardListArea";
import { tagMap } from "@/src/hooks/reflection-tag/useExtractTrueTags";

type ReflectionAllAreaProps = {
  currentUsername: User["username"];
  reflections: ReflectionWithUser[];
  currentPage: number;
  totalPage: number;
  filteredReflectionCount: number;
  onChange: (event: ChangeEvent<unknown>, value: number) => void;
};

const ReflectionAllArea: React.FC<ReflectionAllAreaProps> = ({
  currentUsername,
  reflections,
  currentPage,
  totalPage,
  filteredReflectionCount,
  onChange
}) => {
  const [showTags, setShowTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
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

  return (
    // MEMO: rootのpageにあたるこのコンポーネントはroute-groupで崩れてしまうのでContainerをここ設定
    // MEMO: 今まではlayout.tsxで当てていたし、お気持ちはここにおきたくはない
    <Container maxWidth="md" sx={{ mt: { xs: 8, sm: 6 }, mb: 6 }}>
      <Box mt={{ xs: 4, md: 12 }} position={"relative"} mb={{ xs: -1, sm: 0 }}>
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
          onChange={onChange}
        />
        <ReflectionAllCardListArea
          currentUsername={currentUsername}
          reflections={reflections}
        />
        <NumberedPagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChange={onChange}
        />
      </Box>
    </Container>
  );
};

export default ReflectionAllArea;
