import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { reflectionAPI } from "../api/reflection-api";
import { reflectionsTagCountAPI } from "../api/reflections-tag-count-api";
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

  const [count, reflectionAll] = await Promise.all([
    reflectionsTagCountAPI.getReflectionTagCountList(),
    reflectionAPI.getReflectionAll(currentPage, selectedTag)
  ]);

  if (count === 500 || reflectionAll === 404) {
    return notFound();
  }

  return (
    <RootPage
      currentUsername={session?.user.username || null}
      image={session?.user.image || ""}
      reflections={reflectionAll.reflections}
      currentPage={currentPage}
      totalPage={reflectionAll.totalPage}
      tagCountList={count.tagCountList}
    />
  );
};

export default page;
