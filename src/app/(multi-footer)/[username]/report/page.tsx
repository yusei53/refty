import { notFound } from "next/navigation";
import { userReportAPI } from "@/src/api/user-report-api";
import { removeHtmlTags } from "@/src/utils/remove-html-tags";

type PageProps = {
  params: {
    username: string;
  };
};

const page = async ({ params }: PageProps) => {
  const [reflectionContent, reflectionCounts] = await Promise.all([
    userReportAPI.getAllReflectionContent(params.username),
    userReportAPI.getPublicPrivateCount(params.username)
  ]);

  if (reflectionContent === 404 || reflectionCounts === 404) {
    return notFound();
  }

  const allPlainContent = removeHtmlTags(reflectionContent.allContent);
  return (
    <>
      <div>
        <span>公開</span>
        {reflectionCounts.public}
      </div>
      <div>
        <span>非公開</span>
        {reflectionCounts.private}
      </div>
      <div>
        <span>文字数</span>
        {allPlainContent.length}
      </div>
    </>
  );
};

export default page;
