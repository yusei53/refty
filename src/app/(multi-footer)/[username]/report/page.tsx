import { notFound } from "next/navigation";
import { userReportAPI } from "@/src/api/user-report-api";
import { removeHtmlTags } from "@/src/utils/remove-html-tags";
import { getServerSession } from "next-auth";
import authOptions from "@/src/app/api/auth/[...nextauth]/options";
import { UserReportPage } from "./page.client";

type PageProps = {
  params: {
    username: string;
  };
};

const page = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions);
  const [reflectionContent, reflectionCounts, userProfile] = await Promise.all([
    userReportAPI.getAllReflectionContent(params.username),
    userReportAPI.getPublicPrivateCount(params.username),
    userReportAPI.getUserProfile(params.username)
  ]);

  if (
    reflectionContent === 404 ||
    reflectionCounts === 404 ||
    userProfile === 404
  ) {
    return notFound();
  }

  // TODO: レポートが非公開かつ、閲覧者が本人でない場合は404を返す404ページを返す。開発中は表示しておくため、リリース時にはコメントアウトを解除する
  // NOTE: 1時的に公開非公開試したい人はコメントアウトを解除してください
  // if (!userProfile.isReportOpen && session?.user.username !== params.username) {
  //   return notFound();
  // }
  const allPlainContent = removeHtmlTags(reflectionContent.allContent);
  return (
    <UserReportPage
      userProfile={userProfile}
      reflectionCounts={reflectionCounts}
      contentLength={allPlainContent.length}
      username={params.username}
    />
  );
};

export default page;
