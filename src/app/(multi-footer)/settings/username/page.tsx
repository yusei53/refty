import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import SettingUsernameModalPage from "./page.client";
import { reflectionAPI } from "@/src/app/_client/api/reflection-api";
import { reflectionsTagCountAPI } from "@/src/app/_client/api/reflections-tag-count-api";
import { getUserSession } from "@/src/app/_client/utils/get-user-session";
import { meta } from "@/src/app/_client/utils/metadata";

export const metadata: Metadata = meta.settingUsernamePage;

const page = async ({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page: pageParameter } = await searchParams;
  const session = await getUserSession();
  const currentPage = pageParameter ? parseInt(pageParameter, 10) : 1;
  // NOTE: usernameが設定されている場合、/${currentUser.username}にリダイレクト
  if (session?.username) {
    redirect(`/${session.username}`);
  }

  const [count, reflectionAll] = await Promise.all([
    reflectionsTagCountAPI.getReflectionTagCountList(),
    reflectionAPI.getReflectionAll()
  ]);

  if (count === 500 || reflectionAll === 404) {
    return notFound();
  }

  return (
    <SettingUsernameModalPage
      username={session?.username || null}
      image={session?.image || null}
      reflections={reflectionAll.reflections}
      currentPage={currentPage}
      totalPage={reflectionAll.totalPage}
      tagCountList={count.tagCountList}
    />
  );
};

export default page;
