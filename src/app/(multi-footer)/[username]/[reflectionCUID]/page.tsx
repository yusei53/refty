import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import Loading from "./loading";
import { reflectionAPI } from "@/src/api/reflection-api";
import authOptions from "@/src/app/api/auth/[...nextauth]/options";
import { addIdsToHeadings } from "@/src/utils/add-ids-to-headings";
import { generateMeta } from "@/src/utils/metadata";

const ReflectionDetailPage = dynamic(
  () => import("./page.client").then((mod) => mod.default),
  {
    loading: () => <Loading />
  }
);

export const generateMetadata = async ({
  params
}: {
  params: { reflectionCUID: string };
}): Promise<Metadata> => {
  return await generateMeta.reflectionDetailPage(params.reflectionCUID);
};

type PageProps = {
  params: {
    username: string;
    reflectionCUID: string;
  };
};

const page = async ({ params }: PageProps) => {
  const session = await getServerSession(authOptions);
  const { reflectionCUID } = params;

  const reflection =
    await reflectionAPI.getDetailReflectionByCUID(reflectionCUID);
  if (
    reflection === 404 ||
    (reflection.userId !== session?.user.id && !reflection.isPublic)
  ) {
    return notFound();
  }

  const isCurrentUser = session?.user.username === reflection.user.username;

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
