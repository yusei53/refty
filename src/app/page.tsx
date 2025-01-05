import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { reflectionAPI } from "../api/reflection-api";
import { reflectionTagCountsAPI } from "../api/reflection-tag-counts-api";
import { meta } from "../utils/metadata";
import authOptions from "./api/auth/[...nextauth]/options";
import RootPage from "./page.client";

export const metadata: Metadata = meta.rootPage;

const page = async ({
  searchParams
}: {
  searchParams: { page?: string; tag?: string };
}) => {
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const selectedTag = searchParams.tag || undefined;

  const session = await getServerSession(authOptions);

  const countResult = await reflectionTagCountsAPI.getReflectionTagCountList();
  const reflectionsResult = await reflectionAPI.getReflectionAll(
    currentPage,
    selectedTag
  );

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
