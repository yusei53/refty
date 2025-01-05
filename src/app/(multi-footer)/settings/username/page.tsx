import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import SettingUsernameModalPage from "./page.client";
import { reflectionAPI } from "@/src/api/reflection-api";
import { reflectionsTagCountAPI } from "@/src/api/reflections-tag-count-api";
import authOptions from "@/src/app/api/auth/[...nextauth]/options";
import { meta } from "@/src/utils/metadata";

export const metadata: Metadata = meta.settingUsernamePage;

const page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const session = await getServerSession(authOptions);
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  //usernameが設定されている場合、/${currentUser.username}にリダイレクト
  if (session?.user.username) {
    redirect(`/${session.user.username}`);
  }

  const countResult = await reflectionsTagCountAPI.getReflectionTagCountList();
  const reflectionsResult = await reflectionAPI.getReflectionAll();

  if (countResult === 500 || reflectionsResult === 404) {
    return notFound();
  }

  // MEMO: 並列データフェッチ
  const [count, result] = await Promise.all([countResult, reflectionsResult]);

  return (
    <SettingUsernameModalPage
      currentUsername={session?.user.username || null}
      image={session?.user.image || ""}
      reflections={result.reflections}
      currentPage={currentPage}
      totalPage={result.totalPage}
      tagCountList={count.tagCountList}
    />
  );
};

export default page;
