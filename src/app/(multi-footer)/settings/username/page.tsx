import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import SettingUsernameModalPage from "./page.client";
import { reflectionAPI } from "@/src/api/reflection-api";
import { reflectionsTagCountAPI } from "@/src/api/reflections-tag-count-api";
import { getUserSession } from "@/src/utils/get-user-session";
import { meta } from "@/src/utils/metadata";

export const metadata: Metadata = meta.settingUsernamePage;

const page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const session = await getUserSession();
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
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
