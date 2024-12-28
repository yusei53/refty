"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import type { ReflectionWithUser } from "../api/reflection-api";
import type { User } from "@prisma/client";
import ReflectionAllArea from "../components/reflection-all-list/card-list/ReflectionAllListArea";
import SettingUsernameModalContainer from "../components/setting-username/SettingUsernameModalContainer";
import { PostNavigationButton } from "../components/ui/shared/button";
import { Footer } from "../components/ui/shared/footer";
import { theme } from "../utils/theme";

type RootPageProps = {
  open: boolean;
  currentUsername: User["username"];
  reflections: ReflectionWithUser[];
  currentPage: number;
  totalPage: number;
  filteredReflectionCount: number;
};

const RootPage: React.FC<RootPageProps> = ({
  open,
  currentUsername,
  reflections,
  currentPage,
  totalPage,
  filteredReflectionCount
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

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
      <SettingUsernameModalContainer
        open={open}
        currentUsername={currentUsername}
      />
      <ReflectionAllArea
        currentUsername={currentUsername}
        reflections={reflections}
        currentPage={currentPage}
        totalPage={totalPage}
        filteredReflectionCount={filteredReflectionCount}
        onChange={handlePageChange}
      />
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
