import { notFound } from "next/navigation";
import { reflectionCharCountAPI } from "@/src/api/reflection-char-count-api";
import { removeHtmlTags } from "@/src/utils/remove-html-tags";

type PageProps = {
  params: {
    username: string;
  };
};

const page = async ({ params }: PageProps) => {
  // TODO: それぞれのapiを並列処理する
  const AllContentWithHTML =
    await reflectionCharCountAPI.getAllReflectionContent(params.username);
  if (AllContentWithHTML === 404) {
    return notFound();
  }
  const publicPrivateCount = await reflectionCharCountAPI.getPublicPrivateCount(
    params.username
  );
  if (publicPrivateCount === 404) {
    return notFound();
  }

  const allPlainContent = removeHtmlTags(AllContentWithHTML.allContent);
  return (
    <>
      <div>
        <span>公開</span>
        {publicPrivateCount.public}
      </div>
      <div>
        <span>非公開</span>
        {publicPrivateCount.private}
      </div>
      <div>
        <span>文字数</span>
        {allPlainContent.length}
      </div>
    </>
  );
};

export default page;
