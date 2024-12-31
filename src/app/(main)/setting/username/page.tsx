import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import SettingUsernameModalPage from "./page.client";
import { reflectionAPI } from "@/src/api/reflection-api";
import authOptions from "@/src/app/api/auth/[...nextauth]/options";
import { meta } from "@/src/utils/metadata";

export const metadata: Metadata = meta.settingUsernamePage;

const page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const session = await getServerSession(authOptions);
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const result = await reflectionAPI.getReflectionAll();
  if (result === 404) {
    return notFound();
  }

  //usernameが設定されている場合、/${currentUser.username}にリダイレクト
  if (session?.user.username) {
    redirect(`/${session.user.username}`);
  }

  return (
    <SettingUsernameModalPage
      currentUsername={session?.user.username || null}
      reflections={result.reflections}
      currentPage={currentPage}
      totalPage={result.totalPage}
      filteredReflectionCount={result.filteredReflectionCount}
    />
  );
};

export default page;
