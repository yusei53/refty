import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ReflectionUpdateFormPage from "./page.client";
import { reflectionAPI } from "@/src/api/reflection-api";
import getCurrentUser from "@/src/utils/actions/get-current-user";
import { generateMeta } from "@/src/utils/metadata/generateMetadata";

export const generateMetadata = async ({
  params
}: {
  params: { reflectionCUID: string };
}): Promise<Metadata> => {
  return await generateMeta.reflectionUpdateFormPage(params.reflectionCUID);
};

type PageProps = {
  params: {
    username: string;
    reflectionCUID: string;
  };
};

const page = async ({ params }: PageProps) => {
  const { reflectionCUID } = params;
  const currentUser = await getCurrentUser();

  const reflection = await reflectionAPI.getReflectionByCUID(reflectionCUID);
  if (reflection === 404 || reflection.userId !== currentUser?.id) {
    return notFound();
  }

  if (!currentUser?.username) {
    redirect("/login");
  }

  return (
    <ReflectionUpdateFormPage
      username={currentUser.username}
      reflectionCUID={reflectionCUID}
      title={reflection.title}
      content={reflection.content}
      charStamp={reflection.charStamp}
      isPublic={reflection.isPublic}
      isDailyReflection={reflection.isDailyReflection}
      isLearning={reflection.isLearning}
      isAwareness={reflection.isAwareness}
      isInputLog={reflection.isInputLog}
      isMonologue={reflection.isMonologue}
    />
  );
};

export default page;
