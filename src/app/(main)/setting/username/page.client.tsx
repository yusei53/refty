"use client";
import type { ReflectionWithUser } from "@/src/api/reflection-api";
import type { User } from "@prisma/client";
import RootPage from "@/src/app/page.client";
import SettingUsernameModalContainer from "@/src/components/setting-username/SettingUsernameModalContainer";

type SettingUsernameModalPageProps = {
  currentUsername: User["username"];
  reflections: ReflectionWithUser[];
  currentPage: number;
  totalPage: number;
  filteredReflectionCount: number;
};

const SettingUsernameModalPage: React.FC<SettingUsernameModalPageProps> = ({
  currentUsername,
  reflections,
  currentPage,
  totalPage,
  filteredReflectionCount
}) => {
  return (
    <>
      <SettingUsernameModalContainer open />
      {/* // NOTE: RootPageはただのモーダルの背景として置いている */}
      <RootPage
        currentUsername={currentUsername}
        reflections={reflections}
        currentPage={currentPage}
        totalPage={totalPage}
        filteredReflectionCount={filteredReflectionCount}
      />
    </>
  );
};

export default SettingUsernameModalPage;
