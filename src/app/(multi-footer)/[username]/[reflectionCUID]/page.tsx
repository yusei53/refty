import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReflectionDetailPage from "./page.client";
import { reflectionAPI } from "@/src/api/reflection-api";
import { addIdsToHeadings } from "@/src/utils/add-ids-to-headings";
import { getUserSession } from "@/src/utils/get-user-session";
import { generateMeta } from "@/src/utils/metadata";

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ reflectionCUID: string }>;
}): Promise<Metadata> => {
  const { reflectionCUID } = await params;
  return await generateMeta.reflectionDetailPage(reflectionCUID);
};

const page = async ({
  params
}: {
  params: Promise<{ reflectionCUID: string }>;
}) => {
  const { reflectionCUID } = await params;
  const session = await getUserSession();

  const reflection =
    await reflectionAPI.getDetailReflectionByCUID(reflectionCUID);
  if (
    reflection === 404 ||
    (reflection.userId !== session?.id && !reflection.isPublic)
  ) {
    return notFound();
  }

  const isCurrentUser = session?.username === reflection.user.username;

  //MEMO: contentの見出しにidを追加
  const contentWithIds = addIdsToHeadings(reflection.content);

  return (
    <ReflectionDetailPage
      title={reflection.title}
      userImage={reflection.user.image}
      username={reflection.user.username}
      content={contentWithIds}
      isDailyReflection={reflection.isDailyReflection}
      isLearning={reflection.isLearning}
      isAwareness={reflection.isAwareness}
      isInputLog={reflection.isInputLog}
      isMonologue={reflection.isMonologue}
      isPublic={reflection.isPublic}
      isCurrentUser={isCurrentUser}
      aiFeedback={reflection.aiFeedback}
      createdAt={reflection.createdAt}
      reflectionCount={reflection.reflectionCount}
    />
  );
};

export default page;
