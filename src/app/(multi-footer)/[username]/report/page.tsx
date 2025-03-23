import { notFound } from "next/navigation";
// import { getServerSession } from "next-auth";
import { UserReportPage } from "./page.client";
import { reflectionAPI } from "@/src/api/reflection-api";
import { userReportAPI } from "@/src/api/user-report-api";
// import authOptions from "@/src/app/api/auth/[...nextauth]/options";
import { getHeaders } from "@/src/utils/get-headers";
import { removeHtmlTags } from "@/src/utils/remove-html-tags";

type PageProps = {
  params: {
    username: string;
  };
};

const page = async ({ params }: PageProps) => {
  // const session = await getServerSession(authOptions);
  const headers = getHeaders();
  const [
    reflectionContent,
    reflectionCounts,
    userProfile,
    reflectionsWithUser
  ] = await Promise.all([
    userReportAPI.getAllReflectionContent(params.username),
    userReportAPI.getPublicPrivateCount(params.username),
    userReportAPI.getUserProfile(params.username),
    reflectionAPI.getReflectionsByUsername(headers, params.username)
  ]);

  if (
    reflectionContent === 404 ||
    reflectionCounts === 404 ||
    userProfile === 404 ||
    reflectionsWithUser === 404
  ) {
    return notFound();
  }
  // TODO: レポートが非公開かつ、閲覧者が本人でない場合は404を返す404ページを返す。開発中は表示しておくため、リリース時にはコメントアウトを解除する
  // NOTE: 一時的に公開非公開試したい人はコメントアウトを解除してください
  // if (!userProfile.isReportOpen && session?.user.username !== params.username) {
  //   return notFound();
  // }
  const allPlainContent = removeHtmlTags(reflectionContent.allContent);
  return (
    <UserReportPage
      image={userProfile.image}
      username={params.username}
      isReportOpen={userProfile.isReportOpen}
      publicCount={reflectionCounts.public}
      privateCount={reflectionCounts.private}
      contentLength={allPlainContent.length}
      tagCountList={reflectionsWithUser.tagCountList}
    />
  );
};

export default page;
