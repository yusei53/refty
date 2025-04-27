"use client";
import type {
  ReflectionTagCountList,
  ReflectionWithUser
} from "@/src/app/_client/api/reflection-api";
import SettingUsernameModalContainer from "@/src/app/_client/features/routes/setting-username/SettingUsernameModalContainer";
import RootPage from "@/src/app/page.client";

type SettingUsernameModalPageProps = {
  username: string | null;
  image: string | null;
  reflections: ReflectionWithUser[];
  currentPage: number;
  totalPage: number;
  tagCountList: ReflectionTagCountList;
};

const SettingUsernameModalPage: React.FC<SettingUsernameModalPageProps> = ({
  username,
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
        username={username}
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
