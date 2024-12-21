"use client";
import { useRouter } from "next/navigation";
import type { ReflectionWithUser } from "../api/reflection-api";
import type { User } from "@prisma/client";
import ReflectionAllArea from "../components/reflection-all-list/card-list/ReflectionAllListArea";
import SettingUsernameModalContainer from "../components/setting-username/SettingUsernameModalContainer";
import { PostNavigationButton } from "../components/ui/shared/button";
import { Footer } from "../components/ui/shared/footer";

type RootPageProps = {
  open: boolean;
  currentUsername: User["username"];
  reflections: ReflectionWithUser[];
  currentPage: number;
  totalPage: number;
};

const RootPage: React.FC<RootPageProps> = ({
  open,
  currentUsername,
  reflections,
  currentPage,
  totalPage
}) => {
  const router = useRouter();

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`?page=${value}`);
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
        onChange={handleChange}
      />
      {currentUsername && (
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
