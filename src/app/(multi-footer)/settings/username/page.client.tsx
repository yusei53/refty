"use client";
import type {
  ReflectionTagCountList,
  ReflectionWithUser
} from "@/src/api/reflection-api";
import type { User } from "@prisma/client";
import RootPage from "@/src/app/page.client";
import SettingUsernameModalContainer from "@/src/features/routes/setting-username/SettingUsernameModalContainer";

type SettingUsernameModalPageProps = {
  currentUsername: User["username"];
  image: string;
  reflections: ReflectionWithUser[];
  currentPage: number;
  totalPage: number;
  tagCountList: ReflectionTagCountList;
};

const SettingUsernameModalPage: React.FC<SettingUsernameModalPageProps> = ({
  currentUsername,
  image,
  reflections,
  currentPage,
  totalPage,
  tagCountList
}) => {
  return (
    <>
      <SettingUsernameModalContainer open />
      {/* // NOTE: RootPageはただのモーダルの背景として置いている */}
      <RootPage
        currentUsername={currentUsername}
        image={image}
        reflections={reflections}
        currentPage={currentPage}
        totalPage={totalPage}
        tagCountList={tagCountList}
      />
    </>
  );
};

export default SettingUsernameModalPage;
