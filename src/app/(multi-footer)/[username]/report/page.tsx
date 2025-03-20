import { notFound } from "next/navigation";
import { userReportAPI } from "@/src/api/user-report-api";
import { removeHtmlTags } from "@/src/utils/remove-html-tags";
import { UserMenuHeaderContainer } from "@/src/features/common/user-menu";
import { getServerSession } from "next-auth";
import authOptions from "@/src/app/api/auth/[...nextauth]/options";

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
    <>
      <UserMenuHeaderContainer
        userImage={userProfile.image}
        username={params.username}
      />
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
        <p>レポートの公開非公開</p>
        <p>現在{userProfile.isReportOpen ? "公開" : "非公開"}中</p>
      </div>
    </>
  );
};

export default page;
