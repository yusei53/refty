"use client";
import { useSearchParams, useRouter } from "next/navigation";
import UserProfileArea from "@/src/components/reflection-list/profile/UserProfileArea";
import ReflectionCardListArea from "@/src/components/reflection-list/list/ReflectionCardListArea";
import { Reflection } from "@/src/api/reflection-api";
import { ReflectionsCount } from "@/src/api/reflections-count-api";
import { PostNavigationButton } from "@/src/components/shared/button";
import {
  ArrowPagination,
  NumberedPagination,
} from "@/src/components/shared/pagination";
import { User } from "@prisma/client";
import { GoodJobModal } from "@/src/components/reflection-list/modal";
import { Box } from "@mui/material";
import HaveNotPost from "@/src/components/reflection-list/no-post/HaveNotPost";

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
  totalPage,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
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
            bottom: { sm: 50 },
          }}
        />
      )}
      <GoodJobModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default UserReflectionListPage;
