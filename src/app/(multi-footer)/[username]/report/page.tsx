import { notFound } from "next/navigation";
import { userReportAPI } from "@/src/api/user-report-api";
import { removeHtmlTags } from "@/src/utils/remove-html-tags";

type PageProps = {
  params: {
    username: string;
  };
};

const page = async ({ params }: PageProps) => {
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
      <div>
        <span>プロフィール</span>
        <img src={userProfile.image} alt="プロフィール画像" />
        <p>{userProfile.bio}</p>
        <a href={userProfile.website} target="_blank" rel="noopener noreferrer">
          {userProfile.website}
        </a>
      </div>
    </>
  );
};

export default page;
