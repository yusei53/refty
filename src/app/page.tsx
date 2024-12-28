import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { reflectionAPI } from "../api/reflection-api";
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
  const result = await reflectionAPI.getReflectionAll(currentPage, selectedTag);
  if (result === 404) {
    return notFound();
  }

  return (
    <RootPage
      open={false}
      currentUsername={session?.user.username || null}
      reflections={result.reflections}
      currentPage={currentPage}
      totalPage={result.totalPage}
      filteredReflectionCount={result.filteredReflectionCount}
    />
  );
};

export default page;
