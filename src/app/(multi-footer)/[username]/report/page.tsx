import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UserReportPage } from "./page.client";
import { userReportAPI } from "@/src/api/user-report-api";
import { getHeaders } from "@/src/utils/get-headers";
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
  const headers = getHeaders();

  const status = await userReportAPI.getReportStatus(params.username, headers);
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
    userReportAPI.getAllReflectionContent(params.username),
    userReportAPI.getPublicPrivateCount(params.username),
    userReportAPI.getHourlyPostCount(params.username),
    userReportAPI.getReflectionsCount(params.username),
    userReportAPI.getTagCount(params.username)
  ]);

  const allPlainContent = removeHtmlTags(reflectionContent.allContent);
  return (
    <UserReportPage
      currentUsername={status.session?.username || null}
      currentImage={status.session?.image || null}
      username={params.username}
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
