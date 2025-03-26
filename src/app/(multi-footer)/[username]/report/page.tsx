import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UserReportPage } from "./page.client";
import { reflectionsCountAPI } from "@/src/api/reflections-count-api";
import { userReportAPI } from "@/src/api/user-report-api";
import { getUserSession } from "@/src/utils/get-user-session";
import { meta } from "@/src/utils/metadata";
import { removeHtmlTags } from "@/src/utils/remove-html-tags";

export const generateMetadata = async ({
  params
}: {
  params: { username: string };
}): Promise<Metadata> => {
  return meta.reportPage(params.username);
};
type PageProps = {
  params: {
    username: string;
  };
};

const page = async ({ params }: PageProps) => {
  const session = await getUserSession();
  const [
    reflectionContent,
    reflectionCounts,
    userProfile,
    hourlyPostCount,
    reflectionCount,
    tagCountList
  ] = await Promise.all([
    userReportAPI.getAllReflectionContent(params.username),
    userReportAPI.getPublicPrivateCount(params.username),
    userReportAPI.getUserProfile(params.username),
    userReportAPI.getHourlyPostCount(params.username),
    reflectionsCountAPI.getReflectionsCount(params.username),
    userReportAPI.getTagCount(params.username)
  ]);

  if (
    reflectionContent === 404 ||
    reflectionCounts === 404 ||
    userProfile === 404 ||
    hourlyPostCount === 404 ||
    reflectionCount === 404 ||
    tagCountList === 404
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
      username={params.username}
      userImage={userProfile.image}
      isReportOpen={userProfile.isReportOpen}
      publicCount={reflectionCounts.public}
      privateCount={reflectionCounts.private}
      contentLength={allPlainContent.length}
      hourlyPostCount={hourlyPostCount.reflectionsDateGroup}
      reflectionCount={reflectionCount}
      tagCountList={tagCountList}
    />
  );
};

export default page;
