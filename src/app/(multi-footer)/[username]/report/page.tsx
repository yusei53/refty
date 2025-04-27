import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UserReportPage } from "./page.client";
import { getHeaders } from "@/src/app/_client/utils/get-headers";
import { meta } from "@/src/app/_client/utils/metadata";
import { removeHtmlTags } from "@/src/app/_client/utils/remove-html-tags";
import { userReportAPI } from "@/src/api/user-report-api";

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> => {
  const { username } = await params;
  return meta.reportPage(username);
};

const page = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  const headers = await getHeaders();

  const status = await userReportAPI.getReportStatus(username, headers);
  if (status === 403 || status === 404) {
    return notFound();
  }

  const [
    reflectionContent,
    reflectionCounts,
    hourlyPostCount,
    reflectionCount,
    tagCountList
  ] = await Promise.all([
    userReportAPI.getAllReflectionContent(username),
    userReportAPI.getPublicPrivateCount(username),
    userReportAPI.getHourlyPostCount(username),
    userReportAPI.getReflectionsCount(username),
    userReportAPI.getTagCount(username)
  ]);

  const allPlainContent = removeHtmlTags(reflectionContent.allContent);
  return (
    <UserReportPage
      currentUsername={status.session?.username || null}
      currentImage={status.session?.image || null}
      username={username}
      userImage={status.userImage}
      isReportOpen={status.isReportOpen}
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
