import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import RootPage from "../../../page.client";
import { reflectionAPI } from "@/src/api/reflection-api";
import getCurrentUser from "@/src/utils/actions/get-current-user";
import { meta } from "@/src/utils/metadata";

export const metadata: Metadata = meta.settingUsernamePage;

const page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const currentUser = await getCurrentUser();
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const result = await reflectionAPI.getReflectionAll();
  if (result === 404) {
    return notFound();
  }

  //usernameが設定されている場合、/${currentUser.username}にリダイレクト
  if (currentUser?.username) {
    redirect(`/${currentUser.username}`);
  }

  return (
    <RootPage
      open
      currentUsername={currentUser?.username || null}
      reflections={result.reflections}
      currentPage={currentPage}
      totalPage={result.totalPage}
      filteredReflectionCount={result.filteredReflectionCount}
    />
  );
};

export default page;
