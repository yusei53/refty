import { notFound } from "next/navigation";
import { UserReportPage } from "./page.client";
import { userReportAPI } from "@/src/api/user-report-api";
import { getUserSession } from "@/src/utils/get-user-session";
import { removeHtmlTags } from "@/src/utils/remove-html-tags";
type PageProps = {
  params: {
    username: string;
  };
};

const page = async ({ params }: PageProps) => {
  const session = await getUserSession();
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
  // NOTE: 一時的に公開非公開試したい人はコメントアウトを解除してください
  // if (!userProfile.isReportOpen && session?.user.username !== params.username) {
  //   return notFound();
  // }
  const allPlainContent = removeHtmlTags(reflectionContent.allContent);
  return (
    <UserReportPage
      currentUsername={session?.username || null}
      currentImage={session?.image || null}
      image={userProfile.image}
      username={params.username}
      isReportOpen={userProfile.isReportOpen}
      publicCount={reflectionCounts.public}
      privateCount={reflectionCounts.private}
      contentLength={allPlainContent.length}
    />
  );
};

export default page;
