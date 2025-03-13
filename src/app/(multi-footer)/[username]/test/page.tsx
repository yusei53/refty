import { notFound } from "next/navigation";
import { reflectionCharCountAPI } from "@/src/api/reflection-char-count-api";
import { removeHtmlTags } from "@/src/utils/remove-html-tags";

type PageProps = {
  params: {
    username: string;
  };
};

const page = async ({ params }: PageProps) => {
  const AllContentWithHTML =
    await reflectionCharCountAPI.getAllReflectionContent(params.username);
  if (AllContentWithHTML === 404) {
    return notFound();
  }

  const allPlainContent = removeHtmlTags(AllContentWithHTML.allContent);
  return <>{allPlainContent.length}</>;
};

export default page;
