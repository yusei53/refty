import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { reflectionAPI } from "./_client/api/reflection-api";
import { reflectionsTagCountAPI } from "./_client/api/reflections-tag-count-api";
import { meta } from "./_client/utils/metadata";
import { getUserSession } from "./_shared/get-user-session";
import RootPage from "./page.client";

export const metadata: Metadata = meta.rootPage;

const page = async ({
  searchParams
}: {
  searchParams: Promise<{ page?: string; tag?: string }>;
}) => {
  const { page: pageParameter, tag: tagParameter } = await searchParams;
  const currentPage = pageParameter ? parseInt(pageParameter, 10) : 1;
  const selectedTag = tagParameter || undefined;
  const session = await getUserSession();

  const [count, reflectionAll] = await Promise.all([
    reflectionsTagCountAPI.getReflectionTagCountList(),
    reflectionAPI.getReflectionAll(currentPage, selectedTag)
  ]);

  if (count === 500 || reflectionAll === 404) {
    return notFound();
  }

  return (
    <RootPage
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
