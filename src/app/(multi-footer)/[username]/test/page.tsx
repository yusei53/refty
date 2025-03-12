import { notFound } from "next/navigation";
import { reflectionCharCountAPI } from "@/src/api/reflection-char-count-api";
import { removeHtmlTags } from "@/src/utils/remove-html-tags";

type PageProps = {
  params: {
    username: string;
  };
};

const page = async ({ params }: PageProps) => {
  const TotalContentWithHTML =
    await reflectionCharCountAPI.getTotalReflectionContent(params.username);
  if (TotalContentWithHTML === 404) {
    return notFound();
  }

  const totalPlainContent = removeHtmlTags(TotalContentWithHTML.totalContent);
  return <>{totalPlainContent.length}</>;
};

export default page;
