import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { reflectionAPI } from "@/src/api/reflection-api";
import { reflectionTagCountsAPI } from "@/src/api/reflection-tag-counts-api";
import authOptions from "@/src/app/api/auth/[...nextauth]/options";
import RootPage from "@/src/app/page.client";
import { meta } from "@/src/utils/metadata";

export const metadata: Metadata = meta.settingUsernamePage;

const page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const session = await getServerSession(authOptions);
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  //usernameが設定されている場合、/${currentUser.username}にリダイレクト
  if (session?.user.username) {
    redirect(`/${session.user.username}`);
  }

  const countResult = await reflectionTagCountsAPI.getReflectionTagCountList();
  const reflectionsResult = await reflectionAPI.getReflectionAll();

  if (countResult === 500 || reflectionsResult === 404) {
    return notFound();
  }

  // MEMO: 並列データフェッチ
  const [count, result] = await Promise.all([countResult, reflectionsResult]);

  return (
    <RootPage
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
