"use client";
import { ReflectionWithUser } from "../api/reflection-api";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import ReflectionAllArea from "../components/reflection-all-list/list/ReflectionAllListArea";
import SettingUsernameModalContainer from "../components/setting-username/SettingUsernameModalContainer";
import { PostNavigationButton } from "../components/shared/button";
import { Footer } from "../components/shared/footer";

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
  totalPage,
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
            bottom: { sm: 50 },
          }}
        />
      )}
      <Footer />
    </>
  );
};

export default RootPage;
