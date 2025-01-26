import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "../../api/auth/[...nextauth]/options";
import UserReflectionListPage from "./page.client";
import { reflectionAPI } from "@/src/api/reflection-api";
import { reflectionsCountAPI } from "@/src/api/reflections-count-api";
import { getHeaders } from "@/src/utils/get-headers";
import { generateMeta } from "@/src/utils/metadata";

export const generateMetadata = async ({
  params
}: {
  params: { username: string };
}): Promise<Metadata> => {
  return await generateMeta.userReflectionListPage(params.username);
};

const page = async ({
  params,
  searchParams
}: {
  params: { username: string };
  searchParams: { page?: string; tag?: string; status?: string };
}) => {
  const session = await getServerSession(authOptions);
  const headers = getHeaders();
  const { username } = params;
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  const selectedTag = searchParams.tag || undefined;
  const status = searchParams.status;

  const countResult = await reflectionsCountAPI.getReflectionsCount(username);
  const reflectionsResult = await reflectionAPI.getReflectionsByUsername(
    headers,
    username,
    currentPage,
    selectedTag
  );

  if (countResult === 404 || reflectionsResult === 404) {
    return notFound();
  }

  // MEMO: letは本来使いたくないが、頻繁に再代入はされないため一旦はこれ
  let randomReflection = null;
  if (status === "posted") {
    randomReflection = await reflectionAPI.getRandomReflection(
      headers,
      username
    );

    if (
      randomReflection === 403 ||
      randomReflection === 404 ||
      countResult.totalReflections === "1" // MEMO: 1件しかない場合はランダム表示しない, 0件の場合は404判定
    ) {
      randomReflection = null;
    }
  }

  // MEMO: 並列データフェッチ
  const [reflectionCount, reflectionsWithUser] = await Promise.all([
    countResult,
    reflectionsResult
  ]);

  return (
    <>
      <UserReflectionListPage
        currentUsername={session?.user.username || null}
        userImage={reflectionsWithUser.userImage}
        username={username}
        bio={reflectionsWithUser.bio}
        website={reflectionsWithUser.website}
        reflectionCount={reflectionCount}
        reflections={reflectionsWithUser.reflections}
        currentPage={currentPage}
        totalPage={reflectionsWithUser.totalPage}
        tagCountList={reflectionsWithUser.tagCountList}
        randomReflection={randomReflection}
      />
    </>
  );
};

export default page;
