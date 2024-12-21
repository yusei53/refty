import opengraphAPI from "@/src/api/opengraph-api";
import { reflectionAPI } from "@/src/api/reflection-api";
import { reflectionsCountAPI } from "@/src/api/reflections-count-api";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import authOptions from "../../api/auth/[...nextauth]/options";
import UserReflectionListPage from "./page.client";

export const generateMetadata = async ({
  params
}: {
  params: { username: string };
}): Promise<Metadata> => {
  const { username } = params;
  const userInformation = await opengraphAPI.getOGPByUsername(username);
  if (userInformation === 404) {
    return {
      title: "404 | リフティ",
      description: "このページは見つかりません",
      openGraph: {
        type: "website",
        title: "404 | リフティ",
        description: "存在しないユーザーです",
        siteName: "リフティ"
      }
    };
  }

  return {
    title: `${username}`,
    description: `${username} has ${userInformation.totalReflections} reflections. Find new insights with refty!`,
    openGraph: {
      type: "website",
      url: `https://www.refty.jp/${username}`,
      title: `${username} | リフティ`,
      description: `${username} has ${userInformation.totalReflections} reflections. Find new insights with refty!`,
      siteName: "リフティ"
    },
    twitter: {
      title: `${username} | リフティ`,
      description: `${username} has ${userInformation.totalReflections} reflections .Find new insights with refty!`,
      card: "summary"
    }
  };
};

const page = async ({
  params,
  searchParams
}: {
  params: { username: string };
  searchParams: { page?: string };
}) => {
  // const currentUser = await getCurrentUser();
  const session = await getServerSession(authOptions);
  const { username } = params;
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const countResult = await reflectionsCountAPI.getReflectionsCount(username);
  const reflectionsResult = await reflectionAPI.getReflectionsByUsername(
    username,
    currentPage
  );

  if (countResult === 404 || reflectionsResult === 404) {
    return notFound();
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
        reflectionCount={reflectionCount}
        reflections={reflectionsWithUser.reflections}
        currentPage={currentPage}
        totalPage={reflectionsWithUser.totalPage}
      />
    </>
  );
};

export default page;
